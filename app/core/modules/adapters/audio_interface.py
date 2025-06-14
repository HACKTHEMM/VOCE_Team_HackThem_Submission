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
        # self.stt_adapter_ref = None  # Reference to STT adapter for coordination
        self.is_speaking = False
      # def set_stt_adapter(self, stt_adapter):
    #     """Set reference to STT adapter for coordination"""
    #     self.stt_adapter_ref = stt_adapter

    def speak_text(self, text: str) -> str:
        if not self.is_initialized:
            self._initialize_tts()
        
        print(f"TTS: Speaking - {text[:50]}{'...' if len(text) > 50 else ''}")
        
        # Pause STT before speaking
        # if self.stt_adapter_ref:
        #     self.stt_adapter_ref.pause_listening()
        
        self.is_speaking = True
        
        # # Set callback for when TTS finishes
        # self.tts_instance.set_playback_finished_callback(self._on_playback_finished)
        
        self.tts_instance.add_text(text)
        
        # Wait for TTS to process and generate the audio file
        import time
        while self.tts_instance.text_queue.qsize() > 0 or self.tts_instance.is_playing:
            time.sleep(0.1)
        
        # Return the path to the generated audio file
        return self.tts_instance.get_last_audio_file_path()
    
    def _on_playback_finished(self):
        """Called when TTS audio playback finishes"""
        self.is_speaking = False
        print("[TTS] Audio playback finished")
        
        # Resume STT listening after a short delay
        # if self.stt_adapter_ref:
        #     # Small delay to ensure audio system is ready
        #     time.sleep(0.1)
        #     self.stt_adapter_ref.resume_listening()
    
    def _monitor_tts_completion(self):
        """Monitor when TTS finishes speaking and resume STT"""
        pass
        # Wait for TTS queue to be empty and a short delay for audio playback to complete
        # while not self.tts_instance.text_queue.empty():
        #     time.sleep(0.1)
        
        # # Additional delay to ensure audio playback is finished
        # time.sleep(0.5)
        
        # self.is_speaking = False
        
        # # Resume STT listening
        # if self.stt_adapter_ref:
        #     self.stt_adapter_ref.resume_listening()
    
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
        self.conversation_context = {}
        
    def handle_transcription(self, transcription: str) -> dict:
        try:
            print(f"Processing: {transcription}")
            
            # Process query with both RAG systems
            response = self.language_processor.process_query(
                user_input=transcription,
                context=self.conversation_context
            )
            
            # Update conversation context
            self.conversation_context.update({
                'last_query': transcription,
                'last_response': response
            })
            
            return {"text": response}
            
        except Exception as e:
            print(f"Error in handle_transcription: {str(e)}")
            return {"text": "I apologize, but I encountered an error processing your request."}
        
    def start_conversation(self) -> None:
        # if self.is_active:
        #     print("Voice assistant is already active")
        #     return
        
        # self.is_active = True
        print("Starting Voice Assistant...")
        # print("=" * 60)
        print("🎤 Voice Assistant Active")
        # print("• Speak naturally and I'll respond")
        # print("• Say 'stop listening' or 'goodbye' to end")
        # print("• Press Ctrl+C to force stop")
        # print("=" * 60)
        
        self.tts_adapter.start()
        # time.sleep(1)
        
        # try:
        #     self.stt_adapter.start()
        # except KeyboardInterrupt:
        #     self.stop_conversation()
    
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
