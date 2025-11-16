'use client'

import { useState, useEffect } from 'react'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Search, MapPin, Calendar, ChevronRight, Sparkles, Users, Award, Clock, Shield, CheckCircle, Star, Phone, Mail, Globe, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { useToastNotification } from '@/hooks/use-toast-notification'

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false)
  const toast = useToastNotification()

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const handleGetStarted = () => {
    // Navigate to signup page
    window.location.href = '/signup'
  }

  const handleLogin = () => {
    // Navigate to login page
    window.location.href = '/login'
  }

  return (
    <div className="min-h-screen flex flex-col">

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-background via-secondary to-background pt-12 pb-20 overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center transform transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6 animate-fade-in">
              <Sparkles size={16} />
              <span className="text-sm font-medium">Connect with Verified Priests Instantly</span>
            </div>
            
            <h1 className="font-serif text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
              Find Your Perfect
              <span className="text-primary block">Priest</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              Book trusted, verified priests for poojas, ceremonies, and spiritual services. 
              Simple, secure, and traditional values meet modern convenience.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button 
                onClick={handleGetStarted}
                className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-8 py-4 rounded-lg hover:shadow-lg hover:scale-105 transition-all"
              >
                Get Started
                <ArrowRight className="ml-2" size={20} />
              </Button>
              <Button 
                onClick={handleLogin}
                variant="outline" 
                className="text-lg px-8 py-4 rounded-lg hover:shadow-lg transition-all"
              >
                Sign In
              </Button>
            </div>

            <div className="flex flex-wrap justify-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle className="text-primary" size={16} />
                <span>No Credit Card Required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="text-primary" size={16} />
                <span>Verified Priests Only</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="text-primary" size={16} />
                <span>Instant Booking</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges Section */}
      <section className="py-16 bg-background border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="font-serif text-2xl font-bold text-foreground mb-2">Why Choose Find My Priest?</h2>
            <p className="text-muted-foreground">Your trusted partner for spiritual services</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Shield, title: 'Verified Priests', description: 'Background checked' },
              { icon: Clock, title: 'Instant Booking', description: 'Quick & easy' },
              { icon: Star, title: 'Top Rated', description: '4.9/5 rating' },
              { icon: Award, title: 'Best Service', description: 'Award winning' },
            ].map((badge, idx) => (
              <div key={badge.title} className="text-center group">
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                  <badge.icon size={20} />
                </div>
                <h3 className="font-semibold text-foreground mb-1">{badge.title}</h3>
                <p className="text-sm text-muted-foreground">{badge.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl font-bold text-foreground mb-4">How It Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Three simple steps to connect with your perfect priest
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Sign Up',
                description: 'Create your free account in seconds. No credit card required.',
                icon: Users,
              },
              {
                step: '02', 
                title: 'Browse & Book',
                description: 'Browse verified priests, compare profiles, and book your service.',
                icon: Search,
              },
              {
                step: '03',
                title: 'Get Blessed',
                description: 'Enjoy your spiritual ceremony with peace of mind.',
                icon: Award,
              },
            ].map((step, idx) => (
              <div key={step.step} className="text-center group">
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto text-2xl font-bold shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                    <step.icon size={32} />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-accent text-accent-foreground rounded-full flex items-center justify-center text-sm font-bold">
                    {step.step}
                  </div>
                </div>
                <h3 className="font-serif text-2xl font-bold text-foreground mb-3">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 bg-gradient-to-r from-primary/10 to-accent/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl font-bold text-foreground mb-4">Trusted by Thousands</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Join our growing community of satisfied customers and verified priests
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: Users, number: '10,000+', label: 'Happy Customers' },
              { icon: Award, number: '500+', label: 'Verified Priests' },
              { icon: Calendar, number: '50,000+', label: 'Services Booked' },
              { icon: Star, number: '4.9/5', label: 'Average Rating' },
            ].map((stat, idx) => (
              <div key={stat.label} className="text-center animate-fade-in" style={{ animationDelay: `${idx * 100}ms` }}>
                <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110">
                  <stat.icon size={24} />
                </div>
                <div className="font-serif text-3xl font-bold text-foreground mb-2">{stat.number}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl font-bold text-foreground mb-4">Everything You Need</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Comprehensive features to make your spiritual journey seamless
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Verified Priests',
                description: 'All priests undergo thorough background verification and credential checks.',
                icon: Shield,
              },
              {
                title: 'Instant Booking',
                description: 'Book priests instantly with our streamlined booking system.',
                icon: Clock,
              },
              {
                title: 'Secure Payments',
                description: 'Safe and secure payment processing with multiple payment options.',
                icon: Award,
              },
              {
                title: 'Real Reviews',
                description: 'Read genuine reviews from real customers to make informed decisions.',
                icon: Star,
              },
              {
                title: '24/7 Support',
                description: 'Our support team is available round the clock to assist you.',
                icon: Phone,
              },
              {
                title: 'Mobile App',
                description: 'Access our services on the go with our mobile application.',
                icon: Globe,
              },
            ].map((feature, idx) => (
              <div key={feature.title} className="bg-card p-6 rounded-2xl border border-border hover:shadow-lg hover:border-primary/30 transition-all duration-300 animate-fade-in" style={{ animationDelay: `${idx * 100}ms` }}>
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center mb-4">
                  <feature.icon size={24} />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-card border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-4xl font-bold text-foreground mb-12 text-center">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Priya Sharma',
                text: 'Found the perfect priest for our griha pravesh. Professional, punctual, and very knowledgeable.',
                rating: 5,
              },
              {
                name: 'Rajesh Kumar',
                text: 'Great platform! Made booking for my daughter\'s wedding ceremony so easy and stress-free.',
                rating: 5,
              },
              {
                name: 'Anjali Desai',
                text: 'Highly recommended. The priest was experienced and made our pooja very special and meaningful.',
                rating: 5,
              },
            ].map((testimonial, idx) => (
              <div key={testimonial.name} className="bg-background p-6 rounded-2xl border border-border hover:shadow-lg hover:border-primary/30 transition-all duration-300 animate-fade-in" style={{ animationDelay: `${idx * 100}ms` }}>
                <div className="flex gap-1 mb-4">
                  {Array(testimonial.rating).fill(0).map((_, i) => (
                    <span key={i} className="text-primary text-lg">★</span>
                  ))}
                </div>
                <p className="text-muted-foreground mb-4 italic">"{testimonial.text}"</p>
                <p className="font-semibold text-foreground">{testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl font-bold text-foreground mb-4">Frequently Asked Questions</h2>
            <p className="text-muted-foreground">
              Everything you need to know about our priest booking service
            </p>
          </div>
          <div className="space-y-6">
            {[
              {
                question: 'How do I know the priests are verified?',
                answer: 'All our priests go through a rigorous verification process including background checks, credential verification, and review of their experience and training.',
              },
              {
                question: 'Can I book a priest for same-day service?',
                answer: 'Yes! Many of our priests offer same-day or next-day services. Use our urgent booking filter or contact our support team for immediate assistance.',
              },
              {
                question: 'What if I need to cancel or reschedule?',
                answer: 'You can cancel or reschedule your booking up to 24 hours before the service time through your dashboard. Our cancellation policy is flexible and customer-friendly.',
              },
              {
                question: 'Are the prices fixed or negotiable?',
                answer: 'Prices are set by individual priests based on their experience and the type of service. You can see the cost upfront before booking, with no hidden fees.',
              },
            ].map((faq, idx) => (
              <div key={faq.question} className="bg-card p-6 rounded-2xl border border-border hover:shadow-lg hover:border-primary/30 transition-all duration-300 animate-fade-in" style={{ animationDelay: `${idx * 50}ms` }}>
                <div className="flex items-start gap-3">
                  <CheckCircle className="text-primary mt-1 flex-shrink-0" size={20} />
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">{faq.question}</h3>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-accent">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-4xl font-bold text-primary-foreground mb-6">Ready to Begin Your Spiritual Journey?</h2>
          <p className="text-lg text-primary-foreground/90 mb-8">
            Join thousands of satisfied customers who have found their trusted priest through our platform
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={handleGetStarted}
              className="bg-background text-foreground hover:bg-background/90 text-base px-8 py-6 rounded-lg hover:shadow-lg hover:scale-105 transition-all"
            >
              Sign Up Free
              <ArrowRight className="ml-2" size={20} />
            </Button>
            <Button 
              onClick={handleLogin}
              variant="outline" 
              className="border-background text-background hover:bg-background hover:text-primary text-base px-8 py-6 rounded-lg"
            >
              Sign In
            </Button>
          </div>
          <p className="text-sm text-primary-foreground/70 mt-6">
            No credit card required • Free to join • Cancel anytime
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-card border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl font-bold text-foreground mb-4">Get in Touch</h2>
            <p className="text-muted-foreground">
              Have questions? We're here to help. Reach out to us anytime.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone size={20} />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Phone</h3>
              <p className="text-muted-foreground">+1 (555) 123-4567</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail size={20} />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Email</h3>
              <p className="text-muted-foreground">support@findmypriest.com</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin size={20} />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Location</h3>
              <p className="text-muted-foreground">New Delhi, India</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
