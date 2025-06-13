import os
from typing import Optional, Dict, Any, List
from langchain_groq import ChatGroq
from langchain_core.messages import HumanMessage, SystemMessage
from langchain_core.prompts import ChatPromptTemplate
from dotenv import load_dotenv

from app.core.modules.embeddings.embeddings_RAG import ConversationEmbeddingManager, create_conversation_manager

load_dotenv()

class LanguageProcessor:
    
    def __init__(self, api_key: Optional[str] = None, model_name: str = "llama3-8b-8192",
                 use_conversation_context: bool = True, conversation_collection: str = "conversation_context"):
        self.api_key = api_key or os.getenv("GROQ_API_KEY")
        if not self.api_key:
            raise ValueError("GROQ_API_KEY is required")
        
        self.model_name = model_name
        self.use_conversation_context = use_conversation_context
        self.conversation_id = None
        
        self.llm = ChatGroq(
            groq_api_key=self.api_key,
            model_name=self.model_name,
            temperature=0.7,
            max_tokens=4096
        )
        
        self.conversation_manager = None
        if self.use_conversation_context:
            try:
                self.conversation_manager = create_conversation_manager(conversation_collection)
                if not self.conversation_manager.initialize():
                    print("Warning: Could not initialize conversation context. Continuing without context.")
                    self.conversation_manager = None
            except Exception as e:
                print(f"Warning: Error initializing conversation context: {str(e)}. Continuing without context.")
                self.conversation_manager = None
        
        self.system_prompt = """You are a friendly and persuasive sales agent with a natural, human-like conversational style.
            Provide engaging responses that build rapport and gently guide the conversation toward solutions and products.
            Use casual language, occasional verbal fillers, and conversational transitions like a real sales professional would.
            Keep responses concise as they will be spoken aloud. When discussing products, highlight benefits rather than features.
            If asked about actions you cannot perform, politely explain your limitations while suggesting alternatives."""
        
        self.conversation_template = ChatPromptTemplate.from_messages([
            ("system", self.system_prompt),
            ("human", "{input}")
        ])
    
    def set_conversation_id(self, conversation_id: str) -> None:
        self.conversation_id = conversation_id
    
    def process_query(self, user_input: str, context: Optional[Dict[str, Any]] = None, 
                     max_context_items: int = 3) -> str:
        try:
            conversation_context = ""
            if self.conversation_manager and user_input:
                relevant_context = self.conversation_manager.get_relevant_context(
                    user_input, n_results=max_context_items
                )
                
                if relevant_context:
                    conversation_context = "\n\nRelevant conversation context:\n"
                    for i, ctx in enumerate(relevant_context, 1):
                        context_type = ctx.get('metadata', {}).get('type', 'unknown')
                        conversation_context += f"{i}. [{context_type}] {ctx['text']}\n"
            
            formatted_input = user_input
            if context:
                context_str = "\n".join([f"{k}: {v}" for k, v in context.items()])
                formatted_input = f"Context:\n{context_str}\n\nUser Query: {user_input}"
            
            if conversation_context:
                formatted_input = f"{formatted_input}{conversation_context}"
            
            chain = self.conversation_template | self.llm
            response = chain.invoke({"input": formatted_input})
            
            response_content = response.content.strip()
            
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
            return "I apologize, but I encountered an error while processing your request. Please try again."
    
    def process_query_with_similar_context(self, user_input: str, collection_name: str = "user_inputs",
                                         max_similar_items: int = 3) -> str:
        try:
            from embeddings_RAG import search_similar_texts
            
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
        try:
            import uuid
            self.conversation_id = str(uuid.uuid4())
            return True
        except Exception as e:
            print(f"Error clearing conversation context: {str(e)}")
            return False
    
    def process_with_embedding_context(self, user_input: str, collection_name: str = "user_inputs") -> str:
        try:
            from embeddings_RAG import add_single_user_input
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
        self.system_prompt = new_prompt
        self.conversation_template = ChatPromptTemplate.from_messages([
            ("system", self.system_prompt),
            ("human", "{input}")
        ])
    
    def process_with_custom_prompt(self, user_input: str, custom_system_prompt: str) -> str:
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
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.context_collections = {}
    
    def add_context_collection(self, name: str, collection_name: str) -> bool:
        try:
            from embeddings_RAG import EmbeddingRAGPipeline
            pipeline = EmbeddingRAGPipeline(collection_name=collection_name)
            self.context_collections[name] = pipeline
            return True
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
