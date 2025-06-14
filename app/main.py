import sys
import os
from typing import Dict
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException, Query
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from app.models.transcript import TranscriptReq

load_dotenv()

app = FastAPI(title="Enhanced Voice Assistant API")
if not os.path.exists('static'):
    os.makedirs('static', exist_ok=True)
app.mount("/static", StaticFiles(directory="static"), name="static")
session_responses: Dict[str, str] = {}

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace * with frontend origin for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

assistant = None

@app.on_event("startup")
async def startup_event():
    if not os.getenv("GROQ_API_KEY"):
        print("Error: GROQ_API_KEY not found!")
        print("Please set your Groq API key in the .env file or as an environment variable.")
        sys.exit(1)

    global assistant
    try:
        from app.core.assistant.voice_assistant import IntegratedVoiceAssistant
        integrated_assistant = IntegratedVoiceAssistant()
        assistant = integrated_assistant.get_voice_assistant()
        print(f'\n\n[ASSISTANT]\n: {assistant}')
        print("Voice Assistant initialized and ready.")
    except ImportError as e:
        print(f"Import Error during startup: {e}")
        sys.exit(1)
    except Exception as e:
        print(f"Error initializing assistant: {e}")
        sys.exit(1)


@app.get("/")
async def root():
    return {"message": "Enhanced Voice Assistant API is running"}


@app.post("/start-assistant/")
async def start_assistant(data : TranscriptReq):
    print(f'hitting the start-assistant api.. ')
    if not assistant:
        raise HTTPException(status_code=500, detail="Assistant not initialized")

    try:
        print(f'Fetched transcript is : {data.transcript}\nSending it to voice assistant.')
        result = assistant.handle_transcription_with_audio(data.transcript)
        # result is now a dict with {"text": response_text, "audio_file": file_path}
        response_text = result.get("text", "")
        audio_file_path = result.get("audio_file", "")
        
        print(f"\nResponse: {response_text}\n")
        print(f"\nAudio file path from main: {audio_file_path}\n")
        session_responses[data.session_id] = {
            "text": response_text,
            "audio_file": audio_file_path
        }

        return {
            "success": True,
            "text": response_text,
            "audio_file": audio_file_path,
            "products": [],  # Add products if available from your assistant
            "message": "Generated response based on transcript"
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to start assistant: {e}")


# @app.get("/get-latest-response/")
# async def get_latest_response(session_id: str = Query(..., description="Session ID")):
#     if session_id not in session_responses:
#         raise HTTPException(status_code=404, detail="No response available for this session.")
#     return {
#         "data": session_responses[session_id].get("text", ""),
#         "audio_file": session_responses[session_id].get("audio_file", "")
#     }

#  testing getting voice from frontend
@app.post("/get-transcript")
async def get_transcript(data : TranscriptReq):
    print(f"Received transcript: {data.transcript}")
    return {"message": "Transcript received", "text": data.transcript}