import sys
import os
import time
from typing import Dict
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException, Query
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from app.models.transcript import TranscriptReq
from app.helper.get_config import load_yaml
load_dotenv()

os.environ['GROQ_API_KEY'] = load_yaml('GROQ_API_KEY')
os.environ['SERP_API_KEY'] = load_yaml('SERP_API_KEY')

app = FastAPI(title="Enhanced Voice Assistant API")
static_dir = os.path.join(os.getcwd(), "static")
if not os.path.exists(static_dir):
    os.makedirs(static_dir, exist_ok=True)
app.mount("/static", StaticFiles(directory=static_dir), name="static")
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
        print(
            "Please set your Groq API key in the .env file or as an environment variable.")
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
async def start_assistant(data: TranscriptReq):
    # Start timing
    start_time = time.time()
    print(f'[{time.strftime("%Y-%m-%d %H:%M:%S")}] API call received - start-assistant')

    print(f'hitting the start-assistant api.. ')
    if not assistant:
        raise HTTPException(
            status_code=500, detail="Assistant not initialized")

    try:
        print(
            f'Fetched transcript is : {data.transcript}\nSending it to voice assistant.')

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

        # Ensure audio file path is cross-platform compatible and exists
        if audio_file_path:
            # Normalize the path for cross-platform compatibility
            audio_file_path = normalize_audio_path(audio_file_path)

            # Find the actual location of the audio file
            actual_audio_path = find_audio_file(audio_file_path)

            if actual_audio_path:
                audio_file_path = actual_audio_path
                print(f"✅ Audio file verified at: {audio_file_path}")
            else:
                print(f"⚠️ WARNING: Audio file not found at {audio_file_path}")
                audio_file_path = ""

        # Store session data with enhanced information
        session_responses[data.session_id] = {
            "text": response_text,
            "audio_file": audio_file_path,
            "audio_filename": os.path.basename(audio_file_path) if audio_file_path else "",
            "timestamp": time.time()
        }        # Generate URLs for audio access
        audio_url = ""
        static_audio_url = ""

        if audio_file_path:
            # Direct endpoint URL (preferred)
            audio_url = f"/get-audio/{data.session_id}"

            # Static URL as fallback - ensure Unix-compatible path separators
            audio_filename = os.path.basename(audio_file_path)
            static_audio_url = f"/static/audio/{audio_filename}"

            print(f"🎵 Audio URLs generated:")
            print(f"   └─ Direct endpoint: {audio_url}")
            print(f"   └─ Static fallback: {static_audio_url}")

        # End timing
        end_time = time.time()
        total_execution_time = end_time - start_time

        # Log execution times
        print(f"📊 EXECUTION TIME METRICS:")
        print(
            f"   └─ Assistant processing time: {assistant_processing_time:.3f} seconds")
        print(
            f"   └─ Total API execution time: {total_execution_time:.3f} seconds")
        print(
            f"[{time.strftime('%Y-%m-%d %H:%M:%S')}] API call completed - start-assistant")

        return {
            "success": True,
            "text": response_text,
            "audio_file": audio_file_path,
            "audio_url": audio_url,  # Direct endpoint URL (preferred)
            "static_audio_url": static_audio_url,  # Static URL fallback
            "audio_filename": os.path.basename(audio_file_path) if audio_file_path else "",
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
        raise HTTPException(
            status_code=500, detail=f"Failed to start assistant: {e}")


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
async def get_transcript(data: TranscriptReq):
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


@app.get("/get-audio/{session_id}")
async def get_audio_file(session_id: str):
    """
    GET endpoint to retrieve the generated audio file for a specific session.
    Returns the WAV file that can be played directly in the browser.
    """
    print(f"[{time.strftime('%Y-%m-%d %H:%M:%S')}] API call received - get-audio for session: {session_id}")

    if session_id not in session_responses:
        print(f"❌ Session ID {session_id} not found in session_responses")
        print(f"Available sessions: {list(session_responses.keys())}")
        raise HTTPException(
            status_code=404, detail="No audio file available for this session ID")

    session_data = session_responses[session_id]
    audio_file_path = session_data.get("audio_file", "")

    print(f"📁 Session data for {session_id}:")
    print(f"   └─ Text: {session_data.get('text', '')[:50]}...")
    print(f"   └─ Audio file: {audio_file_path}")
    print(f"   └─ Audio filename: {session_data.get('audio_filename', 'N/A')}")

    if not audio_file_path:
        print(f"❌ No audio file path stored for session {session_id}")
        raise HTTPException(
            status_code=404, detail="No audio file generated for this session")

    # Handle both absolute and relative paths
    if not os.path.isabs(audio_file_path):
        # Convert relative path to absolute
        abs_audio_path = os.path.abspath(audio_file_path)
        print(f"🔄 Converting relative path to absolute:")
        print(f"   └─ Relative: {audio_file_path}")
        print(f"   └─ Absolute: {abs_audio_path}")
        audio_file_path = abs_audio_path

    # Check if the file actually exists
    if not os.path.exists(audio_file_path):
        print(f"❌ Audio file not found at: {audio_file_path}")
        # Try alternative paths
        alternative_paths = []

        # Try in static/audio directory
        filename = os.path.basename(audio_file_path)
        static_audio_dir = os.path.join("static", "audio")
        static_path = os.path.join(static_audio_dir, filename)
        alternative_paths.append(static_path)

        # Try absolute static path
        abs_static_path = os.path.abspath(static_path)
        alternative_paths.append(abs_static_path)

        # Try with current working directory
        cwd_static_path = os.path.join(os.getcwd(), static_audio_dir, filename)
        alternative_paths.append(cwd_static_path)

        print(f"🔍 Searching alternative paths:")
        for alt_path in alternative_paths:
            print(f"   └─ Checking: {alt_path}")
            if os.path.exists(alt_path):
                print(f"   ✅ Found at: {alt_path}")
                audio_file_path = alt_path
                break
        else:
            print(f"❌ Audio file not found in any alternative location")
            raise HTTPException(
                status_code=404, detail="Audio file not found on server")

    print(f"✅ Serving audio file: {audio_file_path}")
    print(f"📊 File info:")
    print(f"   └─ Size: {os.path.getsize(audio_file_path)} bytes")
    print(f"   └─ Modified: {time.ctime(os.path.getmtime(audio_file_path))}")

    # Return the file with enhanced headers for audio playback
    return FileResponse(
        path=audio_file_path,
        media_type="audio/wav",
        filename=os.path.basename(audio_file_path),
        headers={
            "Content-Disposition": f"inline; filename={os.path.basename(audio_file_path)}",
            "Cache-Control": "no-cache, no-store, must-revalidate, max-age=0",
            "Pragma": "no-cache",
            "Expires": "0",
            # Add ETag with timestamp for cache busting
            "ETag": f'"{time.time()}"',
            "Last-Modified": time.strftime('%a, %d %b %Y %H:%M:%S GMT', time.gmtime()),
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET",
            "Access-Control-Allow-Headers": "*",
            "Access-Control-Expose-Headers": "ETag, Last-Modified"
        }
    )


@app.get("/get-latest-response/{session_id}")
async def get_latest_response(session_id: str):
    """
    GET endpoint to retrieve the latest text response and audio URL for a session.
    """
    print(f"[{time.strftime('%Y-%m-%d %H:%M:%S')}] API call received - get-latest-response for session: {session_id}")

    if session_id not in session_responses:
        print(f"❌ Session ID {session_id} not found")
        print(f"Available sessions: {list(session_responses.keys())}")
        raise HTTPException(
            status_code=404, detail="No response available for this session ID")

    response_data = session_responses[session_id]
    audio_file_path = response_data.get("audio_file", "")

    print(f"📁 Retrieved session data:")
    print(
        f"   └─ Text length: {len(response_data.get('text', ''))} characters")
    print(f"   └─ Audio file: {audio_file_path}")
    print(
        f"   └─ Audio filename: {response_data.get('audio_filename', 'N/A')}")
    # Generate the web-accessible URLs for the audio file
    audio_url = ""
    static_audio_url = ""
    direct_audio_endpoint = ""

    if audio_file_path:
        # Direct endpoint URL (preferred)
        direct_audio_endpoint = f"/get-audio/{session_id}"
        audio_url = direct_audio_endpoint

        # Static URL as fallback - ensure Unix-compatible path separators
        audio_filename = os.path.basename(audio_file_path)
        static_audio_url = f"/static/audio/{audio_filename}"

        print(f"🎵 Generated audio URLs:")
        print(f"   └─ Direct endpoint: {direct_audio_endpoint}")
        print(f"   └─ Static fallback: {static_audio_url}")
    else:
        print(f"⚠️ No audio file available for this session")

    return {
        "success": True,
        "text": response_data.get("text", ""),
        "audio_file": audio_file_path,
        "audio_url": audio_url,
        "static_audio_url": static_audio_url,
        "direct_audio_endpoint": direct_audio_endpoint,
        "audio_filename": response_data.get("audio_filename", ""),
        "timestamp": response_data.get("timestamp", 0),
        "message": "Response retrieved successfully"
    }


@app.get("/debug-session/{session_id}")
async def debug_session(session_id: str):
    """
    Debug endpoint to check session data and file system state.
    """
    print(f"[{time.strftime('%Y-%m-%d %H:%M:%S')}] API call received - debug-session for session: {session_id}")

    debug_info = {
        "session_id": session_id,
        "session_exists": session_id in session_responses,
        "all_sessions": list(session_responses.keys()),
        "session_data": None,
        "file_checks": {},
        "static_directory": {},
        "working_directory": os.getcwd()
    }

    if session_id in session_responses:
        session_data = session_responses[session_id]
        debug_info["session_data"] = {
            "text_length": len(session_data.get("text", "")),
            "audio_file": session_data.get("audio_file", ""),
            "audio_filename": session_data.get("audio_filename", ""),
            "timestamp": session_data.get("timestamp", 0)
        }

        audio_file_path = session_data.get("audio_file", "")
        if audio_file_path:
            # Check original path
            debug_info["file_checks"]["original_path"] = {
                "path": audio_file_path,
                "exists": os.path.exists(audio_file_path),
                "is_absolute": os.path.isabs(audio_file_path)
            }

            if os.path.exists(audio_file_path):
                debug_info["file_checks"]["original_path"]["size"] = os.path.getsize(
                    audio_file_path)
                debug_info["file_checks"]["original_path"]["modified"] = time.ctime(
                    os.path.getmtime(audio_file_path))

            # Check absolute path
            abs_path = os.path.abspath(audio_file_path)
            debug_info["file_checks"]["absolute_path"] = {
                "path": abs_path,
                "exists": os.path.exists(abs_path)
            }

            # Check static directory path
            filename = os.path.basename(audio_file_path)
            static_path = os.path.join("static", "audio", filename)
            debug_info["file_checks"]["static_path"] = {
                "path": static_path,
                "exists": os.path.exists(static_path)
            }

    # Check static/audio directory
    static_audio_dir = os.path.join("static", "audio")
    if os.path.exists(static_audio_dir):
        try:
            files = os.listdir(static_audio_dir)
            debug_info["static_directory"] = {
                "path": static_audio_dir,
                "exists": True,
                "file_count": len(files),
                "recent_files": sorted(files, key=lambda x: os.path.getmtime(os.path.join(static_audio_dir, x)), reverse=True)[:5]
            }
        except Exception as e:
            debug_info["static_directory"] = {
                "path": static_audio_dir,
                "exists": True,
                "error": str(e)
            }
    else:
        debug_info["static_directory"] = {
            "path": static_audio_dir,
            "exists": False
        }

    return debug_info


def normalize_audio_path(audio_path):
    """
    Normalize audio file path for cross-platform compatibility.
    Ensures the path uses the correct separators and exists.
    """
    if not audio_path:
        return ""

    # Convert to absolute path using os.path.join for cross-platform compatibility
    if not os.path.isabs(audio_path):
        audio_path = os.path.abspath(audio_path)

    # Normalize path separators
    audio_path = os.path.normpath(audio_path)

    return audio_path


def find_audio_file(audio_file_path):
    """
    Find audio file in various possible locations for cross-platform compatibility.
    Returns the actual path where the file exists, or empty string if not found.
    """
    if not audio_file_path:
        return ""

    # List of possible paths to check
    possible_paths = []

    # Original path
    possible_paths.append(audio_file_path)

    # Absolute version of original path
    if not os.path.isabs(audio_file_path):
        possible_paths.append(os.path.abspath(audio_file_path))

    # In static/audio directory (relative to current working directory)
    filename = os.path.basename(audio_file_path)
    static_audio_dir = os.path.join("static", "audio")
    possible_paths.append(os.path.join(static_audio_dir, filename))
    possible_paths.append(os.path.abspath(
        os.path.join(static_audio_dir, filename)))

    # In static/audio directory relative to script location
    script_dir = os.path.dirname(os.path.abspath(__file__))
    possible_paths.append(os.path.join(
        script_dir, "..", static_audio_dir, filename))
    possible_paths.append(os.path.join(script_dir, static_audio_dir, filename))

    # Check each possible path
    for path in possible_paths:
        normalized_path = os.path.normpath(path)
        if os.path.exists(normalized_path):
            return normalized_path

    return ""
