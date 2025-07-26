"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ThemeToggle } from "@/components/theme-toggle"
import { Footer } from "@/components/footer"
import { Navbar } from "@/components/navbar"
import {

  Shield,
  Eye,
  Lock,
  Database,
  Globe,
  FileText,
  CheckCircle,
  AlertTriangle,
  Users,
  Calendar,
  Mic,
  ArrowRight
} from "lucide-react"
import Link from "next/link"

export default function PrivacyPage() {
  const lastUpdated = "July 15, 2025"

  const sections = [
    {
      id: "information-we-collect",
      title: "Information We Collect",
      icon: <Database className="h-5 w-5" />,
      content: [
        {
          subtitle: "Information You Provide",
          points: [
            "Account information (name, email, phone number) for your traveler profile",
            "Voice recordings of your calls for recommendations and assistance",
            "Travel preferences, interests, and past destinations",
            "Payment and billing information for trip passes or subscriptions",
            "Support communications and feedback on your travel experiences"
          ]
        },
        {
          subtitle: "Automatically Collected Information",
          points: [
            "Device information (IP address, browser type, operating system)",
            "Usage data (call duration, features used, cities explored)",
            "Technical logs for debugging and improving call quality",
            "Cookies and similar technologies for website functionality"
          ]
        },
        {
          subtitle: "Third-Party Information",
          points: [
            "Booking information from our travel partners (e.g., hotels) if you link your reservation",
            "Social media profile information if you use it to sign in",
            "Location information (city-level) to provide relevant guidance"
          ]
        }
      ]
    },
    {
      id: "how-we-use-information",
      title: "How We Use Your Information",
      icon: <Eye className="h-5 w-5" />,
      content: [
        {
          subtitle: "Core Service Delivery",
          points: [
            "Process your voice requests to provide local recommendations and guidance",
            "Provide AI-powered travel assistance and personalized suggestions",
            "Maintain your travel history to offer tailored future experiences",
            "Enable multilingual communication with local services and contacts"
          ]
        },
        {
          subtitle: "Service Improvement",
          points: [
            "Improve our AI's accuracy for travel-related queries",
            "Develop new features to make your travels easier",
            "Analyze usage patterns to enhance the user experience",
            "Conduct anonymized research to understand traveler needs"
          ]
        },
        {
          subtitle: "Business Operations",
          points: [
            "Process payments for your trip passes and subscriptions",
            "Provide customer support and resolve any travel-related issues",
            "Send service updates and important travel notifications",
            "Ensure the security of our platform and prevent misuse"
          ]
        }
      ]
    },
    {
      id: "data-sharing",
      title: "Information Sharing & Disclosure",
      icon: <Users className="h-5 w-5" />,
      content: [
        {
          subtitle: "We Do Not Sell Your Personal Data",
          points: [
            "Voce will never sell your personal information to third parties",
            "We do not use your data for advertising outside our platform",
            "Your call recordings and travel history remain confidential"
          ]
        },
        {
          subtitle: "Limited Sharing Scenarios",
          points: [
            "With service providers (cloud hosting, payment processing) who help us operate",
            "To comply with legal obligations or lawful requests",
            "During business transfers like a merger or acquisition",
            "With your explicit consent, for example, to make a booking on your behalf"
          ]
        },
        {
          subtitle: "Travel Partner Data",
          points: [
            "We may share necessary details with a hotel or tour operator to confirm a reservation you requested",
            "Only the minimum information required for the booking is shared",
            "This is only done with your explicit instruction during a call"
          ]
        }
      ]
    },
    {
      id: "data-security",
      title: "Data Security & Protection",
      icon: <Lock className="h-5 w-5" />,
      content: [
        {
          subtitle: "Technical Safeguards",
          points: [
            "End-to-end encryption for all voice communications",
            "AES-256 encryption for your data when stored on our servers",
            "TLS 1.3 encryption for data transmitted over networks",
            "Regular security audits and penetration testing by experts"
          ]
        },
        {
          subtitle: "Access Controls",
          points: [
            "Multi-factor authentication available for your account",
            "Strict internal access controls for Voce employees",
            "Regular reviews of access policies and procedures",
            "Secure API authentication for our travel partners"
          ]
        },
        {
          subtitle: "Compliance & Certifications",
          points: [
            "SOC 2 Type II certified security controls",
            "GDPR compliance for European travelers",
            "ISO 27001 information security standards",
            "Commitment to adhering to global privacy best practices"
          ]
        }
      ]
    },
    {
      id: "your-rights",
      title: "Your Privacy Rights",
      icon: <Shield className="h-5 w-5" />,
      content: [
        {
          subtitle: "Data Access & Control",
          points: [
            "View and download your personal data at any time from your account",
            "Update or correct your account and travel profile information",
            "Delete your account and all associated data permanently",
            "Export your call and travel history"
          ]
        },
        {
          subtitle: "Communication Preferences",
          points: [
            "Opt-out of promotional communications at any time",
            "Control your notification settings for service alerts",
            "Manage which data is shared with any connected travel partners",
            "Manage cookie preferences for our website"
          ]
        },
        {
          subtitle: "Regional Rights",
          points: [
            "GDPR rights for EU residents (access, rectification, erasure)",
            "CCPA rights for California residents",
            "The right to data portability to move your data",
            "Lodge a complaint with your local data protection authority"
          ]
        }
      ]
    },
    {
      id: "data-retention",
      title: "Data Retention & Deletion",
      icon: <Calendar className="h-5 w-5" />,
      content: [
        {
          subtitle: "Retention Periods",
          points: [
            "Active account data: Retained as long as your account is active",
            "Call history: Retained for your convenience, can be deleted by you at any time",
            "Anonymized analytics data may be kept for service improvement",
            "Support correspondence: Retained to ensure quality service"
          ]
        },
        {
          subtitle: "Automatic Deletion",
          points: [
            "Inactive accounts are automatically deleted after 2 years",
            "Temporary data like system logs are cleared within 30 days",
            "Billing information is purged after a subscription ends, as required by law",
            "Marketing data is removed immediately upon opt-out request"
          ]
        },
        {
          subtitle: "User-Initiated Deletion",
          points: [
            "Immediate account deletion is available in your settings",
            "Your personal data is typically deleted within 30 days of a request",
            "Some data may be retained for a limited time for legal or security reasons",
            "Anonymized analytics data is not personally identifiable and may be preserved"
          ]
        }
      ]
    }
  ]
  return (<div className="min-h-screen bg-gradient-to-br from-[#F3F1E9] via-[#ECE8D9] to-[#F3F1E9] dark:from-[#1E1E1E] dark:via-[#2A2A2A] dark:to-[#1E1E1E] transition-all duration-700">
    {/* Classic Background Pattern */}
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute -top-48 -right-48 w-64 h-64 sm:w-96 sm:h-96 gradient-classic-mesh rounded-full blur-3xl opacity-20 sm:opacity-30 animate-float"></div>
      <div className="absolute -bottom-48 -left-48 w-64 h-64 sm:w-96 sm:h-96 bg-gradient-to-tr from-[#BBA588]/20 via-[#8E735B]/20 to-[#7C6D64]/20 rounded-full blur-3xl opacity-20 sm:opacity-30 animate-float" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 sm:w-72 sm:h-72 bg-gradient-to-r from-[#BBA588]/10 to-[#8E735B]/10 rounded-full blur-2xl animate-pulse-slow"></div>
    </div>      <Navbar />
    <div className="relative pt-16 sm:pt-20 md:pt-24 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <Badge className="mb-4 sm:mb-6 bg-gradient-to-r from-[#F3F1E9] via-[#ECE8D9] to-[#F3F1E9] text-[#8E735B] border-[#BBA588]/60 dark:from-[#1E1E1E]/80 dark:via-[#2A2A2A]/80 dark:to-[#1E1E1E]/80 dark:text-[#BBA588] dark:border-[#BBA588]/20 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium shadow-md font-serif">
            🛡️ Your Privacy Matters
          </Badge>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 sm:mb-8 font-serif-display">
            <span className="block text-[#2D2C2A] dark:text-[#ECE8D9] mb-1 sm:mb-2">Privacy</span>
            <span className="block bg-gradient-to-r from-[#8E735B] via-[#BBA588] to-[#7C6D64] bg-clip-text text-transparent">
              Policy
            </span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-[#5A5A5A] dark:text-[#B6B6B6] max-w-3xl mx-auto leading-relaxed mb-4 sm:mb-6 px-2 font-serif">
            We are committed to protecting your privacy and being transparent about how we handle
            your travel data and personal information.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4 text-xs sm:text-sm text-[#5A5A5A] dark:text-[#B6B6B6] font-serif">
            <div className="flex items-center space-x-1">
              <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
              <span>Last Updated: {lastUpdated}</span>
            </div>
            <span className="hidden sm:inline">•</span>
            <div className="flex items-center space-x-1">
              <Globe className="h-3 w-3 sm:h-4 sm:w-4" />
              <span>Effective Globally</span>
            </div>
          </div>
        </div>          {/* Quick Summary */}
        <div className="mb-12 sm:mb-16">
          <Card className="glass-classic border-[#BBA588]/40 dark:border-[#BBA588]/20 shadow-2xl">
            <CardHeader className="pb-4 sm:pb-6">
              <CardTitle className="flex flex-col sm:flex-row items-start sm:items-center text-xl sm:text-2xl font-serif-display text-[#2D2C2A] dark:text-[#ECE8D9]">
                <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 mb-2 sm:mb-0 sm:mr-3 text-[#8E735B] dark:text-[#BBA588] flex-shrink-0" />
                Privacy at a Glance
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-3">
                  <div className="flex items-start sm:items-center space-x-3">
                    <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-[#8E735B] dark:text-[#BBA588] flex-shrink-0 mt-0.5 sm:mt-0" />
                    <span className="text-sm sm:text-base text-[#5A5A5A] dark:text-[#B6B6B6] font-serif">We never sell your personal data</span>
                  </div>
                  <div className="flex items-start sm:items-center space-x-3">
                    <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-[#8E735B] dark:text-[#BBA588] flex-shrink-0 mt-0.5 sm:mt-0" />
                    <span className="text-sm sm:text-base text-[#5A5A5A] dark:text-[#B6B6B6] font-serif">End-to-end encryption for all calls</span>
                  </div>
                  <div className="flex items-start sm:items-center space-x-3">
                    <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-[#8E735B] dark:text-[#BBA588] flex-shrink-0 mt-0.5 sm:mt-0" />
                    <span className="text-sm sm:text-base text-[#5A5A5A] dark:text-[#B6B6B6] font-serif">You have full control over your travel data</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start sm:items-center space-x-3">
                    <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-[#8E735B] dark:text-[#BBA588] flex-shrink-0 mt-0.5 sm:mt-0" />
                    <span className="text-sm sm:text-base text-[#5A5A5A] dark:text-[#B6B6B6] font-serif">GDPR and CCPA compliant</span>
                  </div>
                  <div className="flex items-start sm:items-center space-x-3">
                    <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-[#8E735B] dark:text-[#BBA588] flex-shrink-0 mt-0.5 sm:mt-0" />
                    <span className="text-sm sm:text-base text-[#5A5A5A] dark:text-[#B6B6B6] font-serif">SOC 2 certified security controls</span>
                  </div>
                  <div className="flex items-start sm:items-center space-x-3">
                    <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-[#8E735B] dark:text-[#BBA588] flex-shrink-0 mt-0.5 sm:mt-0" />
                    <span className="text-sm sm:text-base text-[#5A5A5A] dark:text-[#B6B6B6] font-serif">Transparent data and privacy practices</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>          {/* Privacy Sections */}
        <div className="space-y-8 sm:space-y-12">
          {sections.map((section, index) => (
            <Card key={index} id={section.id} className="glass-classic border-[#BBA588]/40 dark:border-[#BBA588]/20 shadow-lg scroll-mt-20">
              <CardHeader className="pb-4 sm:pb-6">
                <CardTitle className="flex flex-col sm:flex-row items-start sm:items-center text-xl sm:text-2xl text-[#2D2C2A] dark:text-[#ECE8D9] font-serif-display">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-[#8E735B] to-[#BBA588] rounded-lg flex items-center justify-center text-[#F3F1E9] mb-3 sm:mb-0 sm:mr-4 flex-shrink-0">
                    {section.icon}
                  </div>
                  <span className="leading-tight">{section.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 sm:space-y-6 pt-0">
                {section.content.map((subsection, subIndex) => (
                  <div key={subIndex}>
                    <h3 className="text-base sm:text-lg font-semibold text-[#2D2C2A] dark:text-[#ECE8D9] mb-2 sm:mb-3 font-serif-display">
                      {subsection.subtitle}
                    </h3>
                    <ul className="space-y-2">
                      {subsection.points.map((point, pointIndex) => (
                        <li key={pointIndex} className="flex items-start space-x-3">
                          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#8E735B] dark:bg-[#BBA588] rounded-full mt-1.5 sm:mt-2 flex-shrink-0"></div>
                          <span className="text-sm sm:text-base text-[#5A5A5A] dark:text-[#B6B6B6] leading-relaxed font-serif">
                            {point}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>          {/* Contact Information */}
        <div className="mt-12 sm:mt-16">
          <Card className="glass-classic border-[#BBA588]/40 dark:border-[#BBA588]/20 shadow-2xl">
            <CardContent className="p-6 sm:p-8 md:p-12 text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-[#8E735B] to-[#BBA588] rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <FileText className="h-6 w-6 sm:h-8 sm:w-8 text-[#F3F1E9]" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#2D2C2A] dark:text-[#ECE8D9] mb-3 sm:mb-4 font-serif-display">
                Questions About Your Privacy?
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-[#5A5A5A] dark:text-[#B6B6B6] mb-6 sm:mb-8 max-w-2xl mx-auto px-2 font-serif">
                We're here to help you understand how we protect your travel data.
                Contact our privacy team for any questions or concerns.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <Link href="/contact" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full sm:w-auto btn-classic text-base sm:text-lg px-6 sm:px-8 py-2.5 sm:py-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 font-serif-display">
                    Contact Privacy Team
                  </Button>
                </Link>
                <Link href="/help" className="w-full sm:w-auto">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto btn-classic-outline shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-base sm:text-lg px-6 sm:px-8 py-2.5 sm:py-3 font-serif-display">
                    View Help Center
                  </Button>
                </Link>
              </div>

              <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-[#BBA588]/30 dark:border-[#BBA588]/20">
                <p className="text-xs sm:text-sm text-[#5A5A5A] dark:text-[#B6B6B6] px-2 break-words font-serif">
                  <span className="block sm:inline">Privacy Officer Contact: privacy@voce.ai</span>
                  <span className="hidden sm:inline mx-2">|</span>
                  <span className="block sm:inline mt-1 sm:mt-0">Data Protection Officer: dpo@voce.ai</span>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>      <Footer />
  </div>
  )
}