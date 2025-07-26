"use client"

import { useState, useEffect, useRef } from "react"
import { Mic, MicOff, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

interface VoiceRecognitionProps {
  onResult: (text: string) => void
  onListeningChange: (isListening: boolean) => void
  isListening: boolean
  language?: string
  size?: "sm" | "md" | "lg"
}

export function VoiceRecognition({
  onResult,
  onListeningChange,
  isListening,
  language = "en-US",
  size = "md",
}: VoiceRecognitionProps) {
  const [pulseIntensity, setPulseIntensity] = useState(0)
  const [isSupported, setIsSupported] = useState(false)
  const [hasPermission, setHasPermission] = useState(false)
  const [errorState, setErrorState] = useState<string | null>(null)

  const recognitionRef = useRef<any>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const { toast } = useToast()

  // Language mapping for speech recognition
  const getLanguageCode = (lang: string) => {
    const languageMap: Record<string, string> = {
      en: "en-US",
      hi: "hi-IN",
      bn: "bn-IN",
      te: "te-IN",
      mr: "mr-IN",
      ta: "ta-IN",
      gu: "gu-IN",
      kn: "kn-IN",
      ml: "ml-IN",
      pa: "pa-IN",
      es: "es-ES",
      fr: "fr-FR",
      de: "de-DE",
    }
    return languageMap[lang] || "en-US"
  }

  // Initialize speech recognition
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

    if (SpeechRecognition) {
      setIsSupported(true)
      const recognition = new SpeechRecognition()
      recognition.continuous = false
      recognition.interimResults = true
      recognition.lang = getLanguageCode(language)

      recognition.onstart = () => {
        console.log("Speech recognition started")
        setHasPermission(true)
        setErrorState(null)

        // Set timeout to prevent hanging
        timeoutRef.current = setTimeout(() => {
          if (recognitionRef.current) {
            recognitionRef.current.stop()
            onListeningChange(false)
            toast({
              title: "Voice Timeout",
              description: "No speech detected. Please try again.",
              variant: "default",
            })
          }
        }, 10000) // 10 second timeout
      }

      recognition.onresult = (event: any) => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current)
          timeoutRef.current = null
        }

        let finalTranscript = ""

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript
          if (event.results[i].isFinal) {
            finalTranscript += transcript
          }
        }

        if (finalTranscript.trim()) {
          onResult(finalTranscript.trim())
          onListeningChange(false)
          setErrorState(null)
        }
      }

      recognition.onerror = (event: any) => {
        console.error("Speech recognition error:", event.error)

        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current)
          timeoutRef.current = null
        }

        onListeningChange(false)

        let errorMessage = "Speech recognition error occurred"

        switch (event.error) {
          case "no-speech":
            errorMessage = "No speech detected. Please try again."
            break
          case "audio-capture":
            errorMessage = "Microphone not accessible. Please check permissions."
            setErrorState("microphone-error")
            setHasPermission(false)
            break
          case "not-allowed":
            errorMessage = "Microphone permission denied. Please allow access."
            setErrorState("permission-denied")
            setHasPermission(false)
            break
          case "network":
            errorMessage = "Network error. Please check your connection."
            setErrorState("network-error")
            break
          default:
            errorMessage = "Speech recognition failed. Please try again."
            setErrorState("recognition-error")
        }

        toast({
          title: "Voice Recognition Error",
          description: errorMessage,
          variant: "destructive",
        })
      }

      recognition.onend = () => {
        console.log("Speech recognition ended")
        onListeningChange(false)

        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current)
          timeoutRef.current = null
        }
      }

      recognitionRef.current = recognition
    } else {
      setIsSupported(false)
      setErrorState("not-supported")
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      if (recognitionRef.current) {
        recognitionRef.current.abort()
      }
    }
  }, [language, onResult, onListeningChange, toast])

  // Handle listening state changes
  useEffect(() => {
    if (isListening && recognitionRef.current && isSupported) {
      try {
        recognitionRef.current.start()
      } catch (error) {
        console.error("Failed to start recognition:", error)
        onListeningChange(false)
        setErrorState("start-failed")
        toast({
          title: "Recording Failed",
          description: "Failed to start voice recording. Please try again.",
          variant: "destructive",
        })
      }
    } else if (!isListening && recognitionRef.current) {
      try {
        recognitionRef.current.stop()
      } catch (error) {
        console.error("Error stopping recognition:", error)
      }
    }
  }, [isListening, isSupported, onListeningChange, toast])

  // Pulse animation
  useEffect(() => {
    if (isListening && !errorState) {
      const interval = setInterval(() => {
        setPulseIntensity(Math.random() * 100)
      }, 100)
      return () => clearInterval(interval)
    } else {
      setPulseIntensity(0)
    }
  }, [isListening, errorState])

  // Toggle listening state
  const handleToggle = async () => {
    if (!isSupported) {
      toast({
        title: "Not Supported",
        description: "Speech recognition is not supported in your browser. Please use Chrome, Edge, or Safari.",
        variant: "destructive",
      })
      return
    }

    if (!isListening) {
      try {
        // Request microphone permission first
        await navigator.mediaDevices.getUserMedia({ audio: true })
        setHasPermission(true)
        setErrorState(null)
        onListeningChange(true)
      } catch (error) {
        console.error("Toggle error:", error)
        setErrorState("permission-denied")
        setHasPermission(false)
        toast({
          title: "Microphone Access Required",
          description: "Please allow microphone access to use voice input.",
          variant: "destructive",
        })
      }
    } else {
      onListeningChange(false)
    }
  }

  const sizeClasses = {
    sm: "w-12 h-12",
    md: "w-16 h-16",
    lg: "w-24 h-24",
  }

  const iconSizes = {
    sm: "h-5 w-5",
    md: "h-6 w-6",
    lg: "h-8 w-8",
  }
  const getButtonColor = () => {
    if (errorState) {
      return "bg-gradient-to-br from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 shadow-xl shadow-red-500/30"
    }
    if (isListening) {
      return "bg-gradient-to-br from-[#BBA588] to-[#8E735B] hover:from-[#A6956F] hover:to-[#7A6248] shadow-2xl shadow-[#BBA588]/40 animate-pulse"
    }
    return "bg-gradient-to-br from-[#BBA588] to-[#8E735B] hover:from-[#A6956F] hover:to-[#7A6248] shadow-xl shadow-[#BBA588]/30"
  }

  const getIcon = () => {
    if (errorState) return <AlertCircle className={`${iconSizes[size]} text-white`} />
    if (isListening) return <MicOff className={`${iconSizes[size]} text-[#ECE8D9]`} />
    return <Mic className={`${iconSizes[size]} text-[#ECE8D9]`} />
  }

  const getStatusText = () => {
    if (!isSupported) return "Browser not supported"
    if (errorState === "permission-denied") return "Microphone access denied"
    if (errorState === "microphone-error") return "Microphone not accessible"
    if (errorState === "network-error") return "Network error"
    if (errorState === "recognition-error") return "Recognition failed"
    if (errorState === "start-failed") return "Failed to start"
    if (errorState) return "Error occurred"
    return null
  }

  const isDisabled = !isSupported

  return (<div className="relative flex items-center justify-center">
    {/* Outer pulse rings */}
    {isListening && !errorState && (
      <>
        <div
          className="absolute rounded-full bg-gradient-to-r from-[#BBA588]/30 to-[#8E735B]/30 animate-ping"
          style={{
            width: `${120 + pulseIntensity * 0.5}%`,
            height: `${120 + pulseIntensity * 0.5}%`,
            animationDuration: "1s",
          }}
        />
        <div
          className="absolute rounded-full bg-gradient-to-r from-[#BBA588]/20 to-[#8E735B]/20 animate-ping"
          style={{
            width: `${140 + pulseIntensity * 0.3}%`,
            height: `${140 + pulseIntensity * 0.3}%`,
            animationDuration: "1.5s",
          }}
        />
        <div
          className="absolute rounded-full bg-gradient-to-r from-[#BBA588]/10 to-[#8E735B]/10 animate-ping"
          style={{
            width: `${160 + pulseIntensity * 0.2}%`,
            height: `${160 + pulseIntensity * 0.2}%`,
            animationDuration: "2s",
          }}
        />
      </>
    )}

    {/* Main button */}
    <Button
      onClick={handleToggle}
      disabled={isDisabled}
      className={`
          ${sizeClasses[size]} rounded-full relative z-10 transition-all duration-300 transform hover:scale-110 active:scale-95
          ${getButtonColor()}
          ${isDisabled ? "opacity-50 cursor-not-allowed" : ""}
        `}
      style={{
        transform: isListening && !errorState
          ? `scale(${1.1 + pulseIntensity * 0.001})`
          : isDisabled
            ? "scale(1)"
            : "scale(1)",
      }}
      aria-label={isListening ? "Stop listening" : "Start voice input"}
    >
      {getIcon()}
    </Button>

    {/* Visual feedback bars */}
    {isListening && !errorState && (
      <div className="absolute -bottom-10 flex space-x-1">
        {[...Array(7)].map((_, i) => (
          <div
            key={i}
            className="w-1 bg-gradient-to-t from-[#BBA588] to-[#8E735B] rounded-full transition-all duration-150 shadow-sm"
            style={{
              height: `${8 + pulseIntensity * 0.3 * (Math.random() + 0.5)}px`,
              opacity: 0.7 + pulseIntensity * 0.003,
              animationDelay: `${i * 0.1}s`,
            }}
          />
        ))}
      </div>
    )}

    {/* Status indicator */}
    {getStatusText() && (
      <div className="absolute -bottom-16 text-xs text-center whitespace-nowrap max-w-48">
        <span
          className={`
              px-3 py-1 rounded-full backdrop-blur-sm
              ${errorState
              ? "text-red-400 dark:text-red-400 bg-red-50/50 dark:bg-red-900/20 border border-red-200/50 dark:border-red-800/50"
              : "text-[#7C6D64] dark:text-[#B6B6B6] bg-[#F3F1E9]/50 dark:bg-white/[0.04] border border-[#7C6D64]/20 dark:border-[#BBA588]/20"
            }
            `}
        >
          {getStatusText()}
        </span>
      </div>
    )}
  </div>
  )
}
