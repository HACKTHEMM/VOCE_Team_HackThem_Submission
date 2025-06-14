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
  Star,  Mic
} from "lucide-react"
import Link from "next/link"
import { Footer } from "@/components/footer"
import { Navbar } from "@/components/navbar"

export default function CareersPage() {
  const openPositions = [
    {
      title: "Senior AI Engineer",
      department: "Engineering",
      location: "Bangalore, India",
      type: "Full-time",
      experience: "5+ years",
      icon: <Code className="h-6 w-6" />,
      description: "Build and enhance our AI voice models for multilingual conversations",
      skills: ["Python", "TensorFlow", "PyTorch", "NLP", "Speech Recognition"],
      urgent: true
    },
    {
      title: "Product Manager - Voice AI",
      department: "Product",
      location: "Bangalore, India",
      type: "Full-time", 
      experience: "4+ years",
      icon: <PieChart className="h-6 w-6" />,
      description: "Lead product strategy for our voice AI platform and user experience",
      skills: ["Product Strategy", "AI/ML", "User Research", "Analytics", "Agile"],
      urgent: false
    },
    {
      title: "DevOps Engineer",
      department: "Engineering",
      location: "Remote",
      type: "Full-time",
      experience: "3+ years", 
      icon: <Shield className="h-6 w-6" />,
      description: "Scale our infrastructure to support millions of voice interactions",
      skills: ["AWS", "Kubernetes", "Docker", "CI/CD", "Monitoring"],
      urgent: false
    },
    {
      title: "Marketing Manager",
      department: "Marketing",
      location: "Bangalore, India",
      type: "Full-time",
      experience: "3+ years",
      icon: <Megaphone className="h-6 w-6" />,
      description: "Drive growth marketing and brand awareness in the Indian market",
      skills: ["Digital Marketing", "Content Strategy", "Analytics", "B2B Marketing"],
      urgent: false
    },
    {
      title: "Customer Success Manager", 
      department: "Customer Success",
      location: "Bangalore, India",
      type: "Full-time",
      experience: "2+ years",
      icon: <Headphones className="h-6 w-6" />,
      description: "Ensure customer satisfaction and drive adoption of SalesSpeak",
      skills: ["Customer Relations", "SaaS", "Account Management", "Communication"],
      urgent: false
    },
    {
      title: "UI/UX Designer",
      department: "Design", 
      location: "Remote",
      type: "Full-time",
      experience: "3+ years",
      icon: <Zap className="h-6 w-6" />,
      description: "Design intuitive interfaces for our voice AI platform",
      skills: ["Figma", "User Research", "Prototyping", "Design Systems", "Voice UI"],
      urgent: false
    }
  ]

  const benefits = [
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Health & Wellness",
      description: "Comprehensive health insurance, mental health support, and wellness programs"
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: "Growth & Learning",
      description: "Learning budget, conference attendance, and career development opportunities"
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "Flexible Work",
      description: "Remote-first culture with flexible hours and work-life balance"
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Equity & Inclusion",
      description: "Stock options, inclusive culture, and diverse team from across India"
    }
  ]

  const values = [
    {
      title: "Innovation First",
      description: "We're constantly pushing the boundaries of what's possible with AI and voice technology"
    },
    {
      title: "Customer Obsessed", 
      description: "Every decision we make is centered around delivering value to our customers"
    },
    {
      title: "Inclusive Culture",
      description: "We celebrate diversity and create an environment where everyone can thrive"
    },
    {
      title: "Ownership Mindset",
      description: "Take ownership, make decisions, and have the autonomy to drive impact"
    }
  ]
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-blue-50 to-cyan-50 dark:from-slate-950 dark:via-blue-950 dark:to-violet-950 transition-all duration-500">
      {/* Enhanced Background Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-violet-600/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-gradient-to-br from-violet-400/15 to-pink-500/15 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-cyan-400/20 to-blue-600/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-gradient-to-bl from-purple-400/10 to-indigo-500/10 rounded-full blur-2xl animate-float"></div>
      </div>      {/* Enhanced Navigation */}     
      <Navbar />
      <div className="relative pt-16 sm:pt-20 md:pt-24 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 sm:mb-16">
            <Badge className="mb-4 sm:mb-6 bg-gradient-to-r from-blue-100 to-violet-100 text-blue-800 border-blue-200/50 dark:from-blue-900/30 dark:to-violet-900/30 dark:text-blue-300 dark:border-blue-600/30 px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium shadow-md">
              🚀 Join Our Mission
            </Badge>
            
            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 md:mb-8 px-2">
              <span className="block text-slate-900 dark:text-white mb-1 sm:mb-2">Build the Future of</span>
              <span className="block bg-gradient-to-r from-blue-600 via-violet-600 to-cyan-600 bg-clip-text text-transparent">
                Voice AI
              </span>
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed mb-6 sm:mb-8 px-4">
              Join our passionate team of innovators building AI technology that understands and speaks 
              every language, empowering businesses across India and beyond.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4 md:space-x-6 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              <div className="flex items-center space-x-2">
                <Users className="h-3 w-3 sm:h-4 sm:w-4" />
                <span>50+ Team Members</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-3 w-3 sm:h-4 sm:w-4" />
                <span>Bangalore HQ</span>
              </div>
              <div className="flex items-center space-x-2">
                <Globe className="h-3 w-3 sm:h-4 sm:w-4" />
                <span>Remote-First</span>
              </div>
            </div>
          </div>{/* Open Positions */}
          <div className="mb-16 sm:mb-20">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 space-y-4 sm:space-y-0">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                Open Positions
              </h2>
              <Badge variant="secondary" className="px-3 py-1 self-start sm:self-auto">
                {openPositions.length} openings
              </Badge>
            </div>            <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-2 gap-4 sm:gap-6">
              {openPositions.map((position, index) => (
                <Card key={index} className="glass-strong border-white/30 dark:border-slate-700/50 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] group">
                  <CardHeader className="pb-3 sm:pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gradient-to-br from-blue-500/20 to-violet-600/30 rounded-lg flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                          <div className="scale-75 sm:scale-100">
                            {position.icon}
                          </div>
                        </div>
                        <div className="min-w-0 flex-1">
                          <CardTitle className="text-base sm:text-lg md:text-xl font-bold text-slate-900 dark:text-white">
                            <div className="flex flex-col space-y-2">
                              <span className="leading-tight break-words">{position.title}</span>
                              {position.urgent && (
                                <Badge className="bg-red-100 text-red-800 text-xs w-fit">
                                  Urgent
                                </Badge>
                              )}
                            </div>
                          </CardTitle>
                          <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm mt-1">
                            {position.department}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-slate-600 dark:text-slate-300 mb-3 sm:mb-4 leading-relaxed text-sm">
                      {position.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                      {position.skills.map((skill, skillIndex) => (
                        <Badge key={skillIndex} variant="secondary" className="text-xs px-2 py-1">
                          {skill}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex flex-col space-y-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-4">
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                        <span className="truncate">{position.location}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1">
                          <Clock className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                          <span>{position.type}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                          <span>{position.experience}</span>
                        </div>
                      </div>
                    </div>

                    <Button className="w-full bg-gradient-to-r from-blue-500 via-violet-500 to-purple-500 hover:from-blue-600 hover:via-violet-600 hover:to-purple-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 text-sm sm:text-base py-2 sm:py-3">
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
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-3 sm:mb-4 px-2">
                Benefits & Perks
              </h2>
              <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-4">
                We believe in taking care of our team so they can do their best work and live their best lives.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
              {benefits.map((benefit, index) => (
                <Card key={index} className="glass-strong border-white/30 dark:border-slate-700/50 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-4 sm:p-6 lg:p-8">
                    <div className="flex flex-col sm:flex-row items-start space-y-3 sm:space-y-0 sm:space-x-4">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500/20 to-violet-600/30 rounded-lg flex items-center justify-center shadow-lg flex-shrink-0">
                        <div className="scale-75 sm:scale-100">
                          {benefit.icon}
                        </div>
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-base sm:text-lg md:text-xl font-bold text-slate-900 dark:text-white mb-2 leading-tight">
                          {benefit.title}
                        </h3>
                        <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
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
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-3 sm:mb-4 px-2">
                Our Values
              </h2>
              <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-4">
                These principles guide everything we do and how we work together.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {values.map((value, index) => (
                <Card key={index} className="glass-strong border-white/30 dark:border-slate-700/50 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-4 sm:p-6">
                    <h3 className="text-sm sm:text-base md:text-lg font-bold text-slate-900 dark:text-white mb-2 sm:mb-3">
                      {value.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-xs sm:text-sm md:text-base">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>{/* Call to Action */}
          <div className="text-center">
            <Card className="glass-strong border-white/30 dark:border-slate-700/50 shadow-2xl">              <CardContent className="p-6 sm:p-8 md:p-12">
                <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-gradient-to-br from-blue-500 to-violet-600 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  <Users className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 text-white" />
                </div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-3 sm:mb-4 px-2">
                  Don't See Your Role?
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-300 mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
                  We're always looking for exceptional talent. Send us your resume and let's explore 
                  how you can contribute to the future of voice AI.
                </p>
                <div className="flex flex-col space-y-3 sm:space-y-4 justify-center max-w-xs sm:max-w-sm mx-auto">
                  <Link href="/contact">
                    <Button size="lg" className="w-full bg-gradient-to-r from-blue-500 via-violet-500 to-purple-500 hover:from-blue-600 hover:via-violet-600 hover:to-purple-600 text-sm sm:text-lg px-6 sm:px-8 py-2.5 sm:py-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                      Send Your Resume
                    </Button>
                  </Link>
                  <Link href="/about">
                    <Button size="lg" variant="outline" className="w-full border-2 border-slate-300 text-slate-700 hover:bg-white/20 backdrop-blur-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-sm sm:text-base px-6 sm:px-8 py-2.5 sm:py-3">
                      Learn About Us
                    </Button>
                  </Link>
                </div>
                
                <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-slate-200 dark:border-slate-700">
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 px-4 leading-relaxed">
                    Equal Opportunity Employer | Diversity & Inclusion | careers@salesspeak.ai
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
