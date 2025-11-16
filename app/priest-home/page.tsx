'use client'

import { useState, useEffect } from 'react'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Calendar, MapPin, Clock, Users, TrendingUp, Star, MessageSquare, Search, Filter, ChevronRight, Award, DollarSign, CheckCircle, Clock4 } from 'lucide-react'
import { useAppContext } from '@/context/app-context'
import { useRouter } from 'next/navigation'
import { mockBookings } from '@/lib/mock-data'

export default function PriestHomePage() {
  const { currentUser } = useAppContext()
  const router = useRouter()
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const handleViewDashboard = () => {
    router.push('/priest/dashboard')
  }

  const handleViewProfile = () => {
    router.push('/priest/profile')
  }

  const upcomingBookings = mockBookings.filter((b) => b.status === 'upcoming').slice(0, 3)
  const completedBookings = mockBookings.filter((b) => b.status === 'completed')
  const thisMonthEarnings = 12500
  const totalEarnings = 87500

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 bg-background">
        {/* Welcome Header */}
        <section className="bg-gradient-to-br from-primary/10 to-accent/10 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div>
                <h1 className="font-serif text-4xl font-bold text-foreground mb-2">
                  Welcome back, {currentUser?.name || 'Pandit Rajesh'}! 🙏
                </h1>
                <p className="text-xl text-muted-foreground">
                  Manage your ceremonies and connect with devotees
                </p>
              </div>
              <div className="flex gap-3">
                <Button 
                  onClick={handleViewDashboard}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  <Calendar size={20} className="mr-2" />
                  My Dashboard
                </Button>
                <Button 
                  onClick={handleViewProfile}
                  variant="outline"
                >
                  <Award size={20} className="mr-2" />
                  Edit Profile
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Stats */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className={`bg-card rounded-xl p-6 border border-border transform transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Calendar className="text-blue-600" size={24} />
                  </div>
                  <span className="text-2xl font-bold text-foreground">{upcomingBookings.length}</span>
                </div>
                <h3 className="font-semibold text-foreground">Today's Bookings</h3>
                <p className="text-sm text-muted-foreground">Next in 2 hours</p>
              </div>

              <div className={`bg-card rounded-xl p-6 border border-border transform transition-all duration-700 delay-100 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <CheckCircle className="text-green-600" size={24} />
                  </div>
                  <span className="text-2xl font-bold text-foreground">{completedBookings.length}</span>
                </div>
                <h3 className="font-semibold text-foreground">Completed</h3>
                <p className="text-sm text-muted-foreground">This month</p>
              </div>

              <div className={`bg-card rounded-xl p-6 border border-border transform transition-all duration-700 delay-200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Star className="text-purple-600" size={24} />
                  </div>
                  <span className="text-2xl font-bold text-foreground">4.9</span>
                </div>
                <h3 className="font-semibold text-foreground">Your Rating</h3>
                <p className="text-sm text-muted-foreground">Based on 45 reviews</p>
              </div>

              <div className={`bg-card rounded-xl p-6 border border-border transform transition-all duration-700 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <DollarSign className="text-orange-600" size={24} />
                  </div>
                  <span className="text-2xl font-bold text-foreground">₹{thisMonthEarnings}</span>
                </div>
                <h3 className="font-semibold text-foreground">This Month</h3>
                <p className="text-sm text-muted-foreground">Total earnings</p>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Actions */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-serif text-3xl font-bold text-foreground mb-8">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-card rounded-xl p-6 border border-border hover:shadow-lg transition-all cursor-pointer" onClick={handleViewDashboard}>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Calendar className="text-primary" size={24} />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Manage Bookings</h3>
                <p className="text-muted-foreground mb-4">View and manage your ceremony schedule</p>
                <Button variant="outline" className="w-full">
                  View Schedule
                  <ChevronRight size={16} className="ml-2" />
                </Button>
              </div>

              <div className="bg-card rounded-xl p-6 border border-border hover:shadow-lg transition-all cursor-pointer" onClick={handleViewProfile}>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Award className="text-blue-600" size={24} />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Update Profile</h3>
                <p className="text-muted-foreground mb-4">Add services, update availability</p>
                <Button variant="outline" className="w-full">
                  Edit Profile
                  <ChevronRight size={16} className="ml-2" />
                </Button>
              </div>

              <div className="bg-card rounded-xl p-6 border border-border hover:shadow-lg transition-all cursor-pointer">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="text-green-600" size={24} />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">View Analytics</h3>
                <p className="text-muted-foreground mb-4">Track your performance and earnings</p>
                <Button variant="outline" className="w-full">
                  View Stats
                  <ChevronRight size={16} className="ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Today's Schedule */}
        <section className="py-12 bg-card/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-8">
              <h2 className="font-serif text-3xl font-bold text-foreground">Today's Schedule</h2>
              <Button variant="outline" onClick={handleViewDashboard}>
                View Full Calendar
                <ChevronRight size={16} className="ml-2" />
              </Button>
            </div>
            <div className="grid gap-4">
              {upcomingBookings.map((booking) => (
                <div key={booking.id} className="bg-card rounded-xl p-6 border border-border hover:shadow-lg transition-all">
                  <div className="flex flex-col sm:flex-row justify-between gap-4">
                    <div className="flex gap-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl flex items-center justify-center text-2xl shrink-0">
                        🙏
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">{booking.service}</h3>
                        <p className="text-muted-foreground mb-2">with {booking.userName}</p>
                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Clock4 size={16} />
                            {booking.time}
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin size={16} />
                            {booking.location}
                          </div>
                          <div className="flex items-center gap-1">
                            <DollarSign size={16} />
                            ₹{booking.amount}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <MessageSquare size={16} className="mr-1" />
                        Message
                      </Button>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Recent Devotees */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-8">
              <h2 className="font-serif text-3xl font-bold text-foreground">Recent Devotees</h2>
              <Button variant="outline">
                View All
                <ChevronRight size={16} className="ml-2" />
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-card rounded-xl p-6 border border-border hover:shadow-lg transition-all">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl flex items-center justify-center text-2xl">
                      👤
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground">Priya Sharma</h3>
                      <p className="text-sm text-muted-foreground">Regular Client</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="text-yellow-500 fill-current" size={16} />
                      <span className="text-sm font-medium">5.0</span>
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-4">Last ceremony: Griha Pravesh - 2 days ago</p>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <MessageSquare size={16} className="mr-1" />
                      Message
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      Book Again
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Performance Overview */}
        <section className="py-12 bg-card/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-serif text-3xl font-bold text-foreground mb-8">Performance Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-card rounded-xl p-6 border border-border">
                <h3 className="text-xl font-semibold text-foreground mb-4">Earnings This Month</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Total Earnings</span>
                    <span className="text-2xl font-bold text-foreground">₹{thisMonthEarnings}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Total Earnings (All Time)</span>
                    <span className="text-lg font-semibold text-foreground">₹{totalEarnings}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Average per Ceremony</span>
                    <span className="text-lg font-semibold text-foreground">₹2,500</span>
                  </div>
                </div>
              </div>

              <div className="bg-card rounded-xl p-6 border border-border">
                <h3 className="text-xl font-semibold text-foreground mb-4">Service Statistics</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Most Popular Service</span>
                    <span className="text-lg font-semibold text-foreground">Griha Pravesh</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Average Response Time</span>
                    <span className="text-lg font-semibold text-foreground">2 hours</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Repeat Clients</span>
                    <span className="text-lg font-semibold text-foreground">68%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Popular Services */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-serif text-3xl font-bold text-foreground mb-8">Your Popular Services</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: 'Griha Pravesh', icon: '🏠', count: 45, earnings: '₹1,12,500' },
                { name: 'Satyanarayan Pooja', icon: '🙏', count: 38, earnings: '₹95,000' },
                { name: 'Wedding Ceremony', icon: '💑', count: 28, earnings: '₹84,000' },
                { name: 'Baby Naming', icon: '👶', count: 22, earnings: '₹55,000' },
                { name: 'Last Rites', icon: '🕉️', count: 18, earnings: '₹45,000' },
                { name: 'Navagraha Pooja', icon: '🪐', count: 15, earnings: '₹37,500' },
                { name: 'Vastu Shanti', icon: '🏡', count: 12, earnings: '₹30,000' },
                { name: 'Mundan Ceremony', icon: '👦', count: 10, earnings: '₹25,000' }
              ].map((service) => (
                <div key={service.name} className="bg-card rounded-xl p-4 border border-border hover:shadow-lg transition-all cursor-pointer">
                  <div className="text-3xl mb-2">{service.icon}</div>
                  <h3 className="font-semibold text-foreground mb-1">{service.name}</h3>
                  <p className="text-sm text-muted-foreground mb-1">{service.count} ceremonies</p>
                  <p className="text-sm font-medium text-primary">{service.earnings}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  )
}
