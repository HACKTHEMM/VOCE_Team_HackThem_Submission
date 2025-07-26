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
      date: "2025-07-15",
      type: "major",
      title: "Expanded Language Support & Global Coverage",
      description:
        "Major update focusing on making Voce a truly global companion, with support for new languages and better offline capabilities.",
      changes: [
        {
          type: "feature",
          title: "Added Spanish, Italian, and Japanese support",
          description:
            "Real-time voice translation and local guidance are now available for travelers in Spain, Italy, and Japan."
        },
        {
          type: "improvement",
          title: "40% faster connection time",
          description:
            "Optimized our global network to connect your call to our AI agent almost instantly, no matter where you are."
        },
        {
          type: "feature",
          title: "Advanced accent understanding",
          description:
            "Improved recognition for a wider variety of English accents to better serve our diverse travelers."
        },
        {
          type: "fix",
          title: "Fixed call drop issues on international networks",
          description:
            "Strengthened call stability when moving between different international carrier networks."
        }
      ]
    },
    {
      version: "v2.3.2",
      date: "2025-07-08",
      type: "minor",
      title: "Performance & Privacy Enhancements",
      description:
        "Important updates to protect traveler data and make the Voce experience faster and more reliable.",
      changes: [
        {
          type: "security",
          title: "Enhanced Location Data Privacy",
          description:
            "Implemented additional layers of anonymization for all location-based queries to protect traveler privacy."
        },
        {
          type: "improvement",
          title: "Faster responses for transit lookups",
          description:
            "Optimized our data queries for public transport, delivering schedules and directions 25% faster."
        },
        {
          type: "fix",
          title: "Fixed issue with call handoffs between cell towers",
          description:
            "Resolved a rare issue that could cause a brief audio cutout when a traveler is moving."
        }
      ]
    },
    {
      version: "v2.3.1",
      date: "2025-06-28",
      type: "patch",
      title: "Summer Travel Stability Fixes",
      description:
        "Bug fixes and stability improvements to handle the surge in summer holiday travel.",
      changes: [
        {
          type: "fix",
          title: "Corrected opening hours for attractions",
          description:
            "Fixed a bug that occasionally provided incorrect opening times for museums and parks during public holidays."
        },
        {
          type: "fix",
          title: "Resolved local emergency number lookups",
          description:
            "Ensured that asking for 'emergency services' always provides the correct local police, fire, and ambulance numbers."
        },
        {
          type: "improvement",
          title: "Improved handling of high call volumes",
          description:
            "Increased capacity to ensure no wait times, even when many travelers are calling from popular tourist spots."
        }
      ]
    },
    {
      version: "v2.3.0",
      date: "2025-06-15",
      type: "major",
      title: "Smarter Recommendations & Itinerary Planning",
      description:
        "A major step forward in our AI's ability to provide personalized and context-aware travel advice.",
      changes: [
        {
          type: "feature",
          title: "Real-time Itinerary Suggestions",
          description:
            "Ask Voce 'What should I do today?' and get a smart itinerary based on your location, the weather, and opening hours."
        },
        {
          type: "feature",
          title: "New 'Hidden Gems' Recommendation Engine",
          description:
            "Discover authentic local spots, from restaurants to viewpoints, that don't appear in typical guidebooks."
        },
        {
          type: "feature",
          title: "Integration with Local Transit Systems",
          description:
            "Get real-time bus and train schedules by just asking, 'How do I get to the Eiffel Tower by train?'"
        },
        {
          type: "improvement",
          title: "Enhanced context memory",
          description:
            "Voce now remembers the context of your conversation, allowing for natural follow-up questions like 'What about somewhere cheaper?'"
        }
      ]
    },
    {
      version: "v2.2.5",
      date: "2025-05-20",
      type: "minor",
      title: "Offline Capabilities & Reliability",
      description:
        "New features designed to help travelers in areas with spotty or no internet connection.",
      changes: [
        {
          type: "feature",
          title: "Offline Mode for Key Phrases",
          description:
            "Voce can now provide translations for essential phrases (e.g., 'Hello', 'Thank you', 'How much is this?') even if your call drops."
        },
        {
          type: "security",
          title: "SOC 2 Type II Compliance",
          description:
            "Achieved SOC 2 Type II certification, ensuring the highest level of security for traveler data."
        },
        {
          type: "feature",
          title: "Improved Accuracy for Offline Directions",
          description:
            "Enhanced ability to provide walking or driving directions in areas with poor GPS signal."
        },
        {
          type: "improvement",
          title: "Battery Usage Optimization",
          description:
            "Reduced the power consumption of the service, ensuring your phone lasts longer on a busy day of exploring."
        }
      ]
    },
    {
      version: "v2.2.0",
      date: "2025-04-30",
      type: "major",
      title: "Launch of Core Travel Features",
      description:
        "The foundational update that transformed Voce into the ultimate travel companion.",
      changes: [
        {
          type: "feature",
          title: "Real-time Voice Translation",
          description:
            "Instantly translate conversations between English and 20 other languages, all during a normal phone call."
        },
        {
          type: "feature",
          title: "Local Dish Recommendations",
          description:
            "Ask 'What's the local specialty?' and get recommendations for authentic dishes and where to find them."
        },
        {
          type: "feature",
          title: "Currency Conversion & Tipping Guidance",
          description:
            "Get instant currency conversions and local tipping etiquette to handle payments with confidence."
        },
        {
          type: "improvement",
          title: "More natural, conversational voice",
          description:
            "Upgraded our AI's voice to be more human-like, even including local pleasantries to help you connect."
        }
      ]
    }
  ]

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "feature":
        return <Plus className="h-4 w-4 text-[#8E735B] dark:text-[#BBA588]" />
      case "improvement":
        return (
          <ArrowUpRight className="h-4 w-4 text-[#7C6D64] dark:text-[#BBA588]" />
        )
      case "fix":
        return <Bug className="h-4 w-4 text-[#BBA588] dark:text-[#8E735B]" />
      case "security":
        return <Shield className="h-4 w-4 text-[#8E735B] dark:text-[#7C6D64]" />
      default:
        return (
          <Sparkles className="h-4 w-4 text-[#7C6D64] dark:text-[#BBA588]" />
        )
    }
  }

  const getTypeBadge = (type: string) => {
    const styles = {
      major: "bg-gradient-to-r from-[#8E735B] to-[#BBA588] text-white",
      minor: "bg-gradient-to-r from-[#BBA588] to-[#7C6D64] text-white",
      patch: "bg-gradient-to-r from-[#7C6D64] to-[#8E735B] text-white"
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
      </div>{" "}
      {/* Enhanced Navigation */}
      <Navbar />{" "}
      <div className="relative pt-16 sm:pt-24 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 sm:mb-16">
            <Badge className="mb-4 sm:mb-6 bg-gradient-to-r from-[#F3F1E9] via-[#ECE8D9] to-[#F3F1E9] text-[#8E735B] border-[#BBA588]/60 dark:from-[#1E1E1E]/80 dark:via-[#2A2A2A]/80 dark:to-[#1E1E1E]/80 dark:text-[#BBA588] dark:border-[#BBA588]/20 px-4 py-2 text-sm font-medium shadow-md rounded-full font-serif">
              📋 Product Updates
            </Badge>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold mb-6 sm:mb-8 font-serif-display">
              <span className="block text-[#2D2C2A] dark:text-[#ECE8D9] mb-2">
                Voce Travel
              </span>
              <span className="block bg-gradient-to-r from-[#8E735B] via-[#BBA588] to-[#7C6D64] bg-clip-text text-transparent">
                Changelog
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-[#5A5A5A] dark:text-[#B6B6B6] max-w-3xl mx-auto leading-relaxed px-4 font-serif">
              See how we're making Voce an even better travel companion. We're
              constantly shipping updates to make your adventures more seamless
              and authentic.
            </p>
          </div>{" "}
          {/* Subscribe to Updates */}
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
                  Get updates on new languages, travel features, and tips for
                  your next journey.
                </p>
                <Link href="/contact">
                  <Button className="btn-classic text-white shadow-lg hover:shadow-xl transition-all duration-300 font-serif">
                    Subscribe to Updates
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>{" "}
          {/* Changelog Entries */}
          <div className="space-y-8 sm:space-y-12">
            {releases.map((release, index) => (
              <Card
                key={index}
                className="glass-classic border-[#BBA588]/40 dark:border-[#BBA588]/20 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl"
              >
                <CardHeader className="pb-4">
                  <div className="flex flex-col space-y-4 lg:space-y-0 lg:flex-row lg:items-center justify-between">
                    <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
                      <Badge
                        className={`${getTypeBadge(
                          release.type
                        )} px-3 py-1 font-semibold self-start sm:self-auto font-serif`}
                      >
                        {release.version}
                      </Badge>
                      <div className="flex items-center text-[#7C6D64] dark:text-[#BBA588] text-sm">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span className="font-serif">
                          {new Date(release.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric"
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
                      <div
                        key={changeIndex}
                        className="flex items-start space-x-3 p-3 sm:p-4 bg-[#F3F1E9]/50 dark:bg-[#1E1E1E]/30 rounded-lg border border-[#BBA588]/20 dark:border-[#BBA588]/10"
                      >
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
          </div>{" "}
          {/* Archive Notice */}
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
                  <Button
                    variant="outline"
                    className="btn-classic-outline font-serif"
                  >
                    Contact Support for Archive Access
                  </Button>
                </Link>{" "}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}