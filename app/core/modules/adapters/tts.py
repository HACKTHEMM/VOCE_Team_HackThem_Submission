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
from groq import Groq
from pathlib import Path
from dotenv import load_dotenv

load_dotenv()

GROQ_API_KEY = os.getenv("GROQ_API_KEY")
# print("GROQ_API_KEY:", GROQ_API_KEY)

# Multilingual TTS language dictionary
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

# Default speakers for each language
default_speakers = {
    "English": "Jenny",
    "Hindi": "Madhur"
}

class RealTimeTTS:
    def __init__(self, api_key="GROQ_API_KEY", language="Hindi", speaker="Madhur"):
        self.client = Groq(api_key=api_key)
        self.language = language
        self.speaker = speaker
        self.CHUNK = 4096
        self.text_queue = queue.Queue()
        self.is_running = False
        self.p = pyaudio.PyAudio()
        self.playback_finished_callback = None
        self.is_playing = False
        self.last_audio_file_path = None  # Store the path of the last generated audio file
        self.auto_detect_language = True  # Enable automatic language detection
        
    def detect_language(self, text):
        """Detect if text is primarily Hindi or English"""
        # Hindi Unicode ranges: Devanagari script
        hindi_pattern = r'[\u0900-\u097F]'
        
        # Remove whitespace and punctuation for better detection
        text_cleaned = re.sub(r'[^\w\s]', '', text.strip())
        
        # Count Hindi characters
        hindi_chars = len(re.findall(hindi_pattern, text_cleaned))
        total_chars = len(text_cleaned.replace(' ', ''))
        
        # If more than 25% of characters are Hindi, consider it Hindi
        # Lower threshold for better detection of mixed content
        if total_chars > 0 and (hindi_chars / total_chars) > 0.25:
            return "Hindi"
        else:
            return "English"
    
    def set_playback_finished_callback(self, callback):
        """Set callback to be called when audio playback finishes"""
        self.playback_finished_callback = callback
    
    def enable_auto_language_detection(self, enable=True):
        """Enable or disable automatic language detection"""
        self.auto_detect_language = enable
    
    def convert_text_with_language(self, text, language=None, speaker=None):
        """Convert text to speech with specified language and speaker, bypassing auto-detection"""
        if language and speaker:
            # Temporarily disable auto-detection
            original_auto_detect = self.auto_detect_language
            original_language = self.language
            original_speaker = self.speaker
            
            self.auto_detect_language = False
            self.language = language
            self.speaker = speaker
            
            # Add the text to queue
            self.add_text(text)
            
            # Wait for processing
            import time
            while self.text_queue.qsize() > 0 or self.is_playing:
                time.sleep(0.1)
            
            # Restore original settings
            self.auto_detect_language = original_auto_detect
            self.language = original_language
            self.speaker = original_speaker
            
            return self.get_last_audio_file_path()
        else:
            # Use regular add_text method
            self.add_text(text)
            # Wait for processing
            import time
            while self.text_queue.qsize() > 0 or self.is_playing:
                time.sleep(0.1)
            return self.get_last_audio_file_path()
    
    async def _text_to_speech_edge(self, text):
        """Convert text to speech using edge-tts with dynamic language detection"""
        # Detect language if auto-detection is enabled
        if self.auto_detect_language:
            detected_language = self.detect_language(text)
            current_speaker = default_speakers[detected_language]
            print(f"Auto-detected language: {detected_language}, using speaker: {current_speaker}")
        else:
            detected_language = self.language
            current_speaker = self.speaker
            print(f"Using configured language: {detected_language}, speaker: {current_speaker}")
        
        # Get the appropriate voice
        voice = language_dict[detected_language][current_speaker]
        
        communicate = edge_tts.Communicate(text, voice)
        
        # Create unique audio file in the static/audio directory
        audio_dir = Path("static/audio")
        audio_dir.mkdir(parents=True, exist_ok=True)
        unique_filename = f"{uuid.uuid4().hex}.wav"
        audio_file_path = audio_dir / unique_filename
        
        await communicate.save(str(audio_file_path))
        return str(audio_file_path)
        
    def start_tts(self):
        self.is_running = True
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
        self.p.terminate()
        print("TTS stopped.")
    
    def add_text(self, text):
        if text.strip():
            self.text_queue.put(text.strip())
    
    def _get_user_input(self):
        while self.is_running:
            try:
                text = input("Enter text to convert to speech: ")
                if text.lower() in ['quit', 'exit']:
                    self.stop_tts()
                    break
                elif text.strip():
                    self.add_text(text)
            except (EOFError, KeyboardInterrupt):
                break
    
    def _process_text(self):
        while self.is_running:
            try:
                text = self.text_queue.get(timeout=1)
                try:
                    print(f"Converting to speech: {text[:50]}{'...' if len(text) > 50 else ''}")
                    self.is_playing = True
                    
                    # Use multilingual TTS instead of Groq TTS
                    loop = asyncio.new_event_loop()
                    asyncio.set_event_loop(loop)
                    audio_file_path = loop.run_until_complete(self._text_to_speech_edge(text))
                    loop.close()
                    
                    print(f'writing audio to path : {audio_file_path}')
                    self.last_audio_file_path = audio_file_path
                    
                    # Set playing to false first
                    self.is_playing = False
                    
                    # Call the callback when playback finishes with a small delay
                    if self.playback_finished_callback:
                        # Use threading to avoid blocking and add delay for audio cleanup
                        def delayed_callback():
                            time.sleep(0.3)  # Wait for audio system cleanup
                            self.playback_finished_callback()
                        
                        callback_thread = threading.Thread(target=delayed_callback)
                        callback_thread.daemon = True
                        callback_thread.start()
                        
                except Exception as e:
                    print(f"TTS error: {e}")
                    self.is_playing = False
                    # Still call callback on error to resume STT
                    if self.playback_finished_callback:
                        def delayed_callback():
                            time.sleep(0.1)
                            self.playback_finished_callback()
                        callback_thread = threading.Thread(target=delayed_callback)
                        callback_thread.daemon = True
                        callback_thread.start()
                        
                self.text_queue.task_done()
            except queue.Empty:
                continue
            except Exception as e:
                print(f"Processing error: {e}")
                self.is_playing = False
    
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
            
            # Small delay to ensure audio buffers are cleared
            time.sleep(0.1)
            
        except Exception as e:
            print(f"Audio playback error: {e}")

    def get_last_audio_file_path(self):
        """Get the path of the last generated audio file"""
        return self.last_audio_file_path
    
    def clear_last_audio_file(self):
        """Delete the last audio file and clear the path"""
        if self.last_audio_file_path and os.path.exists(self.last_audio_file_path):
            try:
                os.unlink(self.last_audio_file_path)
                self.last_audio_file_path = None
                return True
            except Exception as e:
                print(f"Error deleting audio file: {e}")
                return False
        return False

if __name__ == "__main__":
    # Initialize with default English language and Jenny voice
    # You can change these parameters: language options: "English", "Hindi"
    # English speakers: "Neerja", "Prabhat", "Jenny"
    # Hindi speakers: "Madhur", "Swara"
    
    tts = RealTimeTTS(language="English", speaker="Jenny")
    print(f"Starting multilingual TTS with {tts.language} language and {tts.speaker} voice...")
    tts.start_tts()
