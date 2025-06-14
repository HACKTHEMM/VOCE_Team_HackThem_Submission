import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Check, Star, Zap, Crown } from "lucide-react"
import { Footer } from "@/components/footer"
import { Navbar } from "@/components/navbar"

export default function PricingPage() {
  const plans = [
    {
      name: "Starter",
      price: "₹999",
      period: "/month",
      description: "Perfect for small businesses getting started with AI voice",
      features: [
        "Up to 1,000 conversations/month",
        "Basic voice recognition",
        "3 Indian languages support",
        "Email support",
        "Basic analytics",
        "Standard response time"
      ],
      icon: <Zap className="h-6 w-6" />,
      popular: false,
      cta: "Start Free Trial"
    },
    {
      name: "Professional", 
      price: "₹2,999",
      period: "/month",
      description: "Ideal for growing businesses with higher volume needs",
      features: [
        "Up to 10,000 conversations/month",
        "Advanced voice recognition",
        "All 10+ Indian languages",
        "Priority support",
        "Advanced analytics & insights",
        "Custom integrations",
        "Multi-channel support",
        "Real-time monitoring"
      ],
      icon: <Star className="h-6 w-6" />,
      popular: true,
      cta: "Start Free Trial"
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "",
      description: "Custom solutions for large enterprises with specific needs",
      features: [
        "Unlimited conversations",
        "Custom voice models",
        "All languages + custom dialects",
        "24/7 dedicated support",
        "Enterprise-grade security",
        "Custom integrations",
        "On-premise deployment",
        "SLA guarantees",
        "Custom training & onboarding"
      ],
      icon: <Crown className="h-6 w-6" />,
      popular: false,
      cta: "Contact Sales"
    }
  ]
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/50 to-violet-50/50 dark:from-slate-950 dark:via-blue-950/50 dark:to-violet-950/50 transition-all duration-700">      {/* Enhanced Background Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 sm:-top-48 -right-24 sm:-right-48 w-48 sm:w-96 h-48 sm:h-96 gradient-mesh rounded-full blur-3xl opacity-30 animate-float"></div>
        <div className="absolute -bottom-24 sm:-bottom-48 -left-24 sm:-left-48 w-48 sm:w-96 h-48 sm:h-96 bg-gradient-to-tr from-cyan-400/20 via-blue-500/20 to-violet-600/20 rounded-full blur-3xl opacity-30 animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-36 sm:w-72 h-36 sm:h-72 bg-gradient-to-r from-blue-400/10 to-violet-600/10 rounded-full blur-2xl animate-pulse-slow"></div>      </div>
      
      {/* Enhanced Navigation */}
      <Navbar />

      <div className="relative z-10">        {/* Hero Section */}
        <div className="pt-20 sm:pt-24 lg:pt-32 pb-12 sm:pb-16 lg:pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <Badge className="mb-6 sm:mb-8 bg-gradient-to-r from-blue-100/80 to-violet-100/80 dark:from-blue-900/30 dark:to-violet-900/30 text-blue-800 dark:text-blue-300 border-blue-200/50 dark:border-blue-600/30 px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm font-medium shadow-lg backdrop-blur-sm hover:shadow-xl transition-all duration-300 hover:scale-105">
              💰 Simple, Transparent Pricing
            </Badge>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 sm:mb-8 leading-tight">
              <span className="block text-slate-900 dark:text-white mb-2 sm:mb-3">Choose Your</span>
              <span className="block bg-gradient-to-r from-blue-600 via-violet-600 to-cyan-600 bg-clip-text text-transparent animate-gradient">
                Perfect Plan
              </span>
            </h1>
            
            <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg lg:text-xl max-w-4xl mx-auto leading-relaxed mb-12 sm:mb-16 font-medium px-4 sm:px-0">
              Start with our free trial and scale as you grow. All plans include our core AI voice features with no hidden fees.
            </p>
          </div>
        </div>      {/* Pricing Cards */}
      <div className="relative px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20 lg:pb-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
            {plans.map((plan) => (
              <Card
                key={plan.name}
                className={`relative group glass-strong border-white/30 dark:border-slate-700/50 transition-all duration-500 shadow-xl hover:shadow-2xl transform hover:scale-105 overflow-hidden h-full ${
                  plan.popular 
                    ? 'ring-2 ring-blue-500/50 dark:ring-blue-400/50 border-blue-300/50 dark:border-blue-600/50' 
                    : 'hover:border-blue-300/50 dark:hover:border-blue-600/50'
                } ${plan.name === 'Professional' ? 'md:col-span-2 lg:col-span-1' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <Badge className="bg-gradient-to-r from-blue-500 to-violet-500 text-white border-0 px-4 sm:px-6 py-1 text-xs sm:text-sm font-medium shadow-lg">
                      Most Popular
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="text-center pb-6 sm:pb-8 pt-6 sm:pt-8 px-4 sm:px-6">
                  <div className="flex justify-center mb-3 sm:mb-4">
                    <div className={`p-2 sm:p-3 rounded-xl ${
                      plan.popular 
                        ? 'bg-gradient-to-br from-blue-500/20 to-violet-500/20 text-blue-600 dark:text-blue-400'
                        : 'bg-gradient-to-br from-slate-500/20 to-gray-500/20 text-slate-600 dark:text-slate-400'
                    }`}>
                      {plan.icon}
                    </div>
                  </div>
                  
                  <CardTitle className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-2">
                    {plan.name}
                  </CardTitle>
                  
                  <div className="mb-3 sm:mb-4">
                    <span className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white">
                      {plan.price}
                    </span>
                    {plan.period && (
                      <span className="text-slate-600 dark:text-slate-400 ml-1 text-sm sm:text-base">
                        {plan.period}
                      </span>
                    )}
                  </div>
                  
                  <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
                    {plan.description}
                  </p>
                </CardHeader>
                
                <CardContent className="px-4 sm:px-6 lg:px-8 pb-6 sm:pb-8 flex flex-col h-full">
                  <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8 flex-grow">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start space-x-3">
                        <Check className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-slate-700 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    className={`w-full text-sm sm:text-base lg:text-lg py-4 sm:py-5 lg:py-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl mt-auto ${
                      plan.popular
                        ? 'bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white'
                        : 'bg-gradient-to-r from-slate-600 to-gray-600 hover:from-slate-700 hover:to-gray-700 text-white'
                    }`}
                    asChild
                  >
                    <Link href={plan.cta === "Contact Sales" ? "/contact" : "/chat"}>
                      {plan.cta}
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>      {/* FAQ Section */}
      <div className="relative py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-8 sm:mb-12">
            Frequently Asked Questions
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 text-left">
            <div className="space-y-4 sm:space-y-6">
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-white mb-2">
                  Is there a free trial?
                </h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                  Yes! All plans come with a 14-day free trial. No credit card required to get started.
                </p>
              </div>
              
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-white mb-2">
                  Can I change plans anytime?
                </h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                  Absolutely! You can upgrade or downgrade your plan at any time. Changes take effect immediately.
                </p>
              </div>
            </div>
            
            <div className="space-y-4 sm:space-y-6">
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-white mb-2">
                  What languages are supported?
                </h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                  We support 10+ Indian languages including Hindi, Bengali, Tamil, Telugu, and more, plus English.
                </p>
              </div>
              
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-white mb-2">
                  Is my data secure?
                </h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                  Yes! We use enterprise-grade security with end-to-end encryption and comply with all data protection regulations.
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-8 sm:mt-12">
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white text-sm sm:text-base lg:text-lg px-6 sm:px-8 py-3 sm:py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 w-full sm:w-auto" asChild>
              <Link href="/contact">
                Still have questions? Contact us
              </Link>
            </Button>          </div>
        </div>
      </div>
      </div>
      
      <Footer />
    </div>
  )
}
