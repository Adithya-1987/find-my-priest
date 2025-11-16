'use client'

import { useState } from 'react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Calendar, Clock, MapPin, Users } from 'lucide-react'

export default function BookingPage() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    priestName: 'Pandit Rajesh Kumar',
    service: '',
    date: '',
    time: '',
    location: '',
    guests: '1',
    specialRequests: '',
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleNextStep = () => {
    if (step < 3) setStep(step + 1)
  }

  const handlePrevStep = () => {
    if (step > 1) setStep(step - 1)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-1 bg-background">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="font-serif text-4xl font-bold text-foreground mb-12 text-center">Book Your Service</h1>

          {/* Progress Bar */}
          <div className="mb-12 flex justify-between items-center">
            {['Service', 'Schedule', 'Confirmation'].map((label, idx) => (
              <div key={label} className="flex flex-col items-center flex-1">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold mb-2 ${
                  idx + 1 <= step ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                }`}>
                  {idx + 1}
                </div>
                <span className="text-xs font-medium text-foreground text-center">{label}</span>
                {idx < 2 && (
                  <div className={`absolute h-1 w-24 mt-5 ${idx + 1 < step ? 'bg-primary' : 'bg-muted'}`}></div>
                )}
              </div>
            ))}
          </div>

          {/* Step 1: Service Selection */}
          {step === 1 && (
            <div className="bg-card rounded-2xl p-8 border border-border mb-8">
              <h2 className="font-serif text-2xl font-bold text-foreground mb-6">Select Service</h2>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-foreground mb-2">Priest</label>
                <input
                  type="text"
                  value={formData.priestName}
                  disabled
                  className="w-full bg-muted rounded-lg px-4 py-3 text-foreground"
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-foreground mb-3">Service Type</label>
                <div className="grid grid-cols-2 gap-3">
                  {['Griha Pravesh', 'Vivah Samskara', 'Satyanarayan Katha', 'Mundan'].map((service) => (
                    <button
                      key={service}
                      onClick={() => setFormData(prev => ({ ...prev, service }))}
                      className={`p-3 rounded-lg border-2 text-sm font-medium transition-all ${
                        formData.service === service
                          ? 'border-primary bg-primary/10 text-primary'
                          : 'border-border bg-card text-foreground hover:border-primary/50'
                      }`}
                    >
                      {service}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Schedule */}
          {step === 2 && (
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

          {/* Step 3: Confirmation */}
          {step === 3 && (
            <div className="bg-card rounded-2xl p-8 border border-border mb-8">
              <h2 className="font-serif text-2xl font-bold text-foreground mb-6">Booking Confirmation</h2>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between py-3 border-b border-border">
                  <span className="text-muted-foreground">Priest</span>
                  <span className="font-semibold text-foreground">{formData.priestName}</span>
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
                  <span className="font-serif text-3xl font-bold text-primary">₹500</span>
                </div>
              </div>

              <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3 rounded-lg text-base font-semibold">
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
            {step < 3 && (
              <Button
                onClick={handleNextStep}
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-lg ml-auto"
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
