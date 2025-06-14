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
      title: "SalesSpeak Raises $25M Series B to Accelerate AI Voice Technology Expansion",
      date: "December 10, 2024",
      excerpt: "Leading voice AI platform secures funding from top-tier VCs to expand across Asia-Pacific markets and enhance multilingual capabilities.",
      type: "Funding News",
      featured: true
    },
    {
      title: "SalesSpeak Achieves SOC 2 Type II Certification for Enterprise Security",
      date: "November 28, 2024", 
      excerpt: "Platform demonstrates commitment to data security and privacy with industry-leading certification.",
      type: "Company News",
      featured: false
    },
    {
      title: "Partnership with Microsoft Azure Brings Advanced AI to Enterprise Customers",
      date: "November 15, 2024",
      excerpt: "Strategic partnership enables enterprise customers to deploy SalesSpeak's voice AI technology at scale.",
      type: "Partnership",
      featured: false
    },
    {
      title: "SalesSpeak Named 'AI Startup of the Year' by TechCrunch India",
      date: "October 22, 2024",
      excerpt: "Recognition highlights company's innovation in multilingual voice AI and impact on Indian businesses.",
      type: "Award",
      featured: false
    },
    {
      title: "SalesSpeak Expands to Support 15 Indian Languages with 95%+ Accuracy",
      date: "October 8, 2024",
      excerpt: "Major product update includes enhanced speech recognition for regional languages across India.",
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
      title: "Product Screenshots",
      description: "UI screenshots and product demos",
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
      title: "Product Demo Videos",
      description: "Platform demonstrations and tutorials",
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
      title: "How SalesSpeak is Democratizing AI Voice Technology in India",
      date: "December 5, 2024",
      type: "Feature Article",
      logo: "TC",
      color: "from-green-500 to-emerald-500"
    },
    {
      outlet: "The Economic Times",
      title: "Voice AI Startup SalesSpeak Targets $100M Revenue by 2025",
      date: "November 25, 2024",
      type: "Business News",
      logo: "ET",
      color: "from-blue-500 to-cyan-500"
    },
    {
      outlet: "YourStory",
      title: "From IIT to AI: The SalesSpeak Journey",
      date: "November 12, 2024",
      type: "Founder Story",
      logo: "YS",
      color: "from-orange-500 to-red-500"
    },
    {
      outlet: "Inc42",
      title: "SalesSpeak's Multilingual AI: Breaking Down Language Barriers",
      date: "October 30, 2024",
      type: "Product Review",
      logo: "I42",
      color: "from-purple-500 to-violet-500"
    },
    {
      outlet: "BusinessWorld",
      title: "The Future of Sales is Conversational: SalesSpeak's Vision",
      date: "October 15, 2024",
      type: "Industry Analysis",
      logo: "BW",
      color: "from-pink-500 to-rose-500"
    },
    {
      outlet: "Forbes India",
      title: "30 Under 30: SalesSpeak's Young Founders Making Waves",
      date: "September 28, 2024",
      type: "Recognition",
      logo: "FI",
      color: "from-indigo-500 to-blue-500"
    }
  ]

  const awards = [
    {
      title: "AI Startup of the Year",
      organization: "TechCrunch India",
      year: "2024",
      description: "Recognition for innovation in voice AI technology"
    },
    {
      title: "Best B2B SaaS Product",
      organization: "SaaS India Awards",
      year: "2024",
      description: "Excellence in enterprise software solutions"
    },
    {
      title: "Emerging Technology Award",
      organization: "NASSCOM",
      year: "2024",
      description: "Outstanding contribution to AI and emerging technologies"
    },
    {
      title: "Innovation in Multilingual AI",
      organization: "AI India Summit",
      year: "2023",
      description: "Breakthrough in regional language processing"
    }
  ]

  const companyStats = [
    { label: "Founded", value: "2023" },
    { label: "Team Size", value: "50+" },
    { label: "Customers", value: "1000+" },
    { label: "Languages Supported", value: "15" },
    { label: "Revenue Growth", value: "500% YoY" },
    { label: "Funding Raised", value: "$30M" }
  ]
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/50 to-violet-50/50 dark:from-slate-950 dark:via-blue-950/50 dark:to-violet-950/50 transition-all duration-700">
      {/* Enhanced Background Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-48 -right-48 w-96 h-96 gradient-mesh rounded-full blur-3xl opacity-30 animate-float"></div>
        <div className="absolute -bottom-48 -left-48 w-96 h-96 bg-gradient-to-tr from-cyan-400/20 via-blue-500/20 to-violet-600/20 rounded-full blur-3xl opacity-30 animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-r from-blue-400/10 to-violet-600/10 rounded-full blur-2xl animate-pulse-slow"></div>
      </div>
      <Navbar />      <div className="relative pt-20 sm:pt-24 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">{/* Header */}
          <div className="text-center mb-12 md:mb-16">
            <Badge className="mb-4 md:mb-6 bg-gradient-to-r from-blue-100 to-violet-100 text-blue-800 border-blue-200/50 dark:from-blue-900/30 dark:to-violet-900/30 dark:text-blue-300 dark:border-blue-600/30 px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm font-medium shadow-md">
              📰 Press & Media
            </Badge>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 md:mb-8 px-4">
              <span className="block text-slate-900 dark:text-white mb-2">Press</span>
              <span className="block bg-gradient-to-r from-blue-600 via-violet-600 to-cyan-600 bg-clip-text text-transparent">
                Resources
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed px-4">
              Find the latest news, press releases, media assets, and information about SalesSpeak. 
              We're always happy to connect with journalists and media professionals.
            </p>
          </div>          {/* Company Stats */}
          <div className="mb-12 md:mb-16">
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-6 md:mb-8 text-center px-4">
              Company at a Glance
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4 md:gap-6">
              {companyStats.map((stat, index) => (
                <Card key={index} className="glass-strong border-white/30 dark:border-slate-700/50 shadow-lg hover:shadow-xl transition-all duration-300 text-center">
                  <CardContent className="p-4 md:p-6">
                    <div className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-2">
                      {stat.value}
                    </div>
                    <div className="text-xs md:text-sm text-slate-600 dark:text-slate-300">
                      {stat.label}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>          {/* Press Releases */}
          <div className="mb-12 md:mb-16">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 md:mb-8 px-4 gap-4">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
                Latest Press Releases
              </h2>
              <Badge variant="secondary" className="px-3 py-1 w-fit">
                {pressReleases.length} releases
              </Badge>
            </div>

            <div className="space-y-4 md:space-y-6">
              {pressReleases.map((release, index) => (
                <Card key={index} className={`glass-strong border-white/30 dark:border-slate-700/50 shadow-lg hover:shadow-xl transition-all duration-300 ${release.featured ? 'ring-2 ring-blue-500/20' : ''}`}>
                  <CardContent className="p-4 md:p-6">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 mb-3">
                          <Badge 
                            className={`text-xs w-fit ${release.featured ? 'bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-800' : 'bg-gray-100 text-gray-700'}`}
                          >
                            {release.featured ? '⭐ Featured' : release.type}
                          </Badge>
                          <div className="flex items-center space-x-2 text-sm text-slate-500 dark:text-slate-400">
                            <Calendar className="h-4 w-4" />
                            <span>{release.date}</span>
                          </div>
                        </div>
                        
                        <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white mb-3">
                          {release.title}
                        </h3>
                        
                        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                          {release.excerpt}
                        </p>
                      </div>
                      
                      <div className="flex flex-row sm:flex-col lg:flex-row items-start lg:items-center space-x-2 sm:space-x-0 sm:space-y-2 lg:space-y-0 lg:space-x-2 lg:ml-6">
                        <Button variant="outline" size="sm" className="glass border-white/30 flex-1 sm:flex-none">
                          <Download className="h-4 w-4 mr-2" />
                          PDF
                        </Button>
                        <Button size="sm" className="bg-gradient-to-r from-blue-500 to-violet-500 text-white flex-1 sm:flex-none">
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
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-6 md:mb-8 px-4">
              Media Coverage
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
              {mediaCoverage.map((coverage, index) => (
                <Card key={index} className="glass-strong border-white/30 dark:border-slate-700/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group">
                  <CardContent className="p-4 md:p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className={`w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br ${coverage.color} rounded-lg flex items-center justify-center shadow-lg flex-shrink-0`}>
                        <span className="text-white font-bold text-xs md:text-sm">{coverage.logo}</span>
                      </div>
                      <div className="min-w-0">
                        <div className="font-semibold text-slate-900 dark:text-white truncate">
                          {coverage.outlet}
                        </div>
                        <Badge variant="outline" className="text-xs mt-1">
                          {coverage.type}
                        </Badge>
                      </div>
                    </div>
                    
                    <h3 className="text-base md:text-lg font-bold text-slate-900 dark:text-white mb-3 group-hover:text-blue-600 transition-colors line-clamp-3">
                      {coverage.title}
                    </h3>
                    
                    <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
                      <div className="flex items-center space-x-2 min-w-0">
                        <Calendar className="h-4 w-4 flex-shrink-0" />
                        <span className="truncate">{coverage.date}</span>
                      </div>
                      <Button variant="ghost" size="sm" className="p-0 text-blue-600 hover:text-blue-700 flex-shrink-0">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>          {/* Awards & Recognition */}
          <div className="mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-6 md:mb-8 px-4">
              Awards & Recognition
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
              {awards.map((award, index) => (
                <Card key={index} className="glass-strong border-white/30 dark:border-slate-700/50 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-4 md:p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-yellow-500/20 to-orange-600/30 rounded-lg flex items-center justify-center shadow-lg flex-shrink-0">
                        <Award className="h-5 w-5 md:h-6 md:w-6 text-yellow-600" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-base md:text-lg font-bold text-slate-900 dark:text-white mb-1">
                          {award.title}
                        </h3>
                        <div className="text-sm text-slate-600 dark:text-slate-300 mb-2">
                          {award.organization} • {award.year}
                        </div>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
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
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-6 md:mb-8 px-4">
              Media Kit & Assets
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
              {mediaKit.map((asset, index) => (
                <Card key={index} className="glass-strong border-white/30 dark:border-slate-700/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group">
                  <CardContent className="p-4 md:p-6">
                    <div className="flex items-start space-x-3 mb-4">
                      <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-blue-500/20 to-violet-600/30 rounded-lg flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                        {asset.icon}
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-base md:text-lg font-bold text-slate-900 dark:text-white">
                          {asset.title}
                        </h3>
                        <p className="text-sm text-slate-600 dark:text-slate-300">
                          {asset.description}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                      <div className="flex flex-wrap gap-1">
                        {asset.files.map((file, fileIndex) => (
                          <Badge key={fileIndex} variant="secondary" className="text-xs">
                            {file}
                          </Badge>
                        ))}
                      </div>
                      
                      <Button size="sm" className="bg-gradient-to-r from-blue-500 to-violet-500 text-white shadow-lg hover:shadow-xl transition-all duration-300 w-full sm:w-auto">
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
            <Card className="glass-strong border-white/30 dark:border-slate-700/50 shadow-2xl">
              <CardContent className="p-6 sm:p-8 md:p-12">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-blue-500 to-violet-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Mail className="h-6 w-6 md:h-8 md:w-8 text-white" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-4">
                  Media Inquiries
                </h2>
                <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto px-4">
                  Looking for more information, interviews, or custom assets? 
                  Our media team is here to help.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="text-center">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-green-500/20 to-emerald-600/30 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <Mail className="h-5 w-5 md:h-6 md:w-6 text-green-600" />
                    </div>
                    <h4 className="font-semibold text-slate-900 dark:text-white mb-1">Press Contact</h4>
                    <p className="text-slate-600 dark:text-slate-300 text-sm break-all">press@salesspeak.ai</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-blue-500/20 to-cyan-600/30 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <Building className="h-5 w-5 md:h-6 md:w-6 text-blue-600" />
                    </div>
                    <h4 className="font-semibold text-slate-900 dark:text-white mb-1">Partnership</h4>
                    <p className="text-slate-600 dark:text-slate-300 text-sm break-all">partnerships@salesspeak.ai</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-purple-500/20 to-violet-600/30 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <Users className="h-5 w-5 md:h-6 md:w-6 text-purple-600" />
                    </div>
                    <h4 className="font-semibold text-slate-900 dark:text-white mb-1">General</h4>
                    <p className="text-slate-600 dark:text-slate-300 text-sm break-all">hello@salesspeak.ai</p>
                  </div>
                </div>
                
                <Link href="/contact">
                  <Button size="lg" className="bg-gradient-to-r from-blue-500 via-violet-500 to-purple-500 hover:from-blue-600 hover:via-violet-600 hover:to-purple-600 text-base md:text-lg px-6 md:px-8 py-2 md:py-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                    Contact Media Team
                  </Button>
                </Link>
                
                <div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-700">
                  <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 px-4">
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
