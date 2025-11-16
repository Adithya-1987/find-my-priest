'use client'

import { useState, useEffect, useMemo } from 'react'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Calendar, Clock, Users, MapPin, CheckCircle, Clock4, Edit, Eye, TrendingUp, X, Check, Trash2, Plus } from 'lucide-react'
import { mockBookings } from '@/lib/mock-data'
import { useToastNotification } from '@/hooks/use-toast-notification'
import { ConfirmationModal } from '@/components/confirmation-modal'
import { Modal } from '@/components/modal'
import Link from 'next/link'

const priestData = {
  name: 'Pandit Rajesh Kumar',
  specialty: 'Vedic Rituals',
  rating: 4.9,
  reviews: 127,
  experience: 15,
  totalEarnings: 525000,
  monthlyEarnings: 45000,
  services: [
    { id: 1, name: 'Griha Pravesh', price: 500, enabled: true },
    { id: 2, name: 'Vivah Samskara', price: 700, enabled: true },
    { id: 3, name: 'Satyanarayan Katha', price: 450, enabled: true },
    { id: 4, name: 'Mundan', price: 400, enabled: false },
  ],
  languages: ['Hindi', 'Sanskrit', 'English'],
  availability: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
}

// Note: Avoid non-deterministic values on initial render to prevent hydration issues

