import os
import uuid
import time
import hashlib
from typing import Optional, Dict, Any, List
from concurrent.futures import ThreadPoolExecutor
from threading import Lock, RLock
import threading
from langchain_groq import ChatGroq
from langchain_core.messages import HumanMessage, SystemMessage
from langchain_core.prompts import ChatPromptTemplate
from dotenv import load_dotenv
from app.helper.get_config import load_yaml

# Import web scraper for enhanced context retrieval
from app.core.modules.web_scraper.web_scraper import (
    get_travel_data_for_voce
)

load_dotenv()

class LanguageProcessor:
    def __init__(self, api_key: Optional[str] = None, model_name: str = load_yaml('MODEL_ID'),
                 response_language: str = "auto", allow_mixed_language: bool = True,
                 use_web_scraper: bool = True,
                 max_workers: int = 5,
                 web_cache_ttl: int = 3600):

        # Concurrency and Caching Setup
        self.max_workers = max_workers
        self.thread_pool = ThreadPoolExecutor(max_workers=self.max_workers, thread_name_prefix="LangProc-Worker")
        self.processing_lock = RLock()
        self.web_cache = {}
        self.web_cache_ttl = web_cache_ttl
        self.web_cache_lock = Lock()
        self._start_cache_cleanup_thread()

        # API and Model Setup
        self.api_key = api_key or os.getenv("GROQ_API_KEY")
        if not self.api_key:
            raise ValueError("GROQ_API_KEY is required")

        self.model_name = model_name
        self.llm = ChatGroq(
            groq_api_key=self.api_key,
            model_name=self.model_name,
            temperature=0.7,
            max_tokens=4096
        )

        # Language and Conversation Setup
        self.conversation_id = str(uuid.uuid4())
        self.conversation_history: List[Dict[str, str]] = []
        self.response_language = response_language
        self.allow_mixed_language = allow_mixed_language
        self.system_prompt = self._get_language_aware_system_prompt()

        # Web Scraper Configuration
        self.use_web_scraper = use_web_scraper


    def _get_language_aware_system_prompt(self, language: Optional[str] = None) -> str:
        """
        Generates a system prompt based on the specified language preference.
        If no language is provided, it defaults to the instance's setting.
        """
        base_prompt = (
            "You are a helpful and friendly travel assistant. Your goal is to provide insightful and "
            "practical information to travelers. Use the 'USER INTENT ANALYSIS' to understand what the user wants "
            "and use the 'REAL-TIME WEB CONTEXT' to form your answer. "
            "Answer questions about destinations, including things to do, food recommendations, cultural tips, and logistics. "
            "If the context doesn't contain the answer, politely say you couldn't find the information."
        )

        target_language = language or self.response_language
        language_instruction = ""

        lang_map = {
            "hindi": "\n\nIMPORTANT: Respond primarily in Hindi (हिंदी). You can use common English words (e.g., 'museum', 'ticket') if needed.",
            "english": "\n\nIMPORTANT: Always respond in English only.",
            "auto": "\n\nIMPORTANT: Match the user's language. Your response will be converted to speech, so provide clean text in either English or Hindi."
        }

        language_instruction = lang_map.get(target_language.lower(), f"\n\nIMPORTANT: Always respond in {target_language}.")

        return base_prompt + language_instruction

    def process_query(self, user_input: str, context: Optional[Dict[str, Any]] = None,
                      force_language: Optional[str] = None,
                      use_web_context: bool = True, max_web_results: int = 10) -> Dict[str, Any]:
        """
        Processes a user query by fetching context from a web scraper, then generating a response with an LLM.
        """
        with self.processing_lock:
            try:
                detected_language = self._detect_input_language(user_input)
                current_language = force_language or detected_language

                # === Web Context and Intent Retrieval ===
                web_context_str = ""
                intent_context_str = ""
                if self.use_web_scraper and use_web_context:
                    web_data = self._get_web_context(user_input, max_web_results)
                    web_context_str = web_data.get("context_str", "")
                    query_analysis = web_data.get("analysis")
                    
                    if query_analysis:
                        intent = query_analysis.get('intent', 'general')
                        location = query_analysis.get('location', 'not specified')
                        intent_context_str = (
                            f"\n\n=== USER INTENT ANALYSIS ===\n"
                            f"Detected Intent: {intent}\n"
                            f"Detected Location: {location}"
                        )

                # === Prepare Final Input and Generate Response ===
                conversation_context = self._get_formatted_conversation_history()
                formatted_input = f"User Query: {user_input}"
                if context:
                    context_str = "\n".join([f"{k}: {v}" for k, v in context.items()])
                    formatted_input = f"Provided Context:\n{context_str}\n\n{formatted_input}"

                full_context = f"{conversation_context}{intent_context_str}{web_context_str}".strip()
                if full_context:
                    formatted_input += f"\n\n=== CONTEXT FOR YOUR ANSWER ===\n{full_context}"

                system_prompt = self._get_language_aware_system_prompt(current_language)
                chain = ChatPromptTemplate.from_messages([("system", system_prompt), ("human", "{input}")]) | self.llm

                response = chain.invoke({"input": formatted_input})
                response_content = response.content.strip()

                # Store interaction in memory
                self.conversation_history.append({"role": "user", "content": user_input})
                self.conversation_history.append({"role": "assistant", "content": response_content})

                # Return a dictionary with the text and detected language for TTS
                return {
                    "text": response_content,
                    "language": self._get_tts_language(response_content)
                }

            except Exception as e:
                print(f"Error processing query: {str(e)}")
                error_message = "I apologize, but I encountered an error. Please try again."
                return {"text": error_message, "language": "english"}

    def _get_web_context(self, user_input: str, max_results: int) -> Dict[str, Any]:
        """Retrieves context from the web, using a cache to avoid redundant lookups."""
        query_key = hashlib.md5(user_input.lower().encode()).hexdigest()
        
        with self.web_cache_lock:
            if query_key in self.web_cache:
                cache_entry = self.web_cache[query_key]
                if time.time() - cache_entry['timestamp'] < self.web_cache_ttl:
                    print(f"✓ Using cached web context for query: '{user_input[:30]}...'")
                    return cache_entry['data']

        try:
            print(f"▷ Fetching new web context for query: '{user_input[:30]}...'")
            web_data = get_travel_data_for_voce(query=user_input)
            
            context_str = ""
            if web_data.get("success"):
                aggregated_data = web_data.get("aggregated_data", {})
                summary_snippets = aggregated_data.get("summary_snippets", [])
                
                if summary_snippets:
                    context_str = "\n\n=== REAL-TIME WEB CONTEXT ===\n" + "\n".join(
                        [f"- {item.strip()}" for i, item in enumerate(list(set(summary_snippets))[:max_results], 1) if item.strip()]
                    )

            output_data = {
                'context_str': context_str,
                'analysis': web_data.get('query_analysis')
            }

            with self.web_cache_lock:
                self.web_cache[query_key] = {'data': output_data, 'timestamp': time.time()}
            
            print(f"✓ Web context retrieved and cached for query: '{user_input[:30]}...'")
            return output_data

        except Exception as e:
            print(f"Warning: Error retrieving web context: {e}")
            return {"context_str": "", "analysis": None}

    def _start_cache_cleanup_thread(self):
        """Starts a background thread to periodically clean expired items from the web cache."""
        def cleanup_cache():
            while True:
                time.sleep(600)  # Clean up every 10 minutes
                with self.web_cache_lock:
                    current_time = time.time()
                    expired_keys = [
                        key for key, entry in self.web_cache.items()
                        if current_time - entry['timestamp'] > self.web_cache_ttl
                    ]
                    for key in expired_keys:
                        del self.web_cache[key]
                    if expired_keys:
                        print(f"Cleaned up {len(expired_keys)} expired cache entries.")

        threading.Thread(target=cleanup_cache, daemon=True, name="CacheCleanupThread").start()

    def _detect_input_language(self, text: str) -> str:
        """Simple language detection to guide the LLM's response style."""
        # This is a heuristic and can be replaced with a more robust library if needed
        hindi_chars = sum(1 for char in text if '\u0900' <= char <= '\u097F')
        if len(text) > 0 and (hindi_chars / len(text)) > 0.3:
            return "hindi"
        return "english"

    def _get_tts_language(self, text: str) -> str:
        """Determines if the text is primarily Hindi or English for the TTS engine."""
        hindi_chars = sum(1 for char in text if '\u0900' <= char <= '\u097F')
        # If more than 30% of characters are Hindi, use the Hindi voice.
        if len(text) > 0 and (hindi_chars / len(text)) > 0.3:
            return "Hindi"
        return "English"

    def _get_formatted_conversation_history(self, max_history: int = 4) -> str:
        """Formats the last few turns of the conversation for context."""
        if not self.conversation_history:
            return ""
        
        history_str = "\n".join([f"{item['role'].capitalize()}: {item['content']}" for item in self.conversation_history[-max_history:]])
        return f"\n\n=== RECENT CONVERSATION ===\n{history_str}"

    def shutdown(self):
        """Shuts down the thread pool."""
        print("Shutting down Language Processor thread pool...")
        self.thread_pool.shutdown(wait=True)
        print("Shutdown complete.")

    def set_response_language(self, language: str):
        """Sets the response language preference and updates the system prompt."""
        self.response_language = language
        self.system_prompt = self._get_language_aware_system_prompt()
        print(f"Response language set to: {language}")

    def clear_conversation_context(self) -> bool:
        """Clears the in-memory conversation history."""
        self.conversation_id = str(uuid.uuid4())
        self.conversation_history = []
        print(f"In-memory conversation context cleared. New conversation ID: {self.conversation_id}")
        return True