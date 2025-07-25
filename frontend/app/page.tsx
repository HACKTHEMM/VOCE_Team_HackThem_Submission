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

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F3F1E9] via-[#ECE8D9] to-[#F3F1E9] dark:from-[#1E1E1E] dark:via-[#2A2A2A] dark:to-[#1E1E1E] transition-all duration-700">
      {/* Classic Background Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 sm:-top-48 sm:-right-48 w-48 h-48 sm:w-96 sm:h-96 gradient-classic-mesh rounded-full blur-3xl opacity-20 sm:opacity-30 animate-float"></div>
        <div className="absolute -bottom-24 -left-24 sm:-bottom-48 sm:-left-48 w-48 h-48 sm:w-96 sm:h-96 bg-gradient-to-tr from-[#BBA588]/20 via-[#8E735B]/20 to-[#7C6D64]/20 rounded-full blur-3xl opacity-20 sm:opacity-30 animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-36 h-36 sm:w-72 sm:h-72 bg-gradient-to-r from-[#BBA588]/10 to-[#8E735B]/10 rounded-full blur-2xl animate-pulse-slow"></div>
      </div>      {/* Navigation */}
      <Navbar showBackButton={false} variant="default" />{/* Enhanced Hero Section */}
      <section className="relative py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <Badge className="mb-6 sm:mb-8 bg-gradient-to-r from-[#F3F1E9] via-[#ECE8D9] to-[#F3F1E9] text-[#8E735B] border-[#BBA588]/60 dark:from-[#1E1E1E]/80 dark:via-[#2A2A2A]/80 dark:to-[#1E1E1E]/80 dark:text-[#BBA588] dark:border-[#BBA588]/20 px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-semibold shadow-lg shadow-[#BBA588]/10 rounded-full animate-fade-in">
              ✨ Timeless AI Voice Assistant
            </Badge>

            <div className="mb-8 sm:mb-12 animate-slide-up">
              <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif-display font-semibold mb-4 sm:mb-6 leading-tight">
                <span className="block text-[#2D2C2A] dark:text-[#ECE8D9] mb-2 sm:mb-4 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                  Welcome to
                </span>
                <span className="block bg-gradient-to-r from-[#8E735B] via-[#BBA588] to-[#7C6D64] bg-clip-text text-transparent animate-gradient animate-fade-in" style={{ animationDelay: '0.4s' }}>
                  Voce
                </span>
              </h1>

              <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-[#5A5A5A] dark:text-[#B6B6B6] mb-12 sm:mb-16 max-w-5xl mx-auto leading-relaxed font-serif animate-fade-in px-4" style={{ animationDelay: '0.6s' }}>
                Your Voice-Powered AI Assistant that <span className="font-semibold text-[#8E735B] dark:text-[#BBA588]">understands</span>,
                <span className="font-semibold text-[#7C6D64] dark:text-[#BBA588]"> learns</span>, and
                <span className="font-semibold text-[#BBA588] dark:text-[#8E735B]"> sells</span> like a human.
                <br className="hidden sm:block" />
                <span className="text-base sm:text-lg md:text-xl text-[#5A5A5A] dark:text-[#B6B6B6] mt-2 block">
                  Experience sophisticated conversations with timeless elegance.
                </span>
              </p>
            </div>          {/* Classic Voice Demo */}
            <div className="flex flex-col items-center space-y-6 sm:space-y-8 mb-16 sm:mb-20 animate-scale-in" style={{ animationDelay: '0.8s' }}>
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-[#BBA588]/30 via-[#8E735B]/30 to-[#7C6D64]/30 rounded-full blur-3xl animate-pulse-slow group-hover:blur-2xl transition-all duration-500"></div>
                <div className="relative bg-white/40 dark:bg-black/40 backdrop-blur-xl border border-white/30 dark:border-[#BBA588]/20 rounded-3xl p-6 sm:p-8 shadow-2xl card-classic">
                  <VoiceRecognition
                    isListening={isListening}
                    onListeningChange={setIsListening}
                    onResult={handleDemoTranscript}
                    size="lg"
                  />
                </div>
              </div>

              {demoTranscript && (
                <div className="mt-6 sm:mt-8 p-4 sm:p-6 glass-classic rounded-3xl border border-[#BBA588]/40 dark:border-[#BBA588]/20 shadow-2xl animate-in slide-in-from-bottom-4 duration-500 max-w-2xl mx-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-2 h-2 bg-[#8E735B] rounded-full animate-pulse"></div>
                    <span className="text-sm font-semibold text-[#5A5A5A] dark:text-[#B6B6B6] uppercase tracking-wide">You said</span>
                  </div>
                  <p className="text-[#2D2C2A] dark:text-[#ECE8D9] font-medium text-base sm:text-lg font-serif">"{demoTranscript}"</p>
                </div>
              )}

              <div className="text-center space-y-4 px-4">
                <p className="text-[#5A5A5A] dark:text-[#B6B6B6] text-base sm:text-lg max-w-2xl leading-relaxed font-serif">
                  Try saying something in your preferred language:
                </p>
                <div className="flex flex-wrap justify-center gap-2 sm:gap-4 text-sm">
                  <span className="bg-[#F3F1E9] dark:bg-[#1E1E1E] text-[#8E735B] dark:text-[#BBA588] px-3 sm:px-4 py-2 rounded-full font-medium border border-[#BBA588]/50 dark:border-[#BBA588]/20">
                    "मुझे एक नया स्मार्टफोन चाहिए"
                  </span>
                  <span className="bg-[#F3F1E9] dark:bg-[#1E1E1E] text-[#7C6D64] dark:text-[#BBA588] px-3 sm:px-4 py-2 rounded-full font-medium border border-[#7C6D64]/50 dark:border-[#BBA588]/20">
                    "I need a laptop"
                  </span>
                  <span className="bg-[#F3F1E9] dark:bg-[#1E1E1E] text-[#BBA588] dark:text-[#8E735B] px-3 sm:px-4 py-2 rounded-full font-medium border border-[#BBA588]/50 dark:border-[#BBA588]/20">
                    "కొత్త కారు కావాలి"
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mt-8 sm:mt-12 px-4 w-full max-w-lg">
                <Link href="/chat" className="flex-1">
                  <Button size="lg" className="w-full btn-classic text-lg sm:text-xl px-8 sm:px-12 py-4 sm:py-6 shadow-2xl hover:shadow-3xl shadow-[#BBA588]/25 hover:shadow-[#BBA588]/40 transition-all duration-300 transform hover:scale-105 rounded-2xl font-semibold font-serif-display">
                    Start Conversation
                    <ArrowRight className="ml-2 sm:ml-3 h-5 w-5 sm:h-6 sm:w-6" />
                  </Button>
                </Link>
                <Link href="/features" className="flex-1">
                  <Button size="lg" variant="outline" className="w-full btn-classic-outline text-lg sm:text-xl px-8 sm:px-12 py-4 sm:py-6 rounded-2xl transition-all duration-300 hover:shadow-xl backdrop-blur-sm font-semibold font-serif-display">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>      {/* Enhanced Features Grid */}
      <section className="relative py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#F3F1E9]/30 to-transparent dark:via-[#1E1E1E]/30"></div>
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center mb-16 sm:mb-24">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#2D2C2A] dark:text-[#ECE8D9] mb-6 sm:mb-8 font-serif-display">
              Powerful Features for
              <span className="block bg-gradient-to-r from-[#8E735B] via-[#BBA588] to-[#7C6D64] bg-clip-text text-transparent animate-gradient">
                Modern Sales
              </span>
            </h2>
            <p className="text-[#5A5A5A] dark:text-[#B6B6B6] text-lg sm:text-xl lg:text-2xl max-w-4xl mx-auto leading-relaxed px-4 font-serif">
              Built with cutting-edge AI technology to deliver exceptional customer experiences
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="group glass-classic-strong border-[#BBA588]/40 dark:border-[#BBA588]/40 hover:border-[#8E735B]/60 dark:hover:border-[#BBA588]/60 transition-all duration-500 shadow-xl hover:shadow-2xl transform hover:scale-105 hover:-translate-y-2 rounded-3xl overflow-hidden"
              >
                <CardContent className="p-6 sm:p-8 lg:p-10">
                  <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-6 mb-6 sm:mb-8">
                    <div className="p-3 sm:p-4 bg-gradient-to-br from-[#BBA588]/10 via-[#8E735B]/10 to-[#7C6D64]/10 rounded-2xl text-[#8E735B] dark:text-[#BBA588] group-hover:from-[#BBA588]/20 group-hover:via-[#8E735B]/20 group-hover:to-[#7C6D64]/20 transition-all duration-300 shadow-lg flex-shrink-0">
                      {feature.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl sm:text-2xl font-bold text-[#2D2C2A] dark:text-[#ECE8D9] group-hover:text-[#8E735B] dark:group-hover:text-[#BBA588] transition-colors duration-300 mb-3 font-serif-display">
                        {feature.title}
                      </h3>
                      <p className="text-[#5A5A5A] dark:text-[#B6B6B6] leading-relaxed text-base sm:text-lg font-serif">
                        {feature.description}
                      </p>
                    </div>
                  </div>

                  {/* Feature highlight bar */}
                  <div className="h-1 bg-gradient-to-r from-[#BBA588] via-[#8E735B] to-[#7C6D64] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>      {/* Enhanced CTA Section */}
      <section className="relative py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 gradient-classic-aurora opacity-5"></div>
        <div className="absolute top-0 left-1/4 w-48 h-48 sm:w-96 sm:h-96 bg-gradient-to-br from-[#BBA588]/15 via-[#8E735B]/15 to-[#7C6D64]/15 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-0 right-1/4 w-48 h-48 sm:w-96 sm:h-96 bg-gradient-to-tl from-[#7C6D64]/15 via-[#8E735B]/15 to-[#BBA588]/15 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }}></div>

        <div className="relative max-w-6xl mx-auto text-center">
          <div className="mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-[#2D2C2A] dark:text-[#ECE8D9] mb-6 sm:mb-8 leading-tight px-4 font-serif-display">
              Ready to Transform Your
              <span className="block bg-gradient-to-r from-[#8E735B] via-[#BBA588] to-[#7C6D64] bg-clip-text text-transparent animate-gradient">
                Sales Process?
              </span>
            </h2>
            <p className="text-[#5A5A5A] dark:text-[#B6B6B6] text-lg sm:text-xl lg:text-2xl mb-12 sm:mb-16 max-w-4xl mx-auto leading-relaxed px-4 font-serif">
              Join thousands of businesses already using Voce to boost their sales performance and create meaningful customer connections.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 justify-center items-center px-4">
            <Link href="/chat" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto btn-classic text-lg sm:text-xl lg:text-2xl px-12 sm:px-16 py-6 sm:py-8 shadow-2xl hover:shadow-3xl shadow-[#BBA588]/30 hover:shadow-[#BBA588]/50 transition-all duration-300 transform hover:scale-105 rounded-2xl font-bold font-serif">
                Start Free Trial
                <ArrowRight className="ml-2 sm:ml-3 h-5 w-5 sm:h-6 sm:w-6" />
              </Button>
            </Link>
            <Link href="/contact" className="w-full sm:w-auto">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto btn-classic-outline text-lg sm:text-xl lg:text-2xl px-12 sm:px-16 py-6 sm:py-8 rounded-2xl transition-all duration-300 hover:shadow-xl backdrop-blur-sm font-bold font-serif"
              >
                Contact Sales
              </Button>
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="mt-12 sm:mt-20 pt-8 sm:pt-12 border-t border-[#BBA588]/20 dark:border-[#BBA588]/10">
            <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-8 text-[#7C6D64] dark:text-[#B6B6B6] text-sm sm:text-base">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-[#BBA588] rounded-full animate-pulse"></div>
                <span className="font-medium font-serif">99.9% Uptime</span>
              </div>
              <div className="hidden sm:block w-1 h-6 bg-[#BBA588]/30 dark:bg-[#BBA588]/20 rounded-full"></div>
              <span className="font-medium font-serif">10+ Languages Supported</span>
              <div className="hidden sm:block w-1 h-6 bg-[#BBA588]/30 dark:bg-[#BBA588]/20 rounded-full"></div>
              <span className="font-medium font-serif">ISO 27001 Certified</span>
              <div className="hidden lg:block w-1 h-6 bg-[#BBA588]/30 dark:bg-[#BBA588]/20 rounded-full"></div>
              <span className="font-medium font-serif">Enterprise Ready</span>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
