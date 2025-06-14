"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Mic, MessageSquare, Globe, Zap, Shield, ArrowRight } from "lucide-react"
import Link from "next/link"
import { VoiceRecognition } from "@/components/voice-recognition"
import { Footer } from "@/components/footer"
import { Navbar } from "@/components/navbar"

export default function LandingPage() {
  const [isListening, setIsListening] = useState(false)
  const [demoTranscript, setDemoTranscript] = useState("")

  const handleDemoTranscript = (transcript: string) => {
    setDemoTranscript(transcript)
    setIsListening(false)

    // Show a demo response
    setTimeout(() => {
      setDemoTranscript("")
    }, 3000)
  }

  const features = [
    {
      icon: <Mic className="h-6 w-6" />,
      title: "Voice-First Interface",
      description: "Natural voice interactions with real-time speech recognition and synthesis",
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: "Multilingual Support",
      description: "Supports all major Indian languages plus English with seamless switching",
    },
    {
      icon: <MessageSquare className="h-6 w-6" />,
      title: "Contextual Conversations",
      description: "Handles complex, ambiguous queries with empathetic responses",
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Agentic Framework",
      description: "Complex task execution with autonomous decision-making capabilities",
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Enterprise Ready",
      description: "Scalable, secure, and accessible for real-world deployment",
    },
  ]

  return (    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/50 to-violet-50/50 dark:from-slate-950 dark:via-blue-950/50 dark:to-violet-950/50 transition-all duration-700">      {/* Enhanced Background Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 sm:-top-48 sm:-right-48 w-48 h-48 sm:w-96 sm:h-96 gradient-mesh rounded-full blur-3xl opacity-20 sm:opacity-30 animate-float"></div>
        <div className="absolute -bottom-24 -left-24 sm:-bottom-48 sm:-left-48 w-48 h-48 sm:w-96 sm:h-96 bg-gradient-to-tr from-cyan-400/20 via-blue-500/20 to-violet-600/20 rounded-full blur-3xl opacity-20 sm:opacity-30 animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-36 h-36 sm:w-72 sm:h-72 bg-gradient-to-r from-blue-400/10 to-violet-600/10 rounded-full blur-2xl animate-pulse-slow"></div>
      </div>      {/* Navigation */}
      <Navbar showBackButton={false} variant="default" />{/* Enhanced Hero Section */}
      <section className="relative py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <Badge className="mb-6 sm:mb-8 bg-gradient-to-r from-blue-50 via-violet-50 to-cyan-50 text-blue-700 border-blue-200/60 dark:from-blue-900/20 dark:via-violet-900/20 dark:to-cyan-900/20 dark:text-blue-300 dark:border-blue-600/20 px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-semibold shadow-lg shadow-blue-500/10 rounded-full animate-fade-in">
              ✨ Next-Generation AI Sales Assistant
            </Badge>
            
            <div className="mb-8 sm:mb-12 animate-slide-up">
              <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-4 sm:mb-6 leading-tight">
                <span className="block text-slate-900 dark:text-white mb-2 sm:mb-4 animate-fade-in" style={{animationDelay: '0.2s'}}>
                  Welcome to
                </span>
                <span className="block bg-gradient-to-r from-blue-600 via-violet-600 via-cyan-600 to-blue-700 bg-clip-text text-transparent animate-gradient animate-fade-in" style={{animationDelay: '0.4s'}}>
                  SalesSpeak
                </span>
              </h1>
              
              <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-slate-600 dark:text-slate-300 mb-12 sm:mb-16 max-w-5xl mx-auto leading-relaxed font-light animate-fade-in px-4" style={{animationDelay: '0.6s'}}>
                Your Voice-Powered AI Assistant that <span className="font-semibold text-blue-600 dark:text-blue-400">understands</span>, 
                <span className="font-semibold text-violet-600 dark:text-violet-400"> learns</span>, and 
                <span className="font-semibold text-cyan-600 dark:text-cyan-400"> sells</span> like a human.
                <br className="hidden sm:block" />
                <span className="text-base sm:text-lg md:text-xl text-slate-500 dark:text-slate-400 mt-2 block">
                  Experience natural conversations in multiple Indian languages.
                </span>
              </p>
            </div>            {/* Enhanced Voice Demo */}
            <div className="flex flex-col items-center space-y-6 sm:space-y-8 mb-16 sm:mb-20 animate-scale-in" style={{animationDelay: '0.8s'}}>
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/30 via-violet-400/30 to-cyan-400/30 rounded-full blur-3xl animate-pulse-slow group-hover:blur-2xl transition-all duration-500"></div>
                <div className="relative bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl border border-white/30 dark:border-slate-700/30 rounded-3xl p-6 sm:p-8 shadow-2xl">
                  <VoiceRecognition
                    isListening={isListening}
                    onListeningChange={setIsListening}
                    onResult={handleDemoTranscript}
                    size="lg"
                  />
                </div>
              </div>
              
              {demoTranscript && (
                <div className="mt-6 sm:mt-8 p-4 sm:p-6 glass-strong rounded-3xl border border-white/40 dark:border-slate-700/40 shadow-2xl animate-in slide-in-from-bottom-4 duration-500 max-w-2xl mx-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide">You said</span>
                  </div>
                  <p className="text-slate-800 dark:text-slate-200 font-medium text-base sm:text-lg">"{demoTranscript}"</p>
                </div>
              )}
              
              <div className="text-center space-y-4 px-4">
                <p className="text-slate-500 dark:text-slate-400 text-base sm:text-lg max-w-2xl leading-relaxed">
                  Try saying something in your preferred language:
                </p>
                <div className="flex flex-wrap justify-center gap-2 sm:gap-4 text-sm">
                  <span className="bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 px-3 sm:px-4 py-2 rounded-full font-medium border border-blue-200/50 dark:border-blue-600/20">
                    "मुझे एक नया स्मार्टफोन चाहिए"
                  </span>
                  <span className="bg-violet-50 dark:bg-violet-900/20 text-violet-700 dark:text-violet-300 px-3 sm:px-4 py-2 rounded-full font-medium border border-violet-200/50 dark:border-violet-600/20">
                    "I need a laptop"
                  </span>
                  <span className="bg-cyan-50 dark:bg-cyan-900/20 text-cyan-700 dark:text-cyan-300 px-3 sm:px-4 py-2 rounded-full font-medium border border-cyan-200/50 dark:border-cyan-600/20">
                    "కొత్త కారు కావాలి"
                  </span>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mt-8 sm:mt-12 px-4 w-full max-w-lg">
                <Link href="/chat" className="flex-1">
                  <Button size="lg" className="w-full bg-gradient-to-r from-blue-600 via-violet-600 to-blue-700 hover:from-blue-700 hover:via-violet-700 hover:to-blue-800 text-white text-lg sm:text-xl px-8 sm:px-12 py-4 sm:py-6 shadow-2xl hover:shadow-3xl shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300 transform hover:scale-105 rounded-2xl font-semibold">
                    Start Conversation 
                    <ArrowRight className="ml-2 sm:ml-3 h-5 w-5 sm:h-6 sm:w-6" />
                  </Button>
                </Link>
                <Link href="/features" className="flex-1">
                  <Button size="lg" variant="outline" className="w-full border-2 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-white/60 dark:hover:bg-slate-800/60 text-lg sm:text-xl px-8 sm:px-12 py-4 sm:py-6 rounded-2xl transition-all duration-300 hover:shadow-xl backdrop-blur-sm font-semibold">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>      {/* Enhanced Features Grid */}
      <section className="relative py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-50/30 to-transparent dark:via-slate-900/30"></div>
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center mb-16 sm:mb-24">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-6 sm:mb-8">
              Powerful Features for 
              <span className="block bg-gradient-to-r from-blue-600 via-violet-600 to-cyan-600 bg-clip-text text-transparent animate-gradient">
                Modern Sales
              </span>
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-lg sm:text-xl lg:text-2xl max-w-4xl mx-auto leading-relaxed px-4">
              Built with cutting-edge AI technology to deliver exceptional customer experiences
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="group glass-strong border-white/40 dark:border-slate-700/40 hover:border-blue-300/60 dark:hover:border-blue-600/60 transition-all duration-500 shadow-xl hover:shadow-2xl transform hover:scale-105 hover:-translate-y-2 rounded-3xl overflow-hidden"
              >
                <CardContent className="p-6 sm:p-8 lg:p-10">
                  <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-6 mb-6 sm:mb-8">
                    <div className="p-3 sm:p-4 bg-gradient-to-br from-blue-500/10 via-violet-500/10 to-cyan-500/10 rounded-2xl text-blue-600 dark:text-blue-400 group-hover:from-blue-500/20 group-hover:via-violet-500/20 group-hover:to-cyan-500/20 transition-all duration-300 shadow-lg flex-shrink-0">
                      {feature.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 mb-3">
                        {feature.title}
                      </h3>
                      <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-base sm:text-lg">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                  
                  {/* Feature highlight bar */}
                  <div className="h-1 bg-gradient-to-r from-blue-500 via-violet-500 to-cyan-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>      {/* Enhanced CTA Section */}
      <section className="relative py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 gradient-aurora opacity-5"></div>
        <div className="absolute top-0 left-1/4 w-48 h-48 sm:w-96 sm:h-96 bg-gradient-to-br from-blue-400/15 via-violet-600/15 to-cyan-400/15 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-0 right-1/4 w-48 h-48 sm:w-96 sm:h-96 bg-gradient-to-tl from-cyan-400/15 via-blue-600/15 to-violet-400/15 rounded-full blur-3xl animate-float" style={{animationDelay: '3s'}}></div>
        
        <div className="relative max-w-6xl mx-auto text-center">
          <div className="mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-slate-900 dark:text-white mb-6 sm:mb-8 leading-tight px-4">
              Ready to Transform Your 
              <span className="block bg-gradient-to-r from-blue-600 via-violet-600 to-cyan-600 bg-clip-text text-transparent animate-gradient">
                Sales Process?
              </span>
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-lg sm:text-xl lg:text-2xl mb-12 sm:mb-16 max-w-4xl mx-auto leading-relaxed px-4">
              Join thousands of businesses already using SalesSpeak to boost their sales performance and create meaningful customer connections.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 justify-center items-center px-4">
            <Link href="/chat" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-blue-600 via-violet-600 to-blue-700 hover:from-blue-700 hover:via-violet-700 hover:to-blue-800 text-white text-lg sm:text-xl lg:text-2xl px-12 sm:px-16 py-6 sm:py-8 shadow-2xl hover:shadow-3xl shadow-blue-500/30 hover:shadow-blue-500/50 transition-all duration-300 transform hover:scale-105 rounded-2xl font-bold">
                Start Free Trial
                <ArrowRight className="ml-2 sm:ml-3 h-5 w-5 sm:h-6 sm:w-6" />
              </Button>
            </Link>
            <Link href="/contact" className="w-full sm:w-auto">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-2 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-white/60 dark:hover:bg-slate-800/60 text-lg sm:text-xl lg:text-2xl px-12 sm:px-16 py-6 sm:py-8 rounded-2xl transition-all duration-300 hover:shadow-xl backdrop-blur-sm font-bold"
              >
                Contact Sales
              </Button>
            </Link>
          </div>
          
          {/* Trust indicators */}
          <div className="mt-12 sm:mt-20 pt-8 sm:pt-12 border-t border-slate-200/50 dark:border-slate-700/50">
            <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-8 text-slate-500 dark:text-slate-400 text-sm sm:text-base">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="font-medium">99.9% Uptime</span>
              </div>
              <div className="hidden sm:block w-1 h-6 bg-slate-300 dark:bg-slate-600 rounded-full"></div>
              <span className="font-medium">10+ Languages Supported</span>
              <div className="hidden sm:block w-1 h-6 bg-slate-300 dark:bg-slate-600 rounded-full"></div>
              <span className="font-medium">ISO 27001 Certified</span>
              <div className="hidden lg:block w-1 h-6 bg-slate-300 dark:bg-slate-600 rounded-full"></div>
              <span className="font-medium">Enterprise Ready</span>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  )
}
