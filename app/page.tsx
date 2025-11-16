'use client'

import { useEffect } from 'react'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Search, Calendar, ChevronRight, CheckCircle, Shield, Clock, Heart, Star, Phone, Mail, MessageCircle, ArrowRight } from 'lucide-react'
import { useAppContext } from '@/context/app-context'
import { useRouter } from 'next/navigation'

export default function Home() {
  const { currentUser } = useAppContext()
  const router = useRouter()

  useEffect(() => {
    // Don't redirect - keep landing page as main home page
    // Users can navigate to their home pages from the navbar
  }, [currentUser, router])

  const handleGetStarted = () => {
    window.location.href = '/signup'
  }

  const handleLogin = () => {
    window.location.href = '/login'
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-background via-secondary to-background pt-12 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <span className="text-white font-serif font-bold text-3xl">ॐ</span>
            </div>
            <h1 className="font-serif text-5xl md:text-6xl font-bold text-foreground mb-6">
              Find Your Perfect Priest
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Connect with verified priests for authentic ceremonies. Book traditional rituals with ease and confidence.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button 
                onClick={handleGetStarted}
                className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-8 py-4 rounded-lg"
              >
                Get Started
                <ArrowRight className="ml-2" size={20} />
              </Button>
              <Button 
                onClick={handleLogin}
                variant="outline"
                className="border-primary text-primary hover:bg-primary/10 text-lg px-8 py-4 rounded-lg"
              >
                Sign In
              </Button>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center text-sm text-muted-foreground">
              <div className="flex items-center">
                <CheckCircle className="text-green-500 mr-2" size={16} />
                <span>Verified Priests</span>
              </div>
              <div className="flex items-center">
                <Shield className="text-blue-500 mr-2" size={16} />
                <span>Secure Booking</span>
              </div>
              <div className="flex items-center">
                <Clock className="text-purple-500 mr-2" size={16} />
                <span>Instant Confirmation</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-12 bg-card/50 border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">500+</div>
              <div className="text-sm text-muted-foreground">Verified Priests</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">10,000+</div>
              <div className="text-sm text-muted-foreground">Happy Devotees</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">50+</div>
              <div className="text-sm text-muted-foreground">Ceremonies</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">4.9/5</div>
              <div className="text-sm text-muted-foreground">Average Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl font-bold text-foreground mb-4">How It Works</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Book priests for your ceremonies in just a few simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="text-primary" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">1. Search & Filter</h3>
              <p className="text-muted-foreground">
                Browse verified priests in your area, filter by language, ceremony type, and availability
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Calendar className="text-primary" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">2. Book & Schedule</h3>
              <p className="text-muted-foreground">
                Select your preferred date, time, and ceremony type. Confirm your booking instantly
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="text-primary" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">3. Connect & Celebrate</h3>
              <p className="text-muted-foreground">
                Priest arrives at your location, performs the ceremony, and you pay securely online
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-card/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl font-bold text-foreground mb-4">Why Choose Us</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Experience the perfect blend of tradition and technology
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-card rounded-xl p-6 border border-border hover:shadow-lg transition-all">
              <Shield className="text-primary mb-4" size={32} />
              <h3 className="text-xl font-semibold text-foreground mb-3">Verified Priests</h3>
              <p className="text-muted-foreground">
                All priests undergo thorough background verification and credential checks
              </p>
            </div>

            <div className="bg-card rounded-xl p-6 border border-border hover:shadow-lg transition-all">
              <Clock className="text-primary mb-4" size={32} />
              <h3 className="text-xl font-semibold text-foreground mb-3">24/7 Availability</h3>
              <p className="text-muted-foreground">
                Find priests available at your preferred time, including emergency ceremonies
              </p>
            </div>

            <div className="bg-card rounded-xl p-6 border border-border hover:shadow-lg transition-all">
              <MessageCircle className="text-primary mb-4" size={32} />
              <h3 className="text-xl font-semibold text-foreground mb-3">Direct Communication</h3>
              <p className="text-muted-foreground">
                Chat directly with priests to discuss ceremony details and requirements
              </p>
            </div>

            <div className="bg-card rounded-xl p-6 border border-border hover:shadow-lg transition-all">
              <Star className="text-primary mb-4" size={32} />
              <h3 className="text-xl font-semibold text-foreground mb-3">Rating System</h3>
              <p className="text-muted-foreground">
                Read reviews and ratings from other devotees to make informed choices
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-accent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-4xl font-bold text-white mb-6">Ready to Begin Your Spiritual Journey?</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of devotees who have found their perfect priests through our platform
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={handleGetStarted}
              className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-4 rounded-lg"
            >
              Get Started Now
              <ArrowRight className="ml-2" size={20} />
            </Button>
            <Button 
              onClick={() => window.location.href = '/priest/register'}
              variant="outline"
              className="bg-transparent text-white border-white hover:bg-white/10 text-lg px-8 py-4 rounded-lg"
            >
              Register as Priest
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-12 bg-card/50 border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <Phone className="text-primary mb-3" size={24} />
              <h3 className="font-semibold text-foreground mb-1">Call Us</h3>
              <p className="text-muted-foreground">+91 98765 43210</p>
            </div>
            <div className="flex flex-col items-center">
              <Mail className="text-primary mb-3" size={24} />
              <h3 className="font-semibold text-foreground mb-1">Email Us</h3>
              <p className="text-muted-foreground">support@findmypriest.com</p>
            </div>
            <div className="flex flex-col items-center">
              <MessageCircle className="text-primary mb-3" size={24} />
              <h3 className="font-semibold text-foreground mb-1">Live Chat</h3>
              <p className="text-muted-foreground">Available 24/7</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
