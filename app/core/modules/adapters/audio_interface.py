import threading
import time
import queue
import concurrent.futures
from typing import Optional, Callable, Dict, Any
from abc import ABC, abstractmethod
import logging
from dataclasses import dataclass
from enum import Enum

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class TaskStatus(Enum):
    PENDING = "pending"
    PROCESSING = "processing"
    COMPLETED = "completed"
    FAILED = "failed"

@dataclass
class AudioTask:
    task_id: str
    text: str
    language: str = "English"  # Add language field
    priority: int = 0
    timestamp: float = None
    status: TaskStatus = TaskStatus.PENDING
    result: Any = None
    error: str = None
    
    def __post_init__(self):
        if self.timestamp is None:
            self.timestamp = time.time()

class ThreadSafeCounter:
    """Thread-safe counter for generating unique task IDs"""
    def __init__(self):
        self._value = 0
        self._lock = threading.Lock()
    
    def increment(self):
        with self._lock:
            self._value += 1
            return self._value

class AudioProcessor(ABC):
    @abstractmethod
    def process(self, data: Any) -> Any:
        pass
    
    @abstractmethod
    def start(self) -> None:
        pass
    
    @abstractmethod
    def stop(self) -> None:
        pass

class TTSAdapter(AudioProcessor):
    def __init__(self, tts_instance, max_workers: int = 3, max_queue_size: int = 50):
        self.tts_instance = tts_instance
        self.is_initialized = False
        self.is_speaking = False
        
        # Thread pool for handling TTS tasks
        self.max_workers = max_workers
        self.executor = None
        
        # Task management
        self.task_counter = ThreadSafeCounter()
        self.task_queue = queue.PriorityQueue(maxsize=max_queue_size)
        self.active_tasks = {}
        self.completed_tasks = {}
        
        # Thread synchronization
        self.lock = threading.RLock()
        self.condition = threading.Condition(self.lock)
        self.stop_event = threading.Event()
        
        # Worker threads
        self.queue_processor_thread = None
        
        # Callbacks
        self.completion_callbacks = []

    def start(self) -> None:
        """Starts the TTS adapter and its background threads."""
        if self.is_initialized:
            logger.info("TTSAdapter is already started.")
            return

        logger.info("Starting TTSAdapter...")
        self.stop_event.clear()
        
        # Initialize the thread pool executor
        self.executor = concurrent.futures.ThreadPoolExecutor(
            max_workers=self.max_workers,
            thread_name_prefix="TTSAdapterWorker"
        )
        
        # Start the queue processor thread
        self.queue_processor_thread = threading.Thread(target=self._queue_processor, daemon=True)
        self.queue_processor_thread.start()
        
        self.is_initialized = True
        logger.info("TTSAdapter started successfully.")

    def stop(self) -> None:
        """Stops the TTS adapter and cleans up resources."""
        if not self.is_initialized:
            logger.info("TTSAdapter is not running.")
            return

        logger.info("Stopping TTSAdapter...")
        self.stop_event.set()
        
        # Signal the queue processor to stop
        self.task_queue.put((0, None))
        
        # Wait for the queue processor thread to finish
        if self.queue_processor_thread and self.queue_processor_thread.is_alive():
            self.queue_processor_thread.join(timeout=5.0)

        # Shutdown the thread pool
        if self.executor:
            self.executor.shutdown(wait=True, timeout=10.0)
            self.executor = None

        self.is_initialized = False
        logger.info("TTSAdapter stopped.")

    def add_completion_callback(self, callback: Callable[[str, str], None]):
        """Add callback to be called when TTS task completes"""
        with self.lock:
            self.completion_callbacks.append(callback)    

    def _queue_processor(self):
        """Process tasks from the queue in a separate thread"""
        logger.info("TTS Queue processor started")
        
        while not self.stop_event.is_set():
            try:
                try:
                    priority, task = self.task_queue.get(timeout=1.0)
                except queue.Empty:
                    continue
                
                if task is None:  # Shutdown signal
                    break
                
                with self.lock:
                    task.status = TaskStatus.PROCESSING
                    self.active_tasks[task.task_id] = task
                
                logger.info(f"Processing TTS task {task.task_id} for language '{task.language}': {task.text[:30]}...")
                
                try:
                    # Dynamically set speaker based on language
                    speaker_name = "Jenny" if task.language.lower() == "english" else "Aria" # Assuming 'Aria' for Hindi
                    # self.tts_instance.set_speaker(speaker_name) # This line might need adjustment based on your RealTimeTTS implementation
                    logger.info(f"TTS speaker set to '{speaker_name}' for task {task.task_id}")

                    # Submit the actual TTS processing to the thread pool
                    future = self.executor.submit(self._process_tts_task, task)
                    audio_path = future.result(timeout=30.0) # Wait for the result
                    
                    with self.lock:
                        task.status = TaskStatus.COMPLETED
                        task.result = audio_path
                        self.completed_tasks[task.task_id] = task
                        if task.task_id in self.active_tasks:
                            del self.active_tasks[task.task_id]
                    
                    for callback in self.completion_callbacks:
                        try:
                            callback(task.task_id, audio_path)
                        except Exception as e:
                            logger.error(f"Error in completion callback: {e}")
                    
                    logger.info(f"TTS task {task.task_id} completed successfully")
                    
                except Exception as e:
                    with self.lock:
                        task.status = TaskStatus.FAILED
                        task.error = str(e)
                        self.completed_tasks[task.task_id] = task
                        if task.task_id in self.active_tasks:
                            del self.active_tasks[task.task_id]
                    
                    logger.error(f"TTS task {task.task_id} failed: {e}")
                
                finally:
                    self.task_queue.task_done()
                    with self.condition:
                        self.condition.notify_all()
            except Exception as e:
                logger.error(f"Error in queue processor: {e}")
        
        logger.info("TTS Queue processor stopped")

    def _process_tts_task(self, task: AudioTask) -> Optional[str]:
        """Process individual TTS task."""
        try:
            logger.info(f"Submitting to TTS instance task {task.task_id}: {task.text[:50]}...")
            
            # This assumes your RealTimeTTS has a method to convert text and get the result.
            # You might need to adjust this based on your actual TTS class implementation.
            if hasattr(self.tts_instance, 'convert_text_and_get_path'):
                audio_path = self.tts_instance.convert_text_and_get_path(task.text, timeout=20.0)
                if audio_path:
                    logger.info(f"TTS task {task.task_id} completed successfully: {audio_path}")
                    return audio_path
                else:
                    logger.warning(f"TTS task {task.task_id} timed out or failed to generate audio.")
                    return None
            else:
                # Fallback if the direct conversion method doesn't exist
                logger.warning("Using fallback TTS method.")
                self.tts_instance.add_text(task.text)
                time.sleep(5) # This is a naive wait, a more robust mechanism is preferred
                return self.tts_instance.get_last_audio_file_path()

        except Exception as e:
            logger.error(f"Error processing TTS task {task.task_id}: {e}")
            raise
    
    def speak_text_async(self, text: str, language: str = "English", priority: int = 0) -> str:
        """Add text to TTS queue asynchronously and return task ID"""
        if not self.is_initialized:
            # You might want to automatically start it or raise an error
            logger.warning("TTSAdapter is not started. Starting automatically.")
            self.start()
        
        task_id = f"tts_{self.task_counter.increment()}"
        task = AudioTask(
            task_id=task_id,
            text=text,
            language=language,
            priority=priority
        )
        
        try:
            self.task_queue.put((-priority, task), timeout=1.0)
            logger.info(f"TTS task {task_id} queued with priority {priority} for language {language}")
            return task_id
        except queue.Full:
            logger.error("TTS queue is full, cannot add new task")
            raise Exception("TTS queue is full")

    def wait_for_task(self, task_id: str, timeout: float) -> Optional[str]:
        """Waits for a task to complete and returns the result."""
        end_time = time.time() + timeout
        
        with self.condition:
            while time.time() < end_time:
                if task_id in self.completed_tasks:
                    task = self.completed_tasks[task_id]
                    if task.status == TaskStatus.COMPLETED:
                        return task.result
                    elif task.status == TaskStatus.FAILED:
                        raise Exception(f"TTS task {task_id} failed: {task.error}")
                
                remaining_time = end_time - time.time()
                if remaining_time <= 0:
                    break
                self.condition.wait(timeout=remaining_time)

        raise TimeoutError(f"Task {task_id} did not complete within the timeout period.")

    def speak_text(self, text: str, language: str = "English", priority: int = 0, timeout: float = 30.0) -> Optional[str]:
        """Speak text synchronously - blocks until audio is generated"""
        task_id = self.speak_text_async(text, language, priority)
        return self.wait_for_task(task_id, timeout)
    
    def process(self, data: Dict[str, Any]) -> Optional[str]:
        """Process text using TTS (synchronous), expecting a dict with 'text' and 'language'"""
        text = data.get("text")
        language = data.get("language", "English")
        if not text:
            return None
        return self.speak_text(text, language)

    def _initialize_tts(self):
        """Initializes the TTS adapter."""
        if not self.is_initialized:
            self.start()

    def get_queue_size(self) -> int:
        """Returns the current size of the task queue."""
        return self.task_queue.qsize()

    def get_active_task_count(self) -> int:
        """Returns the number of tasks currently being processed."""
        with self.lock:
            return len(self.active_tasks)
