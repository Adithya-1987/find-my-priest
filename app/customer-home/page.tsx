'use client'

import { useState, useEffect } from 'react'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Calendar, MapPin, Clock, Heart, Star, MessageSquare, Search, Filter, ChevronRight, TrendingUp, Users, Award, Check } from 'lucide-react'
import { useAppContext } from '@/context/app-context'
import { useRouter } from 'next/navigation'
import { mockBookings, mockNotifications } from '@/lib/mock-data'

export default function CustomerHomePage() {
  const { currentUser } = useAppContext()
  const router = useRouter()
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const handleSearchPriests = () => {
    router.push('/search')
  }

  const handleViewBookings = () => {
    router.push('/dashboard')
  }

  const upcomingBookings = mockBookings.filter((b) => b.status === 'upcoming').slice(0, 3)
  const unreadNotifications = mockNotifications.filter((n) => !n.read).length

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 bg-background">
        {/* Welcome Header */}
        <section className="bg-gradient-to-br from-primary/10 to-accent/10 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div>
                <h1 className="font-serif text-4xl font-bold text-foreground mb-2">
                  Welcome back, {currentUser?.name || 'Priya'}! 👋
                </h1>
                <p className="text-xl text-muted-foreground">
                  Find your perfect priest for meaningful ceremonies
                </p>
              </div>
              <div className="flex gap-3">
                <Button 
                  onClick={handleSearchPriests}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  <Search size={20} className="mr-2" />
                  Search Priests
                </Button>
                <Button 
                  onClick={handleViewBookings}
                  variant="outline"
                >
                  <Calendar size={20} className="mr-2" />
                  My Bookings
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
                <h3 className="font-semibold text-foreground">Upcoming Bookings</h3>
                <p className="text-sm text-muted-foreground">Next ceremony in 2 days</p>
              </div>

              <div className={`bg-card rounded-xl p-6 border border-border transform transition-all duration-700 delay-100 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Check className="text-green-600" size={24} />
                  </div>
                  <span className="text-2xl font-bold text-foreground">8</span>
                </div>
                <h3 className="font-semibold text-foreground">Completed</h3>
                <p className="text-sm text-muted-foreground">Ceremonies performed</p>
              </div>

              <div className={`bg-card rounded-xl p-6 border border-border transform transition-all duration-700 delay-200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Star className="text-purple-600" size={24} />
                  </div>
                  <span className="text-2xl font-bold text-foreground">4.9</span>
                </div>
                <h3 className="font-semibold text-foreground">Your Rating</h3>
                <p className="text-sm text-muted-foreground">Based on reviews</p>
              </div>

              <div className={`bg-card rounded-xl p-6 border border-border transform transition-all duration-700 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center relative">
                    <MessageSquare className="text-orange-600" size={24} />
                    {unreadNotifications > 0 && (
                      <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                        {unreadNotifications}
                      </span>
                    )}
                  </div>
                  <span className="text-2xl font-bold text-foreground">{unreadNotifications}</span>
                </div>
                <h3 className="font-semibold text-foreground">New Messages</h3>
                <p className="text-sm text-muted-foreground">From priests</p>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Actions */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-serif text-3xl font-bold text-foreground mb-8">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-card rounded-xl p-6 border border-border hover:shadow-lg transition-all cursor-pointer" onClick={handleSearchPriests}>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Search className="text-primary" size={24} />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Find Priests</h3>
                <p className="text-muted-foreground mb-4">Browse verified priests in your area</p>
                <Button variant="outline" className="w-full">
                  Browse Now
                  <ChevronRight size={16} className="ml-2" />
                </Button>
              </div>

              <div className="bg-card rounded-xl p-6 border border-border hover:shadow-lg transition-all cursor-pointer" onClick={handleViewBookings}>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Calendar className="text-blue-600" size={24} />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">My Bookings</h3>
                <p className="text-muted-foreground mb-4">View and manage your ceremonies</p>
                <Button variant="outline" className="w-full">
                  View Bookings
                  <ChevronRight size={16} className="ml-2" />
                </Button>
              </div>

              <div className="bg-card rounded-xl p-6 border border-border hover:shadow-lg transition-all cursor-pointer">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Users className="text-green-600" size={24} />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Popular Ceremonies</h3>
                <p className="text-muted-foreground mb-4">Trending ceremonies this month</p>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => {
                    const element = document.getElementById('popular-ceremonies-section')
                    element?.scrollIntoView({ behavior: 'smooth' })
                  }}
                >
                  Explore
                  <ChevronRight size={16} className="ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Recent Bookings */}
        {upcomingBookings.length > 0 && (
          <section className="py-12 bg-card/30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center mb-8">
                <h2 className="font-serif text-3xl font-bold text-foreground">Upcoming Bookings</h2>
                <Button variant="outline" onClick={handleViewBookings}>
                  View All
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
                          <p className="text-muted-foreground mb-2">with {booking.priestName}</p>
                          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Calendar size={16} />
                              {booking.date}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock size={16} />
                              {booking.time}
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin size={16} />
                              {booking.location}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => router.push('/customer/profile')}>
                          <MessageSquare size={16} className="mr-1" />
                          Message
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => router.push(`/dashboard?booking=${booking.id}`)}>
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Recommended Priests */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-8">
              <h2 className="font-serif text-3xl font-bold text-foreground">Recommended for You</h2>
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
                      🧘‍♂️
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground">Pandit Rajesh Kumar</h3>
                      <p className="text-sm text-muted-foreground">Vedic Specialist</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="text-yellow-500 fill-current" size={16} />
                      <span className="text-sm font-medium">4.9</span>
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-4">Expert in traditional Hindu ceremonies with 15+ years of experience</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">Havans</span>
                    <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">Weddings</span>
                    <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">Poojas</span>
                  </div>
                  <Button className="w-full">
                    Book Now
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Popular Ceremonies */}
        <section id="popular-ceremonies-section" className="py-12 bg-card/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-serif text-3xl font-bold text-foreground mb-8">Popular Ceremonies</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {(() => {
                // Calculate trending ceremonies from mockBookings for current month
                const currentMonth = new Date().getMonth()
                const ceremonyCounts = mockBookings
                  .filter((b: any) => new Date(b.date).getMonth() === currentMonth)
                  .reduce((acc: Record<string, number>, booking: any) => {
                    acc[booking.service] = (acc[booking.service] || 0) + 1
                    return acc
                  }, {} as Record<string, number>)
                
                // Define ceremony icons
                const ceremonyIcons: Record<string, string> = {
                  'Griha Pravesh': '🏠',
                  'Satyanarayan Puja': '🙏',
                  'Wedding Ceremony': '💑',
                  'Baby Naming': '👶',
                  'Last Rites': '🕉️',
                  'Navagraha Puja': '🪐',
                  'Vastu Shanti': '🏡',
                  'Mundan Ceremony': '👦',
                  'Janeu Ceremony': '🧵',
                  'Rudrabhishek': '🔱'
                }
                
                // Get all unique ceremonies and sort by count
                const allCeremonies = Object.entries(ceremonyCounts)
                  .sort(([, a]: [string, number], [, b]: [string, number]) => b - a)
                  .slice(0, 8)
                
                // If no ceremonies this month, show default popular ones
                if (allCeremonies.length === 0) {
                  return [
                    { name: 'Griha Pravesh', count: 234 },
                    { name: 'Satyanarayan Puja', count: 189 },
                    { name: 'Wedding Ceremony', count: 156 },
                    { name: 'Baby Naming', count: 98 },
                    { name: 'Last Rites', count: 76 },
                    { name: 'Navagraha Puja', count: 65 },
                    { name: 'Vastu Shanti', count: 54 },
                    { name: 'Mundan Ceremony', count: 43 }
                  ].map(ceremony => ({
                    ...ceremony,
                    icon: ceremonyIcons[ceremony.name] || '🙏'
                  }))
                }
                
                return allCeremonies.map(([name, count]) => ({
                  name,
                  count,
                  icon: ceremonyIcons[name] || '🙏'
                }))
              })().map((ceremony) => (
                <div key={ceremony.name} className="bg-card rounded-xl p-4 border border-border hover:shadow-lg transition-all cursor-pointer">
                  <div className="text-3xl mb-2">{ceremony.icon}</div>
                  <h3 className="font-semibold text-foreground mb-1">{ceremony.name}</h3>
                  <p className="text-sm text-muted-foreground">{ceremony.count} bookings this month</p>
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
