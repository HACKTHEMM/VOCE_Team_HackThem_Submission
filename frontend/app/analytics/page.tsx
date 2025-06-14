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

export default function AnalyticsPage() {  const metrics = [
    {
      title: "Total Conversations",
      value: "12,486",
      change: "+23.5%",
      changeType: "positive",
      icon: <MessageSquare className="h-5 w-5" />,
      color: "blue"
    },
    {
      title: "Conversion Rate",
      value: "34.2%",
      change: "+5.2%",
      changeType: "positive",
      icon: <Target className="h-5 w-5" />,
      color: "green"
    },
    {
      title: "Active Users",
      value: "8,247",
      change: "+12.8%",
      changeType: "positive",
      icon: <Users className="h-5 w-5" />,
      color: "violet"
    },
    {
      title: "Avg Response Time",
      value: "1.3s",
      change: "-0.2s",
      changeType: "positive",
      icon: <Clock className="h-5 w-5" />,
      color: "cyan"
    }
  ]

  const channels = [
    { name: "Voice Calls", value: 45, count: "5,617", color: "bg-blue-500" },
    { name: "Chat Messages", value: 30, count: "3,746", color: "bg-violet-500" },
    { name: "WhatsApp", value: 15, count: "1,872", color: "bg-green-500" },
    { name: "SMS", value: 10, count: "1,251", color: "bg-cyan-500" }
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/50 to-violet-50/50 dark:from-slate-950 dark:via-blue-950/50 dark:to-violet-950/50 transition-all duration-700">
      {/* Enhanced Background Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-48 -right-48 w-96 h-96 gradient-mesh rounded-full blur-3xl opacity-30 animate-float"></div>
        <div className="absolute -bottom-48 -left-48 w-96 h-96 bg-gradient-to-tr from-cyan-400/20 via-blue-500/20 to-violet-600/20 rounded-full blur-3xl opacity-30 animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-r from-blue-400/10 to-violet-600/10 rounded-full blur-2xl animate-pulse-slow"></div>      </div>      {/* Enhanced Navigation */}
      <Navbar />

      <div className="relative z-10">        {/* Header Section */}
        <div className="pt-8 sm:pt-10 md:pt-12 pb-6 sm:pb-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 sm:mb-8 space-y-4 lg:space-y-0">
              <div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 leading-tight">
                  <span className="block text-slate-900 dark:text-white mb-1 sm:mb-2">Analytics</span>
                  <span className="block bg-gradient-to-r from-blue-600 via-violet-600 to-cyan-600 bg-clip-text text-transparent animate-gradient">
                    Dashboard
                  </span>
                </h1>
                <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed font-medium max-w-2xl">
                  Real-time insights and performance metrics for your AI sales conversations
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
                <Button
                  variant="outline" 
                  className="glass-subtle border-white/30 dark:border-slate-700/50 hover:bg-white/40 dark:hover:bg-slate-800/40 transition-all duration-300 w-full sm:w-auto"
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
                <Button
                  variant="outline"
                  className="glass-subtle border-white/30 dark:border-slate-700/50 hover:bg-white/40 dark:hover:bg-slate-800/40 transition-all duration-300 w-full sm:w-auto"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
                <Button className="bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 w-full sm:w-auto">
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
                <Card key={metric.title} className="glass-strong border-white/30 dark:border-slate-700/50 hover:shadow-xl transition-all duration-300 hover:scale-105 group">
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex items-center justify-between mb-3 sm:mb-4">
                      <div className={`p-2 sm:p-3 rounded-xl bg-gradient-to-br from-${metric.color}-500/20 to-${metric.color}-600/30 dark:from-${metric.color}-400/20 dark:to-${metric.color}-500/30`}>
                        <div className={`text-${metric.color}-600 dark:text-${metric.color}-400`}>
                          {metric.icon}
                        </div>
                      </div>
                      <Badge 
                        className={`${
                          metric.changeType === 'positive' 
                            ? 'bg-green-100/80 text-green-800 dark:bg-green-900/30 dark:text-green-300' 
                            : 'bg-red-100/80 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                        } border-0 backdrop-blur-sm text-xs sm:text-sm`}
                      >
                        {metric.change}
                      </Badge>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-400">
                        {metric.title}
                      </p>
                      <p className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
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
                <Card className="glass-strong border-white/30 dark:border-slate-700/50 hover:shadow-xl transition-all duration-300">
                  <CardHeader className="pb-4 sm:pb-6">
                    <CardTitle className="flex items-center text-slate-900 dark:text-white text-lg sm:text-xl">
                      <BarChart3 className="h-4 w-4 sm:h-5 sm:w-5 mr-2 sm:mr-3 text-blue-600 dark:text-blue-400" />
                      Conversation Channels
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="px-4 sm:px-6">
                    <div className="space-y-4 sm:space-y-6">
                      {channels.map((channel, index) => (
                        <div key={channel.name} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                              {channel.name}
                            </span>
                            <div className="text-right">
                              <span className="text-sm font-bold text-slate-900 dark:text-white">
                                {channel.count}
                              </span>
                              <span className="text-xs text-slate-500 dark:text-slate-400 ml-2">
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
                <Card className="glass-strong border-white/30 dark:border-slate-700/50 hover:shadow-xl transition-all duration-300">
                  <CardHeader className="pb-4 sm:pb-6">
                    <CardTitle className="flex items-center text-slate-900 dark:text-white text-lg sm:text-xl">
                      <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 mr-2 sm:mr-3 text-green-600 dark:text-green-400" />
                      Performance
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="px-4 sm:px-6">
                    <div className="space-y-4 sm:space-y-6">
                      <div className="text-center p-4 sm:p-6 rounded-xl bg-gradient-to-r from-green-50/50 to-emerald-50/50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200/50 dark:border-green-600/30">
                        <div className="text-2xl sm:text-3xl font-bold text-green-700 dark:text-green-400 mb-2">
                          94.2%
                        </div>
                        <div className="text-xs sm:text-sm text-green-600 dark:text-green-300 font-medium">
                          Success Rate
                        </div>
                      </div>
                      
                      <div className="space-y-3 sm:space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">Accuracy</span>
                          <span className="font-semibold text-slate-900 dark:text-white text-sm sm:text-base">96.8%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">Uptime</span>
                          <span className="font-semibold text-slate-900 dark:text-white text-sm sm:text-base">99.9%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">Satisfaction</span>
                          <span className="font-semibold text-slate-900 dark:text-white text-sm sm:text-base">4.8/5</span>
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
            <Card className="glass-strong border-white/30 dark:border-slate-700/50 hover:shadow-xl transition-all duration-300">
              <CardHeader className="pb-4 sm:pb-6">
                <CardTitle className="flex items-center text-slate-900 dark:text-white text-lg sm:text-xl">
                  <Clock className="h-4 w-4 sm:h-5 sm:w-5 mr-2 sm:mr-3 text-violet-600 dark:text-violet-400" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent className="px-4 sm:px-6">
                <div className="space-y-3 sm:space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-start space-x-3 sm:space-x-4 p-3 sm:p-4 rounded-xl hover:bg-white/30 dark:hover:bg-slate-800/30 transition-all duration-300">
                      <div className={`p-1.5 sm:p-2 rounded-lg ${
                        activity.status === 'success' ? 'bg-green-100/80 dark:bg-green-900/30' :
                        activity.status === 'warning' ? 'bg-yellow-100/80 dark:bg-yellow-900/30' :
                        'bg-blue-100/80 dark:bg-blue-900/30'
                      } flex-shrink-0`}>
                        {activity.type === 'conversation' && <MessageSquare className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600 dark:text-blue-400" />}
                        {activity.type === 'conversion' && <Target className="h-3 w-3 sm:h-4 sm:w-4 text-green-600 dark:text-green-400" />}
                        {activity.type === 'alert' && <Zap className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-600 dark:text-yellow-400" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-slate-900 dark:text-white truncate">
                          {activity.user}
                        </p>
                        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                          {activity.action}
                        </p>
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 flex-shrink-0">
                        {activity.time}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 sm:mt-6 text-center">
                  <Button 
                    variant="outline"
                    className="glass-subtle border-white/30 dark:border-slate-700/50 hover:bg-white/40 dark:hover:bg-slate-800/40 transition-all duration-300 w-full sm:w-auto"
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
