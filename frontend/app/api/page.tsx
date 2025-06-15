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
      method: "POST",      path: "/api/v1/voice/transcribe",
      description: "Convert speech to text with language detection", 
      params: ["audio_file", "language_hint"],
      response: "Transcribed text with confidence scores",
      icon: <Terminal className="h-4 w-4" />
    }
  ]

  const codeExamples = {
    javascript: `// Initialize SalesSpeak SDK
const salesSpeak = new SalesSpeak({
  apiKey: 'your-api-key',
  baseURL: 'https://api.salesspeak.ai/v1'
});

// Start a conversation
const response = await salesSpeak.chat({
  message: 'मुझे एक नया स्मार्टफोन चाहिए',
  language: 'hi',
  context: {
    user_profile: 'tech_enthusiast',
    budget_range: '20000-40000'
  }
});

console.log(response.message);`,
    
    python: `# Install: pip install salesspeak-sdk
from salesspeak import SalesSpeak

# Initialize client
client = SalesSpeak(api_key="your-api-key")

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
curl -X POST https://api.salesspeak.ai/v1/chat \\
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/50 to-violet-50/50 dark:from-slate-950 dark:via-blue-950/50 dark:to-violet-950/50 transition-all duration-700">
      {/* Enhanced Background Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-48 -right-48 w-96 h-96 gradient-mesh rounded-full blur-3xl opacity-30 animate-float"></div>
        <div className="absolute -bottom-48 -left-48 w-96 h-96 bg-gradient-to-tr from-cyan-400/20 via-blue-500/20 to-violet-600/20 rounded-full blur-3xl opacity-30 animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-r from-blue-400/10 to-violet-600/10 rounded-full blur-2xl animate-pulse-slow"></div>      </div>
      
      {/* Enhanced Navigation */}
      <Navbar />

      <div className="relative z-10">        {/* Header Section */}
        <div className="pt-16 sm:pt-24 md:pt-32 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <Badge className="mb-6 sm:mb-8 bg-gradient-to-r from-blue-100/80 to-violet-100/80 dark:from-blue-900/30 dark:to-violet-900/30 text-blue-800 dark:text-blue-300 border-blue-200/50 dark:border-blue-600/30 px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm font-medium shadow-lg backdrop-blur-sm hover:shadow-xl transition-all duration-300 hover:scale-105">
              🔧 Developer Resources
            </Badge>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 sm:mb-8 leading-tight">
              <span className="block text-slate-900 dark:text-white mb-2 sm:mb-3">API</span>
              <span className="block bg-gradient-to-r from-blue-600 via-violet-600 to-cyan-600 bg-clip-text text-transparent animate-gradient">
                Documentation
              </span>
            </h1>
            
            <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg md:text-xl max-w-4xl mx-auto leading-relaxed mb-8 sm:mb-12 md:mb-16 font-medium px-4 sm:px-0">
              Build powerful AI-powered sales applications with our comprehensive API. 
              Support for voice, chat, and multilingual interactions in 10+ Indian languages.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center max-w-md sm:max-w-none mx-auto">
              <Link href="/contact" className="w-full sm:w-auto">
                <Button size="lg" className="w-full bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white text-base sm:text-lg px-6 sm:px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                  Get API Key
                </Button>
              </Link>
              <Link href="/documentation" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full glass-subtle border-white/30 dark:border-slate-700/50 hover:bg-white/40 dark:hover:bg-slate-800/40 text-base sm:text-lg px-6 sm:px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
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
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-3 sm:mb-4">
                Quick Start Guide
              </h2>
              <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg px-4 sm:px-0">
                Get up and running with SalesSpeak API in just three steps
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
              {[
                {
                  step: "01",
                  icon: <Key className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8" />,
                  title: "Get API Key",
                  description: "Sign up for a free account and get your API key from the developer dashboard",
                  color: "from-blue-500 to-violet-600"
                },
                {
                  step: "02", 
                  icon: <Code className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8" />,
                  title: "Install SDK",
                  description: "Choose from our JavaScript, Python, or REST API to integrate with your application",
                  color: "from-violet-500 to-purple-600"
                },
                {
                  step: "03",
                  icon: <Terminal className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8" />,
                  title: "Start Building",
                  description: "Make your first API call and start building AI-powered sales conversations",
                  color: "from-purple-500 to-pink-600"
                }
              ].map((item, index) => (
                <Card key={index} className="glass-strong border-white/30 dark:border-slate-700/50 hover:shadow-xl transition-all duration-300 hover:scale-105 group relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500/10 to-violet-500/10 rounded-bl-2xl sm:rounded-bl-3xl"></div>
                  <CardContent className="p-4 sm:p-6 md:p-8 text-center relative">
                    <div className="text-2xl sm:text-3xl font-bold text-slate-300 dark:text-slate-600 mb-3 sm:mb-4">
                      {item.step}
                    </div>
                    <div className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br ${item.color} rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      {item.icon}
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-slate-900 dark:text-white">
                      {item.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
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
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-3 sm:mb-4">
                API Endpoints
              </h2>
              <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg px-4 sm:px-0">
                Comprehensive endpoints for all your AI sales conversation needs
              </p>
            </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              {endpoints.map((endpoint, index) => (
                <Card key={index} className="glass-strong border-white/30 dark:border-slate-700/50 hover:shadow-xl transition-all duration-300 hover:scale-[1.02] group">
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row sm:items-start space-y-3 sm:space-y-0 sm:space-x-4 mb-4">
                      <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500/20 to-violet-500/20 text-blue-600 dark:text-blue-400 self-start">
                        {endpoint.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 mb-2">
                          <Badge 
                            variant={endpoint.method === 'GET' ? 'default' : 'secondary'} 
                            className={`font-mono text-xs w-fit ${
                              endpoint.method === 'GET' 
                                ? 'bg-green-100/80 text-green-800 dark:bg-green-900/30 dark:text-green-300' 
                                : 'bg-blue-100/80 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                            }`}
                          >
                            {endpoint.method}
                          </Badge>
                          <code className="text-xs sm:text-sm bg-slate-100/80 dark:bg-slate-800/80 px-2 sm:px-3 py-1 rounded-lg font-mono text-slate-700 dark:text-slate-300 break-all">
                            {endpoint.path}
                          </code>
                        </div>
                        <p className="text-slate-700 dark:text-slate-300 mb-3 font-medium text-sm sm:text-base">{endpoint.description}</p>
                        <div className="flex flex-wrap gap-1 sm:gap-2">
                          {endpoint.params.map((param) => (
                            <Badge key={param} variant="outline" className="text-xs bg-violet-50/50 dark:bg-violet-900/20 text-violet-700 dark:text-violet-300 border-violet-200/50 dark:border-violet-600/30">
                              {param}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 bg-slate-50/50 dark:bg-slate-800/50 p-3 rounded-lg">
                      <strong className="text-slate-700 dark:text-slate-300">Returns:</strong> {endpoint.response}
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
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-3 sm:mb-4">
                Code Examples
              </h2>
              <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg px-4 sm:px-0">
                Ready-to-use code snippets in your favorite programming language
              </p>
            </div>
            
            <Card className="glass-strong border-white/30 dark:border-slate-700/50 shadow-2xl overflow-hidden">
              <CardContent className="p-0">
                <Tabs defaultValue="javascript" className="w-full">
                  <TabsList className="grid w-full grid-cols-3 rounded-t-xl rounded-b-none h-12 sm:h-14 bg-slate-100/50 dark:bg-slate-800/50">
                    <TabsTrigger value="javascript" className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700 text-xs sm:text-sm font-semibold">
                      JavaScript
                    </TabsTrigger>
                    <TabsTrigger value="python" className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700 text-xs sm:text-sm font-semibold">
                      Python
                    </TabsTrigger>
                    <TabsTrigger value="curl" className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700 text-xs sm:text-sm font-semibold">
                      cURL
                    </TabsTrigger>
                  </TabsList>
                  
                  {Object.entries(codeExamples).map(([lang, code]) => (
                    <TabsContent key={lang} value={lang} className="p-0 m-0">
                      <div className="relative">
                        <pre className="bg-slate-900 dark:bg-slate-950 text-slate-100 p-4 sm:p-6 md:p-8 overflow-x-auto text-xs sm:text-sm leading-relaxed">
                          <code>{code}</code>
                        </pre>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="absolute top-2 right-2 sm:top-4 sm:right-4 text-slate-400 hover:text-white hover:bg-slate-700/50 backdrop-blur-sm transition-all duration-300"
                          onClick={() => copyToClipboard(code, lang)}
                        >
                          {copiedCode === lang ? (
                            <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-400" />
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
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-3 sm:mb-4">
                API Features
              </h2>
              <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg px-4 sm:px-0">
                Everything you need to build world-class AI sales applications
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
              {[
                {
                  icon: <Globe className="h-5 w-5 sm:h-6 sm:w-6" />,
                  title: "Multilingual Support",
                  description: "Support for 10+ Indian languages plus English with automatic language detection and seamless switching",
                  color: "from-blue-500 to-cyan-500"
                },
                {
                  icon: <Shield className="h-5 w-5 sm:h-6 sm:w-6" />,
                  title: "Enterprise Security", 
                  description: "End-to-end encryption, SOC 2 compliance, GDPR ready, and enterprise-grade security standards",
                  color: "from-green-500 to-emerald-500"
                },
                {
                  icon: <Zap className="h-5 w-5 sm:h-6 sm:w-6" />,
                  title: "Real-time Processing",
                  description: "Streaming responses with WebSocket support for real-time conversations and instant feedback",
                  color: "from-violet-500 to-purple-500"
                }
              ].map((feature, index) => (
                <Card
                  key={index}
                  className="glass-strong border-white/30 dark:border-slate-700/50 hover:shadow-xl transition-all duration-300 hover:scale-105 group"
                >
                  <CardContent className="p-6 sm:p-8 text-center">
                    <div className={`w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br ${feature.color} rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      {feature.icon}
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-slate-900 dark:text-white">
                      {feature.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
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
            <Card className="glass-strong border-white/30 dark:border-slate-700/50 shadow-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-violet-600/10 to-cyan-600/10"></div>
              <CardContent className="relative p-6 sm:p-8 md:p-12">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-3 sm:mb-4">
                  Ready to Get Started?
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-300 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed px-4 sm:px-0">
                  Join thousands of developers building amazing AI-powered sales applications with SalesSpeak API
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center max-w-md sm:max-w-none mx-auto">
                  <Link href="/contact" className="w-full sm:w-auto">
                    <Button size="lg" className="w-full bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white text-base sm:text-lg px-6 sm:px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                      <Key className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                      Get API Key
                    </Button>
                  </Link>
                  <Link href="/chat" className="w-full sm:w-auto">
                    <Button size="lg" variant="outline" className="w-full glass-subtle border-white/30 dark:border-slate-700/50 hover:bg-white/40 dark:hover:bg-slate-800/40 text-base sm:text-lg px-6 sm:px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
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
