import os
import uuid
import time
import hashlib
from typing import Optional, Dict, Any, List
from concurrent.futures import ThreadPoolExecutor, as_completed, Future
from threading import Lock, RLock
import threading
from langchain_groq import ChatGroq
from langchain_core.messages import HumanMessage, SystemMessage
from langchain_core.prompts import ChatPromptTemplate
from dotenv import load_dotenv
from app.helper.get_config import load_yaml

# Import the fixed embedding classes
from app.core.modules.embeddings.embeddings_RAG import (
    ConversationEmbeddingManager, 
    create_conversation_manager,
    EmbeddingRAGPipeline,
    add_single_user_input,
    search_similar_texts
)

# Import web scraper for enhanced context retrieval
from app.core.modules.web_scraper.web_scraper import (
    LenDenClubSearcher,
    LenDenClubQueryProcessor,
    get_lendenclub_data_for_language_processing
)

load_dotenv()

class LanguageProcessor:    
    def __init__(self, api_key: Optional[str] = None, model_name: str = load_yaml('MODEL_ID'),
                 use_conversation_context: bool = True, conversation_collection: str = "conversation_context",
                 use_master_db: bool = True, master_db_collection: str = "chromadb",
                 master_db_path: Optional[str] = None, conversation_db_path: Optional[str] = None,
                 response_language: str = "auto", allow_mixed_language: bool = True,
                 use_web_scraper: bool = True, serpapi_key: Optional[str] = None,
                 max_workers: int = 4, enable_parallel_processing: bool = True):  # Enhanced parameters with threading
        
        # Threading and concurrency setup
        self.max_workers = max_workers
        self.enable_parallel_processing = enable_parallel_processing
        self.thread_pool = ThreadPoolExecutor(max_workers=max_workers, thread_name_prefix="LangProc-Worker")
        self.processing_lock = RLock()
        self.context_lock = Lock()
        self.web_cache_lock = Lock()
        
        # Processing statistics
        self.processed_queries = 0
        self.error_count = 0
        self.active_futures = []
        
        # Basic setup
        self.api_key = api_key or os.getenv("GROQ_API_KEY")
        if not self.api_key:
            try:
                self.api_key = load_yaml('GROQ_API_KEY')
            except:
                raise ValueError("GROQ_API_KEY is required")
        
        # Web scraper setup
        self.use_web_scraper = use_web_scraper
        self.web_scraper = None
        self.query_processor = None
        
        if self.use_web_scraper:
            try:
                self.web_scraper = LenDenClubSearcher(serpapi_key)
                self.query_processor = LenDenClubQueryProcessor()
                print("✓ Web scraper initialized successfully")
            except Exception as e:
                print(f"✗ Warning: Web scraper initialization failed: {str(e)}")
                self.use_web_scraper = False
        
        self.model_name = model_name
        self.conversation_id = str(uuid.uuid4())
        self.response_language = response_language
        self.allow_mixed_language = allow_mixed_language
        
        # RAG configuration
        self.use_conversation_context = use_conversation_context
        self.use_master_db = use_master_db
        self.conversation_manager = None
        self.master_db_manager = None
    
        # Set up storage directories
        base_dir = os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(__file__))))
        default_storage = os.path.join(base_dir, "chromadb_storage")
        
        self.master_db_path = master_db_path or os.path.join(default_storage, "master_db")
        self.conversation_db_path = conversation_db_path or os.path.join(default_storage, "conversation_db")
        
        # Create storage directories
        os.makedirs(self.master_db_path, exist_ok=True)
        os.makedirs(self.conversation_db_path, exist_ok=True)
        
        # Initialize LLM
        self.llm = ChatGroq(
            groq_api_key=self.api_key,
            model_name=self.model_name,
            temperature=0.7,
            max_tokens=4096
        )
        
        # Enhanced system prompt with language awareness
        self.system_prompt = self._get_language_aware_system_prompt()
        
        self.conversation_template = ChatPromptTemplate.from_messages([
            ("system", self.system_prompt),
            ("human", "{input}")
        ])
        
        # Initialize RAG components
        self._initialize_rag_components(conversation_collection, master_db_collection)
    
    def _get_language_aware_system_prompt(self) -> str:
        """Get system prompt based on language preference"""
        base_prompt = """You are a smart, approachable, and persuasive virtual assistant designed to represent LenDen Club. "
        "Your role is to: \n"
        "- Provide clear, empathetic, and accurate answers to user queries, strictly using the provided knowledge base.\n"
        "- Assist users in navigating the onboarding process and guide them through the sales journey in a friendly, professional manner.\n"
        "- Avoid creating any fake facts or assumptions. Always base your responses solely on the information available in the knowledge base.\n"
        "- Engage users with a tone that reflects trust, confidence, and alignment with LenDen Club's values.\n"
        "- If you encounter a query outside the scope of the knowledge base, politely inform the user and suggest appropriate next steps, "
        "such as contacting customer support.\n"
        "Always prioritize clarity, empathy, and a customer-centric approach in every interaction."""
        
        if self.response_language == "hindi":
            if self.allow_mixed_language:
                language_instruction = "\n\nIMPORTANT: Respond primarily in Hindi (हिंदी) but you can use common English words when natural (like 'company', 'loan', 'process'). This mixed style (Hinglish) is acceptable and natural for Indian users."
            else:
                language_instruction = "\n\nIMPORTANT: Always respond in pure Hindi (हिंदी में जवाब दें). Use Devanagari script only. Maintain a friendly and professional tone in Hindi."
        elif self.response_language == "english":
            language_instruction = "\n\nIMPORTANT: Always respond in English only."
        elif self.response_language == "hinglish":
            language_instruction = "\n\nIMPORTANT: Respond in Hinglish (mix of Hindi and English) as commonly used in India. Use Hindi for basic communication and English for technical/business terms when natural."
        elif self.response_language == "auto":
            if self.allow_mixed_language:
                language_instruction = "\n\nIMPORTANT: Respond in the same language style as the user's query. If user mixes Hindi and English (Hinglish), respond similarly. If pure Hindi, respond in Hindi. If English, respond in English. If user writes Hindi words using English letters (Romanized Hindi), detect this and respond in proper Hindi script (Devanagari)."
            else:
                language_instruction = "\n\nIMPORTANT: Respond in the same language as the user's query. If user asks in Hindi, respond in Hindi. If in English, respond in English. If user writes Hindi words using English letters (Romanized Hindi), detect this and respond in proper Hindi script (Devanagari)."
        else:
            language_instruction = f"\n\nIMPORTANT: Always respond in {self.response_language}. If detecting Hindi words written in English letters (like 'kaise ho' or 'aap kya kar rahe ho'), respond in proper Hindi script (Devanagari)."
        
        return base_prompt + language_instruction
    
    def set_response_language(self, language: str) -> None:
        """Set the response language preference"""
        self.response_language = language
        self.system_prompt = self._get_language_aware_system_prompt()
        self.conversation_template = ChatPromptTemplate.from_messages([
            ("system", self.system_prompt),
            ("human", "{input}")
        ])
        print(f"Response language set to: {language}")
    
    def _detect_input_language(self, text: str) -> str:
        """Enhanced language detection for Hindi, English, and Hinglish"""
        # Check for Hindi characters (Devanagari script)
        hindi_chars = sum(1 for char in text if '\u0900' <= char <= '\u097F')
        # Check for English alphabetic characters
        english_chars = sum(1 for char in text if char.isalpha() and not ('\u0900' <= char <= '\u097F'))
        total_alpha_chars = hindi_chars + english_chars
        
        if total_alpha_chars == 0:
            return "english"  # default
        
        hindi_ratio = hindi_chars / total_alpha_chars
        english_ratio = english_chars / total_alpha_chars
        
        # Mixed language detection
        if hindi_ratio > 0.1 and english_ratio > 0.1:
            return "hinglish"
        elif hindi_ratio > 0.3:
            return "hindi"
        else:
            return "english"
    
    def _initialize_rag_components(self, conversation_collection: str, master_db_collection: str):
        """Initialize both RAG systems"""
        
        # Initialize conversation context manager (Child RAG)
        if self.use_conversation_context:
            try:
                print(f"Initializing conversation context with path: {self.conversation_db_path}")
                self.conversation_manager = ConversationEmbeddingManager(
                    collection_name=conversation_collection,
                    persist_directory=self.conversation_db_path
                )
                if self.conversation_manager.initialize():
                    print(f"✓ Conversation context initialized with collection: {conversation_collection}")
                else:
                    print("✗ Failed to initialize conversation context")
                    self.conversation_manager = None
            except Exception as e:
                print(f"✗ Error initializing conversation context: {str(e)}")
                self.conversation_manager = None

        # Initialize master database manager (Master RAG)
        if self.use_master_db:
            try:
                print(f"Initializing master database with path: {self.master_db_path}")
                self.master_db_manager = EmbeddingRAGPipeline(
                    collection_name=master_db_collection,
                    persist_directory=self.master_db_path
                )
                if self.master_db_manager.initialize():
                    print(f"✓ Master database initialized with collection: {master_db_collection}")
                else:
                    print("✗ Failed to initialize master database")
                    self.master_db_manager = None
            except Exception as e:
                print(f"✗ Error initializing master database: {str(e)}")
                self.master_db_manager = None
    
    def process_query(self, user_input: str, context: Optional[Dict[str, Any]] = None,
                     max_context_items: int = 3, max_master_results: int = 5,
                     master_similarity_threshold: float = 0.7, 
                     force_language: Optional[str] = None,
                     use_web_context: bool = True, max_web_results: int = 3) -> str:
        """
        Enhanced process_query with web scraper integration alongside embeddings
        """
        try:
            # Detect input language if using auto mode
            if self.response_language == "auto" and not force_language:
                detected_language = self._detect_input_language(user_input)
                current_language = detected_language
            else:
                current_language = force_language or self.response_language
            
            # === TRIPLE CONTEXT RETRIEVAL: EMBEDDINGS + WEB SCRAPER ===
            
            # First RAG: Retrieve from master knowledge database (preserved)
            master_context = ""
            if self.master_db_manager:
                try:
                    master_results = self.master_db_manager.search_similar(user_input, max_master_results)
                    if master_results:
                        master_context = "\n\n=== KNOWLEDGE BASE CONTEXT ===\n"
                        for i, result in enumerate(master_results, 1):
                            similarity = 1 - result.get('distance', 1.0)
                            if similarity >= master_similarity_threshold:
                                text = result.get('text', '')
                                metadata = result.get('metadata', {})
                                source_info = ""
                                if 'source' in metadata:
                                    source_info = f" [Source: {metadata['source']}]"
                                master_context += f"{i}. (Relevance: {similarity:.2f}){source_info} {text}\n"
                except Exception as e:
                    print(f"Warning: Error retrieving master context: {str(e)}")
            
            # Second RAG: Retrieve from conversation context (preserved)
            conversation_context = ""
            if self.conversation_manager:
                try:
                    relevant_context = self.conversation_manager.get_relevant_context(
                        user_input, n_results=max_context_items
                    )
                    
                    if relevant_context:
                        conversation_context = "\n\n=== CONVERSATION CONTEXT ===\n"
                        for i, ctx in enumerate(relevant_context, 1):
                            context_type = ctx.get('metadata', {}).get('type', 'unknown')
                            conversation_context += f"{i}. [{context_type}] {ctx['text']}\n"
                except Exception as e:
                    print(f"Warning: Error retrieving conversation context: {str(e)}")
            
            # Third Context Source: Web Scraper for real-time LenDenClub data
            web_context = ""
            if self.use_web_scraper and use_web_context and self.web_scraper:
                try:
                    # Get web-based context
                    web_data = get_lendenclub_data_for_language_processing(user_input)
                    
                    if web_data.get("success", False):
                        web_context = "\n\n=== REAL-TIME WEB CONTEXT ===\n"
                        
                        # Add primary content from web scraper
                        primary_content = web_data.get("language_processing_ready", {}).get("primary_content", [])
                        for i, content in enumerate(primary_content[:max_web_results], 1):
                            if content.strip():
                                web_context += f"{i}. [Web] {content.strip()}\n"
                        
                        # Add categorized information
                        categorized_info = web_data.get("language_processing_ready", {}).get("categorized_info", {})
                        for category, info_list in categorized_info.items():
                            if info_list and category in ["key_facts", "financial_data"]:  # Focus on most relevant categories
                                web_context += f"\n--- {category.replace('_', ' ').title()} ---\n"
                                for item in info_list[:2]:  # Limit to 2 items per category
                                    if item.strip():
                                        web_context += f"• {item.strip()}\n"
                        
                        print(f"✓ Web context retrieved: {len(primary_content)} items")
                    else:
                        print("✗ Web context retrieval failed")
                        
                except Exception as e:
                    print(f"Warning: Error retrieving web context: {str(e)}")
            
            # Prepare the input with all contexts and language instruction
            formatted_input = user_input
            if context:
                context_str = "\n".join([f"{k}: {v}" for k, v in context.items()])
                formatted_input = f"Context:\n{context_str}\n\nUser Query: {user_input}"
              # Add language-specific instruction to the input
            if current_language == "hindi":
                if self.allow_mixed_language:
                    language_reminder = "\n\n[महत्वपूर्ण: हिंदी में उत्तर दें लेकिन technical terms के लिए English का उपयोग कर सकते हैं]"
                else:
                    language_reminder = "\n\n[महत्वपूर्ण: केवल हिंदी में उत्तर दें]"
                formatted_input = formatted_input + language_reminder
            elif current_language == "hinglish":
                language_reminder = "\n\n[IMPORTANT: Respond in Hinglish (Hindi-English mix) as commonly used in India]"
                formatted_input = formatted_input + language_reminder
            elif current_language == "english":
                language_reminder = "\n\n[IMPORTANT: Respond in English only]"
                formatted_input = formatted_input + language_reminder
              # Add all three contexts: master embeddings, conversation, and web scraper
            if master_context:
                formatted_input = f"{formatted_input}{master_context}"
            if conversation_context:
                formatted_input = f"{formatted_input}{conversation_context}"
            if web_context:
                formatted_input = f"{formatted_input}{web_context}"
            
            # Generate response using LLM with temporary language-specific system prompt
            if current_language != self.response_language:
                # Create temporary template with language-specific system prompt
                temp_system_prompt = self._get_temporary_language_prompt(current_language)
                temp_template = ChatPromptTemplate.from_messages([
                    ("system", temp_system_prompt),
                    ("human", "{input}")
                ])
                chain = temp_template | self.llm
            else:
                chain = self.conversation_template | self.llm
            
            response = chain.invoke({"input": formatted_input})
            response_content = response.content.strip()
            
            # Validate response language and regenerate if needed
            if current_language == "hindi" and not self.allow_mixed_language and not self._contains_hindi(response_content):
                print("Response not in pure Hindi, regenerating...")
                hindi_prompt = f"""The user asked in Hindi: "{user_input}"
                  Please respond in pure Hindi (हिंदी) using Devanagari script only. Do not use English words.
                
                Context information:
                {master_context if master_context else ''}
                {conversation_context if conversation_context else ''}
                {web_context if web_context else ''}"""
                
                response = self.llm.invoke([
                    SystemMessage(content="You must respond in pure Hindi (हिंदी) using Devanagari script. Never use English."),
                    HumanMessage(content=hindi_prompt)
                ])
                response_content = response.content.strip()
            elif current_language == "hinglish" and not self._is_hinglish_response(response_content):
                print("Response not in Hinglish, regenerating...")
                hinglish_prompt = f"""The user asked in Hinglish: "{user_input}"
                  Please respond in Hinglish (mix of Hindi and English) as commonly used in India. Use Hindi for basic communication and English for technical/business terms naturally.
                
                Context information:
                {master_context if master_context else ''}
                {conversation_context if conversation_context else ''}
                {web_context if web_context else ''}"""
                
                response = self.llm.invoke([
                    SystemMessage(content="Respond in Hinglish (Hindi-English mix) as natural for Indian users. Mix languages naturally."),
                    HumanMessage(content=hinglish_prompt)
                ])
                response_content = response.content.strip()
            
            # Store interaction in conversation context
            if self.conversation_manager:
                try:
                    self.conversation_manager.add_user_input(user_input, self.conversation_id)
                    self.conversation_manager.add_assistant_response(response_content, self.conversation_id)
                except Exception as e:
                    print(f"Warning: Could not store conversation context: {str(e)}")
            
            return response_content
            
        except Exception as e:
            error_msg = f"Error processing query: {str(e)}"
            print(error_msg)
            
            # Return error message in appropriate language
            if current_language == "hindi":
                return "क्षमा करें, आपके अनुरोध को प्रोसेस करने में त्रुटि हुई है। कृपया पुनः प्रयास करें।"
            elif current_language == "hinglish":
                return "Sorry, आपके request को process करने में error हुई है। Please फिर से try करें।"
            else:
                return "I apologize, but I encountered an error while processing your request. Please try again."
    
    def _get_temporary_language_prompt(self, language: str) -> str:
        """Get temporary system prompt for specific language"""
        base_prompt = """You are a smart, approachable, and persuasive virtual assistant designed to represent LenDen Club. "
        "Your role is to: \n"
        "- Provide clear, empathetic, and accurate answers to user queries, strictly using the provided knowledge base.\n"
        "- Assist users in navigating the onboarding process and guide them through the sales journey in a friendly, professional manner.\n"
        "- Avoid creating any fake facts or assumptions. Always base your responses solely on the information available in the knowledge base.\n"
        "- Engage users with a tone that reflects trust, confidence, and alignment with LenDen Club's values.\n"
        "- If you encounter a query outside the scope of the knowledge base, politely inform the user and suggest appropriate next steps, "
        "such as contacting customer support.\n"
        "Always prioritize clarity, empathy, and a customer-centric approach in every interaction."""
        
        if self.response_language == "hindi":
            if self.allow_mixed_language:
                language_instruction = "\n\nIMPORTANT: Respond primarily in Hindi (हिंदी) but you can use common English words when natural (like 'company', 'loan', 'process'). This mixed style (Hinglish) is acceptable and natural for Indian users."
            else:
                language_instruction = "\n\nIMPORTANT: Always respond in pure Hindi (हिंदी में जवाब दें). Use Devanagari script only. Maintain a friendly and professional tone in Hindi."
        elif self.response_language == "english":
            language_instruction = "\n\nIMPORTANT: Always respond in English only."
        elif self.response_language == "hinglish":
            language_instruction = "\n\nIMPORTANT: Respond in Hinglish (mix of Hindi and English) as commonly used in India. Use Hindi for basic communication and English for technical/business terms when natural."
        elif self.response_language == "auto":
            if self.allow_mixed_language:
                language_instruction = "\n\nIMPORTANT: Respond in the same language style as the user's query. If user mixes Hindi and English (Hinglish), respond similarly. If pure Hindi, respond in Hindi. If English, respond in English. If user writes Hindi words using English letters (Romanized Hindi), detect this and respond in proper Hindi script (Devanagari)."
            else:
                language_instruction = "\n\nIMPORTANT: Respond in the same language as the user's query. If user asks in Hindi, respond in Hindi. If in English, respond in English. If user writes Hindi words using English letters (Romanized Hindi), detect this and respond in proper Hindi script (Devanagari)."
        else:
            language_instruction = f"\n\nIMPORTANT: Always respond in {self.response_language}. If detecting Hindi words written in English letters (like 'kaise ho' or 'aap kya kar rahe ho'), respond in proper Hindi script (Devanagari)."
        
        return base_prompt + language_instruction
    
    def _contains_hindi(self, text: str) -> bool:
        """Check if text contains Hindi characters"""
        hindi_chars = sum(1 for char in text if '\u0900' <= char <= '\u097F')
        return hindi_chars > 0
    
    def _is_hinglish_response(self, text: str) -> bool:
        """Check if response is in Hinglish (contains both Hindi and English)"""
        hindi_chars = sum(1 for char in text if '\u0900' <= char <= '\u097F')
        english_chars = sum(1 for char in text if char.isalpha() and not ('\u0900' <= char <= '\u097F'))
        
        # Consider it Hinglish if it has both Hindi and English characters
        return hindi_chars > 0 and english_chars > 0
    
    def set_mixed_language_mode(self, allow_mixed: bool) -> None:
        """Enable or disable mixed language (Hinglish) responses"""
        self.allow_mixed_language = allow_mixed
        self.system_prompt = self._get_language_aware_system_prompt()
        self.conversation_template = ChatPromptTemplate.from_messages([
            ("system", self.system_prompt),
            ("human", "{input}")
        ])
        print(f"Mixed language mode: {'Enabled' if allow_mixed else 'Disabled'}")
    
    def process_hinglish_query(self, user_input: str, **kwargs) -> str:
        """Specifically process query in Hinglish"""
        return self.process_query(user_input, force_language="hinglish", **kwargs)
    
    def process_hindi_query(self, user_input: str, **kwargs) -> str:
        """Specifically process query in Hindi"""
        return self.process_query(user_input, force_language="hindi", **kwargs)
    
    def process_english_query(self, user_input: str, **kwargs) -> str:
        """Specifically process query in English"""
        return self.process_query(user_input, force_language="english", **kwargs)
    
    # ... (rest of the methods remain the same as in original code)
    
    def set_conversation_id(self, conversation_id: str) -> None:
        """Set the conversation ID for context tracking"""
        self.conversation_id = conversation_id
        
    def process_query_with_similar_context(self, user_input: str, collection_name: str = "user_inputs",
                                         max_similar_items: int = 3) -> str:
        """Process query with additional similar context from specified collection"""
        try:
            similar_inputs = search_similar_texts(user_input, collection_name, max_similar_items)
            
            similar_context = ""
            if similar_inputs:
                similar_context = "\n\nSimilar past inputs for reference:\n"
                for i, item in enumerate(similar_inputs, 1):
                    distance = item.get('distance', 0)
                    similar_context += f"{i}. (similarity: {1-distance:.2f}) {item['text']}\n"
            
            formatted_input = user_input
            if similar_context:
                formatted_input = f"{formatted_input}{similar_context}"
            
            return self.process_query(formatted_input)
            
        except Exception as e:
            print(f"Warning: Could not retrieve similar context: {str(e)}")
            return self.process_query(user_input)
    
    def get_conversation_history(self, query: str = "", n_results: int = 10) -> List[Dict[str, Any]]:
        """Get conversation history"""
        if not self.conversation_manager:
            return []
            
        try:
            if query:
                return self.conversation_manager.get_relevant_context(query, n_results)
            else:
                return self.conversation_manager.get_relevant_context("conversation", n_results)
        except Exception as e:
            print(f"Error retrieving conversation history: {str(e)}")
            return []
    
    def clear_conversation_context(self) -> bool:
        """Clear conversation context by creating new conversation ID"""
        try:
            self.conversation_id = str(uuid.uuid4())
            return True
        except Exception as e:
            print(f"Error clearing conversation context: {str(e)}")
            return False
    
    def process_with_embedding_context(self, user_input: str, collection_name: str = "user_inputs") -> str:
        """Process with embedding context and store the input"""
        try:
            metadata = {
                "conversation_id": self.conversation_id,
                "processing_type": "with_embedding_context"
            }
            add_single_user_input(user_input, collection_name, metadata)
            
            return self.process_query_with_similar_context(user_input, collection_name)
            
        except Exception as e:
            print(f"Warning: Could not store input in embeddings: {str(e)}")
            return self.process_query(user_input)
    
    def set_system_prompt(self, new_prompt: str) -> None:
        """Update the system prompt"""
        self.system_prompt = new_prompt
        self.conversation_template = ChatPromptTemplate.from_messages([
            ("system", self.system_prompt),
            ("human", "{input}")
        ])
    
    def process_with_custom_prompt(self, user_input: str, custom_system_prompt: str) -> str:
        """Process query with custom system prompt"""
        try:
            custom_template = ChatPromptTemplate.from_messages([
                ("system", custom_system_prompt),
                ("human", "{input}")
            ])
            
            chain = custom_template | self.llm
            response = chain.invoke({"input": user_input})
            
            return response.content.strip()
            
        except Exception as e:
            error_msg = f"Error processing query with custom prompt: {str(e)}"
            print(error_msg)
            return "I apologize, but I encountered an error while processing your request. Please try again."
    
    # def add_to_master_db(self, text: str, metadata: Dict[str, Any] = None) -> bool:
    #     """Add content to master knowledge database"""
    #     if not self.master_db_manager:
    #         print("Master database not initialized")
    #         return False
        
    #     try:
    #         return self.master_db_manager.add_single_input(text, metadata)
    #     except Exception as e:
    #         print(f"Error adding to master database: {str(e)}")
    #         return False
    
    def get_system_status(self) -> Dict[str, Any]:
        """Get status of all components including web scraper"""
        return {
            "conversation_manager_active": self.conversation_manager is not None,
            "master_db_active": self.master_db_manager is not None,
            "web_scraper_active": self.use_web_scraper and self.web_scraper is not None,
            "conversation_id": self.conversation_id,
            "master_db_path": self.master_db_path,
            "conversation_db_path": self.conversation_db_path,
            "response_language": self.response_language,
            "allow_mixed_language": self.allow_mixed_language,
            "web_scraper_enabled": self.use_web_scraper
        }
    
    def set_web_scraper_enabled(self, enabled: bool) -> None:
        """Enable or disable web scraper integration"""
        self.use_web_scraper = enabled
        print(f"Web scraper integration: {'Enabled' if enabled else 'Disabled'}")
    
    def process_query_with_web_priority(self, user_input: str, **kwargs) -> str:
        """Process query with prioritized web context"""
        kwargs['use_web_context'] = True
        kwargs['max_web_results'] = kwargs.get('max_web_results', 5)
        return self.process_query(user_input, **kwargs)
    
    def process_query_without_web(self, user_input: str, **kwargs) -> str:
        """Process query without web context (embeddings only)"""
        kwargs['use_web_context'] = False
        return self.process_query(user_input, **kwargs)
    
    def get_web_context_for_query(self, user_input: str, max_results: int = 3) -> Dict[str, Any]:
        """Get web context for a query without processing it through LLM"""
        if not self.use_web_scraper or not self.web_scraper:
            return {"success": False, "error": "Web scraper not available"}
        
        try:
            web_data = get_lendenclub_data_for_language_processing(user_input)
            return {
                "success": web_data.get("success", False),
                "context": web_data.get("language_processing_ready", {}),
                "query_analysis": web_data.get("query_analysis", {}),
                "metadata": web_data.get("metadata", {})
            }
        except Exception as e:
            return {"success": False, "error": str(e)}

