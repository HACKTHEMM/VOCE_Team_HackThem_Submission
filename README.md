# VoiceBot - Conversational AI Sales Assistant

A sophisticated conversational agent that helps users make better decisions while buying products online through natural voice interactions and intelligent product recommendations.

## 🌟 Key Features

- 🎤 **Real-time Voice Processing**: Advanced speech-to-text and text-to-speech capabilities
- 🤖 **AI-Powered Conversations**: Natural language processing using Groq LLM (Gemma2-9B-IT model)
- 💬 **Sales-Focused Responses**: Persuasive and engaging conversational style optimized for sales
- 🔍 **Intelligent Query Processing**: Context-aware conversation management with embeddings
- 🌐 **Multi-language Support**: Supports multiple languages including Hindi and English
- 📱 **Modern Web Interface**: Responsive Next.js frontend with real-time voice interaction
- 🚀 **FastAPI Backend**: High-performance API with comprehensive error handling
- 💾 **Conversation Memory**: ChromaDB integration for conversation context and history

## 🏗️ Architecture

The project consists of three main components:

1. **Backend API** (`/app`): FastAPI-based server with voice processing and AI capabilities
2. **Frontend Interface** (`/Frontend`): Next.js web application with voice recognition UI
3. **Inference Engine** (`run_inference.py`): Batch processing for CSV-based question answering

## 📋 Prerequisites

Before setting up the project, ensure you have:

