# Voce - AI Travel Companion
A sophisticated conversational agent that transforms travelers into local adventurers through natural voice interactions and intelligent travel recommendations, accessible via simple phone calls without requiring apps or internet connection.

## 🎥 Demo Video
Watch our live demonstration: [Voce AI Travel Companion Demo](https://www.youtube.com/watch?v=cCTfVueSOMY)

## 🌟 Key Features
🎤 **Real-time Voice Processing**: Advanced speech-to-text and text-to-speech capabilities
🤖 **AI-Powered Local Guidance**: Natural language processing using Groq LLM (Gemma2-9B-IT model)
🗺️ **Travel-Focused Responses**: Authentic local recommendations optimized for genuine exploration
🔍 **Context-Aware Travel Intelligence**: Location-aware conversation management with cultural embeddings
🌐 **Multi-language Support**: Supports multiple languages including local dialects
📞 **Phone-Based Access**: No apps required - just call and explore
🚀 **FastAPI Backend**: High-performance API with comprehensive error handling
💾 **Travel Memory**: ChromaDB integration for personalized travel context and preferences
🏛️ **Offline Capability**: Works without internet connection for seamless travel experience

## 🏗 Architecture
The project consists of three main components:

- **Backend API** (`/app`): FastAPI-based server with voice processing and AI travel capabilities
- **Phone Interface**: Voice-based interaction system for travelers
- **Travel Intelligence Engine** (`run_inference.py`): Batch processing for travel query analysis

## 📋 Prerequisites
Before setting up the project, ensure you have:

- Python 3.8+
- Node.js 18+ and npm (for web dashboard)
- Groq API Key (Required)
- SerpAPI Key (Required for local business data)
- Twilio API Key (Required for phone integration)
- Git for version control

## 🚀 Setup Instructions

### 1. Environment Setup
First, clone the repository and navigate to the project directory:

```bash
git clone https://github.com/HACKTHEMM/VoiceBot_HackThem_submission.git
cd VoiceBot_HackThem_submission
```

### 2. Backend Setup

#### Create and Activate Virtual Environment
```bash
# Create virtual environment
python -m venv venv

# Activate virtual environment
# On macOS/Linux:
source venv/bin/activate

# On Windows:
venv\Scripts\activate
```

#### Install Python Dependencies
```bash
pip install -r requirements.txt
```

#### Environment Variables
Create a `.env` file in the root directory with the following variables:

```env
# Required API Keys
GROQ_API_KEY=your_groq_api_key_here
SERPAPI_KEY=your_serpapi_key_here
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE_NUMBER=your_twilio_phone_number

# Model Configuration
MODEL_ID='meta-llama/llama-4-scout-17b-16e-instruct'

# Database Paths (Adjust paths according to your system)
MASTER_DB_PATH=./chromadb_storage/travel_knowledge_db
CHILD_DB_PATH=./chromadb_storage/traveler_sessions_db
```

### 3. Travel Dashboard Setup (Optional)
Navigate to the frontend directory and install dependencies:

```bash
cd frontend
npm install --force
npm run build
```

Create a frontend environment file (`.env.local` inside the frontend directory):

```env
# Backend API URL
NEXT_PUBLIC_API_URL=http://localhost:8000

# Authentication (Optional for dashboard)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key_here
CLERK_SECRET_KEY=your_clerk_secret_key_here
```

Navigate back to the root directory:
```bash
cd ..
```

## 🏃‍♂️ Running the Application

### Option 1: Run Travel Query Engine
For batch processing of travel questions from a CSV file:

```bash
# Ensure virtual environment is activated
source venv/bin/activate  # On macOS/Linux
# venv\Scripts\activate   # On Windows

# Run the inference script
python run_inference.py
```

This will:

- Read travel questions from `test.csv`
- Process each question through the AI travel assistant
- Generate personalized travel responses and save them to `output.csv`

#### Custom CSV Processing
You can specify custom input and output files:

```python
# In run_inference.py or directly
from run_inference import run_inferance

run_inferance(
    csv_input_path="./your_travel_questions.csv",
    csv_output_path="./your_travel_responses.csv"
)
```

### Option 2: Run Live Travel Assistant (Full Application)

#### Prerequisites for Live Demo
1. Ensure virtual environment is activated:
   ```bash
   source venv/bin/activate  # On macOS/Linux
   # venv\Scripts\activate   # On Windows
   ```

2. Ensure frontend is built (if using dashboard):
   ```bash
   cd frontend
   npm install --force
   npm run build
   cd ..
   ```

#### Start the Live Travel Assistant
Run the main application:

```bash
python main.py
```

This will start the travel assistant API. Travelers can now call the configured phone number to interact with the AI travel companion.

## 📚 API Documentation

### Main API Endpoints

#### Health Check
```http
GET /
```
Returns API status and health information.

#### Travel Assistant Interaction
```http
POST /travel-assistant/
Content-Type: application/json

{
    "transcript": "Where can I find authentic local food near me?",
    "session_id": "traveler-session-identifier",
    "location": "latitude,longitude"
}
```

**Response:**
```json
{
    "success": true,
    "text": "AI generated travel advice",
    "audio_file": "path/to/generated/audio/file.wav",
    "recommendations": [
        {
            "name": "Local Restaurant Name",
            "type": "restaurant",
            "location": "address",
            "description": "authentic local cuisine"
        }
    ],
    "message": "Generated travel response based on location and preferences"
}
```

#### Phone Integration
```http
POST /voice-call
Content-Type: application/json

{
    "call_sid": "twilio-call-identifier",
    "speech_result": "traveler voice input",
    "caller_location": "city, country"
}
```

## 📁 Project Structure
```
Voce_Travel_Assistant/
├── README.md                 # This file
├── requirements.txt          # Python dependencies
├── config.yaml              # Configuration settings
├── main.py                  # Main execution entry point
├── run_inference.py         # Batch travel query engine
├── test.csv                 # Sample travel questions
├── output.csv               # Generated travel responses
├── .env                     # Environment variables (create this)
│
├── app/                     # Backend API
│   ├── main.py             # FastAPI application
│   ├── core/
│   │   ├── assistant/
│   │   │   └── travel_assistant.py  # Main travel assistant logic
│   │   └── modules/
│   │       ├── adapters/    # Audio I/O adapters & phone integration
│   │       ├── embeddings/  # Travel knowledge and location data
│   │       └── llm/         # Language model processing
│   ├── helper/
│   │   ├── config.py       # Configuration management
│   │   └── get_config.py   # YAML config loader
│   └── models/
│       └── travel_query.py # Data models
│
└── Frontend/               # Next.js Travel Dashboard (Optional)
    ├── package.json        # Node.js dependencies
    ├── app/               # Next.js app directory
    ├── components/        # React components
    ├── hooks/             # React hooks
    ├── services/          # API services
    └── public/            # Static assets
```

## 🔧 Required Environment Variables

### Backend (`.env` file in root directory)
```env
# Required API Keys
GROQ_API_KEY=your_groq_api_key_here
SERPAPI_KEY=your_serpapi_key_here
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE_NUMBER=your_twilio_phone_number

# Model Configuration
MODEL_ID=gemma2-9b-it

# Database Paths
MASTER_DB_PATH=./chromadb_storage/travel_knowledge_db
CHILD_DB_PATH=./chromadb_storage/traveler_sessions_db
```

### Travel Dashboard (`.env.local` file in frontend directory)
```env
# Backend API URL
NEXT_PUBLIC_API_URL=http://localhost:8000

# Optional Dashboard Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key_here
CLERK_SECRET_KEY=your_clerk_secret_key_here
```

## 🔑 How to Get API Keys

### Groq API Key:
1. Visit [Groq Console](https://console.groq.com)
2. Sign up/Login and navigate to API Keys section
3. Create a new API key

### SerpAPI Key:
1. Visit [SerpAPI](https://serpapi.com)
2. Sign up/Login and go to dashboard
3. Copy your API key from the dashboard

### Twilio API Keys:
1. Visit [Twilio Console](https://console.twilio.com)
2. Create a new account or login
3. Get your Account SID and Auth Token from the dashboard
4. Purchase a phone number for voice calls

## 🔧 Configuration

### Model Configuration
The system uses the following default models:

- **LLM**: 'meta-llama/llama-4-scout-17b-16e-instruct' (Groq)
- **STT**: Google Speech-to-text
- **TTS**: Edge-TTS
- **Phone Integration**: Twilio Voice API

### Database Configuration
The system uses ChromaDB for:

- **Travel Knowledge Database**: Local attractions, restaurants, cultural insights
- **Traveler Sessions Database**: Individual traveler preferences and conversation history

### Audio Configuration
Default audio settings:

- Sample Rate: 16,000 Hz
- Channels: Mono (1)
- Chunk Size: 4,096 bytes
- Record Duration: 3 seconds

## 🧪 Testing

### Test the Backend API
```bash
# Test the health endpoint
curl http://localhost:8000/

# Test travel assistant with sample data
curl -X POST "http://localhost:8000/travel-assistant/" \
     -H "Content-Type: application/json" \
     -d '{"transcript": "Where can I find authentic local food?", "session_id": "test-123", "location": "40.7128,-74.0060"}'
```

### Test with Sample Travel Queries
The project includes a `test.csv` file with sample travel questions in multiple languages:

```csv
question,response
"Where can I find authentic local food in this neighborhood?",
"What are some hidden gems tourists usually miss?",
"How do I get to the nearest local market using public transport?",
"What cultural etiquette should I be aware of here?",
"Can you recommend local experiences off the beaten path?"
```

## 🚨 Troubleshooting

### Common Issues

1. **Missing API Keys Error**
   ```
   Error: GROQ_API_KEY not found!
   Error: TWILIO_ACCOUNT_SID not found!
   ```
   **Solution**: Ensure your `.env` file contains valid API keys for Groq and Twilio.

2. **Phone Integration Issues**
   ```
   TwilioException: Unable to create record
   ```
   **Solution**: Verify Twilio credentials and phone number configuration.

3. **Location Services Error**
   ```
   LocationError: Unable to determine caller location
   ```
   **Solution**: Ensure location services are properly configured and caller consent is obtained.

## 📊 Usage Examples

### Travel Assistant Conversations
The assistant is optimized for travel conversations and can handle queries like:

- **Local Recommendations**: "Where can I find the best street food?"
- **Navigation Help**: "How do I get to the old town using public transport?"
- **Cultural Guidance**: "What should I know about local customs?"
- **Hidden Gems**: "Show me places tourists don't usually visit"
- **Emergency Assistance**: "I need help finding a pharmacy nearby"

### Multi-language Support
The system supports conversations in:

- **English**: Full feature support
- **Local Languages**: Natural language processing for major travel destinations
- **Mixed Language**: Code-switching between languages during conversations

## 🌍 Travel Features

### Location-Aware Intelligence
- Automatic location detection from phone calls
- Context-aware recommendations based on current position
- Cultural sensitivity based on local customs

### Offline Capability
- Essential travel information cached locally
- Works without internet connection
- Emergency contact information always available

### Personalized Experience
- Learns traveler preferences over time
- Remembers previous conversations and recommendations
- Adapts to travel style (budget, luxury, adventure, etc.)

## 🤝 Contributing
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-travel-feature`)
3. Commit your changes (`git commit -m 'Add some amazing travel feature'`)
4. Push to the branch (`git push origin feature/amazing-travel-feature`)
5. Open a Pull Request

## 📝 License
This project is part of the HackThem The Matrix Protocol submission. Please refer to the competition guidelines for usage terms.

**Team HackThem** - Building the future of AI-powered travel experiences that connect travelers with authentic local adventures.