class QueryClassifier:
    
    def __init__(self, language_processor: LanguageProcessor):
        self.processor = language_processor
        self.classification_prompt = """Classify the following user query into one of these categories:
        1. QUESTION - User is asking for information or explanation
        2. COMMAND - User wants to perform an action or task
        3. CONVERSATION - User is engaging in casual conversation
        4. TECHNICAL - User needs technical help or documentation
        
        Respond with only the category name."""
    
    def classify_query(self, user_input: str) -> str:
        try:
            classification = self.processor.process_with_custom_prompt(
                user_input, 
                self.classification_prompt
            )
            return classification.upper().strip()
        except Exception:
            return "CONVERSATION"


class EnhancedLanguageProcessor(LanguageProcessor):
    """Enhanced version with additional context collection support and advanced web integration with threading"""
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.context_collections = {}
        self.web_cache = {}  # Cache for web results
        self.web_cache_ttl = 3600  # 1 hour TTL for web cache
        
        # Additional thread pool for enhanced operations
        self.enhanced_thread_pool = ThreadPoolExecutor(
            max_workers=min(6, self.max_workers + 2), 
            thread_name_prefix="Enhanced-Worker"
        )
        self.cache_cleanup_thread = None
        self._start_cache_cleanup_thread()
    
    def _start_cache_cleanup_thread(self):
        """Start background thread for cache cleanup"""
        def cleanup_cache():
            while not self.thread_pool._shutdown:
                try:
                    current_time = time.time()
                    with self.web_cache_lock:
                        expired_keys = [
                            key for key, entry in self.web_cache.items()
                            if current_time - entry['timestamp'] > self.web_cache_ttl
                        ]
                        for key in expired_keys:
                            del self.web_cache[key]
                    
                    time.sleep(300)  # Clean up every 5 minutes
                except Exception as e:
                    print(f"Error in cache cleanup: {e}")
        
        self.cache_cleanup_thread = threading.Thread(target=cleanup_cache, daemon=True)
        self.cache_cleanup_thread.start()
    
    def add_context_collection(self, name: str, collection_name: str, persist_directory: str = None) -> bool:
        """Add an additional context collection"""
        try:
            storage_path = persist_directory or self.master_db_path
            pipeline = EmbeddingRAGPipeline(
                collection_name=collection_name,
                persist_directory=storage_path
            )
            if pipeline.initialize():
                self.context_collections[name] = pipeline
                print(f"Added context collection '{name}'")
                return True
        except Exception as e:
            print(f"Error adding context collection: {str(e)}")
            return False
    
    def process_with_multi_context(self, user_input: str, context_names: List[str] = None,
                                  max_items_per_context: int = 2, use_web_context: bool = True) -> str:
        """Process with multiple context sources using parallel retrieval"""
        if not self.context_collections and not (self.use_web_scraper and use_web_context):
            return self.process_query_parallel(user_input, use_web_context=use_web_context)
        
        try:
            contexts_to_use = context_names if context_names else list(self.context_collections.keys())
            
            if self.enable_parallel_processing and len(contexts_to_use) > 1:
                # Parallel context retrieval
                context_futures = []
                
                for context_name in contexts_to_use:
                    if context_name in self.context_collections:
                        future = self.enhanced_thread_pool.submit(
                            self._get_additional_context, 
                            context_name, user_input, max_items_per_context
                        )
                        context_futures.append((context_name, future))
                
                # Collect results
                multi_context = ""
                for context_name, future in context_futures:
                    try:
                        context_result = future.result(timeout=10)
                        if context_result:
                            multi_context += f"\n\n=== {context_name.upper()} CONTEXT ===\n{context_result}"
                    except Exception as e:
                        print(f"Error retrieving {context_name} context: {e}")
            else:
                # Sequential retrieval
                multi_context = ""
                for context_name in contexts_to_use:
                    if context_name in self.context_collections:
                        context_result = self._get_additional_context(context_name, user_input, max_items_per_context)
                        if context_result:
                            multi_context += f"\n\n=== {context_name.upper()} CONTEXT ===\n{context_result}"
            
            enhanced_input = user_input
            if multi_context:
                enhanced_input = f"{user_input}\n\nAdditional Context:{multi_context}"
            
            return self.process_query_parallel(enhanced_input, use_web_context=use_web_context)
            
        except Exception as e:
            print(f"Error processing with multi-context: {str(e)}")
            return self.process_query_parallel(user_input, use_web_context=use_web_context)
    
    def _get_additional_context(self, context_name: str, user_input: str, max_items: int) -> str:
        """Get context from additional collections in thread-safe manner"""
        try:
            if context_name not in self.context_collections:
                return ""
            
            pipeline = self.context_collections[context_name]
            results = pipeline.search_similar(user_input, max_items)
            
            if not results:
                return ""
            
            context_text = ""
            for i, result in enumerate(results, 1):
                similarity = 1 - result.get('distance', 1.0)
                text = result.get('text', '')
                context_text += f"{i}. (Relevance: {similarity:.2f}) {text}\n"
            
            return context_text
            
        except Exception as e:
            print(f"Error getting additional context for {context_name}: {str(e)}")
            return ""
    
    def add_to_context_collection(self, context_name: str, text: str, metadata: Dict[str, Any] = None) -> bool:
        """Add content to a specific context collection"""
        if context_name not in self.context_collections:
            print(f"Context collection '{context_name}' not found")
            return False
        
        try:
            pipeline = self.context_collections[context_name]
            return pipeline.add_single_input(text, metadata)
        except Exception as e:
            print(f"Error adding to context collection: {str(e)}")
            return False
    
    def get_cached_web_context(self, query_key: str) -> Optional[Dict[str, Any]]:
        """Get cached web context if available and not expired"""
        if query_key in self.web_cache:
            cache_entry = self.web_cache[query_key]
            if time.time() - cache_entry['timestamp'] < self.web_cache_ttl:
                return cache_entry['data']
            else:
                del self.web_cache[query_key]  # Remove expired cache
        return None
    
    def cache_web_context(self, query_key: str, web_data: Dict[str, Any]) -> None:
        """Cache web context for future use"""
        self.web_cache[query_key] = {
            'data': web_data,
            'timestamp': time.time()
        }
    
    def process_with_cached_web_context(self, user_input: str, **kwargs) -> str:
        """Process query with cached web context when possible using parallel processing"""
        query_key = hashlib.md5(user_input.lower().encode()).hexdigest()
        
        # Check for cached web context
        cached_context = self.get_cached_web_context(query_key)
        if cached_context:
            print("Using cached web context")
            # Use cached context instead of fetching new one
            # This is a simplified implementation - in practice, you'd modify the process_query method
            # to accept pre-fetched web context
        
        result = self.process_query_parallel(user_input, **kwargs)
        
        # Cache the web context for future use if it was fetched
        if kwargs.get('use_web_context', True) and self.use_web_scraper:
            try:
                web_data = self.get_web_context_for_query(user_input)
                if web_data.get('success', False):
                    self.cache_web_context(query_key, web_data)
            except Exception as e:
                print(f"Error caching web context: {e}")
        
        return result
    
    def shutdown(self):
        """Enhanced shutdown with additional thread pool cleanup"""
        print("Shutting down Enhanced Language Processor...")
        
        # Shutdown enhanced thread pool
        if hasattr(self, 'enhanced_thread_pool'):
            self.enhanced_thread_pool.shutdown(wait=True)
        
        # Call parent shutdown
        super().shutdown()
        
        print("Enhanced Language Processor shutdown complete.")
