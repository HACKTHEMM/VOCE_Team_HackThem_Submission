import os
import sys
import concurrent.futures
import threading
from queue import Queue
from typing import Optional
from dotenv import load_dotenv
from app.core.modules.adapters.stt import EnhancedRealTimeTranscriber
from app.core.modules.adapters.tts import RealTimeTTS
from app.core.modules.llm.language_processor import LanguageProcessor
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
                    try:
                        self.groq_api_key = load_yaml('GROQ_API_KEY')
                    except:
                        raise ValueError("GROQ_API_KEY is required. Set it in your .env file or pass it as parameter.")
                
                self.language_processor = None
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
            
            # Setup Language Processing - Simplified instantiation
            def init_language_processor():
                print("Setting up Language Processing (Groq + Web Scraper)...")
                return LanguageProcessor(
                    api_key=self.groq_api_key,
                    model_name=load_yaml('MODEL_ID')
                )
            
            self.language_processor = init_language_processor()

            # Setup Voice Assistant
            def init_voice_assistant():
                print("Assembling Voice Assistant...")
                return VoiceAssistant(self.language_processor)
            
            self.voice_assistant = self.thread_pool.submit(init_voice_assistant).result()

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
                    self.shutdown_event.wait(0.1)
            except Exception as e:
                print(f"Error in processing queue: {e}")

    def get_voice_assistant(self) -> VoiceAssistant:
        if not self.is_initialized:
            self._initialize_components()
        return self.voice_assistant
    
    def run(self) -> None:
        try:
            self.voice_assistant.start_conversation()
        except KeyboardInterrupt:
            print("\nKeyboard interrupt received")
            self.stop()
        except Exception as e:
            print(f"Error running voice assistant: {e}")
            self.stop()
    
    def run_with_context(self, context: dict) -> None:
        try:
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
        
        self.thread_pool.shutdown(wait=True)
        if self.language_processor:
            self.language_processor.shutdown()
    
    def get_language_processor(self) -> LanguageProcessor:
        return self.language_processor
    
    def process_async(self, task, *args, **kwargs):
        """Add a task to the processing queue for async execution"""
        self.processing_queue.put((task, args, kwargs))
        return True