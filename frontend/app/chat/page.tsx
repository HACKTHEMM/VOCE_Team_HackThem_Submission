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
  products?: any[]
  sentiment?: "positive" | "neutral" | "negative"
  audioFile?: string
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "assistant",
      content: "Hello! I'm your AI sales assistant. How can I help you today? आप कैसे हैं?",
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

  // Robust function to stop any playing audio
  const stopAudio = () => {
    console.log("🛑 Stopping audio")
    if (audioRef.current) {
      try {
        audioRef.current.pause()
        audioRef.current.currentTime = 0
        // Remove all event listeners to prevent memory leaks
        audioRef.current.onloadstart = null
        audioRef.current.oncanplay = null
        audioRef.current.oncanplaythrough = null
        audioRef.current.onplay = null
        audioRef.current.onended = null
        audioRef.current.onerror = null
        audioRef.current.onabort = null
        audioRef.current.onstalled = null
        audioRef.current = null
      } catch (error) {
        console.error("Error stopping audio:", error)
      }
    }
    setIsAudioPlaying(false)
    setCurrentAudioId("")
  }
  // Improved audio play function with better state management
  const playAudio = async (sessionId: string, messageId: string) => {
    console.log(`=== AUDIO DEBUG ===`)
    console.log(`Session ID: ${sessionId}`)
    console.log(`Message ID: ${messageId}`)
    console.log(`Audio enabled: ${isAudioEnabled}`)
    console.log(`Audio endpoint: http://localhost:8000/get-audio/${sessionId}`)
    
    // Always stop any currently playing audio first
    stopAudio()
    
    // Check if audio is enabled
    if (!isAudioEnabled) {
      console.log("❌ Audio is disabled - not starting playback")
      return
    }
    
    if (!sessionId) {
      console.log("❌ No session ID provided")
      return
    }

    try {
      // Create new audio element
      const audio = new Audio()
      console.log("🎵 Created new Audio element")
      
      // Set audio properties - use the new get-audio endpoint
      audio.src = `http://localhost:8000/get-audio/${sessionId}`
      audio.preload = 'auto'
      audio.volume = 1.0
      
      console.log("🎵 Audio src set to new endpoint, starting load...")
      
      // Set up event handlers with proper cleanup
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
      
      audio.onloadstart = () => {
        console.log("📥 Audio loading started")
        // Only update state if audio is still enabled
        if (isAudioEnabled) {
          setCurrentAudioId(messageId)
          setIsAudioPlaying(true)
        } else {
          console.log("❌ Audio disabled during load - stopping")
          audio.pause()
          cleanup()
          return
        }
      }
      
      audio.oncanplaythrough = () => {
        console.log("✅ Audio ready to play through")
        // Double-check audio is still enabled before playing
        if (isAudioEnabled && audioRef.current === audio) {
          audio.play().then(() => {
            console.log("🎵 Audio playback started successfully")
          }).catch(error => {
            console.error("❌ Audio play failed:", error)
            setIsAudioPlaying(false)
            setCurrentAudioId("")
            cleanup()
          })
        } else {
          console.log("❌ Audio disabled or replaced during canplaythrough")
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
        console.log("⏹️ Audio playback ended")
        if (audioRef.current === audio) {
          setIsAudioPlaying(false)
          setCurrentAudioId("")
          cleanup()
          audioRef.current = null
        }
      }

      audio.onerror = (error) => {
        console.error("❌ Audio error:", error)
        console.error("❌ Audio error details:", audio.error)
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
      console.log("🎵 Audio load() called")

    } catch (error) {
      console.error("❌ Error in playAudio:", error)
      setIsAudioPlaying(false)
      setCurrentAudioId("")
    }
  }

  // Improved audio play function using direct URL from API
  const playAudioFromUrl = async (audioUrl: string, messageId: string) => {
    console.log(`=== AUDIO URL DEBUG ===`)
    console.log(`Audio URL: ${audioUrl}`)
    console.log(`Message ID: ${messageId}`)
    console.log(`Audio enabled: ${isAudioEnabled}`)
    console.log(`Full URL: http://localhost:8000${audioUrl}`)
    
    // Always stop any currently playing audio first
    stopAudio()
    
    // Check if audio is enabled
    if (!isAudioEnabled) {
      console.log("❌ Audio is disabled - not starting playback")
      return
    }
    
    if (!audioUrl) {
      console.log("❌ No audio URL provided")
      return
    }

    try {
      // Create new audio element
      const audio = new Audio()
      console.log("🎵 Created new Audio element")
      
      // Set audio properties - use the provided audio URL
      audio.src = `http://localhost:8000${audioUrl}`
      audio.preload = 'auto'
      audio.volume = 1.0
      
      console.log("🎵 Audio src set to URL endpoint, starting load...")
      
      // Set up event handlers with proper cleanup
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
      
      audio.onloadstart = () => {
        console.log("📥 Audio loading started")
        // Only update state if audio is still enabled
        if (isAudioEnabled) {
          setCurrentAudioId(messageId)
          setIsAudioPlaying(true)
        } else {
          console.log("❌ Audio disabled during load - stopping")
          audio.pause()
          cleanup()
          return
        }
      }
      
      audio.oncanplaythrough = () => {
        console.log("✅ Audio ready to play through")
        // Double-check audio is still enabled before playing
        if (isAudioEnabled && audioRef.current === audio) {
          audio.play().then(() => {
            console.log("🎵 Audio playback started successfully")
          }).catch(error => {
            console.error("❌ Audio play failed:", error)
            setIsAudioPlaying(false)
            setCurrentAudioId("")
            cleanup()
          })
        } else {
          console.log("❌ Audio disabled or replaced during canplaythrough")
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
        console.log("⏹️ Audio playback ended")
        if (audioRef.current === audio) {
          setIsAudioPlaying(false)
          setCurrentAudioId("")
          cleanup()
          audioRef.current = null
        }
      }

      audio.onerror = (error) => {
        console.error("❌ Audio error:", error)
        console.error("❌ Audio error details:", audio.error)
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
      console.log("🎵 Audio load() called")

    } catch (error) {
      console.error("❌ Error in playAudioFromUrl:", error)
      setIsAudioPlaying(false)
      setCurrentAudioId("")
    }
  }

  // Improved audio toggle function
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
  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return

    // Prevent duplicate submissions
    if (isTyping) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: content.trim(),
      timestamp: new Date(),
      language: currentLanguage,
    }

    setMessages((prev) => [...prev, userMessage])
    setIsTyping(true)

    // Stop any currently playing audio when sending a new message
    stopAudio()

    try {
      // Call the start-assistant API directly
      const response = await fetch("http://localhost:8000/start-assistant/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          transcript: content.trim(),
          session_id: "1"
        })
      })

      if (!response.ok) {
        throw new Error(`Server error ${response.status}`)
      }

      const data = await response.json()

      if (!data) {
        throw new Error("Invalid response format")
      }

      const assistantMessageId = (Date.now() + 1).toString()
      const assistantMessage: Message = {
        id: assistantMessageId,
        type: "assistant",
        content: data.text || "Sorry, I couldn't generate a response.",        timestamp: new Date(),
        products: data.products || [],
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
      console.log("Static audio URL from API:", data.static_audio_url)
      console.log("Audio filename from API:", data.audio_filename)
      console.log("Products from API:", data.products)
      if (data.products && Array.isArray(data.products)) {
        console.log("Products array length:", data.products.length)
        data.products.forEach((product: any, index: number) => {
          console.log(`Product ${index}:`, product)
          console.log(`Product ${index} properties:`, Object.keys(product))
        })
      }
      console.log("Current isAudioEnabled:", isAudioEnabled)
      
      // Then handle audio - with a small delay to ensure state is updated
      setTimeout(() => {
        if ((data.audio_file || data.audio_url) && isAudioEnabled) {
          console.log("✅ Conditions met, starting audio playbook")
          // Use the new audio_url if available, otherwise fall back to session-based endpoint
          if (data.audio_url) {
            playAudioFromUrl(data.audio_url, assistantMessageId)
          } else {
            // Fallback to session-based endpoint
            playAudio("1", assistantMessageId) // Pass session_id
          }
        } else {
          console.log("❌ Audio not started")
          console.log(`- Has audio file: ${!!data.audio_file}`)
          console.log(`- Has audio URL: ${!!data.audio_url}`)
          console.log(`- Audio enabled: ${isAudioEnabled}`)
          console.log(`- Audio file value: "${data.audio_file}"`)
          console.log(`- Audio URL value: "${data.audio_url}"`)
        }
      }, 100)

    } catch (error) {
      console.error("Error in chat flow:", error)
      setIsTyping(false)
      
      // Add error message
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-violet-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 transition-all duration-700">
      {/* Enhanced Background Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 right-4 sm:top-20 sm:right-20 w-48 h-48 sm:w-72 sm:h-72 bg-gradient-to-br from-blue-400/8 to-violet-600/8 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-10 left-4 sm:bottom-20 sm:left-20 w-48 h-48 sm:w-72 sm:h-72 bg-gradient-to-tr from-cyan-400/8 to-blue-600/8 rounded-full blur-3xl animate-float" style={{animationDelay: '3s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 sm:w-96 sm:h-96 bg-gradient-to-r from-violet-400/5 to-blue-400/5 rounded-full blur-3xl animate-pulse-slow"></div>
      </div>

      {/* Enhanced Header */}
      <header className="relative border-b border-white/10 dark:border-slate-800/30 glass-strong sticky top-0 z-50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">
            <div className="flex items-center space-x-2 sm:space-x-6 min-w-0 flex-1">
              <Link href="/">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-all duration-300 hover:bg-white/40 dark:hover:bg-slate-800/40 rounded-xl p-2 sm:p-3 shrink-0"
                >
                  <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
              </Link>
              <div className="flex items-center space-x-2 sm:space-x-4 min-w-0">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 via-violet-600 to-cyan-500 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20 shrink-0">
                  <MessageSquare className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                </div>
                <div className="flex flex-col min-w-0">
                  <h1 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white truncate">SalesSpeak Chat</h1>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shrink-0"></div>
                    <span className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium truncate">AI Assistant Online</span>
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
                className={`relative transition-all duration-300 hover:bg-white/40 dark:hover:bg-slate-800/40 rounded-xl p-2 sm:p-3 ${
                  isAudioEnabled 
                    ? 'text-blue-600 dark:text-blue-400' 
                    : 'text-slate-400 dark:text-slate-600'
                }`}
                title={isAudioEnabled ? "Disable audio" : "Enable audio"}
              >
                {isAudioEnabled ? (
                  <Volume2 className="h-4 w-4 sm:h-5 sm:w-5" />
                ) : (
                  <VolumeX className="h-4 w-4 sm:h-5 sm:w-5" />
                )}
                {isAudioPlaying && isAudioEnabled && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
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

      <div className="relative flex h-[calc(100vh-4rem)] sm:h-[calc(100vh-5rem)]">
        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col w-full">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 sm:p-6 space-y-4 sm:space-y-6 scrollbar-thin">
            {/* Offline Warning */}
            {!isOnline && (
              <Alert className="border-yellow-300/50 glass-strong border border-yellow-200/50 dark:border-yellow-600/30 shadow-lg animate-in slide-in-from-top-4 duration-500">
                <AlertTriangle className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                <AlertDescription className="text-yellow-800 dark:text-yellow-200">
                  You're currently offline. Voice recognition won't work, but you can still type messages.
                </AlertDescription>
              </Alert>
            )}            {messages.map((message) => (
              <div key={message.id} className="animate-in slide-in-from-bottom-4 duration-500">
                <MessageBubble message={message} />                
                {message.products && message.products.length > 0 && (
                  <div className="mt-4 sm:mt-6">
                    <div className="mb-2 text-sm text-blue-600 dark:text-blue-400 font-medium">
                      Found {message.products.length} products:
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                      {message.products.map((product, index) => {
                        console.log(`Rendering product ${index}:`, product)
                        try {
                          return <ProductCard key={product.id || product.product_id || `product-${index}`} product={product} />
                        } catch (error) {
                          console.error(`Error rendering product ${index}:`, error, product)
                          return (
                            <div key={`error-product-${index}`} className="p-4 border-2 border-red-200 rounded-lg bg-red-50 dark:bg-red-900/20">
                              <p className="text-red-600 dark:text-red-400 text-sm">
                                Error displaying product {index}. Check console for details.
                              </p>
                              <pre className="text-xs mt-2 overflow-auto">{JSON.stringify(product, null, 2)}</pre>
                            </div>
                          )
                        }
                      })}
                    </div>
                  </div>
                )}
                
                {/* Show if no products */}
                {message.type === "assistant" && (!message.products || message.products.length === 0) && (
                  <div className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                    No products in this response.
                  </div>
                )}
              </div>
            ))}
            {isTyping && (
              <div className="flex items-center space-x-3 text-slate-500 dark:text-slate-400 animate-in slide-in-from-bottom-4 duration-300">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-violet-500 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-violet-500 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
                  <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-violet-500 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                </div>
                <span className="text-sm font-medium">Assistant is thinking...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-white/20 dark:border-slate-800/50 glass-strong p-3 sm:p-6">
            <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6">
              {/* Enhanced Voice Input Section */}
              <div className="flex items-center justify-center">
                <div className="flex flex-col items-center space-y-3 sm:space-y-4">
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-violet-400/20 to-cyan-400/20 rounded-full blur-xl sm:blur-2xl animate-pulse-slow group-hover:blur-lg sm:group-hover:blur-xl transition-all duration-500"></div>
                      <div className="relative bg-white/20 dark:bg-slate-900/20 backdrop-blur-lg border border-white/30 dark:border-slate-700/30 rounded-full p-3 sm:p-4 shadow-xl">                      <VoiceRecognition
                        isListening={isListening}
                        onListeningChange={handleVoiceListeningChange}
                        onResult={handleVoiceResult}
                        language={currentLanguage}
                        size="md"
                        isAudioPlaying={isAudioPlaying}
                        onStopAudio={stopAudio}
                      />
                    </div>
                  </div>
                  <div className="text-center space-y-1 px-4">
                    <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
                      {isListening ? "🎤 Listening... Click to stop" : "Click to start speaking"}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Speak naturally in {currentLanguage === 'hi' ? 'Hindi or English' : 'English'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Enhanced Text Input Fallback */}
              <div className="space-y-4">
                <div className="flex items-center justify-center px-4">
                  <div className="flex items-center space-x-2 sm:space-x-3 w-full max-w-sm">
                    <div className="h-px bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-600 to-transparent flex-1"></div>
                    <span className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium px-2 whitespace-nowrap">or type your message</span>
                    <div className="h-px bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-600 to-transparent flex-1"></div>
                  </div>
                </div>
                <TextInputFallback
                  onSend={handleSendMessage}
                  placeholder={`Type your message... ${currentLanguage === "hi" ? "(हिंदी में टाइप करें)" : "(Type in English)"}`}
                  disabled={isTyping}
                />
              </div>

              {/* Status Messages */}
              {isListening && (
                <div className="text-center text-slate-500 dark:text-slate-400 text-sm animate-pulse px-4">
                  <p className="flex items-center justify-center space-x-2">
                    <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                    <span>Listening... Speak clearly</span>
                  </p>
                </div>
              )}

              {/* Audio Status */}
              {!isAudioEnabled && (
                <div className="text-center text-slate-500 dark:text-slate-400 text-xs px-4">
                  <p className="flex items-center justify-center space-x-2">
                    <VolumeX className="h-3 w-3" />
                    <span>Audio responses are disabled</span>
                  </p>
                </div>
              )}

              {/* Audio Playing Status */}
              {isAudioPlaying && isAudioEnabled && (
                <div className="text-center text-green-600 dark:text-green-400 text-xs px-4">
                  <p className="flex items-center justify-center space-x-2">
                    <Volume2 className="h-3 w-3 animate-pulse" />
                    <span>Playing audio response...</span>
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}