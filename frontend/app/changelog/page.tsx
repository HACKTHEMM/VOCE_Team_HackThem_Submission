"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Footer } from "@/components/footer"
import { Navbar } from "@/components/navbar"
import {
  Calendar,
  Zap,
  Bug,
  Plus,
  ArrowUpRight,
  Shield,
  Globe,
  Sparkles
} from "lucide-react"
import Link from "next/link"

export default function ChangelogPage() {
  const releases = [
    {
      version: "v2.4.0",
      date: "2024-01-15",
      type: "major",
      title: "Enhanced Voice Recognition & Regional Language Support",
      description: "Major improvements to voice processing with support for 5 new Indian languages",
      changes: [
        {
          type: "feature",
          title: "Added Punjabi, Gujarati, and Malayalam voice support",
          description: "Native voice recognition and synthesis for these regional languages"
        },
        {
          type: "improvement",
          title: "40% faster voice processing",
          description: "Optimized neural networks for real-time speech processing"
        },
        {
          type: "feature",
          title: "Advanced accent recognition",
          description: "Better understanding of regional accents across Indian languages"
        },
        {
          type: "fix",
          title: "Fixed audio dropout issues in Firefox",
          description: "Resolved WebRTC compatibility issues affecting voice chat"
        }
      ]
    },
    {
      version: "v2.3.2",
      date: "2024-01-08",
      type: "minor",
      title: "API Performance & Security Updates",
      description: "Critical security patches and performance optimizations",
      changes: [
        {
          type: "security",
          title: "Enhanced API rate limiting",
          description: "Improved protection against abuse with intelligent rate limiting"
        },
        {
          type: "improvement",
          title: "25% reduction in API response times",
          description: "Optimized database queries and caching strategies"
        },
        {
          type: "fix",
          title: "Fixed token refresh edge cases",
          description: "Resolved authentication issues during high traffic periods"
        }
      ]
    },
    {
      version: "v2.3.1",
      date: "2024-01-03",
      type: "patch",
      title: "Holiday Season Stability Fixes",
      description: "Bug fixes and stability improvements for increased holiday traffic",
      changes: [
        {
          type: "fix",
          title: "Resolved chat history pagination",
          description: "Fixed issues with loading older conversations"
        },
        {
          type: "fix",
          title: "Mobile UI improvements",
          description: "Better responsive design for tablets and mobile devices"
        },
        {
          type: "improvement",
          title: "Optimized image loading",
          description: "Faster page loads with progressive image loading"
        }
      ]
    },
    {
      version: "v2.3.0",
      date: "2023-12-20",
      type: "major",
      title: "Advanced Analytics & Conversation Intelligence",
      description: "Comprehensive analytics dashboard with AI-powered insights",
      changes: [
        {
          type: "feature",
          title: "Conversation Analytics Dashboard",
          description: "Detailed insights into conversation patterns and user behavior"
        },
        {
          type: "feature",
          title: "Sentiment Analysis Integration",
          description: "Real-time sentiment tracking for better customer understanding"
        },
        {
          type: "feature",
          title: "Custom Integration Builder",
          description: "No-code tool for building custom CRM and e-commerce integrations"
        },
        {
          type: "improvement",
          title: "Enhanced context memory",
          description: "AI now remembers conversation context across longer sessions"
        }
      ]
    },
    {
      version: "v2.2.5",
      date: "2023-12-10",
      type: "minor",
      title: "Enterprise Features & Compliance Updates",
      description: "New enterprise features with enhanced security and compliance",
      changes: [
        {
          type: "feature",
          title: "SSO Integration (SAML/OAuth)",
          description: "Enterprise single sign-on support for better security"
        },
        {
          type: "security",
          title: "SOC 2 Type II Compliance",
          description: "Achieved SOC 2 Type II certification for enterprise customers"
        },
        {
          type: "feature",
          title: "Advanced Role-Based Access Control",
          description: "Granular permissions for team management"
        },
        {
          type: "improvement",
          title: "Audit logging",
          description: "Comprehensive logging for compliance and security monitoring"
        }
      ]
    },
    {
      version: "v2.2.0",
      date: "2023-11-25",
      title: "Multi-Modal AI & Visual Recognition",
      type: "major",
      description: "Revolutionary update with image understanding and multi-modal interactions",
      changes: [
        {
          type: "feature",
          title: "Image Understanding",
          description: "AI can now analyze and describe product images shared in chat"
        },
        {
          type: "feature",
          title: "Visual Product Search",
          description: "Upload photos to find similar products across integrated platforms"
        },
        {
          type: "feature",
          title: "Screen Sharing Support",
          description: "Share screens during voice calls for better customer support"
        },
        {
          type: "improvement",
          title: "Improved voice naturalness",
          description: "More human-like speech synthesis with emotional context"
        }
      ]
    }
  ]

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'feature':
        return <Plus className="h-4 w-4 text-[#8E735B] dark:text-[#BBA588]" />
      case 'improvement':
        return <ArrowUpRight className="h-4 w-4 text-[#7C6D64] dark:text-[#BBA588]" />
      case 'fix':
        return <Bug className="h-4 w-4 text-[#BBA588] dark:text-[#8E735B]" />
      case 'security':
        return <Shield className="h-4 w-4 text-[#8E735B] dark:text-[#7C6D64]" />
      default:
        return <Sparkles className="h-4 w-4 text-[#7C6D64] dark:text-[#BBA588]" />
    }
  }

  const getTypeBadge = (type: string) => {
    const styles = {
      'major': 'bg-gradient-to-r from-[#8E735B] to-[#BBA588] text-white',
      'minor': 'bg-gradient-to-r from-[#BBA588] to-[#7C6D64] text-white',
      'patch': 'bg-gradient-to-r from-[#7C6D64] to-[#8E735B] text-white'
    }
    return styles[type as keyof typeof styles] || styles.minor
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F3F1E9] via-[#ECE8D9] to-[#F3F1E9] dark:from-[#1E1E1E] dark:via-[#2A2A2A] dark:to-[#1E1E1E] transition-all duration-700">
      {/* Classic Background Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-[#BBA588]/20 to-[#8E735B]/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-gradient-to-br from-[#8E735B]/15 to-[#7C6D64]/15 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-[#BBA588]/20 to-[#8E735B]/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-gradient-to-bl from-[#7C6D64]/10 to-[#BBA588]/10 rounded-full blur-2xl animate-float"></div>
      </div>      {/* Enhanced Navigation */}
      <Navbar />      <div className="relative pt-16 sm:pt-24 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 sm:mb-16">
            <Badge className="mb-4 sm:mb-6 bg-gradient-to-r from-[#F3F1E9] via-[#ECE8D9] to-[#F3F1E9] text-[#8E735B] border-[#BBA588]/60 dark:from-[#1E1E1E]/80 dark:via-[#2A2A2A]/80 dark:to-[#1E1E1E]/80 dark:text-[#BBA588] dark:border-[#BBA588]/20 px-4 py-2 text-sm font-medium shadow-md rounded-full font-serif">
              📋 Product Updates
            </Badge>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold mb-6 sm:mb-8 font-serif-display">
              <span className="block text-[#2D2C2A] dark:text-[#ECE8D9] mb-2">Product</span>
              <span className="block bg-gradient-to-r from-[#8E735B] via-[#BBA588] to-[#7C6D64] bg-clip-text text-transparent">
                Changelog
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-[#5A5A5A] dark:text-[#B6B6B6] max-w-3xl mx-auto leading-relaxed px-4 font-serif">
              Stay updated with the latest features, improvements, and fixes.
              We ship new updates every week to make Voce better for you.
            </p>
          </div>          {/* Subscribe to Updates */}
          <div className="mb-12 sm:mb-16">
            <Card className="glass-classic border-[#BBA588]/40 dark:border-[#BBA588]/20 shadow-2xl rounded-2xl">
              <CardContent className="p-6 sm:p-8 text-center">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#BBA588] to-[#8E735B] rounded-xl flex items-center justify-center shadow-lg">
                    <Zap className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                  </div>
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2 text-[#2D2C2A] dark:text-[#ECE8D9] font-serif-display">
                  Stay in the Loop
                </h3>
                <p className="text-[#5A5A5A] dark:text-[#B6B6B6] mb-6 text-sm sm:text-base px-4 font-serif">
                  Get notified about new features, updates, and important announcements
                </p>
                <Link href="/contact">
                  <Button className="btn-classic text-white shadow-lg hover:shadow-xl transition-all duration-300 font-serif">
                    Subscribe to Updates
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>          {/* Changelog Entries */}
          <div className="space-y-8 sm:space-y-12">
            {releases.map((release, index) => (
              <Card key={index} className="glass-classic border-[#BBA588]/40 dark:border-[#BBA588]/20 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl">
                <CardHeader className="pb-4">
                  <div className="flex flex-col space-y-4 lg:space-y-0 lg:flex-row lg:items-center justify-between">
                    <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
                      <Badge className={`${getTypeBadge(release.type)} px-3 py-1 font-semibold self-start sm:self-auto font-serif`}>
                        {release.version}
                      </Badge>
                      <div className="flex items-center text-[#7C6D64] dark:text-[#BBA588] text-sm">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span className="font-serif">
                          {new Date(release.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                  <CardTitle className="text-xl sm:text-2xl text-[#2D2C2A] dark:text-[#ECE8D9] leading-tight font-serif-display">
                    {release.title}
                  </CardTitle>
                  <p className="text-[#5A5A5A] dark:text-[#B6B6B6] text-sm sm:text-base font-serif">
                    {release.description}
                  </p>
                </CardHeader>

                <CardContent>
                  <div className="space-y-4">
                    {release.changes.map((change, changeIndex) => (
                      <div key={changeIndex} className="flex items-start space-x-3 p-3 sm:p-4 bg-[#F3F1E9]/50 dark:bg-[#1E1E1E]/30 rounded-lg border border-[#BBA588]/20 dark:border-[#BBA588]/10">
                        <div className="flex-shrink-0 mt-0.5">
                          {getTypeIcon(change.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-[#2D2C2A] dark:text-[#ECE8D9] mb-1 text-sm sm:text-base leading-tight font-serif-display">
                            {change.title}
                          </h4>
                          <p className="text-[#5A5A5A] dark:text-[#B6B6B6] text-xs sm:text-sm leading-relaxed font-serif">
                            {change.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>          {/* Archive Notice */}
          <div className="mt-12 sm:mt-16 text-center">
            <Card className="glass-classic border-[#BBA588]/40 dark:border-[#BBA588]/20 rounded-2xl">
              <CardContent className="p-6 sm:p-8">
                <h3 className="text-lg sm:text-xl font-semibold mb-2 text-[#2D2C2A] dark:text-[#ECE8D9] font-serif-display">
                  Looking for Older Releases?
                </h3>
                <p className="text-[#5A5A5A] dark:text-[#B6B6B6] mb-6 text-sm sm:text-base px-4 font-serif">
                  View our complete release history and archived changelogs
                </p>
                <Link href="/contact">
                  <Button variant="outline" className="btn-classic-outline font-serif">
                    Contact Support for Archive Access
                  </Button>
                </Link>              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