export default function PriestDashboardPage() {
  const [activeTab, setActiveTab] = useState('bookings')
  const [isLoaded, setIsLoaded] = useState(false)
  const [showAcceptModal, setShowAcceptModal] = useState(false)
  const [showRejectModal, setShowRejectModal] = useState(false)
  const [showServiceModal, setShowServiceModal] = useState(false)
  const [selectedBooking, setSelectedBooking] = useState<any>(null)
  const [bookingRequests, setBookingRequests] = useState(mockBookings.filter(b => b.status === 'pending'))
  const [acceptedBookings, setAcceptedBookings] = useState(mockBookings.filter(b => b.status === 'upcoming'))
  type DayItem = { date: Date; bookings: number }
  const calendarDays: DayItem[] = useMemo(() => {
    const length = 30
    const days: DayItem[] = []
    for (let i = 0; i < length; i++) {
      const date = new Date(2025, 10, i + 1)
      const key = date.toISOString().slice(0, 10) // YYYY-MM-DD
      const count = acceptedBookings.reduce((acc, b) => (b.date === key ? acc + 1 : acc), 0)
      days.push({ date, bookings: count })
    }
    return days
  }, [acceptedBookings])
  const [newServiceName, setNewServiceName] = useState('')
  const [newServicePrice, setNewServicePrice] = useState('')
  const toast = useToastNotification()

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const handleAcceptBooking = (booking: any) => {
    setSelectedBooking(booking)
    setShowAcceptModal(true)
  }

  const confirmAcceptBooking = () => {
    setBookingRequests((prev) => prev.filter((b) => b.id !== selectedBooking.id))
    setAcceptedBookings((prev) => [...prev, { ...selectedBooking, status: 'upcoming' }])
    toast.success(`Booking from ${selectedBooking.userName} accepted!`)
    setShowAcceptModal(false)
    setSelectedBooking(null)
  }

  const handleRejectBooking = (booking: any) => {
    setSelectedBooking(booking)
    setShowRejectModal(true)
  }

  const confirmRejectBooking = () => {
    setBookingRequests((prev) => prev.filter((b) => b.id !== selectedBooking.id))
    toast.info(`Booking from ${selectedBooking.userName} rejected`)
    setShowRejectModal(false)
    setSelectedBooking(null)
  }

  const handleAddService = () => {
    if (!newServiceName.trim() || !newServicePrice.trim()) {
      toast.error('Please fill in all fields')
      return
    }
    toast.success(`Service "${newServiceName}" added successfully!`)
    setNewServiceName('')
    setNewServicePrice('')
    setShowServiceModal(false)
  }

  const upcomingCount = acceptedBookings.length
  const pendingCount = bookingRequests.length

  return (
    <div className="min-h-screen flex flex-col">

      <div className="flex-1 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Profile Header */}
          <div className={`bg-card rounded-2xl p-8 border border-border mb-8 flex flex-col sm:flex-row justify-between items-start gap-6 transform transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="flex gap-6 flex-1">
              <div className="w-20 h-20 bg-gradient-to-br from-primary/30 to-accent/20 rounded-xl flex items-center justify-center text-4xl shrink-0">
                👨‍🙏
              </div>
              <div className="flex-1">
                <h1 className="font-serif text-3xl font-bold text-foreground mb-1">{priestData.name}</h1>
                <p className="text-muted-foreground text-sm mb-2">{priestData.specialty}</p>
                <div className="flex flex-wrap gap-3 text-sm">
                  <span className="flex items-center gap-1 text-primary font-semibold">
                    ★ {priestData.rating} ({priestData.reviews} reviews)
                  </span>
                  <span className="text-muted-foreground">{priestData.experience}+ years experience</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2 w-full sm:w-auto flex-wrap sm:flex-nowrap">
              <Button variant="outline" size="sm" className="flex gap-2 text-xs sm:text-sm rounded-lg" asChild>
                <Link href="/priest/profile">
                  <Edit size={16} /> Edit Profile
                </Link>
              </Button>
              <Button variant="outline" size="sm" className="flex gap-2 text-xs sm:text-sm rounded-lg" asChild>
                <Link href="/priest/[id]" as="/priest/1">
                  <Eye size={16} /> View Public
                </Link>
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
            {[
              { label: 'Total Bookings', value: mockBookings.length, color: 'text-primary', icon: CheckCircle },
              { label: 'Pending', value: pendingCount, color: 'text-yellow-600', icon: Clock4, badge: true },
              { label: 'Upcoming', value: upcomingCount, color: 'text-accent', icon: Calendar },
              { label: 'This Month', value: `₹${priestData.monthlyEarnings.toLocaleString()}`, color: 'text-green-600', icon: TrendingUp },
              { label: 'Total Earnings', value: `₹${priestData.totalEarnings.toLocaleString()}`, color: 'text-primary', icon: TrendingUp },
            ].map((stat, idx) => {
              const Icon = stat.icon
              return (
                <div
                  key={stat.label}
                  className={`bg-card rounded-xl p-5 border border-border hover:shadow-md hover:border-primary/30 transition-all duration-300 transform ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                  style={{ transitionDelay: `${idx * 100}ms` }}
                >
                  <div className="flex items-start justify-between mb-2">
                    <p className="text-muted-foreground text-xs font-medium">{stat.label}</p>
                    <Icon size={16} className={stat.color} />
                  </div>
                  <p className={`font-serif text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                  {stat.badge && stat.value > 0 && (
                    <div className="mt-2 text-xs text-yellow-600 font-semibold">Review pending</div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Tabs */}
          <div className={`flex gap-2 mb-8 border-b border-border overflow-x-auto transform transition-all duration-1000 delay-200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <Link href="/priest/bookings" className="flex items-center gap-2 pb-3 px-4 font-semibold text-sm capitalize border-b-2 transition-all whitespace-nowrap border-transparent text-muted-foreground hover:text-foreground">
              Booking Requests
              {pendingCount > 0 && (
                <span className="ml-1 bg-yellow-500 text-white text-xs px-2 py-0.5 rounded-full font-bold">{pendingCount}</span>
              )}
            </Link>
            <Link href="/priest/calendar" className="flex items-center gap-2 pb-3 px-4 font-semibold text-sm capitalize border-b-2 transition-all whitespace-nowrap border-transparent text-muted-foreground hover:text-foreground">
              Calendar
            </Link>
            <Link href="/priest/profile" className="flex items-center gap-2 pb-3 px-4 font-semibold text-sm capitalize border-b-2 transition-all whitespace-nowrap border-transparent text-muted-foreground hover:text-foreground">
              Profile
            </Link>
            <Link href="/priest/notifications" className="flex items-center gap-2 pb-3 px-4 font-semibold text-sm capitalize border-b-2 transition-all whitespace-nowrap border-transparent text-muted-foreground hover:text-foreground">
              Notifications
            </Link>
          </div>

          {/* Bookings Tab */}
          {activeTab === 'bookings' && (
            <div className="space-y-4 animate-fade-in">
              <div className="mb-6">
                <h3 className="font-semibold text-foreground mb-3 text-sm">Pending Requests ({pendingCount})</h3>
                {bookingRequests.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <Clock size={48} className="mx-auto mb-3 opacity-30" />
                    <p>No pending booking requests</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {bookingRequests.map((booking) => (
                      <div
                        key={booking.id}
                        className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 hover:shadow-md transition-all duration-300 animate-slide-in-left"
                      >
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-3 items-start">
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">Customer</p>
                            <p className="font-semibold text-foreground text-sm">{booking.userName}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">Service</p>
                            <p className="font-semibold text-foreground text-sm">{booking.service}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
                              <Calendar size={12} /> Date
                            </p>
                            <p className="font-semibold text-foreground text-sm">{booking.date}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
                              <Clock size={12} /> Time
                            </p>
                            <p className="font-semibold text-foreground text-sm">{booking.time}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">Amount</p>
                            <p className="font-semibold text-foreground text-sm text-primary">₹{booking.amount}</p>
                          </div>
                          <div className="col-span-2 flex gap-2 justify-end">
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-xs rounded-lg border-destructive text-destructive hover:bg-destructive/10"
                              onClick={() => handleRejectBooking(booking)}
                            >
                              <X size={14} /> Reject
                            </Button>
                            <Button
                              size="sm"
                              className="text-xs bg-green-600 hover:bg-green-700 text-white rounded-lg"
                              onClick={() => handleAcceptBooking(booking)}
                            >
                              <Check size={14} /> Accept
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <h3 className="font-semibold text-foreground mb-3 text-sm">Accepted Bookings ({upcomingCount})</h3>
                {acceptedBookings.length === 0 ? (
                  <p className="text-xs text-muted-foreground">No accepted bookings yet</p>
                ) : (
                  <div className="space-y-3">
                    {acceptedBookings.map((booking) => (
                      <div
                        key={booking.id}
                        className="bg-card border border-border rounded-xl p-4 hover:border-primary/30 hover:shadow-md transition-all duration-300 animate-fade-in"
                      >
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-3 items-center">
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">Customer</p>
                            <p className="font-semibold text-foreground text-sm">{booking.userName}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">Service</p>
                            <p className="font-semibold text-foreground text-sm">{booking.service}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
                              <Calendar size={12} /> Date
                            </p>
                            <p className="font-semibold text-foreground text-sm">{booking.date}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
                              <Clock size={12} /> Time
                            </p>
                            <p className="font-semibold text-foreground text-sm">{booking.time}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">Amount</p>
                            <p className="font-semibold text-foreground text-sm text-primary">₹{booking.amount}</p>
                          </div>
                          <div>
                            <span className="inline-flex items-center gap-1 text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-semibold">
                              <CheckCircle size={12} /> Accepted
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Calendar Tab */}
          {activeTab === 'calendar' && (
            <div className="animate-fade-in">
              <div className="bg-card rounded-xl p-6 border border-border">
                <h3 className="font-semibold text-foreground mb-6 text-sm">November 2025 - Bookings</h3>
                <div className="grid grid-cols-7 gap-2">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                    <div key={day} className="text-center text-xs font-semibold text-muted-foreground py-2">
                      {day}
                    </div>
                  ))}
                  {calendarDays.map((day, idx) => (
                    <div
                      key={idx}
                      className={`aspect-square rounded-lg border-2 flex flex-col items-center justify-center text-xs font-semibold transition-all hover:shadow-md ${
                        day.bookings > 0
                          ? 'bg-primary/10 border-primary text-primary'
                          : 'bg-background border-border text-muted-foreground'
                      }`}
                    >
                      <span className="text-xs">{day.date.getDate()}</span>
                      {day.bookings > 0 && <span className="text-xs font-bold text-primary mt-0.5">{day.bookings}</span>}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Services Tab */}
          {activeTab === 'services' && (
            <div className="animate-fade-in space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="font-serif text-2xl font-bold text-foreground">Your Services</h2>
                <Button
                  className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg gap-2 text-sm"
                  onClick={() => setShowServiceModal(true)}
                >
                  <Plus size={16} /> Add Service
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {priestData.services.map((service) => (
                  <div
                    key={service.id}
                    className={`rounded-xl p-4 border-2 transition-all hover:shadow-md ${
                      service.enabled
                        ? 'bg-card border-primary/30'
                        : 'bg-muted border-border opacity-50'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold text-foreground">{service.name}</h3>
                        <p className="text-sm text-primary font-bold">₹{service.price}</p>
                      </div>
                      <div className="flex gap-1">
                        <Button size="sm" variant="outline" className="text-xs rounded-lg">
                          <Edit size={14} />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-xs rounded-lg border-destructive text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 size={14} />
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                        service.enabled
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}>
                        {service.enabled ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Earnings Tab */}
          {activeTab === 'earnings' && (
            <div className="animate-fade-in grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl p-6 border border-primary/20">
                <p className="text-muted-foreground text-sm mb-2">This Month</p>
                <p className="font-serif text-4xl font-bold text-primary mb-4">₹{priestData.monthlyEarnings.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">{acceptedBookings.length} bookings completed</p>
              </div>
              <div className="bg-gradient-to-br from-accent/20 to-primary/20 rounded-xl p-6 border border-accent/20">
                <p className="text-muted-foreground text-sm mb-2">Total Earnings</p>
                <p className="font-serif text-4xl font-bold text-accent mb-4">₹{priestData.totalEarnings.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">Since joining in January 2023</p>
              </div>
            </div>
          )}

          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="animate-fade-in max-w-2xl">
              <div className="bg-card rounded-xl p-6 border border-border space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Bio</label>
                  <textarea
                    defaultValue="With over 15 years of experience in Vedic rituals and ceremonies, I provide authentic and meaningful spiritual services."
                    className="w-full bg-input border border-border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-primary text-foreground text-sm resize-none"
                    rows={4}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Hourly Rate (₹)</label>
                  <input
                    type="number"
                    defaultValue="500"
                    className="w-full bg-input border border-border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-primary text-foreground text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-3">Languages</label>
                  <div className="flex flex-wrap gap-2">
                    {priestData.languages.map((lang) => (
                      <span key={lang} className="bg-primary/10 border border-primary/30 rounded-full px-3 py-1.5 text-xs font-medium text-foreground flex items-center gap-2">
                        {lang}
                        <X size={12} className="cursor-pointer" />
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg" onClick={() => toast.success('Profile updated')}>
                    Save Changes
                  </Button>
                  <Button variant="outline" className="rounded-lg">
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Accept Booking Modal */}
      <ConfirmationModal
        isOpen={showAcceptModal}
        title="Accept Booking?"
        message={`Accept booking request from ${selectedBooking?.userName} for ${selectedBooking?.service} on ${selectedBooking?.date} at ${selectedBooking?.time}? You will receive ₹${selectedBooking?.amount}.`}
        confirmText="Accept Booking"
        confirmVariant="default"
        onConfirm={confirmAcceptBooking}
        onClose={() => setShowAcceptModal(false)}
      />

      {/* Reject Booking Modal */}
      <ConfirmationModal
        isOpen={showRejectModal}
        title="Reject Booking?"
        message={`Are you sure you want to reject the booking request from ${selectedBooking?.userName}? This action cannot be undone.`}
        confirmText="Reject Booking"
        confirmVariant="destructive"
        onConfirm={confirmRejectBooking}
        onClose={() => setShowRejectModal(false)}
      />

      {/* Add Service Modal */}
      <Modal
        isOpen={showServiceModal}
        title="Add New Service"
        onClose={() => setShowServiceModal(false)}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Service Name</label>
            <input
              type="text"
              value={newServiceName}
              onChange={(e) => setNewServiceName(e.target.value)}
              placeholder="e.g., Griha Pravesh"
              className="w-full bg-input border border-border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-primary text-foreground text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Price (₹)</label>
            <input
              type="number"
              value={newServicePrice}
              onChange={(e) => setNewServicePrice(e.target.value)}
              placeholder="500"
              className="w-full bg-input border border-border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-primary text-foreground text-sm"
            />
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => setShowServiceModal(false)}
              className="flex-1 rounded-lg"
            >
              Cancel
            </Button>
            <Button
              onClick={handleAddService}
              className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg"
            >
              Add Service
            </Button>
          </div>
        </div>
      </Modal>

      <Footer />
    </div>
  )
}
