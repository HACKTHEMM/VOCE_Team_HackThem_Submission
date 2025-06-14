"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ThemeToggle } from "@/components/theme-toggle"
import { Footer } from "@/components/footer"
import { Navbar } from "@/components/navbar"
import { 
  
  FileText, 
  Scale, 
  Shield,
  AlertTriangle,
  CheckCircle,
  Globe,
  Calendar,
  Users,
  CreditCard,
  Zap,
  Ban,
  Mic,
  ArrowRight
} from "lucide-react"
import Link from "next/link"

export default function TermsPage() {
  const lastUpdated = "December 15, 2023"
  const effectiveDate = "January 1, 2024"

  const sections = [
    {
      id: "acceptance",
      title: "Acceptance of Terms",
      icon: <CheckCircle className="h-5 w-5" />,
      content: [
        {
          subtitle: "Agreement to Terms",
          points: [
            "By accessing or using SalesSpeak services, you agree to be bound by these Terms of Service",
            "If you do not agree to these terms, you may not use our services",
            "These terms apply to all users, including visitors, registered users, and enterprise customers",
            "Additional terms may apply to specific features or enterprise plans"
          ]
        },
        {
          subtitle: "Capacity to Enter Agreement",
          points: [
            "You must be at least 18 years old to use SalesSpeak services",
            "If you're using SalesSpeak on behalf of an organization, you have authority to bind that organization",
            "You represent that all information provided is accurate and complete",
            "You will keep your account information up to date"
          ]
        }
      ]
    },
    {
      id: "service-description",
      title: "Service Description",
      icon: <Zap className="h-5 w-5" />,
      content: [
        {
          subtitle: "What SalesSpeak Provides",
          points: [
            "AI-powered conversational sales assistant with voice and text capabilities",
            "Multilingual support for 10+ Indian languages and English",
            "Integration with CRM systems, e-commerce platforms, and business tools",
            "Analytics and insights for conversation performance and customer behavior"
          ]
        },
        {
          subtitle: "Service Availability",
          points: [
            "We aim for 99.9% uptime but do not guarantee uninterrupted service",
            "Services may be temporarily unavailable for maintenance or updates",
            "We reserve the right to modify or discontinue features with notice",
            "Enterprise customers receive priority support and SLA guarantees"
          ]
        },
        {
          subtitle: "Service Limitations",
          points: [
            "SalesSpeak is not a replacement for human judgment or decision-making",
            "AI responses are generated based on training data and may not always be perfect",
            "We do not guarantee specific business outcomes or sales results",
            "Use of the service is subject to fair use policies and rate limits"
          ]
        }
      ]
    },
    {
      id: "user-responsibilities",
      title: "User Responsibilities & Conduct",
      icon: <Users className="h-5 w-5" />,
      content: [
        {
          subtitle: "Account Security",
          points: [
            "You are responsible for maintaining the confidentiality of your account credentials",
            "You must notify us immediately of any unauthorized use of your account",
            "You are liable for all activities that occur under your account",
            "Use strong passwords and enable two-factor authentication when available"
          ]
        },
        {
          subtitle: "Acceptable Use",
          points: [
            "Use SalesSpeak only for lawful business purposes",
            "Do not attempt to hack, reverse engineer, or compromise our systems",
            "Respect the privacy and rights of other users and customers",
            "Do not use the service to spam, harass, or engage in fraudulent activities"
          ]
        },
        {
          subtitle: "Prohibited Activities",
          points: [
            "Uploading malicious code, viruses, or harmful content",
            "Attempting to gain unauthorized access to our systems or user data",
            "Using the service for illegal activities or to violate applicable laws",
            "Reselling or redistributing our services without authorization"
          ]
        }
      ]
    },
    {
      id: "data-and-privacy",
      title: "Data Ownership & Privacy",
      icon: <Shield className="h-5 w-5" />,
      content: [
        {
          subtitle: "Your Data Ownership",
          points: [
            "You retain ownership of all data you input into SalesSpeak",
            "We do not claim ownership of your conversation data or business information",
            "You grant us a limited license to process your data to provide our services",
            "You can export or delete your data at any time through your account settings"
          ]
        },
        {
          subtitle: "Data Processing",
          points: [
            "We process your data in accordance with our Privacy Policy",
            "Data is used to provide services, improve AI models, and ensure security",
            "We may aggregate and anonymize data for research and development purposes",
            "Third-party integrations may involve data sharing as described in our Privacy Policy"
          ]
        },
        {
          subtitle: "Data Security",
          points: [
            "We implement industry-standard security measures to protect your data",
            "All communications are encrypted in transit and at rest",
            "We conduct regular security audits and compliance assessments",
            "In case of a data breach, we will notify affected users as required by law"
          ]
        }
      ]
    },
    {
      id: "billing-and-payments",
      title: "Billing & Payments",
      icon: <CreditCard className="h-5 w-5" />,
      content: [
        {
          subtitle: "Subscription Plans",
          points: [
            "SalesSpeak offers various subscription plans with different features and limits",
            "Billing cycles are monthly or annual, as selected during signup",
            "All fees are in Indian Rupees (INR) unless otherwise specified",
            "Prices are subject to change with 30 days' notice to existing customers"
          ]
        },
        {
          subtitle: "Payment Terms",
          points: [
            "Payment is due in advance for each billing period",
            "We accept major credit cards, debit cards, and digital payment methods",
            "Failed payments may result in service suspension or account termination",
            "You are responsible for any bank charges, taxes, or payment processing fees"
          ]
        },
        {
          subtitle: "Refunds and Cancellations",
          points: [
            "You may cancel your subscription at any time through your account settings",
            "Cancellations take effect at the end of the current billing period",
            "No refunds are provided for partial billing periods, except as required by law",
            "Enterprise customers may have different refund terms in their service agreement"
          ]
        }
      ]
    },
    {
      id: "intellectual-property",
      title: "Intellectual Property",
      icon: <FileText className="h-5 w-5" />,
      content: [
        {
          subtitle: "SalesSpeak IP Rights",
          points: [
            "SalesSpeak and all related technology are owned by SalesSpeak Technologies Pvt. Ltd.",
            "Our trademarks, logos, and brand elements are protected intellectual property",
            "You may not copy, modify, or create derivative works of our software",
            "Any feedback or suggestions you provide may be used by us without compensation"
          ]
        },
        {
          subtitle: "User Content License",
          points: [
            "You retain ownership of content you create using SalesSpeak",
            "You grant us a license to host, display, and process your content to provide services",
            "This license is limited, non-exclusive, and terminates when you delete content",
            "You are responsible for ensuring you have rights to any content you upload"
          ]
        }
      ]
    },
    {
      id: "limitation-of-liability",
      title: "Limitation of Liability",
      icon: <Scale className="h-5 w-5" />,
      content: [
        {
          subtitle: "Service Disclaimers",
          points: [
            "SalesSpeak is provided \"as is\" without warranties of any kind",
            "We do not guarantee that the service will be error-free or uninterrupted",
            "AI-generated responses may not always be accurate or appropriate",
            "You use the service at your own risk and discretion"
          ]
        },
        {
          subtitle: "Liability Limitations",
          points: [
            "Our total liability is limited to the amount you paid in the last 12 months",
            "We are not liable for indirect, incidental, or consequential damages",
            "This includes lost profits, data loss, or business interruption",
            "Some jurisdictions may not allow these limitations, so they may not apply to you"
          ]
        }
      ]
    },
    {
      id: "termination",
      title: "Termination",
      icon: <Ban className="h-5 w-5" />,
      content: [
        {
          subtitle: "Termination by You",
          points: [
            "You may terminate your account at any time through account settings",
            "Upon termination, your access to the service will be immediately revoked",
            "Your data will be deleted according to our data retention policy",
            "Some provisions of these terms will survive termination"
          ]
        },
        {
          subtitle: "Termination by SalesSpeak",
          points: [
            "We may terminate accounts for violation of these terms or applicable laws",
            "We may suspend service for non-payment or other billing issues",
            "In case of termination for cause, no refunds will be provided",
            "We will provide notice when possible, except in cases of serious violations"
          ]
        }
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-blue-50 to-cyan-50 dark:from-slate-950 dark:via-blue-950 dark:to-violet-950 transition-all duration-500">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/10 to-violet-600/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-gradient-to-br from-violet-400/10 to-pink-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-cyan-400/10 to-blue-600/10 rounded-full blur-3xl animate-pulse-slow"></div>
      </div>
      <Navbar />      <div className="relative pt-20 sm:pt-24 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">{/* Header */}
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <Badge className="mb-4 sm:mb-6 bg-gradient-to-r from-blue-100 to-violet-100 text-blue-800 border-blue-200/50 dark:from-blue-900/30 dark:to-violet-900/30 dark:text-blue-300 dark:border-blue-600/30 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium shadow-md">
              ⚖️ Legal Agreement
            </Badge>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 sm:mb-8">
              <span className="block text-slate-900 dark:text-white mb-1 sm:mb-2">Terms of</span>
              <span className="block bg-gradient-to-r from-blue-600 via-violet-600 to-cyan-600 bg-clip-text text-transparent">
                Service
              </span>
            </h1>
            
            <p className="text-base sm:text-lg lg:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed mb-4 sm:mb-6 px-4 sm:px-6">
              These terms govern your use of SalesSpeak services. Please read them carefully 
              as they contain important information about your rights and obligations.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-6 text-xs sm:text-sm text-slate-500 dark:text-slate-400 px-4">
              <div className="flex items-center space-x-1">
                <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
                <span>Last Updated: {lastUpdated}</span>
              </div>
              <span className="hidden sm:block">•</span>
              <div className="flex items-center space-x-1">
                <Globe className="h-3 w-3 sm:h-4 sm:w-4" />
                <span>Effective: {effectiveDate}</span>
              </div>
            </div>
          </div>          {/* Important Notice */}
          <div className="mb-8 sm:mb-12 lg:mb-16">
            <Card className="glass border-orange-200/50 dark:border-orange-800/50 shadow-lg">
              <CardContent className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-start space-y-3 sm:space-y-0 sm:space-x-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center flex-shrink-0 mx-auto sm:mx-0">
                    <AlertTriangle className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                  </div>
                  <div className="text-center sm:text-left">
                    <h3 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-white mb-2">
                      Important Legal Notice
                    </h3>
                    <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                      These Terms of Service constitute a legally binding agreement between you and 
                      SalesSpeak Technologies Pvt. Ltd. By using our services, you acknowledge that 
                      you have read, understood, and agree to be bound by these terms. If you are 
                      entering into this agreement on behalf of a company or other legal entity, 
                      you represent that you have the authority to bind such entity to these terms.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>          {/* Terms Sections */}
          <div className="space-y-6 sm:space-y-8 lg:space-y-12">
            {sections.map((section, index) => (
              <Card key={index} className="glass border-white/30 dark:border-slate-700/50 shadow-lg">
                <CardHeader className="pb-4 sm:pb-6">
                  <CardTitle className="flex flex-col sm:flex-row sm:items-center text-xl sm:text-2xl text-slate-900 dark:text-white space-y-2 sm:space-y-0">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 to-violet-600 rounded-lg flex items-center justify-center text-white sm:mr-4 mx-auto sm:mx-0">
                      {section.icon}
                    </div>
                    <span className="text-center sm:text-left">{section.title}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 sm:space-y-6 p-4 sm:p-6">
                  {section.content.map((subsection, subIndex) => (
                    <div key={subIndex}>
                      <h3 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-white mb-2 sm:mb-3">
                        {subsection.subtitle}
                      </h3>
                      <ul className="space-y-1.5 sm:space-y-2">
                        {subsection.points.map((point, pointIndex) => (
                          <li key={pointIndex} className="flex items-start space-x-2 sm:space-x-3">
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
          </div>          {/* Governing Law */}
          <div className="mt-8 sm:mt-12 lg:mt-16">
            <Card className="glass border-white/30 dark:border-slate-700/50 shadow-lg">
              <CardHeader className="pb-4 sm:pb-6">
                <CardTitle className="flex flex-col sm:flex-row sm:items-center text-xl sm:text-2xl text-slate-900 dark:text-white space-y-2 sm:space-y-0">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white sm:mr-4 mx-auto sm:mx-0">
                    <Scale className="h-4 w-4 sm:h-5 sm:w-5" />
                  </div>
                  <span className="text-center sm:text-left">Governing Law & Dispute Resolution</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6">
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-white mb-2 sm:mb-3">
                    Applicable Law
                  </h3>
                  <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                    These Terms of Service shall be governed by and construed in accordance with the laws of India, 
                    without regard to its conflict of law provisions. Any legal action or proceeding arising under 
                    these terms will be brought exclusively in the courts of Bangalore, Karnataka, India.
                  </p>
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-white mb-2 sm:mb-3">
                    Dispute Resolution
                  </h3>
                  <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                    Before filing any formal legal proceedings, we encourage you to contact us at legal@salesspeak.ai 
                    to seek a resolution. We are committed to resolving disputes amicably and in good faith. 
                    For enterprise customers, specific dispute resolution procedures may be outlined in your service agreement.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>          {/* Contact Information */}
          <div className="mt-8 sm:mt-12 lg:mt-16">
            <Card className="glass-strong border-white/30 dark:border-slate-700/50 shadow-2xl">
              <CardContent className="p-6 sm:p-8 lg:p-12 text-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 to-violet-600 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  <FileText className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-3 sm:mb-4">
                  Questions About These Terms?
                </h2>
                <p className="text-base sm:text-lg lg:text-xl text-slate-600 dark:text-slate-300 mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
                  Our legal team is available to help clarify any questions about these terms of service.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center max-w-md sm:max-w-none mx-auto">
                  <Link href="/contact" className="w-full sm:w-auto">
                    <Button size="lg" className="w-full bg-gradient-to-r from-blue-500 via-violet-500 to-purple-500 hover:from-blue-600 hover:via-violet-600 hover:to-purple-600 text-base sm:text-lg px-6 sm:px-8 py-2.5 sm:py-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                      Contact Legal Team
                    </Button>
                  </Link>
                  <Link href="/privacy" className="w-full sm:w-auto">
                    <Button size="lg" variant="outline" className="w-full border-2 border-slate-300 text-slate-700 hover:bg-white/20 backdrop-blur-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-base sm:text-lg px-6 sm:px-8 py-2.5 sm:py-3">
                      View Privacy Policy
                    </Button>
                  </Link>
                </div>
                
                <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-slate-200 dark:border-slate-700">
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 px-4">
                    Legal Contact: legal@salesspeak.ai | 
                    SalesSpeak Technologies Pvt. Ltd., Bangalore, Karnataka, India
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