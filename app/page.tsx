"use client"

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Youtube, Sparkles, BarChart3, Users, TrendingUp, ArrowRight, Star, Check } from "lucide-react"

const features = [
  {
    icon: Sparkles,
    title: "AI Content Generation",
    description: "Generate viral titles, descriptions, thumbnails, and scripts with advanced AI"
  },
  {
    icon: BarChart3,
    title: "Advanced Analytics",
    description: "Deep insights into your channel performance and audience behavior"
  },
  {
    icon: Users,
    title: "Competitor Analysis",
    description: "Track competitors and find content gaps in your niche"
  },
  {
    icon: TrendingUp,
    title: "Growth Optimization",
    description: "AI-powered recommendations to accelerate your channel growth"
  }
]

const pricingPlans = [
  {
    name: "Starter",
    price: "$29",
    description: "Perfect for new creators",
    features: ["100 AI credits/month", "Basic analytics", "5 competitor tracks"],
    popular: false
  },
  {
    name: "Pro",
    price: "$59",
    description: "For growing channels",
    features: ["500 AI credits/month", "Advanced analytics", "20 competitor tracks", "Priority support"],
    popular: true
  },
  {
    name: "Enterprise",
    price: "$99",
    description: "For established creators",
    features: ["Unlimited AI credits", "Custom analytics", "Unlimited tracking", "24/7 support"],
    popular: false
  }
]

export default function Home() {
  const router = useRouter()

  const handleGetStarted = () => {
    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Youtube className="h-8 w-8 text-red-500" />
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
              CreatorAI
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              className="text-white hover:bg-white/10"
              onClick={() => router.push('/login')}
            >
              Sign In
            </Button>
            <Button 
              className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700"
              onClick={() => router.push('/signup')}
            >
              Get Started
            </Button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <Badge className="mb-4 bg-purple-500/20 text-purple-300 border-purple-500/30">
          <Star className="h-3 w-3 mr-1" />
          Trusted by 10,000+ creators
        </Badge>
        
        <h1 className="text-6xl font-bold text-white mb-6 leading-tight">
          Supercharge Your
          <span className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
            {" "}YouTube Growth
          </span>
        </h1>
        
        <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
          The ultimate AI-powered platform for YouTube creators. Generate viral content, 
          analyze competitors, and optimize your channel with advanced analytics and insights.
        </p>
        
        <div className="flex items-center justify-center gap-4 mb-12">
          <Button 
            size="lg" 
            onClick={handleGetStarted}
            className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-lg px-8"
          >
            Start Creating
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button size="lg" variant="outline" className="text-lg px-8 border-gray-600 text-white hover:bg-gray-800">
            Watch Demo
          </Button>
        </div>

        {/* Demo Preview */}
        <div className="relative max-w-5xl mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur-3xl opacity-20"></div>
          <div className="relative bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-lg p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">500K+</div>
                <div className="text-gray-400">Views Generated</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">25M+</div>
                <div className="text-gray-400">AI Suggestions</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">98%</div>
                <div className="text-gray-400">Success Rate</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Everything You Need to Grow
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Comprehensive tools and insights to take your YouTube channel to the next level
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="bg-gray-900/50 backdrop-blur-sm border-gray-700 hover:border-purple-500/50 transition-all">
              <CardHeader>
                <feature.icon className="h-8 w-8 text-purple-400 mb-2" />
                <CardTitle className="text-white">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-400">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Choose Your Plan
          </h2>
          <p className="text-gray-300 text-lg">
            Start free, scale as you grow
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <Card key={index} className={`relative bg-gray-900/50 backdrop-blur-sm border-gray-700 ${plan.popular ? 'border-purple-500 scale-105' : ''}`}>
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-gradient-to-r from-purple-500 to-pink-600">
                    Most Popular
                  </Badge>
                </div>
              )}
              <CardHeader className="text-center">
                <CardTitle className="text-white text-2xl">{plan.name}</CardTitle>
                <div className="text-4xl font-bold text-white">
                  {plan.price}
                  <span className="text-lg font-normal text-gray-400">/month</span>
                </div>
                <CardDescription className="text-gray-400">
                  {plan.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-gray-300">
                      <Check className="h-4 w-4 text-green-400 mr-3" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button 
                  className={`w-full ${plan.popular 
                    ? 'bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700' 
                    : 'bg-gray-700 hover:bg-gray-600'
                  }`}
                >
                  Get Started
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-12 border-t border-gray-700">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <Youtube className="h-6 w-6 text-red-500" />
            <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
              CreatorAI
            </span>
          </div>
          <div className="text-gray-400 text-sm">
            © 2025 CreatorAI. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}