class VoiceAssistant:
    def __init__(self, language_processor, max_concurrent_requests: int = 5):
        self.language_processor = language_processor
        self.conversation_context = {}
        self.max_concurrent_requests = max_concurrent_requests
        
        # Thread pool for handling requests
        self.executor = concurrent.futures.ThreadPoolExecutor(
            max_workers=max_concurrent_requests,
            thread_name_prefix="VoiceAssistant"
        )
        
        # Request tracking
        self.active_requests = {}
        self.request_counter = ThreadSafeCounter()
        self.request_lock = threading.RLock()
        
        # Shutdown event
        self.shutdown_event = threading.Event()
        
        # Initialize TTS adapter
        from app.core.modules.adapters.tts import RealTimeTTS
        # Default to English speaker, will be changed dynamically
        self.tts_instance = RealTimeTTS(language="English", speaker="Jenny")
        self.tts_adapter = TTSAdapter(self.tts_instance, max_workers=3)
        
        # Add completion callback for TTS
        self.tts_adapter.add_completion_callback(self._on_tts_completion)
        
        logger.info(f"VoiceAssistant initialized with {max_concurrent_requests} concurrent request limit")
    
    def _on_tts_completion(self, task_id: str, audio_path: str):
        """Callback when TTS task completes"""
        logger.info(f"TTS task {task_id} completed with audio: {audio_path}")
        # Additional processing can be added here        
    def _process_transcription_task(self, request_id: str, transcription: str, include_audio: bool) -> dict:
        """Process transcription in a separate thread"""
        try:
            logger.info(f"Request {request_id}: Processing transcription: {transcription[:50]}...")
            
            start_time = time.time()
            
            # Process query with language processor
            # It now returns a dict with 'text' and 'language'
            response_data = self.language_processor.process_query(
                user_input=transcription,
                context=self.conversation_context.copy()
            )
            response_text = response_data.get("text", "I'm sorry, I didn't get that.")
            response_lang = response_data.get("language", "English")
            
            processing_time = time.time() - start_time
            logger.info(f"Request {request_id}: Language processing completed in {processing_time:.2f}s")
            
            # Update conversation context
            with self.request_lock:
                self.conversation_context.update({
                    'last_query': transcription,
                    'last_response': response_text,
                    'last_processed_time': time.time()
                })
            
            result = {"text": response_text}
            
            # Generate audio if requested
            if include_audio:
                try:
                    audio_start_time = time.time()
                    # Pass the detected language to the TTS adapter
                    audio_file_path = self.tts_adapter.speak_text(
                        response_text, 
                        language=response_lang, 
                        priority=1, 
                        timeout=20.0
                    )
                    audio_time = time.time() - audio_start_time
                    
                    result["audio_file"] = audio_file_path or ""
                    logger.info(f"Request {request_id}: Audio generation for '{response_lang}' completed in {audio_time:.2f}s")
                    
                except Exception as tts_error:
                    logger.error(f"Request {request_id}: TTS Error: {tts_error}")
                    result["audio_file"] = ""
                    result["tts_error"] = str(tts_error)
            
            total_time = time.time() - start_time
            logger.info(f"Request {request_id}: Total processing time: {total_time:.2f}s")
            
            return result
            
        except Exception as e:
            logger.error(f"Request {request_id}: Error in transcription processing: {str(e)}")
            error_response = "I apologize, but I encountered an error processing your request."
            
            result = {"text": error_response, "error": str(e)}
            
            if include_audio:
                try:
                    # Default error message to English
                    audio_file_path = self.tts_adapter.speak_text(error_response, language="English", priority=2)
                    result["audio_file"] = audio_file_path or ""
                except Exception as tts_error:
                    logger.error(f"Request {request_id}: TTS Error in error handling: {tts_error}")
                    result["audio_file"] = ""
            
            return result
        
        finally:
            # Clean up request tracking
            with self.request_lock:
                if request_id in self.active_requests:
                    del self.active_requests[request_id]

