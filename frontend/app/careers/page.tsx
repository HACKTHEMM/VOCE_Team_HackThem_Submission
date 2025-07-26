"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ThemeToggle } from "@/components/theme-toggle"
import {

  MapPin,
  Clock,
  Users,
  TrendingUp,
  Heart,
  Globe,
  Zap,
  Code,
  PieChart,
  Megaphone,
  Headphones,
  Shield,
  ArrowRight,
  Star, Mic
} from "lucide-react"
import Link from "next/link"
import { Footer } from "@/components/footer"
import { Navbar } from "@/components/navbar"

export default function CareersPage() {
  const openPositions = [
    {
      title: "Senior AI Engineer (Travel)",
      department: "Engineering",
      location: "Bangalore, India",
      type: "Full-time",
      experience: "5+ years",
      icon: <Code className="h-6 w-6" />,
      description: "Build and enhance our core AI to provide authentic, real-time travel guidance without internet.",
      skills: ["Python", "NLP", "Speech Recognition", "Offline Models", "Geo-spatial AI"],
      urgent: true
    },
    {
      title: "Product Manager - Traveler Experience",
      department: "Product",
      location: "Bangalore, India",
      type: "Full-time",
      experience: "4+ years",
      icon: <PieChart className="h-6 w-6" />,
      description: "Lead the product strategy for Voce, ensuring a seamless and magical experience for every traveler.",
      skills: ["Product Strategy", "Voice UI/UX", "User Research", "Travel Tech", "Agile"],
      urgent: false
    },
    {
      title: "DevOps Engineer",
      department: "Engineering",
      location: "Remote",
      type: "Full-time",
      experience: "3+ years",
      icon: <Shield className="h-6 w-6" />,
      description: "Scale our infrastructure to ensure reliable, instant connections for travelers anywhere in the world.",
      skills: ["AWS", "Kubernetes", "Docker", "CI/CD", "Telecom APIs"],
      urgent: false
    },
    {
      title: "Growth Marketing Manager (Travel)",
      department: "Marketing",
      location: "Bangalore, India",
      type: "Full-time",
      experience: "3+ years",
      icon: <Megaphone className="h-6 w-6" />,
      description: "Drive awareness and adoption of Voce among global travelers and travel communities.",
      skills: ["Digital Marketing", "Community Building", "B2C Marketing", "Content Strategy"],
      urgent: false
    },
    {
      title: "Traveler Support Specialist",
      department: "Customer Success",
      location: "Bangalore, India",
      type: "Full-time",
      experience: "2+ years",
      icon: <Headphones className="h-6 w-6" />,
      description: "Be the friendly voice of Voce, ensuring every traveler feels supported and empowered on their journey.",
      skills: ["Customer Empathy", "Problem-Solving", "Communication", "Travel Knowledge"],
      urgent: false
    },
    {
      title: "Conversation Designer",
      department: "Design",
      location: "Remote",
      type: "Full-time",
      experience: "3+ years",
      icon: <Zap className="h-6 w-6" />,
      description: "Design intuitive and delightful voice conversations that make travelers feel like locals.",
      skills: ["Voice UI", "Conversation Flow", "Figma", "User Research", "Copywriting"],
      urgent: false
    }
  ]

  const benefits = [
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Health & Wellness",
      description: "Comprehensive health insurance, mental health support, and wellness programs to keep you at your best."
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: "Growth & Learning",
      description: "Learning budget, conference attendance, and career development opportunities to fuel your curiosity."
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "Flexible Work & Travel",
      description: "Remote-first culture with flexible hours and perks that encourage you to explore the world."
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Equity & Inclusion",
      description: "Stock options, inclusive culture, and a diverse team passionate about connecting the world."
    }
  ]

  const values = [
    {
      title: "Be the Traveler",
      description: "We build with empathy, putting the traveler's needs and experiences at the heart of every decision."
    },
    {
      title: "Explore Uncharted Territory",
      description: "We are pioneers, constantly pushing the boundaries of technology to solve real-world travel challenges."
    },
    {
      title: "Speak the Local Language",
      description: "We celebrate diversity, foster clear communication, and create an inclusive environment for everyone."
    },
    {
      title: "Own Your Adventure",
      description: "Take ownership, make decisions, and have the autonomy to drive impact on a global scale."
    }
  ]
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F3F1E9] via-[#ECE8D9] to-[#F3F1E9] dark:from-[#1E1E1E] dark:via-[#2A2A2A] dark:to-[#1E1E1E] transition-all duration-500">
      {/* Classic Background Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-[#BBA588]/20 to-[#8E735B]/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-gradient-to-br from-[#8E735B]/15 to-[#7C6D64]/15 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-[#7C6D64]/20 to-[#BBA588]/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-gradient-to-bl from-[#BBA588]/10 to-[#8E735B]/10 rounded-full blur-2xl animate-float"></div>
      </div>      {/* Enhanced Navigation */}
      <Navbar />
      <div className="relative pt-16 sm:pt-20 md:pt-24 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 sm:mb-16">
            <Badge className="mb-4 sm:mb-6 bg-gradient-to-r from-[#F3F1E9] via-[#ECE8D9] to-[#F3F1E9] text-[#8E735B] border-[#BBA588]/50 dark:from-[#1E1E1E]/80 dark:via-[#2A2A2A]/80 dark:to-[#1E1E1E]/80 dark:text-[#BBA588] dark:border-[#BBA588]/30 px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium shadow-md font-serif">
              🚀 Join Our Adventure
            </Badge>

            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 md:mb-8 px-2 font-serif-display">
              <span className="block text-[#2D2C2A] dark:text-[#ECE8D9] mb-1 sm:mb-2">Turn Every Traveler into a</span>
              <span className="block bg-gradient-to-r from-[#8E735B] via-[#BBA588] to-[#7C6D64] bg-clip-text text-transparent">
                Local Adventurer
              </span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-[#5A5A5A] dark:text-[#B6B6B6] max-w-3xl mx-auto leading-relaxed mb-6 sm:mb-8 px-4 font-serif">
              Every year, millions of travelers face language barriers and unreliable internet, missing out on authentic experiences. At Voce, we're closing that gap with an AI voice agent that works with a simple phone call—no app, no internet needed.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4 md:space-x-6 text-xs sm:text-sm text-[#7C6D64] dark:text-[#BBA588]">
              <div className="flex items-center space-x-2">
                <Users className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="font-serif">50+ Team Members</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="font-serif">Bangalore HQ</span>
              </div>
              <div className="flex items-center space-x-2">
                <Globe className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="font-serif">Connecting the Globe</span>
              </div>
            </div>
          </div>{/* Open Positions */}
          <div className="mb-16 sm:mb-20">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 space-y-4 sm:space-y-0">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#2D2C2A] dark:text-[#ECE8D9] font-serif-display">
                Open Positions
              </h2>
              <Badge variant="secondary" className="px-3 py-1 self-start sm:self-auto bg-[#BBA588]/20 text-[#8E735B] dark:bg-[#BBA588]/30 dark:text-[#BBA588] font-serif">
                {openPositions.length} openings
              </Badge>
            </div>            <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-2 gap-4 sm:gap-6">
              {openPositions.map((position, index) => (
                <Card key={index} className="glass-classic border-[#BBA588]/40 dark:border-[#BBA588]/20 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] group rounded-2xl">
                  <CardHeader className="pb-3 sm:pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gradient-to-br from-[#BBA588]/20 to-[#8E735B]/30 rounded-lg flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                          <div className="scale-75 sm:scale-100 text-[#8E735B] dark:text-[#BBA588]">
                            {position.icon}
                          </div>
                        </div>
                        <div className="min-w-0 flex-1">
                          <CardTitle className="text-base sm:text-lg md:text-xl font-bold text-[#2D2C2A] dark:text-[#ECE8D9] font-serif-display">
                            <div className="flex flex-col space-y-2">
                              <span className="leading-tight break-words">{position.title}</span>
                              {position.urgent && (
                                <Badge className="bg-[#BBA588]/20 text-[#8E735B] dark:bg-[#BBA588]/30 dark:text-[#BBA588] text-xs w-fit font-serif">
                                  Urgent
                                </Badge>
                              )}
                            </div>
                          </CardTitle>
                          <p className="text-[#5A5A5A] dark:text-[#B6B6B6] text-xs sm:text-sm mt-1 font-serif">
                            {position.department}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-[#5A5A5A] dark:text-[#B6B6B6] mb-3 sm:mb-4 leading-relaxed text-sm font-serif">
                      {position.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                      {position.skills.map((skill, skillIndex) => (
                        <Badge key={skillIndex} variant="secondary" className="text-xs px-2 py-1 bg-[#BBA588]/20 text-[#8E735B] dark:bg-[#BBA588]/30 dark:text-[#BBA588] font-serif">
                          {skill}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex flex-col space-y-2 text-xs sm:text-sm text-[#7C6D64] dark:text-[#BBA588] mb-4">
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                        <span className="truncate font-serif">{position.location}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1">
                          <Clock className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                          <span className="font-serif">{position.type}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                          <span className="font-serif">{position.experience}</span>
                        </div>
                      </div>
                    </div>

                    <Button className="w-full btn-classic text-white shadow-lg hover:shadow-xl transition-all duration-300 text-sm sm:text-base py-2 sm:py-3 font-serif">
                      Apply Now
                      <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>          {/* Benefits & Perks */}
          <div className="mb-16 sm:mb-20">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#2D2C2A] dark:text-[#ECE8D9] mb-3 sm:mb-4 px-2 font-serif-display">
                Benefits & Perks
              </h2>
              <p className="text-[#5A5A5A] dark:text-[#B6B6B6] text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-4 font-serif">
                We believe in taking care of our team so they can do their best work and live their best lives.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
              {benefits.map((benefit, index) => (
                <Card key={index} className="glass-classic border-[#BBA588]/40 dark:border-[#BBA588]/20 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl">
                  <CardContent className="p-4 sm:p-6 lg:p-8">
                    <div className="flex flex-col sm:flex-row items-start space-y-3 sm:space-y-0 sm:space-x-4">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#BBA588]/20 to-[#8E735B]/30 rounded-lg flex items-center justify-center shadow-lg flex-shrink-0">
                        <div className="scale-75 sm:scale-100 text-[#8E735B] dark:text-[#BBA588]">
                          {benefit.icon}
                        </div>
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-base sm:text-lg md:text-xl font-bold text-[#2D2C2A] dark:text-[#ECE8D9] mb-2 leading-tight font-serif-display">
                          {benefit.title}
                        </h3>
                        <p className="text-[#5A5A5A] dark:text-[#B6B6B6] leading-relaxed text-sm sm:text-base font-serif">
                          {benefit.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>          {/* Our Values */}
          <div className="mb-16 sm:mb-20">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#2D2C2A] dark:text-[#ECE8D9] mb-3 sm:mb-4 px-2 font-serif-display">
                Our Values
              </h2>
              <p className="text-[#5A5A5A] dark:text-[#B6B6B6] text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-4 font-serif">
                These principles guide how we build, travel, and work together.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {values.map((value, index) => (
                <Card key={index} className="glass-classic border-[#BBA588]/40 dark:border-[#BBA588]/20 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl">
                  <CardContent className="p-4 sm:p-6">
                    <h3 className="text-sm sm:text-base md:text-lg font-bold text-[#2D2C2A] dark:text-[#ECE8D9] mb-2 sm:mb-3 font-serif-display">
                      {value.title}
                    </h3>
                    <p className="text-[#5A5A5A] dark:text-[#B6B6B6] leading-relaxed text-xs sm:text-sm md:text-base font-serif">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>{/* Call to Action */}
          <div className="text-center">
            <Card className="glass-classic border-[#BBA588]/40 dark:border-[#BBA588]/20 shadow-2xl rounded-2xl">              <CardContent className="p-6 sm:p-8 md:p-12">
              <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-gradient-to-br from-[#BBA588] to-[#8E735B] rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg">
                <Users className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 text-white" />
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#2D2C2A] dark:text-[#ECE8D9] mb-3 sm:mb-4 px-2 font-serif-display">
                Don't See Your Role?
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-[#5A5A5A] dark:text-[#B6B6B6] mb-6 sm:mb-8 max-w-2xl mx-auto px-4 font-serif">
                We're always looking for passionate explorers and builders. Send us your resume and let's see how you can help redefine the way people experience the world.
              </p>
              <div className="flex flex-col space-y-3 sm:space-y-4 justify-center max-w-xs sm:max-w-sm mx-auto">
                <Link href="/contact">
                  <Button size="lg" className="w-full btn-classic text-white text-sm sm:text-lg px-6 sm:px-8 py-2.5 sm:py-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 font-serif">
                    Share Your Story
                  </Button>
                </Link>
                <Link href="/about">
                  <Button size="lg" variant="outline" className="w-full border-2 border-[#BBA588] text-[#8E735B] dark:text-[#BBA588] hover:bg-[#BBA588]/20 dark:hover:bg-[#BBA588]/20 backdrop-blur-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-sm sm:text-base px-6 sm:px-8 py-2.5 sm:py-3 font-serif">
                    Learn About Our Mission
                  </Button>
                </Link>
              </div>

              <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-[#BBA588]/30 dark:border-[#BBA588]/20">
                <p className="text-xs sm:text-sm text-[#7C6D64] dark:text-[#BBA588] px-4 leading-relaxed font-serif">
                  Equal Opportunity Employer | Diversity & Inclusion | careers@Voce.ai
                </p>
              </div>
            </CardContent>
            </Card>          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}