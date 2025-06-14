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
import logging
from dataclasses import dataclass
from enum import Enum

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
        self.worker_threads = []
        self.queue_processor_thread = None
        
        # Callbacks
        self.completion_callbacks = []
        
    def add_completion_callback(self, callback: Callable[[str, str], None]):
        """Add callback to be called when TTS task completes"""
        with self.lock:
            self.completion_callbacks.append(callback)    
    def _queue_processor(self):
        """Process tasks from the queue in a separate thread"""
        logger.info("TTS Queue processor started")
        
        while not self.stop_event.is_set():
            try:
                # Get task from queue with timeout
                try:
                    priority, task = self.task_queue.get(timeout=1.0)
                except queue.Empty:
                    continue
                
                if task is None:  # Shutdown signal
                    break
                
                # Update task status
                with self.lock:
                    task.status = TaskStatus.PROCESSING
                    self.active_tasks[task.task_id] = task
                
                logger.info(f"Processing TTS task {task.task_id}: {task.text[:30]}...")
                
                # Process the task
                try:
                    audio_path = self._process_tts_task(task)
                    
                    with self.lock:
                        task.status = TaskStatus.COMPLETED
                        task.result = audio_path
                        self.completed_tasks[task.task_id] = task
                        if task.task_id in self.active_tasks:
                            del self.active_tasks[task.task_id]
                    
                    # Call completion callbacks
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
        """Process individual TTS task using synchronized TTS"""
        try:
            logger.info(f"Processing TTS task {task.task_id}: {task.text[:50]}{'...' if len(task.text) > 50 else ''}")
            
            # Use the new synchronized TTS method
            if hasattr(self.tts_instance, 'convert_text_synchronized'):
                # Generate a unique task ID for TTS internal tracking
                tts_task_id = self.tts_instance.convert_text_synchronized(task.text)
                
                if tts_task_id:
                    # Wait for the TTS task to complete
                    audio_path = self.tts_instance.get_audio_file_for_task(tts_task_id, timeout=15.0)
                    
                    if audio_path:
                        logger.info(f"TTS task {task.task_id} completed successfully: {audio_path}")
                        return audio_path
                    else:
                        logger.warning(f"TTS task {task.task_id} timed out or failed")
                        return None
                else:
                    logger.error(f"Failed to submit TTS task {task.task_id}")
                    return None
            else:
                # Fallback to old method if synchronized method not available
                logger.warning("Using fallback TTS method - synchronization may be affected")
                self.tts_instance.add_text(task.text)
                
                # Wait for audio generation with timeout
                max_wait = 15
                wait_interval = 0.1
                total_waited = 0
                
                while total_waited < max_wait and not self.stop_event.is_set():
                    audio_path = self.tts_instance.get_last_audio_file_path()
                    if audio_path:
                        return audio_path
                    
                    time.sleep(wait_interval)
                    total_waited += wait_interval
                    
                    # Check if queue is empty and not playing
                    if (hasattr(self.tts_instance, 'text_queue') and 
                        self.tts_instance.text_queue.empty() and 
                        not getattr(self.tts_instance, 'is_playing', False)):
                        
                        audio_path = self.tts_instance.get_last_audio_file_path()
                        if audio_path:
                            return audio_path
                
                logger.warning(f"Timeout waiting for audio generation for task {task.task_id}")
                return None
            
        except Exception as e:
            logger.error(f"Error processing TTS task {task.task_id}: {e}")
            raise
            
            if self.stop_event.is_set():
                logger.info(f"TTS task {task.task_id} cancelled due to shutdown")
                return None
            
            logger.warning(f"Timeout waiting for audio generation for task {task.task_id}")
            return None
            
        except Exception as e:
            logger.error(f"Error processing TTS task {task.task_id}: {e}")
            raise
    
    def speak_text_async(self, text: str, priority: int = 0) -> str:
        """Add text to TTS queue asynchronously and return task ID"""
        if not self.is_initialized:
            self._initialize_tts()
        
        # Create task
        task_id = f"tts_{self.task_counter.increment()}"
        task = AudioTask(
            task_id=task_id,
            text=text,
            priority=priority
        )
        
        try:
            # Add to queue (higher priority number = higher priority)
            self.task_queue.put((-priority, task), timeout=1.0)
            
            with self.lock:
                self.active_tasks[task_id] = task
            
            logger.info(f"TTS task {task_id} queued with priority {priority}")
            return task_id
            
        except queue.Full:
            logger.error("TTS queue is full, cannot add new task")
            raise Exception("TTS queue is full")
    
    def speak_text(self, text: str, priority: int = 0, timeout: float = 30.0) -> Optional[str]:
        """Speak text synchronously - blocks until audio is generated"""
        task_id = self.speak_text_async(text, priority)
        return self.wait_for_task(task_id, timeout)
    
    def wait_for_task(self, task_id: str, timeout: float = 30.0) -> Optional[str]:
        """Wait for a specific task to complete and return the audio file path"""
        start_time = time.time()
        
        while time.time() - start_time < timeout:
            with self.lock:
                # Check if task is completed
                if task_id in self.completed_tasks:
                    task = self.completed_tasks[task_id]
                    if task.status == TaskStatus.COMPLETED:
                        return task.result
                    elif task.status == TaskStatus.FAILED:
                        logger.error(f"Task {task_id} failed: {task.error}")
                        return None
                
                # Wait for notification
                with self.condition:
                    self.condition.wait(timeout=0.5)
        
        logger.warning(f"Timeout waiting for task {task_id}")
        return None
    
    def get_task_status(self, task_id: str) -> Optional[TaskStatus]:
        """Get the status of a specific task"""
        with self.lock:
            if task_id in self.active_tasks:
                return self.active_tasks[task_id].status
            elif task_id in self.completed_tasks:
                return self.completed_tasks[task_id].status
            return None
    
    def cancel_task(self, task_id: str) -> bool:
        """Cancel a pending task"""
        with self.lock:
            if task_id in self.active_tasks:
                task = self.active_tasks[task_id]
                if task.status == TaskStatus.PENDING:
                    task.status = TaskStatus.FAILED
                    task.error = "Cancelled by user"
                    self.completed_tasks[task_id] = task
                    del self.active_tasks[task_id]
                    return True
            return False
    
    def get_queue_size(self) -> int:
        """Get current queue size"""
        return self.task_queue.qsize()
    
    def get_active_task_count(self) -> int:
        """Get number of active tasks"""
        with self.lock:
            return len(self.active_tasks)    
    def _on_playback_finished(self):
        """Called when TTS audio playback finishes"""
        with self.lock:
            self.is_speaking = False
        logger.info("[TTS] Audio playback finished")
    
    def _initialize_tts(self) -> None:
        """Initialize TTS with thread pool"""
        if self.is_initialized:
            return
        
        logger.info("Initializing TTS adapter with multi-threading support")
        
        # Initialize TTS instance
        self.tts_instance.is_running = True
        tts_thread = threading.Thread(target=self.tts_instance._process_text, daemon=True)
        tts_thread.start()
        
        # Start queue processor
        self.queue_processor_thread = threading.Thread(
            target=self._queue_processor, 
            daemon=True,
            name="TTS-QueueProcessor"
        )
        self.queue_processor_thread.start()
        
        self.is_initialized = True
        logger.info("TTS adapter initialized with multi-threading support")
    
    def process(self, text: str) -> Optional[str]:
        """Process text using TTS (synchronous)"""
        return self.speak_text(text)
    
    def start(self) -> None:
        """Start the TTS adapter"""
        self._initialize_tts()
    
    def stop(self) -> None:
        """Stop the TTS adapter and clean up resources"""
        if not self.is_initialized:
            return
        
        logger.info("Stopping TTS adapter...")
        
        # Signal stop
        self.stop_event.set()
        
        # Add shutdown signal to queue
        try:
            self.task_queue.put((-999, None), timeout=1.0)
        except queue.Full:
            pass
        
        # Wait for queue processor to finish
        if self.queue_processor_thread and self.queue_processor_thread.is_alive():
            self.queue_processor_thread.join(timeout=5.0)
        
        # Stop TTS instance
        if hasattr(self.tts_instance, 'stop_tts'):
            self.tts_instance.stop_tts()
        
        # Shutdown executor
        if self.executor:
            self.executor.shutdown(wait=True, timeout=5.0)
        
        # Clear queues and reset state
        with self.lock:
            # Clear remaining tasks in queue
            while not self.task_queue.empty():
                try:
                    self.task_queue.get_nowait()
                    self.task_queue.task_done()
                except queue.Empty:
                    break
            
            self.active_tasks.clear()
            self.completed_tasks.clear()
            self.is_initialized = False
            self.is_speaking = False
        
        logger.info("TTS adapter stopped successfully")

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
        self.tts_instance = RealTimeTTS(language="English", speaker="Jenny")
        self.tts_instance.enable_auto_language_detection(True)
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
            response = self.language_processor.process_query(
                user_input=transcription,
                context=self.conversation_context.copy()  # Copy to avoid race conditions
            )
            
            processing_time = time.time() - start_time
            logger.info(f"Request {request_id}: Language processing completed in {processing_time:.2f}s")
            
            # Update conversation context (thread-safe)
            with self.request_lock:
                self.conversation_context.update({
                    'last_query': transcription,
                    'last_response': response,
                    'last_processed_time': time.time()
                })
            
            result = {"text": response}
            
            # Generate audio if requested
            if include_audio:
                try:
                    audio_start_time = time.time()
                    # Use high priority for audio generation
                    audio_file_path = self.tts_adapter.speak_text(response, priority=1, timeout=20.0)
                    audio_time = time.time() - audio_start_time
                    
                    result["audio_file"] = audio_file_path or ""
                    logger.info(f"Request {request_id}: Audio generation completed in {audio_time:.2f}s")
                    
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
            
            # Try to generate error audio if requested
            if include_audio:
                try:
                    audio_file_path = self.tts_adapter.speak_text(error_response, priority=2)
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
        print("🎤 Voice Assistant Active (Multi-threaded)")
        
        self.tts_adapter.start()
        
        logger.info("Voice Assistant started successfully")
    
    def stop_conversation(self) -> None:
        """Stop the voice assistant and clean up resources"""
        logger.info("🛑 Stopping Voice Assistant...")
        
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
            logger.info(f"🎯 Creating tracked request {request_id} for: '{transcription[:50]}...'")
            
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
            
            logger.info(f"🎯 Request {request_id} completed in {tracking_info['processing_time']:.3f}s")
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
            logger.error(f"❌ Request {request_id} failed: {e}")
            
            return {
                "text": "Sorry, I encountered an error processing your request.",
                "audio_file": "",
                "tracking": tracking_info,
                "success": False,
                "error": str(e)
            }