"use client"

import { Badge } from "@/components/ui/badge"
import { Mic, MicOff, Wifi, WifiOff } from "lucide-react"

interface VoiceStatusProps {
  isListening: boolean
  isSupported: boolean
  hasPermission: boolean
}

export function VoiceStatus({ isListening, isSupported, hasPermission }: VoiceStatusProps) {
  if (!isSupported) {
    return (
      <Badge variant="destructive" className="flex items-center space-x-1">
        <WifiOff className="h-3 w-3" />
        <span>Voice Not Supported</span>
      </Badge>
    )
  }

  if (!hasPermission) {
    return (
      <Badge variant="secondary" className="flex items-center space-x-1 bg-yellow-600/20 text-yellow-400">
        <MicOff className="h-3 w-3" />
        <span>Microphone Access Needed</span>
      </Badge>
    )
  }

  if (isListening) {
    return (
      <Badge className="flex items-center space-x-1 bg-red-600/20 text-red-400 animate-pulse">
        <Mic className="h-3 w-3" />
        <span>Listening...</span>
      </Badge>
    )
  }

  return (
    <Badge className="flex items-center space-x-1 bg-green-600/20 text-green-400">
      <Wifi className="h-3 w-3" />
      <span>Voice Ready</span>
    </Badge>
  )
}
