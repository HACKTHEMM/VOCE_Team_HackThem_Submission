import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Mic, Globe, MessageSquare, Zap, Shield, Brain, Sparkles, Layers, CheckCircle } from "lucide-react"
import { Footer } from "@/components/footer"
import { Navbar } from "@/components/navbar"

export default function FeaturesPage() {
  const features = [{
    icon: <Mic className="h-8 w-8 sm:h-10 sm:w-10" />,
    title: "Voice-First Interface",
    description:
      "Simply call a local number and start talking. Voce understands natural language, allowing you to ask for recommendations, directions, or translations just like you would with a local friend.",
    benefits: [
      "No app download required",
      "No internet or data needed",
      "Hands-free and convenient",
      "Accessible to anyone with a phone",
    ],
  },
  {
    icon: <Globe className="h-8 w-8 sm:h-10 sm:w-10" />,
    title: "Multilingual Support",
    description:
      "Break through language barriers instantly. Communicate seamlessly in multiple languages to ask for help, order food, or bargain at a local market with confidence.",
    benefits: [
      "Real-time translation",
      "Understand and be understood by locals",
      "Cultural context awareness",
      "Navigate foreign environments with ease",
    ],
  },
  {
    icon: <MessageSquare className="h-8 w-8 sm:h-10 sm:w-10" />,
    title: "Contextual Conversations",
    description:
      "Our AI remembers your journey. It understands the context of your questions, recalls previous conversations, and provides relevant suggestions for a truly personalized adventure.",
    benefits: [
      "Remembers your travel history",
      "Understands follow-up questions",
      "Provides personalized recommendations",
      "Feels like talking to a real person",
    ],
  },
  {
    icon: <Brain className="h-8 w-8 sm:h-10 sm:w-10" />,
    title: "Deep Local Knowledge",
    description:
      "Powered by advanced AI that goes beyond generic tourist spots. Discover hidden gems, local eateries, and authentic experiences that you won't find in a typical travel guide.",
    benefits: ["Insider recommendations", "Off-the-beaten-path suggestions", "Authentic cultural experiences", "Real-time event information"],
  },
  {
    icon: <Sparkles className="h-8 w-8 sm:h-10 sm:w-10" />,
    title: "Smart Travel Recommendations",
    description:
      "Get personalized suggestions based on your interests, location, and the time of day. Voce helps you find the perfect restaurant, museum, or viewpoint for your mood.",
    benefits: ["Personalized itinerary planning", "Location-aware suggestions", "Budget-friendly options", "Real-time weather considerations"],
  },
  {
    icon: <Zap className="h-8 w-8 sm:h-10 sm:w-10" />,
    title: "Agentic Capabilities",
    description:
      "Voce can do more than just talk. It can book a taxi, make a restaurant reservation, or purchase tickets for an attraction on your behalf, all through simple voice commands.",
    benefits: [
      "Autonomous task completion",
      "Hands-free booking and reservations",
      "Simplifies complex travel logistics",
      "Saves you time and hassle",
    ],
  },
  {
    icon: <Layers className="h-8 w-8 sm:h-10 sm:w-10" />,
    title: "Offline Functionality",
    description:
      "Voce is designed for the real world of travel, where internet can be unreliable. Access all features through a standard phone call, without needing a data connection.",
    benefits: [
      "Works without an internet connection",
      "Reliable in remote areas",
      "No expensive data roaming charges",
      "Consistent access to information",
    ],
  },
  {
    icon: <Shield className="h-8 w-8 sm:h-10 sm:w-10" />,
    title: "Safe & Reliable",
    description:
      "Travel with peace of mind. Voce provides access to emergency services, local safety information, and reliable assistance whenever you need it.",
    benefits: ["24/7 availability", "Access to emergency contacts", "Privacy-focused design", "Trustworthy local information"],
  },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F3F1E9] via-[#ECE8D9] to-[#F3F1E9] dark:from-[#1E1E1E] dark:via-[#2A2A2A] dark:to-[#1E1E1E] transition-all duration-700">
      {/* Classic Background Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 sm:-top-48 sm:-right-48 w-48 h-48 sm:w-96 sm:h-96 gradient-classic-mesh rounded-full blur-3xl opacity-20 sm:opacity-30 animate-float"></div>
        <div className="absolute -bottom-24 -left-24 sm:-bottom-48 sm:-left-48 w-48 h-48 sm:w-96 sm:h-96 bg-gradient-to-tr from-[#BBA588]/20 via-[#8E735B]/20 to-[#7C6D64]/20 rounded-full blur-3xl opacity-20 sm:opacity-30 animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-36 h-36 sm:w-72 sm:h-72 bg-gradient-to-r from-[#BBA588]/10 to-[#8E735B]/10 rounded-full blur-2xl animate-pulse-slow"></div>
      </div>

      <Navbar />      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-24 relative z-10">
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <Badge className="mb-6 sm:mb-8 bg-gradient-to-r from-[#F3F1E9] via-[#ECE8D9] to-[#F3F1E9] text-[#8E735B] border-[#BBA588]/60 dark:from-[#1E1E1E]/80 dark:via-[#2A2A2A]/80 dark:to-[#1E1E1E]/80 dark:text-[#BBA588] dark:border-[#BBA588]/20 px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-semibold shadow-lg shadow-[#BBA588]/10 rounded-full animate-fade-in font-serif">
            ✨ Your AI Travel Companion
          </Badge>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 sm:mb-8 leading-tight font-serif-display">
            <span className="block text-[#2D2C2A] dark:text-[#ECE8D9] mb-3 sm:mb-4 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Explore Like a Local,
            </span>
            <span className="block bg-gradient-to-r from-[#8E735B] via-[#BBA588] to-[#7C6D64] bg-clip-text text-transparent animate-gradient animate-fade-in" style={{ animationDelay: '0.4s' }}>
              Anywhere in the World
            </span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-[#5A5A5A] dark:text-[#B6B6B6] mb-8 sm:mb-12 max-w-4xl mx-auto leading-relaxed font-serif animate-fade-in px-2 sm:px-4" style={{ animationDelay: '0.6s' }}>
            Voce transforms any traveler into a local adventurer with an AI voice agent, available through a simple phone call. No apps, no setup, no internet needed.
          </p>
        </div>        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="group glass-classic border-[#BBA588]/40 dark:border-[#BBA588]/20 hover:border-[#BBA588]/60 dark:hover:border-[#BBA588]/40 transition-all duration-500 shadow-xl hover:shadow-2xl transform hover:scale-105 hover:-translate-y-2 rounded-2xl sm:rounded-3xl overflow-hidden animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6 sm:p-8 lg:p-10">
                <div className="flex flex-col items-start">
                  <div className="p-3 sm:p-4 bg-gradient-to-br from-[#BBA588]/20 to-[#8E735B]/20 backdrop-blur-sm rounded-xl sm:rounded-2xl text-[#8E735B] dark:text-[#BBA588] mb-6 sm:mb-8 group-hover:scale-110 transition-all duration-300 shadow-lg shadow-[#BBA588]/10">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#2D2C2A] dark:text-[#ECE8D9] mb-3 sm:mb-4 group-hover:text-[#8E735B] dark:group-hover:text-[#BBA588] transition-colors duration-300 font-serif-display">
                    {feature.title}
                  </h3>
                  <p className="text-[#5A5A5A] dark:text-[#B6B6B6] mb-6 sm:mb-8 text-base sm:text-lg leading-relaxed font-serif">{feature.description}</p>

                  <h4 className="text-base sm:text-lg font-semibold text-[#2D2C2A] dark:text-[#ECE8D9] mb-3 sm:mb-4 font-serif-display">Key Benefits</h4>
                  <ul className="space-y-2 sm:space-y-3">
                    {feature.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-start group/item">
                        <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-[#8E735B] dark:text-[#BBA588] mr-2 sm:mr-3 flex-shrink-0 mt-0.5 group-hover/item:scale-110 transition-transform duration-200" />
                        <span className="text-sm sm:text-base text-[#5A5A5A] dark:text-[#B6B6B6] group-hover/item:text-[#2D2C2A] dark:group-hover/item:text-[#ECE8D9] transition-colors duration-200 font-serif">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>        <div className="mt-16 sm:mt-20 md:mt-24 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-[#8E735B] via-[#BBA588] to-[#7C6D64] bg-clip-text text-transparent mb-6 sm:mb-8 font-serif-display">
            Ready to Start Your Adventure?
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
            <Link href="/chat">
              <Button size="lg" className="w-full sm:w-auto btn-classic text-lg sm:text-xl px-8 sm:px-12 py-4 sm:py-6 shadow-2xl hover:shadow-3xl shadow-[#BBA588]/25 hover:shadow-[#BBA588]/40 transition-all duration-300 transform hover:scale-105 rounded-xl sm:rounded-2xl font-semibold font-serif-display">
                Try Voce Now
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="w-full sm:w-auto btn-classic-outline text-lg sm:text-xl px-8 sm:px-12 py-4 sm:py-6 rounded-xl sm:rounded-2xl transition-all duration-300 hover:shadow-xl backdrop-blur-sm font-semibold font-serif-display">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}