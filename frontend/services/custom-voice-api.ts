// Custom Voice Recognition API Service

interface VoiceRecognitionResponse {
  text: string
  confidence: number
  status: "success" | "error"
  error?: string
}

export class CustomVoiceRecognitionService {
  private audioContext: AudioContext | null = null
  private mediaStream: MediaStream | null = null
  private mediaRecorder: MediaRecorder | null = null
  private audioChunks: Blob[] = []
  private isRecording = false
  private apiEndpoint: string
  private abortController: AbortController | null = null

  constructor(apiEndpoint = "http://localhost:8000/recognize") {
    this.apiEndpoint = apiEndpoint
  }

  public async initialize(): Promise<boolean> {
    try {
      // Request microphone access
      this.mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true })

      // Initialize audio context
      this.audioContext = new AudioContext()

      return true
    } catch (error) {
      console.error("Failed to initialize voice recognition:", error)
      return false
    }
  }

  public async startRecording(): Promise<void> {
    if (this.isRecording) {
      return
    }

    try {
      if (!this.mediaStream) {
        const initialized = await this.initialize()
        if (!initialized) {
          throw new Error("Failed to initialize microphone")
        }
      }

      this.audioChunks = []
      this.isRecording = true

      // Create media recorder
      this.mediaRecorder = new MediaRecorder(this.mediaStream!, {
        mimeType: "audio/webm",
      })

      // Handle data available event
      this.mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          this.audioChunks.push(event.data)
        }
      }

      // Start recording
      this.mediaRecorder.start(100) // Collect data every 100ms

      console.log("Started recording audio")
    } catch (error) {
      console.error("Error starting recording:", error)
      this.isRecording = false
      throw error
    }
  }

  public async stopRecording(): Promise<VoiceRecognitionResponse> {
    if (!this.isRecording || !this.mediaRecorder) {
      return {
        text: "",
        confidence: 0,
        status: "error",
        error: "Not recording",
      }
    }

    return new Promise((resolve, reject) => {
      this.mediaRecorder!.onstop = async () => {
        try {
          const result = await this.processAudio()
          this.isRecording = false
          resolve(result)
        } catch (error) {
          this.isRecording = false
          reject(error)
        }
      }

      this.mediaRecorder!.stop()
    })
  }

  private async processAudio(): Promise<VoiceRecognitionResponse> {
    if (this.audioChunks.length === 0) {
      return {
        text: "",
        confidence: 0,
        status: "error",
        error: "No audio data recorded",
      }
    }

    try {
      // Create audio blob from chunks
      const audioBlob = new Blob(this.audioChunks, { type: "audio/webm" })

      // Create form data
      const formData = new FormData()
      formData.append("audio", audioBlob, "recording.webm")

      // Set up abort controller for timeout
      this.abortController = new AbortController()
      const timeoutId = setTimeout(() => this.abortController?.abort(), 10000) // 10 second timeout

      // Send to API
      const response = await fetch(this.apiEndpoint, {
        method: "POST",
        body: formData,
        signal: this.abortController.signal,
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`API error (${response.status}): ${errorText}`)
      }

      const result = await response.json()

      return {
        text: result.text || "",
        confidence: result.confidence || 0,
        status: "success",
      }
    } catch (error: any) {
      console.error("Error processing audio:", error)

      // Determine error type
      let errorMessage = "Unknown error occurred"

      if (error.name === "AbortError") {
        errorMessage = "Request timed out"
      } else if (error.message.includes("NetworkError") || error.message.includes("Failed to fetch")) {
        errorMessage = "Network error - API unreachable"
      } else {
        errorMessage = error.message
      }

      return {
        text: "",
        confidence: 0,
        status: "error",
        error: errorMessage,
      }
    }
  }

  public cancelRecording(): void {
    if (this.mediaRecorder && this.isRecording) {
      this.mediaRecorder.stop()
      this.isRecording = false
    }

    if (this.abortController) {
      this.abortController.abort()
      this.abortController = null
    }
  }

  public cleanup(): void {
    this.cancelRecording()

    // Stop all audio tracks
    if (this.mediaStream) {
      this.mediaStream.getTracks().forEach((track) => track.stop())
      this.mediaStream = null
    }

    // Close audio context
    if (this.audioContext) {
      this.audioContext.close()
      this.audioContext = null
    }
  }
}

// Create singleton instance
let voiceApiInstance: CustomVoiceRecognitionService | null = null

export function getVoiceApiService(): CustomVoiceRecognitionService {
  if (!voiceApiInstance) {
    voiceApiInstance = new CustomVoiceRecognitionService()
  }
  return voiceApiInstance
}
