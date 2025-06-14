import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Target, Users, Lightbulb, Globe, Heart, Mic } from "lucide-react"
import Image from "next/image"
import { Footer } from "@/components/footer"
import { Navbar } from "@/components/navbar"

export default function AboutPage() {
  const team = [
    {
      name: "Rajesh Kumar",
      role: "CEO & Co-founder",
      bio: "Former AI researcher at IIT Delhi with 15+ years in voice technology",
      image: "/placeholder-user.jpg"
    },
    {
      name: "Priya Sharma",
      role: "CTO & Co-founder", 
      bio: "Ex-Google engineer specializing in multilingual NLP and speech recognition",
      image: "/placeholder-user.jpg"
    },
    {
      name: "Arjun Patel",
      role: "Head of Product",
      bio: "Product leader with expertise in conversational AI and user experience",
      image: "/placeholder-user.jpg"
    },
    {
      name: "Sneha Reddy",
      role: "Head of AI Research",
      bio: "PhD in Machine Learning with focus on Indian language processing",
      image: "/placeholder-user.jpg"
    }
  ]

  const values = [
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Empathy First",
      description: "We believe technology should understand and respond to human emotions, creating meaningful connections."
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "Cultural Inclusivity",
      description: "Every language and dialect matters. We're building AI that celebrates India's linguistic diversity."
    },
    {
      icon: <Lightbulb className="h-8 w-8" />,
      title: "Innovation",
      description: "Constantly pushing the boundaries of what's possible with voice AI and conversational technology."
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Community",
      description: "Building technology that brings people together and empowers businesses to serve better."
    }
  ]

  const milestones = [
    {
      year: "2023",
      title: "Company Founded",
      description: "Started with a vision to democratize AI voice technology for Indian businesses"
    },
    {
      year: "2024",
      title: "First Product Launch",
      description: "Launched SalesSpeak with support for 5 Indian languages"
    },
    {
      year: "2024",
      title: "1000+ Customers",
      description: "Reached our first major milestone serving businesses across India"
    },
    {
      year: "2025",
      title: "Global Expansion",
      description: "Expanding to serve Indian diaspora businesses worldwide"
    }
  ]  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/50 to-violet-50/50 dark:from-slate-950 dark:via-blue-950/50 dark:to-violet-950/50 transition-all duration-700">
      {/* Enhanced Background Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-48 -right-48 w-96 h-96 gradient-mesh rounded-full blur-3xl opacity-30 animate-float"></div>
        <div className="absolute -bottom-48 -left-48 w-96 h-96 bg-gradient-to-tr from-cyan-400/20 via-blue-500/20 to-violet-600/20 rounded-full blur-3xl opacity-30 animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-r from-blue-400/10 to-violet-600/10 rounded-full blur-2xl animate-pulse-slow"></div>      </div>

      <Navbar />

      <div className="relative z-10">        {/* Hero Section */}
        <div className="pt-16 sm:pt-24 md:pt-32 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <Badge className="mb-6 sm:mb-8 bg-gradient-to-r from-blue-50 via-violet-50 to-cyan-50 text-blue-700 border-blue-200/60 dark:from-blue-900/20 dark:via-violet-900/20 dark:to-cyan-900/20 dark:text-blue-300 dark:border-blue-600/20 px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-semibold shadow-lg shadow-blue-500/10 rounded-full animate-fade-in">
              🚀 Our Story
            </Badge>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-8 sm:mb-10 md:mb-12 leading-tight">
              <span className="block text-slate-900 dark:text-white mb-2 sm:mb-3 md:mb-4 animate-fade-in" style={{animationDelay: '0.2s'}}>About</span>
              <span className="block bg-gradient-to-r from-blue-600 via-violet-600 via-cyan-600 to-blue-700 bg-clip-text text-transparent animate-gradient animate-fade-in" style={{animationDelay: '0.4s'}}>
                SalesSpeak
              </span>
            </h1>
            
            <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg md:text-xl lg:text-2xl max-w-5xl mx-auto leading-relaxed font-light animate-fade-in px-4 sm:px-0" style={{animationDelay: '0.6s'}}>
              We're revolutionizing business communication with AI-powered voice technology that understands India's rich linguistic landscape.
            </p>
          </div>
        </div>        {/* Mission Section */}
        <div className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16 lg:gap-20 items-center">
              <div className="animate-slide-up order-2 lg:order-1">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-6 sm:mb-8 md:mb-10">
                  Our Mission
                </h2>
                <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg md:text-xl leading-relaxed mb-6 sm:mb-8 md:mb-10">
                  We believe that every customer deserves to be heard and understood in their native language. Our AI-powered voice technology breaks down language barriers, enabling businesses to connect with customers on a deeper, more personal level.
                </p>
                <Card className="glass-subtle border-white/40 dark:border-slate-700/40 hover:border-blue-300/60 dark:hover:border-blue-600/60 transition-all duration-500 shadow-xl hover:shadow-2xl transform hover:scale-105 rounded-2xl sm:rounded-3xl">
                  <CardContent className="p-4 sm:p-6 md:p-8">
                    <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-4 md:space-x-6">
                      <div className="flex-shrink-0 mx-auto sm:mx-0">
                        <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-blue-500/20 to-violet-500/20 backdrop-blur-sm rounded-xl sm:rounded-2xl flex items-center justify-center text-blue-600 dark:text-blue-400 shadow-lg shadow-blue-500/10">
                          <Target className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8" />
                        </div>
                      </div>
                      <div className="text-center sm:text-left">
                        <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-slate-900 dark:text-white mb-2 sm:mb-3">
                          Democratizing AI Voice Technology
                        </h3>
                        <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base md:text-lg leading-relaxed">
                          Making advanced conversational AI accessible to businesses of all sizes across India.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="relative animate-scale-in order-1 lg:order-2" style={{animationDelay: '0.2s'}}>
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 via-violet-400/20 to-cyan-400/20 rounded-2xl sm:rounded-3xl blur-2xl"></div>
                <Card className="relative glass-strong border-white/40 dark:border-slate-700/40 rounded-2xl sm:rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-105">
                  <CardContent className="p-4 sm:p-6 md:p-8">
                    <div className="aspect-video bg-gradient-to-br from-blue-50 to-violet-100 dark:from-blue-900/20 dark:to-violet-900/20 rounded-xl sm:rounded-2xl flex items-center justify-center">
                      <div className="text-center">
                        <Mic className="h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 text-blue-600 dark:text-blue-400 mx-auto mb-3 sm:mb-4" />
                        <p className="text-slate-600 dark:text-slate-300 font-medium text-sm sm:text-base">AI Voice Technology</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>        {/* Values Section */}
        <div className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12 sm:mb-16 md:mb-20">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 via-violet-600 to-cyan-600 bg-clip-text text-transparent mb-4 sm:mb-6 md:mb-8">
                Our Values
              </h2>
              <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed px-4 sm:px-0">
                The principles that guide everything we do and shape our vision for the future of AI communication.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
              {values.map((value, index) => (
                <Card
                  key={index}
                  className="group glass-strong border-white/40 dark:border-slate-700/40 hover:border-blue-300/60 dark:hover:border-blue-600/60 transition-all duration-500 shadow-xl hover:shadow-2xl transform hover:scale-105 hover:-translate-y-2 rounded-2xl sm:rounded-3xl animate-fade-in"
                  style={{animationDelay: `${index * 0.1}s`}}
                >
                  <CardContent className="p-4 sm:p-6 md:p-8 text-center">
                    <div className="p-3 sm:p-4 bg-gradient-to-br from-blue-500/20 to-violet-500/20 backdrop-blur-sm rounded-xl sm:rounded-2xl text-blue-600 dark:text-blue-400 mb-4 sm:mb-6 inline-block group-hover:scale-110 transition-all duration-300 shadow-lg shadow-blue-500/10">
                      {value.icon}
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-slate-800 dark:text-slate-200 mb-3 sm:mb-4 group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors duration-300">
                      {value.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm sm:text-base">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>        {/* Team Section */}
        <div className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12 sm:mb-16 md:mb-20">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 via-violet-600 to-cyan-600 bg-clip-text text-transparent mb-4 sm:mb-6 md:mb-8">
                Meet Our Team
              </h2>
              <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed px-4 sm:px-0">
                Passionate experts dedicated to revolutionizing business communication through AI innovation.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
              {team.map((member, index) => (
                <Card
                  key={index}
                  className="group glass-strong border-white/40 dark:border-slate-700/40 hover:border-blue-300/60 dark:hover:border-blue-600/60 transition-all duration-500 shadow-xl hover:shadow-2xl transform hover:scale-105 hover:-translate-y-2 rounded-2xl sm:rounded-3xl animate-fade-in"
                  style={{animationDelay: `${index * 0.1}s`}}
                >
                  <CardContent className="p-4 sm:p-6 md:p-8 text-center">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-gradient-to-br from-blue-500/20 to-violet-500/20 backdrop-blur-sm rounded-full mx-auto mb-4 sm:mb-6 flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-lg shadow-blue-500/10">
                      <Users className="h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-slate-800 dark:text-slate-200 mb-1 sm:mb-2 group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors duration-300">
                      {member.name}
                    </h3>
                    <p className="text-blue-600 dark:text-blue-400 font-semibold mb-3 sm:mb-4 text-sm sm:text-base">{member.role}</p>
                    <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">{member.bio}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>        {/* Milestones Section */}
        <div className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12 sm:mb-16 md:mb-20">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 via-violet-600 to-cyan-600 bg-clip-text text-transparent mb-4 sm:mb-6 md:mb-8">
                Our Journey
              </h2>
              <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed px-4 sm:px-0">
                Key milestones in our mission to transform business communication.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
              {milestones.map((milestone, index) => (
                <Card
                  key={index}
                  className="group glass-strong border-white/40 dark:border-slate-700/40 hover:border-blue-300/60 dark:hover:border-blue-600/60 transition-all duration-500 shadow-xl hover:shadow-2xl transform hover:scale-105 hover:-translate-y-2 rounded-2xl sm:rounded-3xl animate-fade-in"
                  style={{animationDelay: `${index * 0.1}s`}}
                >
                  <CardContent className="p-4 sm:p-6 md:p-8 text-center">
                    <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent mb-3 sm:mb-4 group-hover:scale-110 transition-all duration-300">
                      {milestone.year}
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-slate-800 dark:text-slate-200 mb-3 sm:mb-4 group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors duration-300">
                      {milestone.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm sm:text-base">{milestone.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>        {/* CTA Section */}
        <div className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 via-violet-600 to-cyan-600 bg-clip-text text-transparent mb-4 sm:mb-6 md:mb-8">
              Ready to Transform Your Business?
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg md:text-xl mb-8 sm:mb-10 md:mb-12 leading-relaxed px-4 sm:px-0">
              Join thousands of businesses already using SalesSpeak to revolutionize their customer interactions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
              <Link href="/chat">
                <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-blue-600 via-violet-600 to-blue-700 hover:from-blue-700 hover:via-violet-700 hover:to-blue-800 text-white text-lg sm:text-xl px-8 sm:px-12 py-4 sm:py-6 shadow-2xl hover:shadow-3xl shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300 transform hover:scale-105 rounded-xl sm:rounded-2xl font-semibold">
                  Try Demo Now
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-2 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-white/60 dark:hover:bg-slate-800/60 text-lg sm:text-xl px-8 sm:px-12 py-4 sm:py-6 rounded-xl sm:rounded-2xl transition-all duration-300 hover:shadow-xl backdrop-blur-sm font-semibold">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  )
}
