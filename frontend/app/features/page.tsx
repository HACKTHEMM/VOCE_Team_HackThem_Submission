import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Mic, Globe, MessageSquare, Zap, Shield, Brain, Sparkles, Layers, CheckCircle } from "lucide-react"
import { Footer } from "@/components/footer"
import { Navbar } from "@/components/navbar"

export default function FeaturesPage() {
  const features = [    {
      icon: <Mic className="h-8 w-8 sm:h-10 sm:w-10" />,
      title: "Voice-First Interface",
      description:
        "Natural voice interactions with real-time speech recognition and synthesis. Speak naturally in your preferred language and get instant responses.",
      benefits: [
        "Hands-free operation",
        "Natural conversation flow",
        "Accessibility for all users",
        "Faster than typing",
      ],
    },
    {
      icon: <Globe className="h-8 w-8 sm:h-10 sm:w-10" />,
      title: "Multilingual Support",
      description:
        "Communicate seamlessly in multiple Indian languages including Hindi, Bengali, Telugu, Tamil, Marathi, Gujarati, Kannada, Malayalam, and Punjabi.",
      benefits: [
        "Native language support",
        "Real-time language switching",
        "Cultural context awareness",
        "Regional dialect understanding",
      ],
    },
    {
      icon: <MessageSquare className="h-8 w-8 sm:h-10 sm:w-10" />,
      title: "Contextual Conversations",
      description:
        "Our AI understands context, remembers previous interactions, and provides empathetic responses that feel natural and human-like.",
      benefits: [
        "Remembers conversation history",
        "Understands implicit references",
        "Handles complex queries",
        "Provides personalized responses",
      ],
    },
    {
      icon: <Brain className="h-8 w-8 sm:h-10 sm:w-10" />,
      title: "Advanced AI Understanding",
      description:
        "Powered by state-of-the-art language models that understand nuance, sentiment, and can interpret vague or ambiguous queries with remarkable accuracy.",
      benefits: ["Sentiment analysis", "Intent recognition", "Entity extraction", "Knowledge graph integration"],
    },
    {
      icon: <Sparkles className="h-8 w-8 sm:h-10 sm:w-10" />,
      title: "Smart Product Recommendations",
      description:
        "Get personalized product recommendations based on your preferences, budget, and needs, with detailed comparisons and feature highlights.",
      benefits: ["Personalized suggestions", "Feature-based matching", "Price comparison", "Alternative options"],
    },
    {
      icon: <Zap className="h-8 w-8 sm:h-10 sm:w-10" />,
      title: "Agentic Framework",
      description:
        "Our AI can perform complex tasks autonomously, from researching products to processing orders and handling customer service inquiries.",
      benefits: [
        "Autonomous task execution",
        "Multi-step reasoning",
        "Decision making capabilities",
        "Process automation",
      ],
    },
    {
      icon: <Layers className="h-8 w-8 sm:h-10 sm:w-10" />,
      title: "Omnichannel Integration",
      description:
        "Seamlessly integrate with your existing systems including CRM, inventory management, and e-commerce platforms for a unified customer experience.",
      benefits: [
        "CRM integration",
        "E-commerce platform compatibility",
        "Inventory synchronization",
        "Order management",
      ],
    },
    {
      icon: <Shield className="h-8 w-8 sm:h-10 sm:w-10" />,
      title: "Enterprise Ready",
      description:
        "Built with security, scalability, and reliability in mind. Deploy with confidence knowing your data is protected and your customers are well-served.",
      benefits: ["End-to-end encryption", "GDPR compliance", "Scalable architecture", "99.9% uptime guarantee"],
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/50 to-violet-50/50 dark:from-slate-950 dark:via-blue-950/50 dark:to-violet-950/50 transition-all duration-700">      {/* Enhanced Background Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 sm:-top-48 sm:-right-48 w-48 h-48 sm:w-96 sm:h-96 gradient-mesh rounded-full blur-3xl opacity-20 sm:opacity-30 animate-float"></div>
        <div className="absolute -bottom-24 -left-24 sm:-bottom-48 sm:-left-48 w-48 h-48 sm:w-96 sm:h-96 bg-gradient-to-tr from-cyan-400/20 via-blue-500/20 to-violet-600/20 rounded-full blur-3xl opacity-20 sm:opacity-30 animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-36 h-36 sm:w-72 sm:h-72 bg-gradient-to-r from-blue-400/10 to-violet-600/10 rounded-full blur-2xl animate-pulse-slow"></div>
      </div>{/* Enhanced Navigation */}
      <Navbar />      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-24 relative z-10">
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <Badge className="mb-6 sm:mb-8 bg-gradient-to-r from-blue-50 via-violet-50 to-cyan-50 text-blue-700 border-blue-200/60 dark:from-blue-900/20 dark:via-violet-900/20 dark:to-cyan-900/20 dark:text-blue-300 dark:border-blue-600/20 px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-semibold shadow-lg shadow-blue-500/10 rounded-full animate-fade-in">
            ✨ Powerful AI Features
          </Badge>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 sm:mb-8 leading-tight">
            <span className="block text-slate-900 dark:text-white mb-3 sm:mb-4 animate-fade-in" style={{animationDelay: '0.2s'}}>
              Advanced Capabilities for
            </span>
            <span className="block bg-gradient-to-r from-blue-600 via-violet-600 via-cyan-600 to-blue-700 bg-clip-text text-transparent animate-gradient animate-fade-in" style={{animationDelay: '0.4s'}}>
              Modern Sales
            </span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-slate-600 dark:text-slate-300 mb-8 sm:mb-12 max-w-4xl mx-auto leading-relaxed font-light animate-fade-in px-2 sm:px-4" style={{animationDelay: '0.6s'}}>
            Discover how SalesSpeak transforms customer interactions with cutting-edge AI technology and intuitive design.
          </p>
        </div>        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="group glass-strong border-white/40 dark:border-slate-700/40 hover:border-blue-300/60 dark:hover:border-blue-600/60 transition-all duration-500 shadow-xl hover:shadow-2xl transform hover:scale-105 hover:-translate-y-2 rounded-2xl sm:rounded-3xl overflow-hidden animate-fade-in"
              style={{animationDelay: `${index * 0.1}s`}}
            >
              <CardContent className="p-6 sm:p-8 lg:p-10">
                <div className="flex flex-col items-start">                  <div className="p-3 sm:p-4 bg-gradient-to-br from-blue-500/20 to-violet-500/20 backdrop-blur-sm rounded-xl sm:rounded-2xl text-blue-600 dark:text-blue-400 mb-6 sm:mb-8 group-hover:scale-110 transition-all duration-300 shadow-lg shadow-blue-500/10">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-800 dark:text-slate-200 mb-3 sm:mb-4 group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 mb-6 sm:mb-8 text-base sm:text-lg leading-relaxed">{feature.description}</p>

                  <h4 className="text-base sm:text-lg font-semibold text-slate-800 dark:text-slate-200 mb-3 sm:mb-4">Key Benefits</h4>
                  <ul className="space-y-2 sm:space-y-3">
                    {feature.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-start group/item">
                        <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 mr-2 sm:mr-3 flex-shrink-0 mt-0.5 group-hover/item:scale-110 transition-transform duration-200" />
                        <span className="text-sm sm:text-base text-slate-600 dark:text-slate-300 group-hover/item:text-slate-800 dark:group-hover/item:text-slate-200 transition-colors duration-200">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>        <div className="mt-16 sm:mt-20 md:mt-24 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 via-violet-600 to-cyan-600 bg-clip-text text-transparent mb-6 sm:mb-8">
            Ready to Experience These Features?
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
            <Link href="/chat">
              <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-blue-600 via-violet-600 to-blue-700 hover:from-blue-700 hover:via-violet-700 hover:to-blue-800 text-white text-lg sm:text-xl px-8 sm:px-12 py-4 sm:py-6 shadow-2xl hover:shadow-3xl shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300 transform hover:scale-105 rounded-xl sm:rounded-2xl font-semibold">
                Try Demo Now
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="w-full sm:w-auto border-2 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-white/60 dark:hover:bg-slate-800/60 text-lg sm:text-xl px-8 sm:px-12 py-4 sm:py-6 rounded-xl sm:rounded-2xl transition-all duration-300 hover:shadow-xl backdrop-blur-sm font-semibold">
                Contact Sales
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  )
}
