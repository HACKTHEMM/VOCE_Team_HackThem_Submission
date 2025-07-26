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
  Filter,
  Globe,
  Compass
} from "lucide-react"
import Link from "next/link"
import { Footer } from "@/components/footer"
import { Navbar } from "@/components/navbar"

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  const categories = [
    "All",
    "Travel Tech",
    "Product Updates",
    "Explorer Stories",
    "Destination Guides",
    "Company News",
    "Tutorials"
  ]

  const featuredPost = {
    title: "The Future of Multilingual AI: Breaking Language Barriers for Travelers",
    excerpt: "Explore how advanced AI models are revolutionizing cross-cultural communication, enabling travelers to connect with local cultures in their native languages.",
    author: "Dr. Priya Sharma",
    date: "July 15, 2025",
    readTime: "8 min read",
    tags: ["AI Technology", "Multilingual", "Travel"],
    views: 2847,
    likes: 156
  }

  const blogPosts = [
    {
      title: "How Voice AI is Transforming Solo Travel in India",
      excerpt: "Discover the impact of voice AI technology on the solo travel experience, offering safety, discovery, and authentic connection across India.",
      author: "Ankit Gupta",
      date: "July 10, 2025",
      readTime: "5 min read",
      category: "Travel Tech",
      tags: ["Voice AI", "Solo Travel", "Indian Tourism"],
      views: 1542,
      likes: 89
    },
    {
      title: "Building Inclusive AI: Lessons from Indian Languages",
      excerpt: "Our journey in creating an AI that understands and respects the rich linguistic diversity of India, making travel more accessible for everyone.",
      author: "Sneha Reddy",
      date: "June 28, 2025",
      readTime: "7 min read",
      category: "AI Technology",
      tags: ["AI Ethics", "Inclusion", "Cultural AI"],
      views: 1689,
      likes: 127
    },
    {
      title: "Finding Hidden Gems in Udaipur with Voce",
      excerpt: "A step-by-step guide on how to use Voce to move beyond the usual tourist spots and discover the authentic heart of Udaipur.",
      author: "Aarav Singh",
      date: "June 22, 2025",
      readTime: "6 min read",
      category: "Destination Guides",
      tags: ["Udaipur", "Travel Guide", "Local Secrets"],
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
    <div className="min-h-screen bg-gradient-to-br from-[#F3F1E9] via-[#ECE8D9] to-[#F3F1E9] dark:from-[#1E1E1E] dark:via-[#2A2A2A] dark:to-[#1E1E1E] transition-all duration-700">
      {/* Classic Background Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-48 -right-48 w-96 h-96 gradient-classic-mesh rounded-full blur-3xl opacity-30 animate-float"></div>
        <div className="absolute -bottom-48 -left-48 w-96 h-96 bg-gradient-to-tr from-[#BBA588]/20 via-[#8E735B]/20 to-[#7C6D64]/20 rounded-full blur-3xl opacity-30 animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-r from-[#BBA588]/10 to-[#8E735B]/10 rounded-full blur-2xl animate-pulse-slow"></div>      </div>      {/* Enhanced Navigation */}
      <Navbar />

      <div className="relative z-10">        {/* Hero Section */}
        <div className="pt-20 sm:pt-32 pb-12 sm:pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <Badge className="mb-6 sm:mb-8 bg-gradient-to-r from-[#F3F1E9] via-[#ECE8D9] to-[#F3F1E9] text-[#8E735B] border-[#BBA588]/60 dark:from-[#1E1E1E]/80 dark:via-[#2A2A2A]/80 dark:to-[#1E1E1E]/80 dark:text-[#BBA588] dark:border-[#BBA588]/20 px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-semibold shadow-lg shadow-[#BBA588]/10 rounded-full animate-fade-in font-serif">
              🧭 Explorer's Log
            </Badge>

            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-8 sm:mb-12 leading-tight font-serif-display">
              <span className="block text-[#2D2C2A] dark:text-[#ECE8D9] mb-2 sm:mb-4 animate-fade-in" style={{ animationDelay: '0.2s' }}>The Voce</span>
              <span className="block bg-gradient-to-r from-[#8E735B] via-[#BBA588] to-[#7C6D64] bg-clip-text text-transparent animate-gradient animate-fade-in" style={{ animationDelay: '0.4s' }}>
                Journal
              </span>
            </h1>

            <p className="text-[#5A5A5A] dark:text-[#B6B6B6] text-lg sm:text-xl lg:text-2xl max-w-5xl mx-auto leading-relaxed font-light animate-fade-in px-4 font-serif" style={{ animationDelay: '0.6s' }}>
              Discover insights, travel stories, and updates from the world of AI-powered exploration and authentic travel.
            </p>
          </div>
        </div>        {/* Search and Filters */}
        <div className="px-4 sm:px-6 lg:px-8 mb-12 sm:mb-16">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:gap-4 items-stretch md:items-center">
              <div className="relative flex-1 max-w-full md:max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#7C6D64] dark:text-[#BBA588]" />
                <Input
                  placeholder="Search stories & guides..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 glass-classic border-[#BBA588]/40 dark:border-[#BBA588]/20 font-serif"
                />
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
                <div className="flex items-center space-x-2">
                  <Filter className="h-4 w-4 text-[#7C6D64] dark:text-[#BBA588]" />
                  <span className="text-sm text-[#5A5A5A] dark:text-[#B6B6B6] hidden sm:inline font-serif">Filter:</span>
                </div>
                <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                  {categories.map((category) => (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(category)}
                      className={`text-xs whitespace-nowrap font-serif ${selectedCategory === category
                        ? "btn-classic text-white"
                        : "btn-classic-outline text-[#5A5A5A] dark:text-[#B6B6B6] hover:bg-[#BBA588]/20"
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
            <Card className="glass-classic border-[#BBA588]/40 dark:border-[#BBA588]/20 shadow-2xl hover:shadow-3xl transition-all duration-300 overflow-hidden rounded-2xl">
              <div className="flex flex-col lg:flex-row">
                <div className="lg:w-1/2">
                  <div className="aspect-video bg-gradient-to-br from-[#BBA588]/20 to-[#8E735B]/20 flex items-center justify-center">
                    <Globe className="text-4xl sm:text-6xl text-white/50" />
                  </div>
                </div>
                <div className="lg:w-1/2 p-6 sm:p-8">
                  <Badge className="mb-4 bg-gradient-to-r from-[#BBA588]/20 to-[#8E735B]/20 text-[#8E735B] border-[#BBA588]/50 dark:from-[#BBA588]/20 dark:to-[#8E735B]/20 dark:text-[#BBA588] dark:border-[#BBA588]/20 font-serif">
                    ⭐ Featured
                  </Badge>
                  <h2 className="text-xl sm:text-2xl font-bold text-[#2D2C2A] dark:text-[#ECE8D9] mb-4 leading-tight font-serif-display">
                    {featuredPost.title}
                  </h2>
                  <p className="text-[#5A5A5A] dark:text-[#B6B6B6] mb-6 leading-relaxed text-sm sm:text-base font-serif">
                    {featuredPost.excerpt}
                  </p>

                  <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-2 sm:space-y-0 mb-6 text-xs sm:text-sm text-[#7C6D64] dark:text-[#BBA588]">
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4" />
                      <span className="font-serif">{featuredPost.author}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4" />
                      <span className="font-serif">{featuredPost.date}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4" />
                      <span className="font-serif">{featuredPost.readTime}</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
                    <div className="flex flex-wrap gap-2">
                      {featuredPost.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs bg-[#BBA588]/20 text-[#8E735B] dark:bg-[#BBA588]/30 dark:text-[#BBA588] font-serif">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <Button className="btn-classic text-white shadow-lg hover:shadow-xl transition-all duration-300 w-full sm:w-auto font-serif">
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
              <h2 className="text-2xl sm:text-3xl font-bold text-[#2D2C2A] dark:text-[#ECE8D9] font-serif-display">
                Latest from the Journal
              </h2>
              <Badge variant="secondary" className="px-3 py-1 self-start sm:self-auto bg-[#BBA588]/20 text-[#8E735B] dark:bg-[#BBA588]/30 dark:text-[#BBA588] font-serif">
                {filteredPosts.length} stories
              </Badge>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
              {filteredPosts.map((post, index) => (
                <Card key={index} className="glass-classic border-[#BBA588]/40 dark:border-[#BBA588]/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group overflow-hidden rounded-2xl">
                  <div className="aspect-video bg-gradient-to-br from-[#BBA588]/20 to-[#8E735B]/20 flex items-center justify-center">
                    <Compass className="text-3xl sm:text-4xl text-white/50" />
                  </div>

                  <CardContent className="p-4 sm:p-6">
                    <div className="flex items-center justify-between mb-3">
                      <Badge variant="outline" className="text-xs bg-[#BBA588]/10 text-[#8E735B] dark:bg-[#BBA588]/20 dark:text-[#BBA588] border-[#BBA588]/30 font-serif">
                        {post.category}
                      </Badge>
                      <div className="flex items-center space-x-2 sm:space-x-3 text-xs text-[#7C6D64] dark:text-[#BBA588]">
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

                    <h3 className="text-base sm:text-lg font-bold text-[#2D2C2A] dark:text-[#ECE8D9] mb-3 line-clamp-2 group-hover:text-[#8E735B] dark:group-hover:text-[#BBA588] transition-colors leading-tight font-serif-display">
                      {post.title}
                    </h3>

                    <p className="text-[#5A5A5A] dark:text-[#B6B6B6] text-sm mb-4 leading-relaxed line-clamp-3 font-serif">
                      {post.excerpt}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-0 sm:flex sm:items-center sm:justify-between text-xs text-[#7C6D64] dark:text-[#BBA588] mb-4">
                      <div className="flex items-center space-x-2">
                        <User className="h-3 w-3" />
                        <span className="truncate font-serif">{post.author}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-3 w-3" />
                        <span className="truncate font-serif">{post.date}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-3 w-3" />
                        <span className="font-serif">{post.readTime}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {post.tags.slice(0, 2).map((tag, tagIndex) => (
                        <Badge key={tagIndex} variant="secondary" className="text-xs bg-[#BBA588]/20 text-[#8E735B] dark:bg-[#BBA588]/30 dark:text-[#BBA588] font-serif">
                          {tag}
                        </Badge>
                      ))}
                      {post.tags.length > 2 && (
                        <Badge variant="secondary" className="text-xs bg-[#BBA588]/20 text-[#8E735B] dark:bg-[#BBA588]/30 dark:text-[#BBA588] font-serif">
                          +{post.tags.length - 2}
                        </Badge>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <Button variant="ghost" size="sm" className="text-[#8E735B] hover:text-[#7C6D64] dark:text-[#BBA588] dark:hover:text-[#ECE8D9] p-0 font-serif">
                        Read More
                        <ArrowRight className="h-3 w-3 ml-1" />
                      </Button>

                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm" className="p-1 hover:bg-[#BBA588]/20 rounded-full text-[#8E735B] dark:text-[#BBA588]">
                          <Bookmark className="h-3 w-3" />
                        </Button>
                        <Button variant="ghost" size="sm" className="p-1 hover:bg-[#BBA588]/20 rounded-full text-[#8E735B] dark:text-[#BBA588]">
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
            <Card className="glass-classic border-[#BBA588]/40 dark:border-[#BBA588]/20 shadow-2xl rounded-2xl">
              <CardContent className="p-8 sm:p-12">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-[#8E735B] to-[#BBA588] rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <MessageSquare className="h-6 w-6 sm:h-8 sm:w-8 text-[#F3F1E9]" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#2D2C2A] dark:text-[#ECE8D9] mb-4 font-serif-display">
                  Stay Updated
                </h2>
                <p className="text-lg sm:text-xl text-[#5A5A5A] dark:text-[#B6B6B6] mb-8 max-w-2xl mx-auto px-4 font-serif">
                  Subscribe to our newsletter and get the latest travel tips, destination guides,
                  and product updates delivered to your inbox.
                </p>

                <div className="flex flex-col gap-4 justify-center max-w-md mx-auto">
                  <Input
                    placeholder="Enter your email"
                    className="glass-classic border-[#BBA588]/40 dark:border-[#BBA588]/20 font-serif"
                  />
                  <Button className="btn-classic text-white shadow-lg hover:shadow-xl transition-all duration-300 font-serif">
                    Subscribe
                  </Button>
                </div>

                <div className="mt-8 pt-8 border-t border-[#BBA588]/30 dark:border-[#BBA588]/20">
                  <p className="text-xs sm:text-sm text-[#7C6D64] dark:text-[#BBA588] font-serif">
                    Join 10,000+ explorers | Unsubscribe anytime | No spam, ever
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