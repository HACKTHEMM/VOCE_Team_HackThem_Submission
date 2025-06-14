"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Mic, Wifi, Settings, RefreshCw, CheckCircle, XCircle, AlertTriangle, HelpCircle } from "lucide-react"

export function VoiceTroubleshooting() {
  const [isTestingMic, setIsTestingMic] = useState(false)
  const [micTestResult, setMicTestResult] = useState<"success" | "failed" | null>(null)

  const testMicrophone = async () => {
    setIsTestingMic(true)
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      stream.getTracks().forEach((track) => track.stop())
      setMicTestResult("success")
    } catch (error) {
      setMicTestResult("failed")
    }
    setIsTestingMic(false)
  }

  const troubleshootingSteps = [
    {
      title: "Check Internet Connection",
      description: "Voice recognition requires a stable internet connection",
      icon: <Wifi className="h-4 w-4" />,
      status: navigator.onLine ? "success" : "failed",
    },
    {
      title: "Microphone Permission",
      description: "Allow microphone access in your browser settings",
      icon: <Mic className="h-4 w-4" />,
      status: micTestResult,
    },
    {
      title: "Browser Compatibility",
      description: "Use Chrome, Edge, or Safari for best results",
      icon: <Settings className="h-4 w-4" />,
      status: window.SpeechRecognition || window.webkitSpeechRecognition ? "success" : "failed",
    },
  ]

  const getStatusIcon = (status: string | null) => {
    switch (status) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-400" />
      case "failed":
        return <XCircle className="h-4 w-4 text-red-400" />
      default:
        return <HelpCircle className="h-4 w-4 text-yellow-400" />
    }
  }

  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center space-x-2">
          <AlertTriangle className="h-5 w-5 text-yellow-400" />
          <span>Voice Troubleshooting</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert className="border-yellow-600/50 bg-yellow-600/10">
          <AlertTriangle className="h-4 w-4 text-yellow-400" />
          <AlertDescription className="text-yellow-200">
            If voice recognition isn't working, try these troubleshooting steps:
          </AlertDescription>
        </Alert>

        <div className="space-y-3">
          {troubleshootingSteps.map((step, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
              <div className="flex items-center space-x-3">
                {step.icon}
                <div>
                  <p className="text-white text-sm font-medium">{step.title}</p>
                  <p className="text-slate-400 text-xs">{step.description}</p>
                </div>
              </div>
              {getStatusIcon(step.status)}
            </div>
          ))}
        </div>

        <div className="flex space-x-2">
          <Button
            onClick={testMicrophone}
            disabled={isTestingMic}
            size="sm"
            variant="outline"
            className="border-slate-600 text-slate-300"
          >
            {isTestingMic ? <RefreshCw className="h-4 w-4 mr-2 animate-spin" /> : <Mic className="h-4 w-4 mr-2" />}
            Test Microphone
          </Button>

          <Button
            onClick={() => window.location.reload()}
            size="sm"
            variant="outline"
            className="border-slate-600 text-slate-300"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh Page
          </Button>
        </div>

        <div className="text-xs text-slate-400 space-y-1">
          <p>• Make sure you're using HTTPS (required for microphone access)</p>
          <p>• Check if other websites can access your microphone</p>
          <p>• Try refreshing the page if voice stops working</p>
          <p>• Use typing as a fallback if voice continues to fail</p>
        </div>
      </CardContent>
    </Card>
  )
}
