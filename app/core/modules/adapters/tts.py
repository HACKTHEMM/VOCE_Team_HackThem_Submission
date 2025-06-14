import os
import io
import time
import threading
import queue
import uuid
import pyaudio
import wave
import tempfile
from groq import Groq
from pathlib import Path
from dotenv import load_dotenv

load_dotenv()

GROQ_API_KEY = os.getenv("GROQ_API_KEY")
# print("GROQ_API_KEY:", GROQ_API_KEY)

class RealTimeTTS:
    def __init__(self, api_key="GROQ_API_KEY"):
        self.client = Groq(api_key=api_key)
        self.CHUNK = 4096
        self.text_queue = queue.Queue()
        self.is_running = False
        self.p = pyaudio.PyAudio()
        self.playback_finished_callback = None
        self.is_playing = False
        self.last_audio_file_path = None  # Store the path of the last generated audio file
        
    def set_playback_finished_callback(self, callback):
        """Set callback to be called when audio playback finishes"""
        self.playback_finished_callback = callback
        
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
                # try:
                #     print(f"Converting to speech: {text[:50]}{'...' if len(text) > 50 else ''}")
                #     self.is_playing = True
                #     response = self.client.audio.speech.create(
                #         model="playai-tts",
                #         voice="Basil-PlayAI",
                #         response_format="wav",
                #         input=text,
                #     )

                #     audio_dir = Path("static/audio")
                #     audio_dir.mkdir(parents=True, exist_ok=True)
                #     # generating unique filename
                #     unique_filename = f"{uuid.uuid4().hex}.wav"
                #     audio_file_path = audio_dir / unique_filename
                #     response.write_to_file(str(audio_file_path))
                #     # this will return to main
                #     print(f'writing audio to path : {str(audio_file_path)}')
                #     self.last_audio_file_path = str(audio_file_path)
                #     # print(f"[{timestamp}] Played: {text}")
                    
                #     # Set playing to false first
                #     self.is_playing = False
                    
                #     # Call the callback when playback finishes with a small delay
                #     if self.playback_finished_callback:
                #         # Use threading to avoid blocking and add delay for audio cleanup
                #         def delayed_callback():
                #             time.sleep(0.3)  # Wait for audio system cleanup
                #             self.playback_finished_callback()
                        
                #         callback_thread = threading.Thread(target=delayed_callback)
                #         callback_thread.daemon = True
                #         callback_thread.start()
                        
                # except Exception as e:
                #     print(f"TTS error: {e}")
                #     self.is_playing = False
                #     # Still call callback on error to resume STT
                #     if self.playback_finished_callback:
                #         def delayed_callback():
                #             time.sleep(0.1)
                #             self.playback_finished_callback()
                #         callback_thread = threading.Thread(target=delayed_callback)
                #         callback_thread.daemon = True
                #         callback_thread.start()
                        
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
    if not GROQ_API_KEY:
        print("Error: GROQ_API_KEY not found!")
        print("Please set your Groq API key in the .env file or as an environment variable.")
        exit(1)
    
    tts = RealTimeTTS(GROQ_API_KEY)
    tts.start_tts()
