"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, AlertCircle } from "lucide-react"

export function ApiStatus() {
  const [isSupported, setIsSupported] = useState(false)

  useEffect(() => {
    // Check if browser supports speech recognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    setIsSupported(!!SpeechRecognition)
  }, [])
  return (
    <Badge
      variant={isSupported ? "default" : "destructive"}
      className={`text-xs transition-all duration-300 hover:scale-105 shadow-lg ${
        isSupported
          ? "bg-gradient-to-r from-green-400/20 to-emerald-500/20 text-green-300 hover:from-green-400/30 hover:to-emerald-500/30 border border-green-400/30 backdrop-blur-lg"
          : "bg-gradient-to-r from-red-400/20 to-rose-500/20 text-red-300 hover:from-red-400/30 hover:to-rose-500/30 border border-red-400/30 backdrop-blur-lg"
      }`}
    >
      {isSupported ? (
        <>
          <CheckCircle className="w-3 h-3 mr-1 animate-pulse" />
          Voice Ready
        </>
      ) : (
        <>
          <AlertCircle className="w-3 h-3 mr-1 animate-pulse" />
          Voice Unavailable
        </>
      )}
    </Badge>
  )
}
