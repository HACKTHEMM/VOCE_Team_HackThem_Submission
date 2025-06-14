import sys
import os
import time
from typing import Dict
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException, Query
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from app.models.transcript import TranscriptReq
from app.helper.get_config import load_yaml
load_dotenv()

os.environ['GROQ_API_KEY'] = load_yaml('GROQ_API_KEY')
os.environ['SERP_API_KEY'] = load_yaml('SERP_API_KEY')

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
        os.environ['GROQ_API_KEY'] = load_yaml('GROQ_API_KEY')
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
    # Start timing
    start_time = time.time()
    print(f'[{time.strftime("%Y-%m-%d %H:%M:%S")}] API call received - start-assistant')
    
    print(f'hitting the start-assistant api.. ')
    if not assistant:
        raise HTTPException(status_code=500, detail="Assistant not initialized")

    try:
        print(f'Fetched transcript is : {data.transcript}\nSending it to voice assistant.')
        
        # Time the assistant processing
        assistant_start_time = time.time()
        result = assistant.handle_transcription_with_audio(data.transcript)
        assistant_end_time = time.time()
        assistant_processing_time = assistant_end_time - assistant_start_time
        
        # result is now a dict with {"text": response_text, "audio_file": file_path}
        response_text = result.get("text", "")
        audio_file_path = result.get("audio_file", "")
        
        print(f"\nResponse: {response_text}\n")
        print(f"\nAudio file path from main: {audio_file_path}\n")
        
        session_responses[data.session_id] = {
            "text": response_text,
            "audio_file": audio_file_path
        }

        # End timing
        end_time = time.time()
        total_execution_time = end_time - start_time
        
        # Log execution times
        print(f"📊 EXECUTION TIME METRICS:")
        print(f"   └─ Assistant processing time: {assistant_processing_time:.3f} seconds")
        print(f"   └─ Total API execution time: {total_execution_time:.3f} seconds")
        print(f"[{time.strftime('%Y-%m-%d %H:%M:%S')}] API call completed - start-assistant")

        return {
            "success": True,
            "text": response_text,
            "audio_file": audio_file_path,
            "products": [],  # Add products if available from your assistant
            "message": "Generated response based on transcript",
            "execution_time": {
                "assistant_processing_time": assistant_processing_time,
                "total_execution_time": total_execution_time
            }
        }
        
    except Exception as e:
        end_time = time.time()
        total_execution_time = end_time - start_time
        print(f"❌ ERROR after {total_execution_time:.3f} seconds: {e}")
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
    start_time = time.time()
    print(f"[{time.strftime('%Y-%m-%d %H:%M:%S')}] API call received - get-transcript")
    
    print(f"Received transcript: {data.transcript}")
    
    end_time = time.time()
    execution_time = end_time - start_time
    print(f"📊 get-transcript execution time: {execution_time:.3f} seconds")
    
    return {
        "message": "Transcript received", 
        "text": data.transcript,
        "execution_time": execution_time
    }