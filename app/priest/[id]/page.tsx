'use client'

import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Star, MapPin, Clock, Phone, Mail, Award, Users } from 'lucide-react'

const priestData = {
  id: '1',
  name: 'Pandit Rajesh Kumar',
  specialty: 'Vedic Rituals & Ceremonies',
  rating: 5,
  reviews: 127,
  location: 'Delhi',
  experience: 15,
  price: 500,
  phone: '+91-98765-43210',
  email: 'rajesh@findmypriest.com',
  bio: 'With over 15 years of experience in Vedic rituals, I have conducted hundreds of ceremonies with complete authenticity and dedication. My expertise spans across various religious services.',
  services: ['Griha Pravesh', 'Vivah Samskara', 'Satyanarayan Katha', 'Mundan', 'Upanayan', 'Yagna'],
  languages: ['Hindi', 'Sanskrit', 'English'],
  availability: 'Available 7 days a week',
  certifications: [
    'Vedic Pandit Certificate from Benares Hindu University',
    'Advanced Ritual Studies',
    'Traditional Sanskrit Training'
  ]
}

export default function PriestProfilePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-1 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Profile Header */}
          <div className="bg-card rounded-3xl p-8 border border-border mb-8">
            <div className="grid md:grid-cols-3 gap-8">
              {/* Avatar */}
              <div>
                <div className="w-32 h-32 mx-auto bg-gradient-to-br from-primary/40 to-accent/30 rounded-2xl flex items-center justify-center text-5xl">
                  👨‍🙏
                </div>
              </div>

              {/* Info */}
              <div className="md:col-span-2">
                <h1 className="font-serif text-3xl font-bold text-foreground mb-2">{priestData.name}</h1>
                <p className="text-accent font-medium mb-4">{priestData.specialty}</p>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex gap-0.5">
                    {Array(5).fill(0).map((_, i) => (
                      <Star key={i} size={18} className="fill-primary text-primary" />
                    ))}
                  </div>
                  <span className="text-muted-foreground">({priestData.reviews} reviews)</span>
                </div>

                {/* Quick Info */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center gap-2 text-sm">
                    <Clock size={16} className="text-primary" />
                    <span className="text-muted-foreground">{priestData.experience}+ years experience</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin size={16} className="text-primary" />
                    <span className="text-muted-foreground">{priestData.location}</span>
                  </div>
                </div>

                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-lg text-base">
                  Book Now - ₹{priestData.price}/hour
                </Button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid md:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="md:col-span-2 space-y-8">
              {/* About */}
              <section>
                <h2 className="font-serif text-2xl font-bold text-foreground mb-4">About Me</h2>
                <p className="text-muted-foreground leading-relaxed">{priestData.bio}</p>
              </section>

              {/* Services */}
              <section>
                <h2 className="font-serif text-2xl font-bold text-foreground mb-4">Services Offered</h2>
                <div className="grid grid-cols-2 gap-4">
                  {priestData.services.map((service) => (
                    <div key={service} className="bg-secondary rounded-xl px-4 py-3 text-center text-sm font-medium text-secondary-foreground">
                      {service}
                    </div>
                  ))}
                </div>
              </section>

              {/* Reviews */}
              <section>
                <h2 className="font-serif text-2xl font-bold text-foreground mb-4">Reviews</h2>
                <div className="space-y-4">
                  {[
                    {
                      name: 'Priya Sharma',
                      rating: 5,
                      text: 'Excellent service! Very professional and punctual. Would definitely recommend.',
                      date: '2 weeks ago'
                    },
                    {
                      name: 'Rajesh Kumar',
                      rating: 5,
                      text: 'Amazing experience with our griha pravesh ceremony. Everything was perfect.',
                      date: '1 month ago'
                    },
                  ].map((review, idx) => (
                    <div key={idx} className="bg-card rounded-2xl p-6 border border-border">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-foreground">{review.name}</h3>
                          <p className="text-xs text-muted-foreground">{review.date}</p>
                        </div>
                        <div className="flex gap-0.5">
                          {Array(review.rating).fill(0).map((_, i) => (
                            <Star key={i} size={14} className="fill-primary text-primary" />
                          ))}
                        </div>
                      </div>
                      <p className="text-muted-foreground">{review.text}</p>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-6">
              {/* Contact Info */}
              <div className="bg-card rounded-2xl p-6 border border-border">
                <h3 className="font-semibold text-foreground mb-4">Contact</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Phone size={16} className="text-primary" />
                    <a href={`tel:${priestData.phone}`} className="text-sm text-primary hover:underline">
                      {priestData.phone}
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail size={16} className="text-primary" />
                    <a href={`mailto:${priestData.email}`} className="text-sm text-primary hover:underline break-all">
                      {priestData.email}
                    </a>
                  </div>
                </div>
              </div>

              {/* Languages */}
              <div className="bg-card rounded-2xl p-6 border border-border">
                <h3 className="font-semibold text-foreground mb-4">Languages</h3>
                <div className="space-y-2">
                  {priestData.languages.map((lang) => (
                    <div key={lang} className="text-sm text-muted-foreground">✓ {lang}</div>
                  ))}
                </div>
              </div>

              {/* Availability */}
              <div className="bg-card rounded-2xl p-6 border border-border">
                <h3 className="font-semibold text-foreground mb-4">Availability</h3>
                <p className="text-sm text-muted-foreground">{priestData.availability}</p>
              </div>

              {/* Certifications */}
              <div className="bg-primary/10 rounded-2xl p-6 border border-primary/20">
                <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Award size={20} className="text-primary" />
                  Certifications
                </h3>
                <ul className="space-y-2">
                  {priestData.certifications.map((cert, idx) => (
                    <li key={idx} className="text-sm text-foreground">✓ {cert}</li>
                  ))}
                </ul>
              </div>

              {/* Quick Stats */}
              <div className="bg-secondary/30 rounded-2xl p-6 border border-border">
                <div className="flex items-center gap-2 mb-3">
                  <Users size={20} className="text-primary" />
                  <span className="font-semibold text-foreground">Quick Stats</span>
                </div>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>Bookings completed: 250+</p>
                  <p>Response time: Within 1 hour</p>
                  <p>Avg. rating: 4.9/5</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
