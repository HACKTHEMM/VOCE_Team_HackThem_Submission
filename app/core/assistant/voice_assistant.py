import os
import sys
from typing import Optional
from dotenv import load_dotenv
from app.core.modules.adapters.stt import EnhancedRealTimeTranscriber
from app.core.modules.adapters.tts import RealTimeTTS
from app.core.modules.llm.language_processor import LanguageProcessor, QueryClassifier
# from app.core.modules.adapters.audio_interface import STTAdapter, TTSAdapter, VoiceAssistant
from app.core.modules.adapters.audio_interface import TTSAdapter, VoiceAssistant

from app.helper.get_config import load_yaml


load_dotenv()
print('Starting up Voice assistant!..')
class IntegratedVoiceAssistant:
    _instance = None
    
    def __new__(cls, *args, **kwargs):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
        return cls._instance

    def __init__(self, groq_api_key: Optional[str] = None):
        if not hasattr(self, 'is_initialized'):
            self.groq_api_key = groq_api_key or os.getenv("GROQ_API_KEY")
            if not self.groq_api_key:
                raise ValueError("GROQ_API_KEY is required. Set it in your .env file or pass it as parameter.")
            self.stt_instance = None
            self.language_processor = None
            self.query_classifier = None
            self.voice_assistant = None
            self.is_initialized = False
            self._initialize_components()
        

    def _initialize_components(self) -> None:
        """Initialize all voice assistant components"""
        if self.is_initialized:
            print("Components already initialized, skipping...")
            return
            
        try:
            print("Initializing Voice Assistant Components...")
            
            print("Setting up Language Processing (LangChain + Groq)...")
            self.language_processor = LanguageProcessor(
                api_key=self.groq_api_key,
                model_name=load_yaml('MODEL_ID'),
                master_db_path=load_yaml('MASTER_DB_PATH'),
                conversation_db_path=load_yaml('CHILD_DB_PATH')
            )
            
            print("Setting up Query Classifier...")
            self.query_classifier = QueryClassifier(self.language_processor)
            
            print("Assembling Voice Assistant...")
            self.voice_assistant = VoiceAssistant(self.language_processor)
            
            self.is_initialized = True
            print("✓ All components initialized successfully!")
            
        except Exception as e:
            print(f"✗ Error initializing components: {e}")            
            sys.exit(1)

    def get_voice_assistant(self) -> VoiceAssistant:
        if not self.is_initialized:
            self._initialize_components()
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
