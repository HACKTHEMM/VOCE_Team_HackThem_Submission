"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import Link from "next/link"
import { Plane, BedDouble, Utensils, Map, Users, FileText, ExternalLink, ArrowRight, Zap } from "lucide-react"
import Image from "next/image"
import { Footer } from "@/components/footer"
import { Navbar } from "@/components/navbar"

export default function IntegrationsPage() {
  const categories = [
    {
      name: "Booking Platforms",
      description: "Connect with major travel and accommodation booking systems.",
      icon: <BedDouble className="h-6 w-6" />,
      integrations: [
        {
          name: "Booking.com",
          description: "Access booking details and guest information seamlessly.",
          logo: "/placeholder.svg",
          status: "Available",
          popular: true
        },
        {
          name: "Expedia",
          description: "Integrate with your property listings and reservations.",
          logo: "/placeholder.svg",
          status: "Available",
          popular: true
        },
        {
          name: "Airbnb",
          description: "Sync your hosting calendar and guest communications.",
          logo: "/placeholder.svg",
          status: "Available",
          popular: false
        },
        {
          name: "Traveloka",
          description: "Connect with Southeast Asia's leading travel platform.",
          logo: "/placeholder.svg",
          status: "Coming Soon",
          popular: false
        }
      ]
    },
    {
      name: "Airline Systems",
      description: "Enhance the travel experience with flight information.",
      icon: <Plane className="h-6 w-6" />,
      integrations: [
        {
          name: "Amadeus",
          description: "Provide real-time flight status and booking information.",
          logo: "/placeholder.svg",
          status: "Available",
          popular: true
        },
        {
          name: "Sabre",
          description: "Access passenger name records and flight itineraries.",
          logo: "/placeholder.svg",
          status: "Available",
          popular: false
        },
        {
          name: "Galileo",
          description: "Integrate with a global distribution system for travel.",
          logo: "/placeholder.svg",
          status: "Beta",
          popular: false
        },
        {
          name: "Airline APIs",
          description: "Direct integration with specific airline systems.",
          logo: "/placeholder.svg",
          status: "Coming Soon",
          popular: false
        }
      ]
    },
    {
      name: "Local Services",
      description: "Connect travelers with local experiences and services.",
      icon: <Map className="h-6 w-6" />,
      integrations: [
        {
          name: "Google Maps",
          description: "Provide voice-guided navigation and local search.",
          logo: "/placeholder.svg",
          status: "Available",
          popular: true
        },
        {
          name: "TripAdvisor",
          description: "Access reviews and recommendations for local attractions.",
          logo: "/placeholder.svg",
          status: "Available",
          popular: true
        },
        {
          name: "Uber",
          description: "Enable voice-activated ride-hailing for travelers.",
          logo: "/placeholder.svg",
          status: "Beta",
          popular: false
        },
        {
          name: "Zomato",
          description: "Discover and book tables at local restaurants.",
          logo: "/placeholder.svg",
          status: "Coming Soon",
          popular: false
        }
      ]
    },
    {
      name: "Hospitality Management",
      description: "Connect with property and guest management systems.",
      icon: <Utensils className="h-6 w-6" />,
      integrations: [
        {
          name: "Oracle Opera",
          description: "Integrate with your property management system.",
          logo: "/placeholder.svg",
          status: "Available",
          popular: true
        },
        {
          name: "Cloudbeds",
          description: "Sync guest data and automate communication.",
          logo: "/placeholder.svg",
          status: "Available",
          popular: false
        },
        {
          name: "Mews",
          description: "Connect with a modern, cloud-based PMS.",
          logo: "/placeholder.svg",
          status: "Beta",
          popular: false
        },
        {
          name: "Guestly",
          description: "Streamline guest services and communication.",
          logo: "/placeholder.svg",
          status: "Coming Soon",
          popular: false
        }
      ]
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Available":
        return "bg-[#8E735B]/20 text-[#8E735B] dark:bg-[#BBA588]/20 dark:text-[#BBA588]"
      case "Beta":
        return "bg-[#BBA588]/20 text-[#8E735B] dark:bg-[#BBA588]/20 dark:text-[#BBA588]"
      case "Coming Soon":
        return "bg-[#7C6D64]/20 text-[#7C6D64] dark:bg-[#7C6D64]/20 dark:text-[#BBA588]"
      default: return "bg-[#ECE8D9]/50 text-[#5A5A5A] dark:bg-[#2A2A2A]/50 dark:text-[#B6B6B6]"
    }
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F3F1E9] via-[#ECE8D9] to-[#F3F1E9] dark:from-[#1E1E1E] dark:via-[#2A2A2A] dark:to-[#1E1E1E] transition-all duration-700 overflow-x-hidden">
      {/* Classic Background Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 sm:-top-48 -right-24 sm:-right-48 w-48 h-48 sm:w-96 sm:h-96 gradient-classic-mesh rounded-full blur-3xl opacity-30 animate-float"></div>
        <div className="absolute -bottom-24 sm:-bottom-48 -left-24 sm:-left-48 w-48 h-48 sm:w-96 sm:h-96 bg-gradient-to-tr from-[#BBA588]/20 via-[#8E735B]/20 to-[#7C6D64]/20 rounded-full blur-3xl opacity-30 animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-36 h-36 sm:w-72 sm:h-72 bg-gradient-to-r from-[#BBA588]/10 to-[#8E735B]/10 rounded-full blur-2xl animate-pulse-slow"></div>
      </div>
      <Navbar />      {/* Header */}
      <div className="relative pt-16 sm:pt-20 lg:pt-24 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <Badge className="mb-4 sm:mb-6 bg-gradient-to-r from-[#F3F1E9] to-[#ECE8D9] text-[#8E735B] border-[#BBA588]/50 dark:from-[#1E1E1E]/80 dark:to-[#2A2A2A]/80 dark:text-[#BBA588] dark:border-[#BBA588]/30 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium shadow-md font-serif">
            🔗 Seamless Connections for Travelers
          </Badge>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 sm:mb-8 font-serif-display">
            <span className="block text-[#2D2C2A] dark:text-[#ECE8D9] mb-1 sm:mb-2">Connect With</span>
            <span className="block bg-gradient-to-r from-[#8E735B] via-[#BBA588] to-[#7C6D64] bg-clip-text text-transparent animate-gradient">
              Your Journey
            </span>
          </h1>

          <p className="text-[#5A5A5A] dark:text-[#B6B6B6] text-base sm:text-lg lg:text-xl max-w-4xl mx-auto leading-relaxed mb-8 sm:mb-10 lg:mb-12 px-4 sm:px-0 font-serif">
            Voce integrates seamlessly with your favorite travel tools and services. Connect with popular platforms to supercharge your AI-powered travel assistance.
          </p>

          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 lg:gap-4 px-4 sm:px-0">
            <Badge variant="outline" className="px-2 sm:px-3 lg:px-4 py-1 sm:py-1.5 lg:py-2 text-xs sm:text-sm border-[#BBA588]/40 text-[#8E735B] dark:text-[#BBA588]">
              50+ Integrations Available
            </Badge>
            <Badge variant="outline" className="px-2 sm:px-3 lg:px-4 py-1 sm:py-1.5 lg:py-2 text-xs sm:text-sm border-[#BBA588]/40 text-[#8E735B] dark:text-[#BBA588]">
              RESTful APIs
            </Badge>
            <Badge variant="outline" className="px-2 sm:px-3 lg:px-4 py-1 sm:py-1.5 lg:py-2 text-xs sm:text-sm border-[#BBA588]/40 text-[#8E735B] dark:text-[#BBA588]">
              Webhooks Support
            </Badge>
            <Badge variant="outline" className="px-2 sm:px-3 lg:px-4 py-1 sm:py-1.5 lg:py-2 text-xs sm:text-sm border-[#BBA588]/40 text-[#8E735B] dark:text-[#BBA588]">
              Real-time Sync
            </Badge>
          </div>
        </div>
      </div>      {/* Integration Categories */}
      <div className="relative px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20 lg:pb-24">
        <div className="max-w-7xl mx-auto space-y-12 sm:space-y-14 lg:space-y-16">
          {categories.map((category, categoryIndex) => (
            <div key={categoryIndex}>
              <div className="text-center mb-8 sm:mb-10 lg:mb-12">
                <div className="flex justify-center mb-3 sm:mb-4">
                  <div className="p-2 sm:p-3 bg-gradient-to-br from-[#BBA588]/20 to-[#8E735B]/20 rounded-xl text-[#8E735B] dark:text-[#BBA588]">
                    {category.icon}
                  </div>
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-3xl font-bold text-[#2D2C2A] dark:text-[#ECE8D9] mb-3 sm:mb-4 font-serif-display">
                  {category.name}
                </h2>
                <p className="text-[#5A5A5A] dark:text-[#B6B6B6] text-base sm:text-lg max-w-2xl mx-auto px-4 sm:px-0 font-serif">
                  {category.description}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
                {category.integrations.map((integration, integrationIndex) => (
                  <Card
                    key={integrationIndex}
                    className="group glass-classic border-[#BBA588]/40 dark:border-[#BBA588]/20 hover:border-[#BBA588]/60 dark:hover:border-[#BBA588]/40 transition-all duration-500 shadow-xl hover:shadow-2xl transform hover:scale-105 relative overflow-hidden"
                  >
                    {integration.popular && (
                      <div className="absolute top-0 right-0 bg-gradient-to-l from-[#8E735B] to-[#BBA588] text-white text-xs px-2 sm:px-3 py-1 rounded-bl-lg font-medium font-serif">
                        Popular
                      </div>
                    )}

                    <CardHeader className="pb-3 sm:pb-4">
                      <div className="flex items-center space-x-3 sm:space-x-4 mb-3 sm:mb-4">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#F3F1E9] dark:bg-[#2A2A2A] rounded-lg flex items-center justify-center shadow-md flex-shrink-0">
                          <Image
                            src={integration.logo}
                            alt={integration.name}
                            width={28}
                            height={28}
                            className="sm:w-8 sm:h-8 rounded"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <CardTitle className="text-base sm:text-lg font-semibold text-[#2D2C2A] dark:text-[#ECE8D9] truncate font-serif-display">
                            {integration.name}
                          </CardTitle>
                          <Badge className={`mt-1 text-xs ${getStatusColor(integration.status)}`}>
                            {integration.status}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-[#5A5A5A] dark:text-[#B6B6B6] text-sm leading-relaxed mb-4 line-clamp-3 sm:line-clamp-none font-serif">
                        {integration.description}
                      </p>

                      <Button
                        className="w-full text-sm h-9 sm:h-10 font-serif-display"
                        variant={integration.status === "Available" ? "default" : "outline"}
                        disabled={integration.status === "Coming Soon"}
                        asChild={integration.status === "Available"}
                      >
                        {integration.status === "Available" ? (
                          <Link href="/contact" className="btn-classic">
                            <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                            <span className="truncate">Set Up Integration</span>
                          </Link>
                        ) : (
                          <span className={integration.status === "Available" ? "btn-classic" : "btn-classic-outline"}>
                            {integration.status === "Beta" ? "Join Beta" : "Coming Soon"}
                          </span>
                        )}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}z
        </div>
      </div>      {/* API Section */}
      <div className="relative py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-[#F3F1E9]/50 dark:bg-[#2A2A2A]/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
          <div className="order-2 lg:order-1">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#2D2C2A] dark:text-[#ECE8D9] mb-6 sm:mb-8 font-serif-display">
              Build Custom Travel Integrations
            </h2>
            <p className="text-[#5A5A5A] dark:text-[#B6B6B6] text-base sm:text-lg leading-relaxed mb-6 sm:mb-8 font-serif">
              Don't see your platform? Use our comprehensive REST API and webhooks to build custom integrations for any travel service. Our developer-friendly documentation makes it easy to get started.
            </p>

            <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
              <div className="flex items-center space-x-3">
                <Zap className="h-4 w-4 sm:h-5 sm:w-5 text-[#8E735B] dark:text-[#BBA588] flex-shrink-0" />
                <span className="text-[#5A5A5A] dark:text-[#B6B6B6] text-sm sm:text-base font-serif">RESTful API with OpenAPI specification</span>
              </div>
              <div className="flex items-center space-x-3">
                <Zap className="h-4 w-4 sm:h-5 sm:w-5 text-[#8E735B] dark:text-[#BBA588] flex-shrink-0" />
                <span className="text-[#5A5A5A] dark:text-[#B6B6B6] text-sm sm:text-base font-serif">Real-time webhooks for travel events</span>
              </div>
              <div className="flex items-center space-x-3">
                <Zap className="h-4 w-4 sm:h-5 sm:w-5 text-[#8E735B] dark:text-[#BBA588] flex-shrink-0" />
                <span className="text-[#5A5A5A] dark:text-[#B6B6B6] text-sm sm:text-base font-serif">SDKs for popular languages</span>
              </div>
              <div className="flex items-center space-x-3">
                <Zap className="h-4 w-4 sm:h-5 sm:w-5 text-[#8E735B] dark:text-[#BBA588] flex-shrink-0" />
                <span className="text-[#5A5A5A] dark:text-[#B6B6B6] text-sm sm:text-base font-serif">Comprehensive documentation</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Button className="bg-gradient-to-r from-[#8E735B] via-[#BBA588] to-[#7C6D64] text-white hover:opacity-90 transition-opacity h-11 sm:h-12 px-6 sm:px-8 font-serif-display" asChild>
                <Link href="/api">
                  View API Docs
                </Link>
              </Button>
              <Button variant="outline" className="h-11 sm:h-12 px-6 sm:px-8 border-[#BBA588]/40 text-[#8E735B] dark:text-[#BBA588] hover:bg-[#8E735B]/10 dark:hover:bg-[#BBA588]/10 font-serif-display" asChild>
                <Link href="/contact">
                  Request Integration
                </Link>
              </Button>
            </div>
          </div>
          <div className="order-1 lg:order-2 glass-classic border-[#BBA588]/40 dark:border-[#BBA588]/20 rounded-2xl p-4 sm:p-6 lg:p-8 shadow-2xl">
            <div className="bg-[#2D2C2A] rounded-lg p-4 sm:p-6 text-[#ECE8D9] font-mono text-xs sm:text-sm overflow-x-auto">
              <div className="mb-3 sm:mb-4 text-[#7C6D64]">{'// Example API Integration: Find a local restaurant'}</div>
              <div className="space-y-1 sm:space-y-2 whitespace-nowrap">
                <div><span className="text-[#BBA588]">POST</span> /api/v1/query</div>
                <div className="text-[#7C6D64]">{`{`}</div>
                <div className="ml-2 sm:ml-4"><span className="text-[#D4C3A9]">{`"audio"`}</span>: <span className="text-[#BBA588]">{`"base64_encoded_audio_of_find_restaurants"`}</span>,</div>
                <div className="ml-2 sm:ml-4"><span className="text-[#D4C3A9]">{`"location"`}</span>: <span className="text-[#BBA588]">{`"current"`}</span>,</div>
                <div className="ml-2 sm:ml-4"><span className="text-[#D4C3A9]">{`"webhook_url"`}</span>: <span className="text-[#BBA588]">{`"your-webhook"`}</span></div>
                <div className="text-[#7C6D64]">{`}`}</div>
                <div className="mt-3 sm:mt-4 text-[#7C6D64]">{'// Response'}</div>
                <div className="text-[#7C6D64]">{`{`}</div>
                <div className="ml-2 sm:ml-4"><span className="text-[#D4C3A9]">{`"transcript"`}</span>: <span className="text-[#BBA588]">{`"Find restaurants near me"`}</span>,</div>
                <div className="ml-2 sm:ml-4"><span className="text-[#D4C3A9]">{`"intent"`}</span>: <span className="text-[#BBA588]">{`"find_restaurant"`}</span>,</div>
                <div className="ml-2 sm:ml-4"><span className="text-[#D4C3A9]">{`"results"`}</span>: [...]</div>
                <div className="text-[#7C6D64]">{`}`}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>      {/* CTA Section */}
      <div className="relative py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#2D2C2A] dark:text-[#ECE8D9] mb-6 sm:mb-8 font-serif-display">
            Ready to Transform Your Travels?
          </h2>
          <p className="text-[#5A5A5A] dark:text-[#B6B6B6] text-base sm:text-lg lg:text-xl mb-10 sm:mb-12 leading-relaxed px-4 sm:px-0 font-serif">
            Start connecting Voce with your travel apps and services today. Our team is here to help you create unforgettable, authentic experiences.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4 sm:px-0">
            <Button size="lg" className="btn-classic text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 h-12 sm:h-14 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 font-serif-display" asChild>
              <Link href="/contact">
                Get Integration Support
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="btn-classic-outline text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 h-12 sm:h-14 rounded-xl transition-all duration-300 hover:shadow-lg font-serif-display" asChild>
              <Link href="/api">
                View Documentation
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}