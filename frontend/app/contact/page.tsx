"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle,
  Building,
  User,  MessageSquare,
  Heart,
  Star,
  Users,
  Clock,
  Globe
} from "lucide-react"
import { Footer } from "@/components/footer"
import { Navbar } from "@/components/navbar"

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { toast } = useToast()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      toast({
        title: "Message Sent",
        description: "We've received your message and will get back to you soon!",
      })
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/50 to-violet-50/50 dark:from-slate-950 dark:via-blue-950/50 dark:to-violet-950/50 transition-all duration-700">      {/* Enhanced Background Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 sm:-top-48 sm:-right-48 w-48 h-48 sm:w-96 sm:h-96 gradient-mesh rounded-full blur-3xl opacity-20 sm:opacity-30 animate-float"></div>
        <div className="absolute -bottom-24 -left-24 sm:-bottom-48 sm:-left-48 w-48 h-48 sm:w-96 sm:h-96 bg-gradient-to-tr from-cyan-400/20 via-blue-500/20 to-violet-600/20 rounded-full blur-3xl opacity-20 sm:opacity-30 animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-36 h-36 sm:w-72 sm:h-72 bg-gradient-to-r from-blue-400/10 to-violet-600/10 rounded-full blur-2xl animate-pulse-slow"></div>
      </div>{/* Enhanced Navigation */}
      <Navbar />

      <div className="relative z-10">        {/* Hero Section */}
        <div className="pt-16 sm:pt-20 md:pt-24 lg:pt-32 pb-8 sm:pb-12 md:pb-16 lg:pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 sm:mb-6 md:mb-8 bg-gradient-to-r from-blue-50 via-violet-50 to-cyan-50 text-blue-700 border-blue-200/60 dark:from-blue-900/20 dark:via-violet-900/20 dark:to-cyan-900/20 dark:text-blue-300 dark:border-blue-600/20 px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 md:py-3 text-xs sm:text-sm md:text-base font-semibold shadow-lg shadow-blue-500/10 rounded-full animate-fade-in">
              💬 Get in Touch
            </Badge>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 sm:mb-8 md:mb-12 leading-tight">
              <span className="block text-slate-900 dark:text-white mb-2 sm:mb-3 md:mb-4 animate-fade-in" style={{animationDelay: '0.2s'}}>Contact</span>
              <span className="block bg-gradient-to-r from-blue-600 via-violet-600 via-cyan-600 to-blue-700 bg-clip-text text-transparent animate-gradient animate-fade-in" style={{animationDelay: '0.4s'}}>
                SalesSpeak
              </span>
            </h1>
            
            <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto leading-relaxed font-light animate-fade-in px-2 sm:px-4" style={{animationDelay: '0.6s'}}>
              Ready to transform your business communication? Let's discuss how SalesSpeak can help you connect with customers like never before.
            </p>
          </div>
        </div>        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16 md:pb-24 lg:pb-32">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 sm:gap-8 md:gap-12 lg:gap-16">
            {/* Contact Form */}
            <div className="order-2 xl:order-1">
              <Card className="glass-strong border-white/40 dark:border-slate-700/40 shadow-2xl rounded-2xl sm:rounded-3xl overflow-hidden">
                <CardHeader className="p-4 sm:p-6 md:p-8 pb-3 sm:pb-4 md:pb-6">
                  <CardTitle className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 via-violet-600 to-cyan-600 bg-clip-text text-transparent mb-3 sm:mb-4">
                    Send us a Message
                  </CardTitle>
                  <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg">
                    Fill out the form below and we'll get back to you within 24 hours.
                  </p>
                </CardHeader>
                  <CardContent className="p-4 sm:p-6 md:p-8 pt-0">
                  {isSubmitted ? (
                    <div className="text-center py-8 sm:py-12">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                        <CheckCircle className="h-8 w-8 sm:h-10 sm:w-10 text-green-600 dark:text-green-400" />
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-3 sm:mb-4">Message Sent!</h3>
                      <p className="text-slate-600 dark:text-slate-300 mb-6 sm:mb-8 text-sm sm:text-base">
                        Thank you for reaching out. We'll get back to you within 24 hours.
                      </p>
                      <Button 
                        onClick={() => setIsSubmitted(false)}
                        className="bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white transition-all duration-300 transform hover:scale-105 rounded-lg sm:rounded-xl px-6 sm:px-8 py-2.5 sm:py-3 font-semibold text-sm sm:text-base"
                      >
                        Send Another Message
                      </Button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                            Full Name *
                          </label>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-slate-400" />
                            <Input
                              name="name"
                              value={formState.name}
                              onChange={handleChange}
                              placeholder="Enter your name"
                              required
                              className="pl-10 sm:pl-11 h-11 sm:h-12 glass-subtle border-white/40 dark:border-slate-700/40 rounded-lg sm:rounded-xl transition-all duration-300 focus:border-blue-500/60 text-sm sm:text-base"
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                            Email Address *
                          </label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-slate-400" />
                            <Input
                              name="email"
                              type="email"
                              value={formState.email}
                              onChange={handleChange}
                              placeholder="Enter your email"
                              required
                              className="pl-10 sm:pl-11 h-11 sm:h-12 glass-subtle border-white/40 dark:border-slate-700/40 rounded-lg sm:rounded-xl transition-all duration-300 focus:border-blue-500/60 text-sm sm:text-base"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                            Company
                          </label>
                          <div className="relative">
                            <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-slate-400" />
                            <Input
                              name="company"
                              value={formState.company}
                              onChange={handleChange}
                              placeholder="Company name"
                              className="pl-10 sm:pl-11 h-11 sm:h-12 glass-subtle border-white/40 dark:border-slate-700/40 rounded-lg sm:rounded-xl transition-all duration-300 focus:border-blue-500/60 text-sm sm:text-base"
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                            Phone Number
                          </label>
                          <div className="relative">
                            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-slate-400" />
                            <Input
                              name="phone"
                              type="tel"
                              value={formState.phone}
                              onChange={handleChange}
                              placeholder="+91 XXXXX XXXXX"
                              className="pl-10 sm:pl-11 h-11 sm:h-12 glass-subtle border-white/40 dark:border-slate-700/40 rounded-lg sm:rounded-xl transition-all duration-300 focus:border-blue-500/60 text-sm sm:text-base"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                          Message *
                        </label>
                        <div className="relative">
                          <MessageSquare className="absolute left-3 top-4 h-4 w-4 sm:h-5 sm:w-5 text-slate-400" />
                          <Textarea
                            name="message"
                            value={formState.message}
                            onChange={handleChange}
                            placeholder="Tell us about your requirements, questions, or how we can help..."
                            required
                            rows={5}
                            className="pl-10 sm:pl-11 glass-subtle border-white/40 dark:border-slate-700/40 rounded-lg sm:rounded-xl transition-all duration-300 focus:border-blue-500/60 resize-none text-sm sm:text-base"
                          />
                        </div>
                      </div>

                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-gradient-to-r from-blue-600 via-violet-600 to-blue-700 hover:from-blue-700 hover:via-violet-700 hover:to-blue-800 text-white text-base sm:text-lg h-12 sm:h-14 shadow-2xl hover:shadow-3xl shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300 transform hover:scale-105 rounded-lg sm:rounded-xl font-semibold"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-b-2 border-white mr-2 sm:mr-3"></div>
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="h-4 w-4 sm:h-5 sm:w-5 mr-2 sm:mr-3" />
                            Send Message
                          </>
                        )}
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>            {/* Contact Information */}
            <div className="order-1 xl:order-2 space-y-6 sm:space-y-8">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-4 sm:mb-6">Get in Touch</h2>
                <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed">
                  Whether you have questions about our AI voice technology, need technical support, or want to discuss custom solutions for your business, we're here to help.
                </p>
              </div>

              <div className="space-y-4 sm:space-y-6">
                <Card className="glass-subtle border-white/40 dark:border-slate-700/40 hover:border-blue-300/60 dark:hover:border-blue-600/60 transition-all duration-500 shadow-xl hover:shadow-2xl transform hover:scale-105 rounded-2xl sm:rounded-3xl">
                  <CardContent className="p-4 sm:p-6 md:p-8">
                    <div className="flex items-start space-x-4 sm:space-x-6">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-blue-500/20 to-violet-500/20 backdrop-blur-sm rounded-xl sm:rounded-2xl flex items-center justify-center text-blue-600 dark:text-blue-400 shadow-lg shadow-blue-500/10">
                          <Mail className="h-5 w-5 sm:h-7 sm:w-7" />
                        </div>
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-2">Email Us</h3>
                        <p className="text-slate-600 dark:text-slate-300 mb-3 text-sm sm:text-base">Send us an email and we'll respond within 24 hours</p>
                        <a href="mailto:contact@salesspeak.ai" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline text-sm sm:text-base break-all">
                          contact@salesspeak.ai
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass-subtle border-white/40 dark:border-slate-700/40 hover:border-blue-300/60 dark:hover:border-blue-600/60 transition-all duration-500 shadow-xl hover:shadow-2xl transform hover:scale-105 rounded-2xl sm:rounded-3xl">
                  <CardContent className="p-4 sm:p-6 md:p-8">
                    <div className="flex items-start space-x-4 sm:space-x-6">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-sm rounded-xl sm:rounded-2xl flex items-center justify-center text-green-600 dark:text-green-400 shadow-lg shadow-green-500/10">
                          <Phone className="h-5 w-5 sm:h-7 sm:w-7" />
                        </div>
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-2">Call Us</h3>
                        <p className="text-slate-600 dark:text-slate-300 mb-3 text-sm sm:text-base">Speak directly with our team</p>
                        <a href="tel:+911234567890" className="text-green-600 dark:text-green-400 font-semibold hover:underline text-sm sm:text-base">
                          +91 12345 67890
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass-subtle border-white/40 dark:border-slate-700/40 hover:border-blue-300/60 dark:hover:border-blue-600/60 transition-all duration-500 shadow-xl hover:shadow-2xl transform hover:scale-105 rounded-2xl sm:rounded-3xl">
                  <CardContent className="p-4 sm:p-6 md:p-8">
                    <div className="flex items-start space-x-4 sm:space-x-6">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-xl sm:rounded-2xl flex items-center justify-center text-purple-600 dark:text-purple-400 shadow-lg shadow-purple-500/10">
                          <MapPin className="h-5 w-5 sm:h-7 sm:w-7" />
                        </div>
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-2">Visit Us</h3>
                        <p className="text-slate-600 dark:text-slate-300 mb-3 text-sm sm:text-base">Come say hello at our office</p>
                        <address className="text-purple-600 dark:text-purple-400 font-semibold not-italic text-sm sm:text-base">
                          Tech Park, Sector 67<br />
                          Gurugram, Haryana 122018<br />
                          India
                        </address>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass-subtle border-white/40 dark:border-slate-700/40 hover:border-blue-300/60 dark:hover:border-blue-600/60 transition-all duration-500 shadow-xl hover:shadow-2xl transform hover:scale-105 rounded-2xl sm:rounded-3xl">
                  <CardContent className="p-4 sm:p-6 md:p-8">
                    <div className="flex items-start space-x-4 sm:space-x-6">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-orange-500/20 to-red-500/20 backdrop-blur-sm rounded-xl sm:rounded-2xl flex items-center justify-center text-orange-600 dark:text-orange-400 shadow-lg shadow-orange-500/10">
                          <Clock className="h-5 w-5 sm:h-7 sm:w-7" />
                        </div>
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-2">Business Hours</h3>
                        <p className="text-slate-600 dark:text-slate-300 mb-3 text-sm sm:text-base">We're available during these hours</p>
                        <div className="text-orange-600 dark:text-orange-400 font-semibold text-sm sm:text-base">
                          Monday - Friday: 9:00 AM - 6:00 PM IST<br />
                          Saturday: 10:00 AM - 4:00 PM IST
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div></div>
        </div>
      </div>
      
      <Footer />
    </div>
  )
}
