"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
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
  Key,
  Webhook,
  Terminal,
  GitBranch,
  Clock,
  CheckCircle,
  Compass,
  Languages,
  Ticket,
  MapPin,
  MessageSquare
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
    "Recommendations",
    "Translation",
    "Authentication",
    "Examples"
  ]

  const quickStartGuides = [
    {
      title: "Your First Recommendation",
      description: "Get a local travel tip with your first API call.",
      icon: <Compass className="h-6 w-6" />,
      time: "5 min",
      difficulty: "Beginner",
      href: "#quick-start"
    },
    {
      title: "API Authentication",
      description: "Learn how to authenticate with our REST API.",
      icon: <Key className="h-6 w-6" />,
      time: "10 min",
      difficulty: "Beginner",
      href: "#auth"
    },
    {
      title: "Real-time Translation",
      description: "Integrate live voice translation into your app.",
      icon: <Languages className="h-6 w-6" />,
      time: "15 min",
      difficulty: "Intermediate",
      href: "#translation"
    },
    {
      title: "Booking Webhooks",
      description: "Get notified when a user books a recommended spot.",
      icon: <Ticket className="h-6 w-6" />,
      time: "12 min",
      difficulty: "Intermediate",
      href: "#webhooks"
    }
  ]

  const apiEndpoints = [
    {
      method: "POST",
      path: "/api/v1/recommendations",
      description: "Get travel recommendations",
      category: "Recommendations"
    },
    {
      method: "GET",
      path: "/api/v1/locations/{id}",
      description: "Get details for a specific location",
      category: "Recommendations"
    },
    {
      method: "POST",
      path: "/api/v1/translate",
      description: "Translate speech or text",
      category: "Translation"
    },
    {
      method: "GET",
      path: "/api/v1/languages",
      description: "Get supported languages for translation",
      category: "Translation"
    },
    {
      method: "POST",
      path: "/api/v1/bookings",
      description: "Create a booking for a user at a recommended spot",
      category: "Bookings"
    },
    {
      method: "GET",
      path: "/api/v1/partners/stats",
      description: "Get your affiliate usage statistics",
      category: "Partners"
    }
  ]

  const sdks = [
    {
      name: "JavaScript SDK",
      description: "Integrate Voce into your booking website or travel app.",
      icon: "JS",
      version: "v3.1.0",
      color: "from-yellow-500 to-orange-500",
      installCommand: "npm install @voce-travel/sdk",
      language: "JavaScript"
    },
    {
      name: "Python SDK",
      description: "Python library for enriching your backend travel services.",
      icon: "PY",
      version: "v3.1.0",
      color: "from-blue-500 to-cyan-500",
      installCommand: "pip install voce-travel",
      language: "Python"
    },
    {
      name: "Swift SDK",
      description: "Native SDK for building powerful iOS travel apps.",
      icon: "",
      version: "v1.5.0",
      color: "from-gray-500 to-blue-gray-500",
      installCommand: "pod 'VoceTravelKit'",
      language: "Swift"
    },
    {
      name: "Kotlin SDK",
      description: "Native SDK for enhancing your Android travel apps.",
      icon: "🤖",
      version: "v1.5.0",
      color: "from-green-400 to-teal-500",
      installCommand: "implementation 'com.voce:travel-sdk'",
      language: "Kotlin"
    }
  ]

  const codeExamples = [
    {
      title: "Get Local Recommendations",
      language: "JavaScript",
      category: "Recommendations",
      code: `import { Voce } from '@voce-travel/sdk';

const client = new Voce({
  apiKey: 'your-partner-api-key'
});

// Get recommendations for a traveler
const recommendations = await client.getRecommendations({
  location: 'Paris, France',
  interest: 'museums',
  maxResults: 3
});

console.log('Top recommendation:', recommendations[0].name);`
    },
    {
      title: "Translate a Phrase",
      language: "Python",
      category: "Translation",
      code: `from voce_travel import Voce

client = Voce(api_key="your-partner-api-key")

# Translate a phrase for a user
translation = client.translate(
    text="Where is the nearest station?",
    source_lang="en",
    target_lang="fr"
)

print(f"Original: {translation.original_text}")
print(f"Translated: {translation.translated_text}")`
    },
    {
      title: "React 'Book Now' Component",
      language: "React",
      category: "SDKs",
      code: `import { useRecommendation, BookingButton } from '@voce-travel/react';

function RestaurantCard({ id }) {
  const { recommendation, isLoading } = useRecommendation(id);

  if (isLoading) return <p>Loading...</p>;
  
  return (
    <div>
      <h2>{recommendation.name}</h2>
      <p>{recommendation.description}</p>
      <BookingButton
        recommendationId={id}
        onSuccess={(booking) => console.log('Booked!', booking.id)}
      />
    </div>
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
    <div className="min-h-screen bg-gradient-to-br from-[#F3F1E9] via-[#ECE8D9] to-[#F3F1E9] dark:from-[#1E1E1E] dark:via-[#2A2A2A] dark:to-[#1E1E1E] transition-all duration-500">
      {/* Classic Background Pattern - Responsive */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 sm:-top-40 -right-20 sm:-right-40 w-40 sm:w-80 h-40 sm:h-80 bg-gradient-to-br from-[#BBA588]/20 to-[#8E735B]/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute top-1/3 left-1/4 w-48 sm:w-96 h-48 sm:h-96 bg-gradient-to-br from-[#8E735B]/15 to-[#7C6D64]/15 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute -bottom-20 sm:-bottom-40 -left-20 sm:-left-40 w-40 sm:w-80 h-40 sm:h-80 bg-gradient-to-tr from-[#BBA588]/20 to-[#8E735B]/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute top-1/2 right-1/3 w-32 sm:w-64 h-32 sm:h-64 bg-gradient-to-bl from-[#7C6D64]/10 to-[#BBA588]/10 rounded-full blur-2xl animate-float"></div>
      </div>
      <Navbar />

      <div className="relative pt-16 sm:pt-20 lg:pt-24 pb-12 sm:pb-16 lg:pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl sm:max-w-4xl md:max-w-5xl lg:max-w-6xl xl:max-w-7xl mx-auto">
          {/* Header - Responsive */}
          <div className="text-center mb-12 sm:mb-16">
            <Badge className="mb-4 sm:mb-6 bg-gradient-to-r from-[#F3F1E9] to-[#ECE8D9] text-[#8E735B] border-[#BBA588]/50 dark:from-[#1E1E1E]/80 dark:to-[#2A2A2A]/80 dark:text-[#BBA588] dark:border-[#BBA588]/30 px-3 sm:px-4 py-2 text-sm font-medium shadow-md font-serif">
              🤝 Partner Documentation
            </Badge>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 sm:mb-8 font-serif-display">
              <span className="block text-[#2D2C2A] dark:text-[#ECE8D9] mb-2">Enhance Your Travel Service</span>
              <span className="block bg-gradient-to-r from-[#8E735B] via-[#BBA588] to-[#7C6D64] bg-clip-text text-transparent">
                with Voce
              </span>
            </h1>

            <p className="text-base sm:text-lg lg:text-xl text-[#5A5A5A] dark:text-[#B6B6B6] max-w-2xl lg:max-w-3xl mx-auto leading-relaxed px-4 font-serif">
              Integrate Voce's local knowledge and real-time translation into your travel platform, app, or service. Give your customers a local expert in their pocket.
            </p>
          </div>

          {/* Search and Filters - Responsive */}
          <div className="mb-8 sm:mb-12">
            <div className="flex flex-col gap-3 sm:gap-4 items-center max-w-2xl mx-auto">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 sm:h-5 w-4 sm:w-5 text-[#7C6D64] dark:text-[#BBA588]" />
                <Input
                  placeholder="Search partner documentation..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 sm:pl-12 glass-classic border-[#BBA588]/30 dark:border-[#BBA588]/20 h-12 sm:h-14 text-sm sm:text-base rounded-xl font-serif"
                />
              </div>
            </div>
          </div>

          {/* Quick Start Guides - Responsive Grid */}
          <div className="mb-16 sm:mb-20">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#2D2C2A] dark:text-[#ECE8D9] mb-6 sm:mb-8 text-center font-serif-display">
              Integration Guides
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {quickStartGuides.map((guide, index) => (
                <Card key={index} className="glass-classic border-[#BBA588]/30 dark:border-[#BBA588]/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group">
                  <CardContent className="p-4 sm:p-6">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#BBA588]/20 to-[#8E735B]/30 rounded-lg flex items-center justify-center mb-3 sm:mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300 text-[#8E735B] dark:text-[#BBA588]">
                      {guide.icon}
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-[#2D2C2A] dark:text-[#ECE8D9] mb-2 font-serif-display">
                      {guide.title}
                    </h3>

                    <p className="text-[#5A5A5A] dark:text-[#B6B6B6] text-xs sm:text-sm mb-3 sm:mb-4 leading-relaxed font-serif">
                      {guide.description}
                    </p>

                    <div className="flex items-center justify-between text-xs text-[#7C6D64] dark:text-[#BBA588] mb-3 sm:mb-4 font-serif">
                      <div className="flex items-center space-x-1">
                        <Clock className="h-3 w-3" />
                        <span>{guide.time}</span>
                      </div>
                      <Badge variant="outline" className="text-xs border-[#BBA588]/40 font-serif">
                        {guide.difficulty}
                      </Badge>
                    </div>

                    <Button className="w-full btn-classic text-sm sm:text-base group-hover:scale-105 font-serif-display">
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
            <h2 className="text-2xl sm:text-3xl font-bold text-[#2D2C2A] dark:text-[#ECE8D9] mb-6 sm:mb-8 font-serif-display">
              API Reference
            </h2>

            <Card className="glass-classic border-[#BBA588]/30 dark:border-[#BBA588]/20 shadow-xl">
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="flex items-center text-lg sm:text-xl font-serif-display text-[#2D2C2A] dark:text-[#ECE8D9]">
                  <Terminal className="h-4 w-4 sm:h-5 sm:w-5 mr-2 sm:mr-3 text-[#8E735B] dark:text-[#BBA588]" />
                  Travel API Endpoints
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0">
                <div className="space-y-3 sm:space-y-4">
                  {apiEndpoints.map((endpoint, index) => (
                    <div key={index} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 glass-classic rounded-lg border border-[#BBA588]/20 gap-2 sm:gap-4">
                      <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                        <Badge
                          className={`text-xs font-mono w-fit ${endpoint.method === 'GET' ? 'bg-[#8E735B]/20 text-[#8E735B] dark:text-[#BBA588]' :
                            endpoint.method === 'POST' ? 'bg-[#BBA588]/20 text-[#8E735B] dark:text-[#BBA588]' :
                              'bg-[#BBA588]/20 text-[#8E735B] dark:text-[#BBA588]'
                            } font-serif`}
                        >
                          {endpoint.method}
                        </Badge>
                        <code className="text-xs sm:text-sm font-mono text-[#5A5A5A] dark:text-[#B6B6B6] break-all">
                          {endpoint.path}
                        </code>
                        <span className="text-[#5A5A5A] dark:text-[#B6B6B6] text-xs sm:text-sm font-serif">
                          {endpoint.description}
                        </span>
                      </div>
                      <Badge variant="outline" className="text-xs w-fit border-[#BBA588]/40 font-serif">
                        {endpoint.category}
                      </Badge>
                    </div>
                  ))}
                </div>

                <div className="mt-6 text-center">
                  <Link href="/api">
                    <Button className="btn-classic text-sm sm:text-base font-serif-display">
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
            <h2 className="text-2xl sm:text-3xl font-bold text-[#2D2C2A] dark:text-[#ECE8D9] mb-6 sm:mb-8 font-serif-display">
              Official SDKs
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {sdks.map((sdk, index) => (
                <Card key={index} className="glass-classic border-[#BBA588]/30 dark:border-[#BBA588]/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group">
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex items-center justify-between mb-3 sm:mb-4">
                      <div className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br ${sdk.color} rounded-lg flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <span className="text-white font-bold text-lg sm:text-xl">{sdk.icon}</span>
                      </div>
                      <Badge variant="outline" className="text-xs border-[#BBA588]/40 font-serif">
                        {sdk.version}
                      </Badge>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-[#2D2C2A] dark:text-[#ECE8D9] mb-2 font-serif-display">
                      {sdk.name}
                    </h3>

                    <p className="text-[#5A5A5A] dark:text-[#B6B6B6] text-xs sm:text-sm mb-3 sm:mb-4 leading-relaxed font-serif">
                      {sdk.description}
                    </p>

                    <div className="bg-[#F3F1E9] dark:bg-[#1E1E1E] rounded-lg p-2 sm:p-3 mb-3 sm:mb-4 overflow-x-auto border border-[#BBA588]/20">
                      <code className="text-xs font-mono text-[#5A5A5A] dark:text-[#B6B6B6] whitespace-nowrap">
                        {sdk.installCommand}
                      </code>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Button size="sm" className="flex-1 btn-classic text-xs sm:text-sm font-serif-display">
                        <Download className="h-3 w-3 mr-1 sm:mr-2" />
                        Install
                      </Button>
                      <Button variant="outline" size="sm" className="btn-classic-outline border-[#BBA588]/30">
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
              <h2 className="text-2xl sm:text-3xl font-bold text-[#2D2C2A] dark:text-[#ECE8D9] font-serif-display">
                Code Examples
              </h2>
              <div className="flex flex-wrap gap-2">
                {categories.slice(0, 4).map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className={`text-xs font-serif ${selectedCategory === category
                      ? "btn-classic"
                      : "btn-classic-outline border-[#BBA588]/30 text-[#5A5A5A] hover:bg-[#BBA588]/10"
                      }`}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>

            <div className="space-y-4 sm:space-y-6">
              {filteredExamples.map((example, index) => (
                <Card key={index} className="glass-classic border-[#BBA588]/30 dark:border-[#BBA588]/20 shadow-xl">
                  <CardHeader className="p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                      <CardTitle className="flex items-center text-base sm:text-lg font-serif-display text-[#2D2C2A] dark:text-[#ECE8D9]">
                        <Code2 className="h-4 w-4 sm:h-5 sm:w-5 mr-2 sm:mr-3 text-[#8E735B] dark:text-[#BBA588]" />
                        {example.title}
                      </CardTitle>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="text-xs border-[#BBA588]/40 font-serif">
                          {example.category}
                        </Badge>
                        <Badge className="text-xs bg-gradient-to-r from-[#BBA588]/20 to-[#8E735B]/20 text-[#8E735B] dark:text-[#BBA588] font-serif">
                          {example.language}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6 pt-0">
                    <div className="bg-[#2D2C2A] dark:bg-[#1A1A1A] rounded-lg p-3 sm:p-4 overflow-x-auto border border-[#BBA588]/20">
                      <pre className="text-xs sm:text-sm text-[#ECE8D9]">
                        <code>{example.code}</code>
                      </pre>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-4 gap-3">
                      <div className="flex items-center space-x-2 sm:space-x-3">
                        <Button variant="outline" size="sm" className="btn-classic-outline border-[#BBA588]/30 text-xs sm:text-sm font-serif">
                          <PlayCircle className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                          Try it
                        </Button>
                        <Button variant="outline" size="sm" className="btn-classic-outline border-[#BBA588]/30 text-xs sm:text-sm font-serif">
                          <Download className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                          Copy
                        </Button>
                      </div>
                      <div className="flex items-center text-xs text-[#7C6D64] dark:text-[#BBA588] font-serif">
                        <CheckCircle className="h-3 w-3 mr-1 text-[#8E735B]" />
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
            <Card className="glass-classic border-[#BBA588]/30 dark:border-[#BBA588]/20 shadow-2xl">
              <CardContent className="p-6 sm:p-8 lg:p-12">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-[#8E735B] to-[#BBA588] rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  <Book className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#2D2C2A] dark:text-[#ECE8D9] mb-3 sm:mb-4 font-serif-display">
                  Need More Help?
                </h2>
                <p className="text-base sm:text-lg lg:text-xl text-[#5A5A5A] dark:text-[#B6B6B6] mb-6 sm:mb-8 max-w-xl lg:max-w-2xl mx-auto px-4 font-serif">
                  Explore our comprehensive resources or get in touch with our partner success team for personalized support.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
                  <div className="text-center">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#8E735B]/20 to-[#BBA588]/30 rounded-lg flex items-center justify-center mx-auto mb-2 sm:mb-3">
                      <MessageSquare className="h-5 w-5 sm:h-6 sm:w-6 text-[#8E735B] dark:text-[#BBA588]" />
                    </div>
                    <h4 className="font-semibold text-[#2D2C2A] dark:text-[#ECE8D9] mb-1 text-sm sm:text-base font-serif-display">Community</h4>
                    <p className="text-[#5A5A5A] dark:text-[#B6B6B6] text-xs sm:text-sm font-serif">Join our Partner Slack</p>
                  </div>

                  <div className="text-center">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#BBA588]/20 to-[#7C6D64]/30 rounded-lg flex items-center justify-center mx-auto mb-2 sm:mb-3">
                      <GitBranch className="h-5 w-5 sm:h-6 sm:w-6 text-[#8E735B] dark:text-[#BBA588]" />
                    </div>
                    <h4 className="font-semibold text-[#2D2C2A] dark:text-[#ECE8D9] mb-1 text-sm sm:text-base font-serif-display">GitHub</h4>
                    <p className="text-[#5A5A5A] dark:text-[#B6B6B6] text-xs sm:text-sm font-serif">View open source examples</p>
                  </div>

                  <div className="text-center">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#7C6D64]/20 to-[#BBA588]/30 rounded-lg flex items-center justify-center mx-auto mb-2 sm:mb-3">
                      <FileText className="h-5 w-5 sm:h-6 sm:w-6 text-[#8E735B] dark:text-[#BBA588]" />
                    </div>
                    <h4 className="font-semibold text-[#2D2C2A] dark:text-[#ECE8D9] mb-1 text-sm sm:text-base font-serif-display">Use Cases</h4>
                    <p className="text-[#5A5A5A] dark:text-[#B6B6B6] text-xs sm:text-sm font-serif">See partner success stories</p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                  <Link href="/partners">
                    <Button size="lg" className="btn-classic text-sm sm:text-lg px-6 sm:px-8 py-2 sm:py-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 w-full sm:w-auto font-serif-display">
                      Visit Partner Hub
                    </Button>
                  </Link>
                  <Link href="/contact-sales">
                    <Button size="lg" variant="outline" className="btn-classic-outline border-2 border-[#BBA588]/30 text-[#5A5A5A] dark:text-[#B6B6B6] hover:bg-[#BBA588]/10 backdrop-blur-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-sm sm:text-base w-full sm:w-auto font-serif">
                      Contact Partner Success
                    </Button>
                  </Link>
                </div>

                <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-[#BBA588]/20 dark:border-[#BBA588]/20">
                  <p className="text-xs sm:text-sm text-[#7C6D64] dark:text-[#BBA588] px-4 font-serif">
                    Partner Support | API Documentation | Community Forum | partners@Voce.ai
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