import os
import uuid
from typing import Optional, Dict, Any, List
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

load_dotenv()
import os
import uuid
from typing import Optional, Dict, Any, List
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

load_dotenv()

class LanguageProcessor:    
    def __init__(self, api_key: Optional[str] = None, model_name: str = load_yaml('MODEL_ID'),
                 use_conversation_context: bool = True, conversation_collection: str = "conversation_context",
                 use_master_db: bool = True, master_db_collection: str = "chromadb",
                 master_db_path: Optional[str] = None, conversation_db_path: Optional[str] = None,
                 response_language: str = "auto", allow_mixed_language: bool = True):  # Enhanced parameters
        
        # Basic setup
        self.api_key = api_key or os.getenv("GROQ_API_KEY")
        if not self.api_key:
            raise ValueError("GROQ_API_KEY is required")
        
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
        base_prompt = """You are a smart, friendly, and persuasive voice assistant with access to a detailed knowledge base of the company lenden. 
        Your role is to answer custom queries with clarity and empathy, and guide them through the onboarding or sales process using your knowledge.
        Don't use more than 20 words unless necessary. And ***NEVER EVER USE ',' IN YOUR RESPONSE***.
        Don't create fake facts use the knowledge you have been provided to answer."""
        
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
                language_instruction = "\n\nIMPORTANT: Respond in the same language style as the user's query. If user mixes Hindi and English (Hinglish), respond similarly. If pure Hindi, respond in Hindi. If English, respond in English."
            else:
                language_instruction = "\n\nIMPORTANT: Respond in the same language as the user's query. If user asks in Hindi, respond in Hindi. If in English, respond in English."
        else:
            language_instruction = f"\n\nIMPORTANT: Always respond in {self.response_language}."
        
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
                     force_language: Optional[str] = None) -> str:
        """
        Enhanced process_query with language awareness
        """
        try:
            # Detect input language if using auto mode
            if self.response_language == "auto" and not force_language:
                detected_language = self._detect_input_language(user_input)
                current_language = detected_language
            else:
                current_language = force_language or self.response_language
            
            # === DUAL RAG RETRIEVAL ===
            
            # First RAG: Retrieve from master knowledge database
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
            
            # Second RAG: Retrieve from conversation context
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
            
            # Prepare the input with contexts and language instruction
            formatted_input = user_input
            if context:
                context_str = "\n".join([f"{k}: {v}" for k, v in context.items()])
                formatted_input = f"Context:\n{context_str}\n\nUser Query: {user_input}"
            
            # Add language-specific instruction to the input
            if current_language == "hindi":
                if self.allow_mixed_language:
                    language_reminder = "\n\n[IMPORTANT: Respond in Hindi but common English words are acceptable (Hinglish style)]"
                else:
                    language_reminder = "\n\n[IMPORTANT: Respond in pure Hindi (हिंदी) using Devanagari script only]"
                formatted_input = formatted_input + language_reminder
            elif current_language == "hinglish":
                language_reminder = "\n\n[IMPORTANT: Respond in Hinglish (Hindi-English mix) as commonly used in India]"
                formatted_input = formatted_input + language_reminder
            elif current_language == "english":
                language_reminder = "\n\n[IMPORTANT: Respond in English only]"
                formatted_input = formatted_input + language_reminder
            
            # Add both contexts
            if master_context:
                formatted_input = f"{formatted_input}{master_context}"
            if conversation_context:
                formatted_input = f"{formatted_input}{conversation_context}"
            
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
                {conversation_context if conversation_context else ''}"""
                
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
                {conversation_context if conversation_context else ''}"""
                
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
        base_prompt = """You are a smart, friendly, and persuasive voice assistant with access to a detailed knowledge base of the company lenden. 
        Your role is to answer custom queries with clarity and empathy, and guide them through the onboarding or sales process using your knowledge.
        Don't use more than 20 words unless necessary.
        Don't create fake facts use the knowledge you have been provided to answer."""
        
        if language == "hindi":
            if self.allow_mixed_language:
                return base_prompt + "\n\nCRITICAL: Respond primarily in Hindi (हिंदी) but common English words (like company, loan, process) are acceptable when natural."
            else:
                return base_prompt + "\n\nCRITICAL: You MUST respond ONLY in Hindi (हिंदी) using Devanagari script. Never use English words or Roman script."
        elif language == "hinglish":
            return base_prompt + "\n\nCRITICAL: Respond in Hinglish (Hindi-English mix). Use Hindi for basic communication और English for technical terms जब natural लगे।"
        else:
            return base_prompt + f"\n\nIMPORTANT: Respond only in {language}."
    
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
        """Get status of all components"""
        return {
            "conversation_manager_active": self.conversation_manager is not None,
            "master_db_active": self.master_db_manager is not None,
            "conversation_id": self.conversation_id,
            "master_db_path": self.master_db_path,
            "conversation_db_path": self.conversation_db_path,
            "response_language": self.response_language,
            "allow_mixed_language": self.allow_mixed_language
        }


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
    """Enhanced version with additional context collection support"""
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.context_collections = {}
    
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
        except Exception as e:
            print(f"Error adding context collection: {str(e)}")
            return False
    
    def process_with_multi_context(self, user_input: str, context_names: List[str] = None,
                                  max_items_per_context: int = 2) -> str:
        if not self.context_collections:
            return self.process_query(user_input)
        
        try:
            contexts_to_use = context_names if context_names else list(self.context_collections.keys())
            
            multi_context = ""
            for context_name in contexts_to_use:
                if context_name in self.context_collections:
                    pipeline = self.context_collections[context_name]
                    similar_items = pipeline.search_similar(user_input, max_items_per_context)
                    
                    if similar_items:
                        multi_context += f"\n\nContext from {context_name}:\n"
                        for i, item in enumerate(similar_items, 1):
                            similarity = 1 - item.get('distance', 0)
                            multi_context += f"{i}. (similarity: {similarity:.2f}) {item['text']}\n"
            
            enhanced_input = user_input
            if multi_context:
                enhanced_input = f"{user_input}{multi_context}"
            
            return self.process_query(enhanced_input)
            
        except Exception as e:
            print(f"Error processing with multi-context: {str(e)}")
            return self.process_query(user_input)
    
    def add_to_context_collection(self, context_name: str, text: str, metadata: Dict[str, Any] = None) -> bool:
        if context_name not in self.context_collections:
            print(f"Context collection '{context_name}' not found")
            return False
        
        try:
            pipeline = self.context_collections[context_name]
            return pipeline.add_single_input(text, metadata)
        except Exception as e:
            print(f"Error adding to context collection: {str(e)}")
            return False
