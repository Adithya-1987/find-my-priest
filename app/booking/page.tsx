'use client'

import { useState, useEffect } from 'react'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Calendar, Clock, MapPin, Users, Check, AlertCircle } from 'lucide-react'
import { useAppContext } from '@/context/app-context'
import { useRouter, useSearchParams } from 'next/navigation'
import { mockServices, mockPriests } from '@/lib/mock-data'

export default function BookingPage() {
  const { currentUser } = useAppContext()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [step, setStep] = useState(1)
  const [selectedService, setSelectedService] = useState<any>(null)
  const [selectedPriest, setSelectedPriest] = useState<any>(null)
  const [bookingSuccess, setBookingSuccess] = useState(false)
  const [formData, setFormData] = useState({
    priestId: '',
    priestName: '',
    service: '',
    date: '',
    time: '',
    location: '',
    guests: '1',
    specialRequests: '',
    amount: 0
  })

  useEffect(() => {
    // Get service from URL params if coming from services page
    const serviceName = searchParams.get('service')
    if (serviceName) {
      const service = mockServices.find(s => s.name === serviceName)
      if (service) {
        setSelectedService(service)
        setFormData(prev => ({ 
          ...prev, 
          service: service.name,
          amount: 500 // Default price since mockServices doesn't have price
        }))
      }
    }

    // Get priest from URL params if coming from priest card
    const priestName = searchParams.get('priest')
    const priestSpecialty = searchParams.get('specialty')
    if (priestName && priestSpecialty) {
      const priest = mockPriests.find(p => p.name === priestName && p.specialty === priestSpecialty)
      if (priest) {
        setSelectedPriest(priest)
        setFormData(prev => ({ 
          ...prev, 
          priestId: priest.id,
          priestName: priest.name
        }))
        // If no service selected yet, skip to priest selection step
        if (!serviceName) {
          setStep(2)
        }
      }
    }
  }, [searchParams])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleServiceSelect = (service: any, index: number) => {
    setSelectedService({ ...service, id: index.toString() })
    setFormData(prev => ({ 
      ...prev, 
      service: service.name,
      amount: 500 // Default price
    }))
  }

  const handlePriestSelect = (priest: any) => {
    setSelectedPriest(priest)
    setFormData(prev => ({ 
      ...prev, 
      priestId: priest.id,
      priestName: priest.name 
    }))
  }

  const handleNextStep = () => {
    if (step < 4) setStep(step + 1)
  }

  const handlePrevStep = () => {
    if (step > 1) setStep(step - 1)
  }

  const handleBookingComplete = () => {
    // Here you would typically save the booking to your backend
    setBookingSuccess(true)
    setTimeout(() => {
      router.push('/dashboard')
    }, 3000)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 bg-background">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="font-serif text-4xl font-bold text-foreground mb-12 text-center">Book Your Service</h1>

          {/* Progress Bar */}
          <div className="mb-12 flex justify-between items-center">
            {['Service', 'Priest', 'Schedule', 'Confirmation'].map((label, idx) => (
              <div key={label} className="flex flex-col items-center flex-1 relative">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold mb-2 ${
                  idx + 1 <= step ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                }`}>
                  {idx + 1}
                </div>
                <span className="text-xs font-medium text-foreground text-center">{label}</span>
                {idx < 3 && (
                  <div className={`absolute h-1 w-full mt-5 left-1/2 transform -translate-x-1/2 ${idx + 1 < step ? 'bg-primary' : 'bg-muted'}`}></div>
                )}
              </div>
            ))}
          </div>

          {/* Success Message */}
          {bookingSuccess && (
            <div className="bg-green-50 border border-green-200 rounded-xl p-8 mb-8 text-center">
              <Check className="w-16 h-16 text-green-600 mx-auto mb-4" />
              <h2 className="font-serif text-2xl font-bold text-green-800 mb-2">Booking Confirmed!</h2>
              <p className="text-green-700 mb-4">Your ceremony has been successfully booked. You will be redirected to your dashboard shortly.</p>
              <div className="text-sm text-green-600">Redirecting in 3 seconds...</div>
            </div>
          )}

          {/* Step 1: Service Selection */}
          {step === 1 && !bookingSuccess && (
            <div className="bg-card rounded-2xl p-8 border border-border mb-8">
              <h2 className="font-serif text-2xl font-bold text-foreground mb-6">Select Service</h2>
              
              <div className="grid gap-4 mb-6">
                {mockServices.map((service, index) => (
                  <div
                    key={index}
                    onClick={() => handleServiceSelect(service, index)}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      selectedService?.id === index.toString()
                        ? 'border-primary bg-primary/10'
                        : 'border-border bg-card hover:border-primary/50'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">{service.name}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{service.description}</p>
                        <div className="flex gap-4 text-sm text-muted-foreground">
                          <span>Duration: {service.duration}</span>
                          <span>Category: {service.category}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-serif text-xl font-bold text-primary">₹500</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Priest Selection */}
          {step === 2 && !bookingSuccess && (
            <div className="bg-card rounded-2xl p-8 border border-border mb-8">
              <h2 className="font-serif text-2xl font-bold text-foreground mb-6">Select Priest</h2>
              
              <div className="grid gap-4 mb-6">
                {mockPriests.map((priest) => (
                  <div
                    key={priest.id}
                    onClick={() => handlePriestSelect(priest)}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      selectedPriest?.id === priest.id
                        ? 'border-primary bg-primary/10'
                        : 'border-border bg-card hover:border-primary/50'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex gap-4">
                        <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center text-2xl">
                          {priest.name.charAt(0)}
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground mb-1">{priest.name}</h3>
                          <p className="text-sm text-muted-foreground mb-2">{priest.specialty}</p>
                          <div className="flex items-center gap-2 text-sm">
                            <span className="text-yellow-500">⭐ {priest.rating}</span>
                            <span className="text-muted-foreground">•</span>
                            <span className="text-muted-foreground">{priest.experience}</span>
                            <span className="text-muted-foreground">•</span>
                            <span className="text-muted-foreground">{priest.location}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-serif text-xl font-bold text-primary">₹{priest.price}/hour</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Schedule */}
          {step === 3 && !bookingSuccess && (
            <div className="bg-card rounded-2xl p-8 border border-border mb-8">
              <h2 className="font-serif text-2xl font-bold text-foreground mb-6">Schedule</h2>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    <Calendar className="inline-block mr-2 text-primary" size={16} />
                    Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className="w-full bg-input border border-border rounded-lg px-4 py-3 text-foreground outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    <Clock className="inline-block mr-2 text-primary" size={16} />
                    Time
                  </label>
                  <input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    className="w-full bg-input border border-border rounded-lg px-4 py-3 text-foreground outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-foreground mb-2">
                  <MapPin className="inline-block mr-2 text-primary" size={16} />
                  Location/Address
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="Enter your address"
                  className="w-full bg-input border border-border rounded-lg px-4 py-3 text-foreground outline-none focus:ring-2 focus:ring-primary placeholder-muted-foreground"
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-foreground mb-2">
                  <Users className="inline-block mr-2 text-primary" size={16} />
                  Number of Guests
                </label>
                <select
                  name="guests"
                  value={formData.guests}
                  onChange={handleInputChange}
                  className="w-full bg-input border border-border rounded-lg px-4 py-3 text-foreground outline-none focus:ring-2 focus:ring-primary"
                >
                  {['1', '2', '5', '10', '20', '50+'].map(num => (
                    <option key={num} value={num}>{num}</option>
                  ))}
                </select>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-foreground mb-2">Special Requests</label>
                <textarea
                  name="specialRequests"
                  value={formData.specialRequests}
                  onChange={handleInputChange}
                  placeholder="Any special requirements or preferences?"
                  rows={4}
                  className="w-full bg-input border border-border rounded-lg px-4 py-3 text-foreground outline-none focus:ring-2 focus:ring-primary placeholder-muted-foreground"
                />
              </div>
            </div>
          )}

          {/* Step 4: Confirmation */}
          {step === 4 && !bookingSuccess && (
            <div className="bg-card rounded-2xl p-8 border border-border mb-8">
              <h2 className="font-serif text-2xl font-bold text-foreground mb-6">Booking Confirmation</h2>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between py-3 border-b border-border">
                  <span className="text-muted-foreground">Priest</span>
                  <span className="font-semibold text-foreground">{formData.priestName || '-'}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-border">
                  <span className="text-muted-foreground">Service</span>
                  <span className="font-semibold text-foreground">{formData.service || '-'}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-border">
                  <span className="text-muted-foreground">Date & Time</span>
                  <span className="font-semibold text-foreground">{formData.date} at {formData.time}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-border">
                  <span className="text-muted-foreground">Location</span>
                  <span className="font-semibold text-foreground text-right">{formData.location || '-'}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-border">
                  <span className="text-muted-foreground">Guests</span>
                  <span className="font-semibold text-foreground">{formData.guests}</span>
                </div>
              </div>

              <div className="bg-primary/10 rounded-xl p-4 mb-8 border border-primary/20">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-foreground">Total Amount</span>
                  <span className="font-serif text-3xl font-bold text-primary">₹{formData.amount}</span>
                </div>
              </div>

              <Button 
                onClick={handleBookingComplete}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3 rounded-lg text-base font-semibold"
              >
                Complete Booking & Pay
              </Button>
              <p className="text-xs text-muted-foreground text-center mt-4">
                By booking, you agree to our terms and conditions
              </p>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex gap-4 justify-between">
            {step > 1 && (
              <Button variant="outline" onClick={handlePrevStep} className="px-8 py-3 rounded-lg">
                Back
              </Button>
            )}
            {step < 4 && (
              <Button
                onClick={handleNextStep}
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-lg ml-auto"
                disabled={step === 1 && !selectedService || step === 2 && !selectedPriest}
              >
                Next
              </Button>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
