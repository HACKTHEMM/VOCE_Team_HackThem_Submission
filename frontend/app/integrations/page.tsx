"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import Link from "next/link"
import { Zap, Database, ShoppingCart, Mail, MessageSquare, Phone, Users, FileText, ExternalLink, ArrowRight } from "lucide-react"
import Image from "next/image"
import { Footer } from "@/components/footer"
import { Navbar } from "@/components/navbar"

export default function IntegrationsPage() {
  const categories = [
    {
      name: "CRM Systems",
      description: "Connect with your customer relationship management tools",
      icon: <Users className="h-6 w-6" />,
      integrations: [
        {
          name: "Salesforce",
          description: "Sync customer data and call logs automatically",
          logo: "/placeholder.svg",
          status: "Available",
          popular: true
        },
        {
          name: "HubSpot",
          description: "Integrate with your sales pipeline and contacts",
          logo: "/placeholder.svg", 
          status: "Available",
          popular: true
        },
        {
          name: "Zoho CRM",
          description: "Connect with India's leading CRM platform",
          logo: "/placeholder.svg",
          status: "Available",
          popular: false
        },
        {
          name: "Pipedrive",
          description: "Streamline your sales process with voice insights",
          logo: "/placeholder.svg",
          status: "Coming Soon",
          popular: false
        }
      ]
    },
    {
      name: "E-commerce Platforms",
      description: "Enhance your online store with voice assistance",
      icon: <ShoppingCart className="h-6 w-6" />,
      integrations: [
        {
          name: "Shopify",
          description: "Voice-powered customer support for your store",
          logo: "/placeholder.svg",
          status: "Available",
          popular: true
        },
        {
          name: "WooCommerce",
          description: "WordPress e-commerce voice integration",
          logo: "/placeholder.svg",
          status: "Available", 
          popular: false
        },
        {
          name: "Magento",
          description: "Enterprise e-commerce voice solutions",
          logo: "/placeholder.svg",
          status: "Beta",
          popular: false
        },
        {
          name: "BigCommerce",
          description: "Scale your voice commerce capabilities",
          logo: "/placeholder.svg",
          status: "Coming Soon",
          popular: false
        }
      ]
    },
    {
      name: "Communication Tools",
      description: "Integrate with your existing communication stack",
      icon: <MessageSquare className="h-6 w-6" />,
      integrations: [
        {
          name: "WhatsApp Business",
          description: "Voice-enabled WhatsApp customer support",
          logo: "/placeholder.svg",
          status: "Available",
          popular: true
        },
        {
          name: "Slack",
          description: "Team notifications and voice insights",
          logo: "/placeholder.svg",
          status: "Available",
          popular: true
        },
        {
          name: "Microsoft Teams",
          description: "Enterprise communication integration",
          logo: "/placeholder.svg",
          status: "Beta",
          popular: false
        },
        {
          name: "Telegram",
          description: "Voice bot for Telegram channels",
          logo: "/placeholder.svg",
          status: "Coming Soon",
          popular: false
        }
      ]
    },
    {
      name: "Analytics & Reporting",
      description: "Connect with your business intelligence tools",
      icon: <Database className="h-6 w-6" />,
      integrations: [
        {
          name: "Google Analytics",
          description: "Track voice interaction metrics",
          logo: "/placeholder.svg",
          status: "Available",
          popular: true
        },
        {
          name: "Mixpanel",
          description: "Advanced conversation analytics",
          logo: "/placeholder.svg",
          status: "Available",
          popular: false
        },
        {
          name: "Tableau",
          description: "Visualize voice interaction data",
          logo: "/placeholder.svg",
          status: "Beta",
          popular: false
        },
        {
          name: "Power BI",
          description: "Microsoft business intelligence integration",
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
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
      case "Beta":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
      case "Coming Soon":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
      default:        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300"
    }
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/50 to-violet-50/50 dark:from-slate-950 dark:via-blue-950/50 dark:to-violet-950/50 transition-all duration-700 overflow-x-hidden">{/* Enhanced Background Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 sm:-top-48 -right-24 sm:-right-48 w-48 h-48 sm:w-96 sm:h-96 gradient-mesh rounded-full blur-3xl opacity-30 animate-float"></div>
        <div className="absolute -bottom-24 sm:-bottom-48 -left-24 sm:-left-48 w-48 h-48 sm:w-96 sm:h-96 bg-gradient-to-tr from-cyan-400/20 via-blue-500/20 to-violet-600/20 rounded-full blur-3xl opacity-30 animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-36 h-36 sm:w-72 sm:h-72 bg-gradient-to-r from-blue-400/10 to-violet-600/10 rounded-full blur-2xl animate-pulse-slow"></div>
      </div>
      <Navbar />      {/* Header */}
      <div className="relative pt-16 sm:pt-20 lg:pt-24 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <Badge className="mb-4 sm:mb-6 bg-gradient-to-r from-blue-100 to-violet-100 text-blue-800 border-blue-200/50 dark:from-blue-900/30 dark:to-violet-900/30 dark:text-blue-300 dark:border-blue-600/30 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium shadow-md">
            🔗 Seamless Integrations
          </Badge>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 sm:mb-8">
            <span className="block text-slate-900 dark:text-white mb-1 sm:mb-2">Connect With</span>
            <span className="block bg-gradient-to-r from-blue-600 via-violet-600 to-cyan-600 bg-clip-text text-transparent animate-gradient">
              Your Stack
            </span>
          </h1>
          
          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg lg:text-xl max-w-4xl mx-auto leading-relaxed mb-8 sm:mb-10 lg:mb-12 px-4 sm:px-0">
            SalesSpeak integrates seamlessly with your existing tools and workflows. Connect with popular platforms to supercharge your voice AI capabilities.
          </p>
          
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 lg:gap-4 px-4 sm:px-0">
            <Badge variant="outline" className="px-2 sm:px-3 lg:px-4 py-1 sm:py-1.5 lg:py-2 text-xs sm:text-sm">
              50+ Integrations Available
            </Badge>
            <Badge variant="outline" className="px-2 sm:px-3 lg:px-4 py-1 sm:py-1.5 lg:py-2 text-xs sm:text-sm">
              RESTful APIs
            </Badge>
            <Badge variant="outline" className="px-2 sm:px-3 lg:px-4 py-1 sm:py-1.5 lg:py-2 text-xs sm:text-sm">
              Webhooks Support
            </Badge>
            <Badge variant="outline" className="px-2 sm:px-3 lg:px-4 py-1 sm:py-1.5 lg:py-2 text-xs sm:text-sm">
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
                  <div className="p-2 sm:p-3 bg-gradient-to-br from-blue-500/20 to-violet-500/20 rounded-xl text-blue-600 dark:text-blue-400">
                    {category.icon}
                  </div>
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-3xl font-bold text-slate-900 dark:text-white mb-3 sm:mb-4">
                  {category.name}
                </h2>
                <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg max-w-2xl mx-auto px-4 sm:px-0">
                  {category.description}
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
                {category.integrations.map((integration, integrationIndex) => (
                  <Card
                    key={integrationIndex}
                    className="group glass-strong border-white/30 dark:border-slate-700/50 hover:border-blue-300/50 dark:hover:border-blue-600/50 transition-all duration-500 shadow-xl hover:shadow-2xl transform hover:scale-105 relative overflow-hidden"
                  >
                    {integration.popular && (
                      <div className="absolute top-0 right-0 bg-gradient-to-l from-blue-500 to-violet-500 text-white text-xs px-2 sm:px-3 py-1 rounded-bl-lg font-medium">
                        Popular
                      </div>
                    )}
                    
                    <CardHeader className="pb-3 sm:pb-4">
                      <div className="flex items-center space-x-3 sm:space-x-4 mb-3 sm:mb-4">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white dark:bg-slate-800 rounded-lg flex items-center justify-center shadow-md flex-shrink-0">
                          <Image
                            src={integration.logo}
                            alt={integration.name}
                            width={28}
                            height={28}
                            className="sm:w-8 sm:h-8 rounded"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <CardTitle className="text-base sm:text-lg font-semibold text-slate-900 dark:text-white truncate">
                            {integration.name}
                          </CardTitle>
                          <Badge className={`mt-1 text-xs ${getStatusColor(integration.status)}`}>
                            {integration.status}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                      <CardContent className="pt-0">
                      <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-4 line-clamp-3 sm:line-clamp-none">
                        {integration.description}
                      </p>
                      
                      <Button 
                        className="w-full text-sm h-9 sm:h-10" 
                        variant={integration.status === "Available" ? "default" : "outline"}
                        disabled={integration.status === "Coming Soon"}
                        asChild={integration.status === "Available"}
                      >
                        {integration.status === "Available" ? (
                          <Link href="/contact">
                            <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                            <span className="truncate">Set Up Integration</span>
                          </Link>
                        ) : (
                          <>
                            {integration.status === "Beta" ? "Join Beta" : "Coming Soon"}
                          </>
                        )}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>      {/* API Section */}
      <div className="relative py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-6 sm:mb-8">
                Build Custom Integrations
              </h2>
              <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed mb-6 sm:mb-8">
                Don't see your platform? Use our comprehensive REST API and webhooks to build custom integrations. Our developer-friendly documentation makes it easy to get started.
              </p>
              
              <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                <div className="flex items-center space-x-3">
                  <Zap className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 flex-shrink-0" />
                  <span className="text-slate-700 dark:text-slate-300 text-sm sm:text-base">RESTful API with OpenAPI specification</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Zap className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 flex-shrink-0" />
                  <span className="text-slate-700 dark:text-slate-300 text-sm sm:text-base">Real-time webhooks for events</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Zap className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 flex-shrink-0" />
                  <span className="text-slate-700 dark:text-slate-300 text-sm sm:text-base">SDKs for popular languages</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Zap className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 flex-shrink-0" />
                  <span className="text-slate-700 dark:text-slate-300 text-sm sm:text-base">Comprehensive documentation</span>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Button className="bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white h-11 sm:h-12 px-6 sm:px-8" asChild>
                  <Link href="/api">
                    View API Docs
                  </Link>
                </Button>
                <Button variant="outline" className="h-11 sm:h-12 px-6 sm:px-8" asChild>
                  <Link href="/contact">
                    Request Integration
                  </Link>
                </Button>
              </div>
            </div>
              <div className="order-1 lg:order-2 glass-strong rounded-2xl p-4 sm:p-6 lg:p-8 shadow-2xl">
              <div className="bg-slate-900 dark:bg-slate-800 rounded-lg p-4 sm:p-6 text-green-400 font-mono text-xs sm:text-sm overflow-x-auto whitespace-nowrap sm:whitespace-normal">
                <div className="mb-3 sm:mb-4 text-slate-400">// Example API Integration</div>
                <div className="space-y-1 sm:space-y-2">
                  <div><span className="text-blue-400">POST</span> /api/v1/conversations</div>
                  <div className="text-slate-400">{`{`}</div>
                  <div className="ml-2 sm:ml-4">"audio": "base64_encoded_audio",</div>
                  <div className="ml-2 sm:ml-4">"language": "hi-IN",</div>
                  <div className="ml-2 sm:ml-4">"webhook_url": "your-webhook"</div>
                  <div className="text-slate-400">{`}`}</div>
                  <div className="mt-3 sm:mt-4 text-slate-400">// Response</div>
                  <div className="text-slate-400">{`{`}</div>
                  <div className="ml-2 sm:ml-4">"transcript": "नमस्ते",</div>
                  <div className="ml-2 sm:ml-4">"confidence": 0.95,</div>
                  <div className="ml-2 sm:ml-4">"language": "hi-IN"</div>
                  <div className="text-slate-400">{`}`}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>      {/* CTA Section */}
      <div className="relative py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-6 sm:mb-8">
            Ready to Integrate?
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg lg:text-xl mb-10 sm:mb-12 leading-relaxed px-4 sm:px-0">
            Start connecting SalesSpeak with your existing tools today. Our team is here to help you every step of the way.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4 sm:px-0">
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 h-12 sm:h-14 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105" asChild>
              <Link href="/contact">
                Get Integration Support
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-white/50 dark:hover:bg-slate-800/50 text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 h-12 sm:h-14 rounded-xl transition-all duration-300 hover:shadow-lg" asChild>
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
