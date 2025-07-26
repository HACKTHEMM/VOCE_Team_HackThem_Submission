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
  PhoneCall,
  Shield,
  Zap,
  Globe,
  Calendar,
  ExternalLink,
  Bell,
  Activity,
  Mic,
  ArrowRight,
  ClipboardCheck,
  User,
  MapPinned
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
    uptime: "99.98%",
    responseTime: "112ms",
    lastIncident: "Jul 15, 2025"
  }

  const services = [
    {
      name: "Primary Voice Agent",
      status: "operational",
      uptime: "99.99%",
      responseTime: "98ms",
      description: "Real-time travel guidance and local information",
      icon: <PhoneCall className="h-5 w-5" />
    },
    {
      name: "Booking & Reservations",
      status: "operational",
      uptime: "99.98%",
      responseTime: "145ms",
      description: "Connecting to partners for reservations",
      icon: <ClipboardCheck className="h-5 w-5" />
    },
    {
      name: "Personalization Engine",
      status: "operational",
      uptime: "99.96%",
      responseTime: "234ms",
      description: "Tailoring recommendations based on preferences",
      icon: <Activity className="h-5 w-5" />
    },
    {
      name: "Traveler Data Storage",
      status: "operational",
      uptime: "99.99%",
      responseTime: "12ms",
      description: "Secure storage for travel profiles and history",
      icon: <Database className="h-5 w-5" />
    },
    {
      name: "Global Content Delivery",
      status: "operational",
      uptime: "99.95%",
      responseTime: "67ms",
      description: "Ensuring fast access to local guides and information",
      icon: <Globe className="h-5 w-5" />
    },
    {
      name: "User Account Services",
      status: "operational",
      uptime: "99.97%",
      responseTime: "89ms",
      description: "Traveler authentication and profile security",
      icon: <User className="h-5 w-5" />
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
      title: "Temporary Voice Agent Delays",
      status: "resolved",
      impact: "minor",
      startTime: "Jul 15, 2025 14:30 UTC",
      resolvedTime: "Jul 15, 2025 15:45 UTC",
      duration: "1h 15m",
      description: "Some travelers experienced brief delays in call responses. Issue resolved by scaling backend infrastructure."
    },
    {
      id: 2,
      title: "Scheduled Database Maintenance",
      status: "completed",
      impact: "none",
      startTime: "Jul 12, 2025 02:00 UTC",
      resolvedTime: "Jul 12, 2025 04:30 UTC",
      duration: "2h 30m",
      description: "Planned database optimization and security updates completed successfully with no user impact."
    },
    {
      id: 3,
      title: "CDN Cache Refresh Delays in Southeast Asia",
      status: "resolved",
      impact: "minor",
      startTime: "Jul 10, 2025 08:15 UTC",
      resolvedTime: "Jul 10, 2025 09:00 UTC",
      duration: "45m",
      description: "Travelers in some regions experienced slower response times due to CDN cache refresh issues."
    }
  ]

  const upcomingMaintenance = [
    {
      title: "Voice Gateway Security Updates",
      scheduledTime: "Aug 5, 2025 02:00 UTC",
      duration: "2 hours",
      impact: "No expected impact",
      description: "Routine security patches and performance optimizations for our voice infrastructure"
    },
    {
      title: "Traveler Database Index Optimization",
      scheduledTime: "Aug 12, 2025 01:00 UTC",
      duration: "3 hours",
      impact: "Minimal impact expected",
      description: "Database performance improvements for faster access to travel history and preferences"
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "operational":
        return "text-[#BBA588] bg-[#BBA588]/10 border-[#BBA588]/30"
      case "degraded":
        return "text-[#8E735B] bg-[#8E735B]/10 border-[#8E735B]/30"
      case "outage":
        return "text-[#7C6D64] bg-[#7C6D64]/10 border-[#7C6D64]/30"
      default:
        return "text-[#5A5A5A] bg-[#5A5A5A]/10 border-[#5A5A5A]/30"
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
        return "bg-[#8E735B]/20 text-[#8E735B]"
      case "major":
        return "bg-[#7C6D64]/20 text-[#7C6D64]"
      case "none":
        return "bg-[#BBA588]/20 text-[#BBA588]"
      default:
        return "bg-[#5A5A5A]/20 text-[#5A5A5A]"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F3F1E9] via-[#ECE8D9] to-[#F3F1E9] dark:from-[#1E1E1E] dark:via-[#2A2A2A] dark:to-[#1E1E1E] transition-all duration-500">      {/* Classic Background Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-48 -right-48 w-96 h-96 gradient-classic-mesh rounded-full blur-3xl opacity-30 animate-float"></div>
        <div className="absolute -bottom-48 -left-48 w-96 h-96 bg-gradient-to-tr from-[#BBA588]/20 via-[#8E735B]/20 to-[#7C6D64]/20 rounded-full blur-3xl opacity-30 animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-r from-[#BBA588]/10 to-[#8E735B]/10 rounded-full blur-2xl animate-pulse-slow"></div>
      </div>

      <Navbar />      <div className="relative pt-20 lg:pt-24 pb-12 lg:pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">{/* Header */}
          <div className="text-center mb-12 lg:mb-16">
            <Badge className={`mb-4 lg:mb-6 px-3 lg:px-4 py-2 text-xs lg:text-sm font-medium shadow-md ${getStatusColor(systemStatus.overall)} font-serif`}>
              {getStatusIcon(systemStatus.overall)}
              <span className="ml-2">All Systems Operational</span>
            </Badge>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 lg:mb-8 font-serif-display">
              <span className="block text-[#2D2C2A] dark:text-[#ECE8D9] mb-2">System</span>
              <span className="block bg-gradient-to-r from-[#8E735B] via-[#BBA588] to-[#7C6D64] bg-clip-text text-transparent">
                Status
              </span>
            </h1>

            <p className="text-lg lg:text-xl text-[#5A5A5A] dark:text-[#B6B6B6] max-w-3xl mx-auto leading-relaxed mb-6 px-4 font-serif">
              Real-time status and performance metrics for all Voce services and infrastructure.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4 text-xs lg:text-sm text-[#7C6D64] dark:text-[#B6B6B6] px-4">
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span className="text-center font-serif">Last Updated: {currentTime.toLocaleString()}</span>
              </div>
            </div>
          </div>          {/* Overall Metrics */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6 mb-12 lg:mb-16">
            <Card className="glass-classic border-[#BBA588]/30 dark:border-[#BBA588]/20 shadow-lg">
              <CardContent className="p-4 lg:p-6">
                <div className="flex items-center justify-between mb-3 lg:mb-4">
                  <div className="w-10 lg:w-12 h-10 lg:h-12 bg-gradient-to-br from-[#BBA588]/20 to-[#8E735B]/20 backdrop-blur-sm rounded-lg flex items-center justify-center text-[#BBA588] shadow-lg">
                    <CheckCircle className="h-5 lg:h-6 w-5 lg:w-6" />
                  </div>
                  <Badge className="bg-[#BBA588]/20 text-[#BBA588] text-xs lg:text-sm font-serif">30 days</Badge>
                </div>
                <div className="text-2xl lg:text-3xl font-bold text-[#2D2C2A] dark:text-[#ECE8D9] mb-1 font-serif-display">
                  {systemStatus.uptime}
                </div>
                <div className="text-base lg:text-lg font-semibold text-[#5A5A5A] dark:text-[#B6B6B6] mb-1 font-serif">
                  Uptime
                </div>
                <div className="text-xs lg:text-sm text-[#7C6D64] dark:text-[#B6B6B6] font-serif">
                  Above our commitment of 99.9%
                </div>
              </CardContent>
            </Card>

            <Card className="glass-classic border-[#BBA588]/30 dark:border-[#BBA588]/20 shadow-lg">
              <CardContent className="p-4 lg:p-6">
                <div className="flex items-center justify-between mb-3 lg:mb-4">
                  <div className="w-10 lg:w-12 h-10 lg:h-12 bg-gradient-to-br from-[#BBA588]/20 to-[#8E735B]/20 backdrop-blur-sm rounded-lg flex items-center justify-center text-[#8E735B] dark:text-[#BBA588] shadow-lg">
                    <Zap className="h-5 lg:h-6 w-5 lg:w-6" />
                  </div>
                  <Badge className="bg-[#8E735B]/20 text-[#8E735B] dark:bg-[#BBA588]/20 dark:text-[#BBA588] text-xs lg:text-sm font-serif">24h avg</Badge>
                </div>
                <div className="text-2xl lg:text-3xl font-bold text-[#2D2C2A] dark:text-[#ECE8D9] mb-1 font-serif-display">
                  {systemStatus.responseTime}
                </div>
                <div className="text-base lg:text-lg font-semibold text-[#5A5A5A] dark:text-[#B6B6B6] mb-1 font-serif">
                  Response Time
                </div>
                <div className="text-xs lg:text-sm text-[#7C6D64] dark:text-[#B6B6B6] font-serif">
                  Global average call response
                </div>
              </CardContent>
            </Card>

            <Card className="glass-classic border-[#BBA588]/30 dark:border-[#BBA588]/20 shadow-lg">
              <CardContent className="p-4 lg:p-6">
                <div className="flex items-center justify-between mb-3 lg:mb-4">
                  <div className="w-10 lg:w-12 h-10 lg:h-12 bg-gradient-to-br from-[#7C6D64]/20 to-[#8E735B]/20 backdrop-blur-sm rounded-lg flex items-center justify-center text-[#7C6D64] dark:text-[#BBA588] shadow-lg">
                    <AlertTriangle className="h-5 lg:h-6 w-5 lg:w-6" />
                  </div>
                  <Badge className="bg-[#7C6D64]/20 text-[#7C6D64] dark:bg-[#BBA588]/20 dark:text-[#BBA588] text-xs lg:text-sm font-serif">History</Badge>
                </div>
                <div className="text-2xl lg:text-3xl font-bold text-[#2D2C2A] dark:text-[#ECE8D9] mb-1 font-serif-display">
                  {systemStatus.lastIncident}
                </div>
                <div className="text-base lg:text-lg font-semibold text-[#5A5A5A] dark:text-[#B6B6B6] mb-1 font-serif">
                  Last Incident
                </div>
                <div className="text-xs lg:text-sm text-[#7C6D64] dark:text-[#B6B6B6] font-serif">
                  Minor voice agent delays
                </div>
              </CardContent>
            </Card>
          </div>          {/* Services Status */}
          <div className="mb-12 lg:mb-16">
            <h2 className="text-2xl lg:text-3xl font-bold text-[#2D2C2A] dark:text-[#ECE8D9] mb-6 lg:mb-8 font-serif-display">Service Status</h2>
            <div className="space-y-3 lg:space-y-4">
              {services.map((service, index) => (
                <Card key={index} className="glass-classic border-[#BBA588]/30 dark:border-[#BBA588]/20 shadow-lg">
                  <CardContent className="p-4 lg:p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                      <div className="flex items-start lg:items-center space-x-3 lg:space-x-4">
                        <div className={`w-8 lg:w-10 h-8 lg:h-10 ${getStatusColor(service.status)} rounded-lg flex items-center justify-center shadow-md flex-shrink-0`}>
                          {service.icon}
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="text-base lg:text-lg font-bold text-[#2D2C2A] dark:text-[#ECE8D9] font-serif-display">
                            {service.name}
                          </h3>
                          <p className="text-[#5A5A5A] dark:text-[#B6B6B6] text-sm lg:text-base font-serif">
                            {service.description}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between lg:justify-end lg:space-x-6 text-sm">
                        <div className="flex items-center space-x-4 lg:space-x-6">
                          <div className="text-center">
                            <div className="font-semibold text-[#2D2C2A] dark:text-[#ECE8D9] text-sm lg:text-base font-serif-display">
                              {service.uptime}
                            </div>
                            <div className="text-[#7C6D64] dark:text-[#B6B6B6] text-xs lg:text-sm font-serif">
                              Uptime
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="font-semibold text-[#2D2C2A] dark:text-[#ECE8D9] text-sm lg:text-base font-serif-display">
                              {service.responseTime}
                            </div>
                            <div className="text-[#7C6D64] dark:text-[#B6B6B6] text-xs lg:text-sm font-serif">
                              Response
                            </div>
                          </div>
                        </div>
                        <Badge className={`${getStatusColor(service.status)} text-xs lg:text-sm flex-shrink-0 font-serif`}>
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
            <h2 className="text-2xl lg:text-3xl font-bold text-[#2D2C2A] dark:text-[#ECE8D9] mb-6 lg:mb-8 font-serif-display">Regional Performance</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
              {regions.map((region, index) => (
                <Card key={index} className="glass-classic border-[#BBA588]/30 dark:border-[#BBA588]/20 shadow-lg">
                  <CardContent className="p-4 lg:p-6">
                    <div className="flex items-center justify-between mb-3 lg:mb-4">
                      <h3 className="text-base lg:text-lg font-bold text-[#2D2C2A] dark:text-[#ECE8D9] flex-1 min-w-0 font-serif-display">
                        <span className="block lg:inline">{region.name}</span>
                      </h3>
                      <Badge className={`${getStatusColor(region.status)} text-xs lg:text-sm flex-shrink-0 ml-2 font-serif`}>
                        {getStatusIcon(region.status)}
                        <span className="ml-1 capitalize">{region.status}</span>
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm lg:text-base">
                      <div className="text-[#5A5A5A] dark:text-[#B6B6B6] font-serif">
                        {region.location}
                      </div>
                      <div className="font-semibold text-[#2D2C2A] dark:text-[#ECE8D9] font-serif-display">
                        {region.responseTime}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>          {/* Recent Incidents */}
          <div className="mb-12 lg:mb-16">
            <h2 className="text-2xl lg:text-3xl font-bold text-[#2D2C2A] dark:text-[#ECE8D9] mb-6 lg:mb-8 font-serif-display">Recent Incidents</h2>
            <div className="space-y-4 lg:space-y-6">
              {recentIncidents.map((incident) => (
                <Card key={incident.id} className="glass-classic border-[#BBA588]/30 dark:border-[#BBA588]/20 shadow-lg">
                  <CardContent className="p-4 lg:p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 mb-3">
                          <h3 className="text-base lg:text-lg font-bold text-[#2D2C2A] dark:text-[#ECE8D9] font-serif-display">
                            {incident.title}
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            <Badge className={`${getImpactColor(incident.impact)} border-0 text-xs lg:text-sm font-serif`}>
                              {incident.impact} impact
                            </Badge>
                            <Badge variant="outline" className="text-[#BBA588] border-[#BBA588]/30 bg-[#BBA588]/10 text-xs lg:text-sm font-serif">
                              {incident.status}
                            </Badge>
                          </div>
                        </div>
                        <p className="text-[#5A5A5A] dark:text-[#B6B6B6] mb-4 text-sm lg:text-base font-serif">
                          {incident.description}
                        </p>
                        <div className="flex flex-col lg:flex-row lg:items-center space-y-2 lg:space-y-0 lg:space-x-6 text-xs lg:text-sm text-[#7C6D64] dark:text-[#B6B6B6]">
                          <div className="flex items-center space-x-1">
                            <Clock className="h-3 lg:h-4 w-3 lg:w-4 flex-shrink-0" />
                            <span className="font-serif">Started: {incident.startTime}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <CheckCircle className="h-3 lg:h-4 w-3 lg:w-4 flex-shrink-0" />
                            <span className="font-serif">Resolved: {incident.resolvedTime}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-3 lg:h-4 w-3 lg:w-4 flex-shrink-0" />
                            <span className="font-serif">Duration: {incident.duration}</span>
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
            <h2 className="text-2xl lg:text-3xl font-bold text-[#2D2C2A] dark:text-[#ECE8D9] mb-6 lg:mb-8 font-serif-display">Scheduled Maintenance</h2>
            <div className="space-y-3 lg:space-y-4">
              {upcomingMaintenance.map((maintenance, index) => (
                <Card key={index} className="glass-classic border-[#BBA588]/30 dark:border-[#BBA588]/20 shadow-lg">
                  <CardContent className="p-4 lg:p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base lg:text-lg font-bold text-[#2D2C2A] dark:text-[#ECE8D9] mb-2 font-serif-display">
                          {maintenance.title}
                        </h3>
                        <p className="text-[#5A5A5A] dark:text-[#B6B6B6] mb-3 text-sm lg:text-base font-serif">
                          {maintenance.description}
                        </p>
                        <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-6 text-xs lg:text-sm text-[#7C6D64] dark:text-[#B6B6B6]">
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-3 lg:h-4 w-3 lg:w-4 flex-shrink-0" />
                            <span className="font-serif">Scheduled: {maintenance.scheduledTime}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="h-3 lg:h-4 w-3 lg:w-4 flex-shrink-0" />
                            <span className="font-serif">Duration: {maintenance.duration}</span>
                          </div>
                        </div>
                      </div>
                      <Badge variant="outline" className="bg-[#8E735B]/10 text-[#8E735B] border-[#8E735B]/30 dark:bg-[#BBA588]/10 dark:text-[#BBA588] dark:border-[#BBA588]/30 text-xs lg:text-sm flex-shrink-0 self-start lg:self-center font-serif">
                        {maintenance.impact}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>          {/* Subscribe CTA */}
          <div className="text-center">
            <Card className="glass-classic-strong border-[#BBA588]/40 dark:border-[#BBA588]/20 shadow-2xl">
              <CardContent className="p-6 lg:p-12">
                <div className="w-12 lg:w-16 h-12 lg:h-16 bg-gradient-to-br from-[#BBA588]/20 to-[#8E735B]/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4 lg:mb-6">
                  <Bell className="h-6 lg:h-8 w-6 lg:w-8 text-[#8E735B] dark:text-[#BBA588]" />
                </div>
                <h2 className="text-2xl lg:text-3xl font-bold text-[#2D2C2A] dark:text-[#ECE8D9] mb-3 lg:mb-4 font-serif-display">
                  Stay Updated
                </h2>
                <p className="text-lg lg:text-xl text-[#5A5A5A] dark:text-[#B6B6B6] mb-6 lg:mb-8 max-w-2xl mx-auto px-4 font-serif">
                  Subscribe to status updates and get notified about incidents, maintenance, and service changes.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 lg:gap-4 justify-center px-4">
                  <Button size="lg" className="btn-classic text-sm lg:text-lg px-6 lg:px-8 py-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 font-serif">
                    <Bell className="h-4 lg:h-5 w-4 lg:w-5 mr-2" />
                    Subscribe to Updates
                  </Button>
                  <Button asChild size="lg" variant="outline" className="btn-classic-outline shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-sm lg:text-lg px-6 lg:px-8 font-serif">
                    <Link href="https://status.voce.travel" target="_blank" rel="noopener noreferrer">
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