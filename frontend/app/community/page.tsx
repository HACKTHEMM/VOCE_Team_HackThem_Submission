"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ThemeToggle } from "@/components/theme-toggle"
import { Footer } from "@/components/footer"
import { Navbar } from "@/components/navbar"
import { 
  Users, 
  MessageCircle, 
  Star,
  Heart,
  Search,
  Filter,
  BookOpen,
  Lightbulb,
  Award,
  TrendingUp,
  Calendar,
  ExternalLink,
  Github,
  Send,
  Mic
} from "lucide-react"
import Link from "next/link"

export default function CommunityPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const communityStats = [
    {
      icon: <Users className="h-6 w-6" />,
      title: "Active Members",
      value: "12,500+",
      description: "Developers and users worldwide",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <MessageCircle className="h-6 w-6" />,
      title: "Discussions",
      value: "3,200+",
      description: "Topics and conversations",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: <Award className="h-6 w-6" />,
      title: "Solutions Shared",
      value: "8,900+",
      description: "Community contributions",
      color: "from-purple-500 to-violet-500"
    },
    {
      icon: <Star className="h-6 w-6" />,
      title: "Expert Contributors",
      value: "450+",
      description: "Verified community experts",
      color: "from-orange-500 to-red-500"
    }
  ]

  const discussionCategories = [
    {
      icon: <BookOpen className="h-5 w-5" />,
      title: "Getting Started",
      description: "New to SalesSpeak? Start here",
      posts: 234,
      color: "bg-blue-50 text-blue-600 border-blue-200"
    },
    {
      icon: <Lightbulb className="h-5 w-5" />,
      title: "Feature Requests",
      description: "Suggest new features and improvements",
      posts: 167,
      color: "bg-yellow-50 text-yellow-600 border-yellow-200"
    },
    {
      icon: <MessageCircle className="h-5 w-5" />,
      title: "General Discussion",
      description: "Open conversations about AI and sales",
      posts: 892,
      color: "bg-green-50 text-green-600 border-green-200"
    },
    {
      icon: <TrendingUp className="h-5 w-5" />,
      title: "Best Practices",
      description: "Share tips, tricks, and success stories",
      posts: 456,
      color: "bg-purple-50 text-purple-600 border-purple-200"
    }
  ]

  const featuredTopics = [
    {
      title: "Multilingual Voice Recognition Best Practices",
      author: "Sarah Chen",
      replies: 23,
      views: 1234,
      lastActivity: "2 hours ago",
      tags: ["voice-ai", "multilingual", "best-practices"],
      featured: true
    },
    {
      title: "Integration with Salesforce CRM - Complete Guide",
      author: "Raj Patel",
      replies: 45,
      views: 2156,
      lastActivity: "4 hours ago",
      tags: ["integration", "salesforce", "guide"]
    },
    {
      title: "How I Increased Sales by 300% Using SalesSpeak",
      author: "Emma Rodriguez",
      replies: 67,
      views: 3421,
      lastActivity: "6 hours ago",
      tags: ["success-story", "sales", "case-study"]
    },
    {
      title: "Custom Voice Models for Regional Dialects",
      author: "Akash Kumar",
      replies: 18,
      views: 845,
      lastActivity: "8 hours ago",
      tags: ["voice-models", "customization", "dialects"]
    },
    {
      title: "API Rate Limiting and Optimization Tips",
      author: "Jennifer Kim",
      replies: 31,
      views: 1567,
      lastActivity: "12 hours ago",
      tags: ["api", "optimization", "development"]
    }
  ]

  const communityExperts = [
    {
      name: "Dr. Priya Sharma",
      role: "AI Research Scientist",
      contributions: 156,
      expertise: ["Voice AI", "NLP", "Research"],
      avatar: "PS"
    },
    {
      name: "Marcus Johnson",
      role: "Sales Technology Consultant",
      contributions: 142,
      expertise: ["Sales Strategy", "CRM Integration", "Analytics"],
      avatar: "MJ"
    },
    {
      name: "Lisa Wang",
      role: "Developer Advocate",
      contributions: 138,
      expertise: ["API Development", "Integration", "SDKs"],
      avatar: "LW"
    },
    {
      name: "Ahmed Hassan",
      role: "Multilingual AI Specialist",
      contributions: 124,
      expertise: ["Multilingual AI", "Localization", "Cultural Adaptation"],
      avatar: "AH"
    }
  ]
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-blue-50 to-cyan-50 dark:from-slate-950 dark:via-blue-950 dark:to-violet-950 transition-all duration-500">
      {/* Enhanced Background Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-violet-600/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-gradient-to-br from-violet-400/15 to-pink-500/15 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-cyan-400/20 to-blue-600/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-gradient-to-bl from-purple-400/10 to-indigo-500/10 rounded-full blur-2xl animate-float"></div>
      </div>      {/* Enhanced Navigation */}
      <Navbar />

      <div className="relative pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">          {/* Header */}
          <div className="text-center mb-12 sm:mb-16">
            <Badge className="mb-4 sm:mb-6 bg-gradient-to-r from-blue-100 to-violet-100 text-blue-800 border-blue-200/50 dark:from-blue-900/30 dark:to-violet-900/30 dark:text-blue-300 dark:border-blue-600/30 px-3 sm:px-4 py-2 text-sm font-medium shadow-md">
              🤝 Join Our Community
            </Badge>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 sm:mb-8">
              <span className="block text-slate-900 dark:text-white mb-2">SalesSpeak</span>
              <span className="block bg-gradient-to-r from-blue-600 via-violet-600 to-cyan-600 bg-clip-text text-transparent">
                Community
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed mb-6 sm:mb-8 px-4">
              Connect with developers, share knowledge, and build amazing experiences together. 
              Join thousands of AI enthusiasts and sales professionals in our vibrant community.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
              <Button asChild size="lg" className="bg-gradient-to-r from-blue-500 via-violet-500 to-purple-500 hover:from-blue-600 hover:via-violet-600 hover:to-purple-600 text-base sm:text-lg px-6 sm:px-8 py-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <Link href="https://discord.gg/salesspeak" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-4 sm:h-5 w-4 sm:w-5 mr-2" />
                  Join Discord
                  <ExternalLink className="h-3 sm:h-4 w-3 sm:w-4 ml-2" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-2 border-slate-300 text-slate-700 hover:bg-white/20 backdrop-blur-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <Link href="https://github.com/salesspeak/community" target="_blank" rel="noopener noreferrer">
                  <Github className="h-4 sm:h-5 w-4 sm:w-5 mr-2" />
                  GitHub Discussions
                  <ExternalLink className="h-3 sm:h-4 w-3 sm:w-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>          {/* Community Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12 sm:mb-16">
            {communityStats.map((stat, index) => (
              <Card key={index} className="glass border-white/30 dark:border-slate-700/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <CardContent className="p-4 sm:p-6">
                  <div className={`inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br ${stat.color} rounded-lg mb-3 sm:mb-4 text-white shadow-lg`}>
                    {stat.icon}
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-base sm:text-lg font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {stat.title}
                  </div>
                  <div className="text-sm text-slate-500 dark:text-slate-400">
                    {stat.description}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>          {/* Search and Categories */}
          <div className="mb-8 sm:mb-12">
            <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
              {/* Search */}
              <div className="lg:w-2/3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 sm:h-5 w-4 sm:w-5 text-slate-400" />
                  <Input
                    placeholder="Search discussions, topics, and solutions..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 sm:pl-12 pr-4 py-2 sm:py-3 text-base sm:text-lg bg-white/20 backdrop-blur-lg border border-white/30 shadow-lg focus:bg-white/30 focus:border-blue-400/50 transition-all duration-300"
                  />
                </div>
              </div>

              {/* Quick Actions */}
              <div className="lg:w-1/3 flex gap-2 sm:gap-3">
                <Button variant="outline" className="flex-1 bg-white/20 backdrop-blur-lg border border-white/30 hover:bg-white/30 transition-all duration-300 text-sm sm:text-base">
                  <Filter className="h-3 sm:h-4 w-3 sm:w-4 mr-1 sm:mr-2" />
                  <span className="hidden sm:inline">Filter</span>
                </Button>
                <Button className="flex-1 bg-gradient-to-r from-blue-500 to-violet-600 hover:from-blue-600 hover:to-violet-700 shadow-lg hover:shadow-xl transition-all duration-300 text-sm sm:text-base">
                  <Send className="h-3 sm:h-4 w-3 sm:w-4 mr-1 sm:mr-2" />
                  <span className="hidden sm:inline">New Topic</span>
                  <span className="sm:hidden">New</span>
                </Button>
              </div>
            </div>
          </div>          {/* Discussion Categories */}
          <div className="mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-6 sm:mb-8 px-4 sm:px-0">Discussion Categories</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {discussionCategories.map((category, index) => (
                <Card key={index} className="glass border-white/30 dark:border-slate-700/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer">
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex items-start space-x-3 sm:space-x-4">
                      <div className={`flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 ${category.color} rounded-lg flex items-center justify-center shadow-md`}>
                        {category.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-2">
                          {category.title}
                        </h3>
                        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mb-3">
                          {category.description}
                        </p>
                        <div className="flex items-center text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                          <MessageCircle className="h-3 sm:h-4 w-3 sm:w-4 mr-1" />
                          {category.posts} posts
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>          {/* Featured Topics */}
          <div className="mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-6 sm:mb-8 px-4 sm:px-0">Featured Discussions</h2>
            <div className="space-y-3 sm:space-y-4">
              {featuredTopics.map((topic, index) => (
                <Card key={index} className="glass border-white/30 dark:border-slate-700/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] cursor-pointer">
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 mb-3">
                          {topic.featured && (
                            <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0 shadow-md w-fit">
                              <Star className="h-3 w-3 mr-1" />
                              Featured
                            </Badge>
                          )}
                          <div className="flex flex-wrap gap-1 sm:gap-2">
                            {topic.tags.map((tag, tagIndex) => (
                              <Badge key={tagIndex} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        
                        <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-2 sm:mb-3 hover:text-blue-600 dark:hover:text-blue-400 transition-colors leading-tight">
                          {topic.title}
                        </h3>
                        
                        <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-6 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                          <div className="flex items-center space-x-1">
                            <Users className="h-3 sm:h-4 w-3 sm:w-4" />
                            <span>by {topic.author}</span>
                          </div>
                          <div className="flex items-center space-x-4 sm:space-x-6">
                            <div className="flex items-center space-x-1">
                              <MessageCircle className="h-3 sm:h-4 w-3 sm:w-4" />
                              <span>{topic.replies}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Star className="h-3 sm:h-4 w-3 sm:w-4" />
                              <span>{topic.views}</span>
                            </div>
                            <div className="hidden sm:flex items-center space-x-1">
                              <Calendar className="h-3 sm:h-4 w-3 sm:w-4" />
                              <span>{topic.lastActivity}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>          {/* Community Experts */}
          <div className="mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-6 sm:mb-8 px-4 sm:px-0">Community Experts</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {communityExperts.map((expert, index) => (
                <Card key={index} className="glass border-white/30 dark:border-slate-700/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <CardContent className="p-4 sm:p-6 text-center">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 to-violet-600 rounded-full flex items-center justify-center text-white text-lg sm:text-xl font-bold mx-auto mb-3 sm:mb-4 shadow-lg">
                      {expert.avatar}
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-1">
                      {expert.name}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm mb-2 sm:mb-3">
                      {expert.role}
                    </p>
                    <div className="flex items-center justify-center space-x-1 text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-3 sm:mb-4">
                      <Award className="h-3 sm:h-4 w-3 sm:w-4" />
                      <span>{expert.contributions} contributions</span>
                    </div>
                    <div className="flex flex-wrap justify-center gap-1">
                      {expert.expertise.map((skill, skillIndex) => (
                        <Badge key={skillIndex} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>          {/* Community Guidelines */}
          <div className="mb-12 sm:mb-16">
            <Card className="glass-strong border-white/30 dark:border-slate-700/50 shadow-2xl">
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="flex items-center text-xl sm:text-2xl">
                  <Heart className="h-5 sm:h-6 w-5 sm:w-6 mr-2 sm:mr-3 text-red-500" />
                  Community Guidelines
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-white mb-3 sm:mb-4">Be Respectful</h3>
                    <ul className="space-y-2 text-sm sm:text-base text-slate-600 dark:text-slate-300">
                      <li className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span>Treat everyone with kindness and respect</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span>Welcome newcomers and help them get started</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span>Avoid spam, self-promotion, and off-topic content</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-white mb-3 sm:mb-4">Share Knowledge</h3>
                    <ul className="space-y-2 text-sm sm:text-base text-slate-600 dark:text-slate-300">
                      <li className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span>Share your experiences and learnings</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span>Provide constructive feedback and solutions</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span>Credit others for their contributions</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Join CTA */}
          <div className="text-center px-4">
            <Card className="glass-strong border-white/30 dark:border-slate-700/50 shadow-2xl">
              <CardContent className="p-6 sm:p-8 lg:p-12">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 to-violet-600 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  <Users className="h-6 sm:h-8 w-6 sm:w-8 text-white" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-3 sm:mb-4">
                  Ready to Join Our Community?
                </h2>
                <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed">
                  Connect with like-minded developers, get help with your projects, and contribute to the future of AI-powered sales technology.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                  <Button asChild size="lg" className="bg-gradient-to-r from-blue-500 via-violet-500 to-purple-500 hover:from-blue-600 hover:via-violet-600 hover:to-purple-600 text-base sm:text-lg px-6 sm:px-8 py-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                    <Link href="https://discord.gg/salesspeak" target="_blank" rel="noopener noreferrer">
                      Join Discord Community
                      <ExternalLink className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="border-2 border-slate-300 text-slate-700 hover:bg-white/20 backdrop-blur-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                    <Link href="https://github.com/salesspeak/community" target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 sm:h-5 w-4 sm:w-5 mr-2" />
                      GitHub Community
                      <ExternalLink className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
