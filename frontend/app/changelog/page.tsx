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
        return <Plus className="h-4 w-4 text-green-600" />
      case 'improvement':
        return <ArrowUpRight className="h-4 w-4 text-blue-600" />
      case 'fix':
        return <Bug className="h-4 w-4 text-orange-600" />
      case 'security':
        return <Shield className="h-4 w-4 text-red-600" />
      default:
        return <Sparkles className="h-4 w-4 text-purple-600" />
    }
  }

  const getTypeBadge = (type: string) => {
    const styles = {
      'major': 'bg-gradient-to-r from-purple-500 to-pink-500 text-white',
      'minor': 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white',
      'patch': 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
    }
    return styles[type as keyof typeof styles] || styles.minor
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-blue-50 to-cyan-50 dark:from-slate-950 dark:via-blue-950 dark:to-violet-950 transition-all duration-500">
      {/* Enhanced Background Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-violet-600/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-gradient-to-br from-violet-400/15 to-pink-500/15 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-cyan-400/20 to-blue-600/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-gradient-to-bl from-purple-400/10 to-indigo-500/10 rounded-full blur-2xl animate-float"></div>
      </div>      {/* Enhanced Navigation */}
      <Navbar />      <div className="relative pt-16 sm:pt-24 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 sm:mb-16">
            <Badge className="mb-4 sm:mb-6 bg-gradient-to-r from-blue-100 to-violet-100 text-blue-800 border-blue-200/50 dark:from-blue-900/30 dark:to-violet-900/30 dark:text-blue-300 dark:border-blue-600/30 px-4 py-2 text-sm font-medium shadow-md">
              📋 Product Updates
            </Badge>
            
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold mb-6 sm:mb-8">
              <span className="block text-slate-900 dark:text-white mb-2">Product</span>
              <span className="block bg-gradient-to-r from-blue-600 via-violet-600 to-cyan-600 bg-clip-text text-transparent">
                Changelog
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed px-4">
              Stay updated with the latest features, improvements, and fixes. 
              We ship new updates every week to make SalesSpeak better for you.
            </p>
          </div>          {/* Subscribe to Updates */}
          <div className="mb-12 sm:mb-16">
            <Card className="glass-strong border-white/30 dark:border-slate-700/50 shadow-2xl">
              <CardContent className="p-6 sm:p-8 text-center">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-violet-600 rounded-xl flex items-center justify-center">
                    <Zap className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                  </div>
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2 text-slate-900 dark:text-white">
                  Stay in the Loop
                </h3>
                <p className="text-slate-600 dark:text-slate-300 mb-6 text-sm sm:text-base px-4">
                  Get notified about new features, updates, and important announcements
                </p>
                <Link href="/contact">
                  <Button className="bg-gradient-to-r from-blue-500 to-violet-500 hover:from-blue-600 hover:to-violet-600">
                    Subscribe to Updates
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>          {/* Changelog Entries */}
          <div className="space-y-8 sm:space-y-12">
            {releases.map((release, index) => (
              <Card key={index} className="glass border-white/30 dark:border-slate-700/50 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader className="pb-4">
                  <div className="flex flex-col space-y-4 lg:space-y-0 lg:flex-row lg:items-center justify-between">
                    <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
                      <Badge className={`${getTypeBadge(release.type)} px-3 py-1 font-semibold self-start sm:self-auto`}>
                        {release.version}
                      </Badge>
                      <div className="flex items-center text-slate-500 dark:text-slate-400 text-sm">
                        <Calendar className="h-4 w-4 mr-1" />
                        {new Date(release.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </div>
                    </div>
                  </div>
                  <CardTitle className="text-xl sm:text-2xl text-slate-900 dark:text-white leading-tight">
                    {release.title}
                  </CardTitle>
                  <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base">
                    {release.description}
                  </p>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-4">
                    {release.changes.map((change, changeIndex) => (
                      <div key={changeIndex} className="flex items-start space-x-3 p-3 sm:p-4 bg-white/50 dark:bg-slate-800/30 rounded-lg">
                        <div className="flex-shrink-0 mt-0.5">
                          {getTypeIcon(change.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-slate-900 dark:text-white mb-1 text-sm sm:text-base leading-tight">
                            {change.title}
                          </h4>
                          <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
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
            <Card className="glass border-white/30 dark:border-slate-700/50">
              <CardContent className="p-6 sm:p-8">
                <h3 className="text-lg sm:text-xl font-semibold mb-2 text-slate-900 dark:text-white">
                  Looking for Older Releases?
                </h3>
                <p className="text-slate-600 dark:text-slate-300 mb-6 text-sm sm:text-base px-4">
                  View our complete release history and archived changelogs
                </p>
                <Link href="/contact">
                  <Button variant="outline" className="border-2 border-slate-300 hover:bg-white/20">
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
