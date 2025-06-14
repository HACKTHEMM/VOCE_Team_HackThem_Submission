"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ThemeToggle } from "@/components/theme-toggle"
import { Footer } from "@/components/footer"
import { Navbar } from "@/components/navbar"
import { 
  
  Shield, 
  Lock, 
  Eye,
  Server,
  Database,
  FileText,
  Users,
  CheckCircle,
  AlertTriangle,
  Zap,
  Globe,
  Award,
  Key,
  UserCheck,
  Clock,
  Download,
  Mic,
  ArrowRight
} from "lucide-react"
import Link from "next/link"

export default function SecurityPage() {
  const securityFeatures = [
    {
      icon: <Lock className="h-6 w-6" />,
      title: "End-to-End Encryption",
      description: "All voice and text communications are encrypted using AES-256 encryption",
      details: [
        "AES-256 encryption for data at rest",
        "TLS 1.3 for data in transit",
        "Perfect Forward Secrecy (PFS)",
        "Hardware Security Modules (HSM)"
      ]
    },
    {
      icon: <UserCheck className="h-6 w-6" />,
      title: "Identity & Access Management",
      description: "Comprehensive authentication and authorization controls",
      details: [
        "Multi-factor authentication (MFA)",
        "Single Sign-On (SSO) integration",
        "Role-based access control (RBAC)",
        "API key management and rotation"
      ]
    },
    {
      icon: <Server className="h-6 w-6" />,
      title: "Infrastructure Security",
      description: "Secure cloud infrastructure with enterprise-grade protection",
      details: [
        "AWS SOC 2 compliant infrastructure",
        "Network segmentation and firewalls",
        "DDoS protection and mitigation",
        "Intrusion detection and prevention"
      ]
    },
    {
      icon: <Database className="h-6 w-6" />,
      title: "Data Protection",
      description: "Comprehensive data security and privacy safeguards",
      details: [
        "Data loss prevention (DLP)",
        "Automated backup and recovery",
        "Data retention policies",
        "Secure data disposal"
      ]
    }
  ]

  const certifications = [
    {
      name: "SOC 2 Type II",
      description: "Security, availability, and confidentiality controls",
      icon: <Award className="h-8 w-8" />,
      status: "Certified",
      validUntil: "Dec 2025",
      color: "from-blue-500 to-cyan-500"
    },
    {
      name: "ISO 27001",
      description: "Information security management system",
      icon: <Shield className="h-8 w-8" />,
      status: "Certified", 
      validUntil: "Mar 2025",
      color: "from-green-500 to-emerald-500"
    },
    {
      name: "GDPR Compliance",
      description: "European data protection regulation",
      icon: <Globe className="h-8 w-8" />,
      status: "Compliant",
      validUntil: "Ongoing",
      color: "from-purple-500 to-violet-500"
    },
    {
      name: "CCPA Compliance",
      description: "California consumer privacy act",
      icon: <Eye className="h-8 w-8" />,
      status: "Compliant",
      validUntil: "Ongoing", 
      color: "from-orange-500 to-red-500"
    }
  ]

  const securityPractices = [
    {
      category: "Application Security",
      practices: [
        "Secure coding standards and code reviews",
        "Static Application Security Testing (SAST)",
        "Dynamic Application Security Testing (DAST)",
        "Dependency vulnerability scanning",
        "Regular security assessments"
      ]
    },
    {
      category: "Network Security",
      practices: [
        "Zero-trust network architecture",
        "Network traffic encryption",
        "Firewall and intrusion prevention",
        "DDoS protection and monitoring",
        "VPN access for remote connections"
      ]
    },
    {
      category: "Data Security",
      practices: [
        "Data classification and labeling",
        "Encryption key management",
        "Database security hardening",
        "Access logging and monitoring",
        "Data masking and anonymization"
      ]
    },
    {
      category: "Operational Security",
      practices: [
        "24/7 security monitoring (SOC)",
        "Incident response procedures",
        "Regular security training",
        "Vendor security assessments",
        "Business continuity planning"
      ]
    }
  ]

  const incidentResponse = [
    {
      phase: "Detection",
      description: "24/7 monitoring and threat detection",
      timeframe: "< 5 minutes",
      icon: <Eye className="h-5 w-5" />
    },
    {
      phase: "Assessment", 
      description: "Impact analysis and severity classification",
      timeframe: "< 15 minutes",
      icon: <AlertTriangle className="h-5 w-5" />
    },
    {
      phase: "Containment",
      description: "Immediate threat isolation and mitigation",
      timeframe: "< 30 minutes", 
      icon: <Shield className="h-5 w-5" />
    },
    {
      phase: "Recovery",
      description: "System restoration and service recovery",
      timeframe: "< 2 hours",
      icon: <Zap className="h-5 w-5" />
    },
    {
      phase: "Post-Incident",
      description: "Analysis, documentation, and improvements",
      timeframe: "< 24 hours",
      icon: <FileText className="h-5 w-5" />
    }
  ]

  const auditReports = [
    {
      title: "SOC 2 Type II Report 2024",
      date: "November 2024",
      type: "Compliance",
      size: "2.4 MB",
      description: "Annual SOC 2 Type II audit report covering security, availability, and confidentiality controls"
    },
    {
      title: "Penetration Test Report Q4 2024",
      date: "October 2024", 
      type: "Security Assessment",
      size: "1.8 MB",
      description: "Quarterly penetration testing report by third-party security firm"
    },
    {
      title: "Security Risk Assessment 2024",
      date: "September 2024",
      type: "Risk Assessment", 
      size: "3.1 MB",      description: "Comprehensive annual security risk assessment and mitigation strategies"
    }
  ]
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/50 to-violet-50/50 dark:from-slate-950 dark:via-blue-950/50 dark:to-violet-950/50 transition-all duration-700">
      {/* Enhanced Background Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 sm:-top-48 sm:-right-48 w-48 h-48 sm:w-96 sm:h-96 gradient-mesh rounded-full blur-3xl opacity-30 animate-float"></div>
        <div className="absolute -bottom-24 -left-24 sm:-bottom-48 sm:-left-48 w-48 h-48 sm:w-96 sm:h-96 bg-gradient-to-tr from-cyan-400/20 via-blue-500/20 to-violet-600/20 rounded-full blur-3xl opacity-30 animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 sm:w-72 sm:h-72 bg-gradient-to-r from-blue-400/10 to-violet-600/10 rounded-full blur-2xl animate-pulse-slow"></div>
      </div>
      <Navbar />

      <div className="relative pt-16 sm:pt-20 lg:pt-24 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">          {/* Header */}
          <div className="text-center mb-12 sm:mb-16">
            <Badge className="mb-4 sm:mb-6 bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border-green-200/50 dark:from-green-900/30 dark:to-emerald-900/30 dark:text-green-300 dark:border-green-600/30 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium shadow-md">
              🔒 Enterprise-Grade Security
            </Badge>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 sm:mb-8">
              <span className="block text-slate-900 dark:text-white mb-2">Security &</span>
              <span className="block bg-gradient-to-r from-blue-600 via-violet-600 to-cyan-600 bg-clip-text text-transparent">
                Compliance
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed px-4">
              SalesSpeak is built with security and privacy at its core. We implement enterprise-grade 
              security controls to protect your data and ensure compliance with global standards.
            </p>
          </div>          {/* Security Features */}
          <div className="mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-6 sm:mb-8 text-center px-4">
              Security Architecture
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
              {securityFeatures.map((feature, index) => (
                <Card key={index} className="glass border-white/30 dark:border-slate-700/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-start sm:items-center text-lg sm:text-xl flex-col sm:flex-row gap-3 sm:gap-0">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-violet-600 rounded-lg flex items-center justify-center text-white sm:mr-4 shadow-lg flex-shrink-0">
                        {feature.icon}
                      </div>
                      <span className="text-left sm:text-left">{feature.title}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 dark:text-slate-300 mb-4 text-sm sm:text-base">
                      {feature.description}
                    </p>
                    <ul className="space-y-2">
                      {feature.details.map((detail, detailIndex) => (
                        <li key={detailIndex} className="flex items-start space-x-2 text-xs sm:text-sm">
                          <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-slate-600 dark:text-slate-300">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>          {/* Certifications */}
          <div className="mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-6 sm:mb-8 text-center px-4">
              Certifications & Compliance
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {certifications.map((cert, index) => (
                <Card key={index} className="glass border-white/30 dark:border-slate-700/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <CardContent className="p-4 sm:p-6 text-center">
                    <div className={`w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br ${cert.color} rounded-2xl flex items-center justify-center text-white mx-auto mb-3 sm:mb-4 shadow-lg`}>
                      {cert.icon}
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-2">
                      {cert.name}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm mb-3">
                      {cert.description}
                    </p>
                    <Badge className="bg-green-100 text-green-800 mb-2 text-xs">
                      {cert.status}
                    </Badge>
                    <div className="text-xs text-slate-500 dark:text-slate-400">
                      Valid until: {cert.validUntil}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>          {/* Security Practices */}
          <div className="mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-6 sm:mb-8 text-center px-4">
              Security Practices
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
              {securityPractices.map((practice, index) => (
                <Card key={index} className="glass border-white/30 dark:border-slate-700/50 shadow-lg">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg sm:text-xl text-slate-900 dark:text-white">
                      {practice.category}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 sm:space-y-3">
                      {practice.practices.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start space-x-2 sm:space-x-3">
                          <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-slate-600 dark:text-slate-300 text-sm sm:text-base">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>          {/* Incident Response */}
          <div className="mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-6 sm:mb-8 text-center px-4">
              Incident Response Process
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6 lg:gap-4">
              {incidentResponse.map((phase, index) => (
                <Card key={index} className="glass border-white/30 dark:border-slate-700/50 shadow-lg relative">
                  <CardContent className="p-4 sm:p-6 text-center">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-violet-600 rounded-lg flex items-center justify-center text-white mx-auto mb-3 sm:mb-4 shadow-lg">
                      {phase.icon}
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-2">
                      {phase.phase}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm mb-3 leading-relaxed">
                      {phase.description}
                    </p>
                    <Badge className="bg-blue-100 text-blue-800 text-xs">
                      {phase.timeframe}
                    </Badge>
                  </CardContent>
                  {index < incidentResponse.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-2 w-4 h-0.5 bg-gradient-to-r from-blue-500 to-violet-600 transform -translate-y-1/2"></div>
                  )}
                </Card>
              ))}
            </div>
          </div>          {/* Audit Reports */}
          <div className="mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-6 sm:mb-8 text-center px-4">
              Security Reports & Audits
            </h2>
            <div className="space-y-4 sm:space-y-6">
              {auditReports.map((report, index) => (
                <Card key={index} className="glass border-white/30 dark:border-slate-700/50 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div className="flex items-start space-x-3 sm:space-x-4 flex-1">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center text-white shadow-lg flex-shrink-0">
                          <FileText className="h-5 w-5 sm:h-6 sm:w-6" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-1 sm:mb-2">
                            {report.title}
                          </h3>
                          <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm mb-2 sm:mb-3 leading-relaxed">
                            {report.description}
                          </p>
                          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                            <div className="flex items-center space-x-1">
                              <Clock className="h-3 w-3 sm:h-4 sm:w-4" />
                              <span>{report.date}</span>
                            </div>
                            <Badge variant="secondary" className="text-xs self-start sm:self-auto">{report.type}</Badge>
                            <span className="hidden sm:inline">{report.size}</span>
                          </div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="bg-white/20 backdrop-blur-lg self-stretch sm:self-auto whitespace-nowrap">
                        <Download className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>          {/* Security Contact */}
          <div className="text-center">
            <Card className="glass-strong border-white/30 dark:border-slate-700/50 shadow-2xl">
              <CardContent className="p-6 sm:p-8 lg:p-12">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 to-violet-600 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  <Shield className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-3 sm:mb-4">
                  Security Questions?
                </h2>
                <p className="text-base sm:text-lg lg:text-xl text-slate-600 dark:text-slate-300 mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
                  Our security team is here to address your concerns and provide additional information 
                  about our security practices and compliance programs.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-6 sm:mb-8">
                  <Link href="/contact" className="w-full sm:w-auto">
                    <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-blue-500 via-violet-500 to-purple-500 hover:from-blue-600 hover:via-violet-600 hover:to-purple-600 text-base sm:text-lg px-6 sm:px-8 py-2.5 sm:py-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                      Contact Security Team
                    </Button>
                  </Link>
                  <Button size="lg" variant="outline" className="w-full sm:w-auto border-2 border-slate-300 text-slate-700 hover:bg-white/20 backdrop-blur-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                    <FileText className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                    Security Documentation
                  </Button>
                </div>
                
                <div className="pt-6 sm:pt-8 border-t border-slate-200 dark:border-slate-700">
                  <div className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 space-y-1 px-4">
                    <p className="break-all sm:break-normal">Security Contact: security@salesspeak.ai</p>
                    <p className="break-all sm:break-normal">Responsible Disclosure: security-reports@salesspeak.ai</p>
                    <p>Security Hotline: +1 (555) SEC-TEAM</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>      <Footer />
    </div>
  )
}
