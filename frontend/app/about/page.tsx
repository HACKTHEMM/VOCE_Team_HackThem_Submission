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
      name: "Vansh Bhatnagar",
      role: "CEO & Co-founder",
      bio: "An avid traveler and former AI researcher with 15+ years in voice technology.",
      image: "/placeholder-user.jpg"
    },
    {
      name: "Toheed Akhtar",
      role: "CTO & Co-founder",
      bio: "Ex-Google engineer specializing in multilingual NLP to bridge communication gaps abroad.",
      image: "/placeholder-user.jpg"
    },
    {
      name: "Raghavendra Baheti",
      role: "Head of Product",
      bio: "Product leader passionate about creating seamless and authentic travel experiences.",
      image: "/placeholder-user.jpg"
    }
  ]

  const values = [
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Empathy for the Traveler",
      description: "We build with a deep understanding of the challenges and desires of exploring a new place."
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "Authentic Exploration",
      description: "We believe in technology that encourages genuine cultural immersion and moves beyond the typical tourist path."
    },
    {
      icon: <Lightbulb className="h-8 w-8" />,
      title: "Seamless Innovation",
      description: "Constantly pushing the boundaries to make powerful AI feel as simple and natural as a phone call."
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Fostering Connection",
      description: "Building technology that closes the gaps created by language and empowers human connection."
    }
  ]

  const milestones = [
    {
      year: "June 2025",
      title: "The Journey Begins",
      description: "Founded with a vision to solve the disconnection faced by millions of travelers."
    },
    {
      year: "July 2025",
      title: "First Adventures Powered",
      description: "Launched Voce, guiding the first travelers with support for 5 Indian languages."
    },
    {
      year: "August 2025",
      title: "10,000+ Travelers Guided",
      description: "Reached our first major milestone, helping explorers discover cities authentically."
    },
    {
      year: "September 2025",
      title: "Expanding Horizons",
      description: "Expanding to new cities to help travelers feel like a local, worldwide."
    }
  ]
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F3F1E9] via-[#ECE8D9] to-[#F3F1E9] dark:from-[#1E1E1E] dark:via-[#2A2A2A] dark:to-[#1E1E1E] transition-all duration-700">
      {/* Classic Background Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-48 -right-48 w-96 h-96 gradient-classic-mesh rounded-full blur-3xl opacity-30 animate-float"></div>
        <div className="absolute -bottom-48 -left-48 w-96 h-96 bg-gradient-to-tr from-[#BBA588]/20 via-[#8E735B]/20 to-[#7C6D64]/20 rounded-full blur-3xl opacity-30 animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-r from-[#BBA588]/10 to-[#8E735B]/10 rounded-full blur-2xl animate-pulse-slow"></div>
      </div>

      <Navbar />

      <div className="relative z-10">        {/* Hero Section */}
        <div className="pt-16 sm:pt-24 md:pt-32 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <Badge className="mb-6 sm:mb-8 bg-gradient-to-r from-[#F3F1E9] via-[#ECE8D9] to-[#F3F1E9] text-[#8E735B] border-[#BBA588]/60 dark:from-[#1E1E1E]/80 dark:via-[#2A2A2A]/80 dark:to-[#1E1E1E]/80 dark:text-[#BBA588] dark:border-[#BBA588]/20 px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-semibold shadow-lg shadow-[#BBA588]/10 rounded-full animate-fade-in font-serif">
              🏛️ Our Story
            </Badge>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-8 sm:mb-10 md:mb-12 leading-tight font-serif-display">
              <span className="block text-[#2D2C2A] dark:text-[#ECE8D9] mb-2 sm:mb-3 md:mb-4 animate-fade-in" style={{ animationDelay: '0.2s' }}>About</span>
              <span className="block bg-gradient-to-r from-[#8E735B] via-[#BBA588] to-[#7C6D64] bg-clip-text text-transparent animate-gradient animate-fade-in" style={{ animationDelay: '0.4s' }}>
                Voce
              </span>
            </h1>

            <p className="text-[#5A5A5A] dark:text-[#B6B6B6] text-base sm:text-lg md:text-xl lg:text-2xl max-w-5xl mx-auto leading-relaxed font-serif animate-fade-in px-4 sm:px-0" style={{ animationDelay: '0.6s' }}>
              We're a team of travelers, engineers, and storytellers dedicated to closing the gap between the typical tourist experience and the desire for authentic exploration.
            </p>
          </div>
        </div>        {/* Mission Section */}
        <div className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16 lg:gap-20 items-center">
              <div className="animate-slide-up order-2 lg:order-1">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2D2C2A] dark:text-[#ECE8D9] mb-6 sm:mb-8 md:mb-10 font-serif-display">
                  Our Mission
                </h2>
                <p className="text-[#5A5A5A] dark:text-[#B6B6B6] text-base sm:text-lg md:text-xl leading-relaxed mb-6 sm:mb-8 md:mb-10 font-serif">
                  To empower every traveler to feel like a local adventurer. We're breaking down barriers like language, unreliable internet, and generic digital tools with a simple, powerful AI voice agent.
                </p>
                <Card className="glass-classic border-[#BBA588]/40 dark:border-[#BBA588]/20 hover:border-[#BBA588]/60 dark:hover:border-[#BBA588]/40 transition-all duration-500 shadow-xl hover:shadow-2xl transform hover:scale-105 rounded-2xl sm:rounded-3xl">
                  <CardContent className="p-4 sm:p-6 md:p-8">
                    <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-4 md:space-x-6">
                      <div className="flex-shrink-0 mx-auto sm:mx-0">
                        <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-[#BBA588]/20 to-[#8E735B]/20 backdrop-blur-sm rounded-xl sm:rounded-2xl flex items-center justify-center text-[#8E735B] dark:text-[#BBA588] shadow-lg shadow-[#BBA588]/10">
                          <Target className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:h-8" />
                        </div>
                      </div>
                      <div className="text-center sm:text-left">
                        <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-[#2D2C2A] dark:text-[#ECE8D9] mb-2 sm:mb-3 font-serif-display">
                          Making Authentic Travel Accessible
                        </h3>
                        <p className="text-[#5A5A5A] dark:text-[#B6B6B6] text-sm sm:text-base md:text-lg leading-relaxed font-serif">
                          Providing every traveler with a personal guide that requires no apps, no setup, and no internet.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="relative animate-scale-in order-1 lg:order-2" style={{ animationDelay: '0.2s' }}>
                <div className="absolute inset-0 bg-gradient-to-br from-[#BBA588]/20 via-[#8E735B]/20 to-[#7C6D64]/20 rounded-2xl sm:rounded-3xl blur-2xl"></div>
                <Card className="relative glass-classic border-[#BBA588]/40 dark:border-[#BBA588]/20 rounded-2xl sm:rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-105">
                  <CardContent className="p-4 sm:p-6 md:p-8">
                    <div className="aspect-video bg-gradient-to-br from-[#F3F1E9] to-[#ECE8D9] dark:from-[#1E1E1E]/80 dark:to-[#2A2A2A]/80 rounded-xl sm:rounded-2xl flex items-center justify-center">
                      <div className="text-center">
                        <Mic className="h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:h-16 text-[#8E735B] dark:text-[#BBA588] mx-auto mb-3 sm:mb-4" />
                        <p className="text-[#5A5A5A] dark:text-[#B6B6B6] font-medium text-sm sm:text-base font-serif">Your Adventure, By Voice</p>
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
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-[#8E735B] via-[#BBA588] to-[#7C6D64] bg-clip-text text-transparent mb-4 sm:mb-6 md:mb-8 font-serif-display">
                Our Values
              </h2>
              <p className="text-[#5A5A5A] dark:text-[#B6B6B6] text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed px-4 sm:px-0 font-serif">
                The core principles that guide our quest to build a more connected and accessible world for travelers.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
              {values.map((value, index) => (
                <Card
                  key={index}
                  className="group glass-classic border-[#BBA588]/40 dark:border-[#BBA588]/20 hover:border-[#BBA588]/60 dark:hover:border-[#BBA588]/40 transition-all duration-500 shadow-xl hover:shadow-2xl transform hover:scale-105 hover:-translate-y-2 rounded-2xl sm:rounded-3xl animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-4 sm:p-6 md:p-8 text-center">
                    <div className="p-3 sm:p-4 bg-gradient-to-br from-[#BBA588]/20 to-[#8E735B]/20 backdrop-blur-sm rounded-xl sm:rounded-2xl text-[#8E735B] dark:text-[#BBA588] mb-4 sm:mb-6 inline-block group-hover:scale-110 transition-all duration-300 shadow-lg shadow-[#BBA588]/10">
                      {value.icon}
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-[#2D2C2A] dark:text-[#ECE8D9] mb-3 sm:mb-4 group-hover:text-[#8E735B] dark:group-hover:text-[#BBA588] transition-colors duration-300 font-serif-display">
                      {value.title}
                    </h3>
                    <p className="text-[#5A5A5A] dark:text-[#B6B6B6] leading-relaxed text-sm sm:text-base font-serif">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>        {/* Team Section */}
        <div className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12 sm:mb-16 md:mb-20">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-[#8E735B] via-[#BBA588] to-[#7C6D64] bg-clip-text text-transparent mb-4 sm:mb-6 md:mb-8 font-serif-display">
                Meet the Adventurers
              </h2>
              <p className="text-[#5A5A5A] dark:text-[#B6B6B6] text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed px-4 sm:px-0 font-serif">
                The passionate explorers and technologists building Voce to redefine the travel experience.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
              {team.map((member, index) => (
                <Card
                  key={index}
                  className="group glass-classic border-[#BBA588]/40 dark:border-[#BBA588]/20 hover:border-[#BBA588]/60 dark:hover:border-[#BBA588]/40 transition-all duration-500 shadow-xl hover:shadow-2xl transform hover:scale-105 hover:-translate-y-2 rounded-2xl sm:rounded-3xl animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-4 sm:p-6 md:p-8 text-center">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-gradient-to-br from-[#BBA588]/20 to-[#8E735B]/20 backdrop-blur-sm rounded-full mx-auto mb-4 sm:mb-6 flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-lg shadow-[#BBA588]/10">
                      <Users className="h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 text-[#8E735B] dark:text-[#BBA588]" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-[#2D2C2A] dark:text-[#ECE8D9] mb-1 sm:mb-2 group-hover:text-[#8E735B] dark:group-hover:text-[#BBA588] transition-colors duration-300 font-serif-display">
                      {member.name}
                    </h3>
                    <p className="text-[#8E735B] dark:text-[#BBA588] font-semibold mb-3 sm:mb-4 text-sm sm:text-base font-serif">{member.role}</p>
                    <p className="text-[#5A5A5A] dark:text-[#B6B6B6] text-xs sm:text-sm leading-relaxed font-serif">{member.bio}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>        {/* Milestones Section */}
        <div className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12 sm:mb-16 md:mb-20">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-[#8E735B] via-[#BBA588] to-[#7C6D64] bg-clip-text text-transparent mb-4 sm:mb-6 md:mb-8 font-serif-display">
                Our Journey
              </h2>
              <p className="text-[#5A5A5A] dark:text-[#B6B6B6] text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed px-4 sm:px-0 font-serif">
                Key milestones in our mission to transform how the world explores.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
              {milestones.map((milestone, index) => (
                <Card
                  key={index}
                  className="group glass-classic border-[#BBA588]/40 dark:border-[#BBA588]/20 hover:border-[#BBA588]/60 dark:hover:border-[#BBA588]/40 transition-all duration-500 shadow-xl hover:shadow-2xl transform hover:scale-105 hover:-translate-y-2 rounded-2xl sm:rounded-3xl animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-4 sm:p-6 md:p-8 text-center">
                    <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-[#8E735B] to-[#BBA588] bg-clip-text text-transparent mb-3 sm:mb-4 group-hover:scale-110 transition-all duration-300 font-serif-display">
                      {milestone.year}
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-[#2D2C2A] dark:text-[#ECE8D9] mb-3 sm:mb-4 group-hover:text-[#8E735B] dark:group-hover:text-[#BBA588] transition-colors duration-300 font-serif-display">
                      {milestone.title}
                    </h3>
                    <p className="text-[#5A5A5A] dark:text-[#B6B6B6] leading-relaxed text-sm sm:text-base font-serif">{milestone.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>        {/* CTA Section */}
        <div className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-[#8E735B] via-[#BBA588] to-[#7C6D64] bg-clip-text text-transparent mb-4 sm:mb-6 md:mb-8 font-serif-display">
              Ready to Explore Like a Local?
            </h2>
            <p className="text-[#5A5A5A] dark:text-[#B6B6B6] text-base sm:text-lg md:text-xl mb-8 sm:mb-10 md:mb-12 leading-relaxed px-4 sm:px-0 font-serif">
              Start your next adventure with Voce. No apps, no internet needed. Just authentic exploration at the sound of your voice.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
              <Link href="/chat">
                <Button size="lg" className="w-full sm:w-auto btn-classic text-lg sm:text-xl px-8 sm:px-12 py-4 sm:py-6 shadow-2xl hover:shadow-3xl shadow-[#BBA588]/25 hover:shadow-[#BBA588]/40 transition-all duration-300 transform hover:scale-105 rounded-xl sm:rounded-2xl font-semibold font-serif-display">
                  Start Your Adventure
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="w-full sm:w-auto btn-classic-outline text-lg sm:text-xl px-8 sm:px-12 py-4 sm:py-6 rounded-xl sm:rounded-2xl transition-all duration-300 hover:shadow-xl backdrop-blur-sm font-semibold font-serif-display">
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