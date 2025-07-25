"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ThemeToggle } from "@/components/theme-toggle"
import { Footer } from "@/components/footer"
import { Navbar } from "@/components/navbar"
import Link from "next/link"
import {
  ArrowLeft,
  Shield,
  User,
  Download,
  Trash2,
  Edit,
  Eye,
  Lock,
  Globe,
  CheckCircle,
  AlertCircle,
  Clock,
  Mail,
  FileText,
  Settings,
  Users,
  Database,
  Scale,
  Mic
} from "lucide-react"

export default function GDPRPage() {
  const dataRights = [
    {
      icon: <Eye className="h-6 w-6" />,
      title: "Right to Access",
      description: "Request a copy of all personal data we hold about you",
      action: "Request Data Export",
      timeframe: "Within 30 days",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: <Edit className="h-6 w-6" />,
      title: "Right to Rectification",
      description: "Correct or update any inaccurate personal information",
      action: "Update Information",
      timeframe: "Immediate",
      color: "from-green-500 to-green-600"
    },
    {
      icon: <Trash2 className="h-6 w-6" />,
      title: "Right to Erasure",
      description: "Request deletion of your personal data ('Right to be Forgotten')",
      action: "Delete Account",
      timeframe: "Within 30 days",
      color: "from-red-500 to-red-600"
    },
    {
      icon: <Lock className="h-6 w-6" />,
      title: "Right to Restrict Processing",
      description: "Limit how we process your personal data",
      action: "Restrict Processing",
      timeframe: "Within 30 days",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: <Download className="h-6 w-6" />,
      title: "Right to Data Portability",
      description: "Transfer your data to another service provider",
      action: "Export Data",
      timeframe: "Within 30 days",
      color: "from-cyan-500 to-cyan-600"
    },
    {
      icon: <AlertCircle className="h-6 w-6" />,
      title: "Right to Object",
      description: "Object to processing of your personal data",
      action: "File Objection",
      timeframe: "Within 30 days",
      color: "from-orange-500 to-orange-600"
    }
  ]

  const dataCategories = [
    {
      category: "Account Information",
      data: ["Name", "Email address", "Phone number", "Company details", "Job title"],
      purpose: "Account management and authentication",
      retention: "Until account deletion + 30 days",
      lawfulBasis: "Contract performance"
    },
    {
      category: "Usage Data",
      data: ["Voice interactions", "Chat transcripts", "Feature usage", "Login times"],
      purpose: "Service improvement and analytics",
      retention: "2 years from last activity",
      lawfulBasis: "Legitimate interest"
    },
    {
      category: "Technical Data",
      data: ["IP address", "Browser type", "Device information", "Cookies"],
      purpose: "Security and service delivery",
      retention: "1 year",
      lawfulBasis: "Legitimate interest"
    },
    {
      category: "Communication Data",
      data: ["Support tickets", "Email correspondence", "Survey responses"],
      purpose: "Customer support and feedback",
      retention: "3 years",
      lawfulBasis: "Legitimate interest"
    },
    {
      category: "Billing Information",
      data: ["Payment details", "Invoice history", "Subscription status"],
      purpose: "Payment processing and billing",
      retention: "7 years (legal requirement)",
      lawfulBasis: "Contract performance"
    }
  ]

  const dataProcessingActivities = [
    {
      activity: "Voice AI Processing",
      description: "Converting speech to text and generating responses",
      dataTypes: ["Voice recordings", "Speech patterns", "Language preferences"],
      recipients: ["Internal teams", "AI processing partners"],
      safeguards: ["End-to-end encryption", "Data minimization", "Regular deletion"]
    },
    {
      activity: "Analytics & Insights",
      description: "Understanding user behavior to improve our services",
      dataTypes: ["Usage patterns", "Feature interactions", "Performance metrics"],
      recipients: ["Internal analytics team", "Trusted analytics providers"],
      safeguards: ["Data anonymization", "Aggregated reporting", "Limited retention"]
    },
    {
      activity: "Customer Support",
      description: "Providing technical assistance and resolving issues",
      dataTypes: ["Support requests", "Account information", "Communication history"],
      recipients: ["Support team", "Technical specialists"],
      safeguards: ["Access controls", "Audit logging", "Confidentiality agreements"]
    },
    {
      activity: "Marketing Communications",
      description: "Sending relevant product updates and promotional content",
      dataTypes: ["Email address", "Communication preferences", "Engagement data"],
      recipients: ["Marketing team", "Email service providers"],
      safeguards: ["Opt-out mechanisms", "Consent management", "Data encryption"]
    }
  ]
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F3F1E9] via-[#ECE8D9] to-[#F3F1E9] dark:from-[#1E1E1E] dark:via-[#2A2A2A] dark:to-[#1E1E1E] transition-all duration-500">
      {/* Classic Background Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-48 -right-48 w-96 h-96 gradient-classic-mesh rounded-full blur-3xl opacity-30 animate-float"></div>
        <div className="absolute -bottom-48 -left-48 w-96 h-96 bg-gradient-to-tr from-[#BBA588]/20 via-[#8E735B]/20 to-[#7C6D64]/20 rounded-full blur-3xl opacity-30 animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-r from-[#BBA588]/10 to-[#8E735B]/10 rounded-full blur-2xl animate-pulse-slow"></div>
      </div>

      <Navbar />      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-12 lg:mb-16">
          <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-[#8E735B] to-[#BBA588] rounded-full mb-4 sm:mb-6 shadow-lg animate-pulse">
            <Scale className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2D2C2A] dark:text-[#ECE8D9] mb-4 sm:mb-6 animate-fade-in px-2 font-serif-display">
            GDPR Compliance
          </h1>
          <p className="text-lg sm:text-xl text-[#5A5A5A] dark:text-[#B6B6B6] max-w-3xl mx-auto leading-relaxed animate-fade-in px-4 font-serif" style={{ animationDelay: '0.2s' }}>
            Your privacy rights matter to us. Learn how Voce complies with the General Data Protection Regulation (GDPR) and how you can exercise your data protection rights.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4 mt-6 animate-fade-in px-4" style={{ animationDelay: '0.3s' }}>
            <Badge variant="outline" className="bg-[#F3F1E9]/50 dark:bg-[#1E1E1E]/50 text-xs sm:text-sm border-[#BBA588]/40 text-[#8E735B] dark:text-[#BBA588]">
              <CheckCircle className="h-3 w-3 mr-1 text-[#8E735B] dark:text-[#BBA588]" />
              EU Compliant
            </Badge>
            <Badge variant="outline" className="bg-[#F3F1E9]/50 dark:bg-[#1E1E1E]/50 text-xs sm:text-sm border-[#BBA588]/40 text-[#8E735B] dark:text-[#BBA588]">
              <Shield className="h-3 w-3 mr-1 text-[#8E735B] dark:text-[#BBA588]" />
              Privacy by Design
            </Badge>
            <Badge variant="outline" className="bg-[#F3F1E9]/50 dark:bg-[#1E1E1E]/50 text-xs sm:text-sm border-[#BBA588]/40 text-[#8E735B] dark:text-[#BBA588]">
              <Globe className="h-3 w-3 mr-1 text-[#8E735B] dark:text-[#BBA588]" />
              Global Standards
            </Badge>
          </div>
        </div>        {/* GDPR Overview */}
        <Card className="glass-classic border-[#BBA588]/40 dark:border-[#BBA588]/20 shadow-2xl mb-8 sm:mb-12 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="flex items-center space-x-2 text-[#2D2C2A] dark:text-[#ECE8D9] text-lg sm:text-xl font-serif-display">
              <FileText className="h-5 w-5 text-[#8E735B] dark:text-[#BBA588] flex-shrink-0" />
              <span>About GDPR</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0">
            <p className="text-[#5A5A5A] dark:text-[#B6B6B6] leading-relaxed mb-6 text-sm sm:text-base font-serif">
              The General Data Protection Regulation (GDPR) is a comprehensive data protection law that took effect across the European Union on May 25, 2018. It gives individuals more control over their personal data and imposes strict rules on those who collect, process, and store personal information.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              <div className="text-center p-3 sm:p-4 bg-[#BBA588]/10 dark:bg-[#BBA588]/10 rounded-lg">
                <User className="h-6 w-6 sm:h-8 sm:w-8 text-[#8E735B] dark:text-[#BBA588] mx-auto mb-2" />
                <h3 className="font-semibold text-[#2D2C2A] dark:text-[#ECE8D9] mb-2 text-sm sm:text-base font-serif-display">Individual Rights</h3>
                <p className="text-xs sm:text-sm text-[#5A5A5A] dark:text-[#B6B6B6] font-serif">Enhanced control over personal data</p>
              </div>
              <div className="text-center p-3 sm:p-4 bg-[#8E735B]/10 dark:bg-[#8E735B]/10 rounded-lg">
                <Shield className="h-6 w-6 sm:h-8 sm:w-8 text-[#8E735B] dark:text-[#BBA588] mx-auto mb-2" />
                <h3 className="font-semibold text-[#2D2C2A] dark:text-[#ECE8D9] mb-2 text-sm sm:text-base font-serif-display">Data Protection</h3>
                <p className="text-xs sm:text-sm text-[#5A5A5A] dark:text-[#B6B6B6] font-serif">Stronger security and privacy measures</p>
              </div>
              <div className="text-center p-3 sm:p-4 bg-[#7C6D64]/10 dark:bg-[#7C6D64]/10 rounded-lg sm:col-span-2 lg:col-span-1">
                <Scale className="h-6 w-6 sm:h-8 sm:w-8 text-[#8E735B] dark:text-[#BBA588] mx-auto mb-2" />
                <h3 className="font-semibold text-[#2D2C2A] dark:text-[#ECE8D9] mb-2 text-sm sm:text-base font-serif-display">Accountability</h3>
                <p className="text-xs sm:text-sm text-[#5A5A5A] dark:text-[#B6B6B6] font-serif">Organizations must demonstrate compliance</p>
              </div>
            </div>
          </CardContent>
        </Card>        {/* Your Data Rights */}
        <div className="mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#2D2C2A] dark:text-[#ECE8D9] mb-6 sm:mb-8 animate-fade-in px-2 font-serif-display" style={{ animationDelay: '0.5s' }}>
            Your Data Protection Rights
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
            {dataRights.map((right, index) => (
              <Card key={index} className="glass-classic border-[#BBA588]/40 dark:border-[#BBA588]/20 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] animate-fade-in" style={{ animationDelay: `${0.6 + index * 0.1}s` }}>
                <CardHeader className="p-4 sm:p-6">
                  <div className={`inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#BBA588] to-[#8E735B] rounded-lg mb-4 shadow-lg text-white flex-shrink-0`}>
                    {right.icon}
                  </div>
                  <CardTitle className="text-[#2D2C2A] dark:text-[#ECE8D9] text-base sm:text-lg font-serif-display">{right.title}</CardTitle>
                  <p className="text-[#5A5A5A] dark:text-[#B6B6B6] text-xs sm:text-sm font-serif">{right.description}</p>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-0">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs sm:text-sm">
                      <span className="text-[#5A5A5A] dark:text-[#B6B6B6] font-serif">Response Time:</span>
                      <Badge variant="outline" className="text-xs border-[#BBA588]/40 text-[#8E735B] dark:text-[#BBA588]">{right.timeframe}</Badge>
                    </div>
                    <Button className="w-full btn-classic text-xs sm:text-sm">
                      {right.action}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>        {/* Data We Collect */}
        <Card className="glass-classic border-[#BBA588]/40 dark:border-[#BBA588]/20 shadow-2xl mb-8 sm:mb-12 animate-fade-in" style={{ animationDelay: '1s' }}>
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="flex items-center space-x-2 text-[#2D2C2A] dark:text-[#ECE8D9] text-lg sm:text-xl font-serif-display">
              <Database className="h-5 w-5 text-[#8E735B] dark:text-[#BBA588] flex-shrink-0" />
              <span>Data We Collect and Process</span>
            </CardTitle>
            <p className="text-[#5A5A5A] dark:text-[#B6B6B6] text-sm sm:text-base font-serif">
              Transparency about what personal data we collect, why we collect it, and how long we keep it.
            </p>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0">
            <div className="space-y-4 sm:space-y-6">
              {dataCategories.map((category, index) => (
                <div key={index} className="border border-[#BBA588]/20 dark:border-[#BBA588]/20 rounded-lg p-3 sm:p-4">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3 space-y-2 sm:space-y-0">
                    <h3 className="font-semibold text-[#2D2C2A] dark:text-[#ECE8D9] text-sm sm:text-base font-serif-display">{category.category}</h3>
                    <Badge variant="outline" className="self-start text-xs border-[#BBA588]/40 text-[#8E735B] dark:text-[#BBA588]">{category.lawfulBasis}</Badge>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-xs sm:text-sm">
                    <div>
                      <p className="text-[#5A5A5A] dark:text-[#B6B6B6] mb-2 font-serif">
                        <strong>Data Types:</strong>
                      </p>
                      <ul className="text-[#5A5A5A] dark:text-[#B6B6B6] space-y-1 font-serif">
                        {category.data.map((item, i) => (
                          <li key={i}>• {item}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <p className="text-[#5A5A5A] dark:text-[#B6B6B6] font-serif">
                        <strong>Purpose:</strong> {category.purpose}
                      </p>
                      <p className="text-[#5A5A5A] dark:text-[#B6B6B6] font-serif">
                        <strong>Retention:</strong> {category.retention}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>        {/* Data Processing Activities */}
        <Card className="glass-classic border-[#BBA588]/40 dark:border-[#BBA588]/20 shadow-2xl mb-8 sm:mb-12 animate-fade-in" style={{ animationDelay: '1.1s' }}>
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="flex items-center space-x-2 text-[#2D2C2A] dark:text-[#ECE8D9] text-lg sm:text-xl font-serif-display">
              <Settings className="h-5 w-5 text-[#8E735B] dark:text-[#BBA588] flex-shrink-0" />
              <span>How We Process Your Data</span>
            </CardTitle>
            <p className="text-[#5A5A5A] dark:text-[#B6B6B6] text-sm sm:text-base font-serif">
              Details about our data processing activities and the safeguards we have in place.
            </p>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0">
            <div className="space-y-4 sm:space-y-6">
              {dataProcessingActivities.map((activity, index) => (
                <div key={index} className="border border-[#BBA588]/20 dark:border-[#BBA588]/20 rounded-lg p-3 sm:p-4">
                  <h3 className="font-semibold text-[#2D2C2A] dark:text-[#ECE8D9] mb-2 text-sm sm:text-base font-serif-display">{activity.activity}</h3>
                  <p className="text-[#5A5A5A] dark:text-[#B6B6B6] text-xs sm:text-sm mb-3 font-serif">{activity.description}</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 text-xs sm:text-sm">
                    <div>
                      <p className="font-medium text-[#2D2C2A] dark:text-[#ECE8D9] mb-1 font-serif-display">Data Types:</p>
                      <ul className="text-[#5A5A5A] dark:text-[#B6B6B6] space-y-1 font-serif">
                        {activity.dataTypes.map((type, i) => (
                          <li key={i}>• {type}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="font-medium text-[#2D2C2A] dark:text-[#ECE8D9] mb-1 font-serif-display">Recipients:</p>
                      <ul className="text-[#5A5A5A] dark:text-[#B6B6B6] space-y-1 font-serif">
                        {activity.recipients.map((recipient, i) => (
                          <li key={i}>• {recipient}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="md:col-span-2 xl:col-span-1">
                      <p className="font-medium text-[#2D2C2A] dark:text-[#ECE8D9] mb-1 font-serif-display">Safeguards:</p>
                      <ul className="text-[#5A5A5A] dark:text-[#B6B6B6] space-y-1 font-serif">
                        {activity.safeguards.map((safeguard, i) => (
                          <li key={i}>• {safeguard}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>        {/* International Transfers */}
        <Card className="glass-classic border-[#BBA588]/40 dark:border-[#BBA588]/20 shadow-2xl mb-8 sm:mb-12 animate-fade-in" style={{ animationDelay: '1.2s' }}>
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="flex items-center space-x-2 text-[#2D2C2A] dark:text-[#ECE8D9] text-lg sm:text-xl font-serif-display">
              <Globe className="h-5 w-5 text-[#8E735B] dark:text-[#BBA588] flex-shrink-0" />
              <span>International Data Transfers</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-[#2D2C2A] dark:text-[#ECE8D9] mb-3 text-sm sm:text-base font-serif-display">Transfer Safeguards</h3>
                <p className="text-[#5A5A5A] dark:text-[#B6B6B6] text-xs sm:text-sm mb-4 font-serif">
                  When we transfer personal data outside the EEA, we ensure appropriate safeguards are in place:
                </p>
                <ul className="space-y-2 text-xs sm:text-sm text-[#5A5A5A] dark:text-[#B6B6B6]">
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-[#8E735B] dark:text-[#BBA588] mt-0.5 flex-shrink-0" />
                    <span className="font-serif">Standard Contractual Clauses (SCCs)</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-[#8E735B] dark:text-[#BBA588] mt-0.5 flex-shrink-0" />
                    <span className="font-serif">Adequacy decisions by the European Commission</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-[#8E735B] dark:text-[#BBA588] mt-0.5 flex-shrink-0" />
                    <span className="font-serif">Binding Corporate Rules (BCRs)</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-[#8E735B] dark:text-[#BBA588] mt-0.5 flex-shrink-0" />
                    <span className="font-serif">Certification mechanisms</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-[#2D2C2A] dark:text-[#ECE8D9] mb-3 text-sm sm:text-base font-serif-display">Transfer Recipients</h3>
                <p className="text-[#5A5A5A] dark:text-[#B6B6B6] text-xs sm:text-sm mb-4 font-serif">
                  We may transfer data to the following regions with appropriate safeguards:
                </p>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-2 bg-[#BBA588]/10 dark:bg-[#BBA588]/10 rounded">
                    <span className="text-xs sm:text-sm text-[#5A5A5A] dark:text-[#B6B6B6] font-serif">United States</span>
                    <Badge variant="outline" className="text-xs border-[#BBA588]/40 text-[#8E735B] dark:text-[#BBA588]">EU-US DPF</Badge>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-[#8E735B]/10 dark:bg-[#8E735B]/10 rounded">
                    <span className="text-xs sm:text-sm text-[#5A5A5A] dark:text-[#B6B6B6] font-serif">United Kingdom</span>
                    <Badge variant="outline" className="text-xs border-[#BBA588]/40 text-[#8E735B] dark:text-[#BBA588]">Adequacy Decision</Badge>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-[#7C6D64]/10 dark:bg-[#7C6D64]/10 rounded">
                    <span className="text-xs sm:text-sm text-[#5A5A5A] dark:text-[#B6B6B6] font-serif">Canada</span>
                    <Badge variant="outline" className="text-xs border-[#BBA588]/40 text-[#8E735B] dark:text-[#BBA588]">Adequacy Decision</Badge>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>        {/* Data Protection Officer & Contact */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-8 sm:mb-12">
          <Card className="glass-classic border-[#BBA588]/40 dark:border-[#BBA588]/20 shadow-xl animate-fade-in" style={{ animationDelay: '1.3s' }}>
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="flex items-center space-x-2 text-[#2D2C2A] dark:text-[#ECE8D9] text-lg sm:text-xl font-serif-display">
                <Users className="h-5 w-5 text-[#8E735B] dark:text-[#BBA588] flex-shrink-0" />
                <span>Data Protection Officer</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0">
              <p className="text-[#5A5A5A] dark:text-[#B6B6B6] mb-4 text-xs sm:text-sm font-serif">
                Our Data Protection Officer (DPO) oversees our GDPR compliance and is available to address your privacy concerns.
              </p>
              <div className="space-y-2 text-xs sm:text-sm">
                <p className="text-[#5A5A5A] dark:text-[#B6B6B6] font-serif">
                  <strong>Email:</strong> dpo@Voce.com
                </p>
                <p className="text-[#5A5A5A] dark:text-[#B6B6B6] font-serif">
                  <strong>Response Time:</strong> Within 72 hours
                </p>
              </div>
              <Button className="w-full mt-4 btn-classic text-xs sm:text-sm">
                <Mail className="h-4 w-4 mr-2" />
                Contact DPO
              </Button>
            </CardContent>
          </Card>

          <Card className="glass-classic border-[#BBA588]/40 dark:border-[#BBA588]/20 shadow-xl animate-fade-in" style={{ animationDelay: '1.4s' }}>
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="flex items-center space-x-2 text-[#2D2C2A] dark:text-[#ECE8D9] text-lg sm:text-xl font-serif-display">
                <Scale className="h-5 w-5 text-[#8E735B] dark:text-[#BBA588] flex-shrink-0" />
                <span>Supervisory Authority</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0">
              <p className="text-[#5A5A5A] dark:text-[#B6B6B6] mb-4 text-xs sm:text-sm font-serif">
                You have the right to lodge a complaint with your local supervisory authority if you believe we have not handled your data properly.
              </p>
              <div className="space-y-2 text-xs sm:text-sm">
                <p className="text-[#5A5A5A] dark:text-[#B6B6B6] font-serif">
                  <strong>EU Residents:</strong> Your local Data Protection Authority
                </p>
                <p className="text-[#5A5A5A] dark:text-[#B6B6B6] font-serif">
                  <strong>Lead Authority:</strong> Irish Data Protection Commission
                </p>
              </div>
              <Button variant="outline" className="w-full mt-4 text-xs sm:text-sm btn-classic-outline">
                <Globe className="h-4 w-4 mr-2" />
                Find Your Authority
              </Button>
            </CardContent>
          </Card>
        </div>        {/* Exercise Your Rights */}
        <Card className="glass-classic border-[#BBA588]/40 dark:border-[#BBA588]/20 shadow-2xl animate-fade-in" style={{ animationDelay: '1.5s' }}>
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="flex items-center space-x-2 text-[#2D2C2A] dark:text-[#ECE8D9] text-lg sm:text-xl font-serif-display">
              <CheckCircle className="h-5 w-5 text-[#8E735B] dark:text-[#BBA588] flex-shrink-0" />
              <span>Exercise Your Rights</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0">
            <p className="text-[#5A5A5A] dark:text-[#B6B6B6] mb-6 text-sm sm:text-base font-serif">
              Ready to exercise your GDPR rights? Use our self-service portal or contact our Data Protection Officer for assistance.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              <Button className="btn-classic text-xs sm:text-sm">
                <Download className="h-4 w-4 mr-2" />
                Request Data Export
              </Button>
              <Button variant="outline" className="text-xs sm:text-sm btn-classic-outline">
                <Edit className="h-4 w-4 mr-2" />
                Update Information
              </Button>
              <Button variant="outline" className="sm:col-span-2 lg:col-span-1 text-xs sm:text-sm btn-classic-outline">
                <Mail className="h-4 w-4 mr-2" />
                Contact Support
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  )
}
