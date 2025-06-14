"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ThemeToggle } from "@/components/theme-toggle"
import { Footer } from "@/components/footer"
import { Navbar } from "@/components/navbar"
import { 
  
  CheckCircle, 
  AlertTriangle, 
  XCircle,
  Clock,
  Server,
  Database,
  Wifi,
  Shield,
  Zap,
  Globe,
  Calendar,
  ExternalLink,
  Bell,
  Activity,
  Mic,
  ArrowRight
} from "lucide-react"
import Link from "next/link"

export default function StatusPage() {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const systemStatus = {
    overall: "operational", // operational, degraded, outage
    uptime: "99.97%",
    responseTime: "142ms",
    lastIncident: "Dec 8, 2024"
  }

  const services = [
    {
      name: "Voice AI API",
      status: "operational",
      uptime: "99.99%",
      responseTime: "98ms",
      description: "Voice recognition and synthesis services",
      icon: <Wifi className="h-5 w-5" />
    },
    {
      name: "Chat API",
      status: "operational", 
      uptime: "99.98%",
      responseTime: "145ms",
      description: "Text-based conversation processing",
      icon: <Server className="h-5 w-5" />
    },
    {
      name: "Analytics Platform",
      status: "operational",
      uptime: "99.96%",
      responseTime: "234ms", 
      description: "Real-time analytics and reporting",
      icon: <Activity className="h-5 w-5" />
    },
    {
      name: "Database Cluster",
      status: "operational",
      uptime: "99.99%",
      responseTime: "12ms",
      description: "Primary data storage systems",
      icon: <Database className="h-5 w-5" />
    },
    {
      name: "CDN Network",
      status: "operational",
      uptime: "99.95%",
      responseTime: "67ms",
      description: "Global content delivery network",
      icon: <Globe className="h-5 w-5" />
    },
    {
      name: "Authentication Services",
      status: "operational",
      uptime: "99.97%",
      responseTime: "89ms",
      description: "User authentication and security",
      icon: <Shield className="h-5 w-5" />
    }
  ]

  const regions = [
    {
      name: "North America (US-East)",
      status: "operational",
      responseTime: "98ms",
      location: "Virginia, USA"
    },
    {
      name: "Europe (EU-West)", 
      status: "operational",
      responseTime: "112ms",
      location: "Frankfurt, Germany"
    },
    {
      name: "Asia Pacific (AP-South)",
      status: "operational", 
      responseTime: "78ms",
      location: "Mumbai, India"
    },
    {
      name: "Asia Pacific (AP-Southeast)",
      status: "operational",
      responseTime: "134ms",
      location: "Singapore"
    }
  ]

  const recentIncidents = [
    {
      id: 1,
      title: "Temporary API Rate Limiting Issues",
      status: "resolved",
      impact: "minor",
      startTime: "Dec 8, 2024 14:30 UTC",
      resolvedTime: "Dec 8, 2024 15:45 UTC",
      duration: "1h 15m",
      description: "Some users experienced rate limiting errors on voice API endpoints. Issue resolved by scaling backend infrastructure."
    },
    {
      id: 2,
      title: "Scheduled Database Maintenance",
      status: "completed",
      impact: "none",
      startTime: "Dec 5, 2024 02:00 UTC", 
      resolvedTime: "Dec 5, 2024 04:30 UTC",
      duration: "2h 30m",
      description: "Planned database optimization and security updates completed successfully with no user impact."
    },
    {
      id: 3,
      title: "CDN Cache Refresh Delays",
      status: "resolved",
      impact: "minor",
      startTime: "Dec 2, 2024 08:15 UTC",
      resolvedTime: "Dec 2, 2024 09:00 UTC", 
      duration: "45m",
      description: "Users in some regions experienced slower response times due to CDN cache refresh issues."
    }
  ]

  const upcomingMaintenance = [
    {
      title: "API Gateway Security Updates",
      scheduledTime: "Dec 22, 2024 02:00 UTC",
      duration: "2 hours",
      impact: "No expected impact",
      description: "Routine security patches and performance optimizations"
    },
    {
      title: "Database Index Optimization",
      scheduledTime: "Dec 28, 2024 01:00 UTC",
      duration: "3 hours", 
      impact: "Minimal impact expected",
      description: "Database performance improvements and index optimization"
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "operational":
        return "text-green-600 bg-green-50 border-green-200"
      case "degraded":
        return "text-yellow-600 bg-yellow-50 border-yellow-200"
      case "outage":
        return "text-red-600 bg-red-50 border-red-200"
      default:
        return "text-gray-600 bg-gray-50 border-gray-200"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "operational":
        return <CheckCircle className="h-4 w-4" />
      case "degraded":
        return <AlertTriangle className="h-4 w-4" />
      case "outage":
        return <XCircle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "minor":
        return "bg-yellow-100 text-yellow-800"
      case "major":
        return "bg-red-100 text-red-800"
      case "none":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-blue-50 to-cyan-50 dark:from-slate-950 dark:via-blue-950 dark:to-violet-950 transition-all duration-500">      {/* Enhanced Background Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-48 -right-48 w-96 h-96 gradient-mesh rounded-full blur-3xl opacity-30 animate-float"></div>
        <div className="absolute -bottom-48 -left-48 w-96 h-96 bg-gradient-to-tr from-cyan-400/20 via-blue-500/20 to-violet-600/20 rounded-full blur-3xl opacity-30 animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-r from-blue-400/10 to-violet-600/10 rounded-full blur-2xl animate-pulse-slow"></div>
      </div>

      <Navbar />      <div className="relative pt-20 lg:pt-24 pb-12 lg:pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">{/* Header */}
          <div className="text-center mb-12 lg:mb-16">
            <Badge className={`mb-4 lg:mb-6 px-3 lg:px-4 py-2 text-xs lg:text-sm font-medium shadow-md ${getStatusColor(systemStatus.overall)}`}>
              {getStatusIcon(systemStatus.overall)}
              <span className="ml-2">All Systems Operational</span>
            </Badge>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 lg:mb-8">
              <span className="block text-slate-900 dark:text-white mb-2">System</span>
              <span className="block bg-gradient-to-r from-blue-600 via-violet-600 to-cyan-600 bg-clip-text text-transparent">
                Status
              </span>
            </h1>
            
            <p className="text-lg lg:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed mb-6 px-4">
              Real-time status and performance metrics for all SalesSpeak services and infrastructure.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4 text-xs lg:text-sm text-slate-500 dark:text-slate-400 px-4">
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span className="text-center">Last Updated: {currentTime.toLocaleString()}</span>
              </div>
            </div>
          </div>          {/* Overall Metrics */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6 mb-12 lg:mb-16">
            <Card className="glass border-white/30 dark:border-slate-700/50 shadow-lg">
              <CardContent className="p-4 lg:p-6">
                <div className="flex items-center justify-between mb-3 lg:mb-4">
                  <div className="w-10 lg:w-12 h-10 lg:h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center text-white shadow-lg">
                    <CheckCircle className="h-5 lg:h-6 w-5 lg:w-6" />
                  </div>
                  <Badge className="bg-green-100 text-green-800 text-xs lg:text-sm">30 days</Badge>
                </div>
                <div className="text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white mb-1">
                  {systemStatus.uptime}
                </div>
                <div className="text-base lg:text-lg font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Uptime
                </div>
                <div className="text-xs lg:text-sm text-slate-500 dark:text-slate-400">
                  Above SLA target of 99.9%
                </div>
              </CardContent>
            </Card>

            <Card className="glass border-white/30 dark:border-slate-700/50 shadow-lg">
              <CardContent className="p-4 lg:p-6">
                <div className="flex items-center justify-between mb-3 lg:mb-4">
                  <div className="w-10 lg:w-12 h-10 lg:h-12 bg-gradient-to-br from-blue-500 to-violet-500 rounded-lg flex items-center justify-center text-white shadow-lg">
                    <Zap className="h-5 lg:h-6 w-5 lg:w-6" />
                  </div>
                  <Badge className="bg-blue-100 text-blue-800 text-xs lg:text-sm">24h avg</Badge>
                </div>
                <div className="text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white mb-1">
                  {systemStatus.responseTime}
                </div>
                <div className="text-base lg:text-lg font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Response Time
                </div>
                <div className="text-xs lg:text-sm text-slate-500 dark:text-slate-400">
                  Global average API response
                </div>
              </CardContent>
            </Card>

            <Card className="glass border-white/30 dark:border-slate-700/50 shadow-lg">
              <CardContent className="p-4 lg:p-6">
                <div className="flex items-center justify-between mb-3 lg:mb-4">
                  <div className="w-10 lg:w-12 h-10 lg:h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center text-white shadow-lg">
                    <AlertTriangle className="h-5 lg:h-6 w-5 lg:w-6" />
                  </div>
                  <Badge className="bg-orange-100 text-orange-800 text-xs lg:text-sm">History</Badge>
                </div>
                <div className="text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white mb-1">
                  {systemStatus.lastIncident}
                </div>
                <div className="text-base lg:text-lg font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Last Incident
                </div>
                <div className="text-xs lg:text-sm text-slate-500 dark:text-slate-400">
                  Minor API rate limiting issue
                </div>
              </CardContent>
            </Card>
          </div>          {/* Services Status */}
          <div className="mb-12 lg:mb-16">
            <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white mb-6 lg:mb-8">Service Status</h2>
            <div className="space-y-3 lg:space-y-4">
              {services.map((service, index) => (
                <Card key={index} className="glass border-white/30 dark:border-slate-700/50 shadow-lg">
                  <CardContent className="p-4 lg:p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                      <div className="flex items-start lg:items-center space-x-3 lg:space-x-4">
                        <div className={`w-8 lg:w-10 h-8 lg:h-10 ${getStatusColor(service.status)} rounded-lg flex items-center justify-center shadow-md flex-shrink-0`}>
                          {service.icon}
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="text-base lg:text-lg font-bold text-slate-900 dark:text-white">
                            {service.name}
                          </h3>
                          <p className="text-slate-600 dark:text-slate-300 text-sm lg:text-base">
                            {service.description}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between lg:justify-end lg:space-x-6 text-sm">
                        <div className="flex items-center space-x-4 lg:space-x-6">
                          <div className="text-center">
                            <div className="font-semibold text-slate-900 dark:text-white text-sm lg:text-base">
                              {service.uptime}
                            </div>
                            <div className="text-slate-500 dark:text-slate-400 text-xs lg:text-sm">
                              Uptime
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="font-semibold text-slate-900 dark:text-white text-sm lg:text-base">
                              {service.responseTime}
                            </div>
                            <div className="text-slate-500 dark:text-slate-400 text-xs lg:text-sm">
                              Response
                            </div>
                          </div>
                        </div>
                        <Badge className={`${getStatusColor(service.status)} text-xs lg:text-sm flex-shrink-0`}>
                          {getStatusIcon(service.status)}
                          <span className="ml-1 capitalize">{service.status}</span>
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>          {/* Regional Status */}
          <div className="mb-12 lg:mb-16">
            <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white mb-6 lg:mb-8">Regional Performance</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
              {regions.map((region, index) => (
                <Card key={index} className="glass border-white/30 dark:border-slate-700/50 shadow-lg">
                  <CardContent className="p-4 lg:p-6">
                    <div className="flex items-center justify-between mb-3 lg:mb-4">
                      <h3 className="text-base lg:text-lg font-bold text-slate-900 dark:text-white flex-1 min-w-0">
                        <span className="block lg:inline">{region.name}</span>
                      </h3>
                      <Badge className={`${getStatusColor(region.status)} text-xs lg:text-sm flex-shrink-0 ml-2`}>
                        {getStatusIcon(region.status)}
                        <span className="ml-1 capitalize">{region.status}</span>
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm lg:text-base">
                      <div className="text-slate-600 dark:text-slate-300">
                        {region.location}
                      </div>
                      <div className="font-semibold text-slate-900 dark:text-white">
                        {region.responseTime}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>          {/* Recent Incidents */}
          <div className="mb-12 lg:mb-16">
            <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white mb-6 lg:mb-8">Recent Incidents</h2>
            <div className="space-y-4 lg:space-y-6">
              {recentIncidents.map((incident) => (
                <Card key={incident.id} className="glass border-white/30 dark:border-slate-700/50 shadow-lg">
                  <CardContent className="p-4 lg:p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 mb-3">
                          <h3 className="text-base lg:text-lg font-bold text-slate-900 dark:text-white">
                            {incident.title}
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            <Badge className={`${getImpactColor(incident.impact)} border-0 text-xs lg:text-sm`}>
                              {incident.impact} impact
                            </Badge>
                            <Badge variant="outline" className="text-green-700 border-green-200 bg-green-50 text-xs lg:text-sm">
                              {incident.status}
                            </Badge>
                          </div>
                        </div>
                        <p className="text-slate-600 dark:text-slate-300 mb-4 text-sm lg:text-base">
                          {incident.description}
                        </p>
                        <div className="flex flex-col lg:flex-row lg:items-center space-y-2 lg:space-y-0 lg:space-x-6 text-xs lg:text-sm text-slate-500 dark:text-slate-400">
                          <div className="flex items-center space-x-1">
                            <Clock className="h-3 lg:h-4 w-3 lg:w-4 flex-shrink-0" />
                            <span>Started: {incident.startTime}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <CheckCircle className="h-3 lg:h-4 w-3 lg:w-4 flex-shrink-0" />
                            <span>Resolved: {incident.resolvedTime}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-3 lg:h-4 w-3 lg:w-4 flex-shrink-0" />
                            <span>Duration: {incident.duration}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>          {/* Upcoming Maintenance */}
          <div className="mb-12 lg:mb-16">
            <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white mb-6 lg:mb-8">Scheduled Maintenance</h2>
            <div className="space-y-3 lg:space-y-4">
              {upcomingMaintenance.map((maintenance, index) => (
                <Card key={index} className="glass border-white/30 dark:border-slate-700/50 shadow-lg">
                  <CardContent className="p-4 lg:p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base lg:text-lg font-bold text-slate-900 dark:text-white mb-2">
                          {maintenance.title}
                        </h3>
                        <p className="text-slate-600 dark:text-slate-300 mb-3 text-sm lg:text-base">
                          {maintenance.description}
                        </p>
                        <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-6 text-xs lg:text-sm text-slate-500 dark:text-slate-400">
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-3 lg:h-4 w-3 lg:w-4 flex-shrink-0" />
                            <span>Scheduled: {maintenance.scheduledTime}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="h-3 lg:h-4 w-3 lg:w-4 flex-shrink-0" />
                            <span>Duration: {maintenance.duration}</span>
                          </div>
                        </div>
                      </div>
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 text-xs lg:text-sm flex-shrink-0 self-start lg:self-center">
                        {maintenance.impact}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>          {/* Subscribe CTA */}
          <div className="text-center">
            <Card className="glass-strong border-white/30 dark:border-slate-700/50 shadow-2xl">
              <CardContent className="p-6 lg:p-12">
                <div className="w-12 lg:w-16 h-12 lg:h-16 bg-gradient-to-br from-blue-500 to-violet-600 rounded-2xl flex items-center justify-center mx-auto mb-4 lg:mb-6">
                  <Bell className="h-6 lg:h-8 w-6 lg:w-8 text-white" />
                </div>
                <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white mb-3 lg:mb-4">
                  Stay Updated
                </h2>
                <p className="text-lg lg:text-xl text-slate-600 dark:text-slate-300 mb-6 lg:mb-8 max-w-2xl mx-auto px-4">
                  Subscribe to status updates and get notified about incidents, maintenance, and service changes.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 lg:gap-4 justify-center px-4">
                  <Button size="lg" className="bg-gradient-to-r from-blue-500 via-violet-500 to-purple-500 hover:from-blue-600 hover:via-violet-600 hover:to-purple-600 text-sm lg:text-lg px-6 lg:px-8 py-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                    <Bell className="h-4 lg:h-5 w-4 lg:w-5 mr-2" />
                    Subscribe to Updates
                  </Button>
                  <Button asChild size="lg" variant="outline" className="border-2 border-slate-300 text-slate-700 hover:bg-white/20 backdrop-blur-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-sm lg:text-lg px-6 lg:px-8">
                    <Link href="https://status.salesspeak.ai" target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 lg:h-5 w-4 lg:w-5 mr-2" />
                      <span className="hidden sm:inline">External Status Page</span>
                      <span className="sm:hidden">Status Page</span>
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>      <Footer />
    </div>
  )
}
