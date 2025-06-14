"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Search, 
  Calendar, 
  User, 
  Clock,
  ArrowRight,
  MessageSquare,
  Share2,
  Bookmark,
  Eye,
  ThumbsUp,
  Filter
} from "lucide-react"
import Link from "next/link"
import { Footer } from "@/components/footer"
import { Navbar } from "@/components/navbar"

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  const categories = [
    "All",
    "AI Technology", 
    "Product Updates",
    "Customer Stories",
    "Industry Insights",
    "Company News",
    "Tutorials"
  ]

  const featuredPost = {
    title: "The Future of Multilingual AI: Breaking Language Barriers in Sales",
    excerpt: "Explore how advanced AI models are revolutionizing cross-cultural communication and enabling businesses to connect with customers in their native languages.",
    author: "Dr. Priya Sharma",
    date: "December 12, 2024",
    readTime: "8 min read",
    tags: ["AI Technology", "Multilingual", "Sales"],
    views: 2847,
    likes: 156
  }

  const blogPosts = [
    {
      title: "How Voice AI is Transforming Customer Service in India",
      excerpt: "Discover the impact of voice AI technology on customer service across various industries in the Indian market.",
      author: "Ankit Gupta",
      date: "December 8, 2024",
      readTime: "5 min read",
      category: "Industry Insights",
      tags: ["Voice AI", "Customer Service", "India Market"],
      views: 1542,
      likes: 89
    },
    {
      title: "Building Inclusive AI: Lessons from Indian Languages",
      excerpt: "Our journey in creating AI that understands and respects the linguistic diversity of India.",
      author: "Sneha Reddy",
      date: "November 25, 2024",
      readTime: "7 min read",
      category: "AI Technology",
      tags: ["AI Ethics", "Inclusion", "Cultural AI"],
      views: 1689,
      likes: 127
    },
    {
      title: "Getting Started with SalesSpeak API: A Developer's Guide",
      excerpt: "Complete tutorial on integrating SalesSpeak's voice AI capabilities into your applications.",
      author: "Vikram Mehta",
      date: "November 20, 2024",
      readTime: "12 min read",
      category: "Tutorials",
      tags: ["API", "Integration", "Developer Guide"],
      views: 4234,
      likes: 312
    }
  ]

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/50 to-violet-50/50 dark:from-slate-950 dark:via-blue-950/50 dark:to-violet-950/50 transition-all duration-700">
      {/* Enhanced Background Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-48 -right-48 w-96 h-96 gradient-mesh rounded-full blur-3xl opacity-30 animate-float"></div>
        <div className="absolute -bottom-48 -left-48 w-96 h-96 bg-gradient-to-tr from-cyan-400/20 via-blue-500/20 to-violet-600/20 rounded-full blur-3xl opacity-30 animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-r from-blue-400/10 to-violet-600/10 rounded-full blur-2xl animate-pulse-slow"></div>      </div>      {/* Enhanced Navigation */}
      <Navbar />

      <div className="relative z-10">        {/* Hero Section */}
        <div className="pt-20 sm:pt-32 pb-12 sm:pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <Badge className="mb-6 sm:mb-8 bg-gradient-to-r from-blue-50 via-violet-50 to-cyan-50 text-blue-700 border-blue-200/60 dark:from-blue-900/20 dark:via-violet-900/20 dark:to-cyan-900/20 dark:text-blue-300 dark:border-blue-600/20 px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-semibold shadow-lg shadow-blue-500/10 rounded-full animate-fade-in">
              📚 Insights & Updates
            </Badge>
            
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-8 sm:mb-12 leading-tight">
              <span className="block text-slate-900 dark:text-white mb-2 sm:mb-4 animate-fade-in" style={{animationDelay: '0.2s'}}>Our</span>
              <span className="block bg-gradient-to-r from-blue-600 via-violet-600 via-cyan-600 to-blue-700 bg-clip-text text-transparent animate-gradient animate-fade-in" style={{animationDelay: '0.4s'}}>
                Blog
              </span>
            </h1>
            
            <p className="text-slate-600 dark:text-slate-300 text-lg sm:text-xl lg:text-2xl max-w-5xl mx-auto leading-relaxed font-light animate-fade-in px-4" style={{animationDelay: '0.6s'}}>
              Discover insights, updates, and stories from the world of AI-powered voice technology and sales innovation.
            </p>
          </div>
        </div>        {/* Search and Filters */}
        <div className="px-4 sm:px-6 lg:px-8 mb-12 sm:mb-16">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:gap-4 items-stretch md:items-center">
              <div className="relative flex-1 max-w-full md:max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 glass-strong border-white/30 dark:border-slate-700/50"
                />
              </div>
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
                <div className="flex items-center space-x-2">
                  <Filter className="h-4 w-4 text-slate-400" />
                  <span className="text-sm text-slate-600 dark:text-slate-300 hidden sm:inline">Filter:</span>
                </div>
                <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                  {categories.map((category) => (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(category)}
                      className={`text-xs whitespace-nowrap ${
                        selectedCategory === category 
                          ? "bg-gradient-to-r from-blue-500 to-violet-500 text-white" 
                          : "glass border-white/30 text-slate-600 hover:bg-white/20"
                      }`}
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>        {/* Featured Post */}
        <div className="px-4 sm:px-6 lg:px-8 mb-12 sm:mb-16">
          <div className="max-w-7xl mx-auto">
            <Card className="glass-strong border-white/30 dark:border-slate-700/50 shadow-2xl hover:shadow-3xl transition-all duration-300 overflow-hidden">
              <div className="flex flex-col lg:flex-row">
                <div className="lg:w-1/2">
                  <div className="aspect-video bg-gradient-to-br from-blue-500/20 to-violet-600/20 flex items-center justify-center">
                    <div className="text-4xl sm:text-6xl">🎯</div>
                  </div>
                </div>
                <div className="lg:w-1/2 p-6 sm:p-8">
                  <Badge className="mb-4 bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-800 border-yellow-200/50 dark:from-yellow-900/20 dark:to-orange-900/20 dark:text-yellow-300 dark:border-yellow-600/20">
                    ⭐ Featured
                  </Badge>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-4 leading-tight">
                    {featuredPost.title}
                  </h2>
                  <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed text-sm sm:text-base">
                    {featuredPost.excerpt}
                  </p>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-2 sm:space-y-0 mb-6 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4" />
                      <span>{featuredPost.author}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4" />
                      <span>{featuredPost.date}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4" />
                      <span>{featuredPost.readTime}</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
                    <div className="flex flex-wrap gap-2">
                      {featuredPost.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <Button className="bg-gradient-to-r from-blue-500 to-violet-500 hover:from-blue-600 hover:to-violet-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 w-full sm:w-auto">
                      Read More
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>        {/* Blog Posts Grid */}
        <div className="px-4 sm:px-6 lg:px-8 mb-12 sm:mb-16">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 space-y-4 sm:space-y-0">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                Latest Articles
              </h2>
              <Badge variant="secondary" className="px-3 py-1 self-start sm:self-auto">
                {filteredPosts.length} articles
              </Badge>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
              {filteredPosts.map((post, index) => (
                <Card key={index} className="glass-strong border-white/30 dark:border-slate-700/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group overflow-hidden">
                  <div className="aspect-video bg-gradient-to-br from-blue-500/20 to-violet-600/20 flex items-center justify-center">
                    <div className="text-3xl sm:text-4xl">📝</div>
                  </div>
                  
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex items-center justify-between mb-3">
                      <Badge variant="outline" className="text-xs">
                        {post.category}
                      </Badge>
                      <div className="flex items-center space-x-2 sm:space-x-3 text-xs text-slate-500">
                        <div className="flex items-center space-x-1">
                          <Eye className="h-3 w-3" />
                          <span className="hidden sm:inline">{post.views.toLocaleString()}</span>
                          <span className="sm:hidden">{(post.views / 1000).toFixed(1)}k</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <ThumbsUp className="h-3 w-3" />
                          <span>{post.likes}</span>
                        </div>
                      </div>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors leading-tight">
                      {post.title}
                    </h3>
                    
                    <p className="text-slate-600 dark:text-slate-300 text-sm mb-4 leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-0 sm:flex sm:items-center sm:justify-between text-xs text-slate-500 dark:text-slate-400 mb-4">
                      <div className="flex items-center space-x-2">
                        <User className="h-3 w-3" />
                        <span className="truncate">{post.author}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-3 w-3" />
                        <span className="truncate">{post.date}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-3 w-3" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {post.tags.slice(0, 2).map((tag, tagIndex) => (
                        <Badge key={tagIndex} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {post.tags.length > 2 && (
                        <Badge variant="secondary" className="text-xs">
                          +{post.tags.length - 2}
                        </Badge>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 p-0">
                        Read More
                        <ArrowRight className="h-3 w-3 ml-1" />
                      </Button>
                      
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm" className="p-1 hover:bg-blue-100 rounded-full">
                          <Bookmark className="h-3 w-3" />
                        </Button>
                        <Button variant="ghost" size="sm" className="p-1 hover:bg-blue-100 rounded-full">
                          <Share2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>        {/* Newsletter Subscription */}
        <div className="px-4 sm:px-6 lg:px-8 pb-20 sm:pb-32">
          <div className="max-w-4xl mx-auto text-center">
            <Card className="glass-strong border-white/30 dark:border-slate-700/50 shadow-2xl">
              <CardContent className="p-8 sm:p-12">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 to-violet-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <MessageSquare className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-4">
                  Stay Updated
                </h2>
                <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto px-4">
                  Subscribe to our newsletter and get the latest insights, product updates, 
                  and industry trends delivered to your inbox.
                </p>
                
                <div className="flex flex-col gap-4 justify-center max-w-md mx-auto">
                  <Input 
                    placeholder="Enter your email"
                    className="glass-strong border-white/30"
                  />
                  <Button className="bg-gradient-to-r from-blue-500 via-violet-500 to-purple-500 hover:from-blue-600 hover:via-violet-600 hover:to-purple-600 text-white shadow-lg hover:shadow-xl transition-all duration-300">
                    Subscribe
                  </Button>
                </div>
                
                <div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-700">
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                    Join 10,000+ subscribers | Unsubscribe anytime | No spam, ever
                  </p>
                </div>
              </CardContent>
            </Card>          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  )
}
