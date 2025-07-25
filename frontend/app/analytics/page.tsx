"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Footer } from "@/components/footer"
import { Navbar } from "@/components/navbar"
import Link from "next/link"
import {
  BarChart3,
  TrendingUp,
  Users,
  MessageSquare,
  Phone,
  Target,
  Clock,
  Zap,
  Eye,
  Calendar,
  Filter,
  Download,
  RefreshCw
} from "lucide-react"

export default function AnalyticsPage() {
  const metrics = [
    {
      title: "Total Conversations",
      value: "12,486",
      change: "+23.5%",
      changeType: "positive",
      icon: <MessageSquare className="h-5 w-5" />,
      color: "classic-bronze"
    },
    {
      title: "Conversion Rate",
      value: "34.2%",
      change: "+5.2%",
      changeType: "positive",
      icon: <Target className="h-5 w-5" />,
      color: "classic-walnut"
    },
    {
      title: "Active Users",
      value: "8,247",
      change: "+12.8%",
      changeType: "positive",
      icon: <Users className="h-5 w-5" />,
      color: "classic-taupe"
    },
    {
      title: "Avg Response Time",
      value: "1.3s",
      change: "-0.2s",
      changeType: "positive",
      icon: <Clock className="h-5 w-5" />,
      color: "classic-bronze"
    }
  ]

  const channels = [
    { name: "Voice Calls", value: 45, count: "5,617", color: "bg-[#8E735B]" },
    { name: "Chat Messages", value: 30, count: "3,746", color: "bg-[#BBA588]" },
    { name: "WhatsApp", value: 15, count: "1,872", color: "bg-[#7C6D64]" },
    { name: "SMS", value: 10, count: "1,251", color: "bg-[#BBA588]/80" }
  ]

  const recentActivity = [
    {
      type: "conversation",
      user: "Priya Sharma",
      action: "Completed lead qualification call",
      time: "2 minutes ago",
      status: "success"
    },
    {
      type: "conversion",
      user: "Rajesh Kumar",
      action: "Converted to premium plan",
      time: "5 minutes ago",
      status: "success"
    },
    {
      type: "alert",
      user: "System",
      action: "High volume detected - Mumbai region",
      time: "8 minutes ago",
      status: "warning"
    },
    {
      type: "conversation",
      user: "Anita Patel",
      action: "Started product demo conversation",
      time: "12 minutes ago",
      status: "info"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F3F1E9] via-[#ECE8D9] to-[#F3F1E9] dark:from-[#1E1E1E] dark:via-[#2A2A2A] dark:to-[#1E1E1E] transition-all duration-700">
      {/* Classic Background Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-48 -right-48 w-96 h-96 gradient-classic-mesh rounded-full blur-3xl opacity-30 animate-float"></div>
        <div className="absolute -bottom-48 -left-48 w-96 h-96 bg-gradient-to-tr from-[#BBA588]/20 via-[#8E735B]/20 to-[#7C6D64]/20 rounded-full blur-3xl opacity-30 animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-r from-[#BBA588]/10 to-[#8E735B]/10 rounded-full blur-2xl animate-pulse-slow"></div>      </div>      {/* Enhanced Navigation */}
      <Navbar />

      <div className="relative z-10">        {/* Header Section */}
        <div className="pt-8 sm:pt-10 md:pt-12 pb-6 sm:pb-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 sm:mb-8 space-y-4 lg:space-y-0">
              <div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 leading-tight font-serif-display">
                  <span className="block text-[#2D2C2A] dark:text-[#ECE8D9] mb-1 sm:mb-2">Analytics</span>
                  <span className="block bg-gradient-to-r from-[#8E735B] via-[#BBA588] to-[#7C6D64] bg-clip-text text-transparent animate-gradient">
                    Dashboard
                  </span>
                </h1>
                <p className="text-[#5A5A5A] dark:text-[#B6B6B6] text-base sm:text-lg leading-relaxed font-medium max-w-2xl font-serif">
                  Real-time insights and performance metrics for your sophisticated AI sales conversations
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
                <Button
                  variant="outline"
                  className="glass-classic border-[#BBA588]/40 dark:border-[#BBA588]/20 hover:border-[#BBA588]/60 dark:hover:border-[#BBA588]/40 transition-all duration-300 w-full sm:w-auto font-serif"
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
                <Button
                  variant="outline"
                  className="glass-classic border-[#BBA588]/40 dark:border-[#BBA588]/20 hover:border-[#BBA588]/60 dark:hover:border-[#BBA588]/40 transition-all duration-300 w-full sm:w-auto font-serif"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
                <Button className="btn-classic text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 w-full sm:w-auto font-serif">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh
                </Button>
              </div>
            </div>
          </div>
        </div>        {/* Metrics Grid */}
        <div className="px-4 sm:px-6 lg:px-8 mb-8 sm:mb-10 md:mb-12">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">
              {metrics.map((metric, index) => (
                <Card key={metric.title} className="glass-classic border-[#BBA588]/40 dark:border-[#BBA588]/20 hover:border-[#BBA588]/60 dark:hover:border-[#BBA588]/40 hover:shadow-xl transition-all duration-300 hover:scale-105 group rounded-2xl">
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex items-center justify-between mb-3 sm:mb-4">
                      <div className="p-2 sm:p-3 rounded-xl bg-gradient-to-br from-[#BBA588]/20 to-[#8E735B]/20 backdrop-blur-sm">
                        <div className="text-[#8E735B] dark:text-[#BBA588]">
                          {metric.icon}
                        </div>
                      </div>
                      <Badge
                        className={`${metric.changeType === 'positive'
                            ? 'bg-[#7C6D64]/20 text-[#8E735B] dark:bg-[#8E735B]/20 dark:text-[#BBA588]'
                            : 'bg-red-100/80 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                          } border-0 backdrop-blur-sm text-xs sm:text-sm font-serif`}
                      >
                        {metric.change}
                      </Badge>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs sm:text-sm font-medium text-[#5A5A5A] dark:text-[#B6B6B6] font-serif">
                        {metric.title}
                      </p>
                      <p className="text-2xl sm:text-3xl font-bold text-[#2D2C2A] dark:text-[#ECE8D9] font-serif-display">
                        {metric.value}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>        {/* Charts Section */}
        <div className="px-4 sm:px-6 lg:px-8 mb-8 sm:mb-10 md:mb-12">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
              {/* Conversation Channels */}
              <div className="lg:col-span-2">
                <Card className="glass-classic border-[#BBA588]/40 dark:border-[#BBA588]/20 hover:border-[#BBA588]/60 dark:hover:border-[#BBA588]/40 hover:shadow-xl transition-all duration-300 rounded-2xl">
                  <CardHeader className="pb-4 sm:pb-6">
                    <CardTitle className="flex items-center text-[#2D2C2A] dark:text-[#ECE8D9] text-lg sm:text-xl font-serif-display">
                      <BarChart3 className="h-4 w-4 sm:h-5 sm:w-5 mr-2 sm:mr-3 text-[#8E735B] dark:text-[#BBA588]" />
                      Conversation Channels
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="px-4 sm:px-6">
                    <div className="space-y-4 sm:space-y-6">
                      {channels.map((channel, index) => (
                        <div key={channel.name} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium text-[#5A5A5A] dark:text-[#B6B6B6] font-serif">
                              {channel.name}
                            </span>
                            <div className="text-right">
                              <span className="text-sm font-bold text-[#2D2C2A] dark:text-[#ECE8D9] font-serif-display">
                                {channel.count}
                              </span>
                              <span className="text-xs text-[#7C6D64] dark:text-[#BBA588] ml-2 font-serif">
                                ({channel.value}%)
                              </span>
                            </div>
                          </div>
                          <Progress value={channel.value} className="h-2 sm:h-3" />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Performance Summary */}
              <div>
                <Card className="glass-classic border-[#BBA588]/40 dark:border-[#BBA588]/20 hover:border-[#BBA588]/60 dark:hover:border-[#BBA588]/40 hover:shadow-xl transition-all duration-300 rounded-2xl">
                  <CardHeader className="pb-4 sm:pb-6">
                    <CardTitle className="flex items-center text-[#2D2C2A] dark:text-[#ECE8D9] text-lg sm:text-xl font-serif-display">
                      <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 mr-2 sm:mr-3 text-[#8E735B] dark:text-[#BBA588]" />
                      Performance
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="px-4 sm:px-6">
                    <div className="space-y-4 sm:space-y-6">
                      <div className="text-center p-4 sm:p-6 rounded-xl bg-gradient-to-r from-[#BBA588]/10 to-[#8E735B]/10 dark:from-[#BBA588]/20 dark:to-[#8E735B]/20 border border-[#BBA588]/30 dark:border-[#BBA588]/20">
                        <div className="text-2xl sm:text-3xl font-bold text-[#8E735B] dark:text-[#BBA588] mb-2 font-serif-display">
                          94.2%
                        </div>
                        <div className="text-xs sm:text-sm text-[#7C6D64] dark:text-[#BBA588] font-medium font-serif">
                          Success Rate
                        </div>
                      </div>

                      <div className="space-y-3 sm:space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-xs sm:text-sm text-[#5A5A5A] dark:text-[#B6B6B6] font-serif">Accuracy</span>
                          <span className="font-semibold text-[#2D2C2A] dark:text-[#ECE8D9] text-sm sm:text-base font-serif-display">96.8%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-xs sm:text-sm text-[#5A5A5A] dark:text-[#B6B6B6] font-serif">Uptime</span>
                          <span className="font-semibold text-[#2D2C2A] dark:text-[#ECE8D9] text-sm sm:text-base font-serif-display">99.9%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-xs sm:text-sm text-[#5A5A5A] dark:text-[#B6B6B6] font-serif">Satisfaction</span>
                          <span className="font-semibold text-[#2D2C2A] dark:text-[#ECE8D9] text-sm sm:text-base font-serif-display">4.8/5</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>        {/* Recent Activity */}
        <div className="px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20 md:pb-24">
          <div className="max-w-7xl mx-auto">
            <Card className="glass-classic border-[#BBA588]/40 dark:border-[#BBA588]/20 hover:border-[#BBA588]/60 dark:hover:border-[#BBA588]/40 hover:shadow-xl transition-all duration-300 rounded-2xl">
              <CardHeader className="pb-4 sm:pb-6">
                <CardTitle className="flex items-center text-[#2D2C2A] dark:text-[#ECE8D9] text-lg sm:text-xl font-serif-display">
                  <Clock className="h-4 w-4 sm:h-5 sm:w-5 mr-2 sm:mr-3 text-[#8E735B] dark:text-[#BBA588]" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent className="px-4 sm:px-6">
                <div className="space-y-3 sm:space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-start space-x-3 sm:space-x-4 p-3 sm:p-4 rounded-xl hover:bg-[#F3F1E9]/30 dark:hover:bg-[#1E1E1E]/30 transition-all duration-300">
                      <div className={`p-1.5 sm:p-2 rounded-lg ${activity.status === 'success' ? 'bg-[#BBA588]/20 dark:bg-[#BBA588]/30' :
                          activity.status === 'warning' ? 'bg-[#8E735B]/20 dark:bg-[#8E735B]/30' :
                            'bg-[#7C6D64]/20 dark:bg-[#7C6D64]/30'
                        } flex-shrink-0`}>
                        {activity.type === 'conversation' && <MessageSquare className="h-3 w-3 sm:h-4 sm:w-4 text-[#8E735B] dark:text-[#BBA588]" />}
                        {activity.type === 'conversion' && <Target className="h-3 w-3 sm:h-4 sm:w-4 text-[#8E735B] dark:text-[#BBA588]" />}
                        {activity.type === 'alert' && <Zap className="h-3 w-3 sm:h-4 sm:w-4 text-[#7C6D64] dark:text-[#BBA588]" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-[#2D2C2A] dark:text-[#ECE8D9] truncate font-serif-display">
                          {activity.user}
                        </p>
                        <p className="text-xs sm:text-sm text-[#5A5A5A] dark:text-[#B6B6B6] font-serif">
                          {activity.action}
                        </p>
                      </div>
                      <div className="text-xs text-[#7C6D64] dark:text-[#BBA588] flex-shrink-0 font-serif">
                        {activity.time}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 sm:mt-6 text-center">
                  <Button
                    variant="outline"
                    className="glass-classic border-[#BBA588]/40 dark:border-[#BBA588]/20 hover:border-[#BBA588]/60 dark:hover:border-[#BBA588]/40 transition-all duration-300 w-full sm:w-auto font-serif"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    View All Activity
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
