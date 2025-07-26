"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Footer } from "@/components/footer"
import { Navbar } from "@/components/navbar"
import Link from "next/link"
import {
  Cookie,
  Settings,
  Shield,
  Eye,
  BarChart3,
  Users,
  Globe,
  CheckCircle,
  AlertTriangle,
  Info,
  Zap,
  Map,
  Plane
} from "lucide-react"

export default function CookiePolicyPage() {
  const cookieCategories = [
    {
      icon: <Zap className="h-5 w-5" />,
      title: "Essential Cookies",
      description: "Required for basic website and account functionality",
      status: "Always Active",
      statusColor: "bg-green-500",
      cookies: [
        {
          name: "auth_token",
          purpose: "User authentication for your Voce account",
          duration: "30 days"
        },
        {
          name: "session_id",
          purpose: "Maintain your user session on our website",
          duration: "Session"
        },
        {
          name: "csrf_token",
          purpose: "Security protection against unauthorized requests",
          duration: "Session"
        },
        {
          name: "lang_pref",
          purpose: "Remembering your preferred language",
          duration: "1 year"
        }
      ]
    },
    {
      icon: <BarChart3 className="h-5 w-5" />,
      title: "Analytics Cookies",
      description: "Help us understand how travelers use our website",
      status: "Optional",
      statusColor: "bg-blue-500",
      cookies: [
        {
          name: "_ga",
          purpose: "Google Analytics visitor tracking",
          duration: "2 years"
        },
        {
          name: "_gid",
          purpose: "Google Analytics session tracking",
          duration: "24 hours"
        },
        {
          name: "mixpanel_track",
          purpose: "Tracking interactions on our travel guides and blog",
          duration: "1 year"
        },
        {
          name: "hotjar_session",
          purpose: "Improving our website's booking and planning flows",
          duration: "Session"
        }
      ]
    },
    {
      icon: <Map className="h-5 w-5" />,
      title: "Functional Cookies",
      description: "Enable enhanced travel personalization",
      status: "Optional",
      statusColor: "bg-purple-500",
      cookies: [
        {
          name: "theme_preference",
          purpose: "Remember dark/light mode for our website",
          duration: "1 year"
        },
        {
          name: "interest_prefs",
          purpose: "Remembering your travel interests (e.g., history, food)",
          duration: "6 months"
        },
        {
          name: "saved_itineraries",
          purpose: "Storing your saved trip plans and destinations",
          duration: "6 months"
        },
        {
          name: "notification_prefs",
          purpose: "Remembering your notification preferences",
          duration: "1 year"
        }
      ]
    },
    {
      icon: <Plane className="h-5 w-5" />,
      title: "Marketing Cookies",
      description: "Used to deliver personalized travel offers",
      status: "Optional",
      statusColor: "bg-orange-500",
      cookies: [
        {
          name: "fb_pixel",
          purpose: "Facebook advertising for travel packages",
          duration: "90 days"
        },
        {
          name: "google_ads",
          purpose: "Google Ads conversion tracking for new sign-ups",
          duration: "90 days"
        },
        {
          name: "linkedin_insight",
          purpose: "Advertising for our business travel solutions",
          duration: "30 days"
        },
        {
          name: "retargeting_id",
          purpose: "Personalized travel offers and ads",
          duration: "180 days"
        }
      ]
    }
  ]

  const thirdPartyServices = [
    {
      name: "Google Analytics",
      purpose: "Website analytics and user behavior tracking",
      dataShared: "Anonymized usage data, page views, session duration",
      privacyPolicy: "https://policies.google.com/privacy"
    },
    {
      name: "Stripe",
      purpose: "Payment processing for Voce subscriptions and services",
      dataShared: "Billing information, transaction details",
      privacyPolicy: "https://stripe.com/privacy"
    },
    {
      name: "Intercom",
      purpose: "Traveler support and communication",
      dataShared: "Support conversations, user profile data",
      privacyPolicy: "https://www.intercom.com/legal/privacy"
    },
    {
      name: "SendGrid",
      purpose: "Transactional emails (e.g., welcome emails, receipts)",
      dataShared: "Email address, name",
      privacyPolicy: "https://www.twilio.com/legal/privacy"
    }
  ]
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F3F1E9] via-[#ECE8D9] to-[#F3F1E9] dark:from-[#1E1E1E] dark:via-[#2A2A2A] dark:to-[#1E1E1E] transition-all duration-500">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 sm:-top-48 sm:-right-48 w-48 h-48 sm:w-96 sm:h-96 gradient-classic-mesh rounded-full blur-3xl opacity-20 sm:opacity-30 animate-float"></div>
        <div
          className="absolute -bottom-24 -left-24 sm:-bottom-48 sm:-left-48 w-48 h-48 sm:w-96 sm:h-96 bg-gradient-to-tr from-[#BBA588]/20 via-[#8E735B]/20 to-[#7C6D64]/20 rounded-full blur-3xl opacity-20 sm:opacity-30 animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-36 h-36 sm:w-72 sm:h-72 bg-gradient-to-r from-[#BBA588]/10 to-[#8E735B]/10 rounded-full blur-2xl animate-pulse-slow"></div>
      </div>
      <Navbar />
      <div className="max-w-4xl sm:max-w-5xl lg:max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16 relative z-10">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-r from-[#BBA588] to-[#8E735B] rounded-full mb-4 sm:mb-5 md:mb-6 shadow-lg animate-pulse">
            <Cookie className="h-6 sm:h-7 md:h-8 w-6 sm:w-7 md:w-8 text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#2D2C2A] dark:text-[#ECE8D9] mb-4 sm:mb-5 md:mb-6 animate-fade-in font-serif-display">
            Cookie Policy
          </h1>
          <p
            className="text-base sm:text-lg md:text-xl text-[#5A5A5A] dark:text-[#B6B6B6] max-w-3xl mx-auto leading-relaxed animate-fade-in px-2 sm:px-4 font-serif"
            style={{ animationDelay: "0.2s" }}
          >
            Learn how Voce's website uses cookies to support your account,
            personalize your travel planning, and analyze usage to improve our
            service.
          </p>
          <div
            className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 md:gap-4 mt-4 sm:mt-5 md:mt-6 animate-fade-in"
            style={{ animationDelay: "0.3s" }}
          >
            <Badge
              variant="outline"
              className="bg-[#F3F1E9]/50 dark:bg-[#1E1E1E]/80 text-xs sm:text-sm border-[#BBA588]/40 font-serif"
            >
              <CheckCircle className="h-3 w-3 mr-1 text-[#8E735B]" />
              GDPR Compliant
            </Badge>
            <Badge
              variant="outline"
              className="bg-[#F3F1E9]/50 dark:bg-[#1E1E1E]/80 text-xs sm:text-sm border-[#BBA588]/40 font-serif"
            >
              <Shield className="h-3 w-3 mr-1 text-[#8E735B]" />
              Traveler Privacy First
            </Badge>
            <Badge
              variant="outline"
              className="bg-[#F3F1E9]/50 dark:bg-[#1E1E1E]/80 text-xs sm:text-sm border-[#BBA588]/40 font-serif"
            >
              <Settings className="h-3 w-3 mr-1 text-[#7C6D64]" />
              Full Control
            </Badge>
          </div>
        </div>
        <Card
          className="glass-classic border-[#BBA588]/40 dark:border-[#BBA588]/20 shadow-2xl mb-8 sm:mb-10 md:mb-12 animate-fade-in"
          style={{ animationDelay: "0.4s" }}
        >
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="flex items-center space-x-2 text-[#2D2C2A] dark:text-[#ECE8D9] text-lg sm:text-xl font-serif-display">
              <Info className="h-4 w-4 sm:h-5 sm:w-5 text-[#8E735B]" />
              <span>What Are Cookies?</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0">
            <p className="text-[#5A5A5A] dark:text-[#B6B6B6] leading-relaxed mb-4 sm:mb-6 text-sm sm:text-base font-serif">
              While our core voice service works with a simple phone call, our
              website uses cookies—small text files stored on your device—to
              manage your account, remember your preferences, and help you plan
              your travels.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              <div className="text-center p-3 sm:p-4 bg-[#BBA588]/10 dark:bg-[#BBA588]/10 rounded-lg">
                <Eye className="h-6 w-6 sm:h-8 sm:w-8 text-[#8E735B] mx-auto mb-2" />
                <h3 className="font-semibold text-[#2D2C2A] dark:text-[#ECE8D9] mb-2 text-sm sm:text-base font-serif-display">
                  Transparency
                </h3>
                <p className="text-xs sm:text-sm text-[#5A5A5A] dark:text-[#B6B6B6] font-serif">
                  We clearly explain what cookies we use and why
                </p>
              </div>
              <div className="text-center p-3 sm:p-4 bg-[#8E735B]/10 dark:bg-[#8E735B]/10 rounded-lg">
                <Settings className="h-6 w-6 sm:h-8 sm:w-8 text-[#8E735B] mx-auto mb-2" />
                <h3 className="font-semibold text-[#2D2C2A] dark:text-[#ECE8D9] mb-2 text-sm sm:text-base font-serif-display">
                  Control
                </h3>
                <p className="text-xs sm:text-sm text-[#5A5A5A] dark:text-[#B6B6B6] font-serif">
                  You can manage your cookie preferences anytime
                </p>
              </div>
              <div className="text-center p-3 sm:p-4 bg-[#7C6D64]/10 dark:bg-[#7C6D64]/10 rounded-lg sm:col-span-2 lg:col-span-1">
                <Shield className="h-6 w-6 sm:h-8 sm:w-8 text-[#7C6D64] mx-auto mb-2" />
                <h3 className="font-semibold text-[#2D2C2A] dark:text-[#ECE8D9] mb-2 text-sm sm:text-base font-serif-display">
                  Security
                </h3>
                <p className="text-xs sm:text-sm text-[#5A5A5A] dark:text-[#B6B6B6] font-serif">
                  All cookies are secured and privacy-focused
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <div className="mb-8 sm:mb-10 md:mb-12">
          <h2
            className="text-2xl sm:text-3xl font-bold text-[#2D2C2A] dark:text-[#ECE8D9] mb-6 sm:mb-8 animate-fade-in font-serif-display"
            style={{ animationDelay: "0.5s" }}
          >
            Types of Cookies We Use
          </h2>
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
            {cookieCategories.map((category, index) =>
              <Card
                key={index}
                className="glass-classic border-[#BBA588]/40 dark:border-[#BBA588]/20 shadow-xl hover:shadow-2xl transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${0.6 + index * 0.1}s` }}
              >
                <CardHeader className="p-4 sm:p-6">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <CardTitle className="flex items-center space-x-2 sm:space-x-3 text-[#2D2C2A] dark:text-[#ECE8D9] text-base sm:text-lg font-serif-display">
                      <div className="p-1.5 sm:p-2 bg-gradient-to-br from-[#BBA588]/20 to-[#8E735B]/20 rounded-lg text-[#8E735B] dark:text-[#BBA588]">
                        {category.icon}
                      </div>
                      <span>{category.title}</span>
                    </CardTitle>
                    <Badge
                      className={`${category.statusColor} text-white text-xs sm:text-sm font-serif`}
                    >
                      {category.status}
                    </Badge>
                  </div>
                  <p className="text-[#5A5A5A] dark:text-[#B6B6B6] text-sm sm:text-base font-serif">
                    {category.description}
                  </p>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-0">
                  <div className="space-y-3">
                    {category.cookies.map((cookie, cookieIndex) =>
                      <div
                        key={cookieIndex}
                        className="border-l-2 border-[#BBA588]/40 dark:border-[#BBA588]/20 pl-3 sm:pl-4 py-2"
                      >
                        <div className="flex justify-between items-start gap-2">
                          <div className="min-w-0 flex-1">
                            <h4 className="font-semibold text-[#2D2C2A] dark:text-[#ECE8D9] text-sm font-serif-display">
                              {cookie.name}
                            </h4>
                            <p className="text-xs text-[#5A5A5A] dark:text-[#B6B6B6] break-words font-serif">
                              {cookie.purpose}
                            </p>
                          </div>
                          <Badge
                            variant="outline"
                            className="text-xs shrink-0 border-[#BBA588]/40 font-serif"
                          >
                            {cookie.duration}
                          </Badge>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
        <Card
          className="glass-classic border-[#BBA588]/40 dark:border-[#BBA588]/20 shadow-2xl mb-8 sm:mb-10 md:mb-12 animate-fade-in"
          style={{ animationDelay: "1s" }}
        >
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="flex items-center space-x-2 text-[#2D2C2A] dark:text-[#ECE8D9] text-lg sm:text-xl font-serif-display">
              <Globe className="h-4 w-4 sm:h-5 sm:w-5 text-[#8E735B]" />
              <span>Third-Party Services</span>
            </CardTitle>
            <p className="text-[#5A5A5A] dark:text-[#B6B6B6] text-sm sm:text-base font-serif">
              We use trusted third-party services to enhance our platform.
              Here's what data they may collect:
            </p>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0">
            <div className="space-y-4 sm:space-y-6">
              {thirdPartyServices.map((service, index) =>
                <div
                  key={index}
                  className="border border-[#BBA588]/30 dark:border-[#BBA588]/20 rounded-lg p-3 sm:p-4"
                >
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 sm:gap-3 mb-3">
                    <h3 className="font-semibold text-[#2D2C2A] dark:text-[#ECE8D9] text-base sm:text-lg font-serif-display">
                      {service.name}
                    </h3>
                    <Link
                      href={service.privacyPolicy}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#8E735B] hover:text-[#7C6D64] text-sm underline shrink-0 font-serif"
                    >
                      Privacy Policy
                    </Link>
                  </div>
                  <p className="text-sm text-[#5A5A5A] dark:text-[#B6B6B6] mb-2 font-serif">
                    <strong>Purpose:</strong> {service.purpose}
                  </p>
                  <p className="text-sm text-[#5A5A5A] dark:text-[#B6B6B6] font-serif">
                    <strong>Data Shared:</strong> {service.dataShared}
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        <Card
          className="glass-classic border-[#BBA588]/40 dark:border-[#BBA588]/20 shadow-2xl mb-8 sm:mb-10 md:mb-12 animate-fade-in"
          style={{ animationDelay: "1.1s" }}
        >

          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="flex items-center space-x-2 text-[#2D2C2A] dark:text-[#ECE8D9] text-lg sm:text-xl font-serif-display">
              <Settings className="h-4 w-4 sm:h-5 sm:w-5 text-[#8E735B]" />
              <span>Managing Your Preferences</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
              <div>
                <h3 className="font-semibold text-[#2D2C2A] dark:text-[#ECE8D9] mb-3 text-base sm:text-lg font-serif-display">
                  Browser Settings
                </h3>
                <p className="text-[#5A5A5A] dark:text-[#B6B6B6] text-sm mb-4 font-serif">
                  You can control cookies through your browser settings. Most
                  browsers allow you to:
                </p>
                <ul className="space-y-2 text-sm text-[#5A5A5A] dark:text-[#B6B6B6] font-serif">
                  <li className="flex items-center space-x-2">
                    <CheckCircle
                      className="h-4 w-4 text-[#8E735B] shrink-0"
                    />
                    <span>View and delete existing cookies</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle
                      className="h-4 w-4 text-[#8E735B] shrink-0"
                    />
                    <span>Block cookies from specific sites</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle
                      className="h-4 w-4 text-[#8E735B] shrink-0"
                    />
                    <span>Block third-party cookies</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle
                      className="h-4 w-4 text-[#8E735B] shrink-0"
                    />
                    <span>Clear cookies when you close the browser</span>
                  </li>

                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-[#2D2C2A] dark:text-[#ECE8D9] mb-3 text-base sm:text-lg font-serif-display">
                  Our Cookie Consent Tool
                </h3>
                <p className="text-[#5A5A5A] dark:text-[#B6B6B6] text-sm mb-4 font-serif">
                  We provide granular control over optional cookie categories
                  via our consent banner.
                </p>
                <div className="space-y-3">
                  <Button className="w-full btn-classic text-sm sm:text-base font-serif-display">
                    <Settings className="h-4 w-4 mr-2" />
                    Manage Cookie Preferences
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full btn-classic-outline text-sm sm:text-base font-serif-display"
                  >
                    <Cookie className="h-4 w-4 mr-2" />
                    View Current Settings
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card
          className="glass-classic border-[#BBA588]/40 dark:border-[#BBA588]/20 shadow-2xl mb-8 sm:mb-10 md:mb-12 animate-fade-in"
          style={{ animationDelay: "1.2s" }}
        >
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="flex items-center space-x-2 text-[#2D2C2A] dark:text-[#ECE8D9] text-lg sm:text-xl font-serif-display">
              <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5 text-[#BBA588]" />
              <span>Impact of Disabling Cookies</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
              <div>
                <h3 className="font-semibold text-[#8E735B] dark:text-[#BBA588] mb-3 text-base sm:text-lg font-serif-display">
                  Essential Cookies (Cannot be disabled)
                </h3>
                <p className="text-[#5A5A5A] dark:text-[#B6B6B6] text-sm mb-3 font-serif">
                  These are required for website functionality. Disabling them
                  may cause:
                </p>
                <ul className="space-y-1 text-sm text-[#5A5A5A] dark:text-[#B6B6B6] font-serif">
                  <li>• Login/authentication issues</li>
                  <li>• Inability to manage your account</li>
                  <li>• Loss of security features</li>
                  <li>• Language preferences not being saved</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-[#BBA588] dark:text-[#BBA588] mb-3 text-base sm:text-lg font-serif-display">
                  Optional Cookies (Can be disabled)
                </h3>
                <p className="text-[#5A5A5A] dark:text-[#B6B6B6] text-sm mb-3 font-serif">
                  Disabling these may impact your website experience:
                </p>
                <ul className="space-y-1 text-sm text-[#5A5A5A] dark:text-[#B6B6B6] font-serif">
                  <li>• Less personalized travel suggestions</li>
                  <li>• We can't learn which travel guides are most helpful</li>
                  <li>• Generic travel ads instead of relevant offers</li>
                  <li>• Saved itineraries may not be remembered</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          <Card
            className="glass-classic border-[#BBA588]/40 dark:border-[#BBA588]/20 shadow-xl animate-fade-in"
            style={{ animationDelay: "1.3s" }}
          >
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-[#2D2C2A] dark:text-[#ECE8D9] text-lg sm:text-xl font-serif-display">
                Questions About Cookies?
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0">
              <p className="text-[#5A5A5A] dark:text-[#B6B6B6] mb-4 text-sm sm:text-base font-serif">
                If you have any questions about our cookie policy or need help
                managing your preferences, we're here to help.
              </p>
              <Link href="/contact">
                <Button className="w-full btn-classic text-sm sm:text-base font-serif-display">
                  Contact Support
                </Button>
              </Link>
            </CardContent>
          </Card>
          <Card
            className="glass-classic border-[#BBA588]/40 dark:border-[#BBA588]/20 shadow-xl animate-fade-in"
            style={{ animationDelay: "1.4s" }}
          >
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-[#2D2C2A] dark:text-[#ECE8D9] text-lg sm:text-xl font-serif-display">
                Policy Updates
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0">
              <p className="text-[#5A5A5A] dark:text-[#B6B6B6] mb-4 text-sm sm:text-base font-serif">
                We may update this cookie policy from time to time. We'll
                notify you of any significant changes via email or website
                notice.
              </p>
              <div className="text-xs sm:text-sm text-[#7C6D64] dark:text-[#BBA588] font-serif">
                <p>
                  <strong>Last Updated:</strong> June 10, 2025
                </p>
                <p>
                  <strong>Version:</strong> 2.1
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  )
}