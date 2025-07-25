"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Footer } from "@/components/footer"
import { Navbar } from "@/components/navbar"
import {
  Code,
  Key,
  Database,
  Zap,
  Shield,
  Globe,
  Copy,
  CheckCircle,
  ExternalLink,
  Book,
  Terminal,
  Play,
  FileText,
  Webhook,
  MessageSquare,
  BarChart3
} from "lucide-react"
import Link from "next/link"

export default function APIPage() {
  const [copiedCode, setCopiedCode] = useState<string>("")

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(id)
    setTimeout(() => setCopiedCode(""), 2000)
  }
  const endpoints = [
    {
      method: "POST",
      path: "/start-assistant/",
      description: "Start a conversation with the AI voice assistant",
      params: ["transcript", "session_id"],
      response: "AI response with text, audio file path, and audio URLs",
      icon: <MessageSquare className="h-4 w-4" />
    },
    {
      method: "GET",
      path: "/get-audio/{session_id}",
      description: "Get generated audio file for a session",
      params: ["session_id"],
      response: "WAV audio file for direct playback",
      icon: <Play className="h-4 w-4" />
    },
    {
      method: "GET",
      path: "/get-latest-response/{session_id}",
      description: "Get latest response data including audio URLs",
      params: ["session_id"],
      response: "Response text, audio URLs, and metadata",
      icon: <Database className="h-4 w-4" />
    },
    {
      method: "POST",
      path: "/get-transcript",
      description: "Test endpoint for transcript processing",
      params: ["transcript", "session_id"],
      response: "Acknowledgment of received transcript",
      icon: <Terminal className="h-4 w-4" />
    },
    {
      method: "POST",
      path: "/api/v1/voice/synthesize",
      description: "Convert text to speech in multiple languages",
      params: ["text", "language", "voice_id", "speed"],
      response: "Audio file URL and metadata",
      icon: <Play className="h-4 w-4" />
    },
    {
      method: "POST", path: "/api/v1/voice/transcribe",
      description: "Convert speech to text with language detection",
      params: ["audio_file", "language_hint"],
      response: "Transcribed text with confidence scores",
      icon: <Terminal className="h-4 w-4" />
    }
  ]

  const codeExamples = {
    javascript: `// Initialize Voce SDK
const Voce = new Voce({
  apiKey: 'your-api-key',
  baseURL: 'https://api.Voce.ai/v1'
});

// Start a conversation
const response = await Voce.chat({
  message: 'मुझे एक नया स्मार्टफोन चाहिए',
  language: 'hi',
  context: {
    user_profile: 'tech_enthusiast',
    budget_range: '20000-40000'
  }
});

console.log(response.message);`,

    python: `# Install: pip install Voce-sdk
from Voce import Voce

# Initialize client
client = Voce(api_key="your-api-key")

# Start conversation
response = client.chat(
    message="I need a laptop for coding",
    language="en",
    context={
        "user_profile": "developer",
        "budget_range": "50000-80000"
    }
)

print(response.message)`,

    curl: `# Chat with AI Assistant
curl -X POST https://api.Voce.ai/v1/chat \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "message": "मुझे एक गेमिंग लैपटॉप चाहिए",
    "language": "hi",
    "context": {
      "budget_range": "60000-100000",
      "use_case": "gaming"
    }
  }'`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F3F1E9] via-[#ECE8D9] to-[#F3F1E9] dark:from-[#1E1E1E] dark:via-[#2A2A2A] dark:to-[#1E1E1E] transition-all duration-700">
      {/* Classic Background Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-48 -right-48 w-96 h-96 gradient-classic-mesh rounded-full blur-3xl opacity-30 animate-float"></div>
        <div className="absolute -bottom-48 -left-48 w-96 h-96 bg-gradient-to-tr from-[#BBA588]/20 via-[#8E735B]/20 to-[#7C6D64]/20 rounded-full blur-3xl opacity-30 animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-r from-[#BBA588]/10 to-[#8E735B]/10 rounded-full blur-2xl animate-pulse-slow"></div>      </div>

      {/* Enhanced Navigation */}
      <Navbar />

      <div className="relative z-10">        {/* Header Section */}
        <div className="pt-16 sm:pt-24 md:pt-32 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <Badge className="mb-6 sm:mb-8 bg-gradient-to-r from-[#F3F1E9] via-[#ECE8D9] to-[#F3F1E9] text-[#8E735B] border-[#BBA588]/60 dark:from-[#1E1E1E]/80 dark:via-[#2A2A2A]/80 dark:to-[#1E1E1E]/80 dark:text-[#BBA588] dark:border-[#BBA588]/20 px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm font-medium shadow-lg backdrop-blur-sm hover:shadow-xl transition-all duration-300 hover:scale-105 font-serif">
              🔧 Developer Resources
            </Badge>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 sm:mb-8 leading-tight font-serif-display">
              <span className="block text-[#2D2C2A] dark:text-[#ECE8D9] mb-2 sm:mb-3">API</span>
              <span className="block bg-gradient-to-r from-[#8E735B] via-[#BBA588] to-[#7C6D64] bg-clip-text text-transparent animate-gradient">
                Documentation
              </span>
            </h1>

            <p className="text-[#5A5A5A] dark:text-[#B6B6B6] text-base sm:text-lg md:text-xl max-w-4xl mx-auto leading-relaxed mb-8 sm:mb-12 md:mb-16 font-medium px-4 sm:px-0 font-serif">
              Build sophisticated AI-powered sales applications with our comprehensive API.
              Support for voice, chat, and multilingual interactions with timeless elegance.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center max-w-md sm:max-w-none mx-auto">
              <Link href="/contact" className="w-full sm:w-auto">
                <Button size="lg" className="w-full btn-classic text-white text-base sm:text-lg px-6 sm:px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 font-serif">
                  Get API Key
                </Button>
              </Link>
              <Link href="/documentation" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full btn-classic-outline text-base sm:text-lg px-6 sm:px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 font-serif">
                  <FileText className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                  Full Documentation
                </Button>
              </Link>
            </div>
          </div>
        </div>        {/* Quick Start Section */}
        <div className="px-4 sm:px-6 lg:px-8 mb-12 sm:mb-16 md:mb-20">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8 sm:mb-10 md:mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#2D2C2A] dark:text-[#ECE8D9] mb-3 sm:mb-4 font-serif-display">
                Quick Start Guide
              </h2>
              <p className="text-[#5A5A5A] dark:text-[#B6B6B6] text-base sm:text-lg px-4 sm:px-0 font-serif">
                Get up and running with Voce API in just three elegant steps
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
              {[
                {
                  step: "01",
                  icon: <Key className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8" />,
                  title: "Get API Key",
                  description: "Sign up for a distinguished account and get your API key from the developer dashboard",
                  color: "from-[#8E735B] to-[#BBA588]"
                },
                {
                  step: "02",
                  icon: <Code className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8" />,
                  title: "Install SDK",
                  description: "Choose from our sophisticated JavaScript, Python, or REST API to integrate with your application",
                  color: "from-[#BBA588] to-[#7C6D64]"
                },
                {
                  step: "03",
                  icon: <Terminal className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8" />,
                  title: "Start Building",
                  description: "Make your first API call and start building timeless AI-powered sales conversations",
                  color: "from-[#7C6D64] to-[#8E735B]"
                }
              ].map((item, index) => (
                <Card key={index} className="glass-classic border-[#BBA588]/40 dark:border-[#BBA588]/20 hover:border-[#BBA588]/60 dark:hover:border-[#BBA588]/40 hover:shadow-xl transition-all duration-300 hover:scale-105 group relative overflow-hidden rounded-2xl">
                  <div className="absolute top-0 right-0 w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-[#BBA588]/10 to-[#8E735B]/10 rounded-bl-2xl sm:rounded-bl-3xl"></div>
                  <CardContent className="p-4 sm:p-6 md:p-8 text-center relative">
                    <div className="text-2xl sm:text-3xl font-bold text-[#BBA588]/60 dark:text-[#BBA588]/40 mb-3 sm:mb-4 font-serif-display">
                      {item.step}
                    </div>
                    <div className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br ${item.color} rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 text-[#F3F1E9] shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      {item.icon}
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-[#2D2C2A] dark:text-[#ECE8D9] font-serif-display">
                      {item.title}
                    </h3>
                    <p className="text-[#5A5A5A] dark:text-[#B6B6B6] leading-relaxed text-sm sm:text-base font-serif">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>        {/* API Endpoints Section */}
        <div className="px-4 sm:px-6 lg:px-8 mb-12 sm:mb-16 md:mb-20">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8 sm:mb-10 md:mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#2D2C2A] dark:text-[#ECE8D9] mb-3 sm:mb-4 font-serif-display">
                API Endpoints
              </h2>
              <p className="text-[#5A5A5A] dark:text-[#B6B6B6] text-base sm:text-lg px-4 sm:px-0 font-serif">
                Comprehensive endpoints for all your sophisticated AI sales conversation needs
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              {endpoints.map((endpoint, index) => (
                <Card key={index} className="glass-classic border-[#BBA588]/40 dark:border-[#BBA588]/20 hover:border-[#BBA588]/60 dark:hover:border-[#BBA588]/40 hover:shadow-xl transition-all duration-300 hover:scale-[1.02] group rounded-2xl">
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row sm:items-start space-y-3 sm:space-y-0 sm:space-x-4 mb-4">
                      <div className="p-2 rounded-lg bg-gradient-to-br from-[#BBA588]/20 to-[#8E735B]/20 text-[#8E735B] dark:text-[#BBA588] self-start">
                        {endpoint.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 mb-2">
                          <Badge
                            variant={endpoint.method === 'GET' ? 'default' : 'secondary'}
                            className={`font-mono text-xs w-fit ${endpoint.method === 'GET'
                              ? 'bg-[#BBA588]/20 text-[#8E735B] dark:bg-[#BBA588]/30 dark:text-[#BBA588]'
                              : 'bg-[#7C6D64]/20 text-[#8E735B] dark:bg-[#7C6D64]/30 dark:text-[#BBA588]'
                              } font-serif`}
                          >
                            {endpoint.method}
                          </Badge>
                          <code className="text-xs sm:text-sm bg-[#F3F1E9]/80 dark:bg-[#1E1E1E]/80 px-2 sm:px-3 py-1 rounded-lg font-mono text-[#5A5A5A] dark:text-[#B6B6B6] break-all border border-[#BBA588]/20">
                            {endpoint.path}
                          </code>
                        </div>
                        <p className="text-[#5A5A5A] dark:text-[#B6B6B6] mb-3 font-medium text-sm sm:text-base font-serif">{endpoint.description}</p>
                        <div className="flex flex-wrap gap-1 sm:gap-2">
                          {endpoint.params.map((param) => (
                            <Badge key={param} variant="outline" className="text-xs bg-[#BBA588]/10 dark:bg-[#BBA588]/20 text-[#8E735B] dark:text-[#BBA588] border-[#BBA588]/30 dark:border-[#BBA588]/20 font-serif">
                              {param}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="text-xs sm:text-sm text-[#5A5A5A] dark:text-[#B6B6B6] bg-[#F3F1E9]/50 dark:bg-[#1E1E1E]/50 p-3 rounded-lg border border-[#BBA588]/20 font-serif">
                      <strong className="text-[#2D2C2A] dark:text-[#ECE8D9] font-serif-display">Returns:</strong> {endpoint.response}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>        {/* Code Examples Section */}
        <div className="px-4 sm:px-6 lg:px-8 mb-12 sm:mb-16 md:mb-20">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8 sm:mb-10 md:mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#2D2C2A] dark:text-[#ECE8D9] mb-3 sm:mb-4 font-serif-display">
                Code Examples
              </h2>
              <p className="text-[#5A5A5A] dark:text-[#B6B6B6] text-base sm:text-lg px-4 sm:px-0 font-serif">
                Ready-to-use code snippets in your favorite programming language
              </p>
            </div>

            <Card className="glass-classic border-[#BBA588]/40 dark:border-[#BBA588]/20 shadow-2xl overflow-hidden rounded-2xl">
              <CardContent className="p-0">
                <Tabs defaultValue="javascript" className="w-full">
                  <TabsList className="grid w-full grid-cols-3 rounded-t-xl rounded-b-none h-12 sm:h-14 bg-[#F3F1E9]/50 dark:bg-[#1E1E1E]/50">
                    <TabsTrigger value="javascript" className="data-[state=active]:bg-[#F3F1E9] dark:data-[state=active]:bg-[#2A2A2A] text-xs sm:text-sm font-semibold font-serif text-[#5A5A5A] dark:text-[#B6B6B6] data-[state=active]:text-[#2D2C2A] dark:data-[state=active]:text-[#ECE8D9]">
                      JavaScript
                    </TabsTrigger>
                    <TabsTrigger value="python" className="data-[state=active]:bg-[#F3F1E9] dark:data-[state=active]:bg-[#2A2A2A] text-xs sm:text-sm font-semibold font-serif text-[#5A5A5A] dark:text-[#B6B6B6] data-[state=active]:text-[#2D2C2A] dark:data-[state=active]:text-[#ECE8D9]">
                      Python
                    </TabsTrigger>
                    <TabsTrigger value="curl" className="data-[state=active]:bg-[#F3F1E9] dark:data-[state=active]:bg-[#2A2A2A] text-xs sm:text-sm font-semibold font-serif text-[#5A5A5A] dark:text-[#B6B6B6] data-[state=active]:text-[#2D2C2A] dark:data-[state=active]:text-[#ECE8D9]">
                      cURL
                    </TabsTrigger>
                  </TabsList>

                  {Object.entries(codeExamples).map(([lang, code]) => (
                    <TabsContent key={lang} value={lang} className="p-0 m-0">
                      <div className="relative">
                        <pre className="bg-[#2D2C2A] dark:bg-[#1E1E1E] text-[#ECE8D9] p-4 sm:p-6 md:p-8 overflow-x-auto text-xs sm:text-sm leading-relaxed font-mono">
                          <code>{code}</code>
                        </pre>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="absolute top-2 right-2 sm:top-4 sm:right-4 text-[#BBA588] hover:text-[#ECE8D9] hover:bg-[#8E735B]/50 backdrop-blur-sm transition-all duration-300 font-serif"
                          onClick={() => copyToClipboard(code, lang)}
                        >
                          {copiedCode === lang ? (
                            <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-[#BBA588]" />
                          ) : (
                            <Copy className="h-3 w-3 sm:h-4 sm:w-4" />
                          )}
                        </Button>
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>        {/* Features Grid */}
        <div className="px-4 sm:px-6 lg:px-8 mb-12 sm:mb-16 md:mb-20">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8 sm:mb-10 md:mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#2D2C2A] dark:text-[#ECE8D9] mb-3 sm:mb-4 font-serif-display">
                API Features
              </h2>
              <p className="text-[#5A5A5A] dark:text-[#B6B6B6] text-base sm:text-lg px-4 sm:px-0 font-serif">
                Everything you need to build world-class AI sales applications with timeless elegance
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
              {[
                {
                  icon: <Globe className="h-5 w-5 sm:h-6 sm:w-6" />,
                  title: "Multilingual Support",
                  description: "Support for 10+ Indian languages plus English with automatic language detection and seamless switching",
                  color: "from-[#8E735B] to-[#BBA588]"
                },
                {
                  icon: <Shield className="h-5 w-5 sm:h-6 sm:w-6" />,
                  title: "Enterprise Security",
                  description: "End-to-end encryption, SOC 2 compliance, GDPR ready, and enterprise-grade security standards",
                  color: "from-[#BBA588] to-[#7C6D64]"
                },
                {
                  icon: <Zap className="h-5 w-5 sm:h-6 sm:w-6" />,
                  title: "Real-time Processing",
                  description: "Streaming responses with WebSocket support for real-time conversations and instant feedback",
                  color: "from-[#7C6D64] to-[#8E735B]"
                }
              ].map((feature, index) => (
                <Card
                  key={index}
                  className="glass-classic border-[#BBA588]/40 dark:border-[#BBA588]/20 hover:border-[#BBA588]/60 dark:hover:border-[#BBA588]/40 hover:shadow-xl transition-all duration-300 hover:scale-105 group rounded-2xl"
                >
                  <CardContent className="p-6 sm:p-8 text-center">
                    <div className={`w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br ${feature.color} rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 text-[#F3F1E9] shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      {feature.icon}
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-[#2D2C2A] dark:text-[#ECE8D9] font-serif-display">
                      {feature.title}
                    </h3>
                    <p className="text-[#5A5A5A] dark:text-[#B6B6B6] leading-relaxed text-sm sm:text-base font-serif">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>        {/* CTA Section */}
        <div className="px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20 md:pb-24">
          <div className="max-w-4xl mx-auto text-center">
            <Card className="glass-classic border-[#BBA588]/40 dark:border-[#BBA588]/20 shadow-2xl overflow-hidden rounded-2xl">
              <div className="absolute inset-0 bg-gradient-to-r from-[#BBA588]/10 via-[#8E735B]/10 to-[#7C6D64]/10"></div>
              <CardContent className="relative p-6 sm:p-8 md:p-12">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#2D2C2A] dark:text-[#ECE8D9] mb-3 sm:mb-4 font-serif-display">
                  Ready to Get Started?
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-[#5A5A5A] dark:text-[#B6B6B6] mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed px-4 sm:px-0 font-serif">
                  Join thousands of developers building amazing AI-powered sales applications with Voce API
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center max-w-md sm:max-w-none mx-auto">
                  <Link href="/contact" className="w-full sm:w-auto">
                    <Button size="lg" className="w-full btn-classic text-white text-base sm:text-lg px-6 sm:px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 font-serif">
                      <Key className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                      Get API Key
                    </Button>
                  </Link>
                  <Link href="/chat" className="w-full sm:w-auto">
                    <Button size="lg" variant="outline" className="w-full btn-classic-outline text-base sm:text-lg px-6 sm:px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 font-serif">
                      <ExternalLink className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                      Try Demo
                    </Button>
                  </Link>
                </div></CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
