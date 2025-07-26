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
  const lastUpdated = "July 15, 2025"
  const effectiveDate = "August 1, 2025"

  const sections = [
    {
      id: "acceptance",
      title: "Acceptance of Terms",
      icon: <CheckCircle className="h-5 w-5" />,
      content: [
        {
          subtitle: "Agreement to Terms",
          points: [
            "By accessing or using the Voce service, you agree to be bound by these Terms of Service.",
            "If you do not agree to these terms, you may not use our services.",
            "These terms apply to all users, including individual travelers and partner accounts (e.g., hotels).",
            "Additional terms may apply to specific features or partner plans."
          ]
        },
        {
          subtitle: "Capacity to Enter Agreement",
          points: [
            "You must be at least 18 years old to create an account and use Voce services.",
            "If you're using Voce on behalf of an organization, you confirm you have the authority to bind that organization.",
            "You represent that all information you provide is accurate and complete.",
            "You will keep your account and contact information up to date."
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
          subtitle: "What Voce Provides",
          points: [
            "An AI-powered voice agent that provides travel guidance and local information via a phone call.",
            "Multilingual support to help travelers overcome language barriers.",
            "The ability to connect with travel partners for bookings and reservations, at your request.",
            "Personalized travel recommendations and a history of your explored places."
          ]
        },
        {
          subtitle: "Service Availability",
          points: [
            "We aim for high availability but do not guarantee uninterrupted service.",
            "Services may be temporarily unavailable for maintenance, updates, or unforeseen outages.",
            "We reserve the right to modify or discontinue features with reasonable notice.",
            "Partner accounts may have specific support terms and Service Level Agreements (SLAs)."
          ]
        },
        {
          subtitle: "Service Limitations",
          points: [
            "Voce is a travel guide, not a replacement for human judgment or emergency services.",
            "AI-generated information may not always be perfect; please verify critical details like opening hours.",
            "We are not responsible for the quality or safety of services provided by third-party venues we recommend.",
            "Use of the service is subject to fair use policies to ensure availability for all travelers."
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
            "You are responsible for maintaining the confidentiality of your account credentials.",
            "You must notify us immediately of any unauthorized use of your account.",
            "You are liable for all activities that occur under your account.",
            "Use a strong, unique password and enable two-factor authentication if available."
          ]
        },
        {
          subtitle: "Acceptable Use",
          points: [
            "Use Voce only for lawful, travel-related purposes.",
            "Do not attempt to hack, reverse engineer, or compromise our systems.",
            "Respect the privacy and rights of others when using the service.",
            "Do not use the service to spam, harass, or engage in fraudulent activities."
          ]
        },
        {
          subtitle: "Prohibited Activities",
          points: [
            "Uploading malicious code, viruses, or harmful content.",
            "Attempting to gain unauthorized access to our systems or other users' data.",
            "Using the service for illegal activities or to violate applicable laws.",
            "Reselling or redistributing our services without explicit authorization."
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
            "You retain ownership of all personal data and travel history you create with Voce.",
            "We do not claim ownership of your call recordings or travel preferences.",
            "You grant us a limited license to process your data solely to provide and improve our services.",
            "You can export or delete your data at any time through your account settings."
          ]
        },
        {
          subtitle: "Data Processing",
          points: [
            "We process your data in accordance with our Privacy Policy.",
            "Data is used to provide the service, improve AI model accuracy, and ensure security.",
            "We may aggregate and anonymize data for research to understand traveler trends.",
            "Data sharing with travel partners (for bookings) only occurs with your explicit consent."
          ]
        },
        {
          subtitle: "Data Security",
          points: [
            "We implement industry-standard security measures to protect your data.",
            "All voice communications are encrypted in transit and at rest.",
            "We conduct regular security audits and compliance assessments.",
            "In case of a data breach, we will notify affected users as required by law."
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
          subtitle: "Plans and Passes",
          points: [
            "Voce offers various plans, including per-trip passes and monthly subscriptions for frequent travelers.",
            "Billing cycles are specified at the time of purchase.",
            "All fees are in Indian Rupees (INR) unless otherwise specified.",
            "Prices are subject to change with 30 days' notice to existing subscribers."
          ]
        },
        {
          subtitle: "Payment Terms",
          points: [
            "Payment is due in advance for each pass or billing period.",
            "We accept major credit cards, debit cards, and popular digital payment methods.",
            "Failed payments may result in service suspension or account termination.",
            "You are responsible for any applicable taxes or payment processing fees."
          ]
        },
        {
          subtitle: "Refunds and Cancellations",
          points: [
            "You may cancel your subscription at any time through your account settings.",
            "Cancellations take effect at the end of the current billing period.",
            "No refunds are provided for trip passes or partial billing periods, except as required by law.",
            "Partners may have different refund terms as outlined in their service agreement."
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
          subtitle: "Voce IP Rights",
          points: [
            "Voce and all related technology are owned by Voce Technologies Pvt. Ltd.",
            "Our trademarks, logos, and brand elements are protected intellectual property.",
            "You may not copy, modify, or create derivative works of our service or software.",
            "Any feedback or suggestions you provide may be used by us without compensation."
          ]
        },
        {
          subtitle: "User Content License",
          points: [
            "You retain ownership of the personal content and data you generate.",
            "You grant us a license to host, display, and process your content to provide the service.",
            "This license is limited, non-exclusive, and terminates when you delete your content.",
            "You are responsible for ensuring you have the right to any information you provide."
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
            "The Voce service is provided \"as is\" without warranties of any kind.",
            "We do not guarantee that the service will be error-free or uninterrupted.",
            "AI-generated responses may not always be accurate or complete. You use the information at your own risk.",
            "Voce is not liable for the actions, quality, or safety of any third-party services it may suggest."
          ]
        },
        {
          subtitle: "Liability Limitations",
          points: [
            "Our total liability is limited to the amount you paid to us in the last 12 months.",
            "We are not liable for indirect, incidental, or consequential damages.",
            "This includes lost enjoyment, data loss, or travel interruption.",
            "Some jurisdictions may not allow these limitations, so they may not apply to you."
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
            "You may terminate your account at any time through your account settings.",
            "Upon termination, your access to the service will be immediately revoked.",
            "Your data will be deleted according to our data retention policy.",
            "Some provisions of these terms, such as liability limitations, will survive termination."
          ]
        },
        {
          subtitle: "Termination by Voce",
          points: [
            "We may terminate accounts for violation of these terms or applicable laws.",
            "We may suspend service for non-payment or other billing issues.",
            "In case of termination for cause, no refunds will be provided.",
            "We will provide notice when possible, except in cases of serious violations."
          ]
        }
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F3F1E9] via-[#ECE8D9] to-[#F3F1E9] dark:from-[#1E1E1E] dark:via-[#2A2A2A] dark:to-[#1E1E1E] transition-all duration-500">
      {/* Classic Background Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-[#BBA588]/10 to-[#8E735B]/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-gradient-to-br from-[#7C6D64]/10 to-[#BBA588]/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-[#8E735B]/10 to-[#BBA588]/10 rounded-full blur-3xl animate-pulse-slow"></div>
      </div>
      <Navbar />      <div className="relative pt-20 sm:pt-24 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">{/* Header */}
          {/* Header */}
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <Badge className="mb-4 sm:mb-6 bg-gradient-to-r from-[#F3F1E9] via-[#ECE8D9] to-[#F3F1E9] text-[#8E735B] border-[#BBA588]/50 dark:from-[#1E1E1E]/80 dark:via-[#2A2A2A]/80 dark:to-[#1E1E1E]/80 dark:text-[#BBA588] dark:border-[#BBA588]/30 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium shadow-md font-serif">
              ⚖️ Legal Agreement
            </Badge>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 sm:mb-8 font-serif-display">
              <span className="block text-[#2D2C2A] dark:text-[#ECE8D9] mb-1 sm:mb-2">Terms of</span>
              <span className="block bg-gradient-to-r from-[#8E735B] via-[#BBA588] to-[#7C6D64] bg-clip-text text-transparent">
                Service
              </span>
            </h1>

            <p className="text-base sm:text-lg lg:text-xl text-[#5A5A5A] dark:text-[#B6B6B6] max-w-3xl mx-auto leading-relaxed mb-4 sm:mb-6 px-4 sm:px-6 font-serif">
              These terms govern your use of the Voce travel assistance service. Please read them carefully
              as they contain important information about your rights and obligations as a traveler.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-6 text-xs sm:text-sm text-[#7C6D64] dark:text-[#B6B6B6] px-4">
              <div className="flex items-center space-x-1">
                <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="font-serif">Last Updated: {lastUpdated}</span>
              </div>
              <span className="hidden sm:block">•</span>
              <div className="flex items-center space-x-1">
                <Globe className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="font-serif">Effective: {effectiveDate}</span>
              </div>
            </div>
          </div>          {/* Important Notice */}
          <div className="mb-8 sm:mb-12 lg:mb-16">
            <Card className="glass-classic border-[#7C6D64]/50 dark:border-[#7C6D64]/50 shadow-lg">
              <CardContent className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-start space-y-3 sm:space-y-0 sm:space-x-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#7C6D64]/20 to-[#8E735B]/20 backdrop-blur-sm rounded-xl flex items-center justify-center flex-shrink-0 mx-auto sm:mx-0">
                    <AlertTriangle className="h-5 w-5 sm:h-6 sm:w-6 text-[#7C6D64] dark:text-[#BBA588]" />
                  </div>
                  <div className="text-center sm:text-left">
                    <h3 className="text-base sm:text-lg font-semibold text-[#2D2C2A] dark:text-[#ECE8D9] mb-2 font-serif-display">
                      Important Legal Notice
                    </h3>
                    <p className="text-sm sm:text-base text-[#5A5A5A] dark:text-[#B6B6B6] leading-relaxed font-serif">
                      These Terms of Service constitute a legally binding agreement between you and
                      Voce Technologies Pvt. Ltd. By using our service, you acknowledge that
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
              <Card key={index} className="glass-classic border-[#BBA588]/30 dark:border-[#BBA588]/20 shadow-lg">
                <CardHeader className="pb-4 sm:pb-6">
                  <CardTitle className="flex flex-col sm:flex-row sm:items-center text-xl sm:text-2xl text-[#2D2C2A] dark:text-[#ECE8D9] space-y-2 sm:space-y-0 font-serif-display">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-[#BBA588]/20 to-[#8E735B]/20 backdrop-blur-sm rounded-lg flex items-center justify-center text-[#8E735B] dark:text-[#BBA588] sm:mr-4 mx-auto sm:mx-0">
                      {section.icon}
                    </div>
                    <span className="text-center sm:text-left">{section.title}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 sm:space-y-6 p-4 sm:p-6">
                  {section.content.map((subsection, subIndex) => (
                    <div key={subIndex}>
                      <h3 className="text-base sm:text-lg font-semibold text-[#2D2C2A] dark:text-[#ECE8D9] mb-2 sm:mb-3 font-serif-display">
                        {subsection.subtitle}
                      </h3>
                      <ul className="space-y-1.5 sm:space-y-2">
                        {subsection.points.map((point, pointIndex) => (
                          <li key={pointIndex} className="flex items-start space-x-2 sm:space-x-3">
                            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#BBA588] rounded-full mt-1.5 sm:mt-2 flex-shrink-0"></div>
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
          </div>          {/* Governing Law */}
          <div className="mt-8 sm:mt-12 lg:mt-16">
            <Card className="glass-classic border-[#BBA588]/30 dark:border-[#BBA588]/20 shadow-lg">
              <CardHeader className="pb-4 sm:pb-6">
                <CardTitle className="flex flex-col sm:flex-row sm:items-center text-xl sm:text-2xl text-[#2D2C2A] dark:text-[#ECE8D9] space-y-2 sm:space-y-0 font-serif-display">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-[#7C6D64]/20 to-[#BBA588]/20 backdrop-blur-sm rounded-lg flex items-center justify-center text-[#7C6D64] dark:text-[#BBA588] sm:mr-4 mx-auto sm:mx-0">
                    <Scale className="h-4 w-4 sm:h-5 sm:w-5" />
                  </div>
                  <span className="text-center sm:text-left">Governing Law & Dispute Resolution</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6">
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-[#2D2C2A] dark:text-[#ECE8D9] mb-2 sm:mb-3 font-serif-display">
                    Applicable Law
                  </h3>
                  <p className="text-sm sm:text-base text-[#5A5A5A] dark:text-[#B6B6B6] leading-relaxed font-serif">
                    These Terms of Service shall be governed by and construed in accordance with the laws of India,
                    without regard to its conflict of law provisions. Any legal action or proceeding arising under
                    these terms will be brought exclusively in the courts of Bangalore, Karnataka, India.
                  </p>
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-[#2D2C2A] dark:text-[#ECE8D9] mb-2 sm:mb-3 font-serif-display">
                    Dispute Resolution
                  </h3>
                  <p className="text-sm sm:text-base text-[#5A5A5A] dark:text-[#B6B6B6] leading-relaxed font-serif">
                    Before filing any formal legal proceedings, we encourage you to contact us at legal@Voce.ai
                    to seek a resolution. We are committed to resolving disputes amicably and in good faith.
                    For partners, specific dispute resolution procedures may be outlined in your service agreement.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>          {/* Contact Information */}
          <div className="mt-8 sm:mt-12 lg:mt-16">
            <Card className="glass-classic-strong border-[#BBA588]/40 dark:border-[#BBA588]/20 shadow-2xl">
              <CardContent className="p-6 sm:p-8 lg:p-12 text-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-[#BBA588]/20 to-[#8E735B]/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  <FileText className="h-6 w-6 sm:h-8 sm:w-8 text-[#8E735B] dark:text-[#BBA588]" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#2D2C2A] dark:text-[#ECE8D9] mb-3 sm:mb-4 font-serif-display">
                  Questions About These Terms?
                </h2>
                <p className="text-base sm:text-lg lg:text-xl text-[#5A5A5A] dark:text-[#B6B6B6] mb-6 sm:mb-8 max-w-2xl mx-auto px-4 font-serif">
                  Our legal team is available to help clarify any questions about these terms of service.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center max-w-md sm:max-w-none mx-auto">
                  <Link href="/contact" className="w-full sm:w-auto">
                    <Button size="lg" className="w-full btn-classic text-base sm:text-lg px-6 sm:px-8 py-2.5 sm:py-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 font-serif">
                      Contact Legal Team
                    </Button>
                  </Link>
                  <Link href="/privacy" className="w-full sm:w-auto">
                    <Button size="lg" variant="outline" className="w-full btn-classic-outline shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-base sm:text-lg px-6 sm:px-8 py-2.5 sm:py-3 font-serif">
                      View Privacy Policy
                    </Button>
                  </Link>
                </div>

                <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-[#BBA588]/20 dark:border-[#BBA588]/10">
                  <p className="text-xs sm:text-sm text-[#7C6D64] dark:text-[#B6B6B6] px-4 font-serif">
                    Legal Contact: legal@Voce.ai |
                    Voce Technologies Pvt. Ltd., Bangalore, Karnataka, India
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