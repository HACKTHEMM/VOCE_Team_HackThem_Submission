"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ThemeToggle } from "@/components/theme-toggle"
import { VoiceRecognition } from "@/components/voice-recognition"
import { TextInputFallback } from "@/components/text-input-fallback"
import { MessageBubble } from "@/components/message-bubble"
import { ProductCard } from "@/components/product-card"
import { LanguageSelector } from "@/components/language-selector"
import { ApiStatus } from "@/components/api-status"
import { ArrowLeft, AlertTriangle, MessageSquare, Volume2, VolumeX } from "lucide-react"
import Link from "next/link"
import { Footer } from "@/components/footer"

interface Message {
  id: string
  type: "user" | "assistant"
  content: string
  timestamp: Date
  language?: string
  places?: any[]
  sentiment?: "positive" | "neutral" | "negative"
  audioFile?: string
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "assistant",
      content: "Hello! I'm your AI travel assistant. How can I help you explore the city today? आप कैसे हैं?",
      timestamp: new Date(),
      sentiment: "positive",
    },
  ])
  const [isListening, setIsListening] = useState(false)
  const [currentLanguage, setCurrentLanguage] = useState("en")
  const [isTyping, setIsTyping] = useState(false)
  const [isOnline, setIsOnline] = useState(true)
  const [isAudioEnabled, setIsAudioEnabled] = useState(true)
  const [isAudioPlaying, setIsAudioPlaying] = useState(false)
  const [currentAudioId, setCurrentAudioId] = useState<string>("")

  // Generate unique session ID for each chat session
  const [sessionId] = useState<string>(() =>
    `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  )

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Check online status
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true)
    }
    const handleOffline = () => {
      setIsOnline(false)
      if (isListening) {
        setIsListening(false)
      }
    }

    setIsOnline(navigator.onLine)
    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [isListening])

  // Cleanup audio on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Enhanced audio cleanup function
  const stopAudio = () => {
    console.log("🛑 Stopping audio - Enhanced cleanup")
    if (audioRef.current) {
      try {
        // Stop playback immediately
        audioRef.current.pause()
        audioRef.current.currentTime = 0

        // Clear the source completely to prevent caching issues
        audioRef.current.src = ""
        audioRef.current.removeAttribute("src")

        // Remove all event listeners to prevent memory leaks
        audioRef.current.onloadstart = null
        audioRef.current.oncanplay = null
        audioRef.current.oncanplaythrough = null
        audioRef.current.onplay = null
        audioRef.current.onended = null
        audioRef.current.onerror = null
        audioRef.current.onabort = null
        audioRef.current.onstalled = null

        // Force reload to clear internal state
        audioRef.current.load()
        audioRef.current = null
      } catch (error) {
        console.error("Error stopping audio:", error)
      }
    }
    setIsAudioPlaying(false)
    setCurrentAudioId("")
  }

  // Rewritten audio playback function with unique session handling
  const playAudioWithSession = async (sessionId: string, messageId: string) => {
    console.log(`🎵 === ENHANCED AUDIO PLAYBACK ===`)
    console.log(`Session ID: ${sessionId}`)
    console.log(`Message ID: ${messageId}`)
    console.log(`Audio enabled: ${isAudioEnabled}`)

    // Always stop any currently playing audio first
    stopAudio()

    // Check if audio is enabled
    if (!isAudioEnabled) {
      console.log("❌ Audio is disabled - skipping playback")
      return
    }

    if (!sessionId) {
      console.log("❌ No session ID provided")
      return
    }

    try {
      // Create fresh audio element
      const audio = new Audio()
      console.log("🎵 Created new Audio element")

      // Generate unique URL with cache busting
      const timestamp = Date.now()
      const audioUrl = `http://localhost:8000/get-audio/${sessionId}?t=${timestamp}&msg=${messageId}`
      audio.src = audioUrl
      audio.preload = 'auto'
      audio.volume = 1.0

      console.log(`🎵 Audio URL: ${audioUrl}`)

      // Event cleanup function
      const cleanup = () => {
        audio.onloadstart = null
        audio.oncanplay = null
        audio.oncanplaythrough = null
        audio.onplay = null
        audio.onended = null
        audio.onerror = null
        audio.onabort = null
        audio.onstalled = null
      }

      // Set up event handlers
      audio.onloadstart = () => {
        console.log("📥 Audio loading started")
        if (isAudioEnabled && audioRef.current === audio) {
          setCurrentAudioId(messageId)
          setIsAudioPlaying(true)
        } else {
          console.log("❌ Audio disabled or replaced during load")
          audio.pause()
          cleanup()
        }
      }

      audio.oncanplaythrough = () => {
        console.log("✅ Audio ready to play")
        if (isAudioEnabled && audioRef.current === audio) {
          audio.play().then(() => {
            console.log("🎵 Audio playback started successfully")
          }).catch(error => {
            console.error("❌ Audio play failed:", error)
            if (audioRef.current === audio) {
              setIsAudioPlaying(false)
              setCurrentAudioId("")
              cleanup()
              audioRef.current = null
            }
          })
        } else {
          console.log("❌ Audio disabled or replaced before play")
          audio.pause()
          cleanup()
        }
      }

      audio.onplay = () => {
        console.log("▶️ Audio is now playing")
        if (audioRef.current === audio) {
          setIsAudioPlaying(true)
        }
      }

      audio.onended = () => {
        console.log("⏹️ Audio playback completed")
        if (audioRef.current === audio) {
          setIsAudioPlaying(false)
          setCurrentAudioId("")
          cleanup()
          audioRef.current = null
        }
      }

      audio.onerror = (error) => {
        console.error("❌ Audio error:", error)
        if (audioRef.current === audio) {
          setIsAudioPlaying(false)
          setCurrentAudioId("")
          cleanup()
          audioRef.current = null
        }
      }

      audio.onabort = () => {
        console.log("⚠️ Audio loading aborted")
        if (audioRef.current === audio) {
          setIsAudioPlaying(false)
          setCurrentAudioId("")
          cleanup()
        }
      }

      // Store reference and start loading
      audioRef.current = audio
      audio.load()
      console.log("🎵 Audio load initiated")

    } catch (error) {
      console.error("❌ Error in playAudioWithSession:", error)
      setIsAudioPlaying(false)
      setCurrentAudioId("")
    }
  }

  // Enhanced audio toggle function
  const toggleAudio = () => {
    const newAudioState = !isAudioEnabled
    console.log(`Audio toggling from ${isAudioEnabled} to ${newAudioState}`)

    // If disabling audio, stop any currently playing audio immediately
    if (!newAudioState) {
      console.log("🔇 Disabling audio - stopping current playback")
      stopAudio()
    }

    setIsAudioEnabled(newAudioState)
    console.log(`Audio ${newAudioState ? 'enabled' : 'disabled'}`)
  }

  // Enhanced message handling with unique session IDs
  const handleSendMessage = async (content: string) => {
    if (!content) return

    // Prevent duplicate submissions
    if (isTyping) return

    const userMessage: Message = {
      id: `user_${Date.now()}`,
      type: "user",
      content: content,
      timestamp: new Date(),
      language: currentLanguage,
    }

    setMessages((prev) => [...prev, userMessage])
    setIsTyping(true)

    // Stop any currently playing audio when sending a new message
    stopAudio()

    try {
      console.log(`🚀 Sending message with session ID: ${sessionId}`)

      // Call the start-assistant API with unique session ID
      const response = await fetch("http://localhost:8000/start-assistant/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          transcript: content.trim(),
          session_id: sessionId
        })
      })

      if (!response.ok) {
        throw new Error(`Server error ${response.status}`)
      }

      const data = await response.json()

      if (!data) {
        throw new Error("Invalid response format")
      }

      const assistantMessageId = `assistant_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`
      const assistantMessage: Message = {
        id: assistantMessageId,
        type: "assistant",
        content: data.text || "Sorry, I couldn't generate a response.",
        timestamp: new Date(),
        places: data.places || [],
        sentiment: "positive",
        audioFile: data.audio_file || "",
      }

      // Add message first
      setMessages((prev) => [...prev, assistantMessage])
      setIsTyping(false)

      console.log("=== MESSAGE RESPONSE DEBUG ===")
      console.log("API Response data:", data)
      console.log("Audio file from API:", data.audio_file)
      console.log("Audio URL from API:", data.audio_url)
      console.log("Session ID used:", sessionId)
      console.log("Current isAudioEnabled:", isAudioEnabled)

      // Handle audio with delay to ensure state is updated
      setTimeout(() => {
        if ((data.audio_file || data.audio_url) && isAudioEnabled) {
          console.log("✅ Starting audio playback with session ID")
          playAudioWithSession(sessionId, assistantMessageId)
        } else {
          console.log("❌ Audio not started")
          console.log(`- Has audio file: ${!!data.audio_file}`)
          console.log(`- Has audio URL: ${!!data.audio_url}`)
          console.log(`- Audio enabled: ${isAudioEnabled}`)
        }
      }, 100)

    } catch (error) {
      console.error("Error in chat flow:", error)
      setIsTyping(false)

      // Add error message
      const errorMessage: Message = {
        id: `error_${Date.now()}`,
        type: "assistant",
        content: "Sorry, I encountered an error. Please try again.",
        timestamp: new Date(),
        sentiment: "negative",
      }
      setMessages((prev) => [...prev, errorMessage])
    }
  }

  const handleVoiceResult = (transcript: string) => {
    handleSendMessage(transcript)
  }

  const handleVoiceListeningChange = (listening: boolean) => {
    setIsListening(listening)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F3F1E9] via-[#ECE8D9] to-[#F3F1E9] dark:from-[#1E1E1E] dark:via-[#2A2A2A] dark:to-[#1E1E1E] transition-all duration-700">
      {/* Classic Background Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 right-4 sm:top-20 sm:right-20 w-48 h-48 sm:w-72 sm:h-72 bg-gradient-to-br from-[#BBA588]/8 to-[#8E735B]/8 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-10 left-4 sm:bottom-20 sm:left-20 w-48 h-48 sm:w-72 sm:h-72 bg-gradient-to-tr from-[#7C6D64]/8 to-[#BBA588]/8 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 sm:w-96 sm:h-96 bg-gradient-to-r from-[#8E735B]/5 to-[#BBA588]/5 rounded-full blur-3xl animate-pulse-slow"></div>
      </div>

      {/* Enhanced Header */}
      <header className="border-b border-[#BBA588]/10 dark:border-[#BBA588]/30 glass-classic sticky top-0 z-50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">
            <div className="flex items-center space-x-2 sm:space-x-6 min-w-0 flex-1">
              <Link href="/">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-[#7C6D64] hover:text-[#2D2C2A] dark:text-[#BBA588] dark:hover:text-[#ECE8D9] transition-all duration-300 hover:bg-[#BBA588]/20 dark:hover:bg-[#BBA588]/10 rounded-xl p-2 sm:p-3 shrink-0 font-serif"
                >
                  <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
              </Link>
              <div className="flex items-center space-x-2 sm:space-x-4 min-w-0">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#BBA588] via-[#8E735B] to-[#7C6D64] rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg shadow-[#BBA588]/20 shrink-0">
                  <MessageSquare className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                </div>
                <div className="flex flex-col min-w-0">
                  <h1 className="text-lg sm:text-xl font-bold text-[#2D2C2A] dark:text-[#ECE8D9] truncate font-serif-display">Voice Chat</h1>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-[#8E735B] rounded-full animate-pulse shrink-0"></div>
                    <span className="text-xs sm:text-sm text-[#7C6D64] dark:text-[#BBA588] font-medium truncate font-serif">AI Travel Assistant</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-1 sm:space-x-4 shrink-0">
              <div className="hidden sm:block">
                <ApiStatus />
              </div>

              {/* Audio Toggle Button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleAudio}
                className={`relative transition-all duration-300 hover:bg-[#BBA588]/20 dark:hover:bg-[#BBA588]/10 rounded-xl p-2 sm:p-3 ${isAudioEnabled
                  ? 'text-[#8E735B] dark:text-[#BBA588]'
                  : 'text-[#7C6D64]/50 dark:text-[#BBA588]/50'
                  }`}
                title={isAudioEnabled ? "Disable audio" : "Enable audio"}
              >
                {isAudioEnabled ? (
                  <Volume2 className="h-4 w-4 sm:h-5 sm:w-5" />
                ) : (
                  <VolumeX className="h-4 w-4 sm:h-5 sm:w-5" />
                )}
                {isAudioPlaying && isAudioEnabled && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#8E735B] rounded-full animate-pulse"></div>
                )}
              </Button>

              <ThemeToggle />
              <div className="hidden sm:block">
                <LanguageSelector currentLanguage={currentLanguage} onLanguageChange={setCurrentLanguage} />
              </div>
            </div>
          </div>

          {/* Mobile-only bottom row for hidden elements */}
          <div className="sm:hidden pb-3 flex items-center justify-between">
            <ApiStatus />
            <LanguageSelector currentLanguage={currentLanguage} onLanguageChange={setCurrentLanguage} />
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-4rem)] sm:h-[calc(100vh-5rem)]">
        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col w-full">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 sm:p-6 space-y-4 sm:space-y-6 scrollbar-thin">
            {/* Offline Warning */}
            {!isOnline && (
              <Alert className="glass-classic border-[#BBA588]/50 dark:border-[#8E735B]/30 shadow-lg animate-in slide-in-from-top-4 duration-500">
                <AlertTriangle className="h-4 w-4 text-[#8E735B] dark:text-[#BBA588]" />
                <AlertDescription className="text-[#2D2C2A] dark:text-[#ECE8D9] font-serif">
                  You're currently offline. Voice commands won't work, but you can still type messages.
                </AlertDescription>
              </Alert>
            )}

            {messages.map((message) => (
              <div key={message.id} className="animate-in slide-in-from-bottom-4 duration-500">
                <MessageBubble message={message} />
                {message.places && message.places.length > 0 && (
                  <div className="mt-4 sm:mt-6">
                    <div className="mb-2 text-sm text-[#8E735B] dark:text-[#BBA588] font-medium font-serif">
                      Found {message.places.length} places:
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                      {message.places.map((place, index) => {
                        try {
                          return <ProductCard key={place.id || place.place_id || `place-${index}`} product={place} />
                        } catch (error) {
                          console.error(`Error rendering place ${index}:`, error, place)
                          return (
                            <div key={`error-place-${index}`} className="p-4 border-2 border-[#BBA588]/50 rounded-lg bg-[#F3F1E9] dark:bg-[#1E1E1E]/20">
                              <p className="text-[#8E735B] dark:text-[#BBA588] text-sm font-serif">
                                Error displaying place {index}. Check console for details.
                              </p>
                            </div>
                          )
                        }
                      })}
                    </div>
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center space-x-3 text-[#7C6D64] dark:text-[#BBA588] animate-in slide-in-from-bottom-4 duration-300">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gradient-to-r from-[#BBA588] to-[#8E735B] rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-gradient-to-r from-[#BBA588] to-[#8E735B] rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
                  <div className="w-2 h-2 bg-gradient-to-r from-[#BBA588] to-[#8E735B] rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                </div>
                <span className="text-sm font-medium font-serif">Assistant is thinking...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Compact Input Area - Claude-like Design */}
          <div className="border-t border-[#BBA588]/20 dark:border-[#BBA588]/20 glass-classic p-3 sm:p-4">
            <div className="max-w-4xl mx-auto">
              {/* Compact Input Row */}
              <div className="flex items-center space-x-3 sm:space-x-4">
                {/* Voice Button */}
                <div className="relative flex-shrink-0">
                  <div className="relative bg-[#F3F1E9]/20 dark:bg-[#1E1E1E]/20 backdrop-blur-lg border border-[#BBA588]/30 dark:border-[#BBA588]/20 rounded-full p-2 shadow-lg">
                    <VoiceRecognition
                      isListening={isListening}
                      onListeningChange={handleVoiceListeningChange}
                      onResult={handleVoiceResult}
                      language={currentLanguage}
                      size="sm"
                      isAudioPlaying={isAudioPlaying}
                      onStopAudio={stopAudio}
                    />
                  </div>
                </div>

                {/* Text Input */}
                <div className="flex-1">
                  <TextInputFallback
                    onSend={handleSendMessage}
                    placeholder={isListening ? "🎤 Listening..." : "Ask for recommendations, directions, or translations..."}
                    disabled={isTyping}
                  />
                </div>
              </div>

              {/* Compact Status Row */}
              <div className="flex items-center justify-between mt-2 px-1">
                <div className="flex items-center space-x-4 text-xs">
                  {/* Voice Status */}
                  {isListening && (
                    <div className="flex items-center space-x-1 text-[#8E735B] dark:text-[#BBA588]">
                      <span className="w-1.5 h-1.5 bg-[#8E735B] rounded-full animate-pulse"></span>
                      <span className="font-serif">Listening</span>
                    </div>
                  )}

                  {/* Audio Status */}
                  {isAudioPlaying && isAudioEnabled && (
                    <div className="flex items-center space-x-1 text-[#8E735B] dark:text-[#BBA588]">
                      <Volume2 className="h-3 w-3 animate-pulse" />
                      <span className="font-serif">Playing</span>
                    </div>
                  )}

                  {!isAudioEnabled && (
                    <div className="flex items-center space-x-1 text-[#7C6D64]/60 dark:text-[#BBA588]/60">
                      <VolumeX className="h-3 w-3" />
                      <span className="font-serif">Audio off</span>
                    </div>
                  )}
                </div>

                {/* Language & Session Info */}
                <div className="flex items-center space-x-2 text-xs text-[#7C6D64] dark:text-[#BBA588]">
                  <span className="font-serif">
                    {currentLanguage === 'hi' ? 'हिंदी/EN' : 'EN'}
                  </span>
                  <span className="text-[#7C6D64]/50 dark:text-[#BBA588]/50">•</span>
                  <span className="font-mono">{sessionId.slice(-6)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
