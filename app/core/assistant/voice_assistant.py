import os
import sys
from typing import Optional
from dotenv import load_dotenv
from app.core.modules.adapters.stt import EnhancedRealTimeTranscriber
from app.core.modules.adapters.tts import RealTimeTTS
from app.core.modules.llm.language_processor import LanguageProcessor, QueryClassifier
# from app.core.modules.adapters.audio_interface import STTAdapter, TTSAdapter, VoiceAssistant
from app.core.modules.adapters.audio_interface import TTSAdapter, VoiceAssistant


load_dotenv()
print('Starting up Voice assistant!..')
class IntegratedVoiceAssistant:
    def __init__(self, groq_api_key: Optional[str] = None):
        self.groq_api_key = groq_api_key or os.getenv("GROQ_API_KEY")
        if not self.groq_api_key:
            raise ValueError("GROQ_API_KEY is required. Set it in your .env file or pass it as parameter.")
        self.stt_instance = None
        # self.tts_instance = None
        self.language_processor = None
        self.query_classifier = None
        self.voice_assistant = None  
        self._initialize_components()
    def _initialize_components(self) -> None:
        try:
            print("Initializing Voice Assistant Components...")
            
            print("Setting up Language Processing (LangChain + Groq)...")
            # Initialize language processor with double RAG enabled
            self.language_processor = LanguageProcessor(
                api_key=self.groq_api_key,
                master_db_path="C:/Users/HP/Programs/Projects/matrix-hackathon/chromadb_storage",
                #child
                conversation_db_path="C:/Users/HP/Programs/Projects/matrix-hackathon/chromadb_storage"
            )
            
            print("Setting up Query Classifier...")
            self.query_classifier = QueryClassifier(self.language_processor)
            
            print("Assembling Voice Assistant...")
            self.voice_assistant = VoiceAssistant(self.language_processor)
            
            print("All components initialized successfully!")
            
        except Exception as e:
            print(f"Error initializing components: {e}")
            sys.exit(1)

    def get_voice_assistant(self) -> VoiceAssistant:
        return self.voice_assistant
    
    def run(self) -> None:
        try:
            self.language_processor.set_system_prompt(
                """You are a friendly and persuasive sales agent with a natural, human-like conversational style.
                    Provide engaging responses that build rapport and gently guide the conversation toward solutions and products.
                    Use casual language, occasional verbal fillers, and conversational transitions like a real sales professional would.
                    Keep responses concise as they will be spoken aloud. When discussing products, highlight benefits rather than features.
                    If asked about actions you cannot perform, politely explain your limitations while suggesting alternatives."""
            )
            
            self.voice_assistant.start_conversation()
            
        except KeyboardInterrupt:
            print("\nKeyboard interrupt received")
            self.stop()
        except Exception as e:
            print(f"Error running voice assistant: {e}")
            self.stop()
    
    def run_with_context(self, context: dict) -> None:
        try:
            self.voice_assistant.set_language_context(context)
            self.run()
        except Exception as e:
            print(f"Error running voice assistant with context: {e}")
            self.stop()

    def stop(self) -> None:
        if self.voice_assistant:
            self.voice_assistant.stop_conversation()
    
    def get_language_processor(self) -> LanguageProcessor:
        return self.language_processor
    
    def get_query_classifier(self) -> QueryClassifier:
        return self.query_classifier
