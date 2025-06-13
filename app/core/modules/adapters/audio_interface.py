import threading
import time
from typing import Optional, Callable, Dict, Any
from abc import ABC, abstractmethod

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
    def __init__(self, tts_instance):
        self.tts_instance = tts_instance
        self.is_initialized = False
        self.is_speaking = False

    def speak_text(self, text: str) -> str:
        if not self.is_initialized:
            self._initialize_tts()
        
        print(f"TTS: Speaking - {text[:50]}{'...' if len(text) > 50 else ''}")
                
        self.is_speaking = True
        
        self.tts_instance.add_text(text)
        
        import time
        while self.tts_instance.text_queue.qsize() > 0 or self.tts_instance.is_playing:
            time.sleep(0.1)
        
        return self.tts_instance.get_last_audio_file_path()
    
    def _on_playback_finished(self):
        """Called when TTS audio playback finishes"""
        self.is_speaking = False
        print("[TTS] Audio playback finished")
    
    def _monitor_tts_completion(self):
        """Monitor when TTS finishes speaking and resume STT"""
        pass
    
    def _initialize_tts(self) -> None:
        self.tts_instance.is_running = True
        tts_thread = threading.Thread(target=self.tts_instance._process_text)
        tts_thread.daemon = True
        tts_thread.start()
        self.is_initialized = True
        print("TTS adapter initialized in background mode")
    
    def process(self, text: str) -> None:
        self.speak_text(text)
    
    def start(self) -> None:
        self._initialize_tts()
    
    def stop(self) -> None:
        if self.is_initialized:
            self.tts_instance.stop_tts()
            self.is_initialized = False
            self.is_speaking = False

class VoiceAssistant:
    def __init__(self, language_processor):

        self.language_processor = language_processor
        self.is_active = False
        self.conversation_context: Dict[str, Any] = {}
        
    def handle_transcription(self, transcription: str) -> dict:
        try:
            response = self.language_processor.process_query(
                transcription, 
                context=self.conversation_context
            )
            # print(f"AI Response: {response}")
            self.conversation_context['last_query'] = transcription
            self.conversation_context['last_response'] = response

            print(f'finished speaking')
            return {"text": response}
        except Exception as e:
            error_msg = f"Error processing transcription: {str(e)}"
            print(error_msg)
            return {"text": "I'm sorry, I encountered an errror."}
    
    def start_conversation(self) -> None:
        
        print("Starting Voice Assistant...")
        print("🎤 Voice Assistant Active")
        
        self.tts_adapter.start()
    
    def stop_conversation(self) -> None:
        if not self.is_active:
            return
        
        print("\n🛑 Stopping Voice Assistant...")
        self.is_active = False
        
        self.stt_adapter.stop()
        self.tts_adapter.stop()
        
        print("Voice Assistant stopped. Goodbye!")
    
    def set_language_context(self, context: Dict[str, Any]) -> None:
        self.conversation_context.update(context)
