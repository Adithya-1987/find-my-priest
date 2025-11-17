'use client'

import { useState, useEffect } from 'react'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Calendar, MapPin, Clock, Edit, Settings, LogOut, Heart, Star, MessageSquare, Bell, X, Check } from 'lucide-react'
import { mockBookings, mockNotifications } from '@/lib/mock-data'
import { useToastNotification } from '@/hooks/use-toast-notification'
import { ConfirmationModal } from '@/components/confirmation-modal'
import { RatingInput } from '@/components/rating-input'
import { Modal } from '@/components/modal'
import Link from 'next/link'
import { useAppContext } from '@/context/app-context'
import { useRouter } from 'next/navigation'

export default function UserDashboardPage() {
  const { currentUser } = useAppContext()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('bookings')
  const [isLoaded, setIsLoaded] = useState(false)
  const [showCancelModal, setShowCancelModal] = useState(false)
  const [showRatingModal, setShowRatingModal] = useState(false)
  const [selectedBooking, setSelectedBooking] = useState<any>(null)
  const [rating, setRating] = useState(0)
  const [reviewText, setReviewText] = useState('')
  const [userNotifications, setUserNotifications] = useState(mockNotifications)
  const toast = useToastNotification()

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const handleCancelBooking = (booking: typeof mockBookings[0]) => {
    setSelectedBooking(booking)
    setShowCancelModal(true)
  }

  const confirmCancelBooking = () => {
    toast.success(`Booking with ${selectedBooking.priestName} has been cancelled`)
    setShowCancelModal(false)
    setSelectedBooking(null)
  }

  const handleRateBooking = (booking: typeof mockBookings[0]) => {
    setSelectedBooking(booking)
    setRating(0)
    setReviewText('')
    setShowRatingModal(true)
  }

  const submitRating = () => {
    if (rating === 0) {
      toast.error('Please select a rating')
      return
    }
    toast.success('Thank you for your rating!')
    setShowRatingModal(false)
    setSelectedBooking(null)
    setRating(0)
    setReviewText('')
  }

  const markNotificationAsRead = (id: string) => {
    setUserNotifications(prev => 
      prev.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    )
  }

  const deleteNotification = (id: string) => {
    setUserNotifications((prev) => prev.filter((n) => n.id !== id))
  }

  const unreadCount = userNotifications.filter((n) => !n.read).length

  const [userBookings, setUserBookings] = useState(mockBookings.filter(b => b.userId === currentUser?.id))
  const [userStats, setUserStats] = useState({
    totalBookings: userBookings.length,
    completedBookings: userBookings.filter(b => b.status === 'completed').length,
    totalSpent: userBookings.reduce((sum, b) => sum + (b.amount || 0), 0),
    averageRating: 4.8
  })

  const upcomingBookings = userBookings.filter((b) => b.status === 'upcoming')
  const completedBookings = userBookings.filter((b) => b.status === 'completed')

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Profile Header */}
          <div className={`bg-card rounded-2xl p-8 border border-border mb-8 flex flex-col sm:flex-row justify-between items-start gap-6 transform transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="flex gap-6 flex-1">
              <div className="w-20 h-20 bg-gradient-to-br from-primary/30 to-accent/20 rounded-xl flex items-center justify-center text-4xl shrink-0">
                👤
              </div>
              <div className="flex-1">
                <h1 className="font-serif text-3xl font-bold text-foreground mb-1">Welcome back, Priya!</h1>
                <p className="text-muted-foreground mb-4">Manage your spiritual ceremonies and bookings</p>
                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-muted-foreground">Verified Account</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={16} className="text-muted-foreground" />
                    <span className="text-muted-foreground">Mumbai, Maharashtra</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar size={16} className="text-muted-foreground" />
                    <span className="text-muted-foreground">Member since 2024</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" size="sm" className="gap-2" asChild>
                <Link href="/customer/profile">
                  <Edit size={16} />
                  Edit Profile
                </Link>
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <Settings size={16} />
                Settings
              </Button>
              <Button variant="outline" size="sm" className="gap-2 text-destructive hover:text-destructive">
                <LogOut size={16} />
                Logout
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className={`bg-card rounded-xl p-6 border border-border transform transition-all duration-1000 delay-100 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Calendar className="text-blue-600" size={24} />
                </div>
                <span className="text-2xl font-bold text-foreground">{userStats.totalBookings}</span>
              </div>
              <h3 className="font-semibold text-foreground">Total Bookings</h3>
              <p className="text-sm text-muted-foreground">All ceremonies booked</p>
            </div>

            <div className={`bg-card rounded-xl p-6 border border-border transform transition-all duration-1000 delay-200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Check className="text-green-600" size={24} />
                </div>
                <span className="text-2xl font-bold text-foreground">{userStats.completedBookings}</span>
              </div>
              <h3 className="font-semibold text-foreground">Completed</h3>
              <p className="text-sm text-muted-foreground">Ceremonies performed</p>
            </div>

            <div className={`bg-card rounded-xl p-6 border border-border transform transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Star className="text-purple-600" size={24} />
                </div>
                <span className="text-2xl font-bold text-foreground">{userStats.averageRating}</span>
              </div>
              <h3 className="font-semibold text-foreground">Average Rating</h3>
              <p className="text-sm text-muted-foreground">Based on {completedBookings.length} reviews</p>
            </div>

            <div className={`bg-card rounded-xl p-6 border border-border transform transition-all duration-1000 delay-400 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center relative">
                  <Bell className="text-orange-600" size={24} />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </div>
                <span className="text-2xl font-bold text-foreground">{unreadCount}</span>
              </div>
              <h3 className="font-semibold text-foreground">New Notifications</h3>
              <p className="text-sm text-muted-foreground">Requires attention</p>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-border mb-6">
            <div className="flex space-x-8">
              <button
                onClick={() => setActiveTab('bookings')}
                className={`pb-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'bookings'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                My Bookings
              </button>
              <button
                onClick={() => setActiveTab('notifications')}
                className={`pb-4 px-1 border-b-2 font-medium text-sm transition-colors relative ${
                  activeTab === 'notifications'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                Notifications
                {unreadCount > 0 && (
                  <span className="ml-2 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Tab Content */}
          {activeTab === 'bookings' && (
            <div className="space-y-6">
              {/* Upcoming Bookings */}
              <div>
                <h2 className="text-xl font-semibold text-foreground mb-4">Upcoming Bookings</h2>
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
                          <Button variant="outline" size="sm" onClick={() => router.push(`/customer/profile`)}>
                            <MessageSquare size={16} className="mr-1" />
                            Message
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="text-destructive hover:text-destructive"
                            onClick={() => handleCancelBooking(booking)}
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Completed Bookings */}
              <div>
                <h2 className="text-xl font-semibold text-foreground mb-4">Completed Bookings</h2>
                <div className="grid gap-4">
                  {completedBookings.map((booking) => (
                    <div key={booking.id} className="bg-card rounded-xl p-6 border border-border hover:shadow-lg transition-all">
                      <div className="flex flex-col sm:flex-row justify-between gap-4">
                        <div className="flex gap-4">
                          <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl flex items-center justify-center text-2xl shrink-0">
                            ✅
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
                          <Button variant="outline" size="sm">
                            Book Again
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleRateBooking(booking)}
                          >
                            Rate & Review
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-4">
              {userNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`bg-card rounded-xl p-6 border transition-all ${
                    notification.read 
                      ? 'border-border opacity-75' 
                      : 'border-primary bg-primary/5'
                  }`}
                >
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex gap-4 flex-1">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                        notification.type === 'booking_confirmation' ? 'bg-blue-100' :
                        notification.type === 'booking_reminder' ? 'bg-orange-100' :
                        notification.type === 'rating_request' ? 'bg-green-100' :
                        'bg-purple-100'
                      }`}>
                        {
                          notification.type === 'booking_confirmation' ? <Calendar className="text-blue-600" size={20} /> :
                          notification.type === 'booking_reminder' ? <Bell className="text-orange-600" size={20} /> :
                          notification.type === 'rating_request' ? <Star className="text-green-600" size={20} /> :
                          <MessageSquare className="text-purple-600" size={20} />
                        }
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground mb-1">{notification.title}</h3>
                        <p className="text-muted-foreground mb-2">{notification.message}</p>
                        <p className="text-xs text-muted-foreground">{notification.timestamp.toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {!notification.read && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => markNotificationAsRead(notification.id)}
                        >
                          Mark as read
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteNotification(notification.id)}
                      >
                        <X size={16} />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Cancel Modal */}
      <ConfirmationModal
        isOpen={showCancelModal}
        onClose={() => setShowCancelModal(false)}
        onConfirm={confirmCancelBooking}
        title="Cancel Booking"
        message="Are you sure you want to cancel this booking?"
        confirmText="Cancel Booking"
      />

      {/* Rating Modal */}
      <Modal
        isOpen={showRatingModal}
        onClose={() => setShowRatingModal(false)}
        title="Rate Your Experience"
      >
        <div className="space-y-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl flex items-center justify-center text-2xl mx-auto mb-4">
              🙏
            </div>
            <h3 className="font-semibold text-foreground mb-1">{selectedBooking?.service}</h3>
            <p className="text-muted-foreground">with {selectedBooking?.priestName}</p>
          </div>

          <div className="space-y-4">
            <div className="mb-6">
              <label className="block text-sm font-medium text-foreground mb-3">Rating</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setRating(star)}
                    className={`text-2xl transition-colors ${
                      star <= rating ? 'text-yellow-500' : 'text-gray-300'
                    }`}
                  >
                    ⭐
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Your Review (Optional)</label>
              <textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="Share your experience..."
                className="w-full p-3 border border-border rounded-lg resize-none h-24 bg-card text-foreground placeholder-muted-foreground"
              />
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => setShowRatingModal(false)}
            >
              Cancel
            </Button>
            <Button
              className="flex-1"
              onClick={submitRating}
            >
              Submit Review
            </Button>
          </div>
        </div>
      </Modal>

      <Footer />
    </div>
  )
}
