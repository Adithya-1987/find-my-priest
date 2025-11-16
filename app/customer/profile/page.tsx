'use client'

import { useState, useEffect } from 'react'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Calendar, MapPin, Phone, Mail, User, Upload, Save, ArrowLeft, Edit2, Camera } from 'lucide-react'
import { useAppContext } from '@/context/app-context'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function CustomerProfilePage() {
  const { currentUser } = useAppContext()
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

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
                      <div className="text-3xl font-bold text-primary mb-2">12</div>
                      <div className="text-sm text-muted-foreground">Total Bookings</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary mb-2">3</div>
                      <div className="text-sm text-muted-foreground">Upcoming</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary mb-2">9</div>
                      <div className="text-sm text-muted-foreground">Completed</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary mb-2">4.8</div>
                      <div className="text-sm text-muted-foreground">Avg Rating</div>
                    </div>
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
                    {[
                      { action: 'Booked Griha Pravesh', date: '2 days ago', priest: 'Pandit Rajesh Kumar' },
                      { action: 'Completed Satyanarayan Pooja', date: '1 week ago', priest: 'Pandit Suresh Sharma' },
                      { action: 'Reviewed Wedding Ceremony', date: '2 weeks ago', priest: 'Pandit Mahesh Joshi' }
                    ].map((activity, index) => (
                      <div key={index} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                        <div>
                          <p className="font-medium text-foreground">{activity.action}</p>
                          <p className="text-sm text-muted-foreground">with {activity.priest}</p>
                        </div>
                        <div className="text-sm text-muted-foreground">{activity.date}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  )
}
