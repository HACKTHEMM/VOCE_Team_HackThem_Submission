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
  const lastUpdated = "December 15, 2023"

  const sections = [
    {
      id: "information-we-collect",
      title: "Information We Collect",
      icon: <Database className="h-5 w-5" />,
      content: [
        {
          subtitle: "Information You Provide",
          points: [
            "Account information (name, email, phone number)",
            "Voice recordings and chat messages during conversations",
            "Profile preferences and settings",
            "Payment and billing information",
            "Support communications and feedback"
          ]
        },
        {
          subtitle: "Automatically Collected Information", 
          points: [
            "Device information (IP address, browser type, operating system)",
            "Usage analytics (feature usage, session duration, interaction patterns)",
            "Technical logs for debugging and performance monitoring",
            "Cookies and similar tracking technologies"
          ]
        },
        {
          subtitle: "Third-Party Information",
          points: [
            "Integration data from connected CRM and e-commerce platforms",
            "Social media profile information (if you choose to connect)",
            "Publicly available business information for verification"
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
            "Process and respond to your voice and text conversations",
            "Provide AI-powered sales assistance and recommendations",
            "Maintain conversation history and context",
            "Enable multilingual communication capabilities"
          ]
        },
        {
          subtitle: "Service Improvement",
          points: [
            "Improve AI model accuracy and response quality",
            "Develop new features and capabilities",
            "Analyze usage patterns to optimize performance",
            "Conduct research and development"
          ]
        },
        {
          subtitle: "Business Operations",
          points: [
            "Process payments and manage subscriptions",
            "Provide customer support and technical assistance",
            "Send service updates and important notifications",
            "Ensure security and prevent fraud"
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
          subtitle: "We Do Not Sell Personal Data",
          points: [
            "SalesSpeak never sells your personal information to third parties",
            "We do not use your data for advertising outside our platform",
            "Your conversation data remains confidential and private"
          ]
        },
        {
          subtitle: "Limited Sharing Scenarios",
          points: [
            "Service providers (cloud hosting, payment processing, analytics)",
            "Legal compliance (when required by law or legal process)",
            "Business transfers (in case of merger, acquisition, or sale)",
            "Consent-based sharing (only with your explicit permission)"
          ]
        },
        {
          subtitle: "Integrated Platform Data",
          points: [
            "Data synchronization with your connected CRM systems",
            "Integration updates to your e-commerce platforms",
            "Only data necessary for the integration functionality"
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
            "End-to-end encryption for all voice and text communications",
            "AES-256 encryption for data at rest",
            "TLS 1.3 encryption for data in transit",
            "Regular security audits and penetration testing"
          ]
        },
        {
          subtitle: "Access Controls",
          points: [
            "Multi-factor authentication for team accounts",
            "Role-based access control with granular permissions",
            "Regular access reviews and deprovisioning",
            "Secure API authentication with rate limiting"
          ]
        },
        {
          subtitle: "Compliance & Certifications",
          points: [
            "SOC 2 Type II certified security controls",
            "GDPR compliance for European users",
            "ISO 27001 information security standards",
            "Regular third-party security assessments"
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
            "View and download your personal data at any time",
            "Update or correct your account information",
            "Delete your account and associated data",
            "Export conversation history and settings"
          ]
        },
        {
          subtitle: "Communication Preferences",
          points: [
            "Opt-out of marketing communications",
            "Control notification settings and frequency",
            "Choose which data to share with integrations",
            "Manage cookie and tracking preferences"
          ]
        },
        {
          subtitle: "Regional Rights",
          points: [
            "GDPR rights for EU residents (access, rectification, erasure)",
            "CCPA rights for California residents",
            "Data localization options for enterprise customers",
            "Right to data portability across platforms"
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
            "Active account data: Retained while account is active",
            "Conversation history: Retained for 3 years after last activity",
            "Analytics data: Aggregated and anonymized after 2 years",
            "Support tickets: Retained for 5 years for quality assurance"
          ]
        },
        {
          subtitle: "Automatic Deletion",
          points: [
            "Inactive accounts automatically deleted after 2 years",
            "Temporary data (cache, logs) deleted within 30 days",
            "Payment information purged after subscription ends",
            "Marketing data removed upon opt-out request"
          ]
        },
        {
          subtitle: "User-Initiated Deletion",
          points: [
            "Immediate account deletion available in settings",
            "Conversation data deleted within 30 days of request",
            "Some data may be retained for legal compliance",
            "Anonymized analytics data may be preserved"
          ]
        }
      ]
    }
  ]
  return (    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/50 to-violet-50/50 dark:from-slate-950 dark:via-blue-950/50 dark:to-violet-950/50 transition-all duration-700">
      {/* Enhanced Background Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-48 -right-48 w-64 h-64 sm:w-96 sm:h-96 gradient-mesh rounded-full blur-3xl opacity-20 sm:opacity-30 animate-float"></div>
        <div className="absolute -bottom-48 -left-48 w-64 h-64 sm:w-96 sm:h-96 bg-gradient-to-tr from-cyan-400/20 via-blue-500/20 to-violet-600/20 rounded-full blur-3xl opacity-20 sm:opacity-30 animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 sm:w-72 sm:h-72 bg-gradient-to-r from-blue-400/10 to-violet-600/10 rounded-full blur-2xl animate-pulse-slow"></div>
      </div>      <Navbar />      
      <div className="relative pt-16 sm:pt-20 md:pt-24 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 sm:mb-16">
            <Badge className="mb-4 sm:mb-6 bg-gradient-to-r from-blue-100 to-violet-100 text-blue-800 border-blue-200/50 dark:from-blue-900/30 dark:to-violet-900/30 dark:text-blue-300 dark:border-blue-600/30 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium shadow-md">
              🛡️ Your Privacy Matters
            </Badge>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 sm:mb-8">
              <span className="block text-slate-900 dark:text-white mb-1 sm:mb-2">Privacy</span>
              <span className="block bg-gradient-to-r from-blue-600 via-violet-600 to-cyan-600 bg-clip-text text-transparent">
                Policy
              </span>
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed mb-4 sm:mb-6 px-2">
              We're committed to protecting your privacy and being transparent about how we collect, 
              use, and protect your personal information.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
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
            <Card className="glass-strong border-white/30 dark:border-slate-700/50 shadow-2xl">
              <CardHeader className="pb-4 sm:pb-6">
                <CardTitle className="flex flex-col sm:flex-row items-start sm:items-center text-xl sm:text-2xl">
                  <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 mb-2 sm:mb-0 sm:mr-3 text-green-600 flex-shrink-0" />
                  Privacy at a Glance
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                  <div className="space-y-3">
                    <div className="flex items-start sm:items-center space-x-3">
                      <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 flex-shrink-0 mt-0.5 sm:mt-0" />
                      <span className="text-sm sm:text-base text-slate-700 dark:text-slate-300">We never sell your personal data</span>
                    </div>
                    <div className="flex items-start sm:items-center space-x-3">
                      <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 flex-shrink-0 mt-0.5 sm:mt-0" />
                      <span className="text-sm sm:text-base text-slate-700 dark:text-slate-300">End-to-end encryption for all communications</span>
                    </div>
                    <div className="flex items-start sm:items-center space-x-3">
                      <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 flex-shrink-0 mt-0.5 sm:mt-0" />
                      <span className="text-sm sm:text-base text-slate-700 dark:text-slate-300">Full control over your data and privacy settings</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start sm:items-center space-x-3">
                      <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 flex-shrink-0 mt-0.5 sm:mt-0" />
                      <span className="text-sm sm:text-base text-slate-700 dark:text-slate-300">GDPR and CCPA compliant</span>
                    </div>
                    <div className="flex items-start sm:items-center space-x-3">
                      <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 flex-shrink-0 mt-0.5 sm:mt-0" />
                      <span className="text-sm sm:text-base text-slate-700 dark:text-slate-300">SOC 2 certified security controls</span>
                    </div>
                    <div className="flex items-start sm:items-center space-x-3">
                      <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 flex-shrink-0 mt-0.5 sm:mt-0" />
                      <span className="text-sm sm:text-base text-slate-700 dark:text-slate-300">Transparent data practices</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>          {/* Privacy Sections */}
          <div className="space-y-8 sm:space-y-12">
            {sections.map((section, index) => (
              <Card key={index} className="glass border-white/30 dark:border-slate-700/50 shadow-lg">
                <CardHeader className="pb-4 sm:pb-6">
                  <CardTitle className="flex flex-col sm:flex-row items-start sm:items-center text-xl sm:text-2xl text-slate-900 dark:text-white">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 to-violet-600 rounded-lg flex items-center justify-center text-white mb-3 sm:mb-0 sm:mr-4 flex-shrink-0">
                      {section.icon}
                    </div>
                    <span className="leading-tight">{section.title}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 sm:space-y-6 pt-0">
                  {section.content.map((subsection, subIndex) => (
                    <div key={subIndex}>
                      <h3 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-white mb-2 sm:mb-3">
                        {subsection.subtitle}
                      </h3>
                      <ul className="space-y-2">
                        {subsection.points.map((point, pointIndex) => (
                          <li key={pointIndex} className="flex items-start space-x-3">
                            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-500 rounded-full mt-1.5 sm:mt-2 flex-shrink-0"></div>
                            <span className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
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
            <Card className="glass-strong border-white/30 dark:border-slate-700/50 shadow-2xl">
              <CardContent className="p-6 sm:p-8 md:p-12 text-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 to-violet-600 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  <FileText className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-3 sm:mb-4">
                  Questions About Privacy?
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-300 mb-6 sm:mb-8 max-w-2xl mx-auto px-2">
                  We're here to help you understand how we protect your data. 
                  Contact our privacy team for any questions or concerns.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                  <Link href="/contact" className="w-full sm:w-auto">
                    <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-blue-500 via-violet-500 to-purple-500 hover:from-blue-600 hover:via-violet-600 hover:to-purple-600 text-base sm:text-lg px-6 sm:px-8 py-2.5 sm:py-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                      Contact Privacy Team
                    </Button>
                  </Link>
                  <Link href="/help" className="w-full sm:w-auto">
                    <Button size="lg" variant="outline" className="w-full sm:w-auto border-2 border-slate-300 text-slate-700 hover:bg-white/20 backdrop-blur-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-base sm:text-lg px-6 sm:px-8 py-2.5 sm:py-3">
                      View Help Center
                    </Button>
                  </Link>
                </div>
                
                <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-slate-200 dark:border-slate-700">
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 px-2 break-words">
                    <span className="block sm:inline">Privacy Officer Contact: privacy@salesspeak.ai</span>
                    <span className="hidden sm:inline mx-2">|</span>
                    <span className="block sm:inline mt-1 sm:mt-0">Data Protection Officer: dpo@salesspeak.ai</span>
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
