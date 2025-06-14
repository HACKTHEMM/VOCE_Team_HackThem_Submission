import os
import io
import time
import threading
import queue
import uuid
import pyaudio
import wave
import tempfile
import asyncio
import edge_tts
import re
from concurrent.futures import ThreadPoolExecutor, as_completed
from groq import Groq
from pathlib import Path
from dotenv import load_dotenv

load_dotenv()

GROQ_API_KEY = os.getenv("GROQ_API_KEY")

language_dict = {
    "English": {
        "Neerja": "en-IN-NeerjaNeural",
        "Prabhat": "en-IN-PrabhatNeural",
        "Jenny": "en-US-JennyNeural",
    },
    "Hindi": {
        "Madhur": "hi-IN-MadhurNeural",
        "Swara": "hi-IN-SwaraNeural",
    },
}

default_speakers = {
    "English": "Jenny",
    "Hindi": "Madhur"
}

class RealTimeTTS:
    def __init__(self, api_key="GROQ_API_KEY", language="Hindi", speaker="Madhur", max_workers=3):
        self.client = Groq(api_key=api_key)
        self.language = language
        self.speaker = speaker
        self.CHUNK = 4096
        self.text_queue = queue.Queue()
        self.is_running = False
        self.p = pyaudio.PyAudio()
        self.playback_finished_callback = None
        self.is_playing = False
        self.last_audio_file_path = None
        self.auto_detect_language = True
        
        self.max_workers = max_workers
        self.executor = None
        self.active_tasks = []
        self.task_lock = threading.Lock()
        
        # Enhanced tracking for proper synchronization
        self.task_counter = 0
        self.task_results = {}  # task_id -> audio_file_path
        self.task_completion_callbacks = {}  # task_id -> callback
        self.result_lock = threading.RLock()
        self.pending_tasks = {}  # task_id -> future
        
    def detect_language(self, text):
        hindi_pattern = r'[\u0900-\u097F]'
        
        text_cleaned = re.sub(r'[^\w\s]', '', text.strip())
        
        hindi_chars = len(re.findall(hindi_pattern, text_cleaned))
        total_chars = len(text_cleaned.replace(' ', ''))
        
        if total_chars > 0 and (hindi_chars / total_chars) > 0.25:
            return "Hindi"
        else:
            return "English"    
    def set_playback_finished_callback(self, callback):
        self.playback_finished_callback = callback
    
    def enable_auto_language_detection(self, enable=True):
        self.auto_detect_language = enable
    
    def convert_text_with_language(self, text, language=None, speaker=None):
        # Ensure TTS is ready
        self.ensure_tts_ready()
        
        if language and speaker:
            original_auto_detect = self.auto_detect_language
            original_language = self.language
            original_speaker = self.speaker
            
            self.auto_detect_language = False
            self.language = language
            self.speaker = speaker
            
            try:
                future = self.executor.submit(self._process_single_text, text)
                result = future.result(timeout=30)
                audio_file_path = result
            except Exception as e:
                print(f"Error in convert_text_with_language: {e}")
                audio_file_path = None
            
            self.auto_detect_language = original_auto_detect
            self.language = original_language
            self.speaker = original_speaker
            
            return audio_file_path
        else:
            try:
                future = self.executor.submit(self._process_single_text, text)
                return future.result(timeout=30)
            except Exception as e:
                print(f"Error in convert_text_with_language: {e}")
                return None
    
    async def _text_to_speech_edge(self, text):
        if self.auto_detect_language:
            detected_language = self.detect_language(text)
            current_speaker = default_speakers[detected_language]
            print(f"Auto-detected language: {detected_language}, using speaker: {current_speaker}")
        else:
            detected_language = self.language
            current_speaker = self.speaker
            print(f"Using configured language: {detected_language}, speaker: {current_speaker}")
        
        voice = language_dict[detected_language][current_speaker]
        
        communicate = edge_tts.Communicate(text, voice)
        
        audio_dir = Path("static/audio")
        audio_dir.mkdir(parents=True, exist_ok=True)
        unique_filename = f"{uuid.uuid4().hex}.wav"
        audio_file_path = audio_dir / unique_filename
        
        await communicate.save(str(audio_file_path))
        return str(audio_file_path)
    def start_tts(self):
        self.is_running = True
        self.executor = ThreadPoolExecutor(max_workers=self.max_workers)
        print("Initializing real-time text-to-speech...")
        tts_thread = threading.Thread(target=self._process_text)
        tts_thread.daemon = True
        tts_thread.start()
        print("TTS initialized. You can now add text to convert to speech.")
        print("Type 'quit' or 'exit' to stop, or press Ctrl+C")
        print("-" * 50)
        input_thread = threading.Thread(target=self._get_user_input)
        input_thread.daemon = True
        input_thread.start()
        try:
            while self.is_running:
                time.sleep(0.1)
        except KeyboardInterrupt:
            self.stop_tts()
    
    def stop_tts(self):
        print("\nStopping TTS...")
        self.is_running = False
        
        with self.task_lock:
            for future in self.active_tasks:
                future.cancel()
            self.active_tasks.clear()
        
        if self.executor:
            self.executor.shutdown(wait=True)
        
        self.p.terminate()
        print("TTS stopped.")
    
    def add_text(self, text):
        if text.strip():
            self.text_queue.put(text.strip())
    
    def add_multiple_texts(self, texts):
        for text in texts:
            if text.strip():
                self.text_queue.put(text.strip())
    
    def process_texts_concurrently(self, texts, wait_for_completion=False):
        if not self.executor:
            raise RuntimeError("TTS not started. Call start_tts() first.")
        
        futures = []
        for text in texts:
            if text.strip():
                future = self.executor.submit(self._process_single_text, text.strip())
                with self.task_lock:
                    self.active_tasks.append(future)
                futures.append(future)
        
        if wait_for_completion:
            audio_files = []
            for future in as_completed(futures):
                try:
                    result = future.result()
                    if result:
                        audio_files.append(result)
                except Exception as e:
                    print(f"Error processing text: {e}")
            return audio_files
        
        return futures
    
    def wait_for_all_tasks(self, timeout=None):
        with self.task_lock:
            active_tasks = self.active_tasks.copy()
        
        if not active_tasks:
            return True
        
        try:
            for future in as_completed(active_tasks, timeout=timeout):
                pass
            return True
        except Exception as e:
            print(f"Error waiting for tasks: {e}")
            return False
    
    def get_active_task_count(self):
        with self.task_lock:
            return len([task for task in self.active_tasks if not task.done()])
    
    def set_max_workers(self, max_workers):
        if self.executor:
            self.executor.shutdown(wait=False)
        
        self.max_workers = max_workers
        if self.is_running:
            self.executor = ThreadPoolExecutor(max_workers=self.max_workers)
    
    def get_thread_pool_status(self):
        if not self.executor:
            return {"status": "not_initialized", "max_workers": self.max_workers}
        
        active_count = self.get_active_task_count()
        return {
            "status": "running" if self.is_running else "stopped",
            "max_workers": self.max_workers,
            "active_tasks": active_count,
            "queue_size": self.text_queue.qsize()
        }
    
    def _get_user_input(self):
        while self.is_running:
            try:
                text = input("Enter text to convert to speech: ")
                if text.lower() in ['quit', 'exit']:
                    self.stop_tts()
                    break
                elif text.strip():                    self.add_text(text)
            except (EOFError, KeyboardInterrupt):
                break
    
    def _process_text(self):
        while self.is_running:
            try:
                text = self.text_queue.get(timeout=1)
                
                if text:
                    print(f"Converting to speech: {text[:50]}{'...' if len(text) > 50 else ''}")
                    
                    # Ensure executor is available
                    if not self.executor:
                        self.executor = ThreadPoolExecutor(max_workers=self.max_workers)
                    
                    future = self.executor.submit(self._process_single_text, text)
                    
                    with self.task_lock:
                        self.active_tasks.append(future)
                    
                    self.text_queue.task_done()
                    
            except queue.Empty:
                continue
            except Exception as e:
                print(f"Processing error: {e}")
                self.is_playing = False
        
        self._cleanup_completed_tasks()
    
    def _cleanup_completed_tasks(self):
        with self.task_lock:
            self.active_tasks = [task for task in self.active_tasks if not task.done()]
    
    def _process_single_text(self, text):
        try:
            self.is_playing = True
            
            loop = asyncio.new_event_loop()
            asyncio.set_event_loop(loop)
            audio_file_path = loop.run_until_complete(self._text_to_speech_edge(text))
            loop.close()
            
            print(f'Generated audio file: {audio_file_path}')
            self.last_audio_file_path = audio_file_path
            
            self.is_playing = False
            
            if self.playback_finished_callback:
                def delayed_callback():
                    time.sleep(0.3)
                    self.playback_finished_callback()
                
                callback_thread = threading.Thread(target=delayed_callback)
                callback_thread.daemon = True
                callback_thread.start()
            
            return audio_file_path
            
        except Exception as e:
            print(f"TTS error: {e}")
            self.is_playing = False
            if self.playback_finished_callback:
                self.playback_finished_callback()
            return None
        finally:
            self._cleanup_completed_tasks()
    
    def _play_audio_file(self, file_path):
        try:
            wf = wave.open(file_path, 'rb')
            stream = self.p.open(
                format=self.p.get_format_from_width(wf.getsampwidth()),
                channels=wf.getnchannels(),
                rate=wf.getframerate(),
                output=True
            )
            data = wf.readframes(self.CHUNK)
            while data and self.is_running:
                stream.write(data)
                data = wf.readframes(self.CHUNK)
            stream.stop_stream()
            stream.close()
            wf.close()
            
            time.sleep(0.1)
            
        except Exception as e:
            print(f"Audio playback error: {e}")

    def get_last_audio_file_path(self):
        return self.last_audio_file_path
    
    def clear_last_audio_file(self):
        if self.last_audio_file_path and os.path.exists(self.last_audio_file_path):
            try:
                os.unlink(self.last_audio_file_path)
                self.last_audio_file_path = None
                return True
            except Exception as e:
                print(f"Error deleting audio file: {e}")
                return False
        return False
    
    def process_batch_with_callback(self, texts, callback=None, max_concurrent=None):
        if not self.executor:
            raise RuntimeError("TTS not started. Call start_tts() first.")
        
        if max_concurrent is None:
            max_concurrent = self.max_workers
        
        results = []
        completed_count = 0
        total_count = len([t for t in texts if t.strip()])
        
        batch_size = min(max_concurrent, total_count)
        text_batches = [texts[i:i + batch_size] for i in range(0, len(texts), batch_size)]
        
        for batch in text_batches:
            batch_futures = []
            for text in batch:
                if text.strip():
                    future = self.executor.submit(self._process_single_text, text.strip())
                    with self.task_lock:
                        self.active_tasks.append(future)
                    batch_futures.append((text, future))
            
            for text, future in batch_futures:
                try:
                    result = future.result()
                    completed_count += 1
                    results.append({
                        'text': text,
                        'audio_file': result,
                        'success': result is not None,
                        'error': None
                    })
                    
                    if callback:
                        callback(completed_count, total_count, result)
                        
                except Exception as e:
                    completed_count += 1
                    results.append({
                        'text': text,
                        'audio_file': None,
                        'success': False,
                        'error': str(e)
                    })
                    
                    if callback:
                        callback(completed_count, total_count, None)
        
        return results

    def initialize_tts(self):
        """Initialize TTS for programmatic use without starting interactive mode"""
        if not self.executor:
            self.executor = ThreadPoolExecutor(max_workers=self.max_workers)
        self.is_running = True
        print("TTS initialized for programmatic use.")
    
    def ensure_tts_ready(self):
        """Ensure TTS is ready for use, initialize if needed"""
        if not self.executor or not self.is_running:
            self.initialize_tts()
    
    def generate_task_id(self):
        """Generate a unique task ID for tracking TTS requests"""
        with self.result_lock:
            self.task_counter += 1
            return f"tts_task_{self.task_counter}_{int(time.time() * 1000)}"
    
    def convert_text_synchronized(self, text, task_id=None, language=None, speaker=None):
        """
        Convert text to speech with proper synchronization and task tracking.
        Returns a task_id that can be used to retrieve the audio file path.
        """
        if not text or not text.strip():
            return None
            
        if task_id is None:
            task_id = self.generate_task_id()
        
        # Ensure TTS is ready
        self.ensure_tts_ready()
        
        # Store original settings if temporary override needed
        original_settings = None
        if language and speaker:
            original_settings = {
                'auto_detect': self.auto_detect_language,
                'language': self.language,
                'speaker': self.speaker
            }
            self.auto_detect_language = False
            self.language = language
            self.speaker = speaker
        
        try:
            # Submit task with proper tracking
            future = self.executor.submit(self._process_single_text_synchronized, text.strip(), task_id)
            
            with self.result_lock:
                self.pending_tasks[task_id] = future
                self.task_results[task_id] = None  # Initialize as pending
            
            print(f"TTS task {task_id} submitted for text: '{text[:50]}{'...' if len(text) > 50 else ''}'")
            return task_id
            
        except Exception as e:
            print(f"Error submitting TTS task {task_id}: {e}")
            with self.result_lock:
                self.task_results[task_id] = {"error": str(e), "audio_file": None}
            return task_id
        finally:
            # Restore original settings if they were changed
            if original_settings:
                self.auto_detect_language = original_settings['auto_detect']
                self.language = original_settings['language']
                self.speaker = original_settings['speaker']
    
    def get_audio_file_for_task(self, task_id, timeout=30.0):
        """
        Retrieve the audio file path for a specific task ID.
        Blocks until the task is complete or timeout is reached.
        """
        if not task_id:
            return None
            
        start_time = time.time()
        
        while time.time() - start_time < timeout:
            with self.result_lock:
                if task_id in self.task_results:
                    result = self.task_results[task_id]
                    
                    # If result is None, task is still pending
                    if result is None:
                        time.sleep(0.1)
                        continue
                    
                    # If result is a dict with error, return None
                    if isinstance(result, dict) and "error" in result:
                        print(f"TTS task {task_id} failed: {result['error']}")
                        return None
                    
                    # If result is a string, it's the audio file path
                    if isinstance(result, str):
                        print(f"TTS task {task_id} completed: {result}")
                        return result
                        
            time.sleep(0.1)
        
        print(f"Timeout waiting for TTS task {task_id}")
        return None
    
    def _process_single_text_synchronized(self, text, task_id):
        """
        Process a single text with proper task tracking and synchronization.
        """
        try:
            print(f"Processing TTS task {task_id}: {text[:50]}{'...' if len(text) > 50 else ''}")
            
            # Auto-detect or use configured language
            if self.auto_detect_language:
                detected_language = self.detect_language(text)
                current_speaker = default_speakers[detected_language]
                print(f"Task {task_id}: Auto-detected language: {detected_language}, speaker: {current_speaker}")
            else:
                detected_language = self.language
                current_speaker = self.speaker
                print(f"Task {task_id}: Using configured language: {detected_language}, speaker: {current_speaker}")
            
            voice = language_dict[detected_language][current_speaker]
              # Generate audio file using async function
            async def generate_audio():
                communicate = edge_tts.Communicate(text, voice)
                
                # Create unique filename for this specific task
                audio_dir = Path("static/audio")
                audio_dir.mkdir(parents=True, exist_ok=True)
                unique_filename = f"{task_id}_{uuid.uuid4().hex}.wav"
                audio_file_path = audio_dir / unique_filename
                
                await communicate.save(str(audio_file_path))
                return str(audio_file_path)
            
            loop = asyncio.new_event_loop()
            asyncio.set_event_loop(loop)
            audio_file_path = loop.run_until_complete(generate_audio())
            loop.close()
              # Store result with task ID
            with self.result_lock:
                self.task_results[task_id] = audio_file_path
                # Clean up pending task reference
                if task_id in self.pending_tasks:
                    del self.pending_tasks[task_id]
            
            print(f'Task {task_id} completed: Generated audio file: {audio_file_path}')
            
            # Update last audio file path for backward compatibility
            self.last_audio_file_path = audio_file_path
              # Call completion callback if set
            if self.playback_finished_callback:
                def delayed_callback():
                    time.sleep(0.3)
                    self.playback_finished_callback()
                
                callback_thread = threading.Thread(target=delayed_callback)
                callback_thread.daemon = True
                callback_thread.start()
            
            return audio_file_path
            
        except Exception as e:
            print(f"TTS error for task {task_id}: {e}")
            
            # Store error result
            with self.result_lock:
                self.task_results[task_id] = {"error": str(e), "audio_file": None}
                if task_id in self.pending_tasks:
                    del self.pending_tasks[task_id]
            
            if self.playback_finished_callback:
                self.playback_finished_callback()
            
            return None
        finally:
            self._cleanup_completed_tasks()
    
    def cleanup_completed_tasks_synchronized(self):
        """Clean up completed task results to prevent memory leaks"""
        with self.result_lock:
            # Remove completed tasks older than 5 minutes
            current_time = time.time()
            tasks_to_remove = []
            
            for task_id, result in self.task_results.items():
                # Extract timestamp from task_id
                try:
                    timestamp_str = task_id.split('_')[-1]
                    task_timestamp = int(timestamp_str) / 1000  # Convert from milliseconds
                    
                    # If task is older than 5 minutes and completed, remove it
                    if current_time - task_timestamp > 300 and result is not None:
                        tasks_to_remove.append(task_id)
                except (ValueError, IndexError):
                    # If we can't parse timestamp, check if it's been there a while
                    if result is not None:  # Only remove completed tasks
                        tasks_to_remove.append(task_id)
            
            for task_id in tasks_to_remove:
                del self.task_results[task_id]
                if task_id in self.task_completion_callbacks:
                    del self.task_completion_callbacks[task_id]
            
            if tasks_to_remove:
                print(f"Cleaned up {len(tasks_to_remove)} completed TTS tasks")
    
    def get_task_status(self, task_id):
        """Get the status of a specific task"""
        with self.result_lock:
            if task_id in self.pending_tasks:
                future = self.pending_tasks[task_id]
                if future.done():
                    return "completed" if not future.exception() else "failed"
                return "processing"
            elif task_id in self.task_results:
                result = self.task_results[task_id]
                if result is None:
                    return "pending"
                elif isinstance(result, dict) and "error" in result:
                    return "failed"
                return "completed"
            return "unknown"
    
    def cancel_task(self, task_id):
        """Cancel a pending or processing task"""
        with self.result_lock:
            if task_id in self.pending_tasks:
                future = self.pending_tasks[task_id]
                if not future.done():
                    cancelled = future.cancel()
                    if cancelled:
                        del self.pending_tasks[task_id]
                        self.task_results[task_id] = {"error": "Task cancelled", "audio_file": None}
                        return True
            return False

if __name__ == "__main__":
    tts = RealTimeTTS(language="English", speaker="Jenny", max_workers=4)
    print(f"Starting multilingual TTS with {tts.language} language and {tts.speaker} voice...")
    print(f"Thread pool initialized with {tts.max_workers} workers")
    
    tts.start_tts()