import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Check, Star, Zap, Crown, Briefcase, User, MapPinned } from "lucide-react"
import { Footer } from "@/components/footer"
import { Navbar } from "@/components/navbar"

export default function PricingPage() {
  const plans = [
    {
      name: "Traveler",
      price: "₹499",
      period: "/trip (7 days)",
      description: "Perfect for a single trip to explore a new city like a local.",
      features: [
        "Up to 30 calls per trip",
        "Unlimited local recommendations",
        "Support in 5 core languages",
        "Standard SMS & Email support",
        "Access to essential city info",
        "Offline access via phone call"
      ],
      icon: <User className="h-6 w-6" />,
      popular: false,
      cta: "Start Your Trip"
    },
    {
      name: "Explorer",
      price: "₹1,499",
      period: "/month",
      description: "For frequent travelers who want seamless adventures everywhere.",
      features: [
        "Up to 100 calls per month",
        "All features of the Traveler plan",
        "Support for all 15+ languages",
        "Priority phone & chat support",
        "Personalized travel history",
        "Early access to new city guides",
        "Family sharing (up to 2 users)",
        "Exclusive partner discounts"
      ],
      icon: <MapPinned className="h-6 w-6" />,
      popular: true,
      cta: "Become an Explorer"
    },
    {
      name: "Partner",
      price: "Custom",
      period: "",
      description: "For hotels & travel agencies to enhance their guest experience.",
      features: [
        "Unlimited calls for your guests",
        "Custom branded welcome message",
        "Integration with your booking system",
        "Dedicated account manager",
        "Analytics on guest engagement",
        "Co-branded marketing materials",
        "24/7 priority partner support",
        "Custom local recommendations",
        "Flexible billing options"
      ],
      icon: <Briefcase className="h-6 w-6" />,
      popular: false,
      cta: "Contact Partnerships"
    }
  ]
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F3F1E9] via-[#ECE8D9] to-[#F3F1E9] dark:from-[#1E1E1E] dark:via-[#2A2A2A] dark:to-[#1E1E1E] transition-all duration-700">      {/* Classic Background Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 sm:-top-48 -right-24 sm:-right-48 w-48 sm:w-96 h-48 sm:h-96 gradient-classic-mesh rounded-full blur-3xl opacity-30 animate-float"></div>
        <div className="absolute -bottom-24 sm:-bottom-48 -left-24 sm:-left-48 w-48 sm:w-96 h-48 sm:h-96 bg-gradient-to-tr from-[#BBA588]/20 via-[#8E735B]/20 to-[#7C6D64]/20 rounded-full blur-3xl opacity-30 animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-36 sm:w-72 h-36 sm:h-72 bg-gradient-to-r from-[#BBA588]/10 to-[#8E735B]/10 rounded-full blur-2xl animate-pulse-slow"></div>      </div>

      {/* Enhanced Navigation */}
      <Navbar />

      <div className="relative z-10">        {/* Hero Section */}
        <div className="pt-20 sm:pt-24 lg:pt-32 pb-12 sm:pb-16 lg:pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <Badge className="mb-6 sm:mb-8 bg-gradient-to-r from-[#F3F1E9] via-[#ECE8D9] to-[#F3F1E9] text-[#8E735B] border-[#BBA588]/60 dark:from-[#1E1E1E]/80 dark:via-[#2A2A2A]/80 dark:to-[#1E1E1E]/80 dark:text-[#BBA588] dark:border-[#BBA588]/20 px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm font-medium shadow-lg backdrop-blur-sm hover:shadow-xl transition-all duration-300 hover:scale-105 font-serif">
              ✈️ Plans for Every Journey
            </Badge>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 sm:mb-8 leading-tight font-serif-display">
              <span className="block text-[#2D2C2A] dark:text-[#ECE8D9] mb-2 sm:mb-3">Your Adventure,</span>
              <span className="block bg-gradient-to-r from-[#8E735B] via-[#BBA588] to-[#7C6D64] bg-clip-text text-transparent animate-gradient">
                Your Perfect Plan
              </span>
            </h1>

            <p className="text-[#5A5A5A] dark:text-[#B6B6B6] text-base sm:text-lg lg:text-xl max-w-4xl mx-auto leading-relaxed mb-12 sm:mb-16 font-medium px-4 sm:px-0 font-serif">
              Begin your adventure with a free discovery call. Simple plans for every type of traveler, with no hidden fees or need for an internet connection.
            </p>
          </div>
        </div>      {/* Pricing Cards */}
        <div className="relative px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20 lg:pb-24">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
              {plans.map((plan) => (
                <Card
                  key={plan.name}
                  className={`relative group glass-classic border-[#BBA588]/40 dark:border-[#BBA588]/20 transition-all duration-500 shadow-xl hover:shadow-2xl transform hover:scale-105 overflow-hidden h-full flex flex-col ${plan.popular
                      ? 'ring-2 ring-[#BBA588]/50 dark:ring-[#BBA588]/50 border-[#BBA588]/60 dark:border-[#BBA588]/40'
                      : 'hover:border-[#BBA588]/60 dark:hover:border-[#BBA588]/40'
                    } ${plan.name === 'Explorer' ? 'md:col-span-2 lg:col-span-1' : ''}`}
                >
                  {plan.popular && (
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <Badge className="bg-gradient-to-r from-[#8E735B] to-[#BBA588] text-[#F3F1E9] border-0 px-4 sm:px-6 py-1 text-xs sm:text-sm font-medium shadow-lg font-serif">
                        Most Popular
                      </Badge>
                    </div>
                  )}

                  <CardHeader className="text-center pb-6 sm:pb-8 pt-6 sm:pt-8 px-4 sm:px-6">
                    <div className="flex justify-center mb-3 sm:mb-4">
                      <div className={`p-2 sm:p-3 rounded-xl ${plan.popular
                          ? 'bg-gradient-to-br from-[#BBA588]/20 to-[#8E735B]/20 text-[#8E735B] dark:text-[#BBA588]'
                          : 'bg-gradient-to-br from-[#7C6D64]/20 to-[#8E735B]/20 text-[#7C6D64] dark:text-[#B6B6B6]'
                        }`}>
                        {plan.icon}
                      </div>
                    </div>

                    <CardTitle className="text-xl sm:text-2xl font-bold text-[#2D2C2A] dark:text-[#ECE8D9] mb-2 font-serif-display">
                      {plan.name}
                    </CardTitle>

                    <div className="mb-3 sm:mb-4">
                      <span className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#2D2C2A] dark:text-[#ECE8D9] font-serif-display">
                        {plan.price}
                      </span>
                      {plan.period && (
                        <span className="text-[#5A5A5A] dark:text-[#B6B6B6] ml-1 text-sm sm:text-base font-serif">
                          {plan.period}
                        </span>
                      )}
                    </div>

                    <p className="text-[#5A5A5A] dark:text-[#B6B6B6] text-xs sm:text-sm leading-relaxed font-serif min-h-[40px]">
                      {plan.description}
                    </p>
                  </CardHeader>

                  <CardContent className="px-4 sm:px-6 lg:px-8 pb-6 sm:pb-8 flex flex-col h-full flex-grow">
                    <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8 flex-grow">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start space-x-3">
                          <Check className="h-4 w-4 sm:h-5 sm:w-5 text-[#8E735B] dark:text-[#BBA588] flex-shrink-0 mt-0.5" />
                          <span className="text-[#5A5A5A] dark:text-[#B6B6B6] text-xs sm:text-sm leading-relaxed font-serif">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <Button
                      className={`w-full text-sm sm:text-base lg:text-lg py-4 sm:py-5 lg:py-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl mt-auto font-serif-display ${plan.popular
                          ? 'btn-classic'
                          : 'btn-classic-outline'
                        }`}
                      asChild
                    >
                      <Link href={plan.cta === "Contact Partnerships" ? "/contact" : "/chat"}>
                        {plan.cta}
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>      {/* FAQ Section */}
        <div className="relative py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-[#F3F1E9]/50 dark:bg-[#1E1E1E]/50 backdrop-blur-sm">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#2D2C2A] dark:text-[#ECE8D9] mb-8 sm:mb-12 font-serif-display">
              Frequently Asked Questions
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 text-left">
              <div className="space-y-4 sm:space-y-6">
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-[#2D2C2A] dark:text-[#ECE8D9] mb-2 font-serif-display">
                    Can I try Voce for free?
                  </h3>
                  <p className="text-[#5A5A5A] dark:text-[#B6B6B6] text-sm leading-relaxed font-serif">
                    Yes! Your first call to Voce is on us. Experience the magic of having a local guide in your pocket, completely free.
                  </p>
                </div>

                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-[#2D2C2A] dark:text-[#ECE8D9] mb-2 font-serif-display">
                    Can I change my plan?
                  </h3>
                  <p className="text-[#5A5A5A] dark:text-[#B6B6B6] text-sm leading-relaxed font-serif">
                    Absolutely! You can upgrade from a trip pass to a monthly Explorer plan at any time. Changes take effect immediately.
                  </p>
                </div>
              </div>

              <div className="space-y-4 sm:space-y-6">
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-[#2D2C2A] dark:text-[#ECE8D9] mb-2 font-serif-display">
                    Do I need an app or internet?
                  </h3>
                  <p className="text-[#5A5A5A] dark:text-[#B6B6B6] text-sm leading-relaxed font-serif">
                    No! That's the best part. Voce works with a simple phone call from any mobile or landline phone. No app, no data, no Wi-Fi required.
                  </p>
                </div>

                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-[#2D2C2A] dark:text-[#ECE8D9] mb-2 font-serif-display">
                    Is my personal data secure?
                  </h3>
                  <p className="text-[#5A5A5A] dark:text-[#B6B6B6] text-sm leading-relaxed font-serif">
                    Yes. We are committed to traveler privacy. All calls are confidential and we use enterprise-grade security to protect your information.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 sm:mt-12">
              <Button size="lg" className="btn-classic text-sm sm:text-base lg:text-lg px-6 sm:px-8 py-3 sm:py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 w-full sm:w-auto font-serif-display" asChild>
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