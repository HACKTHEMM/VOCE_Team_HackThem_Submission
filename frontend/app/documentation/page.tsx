"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ThemeToggle } from "@/components/theme-toggle"
import { 
  
  Search, 
  Book, 
  Code2, 
  PlayCircle,
  ArrowRight,
  ExternalLink,
  Download,
  FileText,
  Zap,
  Shield,
  Globe,
  Mic,
  MessageSquare,
  Settings,
  Database,
  Key,
  Webhook,
  Terminal,
  GitBranch,
  Clock,
  CheckCircle
} from "lucide-react"
import Link from "next/link"
import { Footer } from "@/components/footer"
import { Navbar } from "@/components/navbar"

export default function DocumentationPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  const categories = [
    "All",
    "Getting Started",
    "API Reference", 
    "SDKs",
    "Voice Integration",
    "Webhooks",
    "Authentication",
    "Examples"
  ]

  const quickStartGuides = [
    {
      title: "Quick Start Guide",
      description: "Get up and running with SalesSpeak in under 5 minutes",
      icon: <Zap className="h-6 w-6" />,
      time: "5 min",
      difficulty: "Beginner",
      href: "#quick-start"
    },
    {
      title: "API Authentication",
      description: "Learn how to authenticate with our REST API",
      icon: <Key className="h-6 w-6" />,
      time: "10 min", 
      difficulty: "Beginner",
      href: "#auth"
    },
    {
      title: "Voice Integration",
      description: "Integrate voice AI into your application",
      icon: <Mic className="h-6 w-6" />,
      time: "15 min",
      difficulty: "Intermediate",
      href: "#voice"
    },
    {
      title: "Webhook Setup",
      description: "Configure webhooks for real-time events",
      icon: <Webhook className="h-6 w-6" />,
      time: "12 min",
      difficulty: "Intermediate", 
      href: "#webhooks"
    }
  ]

  const apiEndpoints = [
    {
      method: "POST",
      path: "/api/v1/conversations",
      description: "Start a new conversation",
      category: "Conversations"
    },
    {
      method: "GET",
      path: "/api/v1/conversations/{id}",
      description: "Get conversation details",
      category: "Conversations"
    },
    {
      method: "POST",
      path: "/api/v1/voice/recognize",
      description: "Convert speech to text",
      category: "Voice"
    },
    {
      method: "POST",
      path: "/api/v1/voice/synthesize",
      description: "Convert text to speech",
      category: "Voice"
    },
    {
      method: "GET",
      path: "/api/v1/languages",
      description: "Get supported languages",
      category: "Configuration"
    },
    {
      method: "POST",
      path: "/api/v1/analytics/events",
      description: "Track custom events",
      category: "Analytics"
    }
  ]

  const sdks = [
    {
      name: "JavaScript SDK",
      description: "Full-featured SDK for web and Node.js applications",
      icon: "JS",
      version: "v2.4.0",
      color: "from-yellow-500 to-orange-500",
      installCommand: "npm install @salesspeak/sdk",
      language: "JavaScript"
    },
    {
      name: "Python SDK",
      description: "Python library for server-side integrations",
      icon: "PY",
      version: "v2.4.0", 
      color: "from-blue-500 to-cyan-500",
      installCommand: "pip install salesspeak",
      language: "Python"
    },
    {
      name: "React Components",
      description: "Ready-to-use React components",
      icon: "⚛️",
      version: "v2.4.0",
      color: "from-cyan-500 to-blue-500",
      installCommand: "npm install @salesspeak/react",
      language: "React"
    },
    {
      name: "PHP SDK",
      description: "PHP library for web applications",
      icon: "PHP",
      version: "v2.3.0",
      color: "from-purple-500 to-violet-500", 
      installCommand: "composer require salesspeak/php-sdk",
      language: "PHP"
    }
  ]

  const codeExamples = [
    {
      title: "Start Voice Conversation",
      language: "JavaScript",
      category: "Voice Integration",
      code: `import { SalesSpeak } from '@salesspeak/sdk';

const client = new SalesSpeak({
  apiKey: 'your-api-key'
});

// Start voice conversation
const conversation = await client.voice.startConversation({
  language: 'hi-IN',
  mode: 'sales',
  customerId: 'customer-123'
});

console.log('Conversation started:', conversation.id);`
    },
    {
      title: "Speech Recognition",
      language: "Python",
      category: "Voice Integration",
      code: `from salesspeak import SalesSpeak

client = SalesSpeak(api_key="your-api-key")

# Recognize speech from audio file
result = client.voice.recognize(
    audio_file="audio.wav",
    language="en-IN"
)

print(f"Recognized text: {result.text}")
print(f"Confidence: {result.confidence}")`
    },
    {
      title: "React Voice Component",
      language: "React",
      category: "SDKs",
      code: `import { VoiceChat } from '@salesspeak/react';

function MyApp() {
  return (
    <VoiceChat
      apiKey="your-api-key"
      language="hi-IN"
      onTranscription={(text) => {
        console.log('User said:', text);
      }}
      onResponse={(response) => {
        console.log('AI responded:', response);
      }}
    />
  );
}`
    }
  ]

  const filteredExamples = codeExamples.filter(example => {
    const matchesSearch = example.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         example.language.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         example.category.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "All" || example.category === selectedCategory
    return matchesSearch && matchesCategory
  })
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-blue-50 to-cyan-50 dark:from-slate-950 dark:via-blue-950 dark:to-violet-950 transition-all duration-500">
      {/* Enhanced Background Pattern - Responsive */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 sm:-top-40 -right-20 sm:-right-40 w-40 sm:w-80 h-40 sm:h-80 bg-gradient-to-br from-blue-400/20 to-violet-600/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute top-1/3 left-1/4 w-48 sm:w-96 h-48 sm:h-96 bg-gradient-to-br from-violet-400/15 to-pink-500/15 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute -bottom-20 sm:-bottom-40 -left-20 sm:-left-40 w-40 sm:w-80 h-40 sm:h-80 bg-gradient-to-tr from-cyan-400/20 to-blue-600/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute top-1/2 right-1/3 w-32 sm:w-64 h-32 sm:h-64 bg-gradient-to-bl from-purple-400/10 to-indigo-500/10 rounded-full blur-2xl animate-float"></div>
      </div>
      <Navbar />

      <div className="relative pt-16 sm:pt-20 lg:pt-24 pb-12 sm:pb-16 lg:pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl sm:max-w-4xl md:max-w-5xl lg:max-w-6xl xl:max-w-7xl mx-auto">
          {/* Header - Responsive */}
          <div className="text-center mb-12 sm:mb-16">
            <Badge className="mb-4 sm:mb-6 bg-gradient-to-r from-blue-100 to-violet-100 text-blue-800 border-blue-200/50 dark:from-blue-900/30 dark:to-violet-900/30 dark:text-blue-300 dark:border-blue-600/30 px-3 sm:px-4 py-2 text-sm font-medium shadow-md">
              📚 Developer Documentation
            </Badge>
            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 sm:mb-8">
              <span className="block text-slate-900 dark:text-white mb-2">Build with</span>
              <span className="block bg-gradient-to-r from-blue-600 via-violet-600 to-cyan-600 bg-clip-text text-transparent">
                SalesSpeak
              </span>
            </h1>
            
            <p className="text-base sm:text-lg lg:text-xl text-slate-600 dark:text-slate-300 max-w-2xl lg:max-w-3xl mx-auto leading-relaxed px-4">
              Comprehensive guides, API references, and code examples to help you integrate 
              SalesSpeak's AI voice technology into your applications.
            </p>
          </div>

          {/* Search and Filters - Responsive */}
          <div className="mb-8 sm:mb-12">
            <div className="flex flex-col gap-3 sm:gap-4 items-center max-w-2xl mx-auto">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 sm:h-5 w-4 sm:w-5 text-slate-400" />
                <Input
                  placeholder="Search documentation..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 sm:pl-12 glass-strong border-white/30 dark:border-slate-700/50 h-12 sm:h-14 text-sm sm:text-base rounded-xl"
                />
              </div>
            </div>
          </div>

          {/* Quick Start Guides - Responsive Grid */}
          <div className="mb-16 sm:mb-20">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-6 sm:mb-8 text-center">
              Quick Start Guides
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {quickStartGuides.map((guide, index) => (
                <Card key={index} className="glass-strong border-white/30 dark:border-slate-700/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group">
                  <CardContent className="p-4 sm:p-6">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500/20 to-violet-600/30 rounded-lg flex items-center justify-center mb-3 sm:mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      {guide.icon}
                    </div>
                    
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-2">
                      {guide.title}
                    </h3>
                    
                    <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm mb-3 sm:mb-4 leading-relaxed">
                      {guide.description}
                    </p>
                    
                    <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-3 sm:mb-4">
                      <div className="flex items-center space-x-1">
                        <Clock className="h-3 w-3" />
                        <span>{guide.time}</span>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {guide.difficulty}
                      </Badge>
                    </div>
                    
                    <Button className="w-full bg-gradient-to-r from-blue-500 to-violet-500 text-white shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105 text-sm sm:text-base">
                      Start Guide
                      <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* API Reference - Responsive */}
          <div className="mb-16 sm:mb-20">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-6 sm:mb-8">
              API Reference
            </h2>
            
            <Card className="glass-strong border-white/30 dark:border-slate-700/50 shadow-xl">
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="flex items-center text-lg sm:text-xl">
                  <Terminal className="h-4 w-4 sm:h-5 sm:w-5 mr-2 sm:mr-3" />
                  REST API Endpoints
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0">
                <div className="space-y-3 sm:space-y-4">
                  {apiEndpoints.map((endpoint, index) => (
                    <div key={index} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 glass rounded-lg border border-white/20 gap-2 sm:gap-4">
                      <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                        <Badge 
                          className={`text-xs font-mono w-fit ${
                            endpoint.method === 'GET' ? 'bg-green-100 text-green-800' :
                            endpoint.method === 'POST' ? 'bg-blue-100 text-blue-800' :
                            endpoint.method === 'PUT' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}
                        >
                          {endpoint.method}
                        </Badge>
                        <code className="text-xs sm:text-sm font-mono text-slate-700 dark:text-slate-300 break-all">
                          {endpoint.path}
                        </code>
                        <span className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm">
                          {endpoint.description}
                        </span>
                      </div>
                      <Badge variant="outline" className="text-xs w-fit">
                        {endpoint.category}
                      </Badge>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 text-center">
                  <Link href="/api">
                    <Button className="bg-gradient-to-r from-blue-500 to-violet-500 text-white shadow-lg hover:shadow-xl transition-all duration-300 text-sm sm:text-base">
                      View Full API Reference
                      <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* SDKs - Responsive Grid */}
          <div className="mb-16 sm:mb-20">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-6 sm:mb-8">
              Official SDKs
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {sdks.map((sdk, index) => (
                <Card key={index} className="glass-strong border-white/30 dark:border-slate-700/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group">
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex items-center justify-between mb-3 sm:mb-4">
                      <div className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br ${sdk.color} rounded-lg flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <span className="text-white font-bold text-xs sm:text-sm">{sdk.icon}</span>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {sdk.version}
                      </Badge>
                    </div>
                    
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-2">
                      {sdk.name}
                    </h3>
                    
                    <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm mb-3 sm:mb-4 leading-relaxed">
                      {sdk.description}
                    </p>
                    
                    <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-2 sm:p-3 mb-3 sm:mb-4 overflow-x-auto">
                      <code className="text-xs font-mono text-slate-700 dark:text-slate-300 whitespace-nowrap">
                        {sdk.installCommand}
                      </code>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Button size="sm" className="flex-1 bg-gradient-to-r from-blue-500 to-violet-500 text-white text-xs sm:text-sm">
                        <Download className="h-3 w-3 mr-1 sm:mr-2" />
                        Install
                      </Button>
                      <Button variant="outline" size="sm" className="glass border-white/30">
                        <Book className="h-3 w-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Code Examples - Responsive */}
          <div className="mb-16 sm:mb-20">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8 gap-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                Code Examples
              </h2>
              <div className="flex flex-wrap gap-2">
                {categories.slice(0, 4).map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className={`text-xs ${
                      selectedCategory === category 
                        ? "bg-gradient-to-r from-blue-500 to-violet-500 text-white" 
                        : "glass border-white/30 text-slate-600 hover:bg-white/20"
                    }`}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
            
            <div className="space-y-4 sm:space-y-6">
              {filteredExamples.map((example, index) => (
                <Card key={index} className="glass-strong border-white/30 dark:border-slate-700/50 shadow-xl">
                  <CardHeader className="p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                      <CardTitle className="flex items-center text-base sm:text-lg">
                        <Code2 className="h-4 w-4 sm:h-5 sm:w-5 mr-2 sm:mr-3" />
                        {example.title}
                      </CardTitle>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="text-xs">
                          {example.category}
                        </Badge>
                        <Badge className="text-xs bg-gradient-to-r from-purple-100 to-blue-100 text-purple-800">
                          {example.language}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6 pt-0">
                    <div className="bg-slate-900 rounded-lg p-3 sm:p-4 overflow-x-auto">
                      <pre className="text-xs sm:text-sm text-slate-300">
                        <code>{example.code}</code>
                      </pre>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-4 gap-3">
                      <div className="flex items-center space-x-2 sm:space-x-3">
                        <Button variant="outline" size="sm" className="glass border-white/30 text-xs sm:text-sm">
                          <PlayCircle className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                          Try it
                        </Button>
                        <Button variant="outline" size="sm" className="glass border-white/30 text-xs sm:text-sm">
                          <Download className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                          Copy
                        </Button>
                      </div>
                      <div className="flex items-center text-xs text-slate-500 dark:text-slate-400">
                        <CheckCircle className="h-3 w-3 mr-1 text-green-500" />
                        <span>Tested & verified</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Resources - Responsive */}
          <div className="text-center">
            <Card className="glass-strong border-white/30 dark:border-slate-700/50 shadow-2xl">
              <CardContent className="p-6 sm:p-8 lg:p-12">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 to-violet-600 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  <Book className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-3 sm:mb-4">
                  Need More Help?
                </h2>
                <p className="text-base sm:text-lg lg:text-xl text-slate-600 dark:text-slate-300 mb-6 sm:mb-8 max-w-xl lg:max-w-2xl mx-auto px-4">
                  Explore our comprehensive resources or get in touch with our developer community 
                  for personalized support.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
                  <div className="text-center">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-green-500/20 to-emerald-600/30 rounded-lg flex items-center justify-center mx-auto mb-2 sm:mb-3">
                      <MessageSquare className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
                    </div>
                    <h4 className="font-semibold text-slate-900 dark:text-white mb-1 text-sm sm:text-base">Community</h4>
                    <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm">Join our Discord server</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500/20 to-cyan-600/30 rounded-lg flex items-center justify-center mx-auto mb-2 sm:mb-3">
                      <GitBranch className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
                    </div>
                    <h4 className="font-semibold text-slate-900 dark:text-white mb-1 text-sm sm:text-base">GitHub</h4>
                    <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm">View open source examples</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-500/20 to-violet-600/30 rounded-lg flex items-center justify-center mx-auto mb-2 sm:mb-3">
                      <FileText className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600" />
                    </div>
                    <h4 className="font-semibold text-slate-900 dark:text-white mb-1 text-sm sm:text-base">Tutorials</h4>
                    <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm">Step-by-step guides</p>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                  <Link href="/help">
                    <Button size="lg" className="bg-gradient-to-r from-blue-500 via-violet-500 to-purple-500 hover:from-blue-600 hover:via-violet-600 hover:to-purple-600 text-sm sm:text-lg px-6 sm:px-8 py-2 sm:py-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 w-full sm:w-auto">
                      Visit Help Center
                    </Button>
                  </Link>
                  <Link href="/contact">
                    <Button size="lg" variant="outline" className="border-2 border-slate-300 text-slate-700 hover:bg-white/20 backdrop-blur-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-sm sm:text-base w-full sm:w-auto">
                      Contact Support
                    </Button>
                  </Link>
                </div>
                
                <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-slate-200 dark:border-slate-700">
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 px-4">
                    Developer Support | API Documentation | Community Forum | developer@salesspeak.ai
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  )
}
