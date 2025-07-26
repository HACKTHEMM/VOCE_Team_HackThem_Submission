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
  User,
  MessageSquare,
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
    destination: "",
    phone: "",
    message: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { toast } = useToast()

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormState(prev => ({ ...prev, [name]: value }))
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
        description: "We've received your message and will get back to you soon!"
      })
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F3F1E9] via-[#ECE8D9] to-[#F3F1E9] dark:from-[#1E1E1E] dark:via-[#2A2A2A] dark:to-[#1E1E1E] transition-all duration-700">
      {" "}
      {/* Classic Background Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-24 -right-24 sm:-top-48 sm:-right-48 w-48 h-48 sm:w-96 sm:h-96 gradient-classic-mesh rounded-full blur-3xl opacity-20 sm:opacity-30 animate-float"
        ></div>
        <div
          className="absolute -bottom-24 -left-24 sm:-bottom-48 sm:-left-48 w-48 h-48 sm:w-96 sm:h-96 bg-gradient-to-tr from-[#BBA588]/20 via-[#8E735B]/20 to-[#7C6D64]/20 rounded-full blur-3xl opacity-20 sm:opacity-30 animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-36 h-36 sm:w-72 sm:h-72 bg-gradient-to-r from-[#BBA588]/10 to-[#8E735B]/10 rounded-full blur-2xl animate-pulse-slow"
        ></div>
      </div>
      {/* Enhanced Navigation */}
      <Navbar />
      <div className="relative z-10">
        {" "}
        {/* Hero Section */}
        <div className="pt-16 sm:pt-20 md:pt-24 lg:pt-32 pb-8 sm:pb-12 md:pb-16 lg:pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <Badge
              className="mb-4 sm:mb-6 md:mb-8 bg-gradient-to-r from-[#F3F1E9] via-[#ECE8D9] to-[#F3F1E9] text-[#8E735B] border-[#BBA588]/60 dark:from-[#1E1E1E]/80 dark:via-[#2A2A2A]/80 dark:to-[#1E1E1E]/80 dark:text-[#BBA588] dark:border-[#BBA588]/20 px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 md:py-3 text-xs sm:text-sm md:text-base font-semibold shadow-lg shadow-[#BBA588]/10 rounded-full animate-fade-in font-serif"
            >
              💬 We're Here to Help
            </Badge>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 sm:mb-8 md:mb-12 leading-tight font-serif-display">
              <span
                className="block text-[#2D2C2A] dark:text-[#ECE8D9] mb-2 sm:mb-3 md:mb-4 animate-fade-in"
                style={{ animationDelay: "0.2s" }}
              >
                Contact
              </span>
              <span
                className="block bg-gradient-to-r from-[#8E735B] via-[#BBA588] to-[#7C6D64] bg-clip-text text-transparent animate-gradient animate-fade-in"
                style={{ animationDelay: "0.4s" }}
              >
                Voce
              </span>
            </h1>

            <p
              className="text-[#5A5A5A] dark:text-[#B6B6B6] text-base sm:text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto leading-relaxed font-serif animate-fade-in px-2 sm:px-4"
              style={{ animationDelay: "0.6s" }}
            >
              Have a question about your next adventure, a suggestion, or a
              story to share? We're all ears. Let's make travel better,
              together.
            </p>
          </div>
        </div>{" "}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16 md:pb-24 lg:pb-32">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 sm:gap-8 md:gap-12 lg:gap-16">
            {/* Contact Form */}
            <div className="order-2 xl:order-1">
              <Card className="glass-classic border-[#BBA588]/40 dark:border-[#BBA588]/20 shadow-2xl rounded-2xl sm:rounded-3xl overflow-hidden">
                <CardHeader className="p-4 sm:p-6 md:p-8 pb-3 sm:pb-4 md:pb-6">
                  <CardTitle
                    className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-[#8E735B] via-[#BBA588] to-[#7C6D64] bg-clip-text text-transparent mb-3 sm:mb-4 font-serif-display"
                  >
                    Send us a Message
                  </CardTitle>
                  <p
                    className="text-[#5A5A5A] dark:text-[#B6B6B6] text-base sm:text-lg font-serif"
                  >
                    Fill out the form below and our team will get back to you
                    within 24 hours.
                  </p>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 md:p-8 pt-0">
                  {isSubmitted
                    ? <div className="text-center py-8 sm:py-12">
                        <div
                          className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-[#BBA588]/20 to-[#8E735B]/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6"
                        >
                          <CheckCircle
                            className="h-8 w-8 sm:h-10 sm:w-10 text-[#8E735B] dark:text-[#BBA588]"
                          />
                        </div>
                        <h3
                          className="text-xl sm:text-2xl font-bold text-[#2D2C2A] dark:text-[#ECE8D9] mb-3 sm:mb-4 font-serif-display"
                        >
                          Message Sent!
                        </h3>
                        <p
                          className="text-[#5A5A5A] dark:text-[#B6B6B6] mb-6 sm:mb-8 text-sm sm:text-base font-serif"
                        >
                          Thank you for reaching out. We're excited to connect
                          with you soon!
                        </p>
                        <Button
                          onClick={() => setIsSubmitted(false)}
                          className="btn-classic text-sm sm:text-base px-6 sm:px-8 py-2.5 sm:py-3 font-semibold font-serif-display"
                        >
                          Send Another Message
                        </Button>
                      </div>
                    : <form
                        onSubmit={handleSubmit}
                        className="space-y-4 sm:space-y-6"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                          <div className="space-y-2">
                            <label
                              className="text-sm font-semibold text-[#2D2C2A] dark:text-[#ECE8D9] font-serif"
                            >
                              Full Name *
                            </label>
                            <div className="relative">
                              <User
                                className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-[#7C6D64] dark:text-[#BBA588]"
                              />
                              <Input
                                name="name"
                                value={formState.name}
                                onChange={handleChange}
                                placeholder="Enter your name"
                                required
                                className="pl-10 sm:pl-11 h-11 sm:h-12 glass-classic border-[#BBA588]/40 dark:border-[#BBA588]/20 rounded-lg sm:rounded-xl transition-all duration-300 focus:border-[#8E735B]/60 text-sm sm:text-base font-serif"
                              />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <label
                              className="text-sm font-semibold text-[#2D2C2A] dark:text-[#ECE8D9] font-serif"
                            >
                              Email Address *
                            </label>
                            <div className="relative">
                              <Mail
                                className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-[#7C6D64] dark:text-[#BBA588]"
                              />
                              <Input
                                name="email"
                                type="email"
                                value={formState.email}
                                onChange={handleChange}
                                placeholder="Enter your email"
                                required
                                className="pl-10 sm:pl-11 h-11 sm:h-12 glass-classic border-[#BBA588]/40 dark:border-[#BBA588]/20 rounded-lg sm:rounded-xl transition-all duration-300 focus:border-[#8E735B]/60 text-sm sm:text-base font-serif"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                          <div className="space-y-2">
                            <label
                              className="text-sm font-semibold text-[#2D2C2A] dark:text-[#ECE8D9] font-serif"
                            >
                              Upcoming Destination
                            </label>
                            <div className="relative">
                              <Globe
                                className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-[#7C6D64] dark:text-[#BBA588]"
                              />
                              <Input
                                name="destination"
                                value={formState.destination}
                                onChange={handleChange}
                                placeholder="e.g., Paris, France"
                                className="pl-10 sm:pl-11 h-11 sm:h-12 glass-classic border-[#BBA588]/40 dark:border-[#BBA588]/20 rounded-lg sm:rounded-xl transition-all duration-300 focus:border-[#8E735B]/60 text-sm sm:text-base font-serif"
                              />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <label
                              className="text-sm font-semibold text-[#2D2C2A] dark:text-[#ECE8D9] font-serif"
                            >
                              Phone Number
                            </label>
                            <div className="relative">
                              <Phone
                                className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-[#7C6D64] dark:text-[#BBA588]"
                              />
                              <Input
                                name="phone"
                                type="tel"
                                value={formState.phone}
                                onChange={handleChange}
                                placeholder="Your contact number"
                                className="pl-10 sm:pl-11 h-11 sm:h-12 glass-classic border-[#BBA588]/40 dark:border-[#BBA588]/20 rounded-lg sm:rounded-xl transition-all duration-300 focus:border-[#8E735B]/60 text-sm sm:text-base font-serif"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label
                            className="text-sm font-semibold text-[#2D2C2A] dark:text-[#ECE8D9] font-serif"
                          >
                            Message *
                          </label>
                          <div className="relative">
                            <MessageSquare
                              className="absolute left-3 top-4 h-4 w-4 sm:h-5 sm:w-5 text-[#7C6D64] dark:text-[#BBA588]"
                            />
                            <Textarea
                              name="message"
                              value={formState.message}
                              onChange={handleChange}
                              placeholder="Share your travel story, ask a question, or suggest a new feature..."
                              required
                              rows={5}
                              className="pl-10 sm:pl-11 glass-classic border-[#BBA588]/40 dark:border-[#BBA588]/20 rounded-lg sm:rounded-xl transition-all duration-300 focus:border-[#8E735B]/60 resize-none text-sm sm:text-base font-serif"
                            />
                          </div>
                        </div>

                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full btn-classic text-base sm:text-lg h-12 sm:h-14 shadow-2xl hover:shadow-3xl shadow-[#BBA588]/25 hover:shadow-[#BBA588]/40 transition-all duration-300 transform hover:scale-105 rounded-lg sm:rounded-xl font-semibold font-serif-display"
                        >
                          {isSubmitting
                            ? <>
                                <div
                                  className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-b-2 border-white mr-2 sm:mr-3"
                                >
                                </div>
                                Sending...
                              </>
                            : <>
                                <Send
                                  className="h-4 w-4 sm:h-5 sm:w-5 mr-2 sm:mr-3"
                                />
                                Send Message
                              </>}
                        </Button>
                      </form>}
                </CardContent>
              </Card>
            </div>
            {/* Contact Information */}
            <div className="order-1 xl:order-2 space-y-6 sm:space-y-8">
              <div>
                <h2
                  className="text-2xl sm:text-3xl font-bold text-[#2D2C2A] dark:text-[#ECE8D9] mb-4 sm:mb-6 font-serif-display"
                >
                  Connect With Us
                </h2>
                <p
                  className="text-[#5A5A5A] dark:text-[#B6B6B6] text-base sm:text-lg leading-relaxed font-serif"
                >
                  Whether you're a traveler with a question, a potential
                  partner, or just want to share your feedback, we're here to
                  listen.
                </p>
              </div>

              <div className="space-y-4 sm:space-y-6">
                <Card
                  className="glass-classic border-[#BBA588]/40 dark:border-[#BBA588]/20 hover:border-[#8E735B]/60 dark:hover:border-[#8E735B]/60 transition-all duration-500 shadow-xl hover:shadow-2xl transform hover:scale-105 rounded-2xl sm:rounded-3xl"
                >
                  <CardContent className="p-4 sm:p-6 md:p-8">
                    <div className="flex items-start space-x-4 sm:space-x-6">
                      <div className="flex-shrink-0">
                        <div
                          className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-[#BBA588]/20 to-[#8E735B]/20 backdrop-blur-sm rounded-xl sm:rounded-2xl flex items-center justify-center text-[#8E735B] dark:text-[#BBA588] shadow-lg shadow-[#BBA588]/10"
                        >
                          <Mail className="h-5 w-5 sm:h-7 sm:w-7" />
                        </div>
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3
                          className="text-lg sm:text-xl font-bold text-[#2D2C2A] dark:text-[#ECE8D9] mb-2 font-serif-display"
                        >
                          Support & Partnerships
                        </h3>
                        <p
                          className="text-[#5A5A5A] dark:text-[#B6B6B6] mb-3 text-sm sm:text-base font-serif"
                        >
                          For help, feedback, or collaboration inquiries.
                        </p>
                        <a
                          href="mailto:hello@Voce.ai"
                          className="text-[#8E735B] dark:text-[#BBA588] font-semibold hover:underline text-sm sm:text-base break-all font-serif"
                        >
                          hello@Voce.ai
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card
                  className="glass-classic border-[#BBA588]/40 dark:border-[#BBA588]/20 hover:border-[#8E735B]/60 dark:hover:border-[#8E735B]/60 transition-all duration-500 shadow-xl hover:shadow-2xl transform hover:scale-105 rounded-2xl sm:rounded-3xl"
                >
                  <CardContent className="p-4 sm:p-6 md:p-8">
                    <div className="flex items-start space-x-4 sm:space-x-6">
                      <div className="flex-shrink-0">
                        <div
                          className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-[#BBA588]/20 to-[#7C6D64]/20 backdrop-blur-sm rounded-xl sm:rounded-2xl flex items-center justify-center text-[#7C6D64] dark:text-[#BBA588] shadow-lg shadow-[#BBA588]/10"
                        >
                          <Users className="h-5 w-5 sm:h-7 sm:w-7" />
                        </div>
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3
                          className="text-lg sm:text-xl font-bold text-[#2D2C2A] dark:text-[#ECE8D9] mb-2 font-serif-display"
                        >
                          Community Hub
                        </h3>
                        <p
                          className="text-[#5A5A5A] dark:text-[#B6B6B6] mb-3 text-sm sm:text-base font-serif"
                        >
                          Join the conversation with fellow travelers.
                        </p>
                        <a
                          href="https://discord.gg/voce"
                          target="_blank"
                          className="text-[#7C6D64] dark:text-[#BBA588] font-semibold hover:underline text-sm sm:text-base font-serif"
                        >
                          Join our Discord
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card
                  className="glass-classic border-[#BBA588]/40 dark:border-[#BBA588]/20 hover:border-[#8E735B]/60 dark:hover:border-[#8E735B]/60 transition-all duration-500 shadow-xl hover:shadow-2xl transform hover:scale-105 rounded-2xl sm:rounded-3xl"
                >
                  <CardContent className="p-4 sm:p-6 md:p-8">
                    <div className="flex items-start space-x-4 sm:space-x-6">
                      <div className="flex-shrink-0">
                        <div
                          className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-[#8E735B]/20 to-[#7C6D64]/20 backdrop-blur-sm rounded-xl sm:rounded-2xl flex items-center justify-center text-[#8E735B] dark:text-[#BBA588] shadow-lg shadow-[#BBA588]/10"
                        >
                          <MapPin className="h-5 w-5 sm:h-7 sm:w-7" />
                        </div>
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3
                          className="text-lg sm:text-xl font-bold text-[#2D2C2A] dark:text-[#ECE8D9] mb-2 font-serif-display"
                        >
                          Visit Us
                        </h3>
                        <p
                          className="text-[#5A5A5A] dark:text-[#B6B6B6] mb-3 text-sm sm:text-base font-serif"
                        >
                          Come say hello at our headquarters.
                        </p>
                        <address
                          className="text-[#8E735B] dark:text-[#BBA588] font-semibold not-italic text-sm sm:text-base font-serif"
                        >
                          Tech Park, Sector 67<br />
                          Gurugram, Haryana 122018<br />
                          India
                        </address>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}