# ... (the rest of the VoiceAssistant class remains the same)
    
    def handle_transcription_with_audio_async(self, transcription: str) -> str:
        """Handle transcription with audio generation asynchronously"""
        return self._handle_transcription_async(transcription, include_audio=True)
    
    def handle_transcription_only_async(self, transcription: str) -> str:
        """Handle transcription without audio generation asynchronously"""
        return self._handle_transcription_async(transcription, include_audio=False)
    
    def _handle_transcription_async(self, transcription: str, include_audio: bool) -> str:
        """Handle transcription asynchronously and return request ID"""
        if self.shutdown_event.is_set():
            raise Exception("VoiceAssistant is shutting down")
        
        request_id = f"req_{self.request_counter.increment()}"
        
        # Submit task to thread pool
        future = self.executor.submit(
            self._process_transcription_task,
            request_id,
            transcription,
            include_audio
        )
        
        # Track active request
        with self.request_lock:
            self.active_requests[request_id] = {
                'future': future,
                'transcription': transcription,
                'include_audio': include_audio,
                'start_time': time.time()
            }
        
        logger.info(f"Request {request_id} submitted for processing")
        return request_id
    
    def get_request_result(self, request_id: str, timeout: float = 30.0) -> Optional[dict]:
        """Get the result of an async request"""
        with self.request_lock:
            if request_id not in self.active_requests:
                logger.warning(f"Request {request_id} not found")
                return None
            
            future = self.active_requests[request_id]['future']
        
        try:
            result = future.result(timeout=timeout)
            logger.info(f"Request {request_id} completed successfully")
            return result
        except concurrent.futures.TimeoutError:
            logger.error(f"Request {request_id} timed out after {timeout}s")
            return {"text": "Request timed out", "error": "timeout"}
        except Exception as e:
            logger.error(f"Request {request_id} failed: {str(e)}")
            return {"text": "Request failed", "error": str(e)}
    
    def handle_transcription_with_audio(self, transcription: str) -> dict:
        """Handle transcription with audio generation (synchronous)"""
        request_id = self.handle_transcription_with_audio_async(transcription)
        return self.get_request_result(request_id) or {"text": "Processing failed", "audio_file": ""}
    
    def handle_transcription_only(self, transcription: str) -> dict:
        """Handle transcription without audio generation (synchronous)"""
        request_id = self.handle_transcription_only_async(transcription)
        return self.get_request_result(request_id) or {"text": "Processing failed"}
    
    def get_active_request_count(self) -> int:
        """Get number of active requests"""
        with self.request_lock:
            return len(self.active_requests)
    
    def get_request_status(self, request_id: str) -> Optional[str]:
        """Get status of a specific request"""
        with self.request_lock:
            if request_id not in self.active_requests:
                return None
            
            future = self.active_requests[request_id]['future']
            
            if future.done():
                if future.exception():
                    return "failed"
                else:
                    return "completed"
            else:
                return "processing"
    
    def cancel_request(self, request_id: str) -> bool:
        """Cancel a specific request"""
        with self.request_lock:
            if request_id not in self.active_requests:
                return False
            
            future = self.active_requests[request_id]['future']
            success = future.cancel()
            
            if success:
                del self.active_requests[request_id]
                logger.info(f"Request {request_id} cancelled successfully")
            
            return success            
        
    def start_conversation(self) -> None:
        """Start the voice assistant"""
        if self.shutdown_event.is_set():
            self.shutdown_event.clear()
        
        logger.info("Starting Voice Assistant with multi-threading support...")
        print("痔 Voice Assistant Active (Multi-threaded)")
        
        self.tts_adapter.start()
        
        logger.info("Voice Assistant started successfully")
    
    def stop_conversation(self) -> None:
        """Stop the voice assistant and clean up resources"""
        logger.info("尅 Stopping Voice Assistant...")
        
        # Signal shutdown
        self.shutdown_event.set()
        
        # Cancel all pending requests
        with self.request_lock:
            active_request_ids = list(self.active_requests.keys())
            for request_id in active_request_ids:
                self.cancel_request(request_id)
        
        # Stop TTS adapter
        self.tts_adapter.stop()
        
        # Shutdown executor
        self.executor.shutdown(wait=True, timeout=10.0)
        
        logger.info("Voice Assistant stopped successfully. Goodbye!")
        print("Voice Assistant stopped. Goodbye!")
    
    def set_language_context(self, context: Dict[str, Any]) -> None:
        """Set language context in a thread-safe manner"""
        with self.request_lock:
            self.conversation_context.update(context)
        logger.info("Language context updated")
    
    def get_statistics(self) -> Dict[str, Any]:
        """Get current statistics about the voice assistant"""
        with self.request_lock:
            stats = {
                'active_requests': len(self.active_requests),
                'total_requests_processed': self.request_counter._value,
                'tts_queue_size': self.tts_adapter.get_queue_size(),
                'tts_active_tasks': self.tts_adapter.get_active_task_count(),
                'is_running': not self.shutdown_event.is_set()
            }
        return stats
    
    def health_check(self) -> Dict[str, Any]:
        """Perform health check on all components"""
        health = {
            'voice_assistant': not self.shutdown_event.is_set(),
            'tts_adapter': self.tts_adapter.is_initialized,
            'executor': not self.executor._shutdown,
            'active_requests': self.get_active_request_count(),
            'timestamp': time.time()
        }
        
        health['overall_healthy'] = all([
            health['voice_assistant'],
            health['tts_adapter'],
            health['executor']
        ])
        
        return health
    
    def create_request_with_tracking(self, transcription: str, request_id: str = None) -> dict:
        """
        Create a request with enhanced tracking for debugging synchronization issues.
        Returns detailed tracking information along with the result.
        """
        if request_id is None:
            request_id = f"req_{self.request_counter.increment()}"
        
        tracking_info = {
            "request_id": request_id,
            "transcription": transcription,
            "submitted_at": time.time(),
            "tts_task_id": None,
            "audio_path": None,
            "processing_time": None,
            "status": "submitted"
        }
        
        try:
            logger.info(f"識 Creating tracked request {request_id} for: '{transcription[:50]}...'")
            
            # Process the transcription
            start_time = time.time()
            
            # Get response from language processor
            result = self.language_processor.process(transcription)
            response_text = result.get("text", "Failed to generate response")
            
            # Generate TTS with tracking
            if hasattr(self.tts_adapter.tts_instance, 'convert_text_synchronized'):
                tts_task_id = self.tts_adapter.tts_instance.convert_text_synchronized(response_text)
                tracking_info["tts_task_id"] = tts_task_id
                tracking_info["status"] = "tts_submitted"
                
                # Wait for TTS to complete
                audio_path = self.tts_adapter.tts_instance.get_audio_file_for_task(tts_task_id, timeout=20.0)
                tracking_info["audio_path"] = audio_path
                tracking_info["status"] = "completed" if audio_path else "tts_failed"
            else:
                # Fallback to old method
                logger.warning(f"Using fallback TTS for request {request_id}")
                audio_path = self.tts_adapter.speak_text(response_text, timeout=20.0)
                tracking_info["audio_path"] = audio_path
                tracking_info["status"] = "completed" if audio_path else "tts_failed"
            
            end_time = time.time()
            tracking_info["processing_time"] = end_time - start_time
            
            logger.info(f"識 Request {request_id} completed in {tracking_info['processing_time']:.3f}s")
            logger.info(f"   TTS Task ID: {tracking_info['tts_task_id']}")
            logger.info(f"   Audio Path: {tracking_info['audio_path']}")
            
            return {
                "text": response_text,
                "audio_file": audio_path or "",
                "tracking": tracking_info,
                "success": tracking_info["status"] == "completed"
            }
            
        except Exception as e:
            tracking_info["status"] = "error"
            tracking_info["error"] = str(e)
            logger.error(f"笶Request {request_id} failed: {e}")
            
            return {
                "text": "Sorry, I encountered an error processing your request.",
                "audio_file": "",
                "tracking": tracking_info,
                "success": False,
                "error": str(e)
            }