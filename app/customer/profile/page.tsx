'use client'

import { useState, useEffect } from 'react'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Calendar, MapPin, Phone, Mail, User, Upload, Save, ArrowLeft, Edit2, Camera, MessageSquare, Star } from 'lucide-react'
import { useAppContext } from '@/context/app-context'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { mockBookings } from '@/lib/mock-data'

export default function CustomerProfilePage() {
  const { currentUser } = useAppContext()
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [selectedPriest, setSelectedPriest] = useState<string | null>(null)
  const [messageText, setMessageText] = useState('')
  const [messages, setMessages] = useState<{text: string, sender: 'customer' | 'priest', time: string}[]>([])
  
  // User bookings data
  const [userBookings, setUserBookings] = useState(mockBookings.filter(b => b.userId === currentUser?.id))
  const [userStats, setUserStats] = useState({
    totalBookings: userBookings.length,
    upcomingBookings: userBookings.filter(b => b.status === 'upcoming').length,
    completedBookings: userBookings.filter(b => b.status === 'completed').length,
    averageRating: 4.8,
    totalSpent: userBookings.reduce((sum, b) => sum + (b.amount || 0), 0)
  })

  // Form state
  const [formData, setFormData] = useState({
    name: currentUser?.name || '',
    email: 'priya.sharma@example.com',
    phone: '+91 98765 43210',
    location: 'Mumbai, Maharashtra',
    bio: 'Devotee seeking traditional Hindu ceremonies for important life events.',
    preferences: ['Traditional', 'Vedic', 'Sanskrit'],
    emergencyContact: '+91 98765 43211'
  })

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const handleSave = () => {
    setIsEditing(false)
    // Here you would typically save the data to your backend
    console.log('Saving profile data:', formData)
  }

  const handleCancel = () => {
    setIsEditing(false)
    // Reset form data to original values
    setFormData({
      name: currentUser?.name || '',
      email: 'priya.sharma@example.com',
      phone: '+91 98765 43210',
      location: 'Mumbai, Maharashtra',
      bio: 'Devotee seeking traditional Hindu ceremonies for important life events.',
      preferences: ['Traditional', 'Vedic', 'Sanskrit'],
      emergencyContact: '+91 98765 43211'
    })
  }

  const handleMessagePriest = (priestName: string) => {
    setSelectedPriest(priestName)
    // Initialize with some sample messages
    setMessages([
      { text: `Hello ${priestName}, I have a question about the upcoming ceremony`, sender: 'customer', time: '10:00 AM' },
      { text: `Hello! I'd be happy to help you. What would you like to know?`, sender: 'priest', time: '10:02 AM' }
    ])
  }

  const sendMessage = () => {
    if (messageText.trim() && selectedPriest) {
      setMessages([...messages, {
        text: messageText,
        sender: 'customer',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }])
      setMessageText('')
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 bg-background">
        {/* Header */}
        <section className="bg-gradient-to-br from-primary/10 to-accent/10 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-4 mb-6">
              <Link href="/dashboard">
                <Button variant="outline" size="sm" className="gap-2">
                  <ArrowLeft size={16} />
                  Back to Dashboard
                </Button>
              </Link>
            </div>
            <h1 className="font-serif text-4xl font-bold text-foreground mb-2">
              My Profile
            </h1>
            <p className="text-xl text-muted-foreground">
              Manage your personal information and preferences
            </p>
          </div>
        </section>

        {/* Profile Content */}
        <section className="py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8">
              {/* Profile Card */}
              <Card className="border-border">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="font-serif text-2xl">Personal Information</CardTitle>
                  <Button
                    variant="outline"
                    onClick={() => setIsEditing(!isEditing)}
                    className="gap-2"
                  >
                    {isEditing ? (
                      <>
                        <ArrowLeft size={16} />
                        Cancel
                      </>
                    ) : (
                      <>
                        <Edit2 size={16} />
                        Edit Profile
                      </>
                    )}
                  </Button>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Profile Picture */}
                  <div className="flex items-center gap-6">
                    <div className="relative">
                      <div className="w-24 h-24 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center text-3xl">
                        👤
                      </div>
                      {isEditing && (
                        <Button
                          size="sm"
                          className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0"
                        >
                          <Camera size={16} />
                        </Button>
                      )}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-foreground">{formData.name}</h3>
                      <p className="text-muted-foreground">Member since 2024</p>
                    </div>
                  </div>

                  {/* Form Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      {isEditing ? (
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                      ) : (
                        <div className="flex items-center gap-2 text-foreground">
                          <User size={16} className="text-muted-foreground" />
                          {formData.name}
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      {isEditing ? (
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                      ) : (
                        <div className="flex items-center gap-2 text-foreground">
                          <Mail size={16} className="text-muted-foreground" />
                          {formData.email}
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      {isEditing ? (
                        <Input
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                      ) : (
                        <div className="flex items-center gap-2 text-foreground">
                          <Phone size={16} className="text-muted-foreground" />
                          {formData.phone}
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      {isEditing ? (
                        <Input
                          id="location"
                          value={formData.location}
                          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        />
                      ) : (
                        <div className="flex items-center gap-2 text-foreground">
                          <MapPin size={16} className="text-muted-foreground" />
                          {formData.location}
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="emergency">Emergency Contact</Label>
                      {isEditing ? (
                        <Input
                          id="emergency"
                          value={formData.emergencyContact}
                          onChange={(e) => setFormData({ ...formData, emergencyContact: e.target.value })}
                        />
                      ) : (
                        <div className="flex items-center gap-2 text-foreground">
                          <Phone size={16} className="text-muted-foreground" />
                          {formData.emergencyContact}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Bio */}
                  <div className="space-y-2">
                    <Label htmlFor="bio">About Me</Label>
                    {isEditing ? (
                      <Textarea
                        id="bio"
                        value={formData.bio}
                        onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                        rows={3}
                      />
                    ) : (
                      <p className="text-foreground">{formData.bio}</p>
                    )}
                  </div>

                  {/* Ceremony Preferences */}
                  <div className="space-y-2">
                    <Label>Ceremony Preferences</Label>
                    {isEditing ? (
                      <div className="flex flex-wrap gap-2">
                        {['Traditional', 'Vedic', 'Sanskrit', 'Modern', 'Simple', 'Elaborate'].map((pref) => (
                          <Button
                            key={pref}
                            variant={formData.preferences.includes(pref) ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => {
                              if (formData.preferences.includes(pref)) {
                                setFormData({
                                  ...formData,
                                  preferences: formData.preferences.filter((p) => p !== pref)
                                })
                              } else {
                                setFormData({
                                  ...formData,
                                  preferences: [...formData.preferences, pref]
                                })
                              }
                            }}
                          >
                            {pref}
                          </Button>
                        ))}
                      </div>
                    ) : (
                      <div className="flex flex-wrap gap-2">
                        {formData.preferences.map((pref) => (
                          <span
                            key={pref}
                            className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                          >
                            {pref}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  {isEditing && (
                    <div className="flex gap-3 pt-4">
                      <Button onClick={handleSave} className="gap-2">
                        <Save size={16} />
                        Save Changes
                      </Button>
                      <Button variant="outline" onClick={handleCancel}>
                        Cancel
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Statistics Card */}
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="font-serif text-2xl">My Statistics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary mb-2">{userStats.totalBookings}</div>
                      <div className="text-sm text-muted-foreground">Total Bookings</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary mb-2">{userStats.upcomingBookings}</div>
                      <div className="text-sm text-muted-foreground">Upcoming</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary mb-2">{userStats.completedBookings}</div>
                      <div className="text-sm text-muted-foreground">Completed</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary mb-2">{userStats.averageRating}</div>
                      <div className="text-sm text-muted-foreground">Avg Rating</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Message Priest */}
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="font-serif text-2xl">Message Your Priest</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { name: 'Pandit Rajesh Kumar', specialty: 'Griha Pravesh', status: 'Available' },
                      { name: 'Pandit Suresh Sharma', specialty: 'Satyanarayan Pooja', status: 'Available' },
                      { name: 'Pandit Mahesh Joshi', specialty: 'Wedding Ceremonies', status: 'Busy' }
                    ].map((priest, index) => (
                      <div key={index} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center text-lg">
                            🙏
                          </div>
                          <div>
                            <p className="font-medium text-foreground">{priest.name}</p>
                            <p className="text-sm text-muted-foreground">{priest.specialty} • {priest.status}</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" onClick={() => handleMessagePriest(priest.name)}>
                          <MessageSquare size={16} className="mr-1" />
                          Message
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="font-serif text-2xl">Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {userBookings.slice(0, 5).map((booking, index) => (
                      <div key={booking.id} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                        <div>
                          <p className="font-medium text-foreground">
                            {booking.status === 'upcoming' ? 'Booked' : 'Completed'} {booking.service}
                          </p>
                          <p className="text-sm text-muted-foreground">with {booking.priestName}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-muted-foreground">
                            {new Date(booking.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                          </div>
                          {booking.rating && (
                            <div className="flex items-center gap-1 mt-1">
                              <Star size={12} className="text-yellow-500 fill-current" />
                              <span className="text-xs text-muted-foreground">{booking.rating}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </div>

      {/* Chat Modal */}
      {selectedPriest && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-background rounded-xl w-full max-w-md max-h-[600px] flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                  <MessageSquare size={20} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">{selectedPriest}</h3>
                  <p className="text-sm text-muted-foreground">Online</p>
                </div>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setSelectedPriest(null)}>
                ✕
              </Button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((msg, index) => (
                <div key={index} className={`flex ${msg.sender === 'customer' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] rounded-lg p-3 ${
                    msg.sender === 'customer' 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-muted'
                  }`}>
                    <p className="text-sm">{msg.text}</p>
                    <p className={`text-xs mt-1 ${
                      msg.sender === 'customer' ? 'text-primary-foreground/70' : 'text-muted-foreground'
                    }`}>
                      {msg.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="p-4 border-t">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder="Type your message..."
                  className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <Button onClick={sendMessage} size="sm">
                  Send
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}
