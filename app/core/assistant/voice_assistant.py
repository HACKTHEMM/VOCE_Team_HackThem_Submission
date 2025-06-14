import os
import sys
import concurrent.futures
import threading
from queue import Queue
from typing import Optional
from dotenv import load_dotenv
from app.core.modules.adapters.stt import EnhancedRealTimeTranscriber
from app.core.modules.adapters.tts import RealTimeTTS
from app.core.modules.llm.language_processor import LanguageProcessor, QueryClassifier
from app.core.modules.adapters.audio_interface import TTSAdapter, VoiceAssistant

from app.helper.get_config import load_yaml


load_dotenv()
print('Starting up Voice assistant!..')
class IntegratedVoiceAssistant:
    _instance = None
    _lock = threading.Lock()
    
    def __new__(cls, *args, **kwargs):
        with cls._lock:
            if cls._instance is None:
                cls._instance = super().__new__(cls)
        return cls._instance

    def __init__(self, groq_api_key: Optional[str] = None, max_workers: int = 4):
        with self._lock:
            if not hasattr(self, 'is_initialized'):
                self.groq_api_key = groq_api_key or os.getenv("GROQ_API_KEY")
                if not self.groq_api_key:
                    self.groq_api_key = load_yaml('GROQ_API_KEY')
                if not self.groq_api_key:
                    raise ValueError("GROQ_API_KEY is required. Set it in your .env file or pass it as parameter.")
                self.stt_instance = None
                self.language_processor = None
                self.query_classifier = None
                self.voice_assistant = None
                self.is_initialized = False
                self.max_workers = max_workers
                self.thread_pool = concurrent.futures.ThreadPoolExecutor(max_workers=self.max_workers)
                self.processing_queue = Queue()
                self.shutdown_event = threading.Event()
                self._initialize_components()
        

    def _initialize_components(self) -> None:
        """Initialize all voice assistant components with parallel execution"""
        if self.is_initialized:
            print("Components already initialized, skipping...")
            return
            
        try:
            print("Initializing Voice Assistant Components...")
            
            # Create initialization tasks
            init_tasks = {}
            
            # Setup Language Processing
            def init_language_processor():
                print("Setting up Language Processing (LangChain + Groq)...")
                return LanguageProcessor(
                    api_key=self.groq_api_key,
                    model_name=load_yaml('MODEL_ID'),
                    master_db_path=load_yaml('MASTER_DB_PATH'),
                    conversation_db_path=load_yaml('CHILD_DB_PATH')
                )
            
            init_tasks['language_processor'] = self.thread_pool.submit(init_language_processor)
            
            # Wait for language processor to initialize as it's required for other components
            self.language_processor = init_tasks['language_processor'].result()
            
            # Setup Query Classifier
            def init_query_classifier():
                print("Setting up Query Classifier...")
                return QueryClassifier(self.language_processor)
            
            # Setup Voice Assistant
            def init_voice_assistant():
                print("Assembling Voice Assistant...")
                return VoiceAssistant(self.language_processor)
            
            # Submit remaining initialization tasks
            init_tasks['query_classifier'] = self.thread_pool.submit(init_query_classifier)
            init_tasks['voice_assistant'] = self.thread_pool.submit(init_voice_assistant)
            
            # Retrieve results
            self.query_classifier = init_tasks['query_classifier'].result()
            self.voice_assistant = init_tasks['voice_assistant'].result()
            
            # Start processing thread
            self.processing_thread = threading.Thread(target=self._process_queue, daemon=True)
            self.processing_thread.start()
            
            self.is_initialized = True
            print("✓ All components initialized successfully!")
            
        except Exception as e:
            print(f"✗ Error initializing components: {e}")            
            sys.exit(1)

    def _process_queue(self):
        """Process items from the queue using thread pool"""
        while not self.shutdown_event.is_set():
            try:
                if not self.processing_queue.empty():
                    task, args, kwargs = self.processing_queue.get(timeout=0.5)
                    self.thread_pool.submit(task, *args, **kwargs)
                else:
                    # Sleep briefly to prevent CPU spin
                    self.shutdown_event.wait(0.1)
            except Exception as e:
                print(f"Error in processing queue: {e}")

    def get_voice_assistant(self) -> VoiceAssistant:
        if not self.is_initialized:
            self._initialize_components()
        return self.voice_assistant
    
    def run(self) -> None:
        try:
            # Set system prompt - can be run in a separate thread
            def setup_prompt():
                self.language_processor.set_system_prompt(
                    """You are a friendly and persuasive sales agent with a natural, human-like conversational style.
                        Provide engaging responses that build rapport and gently guide the conversation toward solutions and products.
                        Use casual language, occasional verbal fillers, and conversational transitions like a real sales professional would.
                        Keep responses concise as they will be spoken aloud. When discussing products, highlight benefits rather than features.
                        If asked about actions you cannot perform, politely explain your limitations while suggesting alternatives."""
                )
            
            # Start prompt setup in thread pool
            prompt_future = self.thread_pool.submit(setup_prompt)
            
            # Wait for prompt setup to complete
            prompt_future.result()
            
            # Start conversation in the main thread since it has its own event loop
            self.voice_assistant.start_conversation()
            
        except KeyboardInterrupt:
            print("\nKeyboard interrupt received")
            self.stop()
        except Exception as e:
            print(f"Error running voice assistant: {e}")
            self.stop()
    
    def run_with_context(self, context: dict) -> None:
        try:
            # Set context in a separate thread
            context_future = self.thread_pool.submit(self.voice_assistant.set_language_context, context)
            context_future.result()
            self.run()
        except Exception as e:
            print(f"Error running voice assistant with context: {e}")
            self.stop()

    def stop(self) -> None:
        self.shutdown_event.set()
        if self.voice_assistant:
            self.voice_assistant.stop_conversation()
        
        # Shutdown thread pool gracefully
        self.thread_pool.shutdown(wait=True)
    
    def get_language_processor(self) -> LanguageProcessor:
        return self.language_processor
    
    def get_query_classifier(self) -> QueryClassifier:
        return self.query_classifier

    def process_async(self, task, *args, **kwargs):
        """Add a task to the processing queue for async execution"""
        self.processing_queue.put((task, args, kwargs))
        return True
