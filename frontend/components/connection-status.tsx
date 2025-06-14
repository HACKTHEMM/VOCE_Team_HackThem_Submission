"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { WifiOff, AlertCircle, CheckCircle } from "lucide-react"

export function ConnectionStatus() {
  const [isOnline, setIsOnline] = useState(true)
  const [connectionQuality, setConnectionQuality] = useState<"good" | "poor" | "offline">("good")

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true)
      setConnectionQuality("good")
    }

    const handleOffline = () => {
      setIsOnline(false)
      setConnectionQuality("offline")
    }

    // Check initial status
    setIsOnline(navigator.onLine)

    // Test connection quality
    if (navigator.onLine) {
      // Simple connection test
      fetch("/favicon.ico", { method: "HEAD", cache: "no-cache" })
        .then(() => setConnectionQuality("good"))
        .catch(() => setConnectionQuality("poor"))
    }

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [])

  const getStatusInfo = () => {
    switch (connectionQuality) {
      case "offline":
        return {
          icon: <WifiOff className="h-3 w-3" />,
          text: "Offline",
          className: "bg-red-600/20 text-red-400",
        }
      case "poor":
        return {
          icon: <AlertCircle className="h-3 w-3" />,
          text: "Poor Connection",
          className: "bg-yellow-600/20 text-yellow-400",
        }
      default:
        return {
          icon: <CheckCircle className="h-3 w-3" />,
          text: "Connected",
          className: "bg-green-600/20 text-green-400",
        }
    }
  }

  const status = getStatusInfo()

  return (
    <Badge className={`flex items-center space-x-1 ${status.className}`}>
      {status.icon}
      <span>{status.text}</span>
    </Badge>
  )
}
