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
  Mic
} from "lucide-react"

export default function CookiePolicyPage() {
  const cookieCategories = [
    {
      icon: <Zap className="h-5 w-5" />,
      title: "Essential Cookies",
      description: "Required for basic website functionality",
      status: "Always Active",
      statusColor: "bg-green-500",
      cookies: [
        { name: "auth_token", purpose: "User authentication", duration: "30 days" },
        { name: "session_id", purpose: "Maintain user session", duration: "Session" },
        { name: "csrf_token", purpose: "Security protection", duration: "Session" },
        { name: "lang_pref", purpose: "Language preference", duration: "1 year" }
      ]
    },
    {
      icon: <BarChart3 className="h-5 w-5" />,
      title: "Analytics Cookies",
      description: "Help us understand how visitors interact with our website",
      status: "Optional",
      statusColor: "bg-blue-500",
      cookies: [
        { name: "_ga", purpose: "Google Analytics visitor tracking", duration: "2 years" },
        { name: "_gid", purpose: "Google Analytics session tracking", duration: "24 hours" },
        { name: "mixpanel_track", purpose: "User behavior analytics", duration: "1 year" },
        { name: "hotjar_session", purpose: "User experience analysis", duration: "Session" }
      ]
    },
    {
      icon: <Settings className="h-5 w-5" />,
      title: "Functional Cookies",
      description: "Enable enhanced functionality and personalization",
      status: "Optional",
      statusColor: "bg-purple-500",
      cookies: [
        { name: "theme_preference", purpose: "Remember dark/light mode", duration: "1 year" },
        { name: "chat_settings", purpose: "Voice assistant preferences", duration: "6 months" },
        { name: "dashboard_layout", purpose: "Custom dashboard layout", duration: "6 months" },
        { name: "notification_prefs", purpose: "Notification preferences", duration: "1 year" }
      ]
    },
    {
      icon: <Users className="h-5 w-5" />,
      title: "Marketing Cookies",
      description: "Used to deliver personalized advertisements",
      status: "Optional",
      statusColor: "bg-orange-500",
      cookies: [
        { name: "fb_pixel", purpose: "Facebook advertising", duration: "90 days" },
        { name: "google_ads", purpose: "Google Ads conversion tracking", duration: "90 days" },
        { name: "linkedin_insight", purpose: "LinkedIn advertising", duration: "30 days" },
        { name: "retargeting_id", purpose: "Personalized ad targeting", duration: "180 days" }
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
      name: "Mixpanel",
      purpose: "Advanced user analytics and product insights",
      dataShared: "User interactions, feature usage, custom events",
      privacyPolicy: "https://mixpanel.com/legal/privacy-policy"
    },
    {
      name: "Hotjar",
      purpose: "User experience analysis and feedback collection",
      dataShared: "Anonymized session recordings, heatmaps, surveys",
      privacyPolicy: "https://www.hotjar.com/legal/policies/privacy"
    },
    {
      name: "Intercom",
      purpose: "Customer support and communication",
      dataShared: "Support conversations, user profile data",
      privacyPolicy: "https://www.intercom.com/legal/privacy"
    }
  ]
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-blue-50 to-cyan-50 dark:from-slate-950 dark:via-blue-950 dark:to-violet-950 transition-all duration-500">      {/* Enhanced Background Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 sm:-top-48 sm:-right-48 w-48 h-48 sm:w-96 sm:h-96 gradient-mesh rounded-full blur-3xl opacity-20 sm:opacity-30 animate-float"></div>
        <div className="absolute -bottom-24 -left-24 sm:-bottom-48 sm:-left-48 w-48 h-48 sm:w-96 sm:h-96 bg-gradient-to-tr from-cyan-400/20 via-blue-500/20 to-violet-600/20 rounded-full blur-3xl opacity-20 sm:opacity-30 animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-36 h-36 sm:w-72 sm:h-72 bg-gradient-to-r from-blue-400/10 to-violet-600/10 rounded-full blur-2xl animate-pulse-slow"></div>
      </div>

      <Navbar />      <div className="max-w-4xl sm:max-w-5xl lg:max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16 relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-full mb-4 sm:mb-5 md:mb-6 shadow-lg animate-pulse">
            <Cookie className="h-6 sm:h-7 md:h-8 w-6 sm:w-7 md:w-8 text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4 sm:mb-5 md:mb-6 animate-fade-in">
            Cookie Policy
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed animate-fade-in px-2 sm:px-4" style={{animationDelay: '0.2s'}}>
            Learn how SalesSpeak uses cookies to enhance your experience, analyze usage patterns, and provide personalized services while respecting your privacy preferences.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 md:gap-4 mt-4 sm:mt-5 md:mt-6 animate-fade-in" style={{animationDelay: '0.3s'}}>
            <Badge variant="outline" className="bg-white/50 dark:bg-slate-800/50 text-xs sm:text-sm">
              <CheckCircle className="h-3 w-3 mr-1 text-green-600" />
              GDPR Compliant
            </Badge>
            <Badge variant="outline" className="bg-white/50 dark:bg-slate-800/50 text-xs sm:text-sm">
              <Shield className="h-3 w-3 mr-1 text-blue-600" />
              Privacy First
            </Badge>
            <Badge variant="outline" className="bg-white/50 dark:bg-slate-800/50 text-xs sm:text-sm">
              <Settings className="h-3 w-3 mr-1 text-purple-600" />
              Full Control
            </Badge>
          </div>
        </div>        {/* Quick Overview */}
        <Card className="glass-strong border-white/30 dark:border-slate-700/50 shadow-2xl mb-8 sm:mb-10 md:mb-12 animate-fade-in" style={{animationDelay: '0.4s'}}>
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="flex items-center space-x-2 text-slate-900 dark:text-white text-lg sm:text-xl">
              <Info className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
              <span>What Are Cookies?</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0">
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4 sm:mb-6 text-sm sm:text-base">
              Cookies are small text files stored on your device when you visit our website. They help us provide you with a better experience by remembering your preferences, analyzing how you use our service, and enabling essential functionality.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              <div className="text-center p-3 sm:p-4 bg-blue-50/50 dark:bg-blue-900/20 rounded-lg">
                <Eye className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600 mx-auto mb-2" />
                <h3 className="font-semibold text-slate-900 dark:text-white mb-2 text-sm sm:text-base">Transparency</h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">We clearly explain what cookies we use and why</p>
              </div>
              <div className="text-center p-3 sm:p-4 bg-green-50/50 dark:bg-green-900/20 rounded-lg">
                <Settings className="h-6 w-6 sm:h-8 sm:w-8 text-green-600 mx-auto mb-2" />
                <h3 className="font-semibold text-slate-900 dark:text-white mb-2 text-sm sm:text-base">Control</h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">You can manage your cookie preferences anytime</p>
              </div>
              <div className="text-center p-3 sm:p-4 bg-purple-50/50 dark:bg-purple-900/20 rounded-lg sm:col-span-2 lg:col-span-1">
                <Shield className="h-6 w-6 sm:h-8 sm:w-8 text-purple-600 mx-auto mb-2" />
                <h3 className="font-semibold text-slate-900 dark:text-white mb-2 text-sm sm:text-base">Security</h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">All cookies are secured and privacy-focused</p>
              </div>
            </div>
          </CardContent>
        </Card>        {/* Cookie Categories */}
        <div className="mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-6 sm:mb-8 animate-fade-in" style={{animationDelay: '0.5s'}}>
            Types of Cookies We Use
          </h2>
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
            {cookieCategories.map((category, index) => (
              <Card key={index} className="glass-strong border-white/30 dark:border-slate-700/50 shadow-xl hover:shadow-2xl transition-all duration-300 animate-fade-in" style={{animationDelay: `${0.6 + index * 0.1}s`}}>
                <CardHeader className="p-4 sm:p-6">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <CardTitle className="flex items-center space-x-2 sm:space-x-3 text-slate-900 dark:text-white text-base sm:text-lg">
                      <div className="p-1.5 sm:p-2 bg-gradient-to-br from-blue-500/20 to-violet-500/20 rounded-lg text-blue-600 dark:text-blue-400">
                        {category.icon}
                      </div>
                      <span>{category.title}</span>
                    </CardTitle>
                    <Badge className={`${category.statusColor} text-white text-xs sm:text-sm`}>
                      {category.status}
                    </Badge>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base">{category.description}</p>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-0">
                  <div className="space-y-3">
                    {category.cookies.map((cookie, cookieIndex) => (
                      <div key={cookieIndex} className="border-l-2 border-blue-200 dark:border-blue-800 pl-3 sm:pl-4 py-2">
                        <div className="flex justify-between items-start gap-2">
                          <div className="min-w-0 flex-1">
                            <h4 className="font-semibold text-slate-900 dark:text-white text-sm">{cookie.name}</h4>
                            <p className="text-xs text-slate-600 dark:text-slate-300 break-words">{cookie.purpose}</p>
                          </div>
                          <Badge variant="outline" className="text-xs shrink-0">
                            {cookie.duration}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>        {/* Third-Party Services */}
        <Card className="glass-strong border-white/30 dark:border-slate-700/50 shadow-2xl mb-8 sm:mb-10 md:mb-12 animate-fade-in" style={{animationDelay: '1s'}}>
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="flex items-center space-x-2 text-slate-900 dark:text-white text-lg sm:text-xl">
              <Globe className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
              <span>Third-Party Services</span>
            </CardTitle>
            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base">
              We use trusted third-party services to enhance our platform. Here's what data they may collect:
            </p>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0">
            <div className="space-y-4 sm:space-y-6">
              {thirdPartyServices.map((service, index) => (
                <div key={index} className="border border-slate-200 dark:border-slate-700 rounded-lg p-3 sm:p-4">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 sm:gap-3 mb-3">
                    <h3 className="font-semibold text-slate-900 dark:text-white text-base sm:text-lg">{service.name}</h3>
                    <Link 
                      href={service.privacyPolicy}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-700 text-sm underline shrink-0"
                    >
                      Privacy Policy
                    </Link>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-300 mb-2">
                    <strong>Purpose:</strong> {service.purpose}
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-300">
                    <strong>Data Shared:</strong> {service.dataShared}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>        {/* Cookie Management */}
        <Card className="glass-strong border-white/30 dark:border-slate-700/50 shadow-2xl mb-8 sm:mb-10 md:mb-12 animate-fade-in" style={{animationDelay: '1.1s'}}>
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="flex items-center space-x-2 text-slate-900 dark:text-white text-lg sm:text-xl">
              <Settings className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
              <span>Managing Your Cookie Preferences</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white mb-3 text-base sm:text-lg">Browser Settings</h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm mb-4">
                  You can control cookies through your browser settings. Most browsers allow you to:
                </p>
                <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600 shrink-0" />
                    <span>View and delete existing cookies</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600 shrink-0" />
                    <span>Block cookies from specific sites</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600 shrink-0" />
                    <span>Block third-party cookies</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600 shrink-0" />
                    <span>Clear cookies when you close the browser</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white mb-3 text-base sm:text-lg">Our Cookie Consent</h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm mb-4">
                  We provide granular control over cookie categories:
                </p>
                <div className="space-y-3">
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white text-sm sm:text-base">
                    <Settings className="h-4 w-4 mr-2" />
                    Manage Cookie Preferences
                  </Button>
                  <Button variant="outline" className="w-full text-sm sm:text-base">
                    <Cookie className="h-4 w-4 mr-2" />
                    View Current Settings
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>        {/* Impact of Disabling Cookies */}
        <Card className="glass-strong border-white/30 dark:border-slate-700/50 shadow-2xl mb-8 sm:mb-10 md:mb-12 animate-fade-in" style={{animationDelay: '1.2s'}}>
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="flex items-center space-x-2 text-slate-900 dark:text-white text-lg sm:text-xl">
              <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5 text-orange-600" />
              <span>Impact of Disabling Cookies</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white mb-3 text-red-600 text-base sm:text-lg">
                  Essential Cookies (Cannot be disabled)
                </h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm mb-3">
                  These are required for basic functionality. Disabling them may cause:
                </p>
                <ul className="space-y-1 text-sm text-slate-600 dark:text-slate-300">
                  <li>• Login/authentication issues</li>
                  <li>• Loss of security features</li>
                  <li>• Inability to maintain session state</li>
                  <li>• Language preferences not saved</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white mb-3 text-orange-600 text-base sm:text-lg">
                  Optional Cookies (Can be disabled)
                </h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm mb-3">
                  Disabling these may impact your experience:
                </p>
                <ul className="space-y-1 text-sm text-slate-600 dark:text-slate-300">
                  <li>• Less personalized experience</li>
                  <li>• No usage analytics for improvements</li>
                  <li>• Generic advertisements</li>
                  <li>• Theme preferences not saved</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>        {/* Contact and Updates */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          <Card className="glass-strong border-white/30 dark:border-slate-700/50 shadow-xl animate-fade-in" style={{animationDelay: '1.3s'}}>
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-slate-900 dark:text-white text-lg sm:text-xl">Questions About Cookies?</CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0">
              <p className="text-slate-600 dark:text-slate-300 mb-4 text-sm sm:text-base">
                If you have any questions about our cookie policy or need help managing your preferences, we're here to help.
              </p>
              <Link href="/contact">
                <Button className="w-full bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white text-sm sm:text-base">
                  Contact Support
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="glass-strong border-white/30 dark:border-slate-700/50 shadow-xl animate-fade-in" style={{animationDelay: '1.4s'}}>
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-slate-900 dark:text-white text-lg sm:text-xl">Policy Updates</CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0">
              <p className="text-slate-600 dark:text-slate-300 mb-4 text-sm sm:text-base">
                We may update this cookie policy from time to time. We'll notify you of any significant changes via email or website notice.
              </p>
              <div className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                <p><strong>Last Updated:</strong> June 10, 2025</p>
                <p><strong>Version:</strong> 2.1</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  )
}