- **Python 3.8+**
- **Node.js 18+** and **npm/pnpm**
- **[Groq API Key](https://console.groq.com/)** (Required)
- **Git** for version control

## 🚀 Setup Instructions

### 1. Environment Setup

First, clone the repository and navigate to the project directory:

```bash
git clone <repository-url>
cd VoiceBot_HackThem_submission
```

### 2. Backend Setup

#### Install Python Dependencies

```bash
pip install -r requirements.txt
```

#### Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Required API Keys
GROQ_API_KEY=your_groq_api_key_here

# Model Configuration
MODEL_ID=gemma2-9b-it

# Database Paths (Adjust paths according to your system)
MASTER_DB_PATH=./chromadb_storage/master_db
CHILD_DB_PATH=./chromadb_storage/conversation_db

# Optional Configuration
LLM_TEMPERATURE=0.7
LLM_MAX_TOKENS=4096
STT_MODEL=whisper-large-v3-turbo
TTS_MODEL=playai-tts
TTS_VOICE=Basil-PlayAI

# Audio Configuration
AUDIO_CHUNK_SIZE=4096
AUDIO_SAMPLE_RATE=16000
AUDIO_RECORD_SECONDS=3.0

# Debug Settings
DEBUG_MODE=false
LOG_CONVERSATIONS=false
```

### 3. Frontend Setup

Navigate to the Frontend directory and install dependencies:

```bash
cd Frontend
npm install
# or
pnpm install
```

Create a frontend environment file (`.env.local`):

```env
# Backend API URL
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## 🏃‍♂️ Running the Application

### Option 1: Run Live Demo (Full Application)

#### Start the Backend Server

In the root directory:

```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

The backend API will be available at: `http://localhost:8000`

#### Start the Frontend Development Server

In a new terminal, navigate to the Frontend directory:

```bash
cd Frontend
npm run dev
# or
pnpm dev
```

The frontend will be available at: `http://localhost:3000`

### Option 2: Run Inference Engine (Round 1 Evaluation)

For batch processing of questions from a CSV file:

```bash
python run_inference.py
```

This will:
- Read questions from `test.csv`
- Process each question through the AI assistant
- Generate responses and save them to `output.csv`

#### Custom CSV Processing

You can specify custom input and output files:

```python
# In run_inference.py or directly
from run_inference import run_inferance

run_inferance(
    csv_input_path="./your_questions.csv", 
    csv_output_path="./your_responses.csv"
)
```

## 📚 API Documentation

### Main API Endpoints

#### Health Check
```http
GET /
```
Returns API status and health information.

#### Voice Assistant Interaction
```http
POST /start-assistant/
Content-Type: application/json

{
    "transcript": "Your voice message text here",
    "session_id": "unique-session-identifier"
}
```

**Response:**
```json
{
    "success": true,
    "text": "AI generated response text",
    "audio_file": "path/to/generated/audio/file.wav",
    "products": [],
    "message": "Generated response based on transcript"
}
```

#### Transcript Testing
```http
POST /get-transcript
Content-Type: application/json

{
    "transcript": "Test transcript",
    "session_id": "test-session"
}
```

## 📁 Project Structure

```
VoiceBot_HackThem_submission/
├── README.md                     # This file
├── requirements.txt              # Python dependencies
├── config.yaml                   # Configuration settings
├── main.py                       # Main execution entry point
├── run_inference.py              # Batch inference engine
├── test.csv                      # Sample questions for testing
├── output.csv                    # Generated responses
├── .env                          # Environment variables (create this)
│
├── app/                          # Backend API
│   ├── main.py                   # FastAPI application
│   ├── core/
│   │   ├── assistant/
│   │   │   └── voice_assistant.py # Main voice assistant logic
│   │   └── modules/
│   │       ├── adapters/         # Audio I/O adapters
│   │       ├── embeddings/       # RAG and embedding management
│   │       └── llm/              # Language model processing
│   ├── helper/
│   │   ├── config.py             # Configuration management
│   │   └── get_config.py         # YAML config loader
│   └── models/
│       └── transcript.py         # Data models
│
└── Frontend/                     # Next.js Frontend
    ├── package.json              # Node.js dependencies
    ├── app/                      # Next.js app directory
    ├── components/               # React components
    ├── hooks/                    # React hooks
    ├── services/                 # API services
    └── public/                   # Static assets
```

## 🔧 Configuration

### Model Configuration

The system uses the following default models:
- **LLM**: `gemma2-9b-it` (Groq)
- **STT**: `whisper-large-v3-turbo` (Groq)
- **TTS**: `playai-tts` with `Basil-PlayAI` voice

### Database Configuration

The system uses ChromaDB for:
- **Master Database**: Product knowledge and general information
- **Conversation Database**: Session-specific conversation history

### Audio Configuration

Default audio settings:
- **Sample Rate**: 16,000 Hz
- **Channels**: Mono (1)
- **Chunk Size**: 4,096 bytes
- **Record Duration**: 3 seconds

## 🧪 Testing

### Test the Backend API

```bash
# Test the health endpoint
curl http://localhost:8000/

# Test voice assistant with sample data
curl -X POST "http://localhost:8000/start-assistant/" \
     -H "Content-Type: application/json" \
     -d '{"transcript": "Hello, I want to buy a laptop", "session_id": "test-123"}'
```

### Test with Sample CSV

The project includes a `test.csv` file with sample questions in multiple languages:

```csv
question,response
मुझे आपके प्लेटफॉर्म के ज़रिए निवेश क्यों करना चाहिए?,
अगर मैं small amount से invest करूं तो क्या आपके platform पर अच्छा return मिल सकता है?,
क्या आपके platform पर invest करना safe है या इसमें ज़्यादा risk है?,
What makes your platform a better choice for small investors?,
How does your platform help me grow my wealth steadily?
```

## 🚨 Troubleshooting

### Common Issues

1. **Missing GROQ_API_KEY Error**
   ```
   Error: GROQ_API_KEY not found!
   ```
   **Solution**: Ensure your `.env` file contains a valid Groq API key.

2. **Audio Permissions Error**
   ```
   pyaudio.PyAudioError: [Errno -9986] Invalid input device
   ```
   **Solution**: Grant microphone permissions to your terminal/IDE.

3. **Module Import Errors**
   ```
   ImportError: No module named 'app.core.assistant'
   ```
   **Solution**: Ensure you're running from the project root directory.

4. **Frontend API Connection Issues**
   ```
   TypeError: Failed to fetch
   ```
   **Solution**: Verify the backend is running on port 8000 and update `NEXT_PUBLIC_API_URL`.

### Performance Optimization

- For production deployment, set `DEBUG_MODE=false`
- Adjust `LLM_TEMPERATURE` (0.3 for consistent responses, 0.7 for creative responses)
- Modify `AUDIO_RECORD_SECONDS` based on your use case

## 📊 Usage Examples

### Voice Assistant Conversations

The assistant is optimized for sales conversations and can handle queries like:

- **Product Inquiries**: "Tell me about your investment platform"
- **Pricing Questions**: "What are the fees for small investments?"
- **Safety Concerns**: "Is it safe to invest through your platform?"
- **Comparison Requests**: "How does this compare to other platforms?"

### Multi-language Support

The system supports conversations in:
- **English**: Full feature support
- **Hindi**: Natural language processing and responses
- **Mixed Language**: Code-switching between languages

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is part of the HackThem submission. Please refer to the competition guidelines for usage terms.

## 📞 Support

For issues related to:
- **API Integration**: Check the FastAPI documentation at `http://localhost:8000/docs`
- **Voice Processing**: Verify microphone permissions and audio settings
- **Model Performance**: Adjust temperature and token limits in configuration

---

**Team HackThem** - Building the future of conversational AI for e-commerce decisions.
