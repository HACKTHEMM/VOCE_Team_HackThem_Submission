"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ThemeToggle } from "@/components/theme-toggle"
import { Footer } from "@/components/footer"
import { Navbar } from "@/components/navbar"
import {

  Calendar,
  Download,
  ExternalLink,
  Award,
  Newspaper,
  Radio,
  Tv,
  Users,
  TrendingUp,
  Globe,
  FileText,
  Image as ImageIcon,
  Video,
  Mail,
  Building,
  Star,
  Mic,
  ArrowRight
} from "lucide-react"
import Link from "next/link"

export default function PressPage() {
  const pressReleases = [
    {
      title: "Voce Raises $25M Series B to Connect the World's Travelers",
      date: "December 10, 2024",
      excerpt: "Leading travel AI company secures funding to expand its offline voice agent service to new continents and support more languages.",
      type: "Funding News",
      featured: true
    },
    {
      title: "Voce Achieves SOC 2 Type II Certification, Ensuring Traveler Data Privacy",
      date: "November 28, 2024",
      excerpt: "The platform demonstrates its commitment to data security, ensuring that traveler information remains private and protected.",
      type: "Company News",
      featured: false
    },
    {
      title: "Voce Partners with Global Hotel Alliance to Enhance Guest Experiences",
      date: "November 15, 2024",
      excerpt: "Strategic partnership enables international hotel guests to access local recommendations and services via a simple phone call.",
      type: "Partnership",
      featured: false
    },
    {
      title: "Voce Named 'Travel Tech Innovator of the Year' by TechCrunch India",
      date: "October 22, 2024",
      excerpt: "Recognition highlights the company's impact on making travel more accessible and authentic for millions.",
      type: "Award",
      featured: false
    },
    {
      title: "Voce Expands to Support 15 Indian Languages with 95%+ Accuracy",
      date: "October 8, 2024",
      excerpt: "A major update helps travelers overcome language barriers by providing expert local guidance in their native tongue.",
      type: "Product News",
      featured: false
    }
  ]

  const mediaKit = [
    {
      title: "Company Logos",
      description: "High-resolution logos in various formats",
      type: "images",
      icon: <ImageIcon className="h-6 w-6" />,
      files: ["PNG", "SVG", "EPS"],
      downloadUrl: "#"
    },
    {
      title: "Product in Action",
      description: "Images of travelers using Voce",
      type: "images",
      icon: <ImageIcon className="h-6 w-6" />,
      files: ["High-res PNG", "Web-optimized"],
      downloadUrl: "#"
    },
    {
      title: "Executive Headshots",
      description: "Professional photos of leadership team",
      type: "images",
      icon: <Users className="h-6 w-6" />,
      files: ["Print quality", "Web quality"],
      downloadUrl: "#"
    },
    {
      title: "Company Fact Sheet",
      description: "Key statistics and company information",
      type: "document",
      icon: <FileText className="h-6 w-6" />,
      files: ["PDF", "Word"],
      downloadUrl: "#"
    },
    {
      title: "Explainer Videos",
      description: "Short videos explaining how Voce works",
      type: "video",
      icon: <Video className="h-6 w-6" />,
      files: ["MP4", "MOV"],
      downloadUrl: "#"
    },
    {
      title: "Brand Guidelines",
      description: "Brand usage guidelines and standards",
      type: "document",
      icon: <FileText className="h-6 w-6" />,
      files: ["PDF Guide"],
      downloadUrl: "#"
    }
  ]

  const mediaCoverage = [
    {
      outlet: "TechCrunch",
      title: "How Voce is Helping Travelers Ditch Apps for Authentic Exploration",
      date: "December 5, 2024",
      type: "Feature Article",
      logo: "TC",
      color: "from-green-500 to-emerald-500"
    },
    {
      outlet: "The Economic Times",
      title: "Travel Tech Startup Voce Targets 10 Million Users by 2025",
      date: "November 25, 2024",
      type: "Business News",
      logo: "ET",
      color: "from-blue-500 to-cyan-500"
    },
    {
      outlet: "YourStory",
      title: "From IIT to AI: The Journey to Build a Local Friend for Every Traveler",
      date: "November 12, 2024",
      type: "Founder Story",
      logo: "YS",
      color: "from-orange-500 to-red-500"
    },
    {
      outlet: "Inc42",
      title: "Voce's Multilingual AI: Breaking Down Language Barriers for Tourists",
      date: "October 30, 2024",
      type: "Product Review",
      logo: "I42",
      color: "from-purple-500 to-violet-500"
    },
    {
      outlet: "Condé Nast Traveller",
      title: "The Future of Travel is Conversational: Voce's Vision",
      date: "October 15, 2024",
      type: "Industry Analysis",
      logo: "CNT",
      color: "from-pink-500 to-rose-500"
    },
    {
      outlet: "Forbes India",
      title: "30 Under 30: The Voce Founders Connecting Travelers to the World",
      date: "September 28, 2024",
      type: "Recognition",
      logo: "FI",
      color: "from-indigo-500 to-blue-500"
    }
  ]

  const awards = [
    {
      title: "Travel Tech Innovator of the Year",
      organization: "Skift IDEA Awards",
      year: "2024",
      description: "For redefining in-destination experiences through voice AI."
    },
    {
      title: "Best B2C Innovation",
      organization: "Phocuswright Innovation Summit",
      year: "2024",
      description: "Recognized for excellence in direct-to-consumer travel technology."
    },
    {
      title: "Emerging Technology Award",
      organization: "NASSCOM",
      year: "2024",
      description: "For outstanding contributions to AI in the Indian tourism sector."
    },
    {
      title: "Innovation in Multilingual AI",
      organization: "AI India Summit",
      year: "2023",
      description: "For breakthroughs in regional language processing for travelers."
    }
  ]

  const companyStats = [
    { label: "Founded", value: "2023" },
    { label: "Team Size", value: "50+" },
    { label: "Travelers Assisted", value: "1M+" },
    { label: "Languages Supported", value: "15" },
    { label: "User Growth", value: "500% YoY" },
    { label: "Funding Raised", value: "$30M" }
  ]
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F3F1E9] via-[#ECE8D9] to-[#F3F1E9] dark:from-[#1E1E1E] dark:via-[#2A2A2A] dark:to-[#1E1E1E] transition-all duration-700">
      {/* Classic Background Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-48 -right-48 w-96 h-96 gradient-classic-mesh rounded-full blur-3xl opacity-30 animate-float"></div>
        <div className="absolute -bottom-48 -left-48 w-96 h-96 bg-gradient-to-tr from-[#BBA588]/20 via-[#8E735B]/20 to-[#7C6D64]/20 rounded-full blur-3xl opacity-30 animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-r from-[#BBA588]/10 to-[#8E735B]/10 rounded-full blur-2xl animate-pulse-slow"></div>
      </div>
      <Navbar />      <div className="relative pt-20 sm:pt-24 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">{/* Header */}
          <div className="text-center mb-12 md:mb-16">
            <Badge className="mb-4 md:mb-6 bg-gradient-to-r from-[#F3F1E9] via-[#ECE8D9] to-[#F3F1E9] text-[#8E735B] border-[#BBA588]/60 dark:from-[#1E1E1E]/80 dark:via-[#2A2A2A]/80 dark:to-[#1E1E1E]/80 dark:text-[#BBA588] dark:border-[#BBA588]/20 px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm font-medium shadow-md font-serif">
              📰 Press & Media
            </Badge>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 md:mb-8 px-4 font-serif-display">
              <span className="block text-[#2D2C2A] dark:text-[#ECE8D9] mb-2">Press</span>
              <span className="block bg-gradient-to-r from-[#8E735B] via-[#BBA588] to-[#7C6D64] bg-clip-text text-transparent">
                Resources
              </span>
            </h1>

            <p className="text-lg md:text-xl text-[#5A5A5A] dark:text-[#B6B6B6] max-w-3xl mx-auto leading-relaxed px-4 font-serif">
              Find the latest news, press releases, media assets, and information about Voce.
              We're always happy to connect with journalists and media professionals.
            </p>
          </div>          {/* Company Stats */}
          <div className="mb-12 md:mb-16">
            <h2 className="text-xl md:text-2xl font-bold text-[#2D2C2A] dark:text-[#ECE8D9] mb-6 md:mb-8 text-center px-4 font-serif-display">
              Company at a Glance
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4 md:gap-6">
              {companyStats.map((stat, index) => (
                <Card key={index} className="glass-classic border-[#BBA588]/40 dark:border-[#BBA588]/20 shadow-lg hover:shadow-xl transition-all duration-300 text-center">
                  <CardContent className="p-4 md:p-6">
                    <div className="text-2xl md:text-3xl font-bold text-[#2D2C2A] dark:text-[#ECE8D9] mb-2 font-serif-display">
                      {stat.value}
                    </div>
                    <div className="text-xs md:text-sm text-[#5A5A5A] dark:text-[#B6B6B6] font-serif">
                      {stat.label}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>          {/* Press Releases */}
          <div className="mb-12 md:mb-16">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 md:mb-8 px-4 gap-4">
              <h2 className="text-2xl md:text-3xl font-bold text-[#2D2C2A] dark:text-[#ECE8D9] font-serif-display">
                Latest Press Releases
              </h2>
              <Badge variant="secondary" className="px-3 py-1 w-fit bg-gradient-to-r from-[#BBA588]/20 to-[#8E735B]/20 text-[#8E735B] dark:text-[#BBA588] border-[#BBA588]/40 font-serif">
                {pressReleases.length} releases
              </Badge>
            </div>

            <div className="space-y-4 md:space-y-6">
              {pressReleases.map((release, index) => (
                <Card key={index} className={`glass-classic border-[#BBA588]/40 dark:border-[#BBA588]/20 shadow-lg hover:shadow-xl transition-all duration-300 ${release.featured ? 'ring-2 ring-[#BBA588]/30' : ''}`}>
                  <CardContent className="p-4 md:p-6">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 mb-3">
                          <Badge
                            className={`text-xs w-fit font-serif ${release.featured ? 'bg-gradient-to-r from-[#BBA588]/30 to-[#8E735B]/30 text-[#8E735B] dark:text-[#BBA588]' : 'bg-[#7C6D64]/20 text-[#7C6D64] dark:text-[#B6B6B6]'}`}
                          >
                            {release.featured ? '⭐ Featured' : release.type}
                          </Badge>
                          <div className="flex items-center space-x-2 text-sm text-[#5A5A5A] dark:text-[#B6B6B6] font-serif">
                            <Calendar className="h-4 w-4" />
                            <span>{release.date}</span>
                          </div>
                        </div>

                        <h3 className="text-lg md:text-xl font-bold text-[#2D2C2A] dark:text-[#ECE8D9] mb-3 font-serif-display">
                          {release.title}
                        </h3>

                        <p className="text-[#5A5A5A] dark:text-[#B6B6B6] leading-relaxed font-serif">
                          {release.excerpt}
                        </p>
                      </div>

                      <div className="flex flex-row sm:flex-col lg:flex-row items-start lg:items-center space-x-2 sm:space-x-0 sm:space-y-2 lg:space-y-0 lg:space-x-2 lg:ml-6">
                        <Button variant="outline" size="sm" className="btn-classic-outline flex-1 sm:flex-none font-serif-display">
                          <Download className="h-4 w-4 mr-2" />
                          PDF
                        </Button>
                        <Button size="sm" className="btn-classic flex-1 sm:flex-none font-serif-display">
                          Read More
                          <ExternalLink className="h-4 w-4 ml-2" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>          {/* Media Coverage */}
          <div className="mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-[#2D2C2A] dark:text-[#ECE8D9] mb-6 md:mb-8 px-4 font-serif-display">
              Media Coverage
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
              {mediaCoverage.map((coverage, index) => (
                <Card key={index} className="glass-classic border-[#BBA588]/40 dark:border-[#BBA588]/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group">
                  <CardContent className="p-4 md:p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className={`w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-[#BBA588]/30 to-[#8E735B]/30 rounded-lg flex items-center justify-center shadow-lg flex-shrink-0`}>
                        <span className="text-[#F3F1E9] dark:text-[#ECE8D9] font-bold text-xs md:text-sm font-serif">{coverage.logo}</span>
                      </div>
                      <div className="min-w-0">
                        <div className="font-semibold text-[#2D2C2A] dark:text-[#ECE8D9] truncate font-serif-display">
                          {coverage.outlet}
                        </div>
                        <Badge variant="outline" className="text-xs mt-1 bg-[#7C6D64]/20 text-[#7C6D64] dark:text-[#B6B6B6] border-[#7C6D64]/40 font-serif">
                          {coverage.type}
                        </Badge>
                      </div>
                    </div>

                    <h3 className="text-base md:text-lg font-bold text-[#2D2C2A] dark:text-[#ECE8D9] mb-3 group-hover:text-[#8E735B] dark:group-hover:text-[#BBA588] transition-colors line-clamp-3 font-serif-display">
                      {coverage.title}
                    </h3>

                    <div className="flex items-center justify-between text-sm text-[#5A5A5A] dark:text-[#B6B6B6] font-serif">
                      <div className="flex items-center space-x-2 min-w-0">
                        <Calendar className="h-4 w-4 flex-shrink-0" />
                        <span className="truncate">{coverage.date}</span>
                      </div>
                      <Button variant="ghost" size="sm" className="p-0 text-[#8E735B] hover:text-[#BBA588] dark:text-[#BBA588] dark:hover:text-[#8E735B] flex-shrink-0">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>          {/* Awards & Recognition */}
          <div className="mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-[#2D2C2A] dark:text-[#ECE8D9] mb-6 md:mb-8 px-4 font-serif-display">
              Awards & Recognition
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
              {awards.map((award, index) => (
                <Card key={index} className="glass-classic border-[#BBA588]/40 dark:border-[#BBA588]/20 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-4 md:p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-[#BBA588]/20 to-[#8E735B]/30 rounded-lg flex items-center justify-center shadow-lg flex-shrink-0">
                        <Award className="h-5 w-5 md:h-6 md:w-6 text-[#8E735B] dark:text-[#BBA588]" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-base md:text-lg font-bold text-[#2D2C2A] dark:text-[#ECE8D9] mb-1 font-serif-display">
                          {award.title}
                        </h3>
                        <div className="text-sm text-[#5A5A5A] dark:text-[#B6B6B6] mb-2 font-serif">
                          {award.organization} • {award.year}
                        </div>
                        <p className="text-sm text-[#5A5A5A] dark:text-[#B6B6B6] font-serif">
                          {award.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>          {/* Media Kit */}
          <div className="mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-[#2D2C2A] dark:text-[#ECE8D9] mb-6 md:mb-8 px-4 font-serif-display">
              Media Kit & Assets
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
              {mediaKit.map((asset, index) => (
                <Card key={index} className="glass-classic border-[#BBA588]/40 dark:border-[#BBA588]/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group">
                  <CardContent className="p-4 md:p-6">
                    <div className="flex items-start space-x-3 mb-4">
                      <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-[#BBA588]/20 to-[#8E735B]/30 rounded-lg flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 flex-shrink-0 text-[#8E735B] dark:text-[#BBA588]">
                        {asset.icon}
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-base md:text-lg font-bold text-[#2D2C2A] dark:text-[#ECE8D9] font-serif-display">
                          {asset.title}
                        </h3>
                        <p className="text-sm text-[#5A5A5A] dark:text-[#B6B6B6] font-serif">
                          {asset.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                      <div className="flex flex-wrap gap-1">
                        {asset.files.map((file, fileIndex) => (
                          <Badge key={fileIndex} variant="secondary" className="text-xs bg-[#7C6D64]/20 text-[#7C6D64] dark:text-[#B6B6B6] border-[#7C6D64]/40 font-serif">
                            {file}
                          </Badge>
                        ))}
                      </div>

                      <Button size="sm" className="btn-classic shadow-lg hover:shadow-xl transition-all duration-300 w-full sm:w-auto font-serif-display">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>          {/* Media Contact */}
          <div className="text-center">
            <Card className="glass-classic border-[#BBA588]/40 dark:border-[#BBA588]/20 shadow-2xl">
              <CardContent className="p-6 sm:p-8 md:p-12">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-[#8E735B] to-[#BBA588] rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Mail className="h-6 w-6 md:h-8 md:w-8 text-[#F3F1E9]" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-[#2D2C2A] dark:text-[#ECE8D9] mb-4 font-serif-display">
                  Media Inquiries
                </h2>
                <p className="text-lg md:text-xl text-[#5A5A5A] dark:text-[#B6B6B6] mb-8 max-w-2xl mx-auto px-4 font-serif">
                  Looking for more information, interviews, or custom assets?
                  Our media team is here to help.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="text-center">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-[#8E735B]/20 to-[#BBA588]/30 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <Mail className="h-5 w-5 md:h-6 md:w-6 text-[#8E735B] dark:text-[#BBA588]" />
                    </div>
                    <h4 className="font-semibold text-[#2D2C2A] dark:text-[#ECE8D9] mb-1 font-serif-display">Press Contact</h4>
                    <p className="text-[#5A5A5A] dark:text-[#B6B6B6] text-sm break-all font-serif">press@Voce.ai</p>
                  </div>

                  <div className="text-center">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-[#BBA588]/20 to-[#7C6D64]/30 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <Building className="h-5 w-5 md:h-6 md:w-6 text-[#8E735B] dark:text-[#BBA588]" />
                    </div>
                    <h4 className="font-semibold text-[#2D2C2A] dark:text-[#ECE8D9] mb-1 font-serif-display">Partnership</h4>
                    <p className="text-[#5A5A5A] dark:text-[#B6B6B6] text-sm break-all font-serif">partnerships@Voce.ai</p>
                  </div>

                  <div className="text-center">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-[#7C6D64]/20 to-[#8E735B]/30 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <Users className="h-5 w-5 md:h-6 md:w-6 text-[#8E735B] dark:text-[#BBA588]" />
                    </div>
                    <h4 className="font-semibold text-[#2D2C2A] dark:text-[#ECE8D9] mb-1 font-serif-display">General</h4>
                    <p className="text-[#5A5A5A] dark:text-[#B6B6B6] text-sm break-all font-serif">hello@Voce.ai</p>
                  </div>
                </div>

                <Link href="/contact">
                  <Button size="lg" className="btn-classic text-base md:text-lg px-6 md:px-8 py-2 md:py-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 font-serif-display">
                    Contact Media Team
                  </Button>
                </Link>

                <div className="mt-8 pt-8 border-t border-[#BBA588]/30 dark:border-[#BBA588]/20">
                  <p className="text-xs md:text-sm text-[#5A5A5A] dark:text-[#B6B6B6] px-4 font-serif">
                    Response within 24 hours | High-resolution assets available | Interview coordination
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>      </div>

      <Footer />
    </div>
  )
}