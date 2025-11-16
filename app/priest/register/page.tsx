'use client'

import { useState } from 'react'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { CheckCircle } from 'lucide-react'

export default function PriestRegisterPage() {
  const [step, setStep] = useState(1)
  const [showSuccess, setShowSuccess] = useState(false)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    specialty: '',
    yearsExperience: '',
    qualifications: '',
    languages: [],
    bio: '',
    address: '',
    city: '',
    state: '',
    services: [] as string[],
    hourlyRate: '',
    bankName: '',
    accountNumber: '',
    ifscCode: '',
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleLanguageToggle = (language: string) => {
    setFormData(prev => ({
      ...prev,
      languages: prev.languages.includes(language)
        ? prev.languages.filter(l => l !== language)
        : [...prev.languages, language]
    }))
  }

  const handleServiceToggle = (service: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service]
    }))
  }

  const handleSubmit = () => {
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3000)
    setStep(1)
  }

  if (showSuccess) {
    return (
      <div className="min-h-screen flex flex-col">
        <div className="flex-1 flex items-center justify-center bg-background px-4">
          <div className="text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle size={48} className="text-green-600" />
            </div>
            <h1 className="font-serif text-3xl font-bold text-foreground mb-2">Sent for Approval</h1>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Thank you for registering! Your application has been submitted successfully. Our team will review your details and contact you within 24 hours.
            </p>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-lg" onClick={() => window.location.href = '/'}>
              Back to Home
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 bg-background py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-serif text-4xl font-bold text-foreground mb-2 text-center">Priest Registration</h1>
          <p className="text-muted-foreground text-center mb-12">Join our community of verified spiritual professionals</p>

          {/* Progress */}
          <div className="mb-12 flex justify-between items-center">
            {['Personal', 'Professional', 'Services', 'Payment'].map((label, idx) => (
              <div key={label} className="flex flex-col items-center flex-1">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold mb-2 ${
                  idx + 1 <= step ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                }`}>
                  {idx + 1}
                </div>
                <span className="text-xs font-medium text-foreground text-center">{label}</span>
              </div>
            ))}
          </div>

          {/* Step 1: Personal Info */}
          {step === 1 && (
            <Card className="p-8 border-0 rounded-2xl">
              <h2 className="font-serif text-2xl font-bold text-foreground mb-6">Personal Information</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full bg-input border border-border rounded-lg px-4 py-3 text-foreground outline-none focus:ring-2 focus:ring-primary placeholder-muted-foreground"
                    placeholder="Pandit Name"
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full bg-input border border-border rounded-lg px-4 py-3 text-foreground outline-none focus:ring-2 focus:ring-primary placeholder-muted-foreground"
                      placeholder="email@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full bg-input border border-border rounded-lg px-4 py-3 text-foreground outline-none focus:ring-2 focus:ring-primary placeholder-muted-foreground"
                      placeholder="+91-98765-43210"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Address</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full bg-input border border-border rounded-lg px-4 py-3 text-foreground outline-none focus:ring-2 focus:ring-primary placeholder-muted-foreground"
                    placeholder="Street address"
                  />
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="City"
                    className="bg-input border border-border rounded-lg px-4 py-3 text-foreground outline-none focus:ring-2 focus:ring-primary placeholder-muted-foreground"
                  />
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    placeholder="State"
                    className="bg-input border border-border rounded-lg px-4 py-3 text-foreground outline-none focus:ring-2 focus:ring-primary placeholder-muted-foreground"
                  />
                  <input
                    type="text"
                    placeholder="Pin Code"
                    className="bg-input border border-border rounded-lg px-4 py-3 text-foreground outline-none focus:ring-2 focus:ring-primary placeholder-muted-foreground"
                  />
                </div>
              </div>
            </Card>
          )}

          {/* Step 2: Professional Info */}
          {step === 2 && (
            <Card className="p-8 border-0 rounded-2xl">
              <h2 className="font-serif text-2xl font-bold text-foreground mb-6">Professional Information</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Primary Specialty</label>
                  <select
                    name="specialty"
                    value={formData.specialty}
                    onChange={handleInputChange}
                    className="w-full bg-input border border-border rounded-lg px-4 py-3 text-foreground outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="">Select specialty</option>
                    <option value="vedic">Vedic Rituals</option>
                    <option value="marriage">Marriage Ceremonies</option>
                    <option value="home">Home Poojas</option>
                    <option value="temple">Temple Services</option>
                  </select>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Years of Experience</label>
                    <input
                      type="number"
                      name="yearsExperience"
                      value={formData.yearsExperience}
                      onChange={handleInputChange}
                      className="w-full bg-input border border-border rounded-lg px-4 py-3 text-foreground outline-none focus:ring-2 focus:ring-primary placeholder-muted-foreground"
                      placeholder="15"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Hourly Rate (₹)</label>
                    <input
                      type="number"
                      name="hourlyRate"
                      value={formData.hourlyRate}
                      onChange={handleInputChange}
                      className="w-full bg-input border border-border rounded-lg px-4 py-3 text-foreground outline-none focus:ring-2 focus:ring-primary placeholder-muted-foreground"
                      placeholder="500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Qualifications & Certifications</label>
                  <textarea
                    name="qualifications"
                    value={formData.qualifications}
                    onChange={handleInputChange}
                    className="w-full bg-input border border-border rounded-lg px-4 py-3 text-foreground outline-none focus:ring-2 focus:ring-primary placeholder-muted-foreground"
                    rows={4}
                    placeholder="List your degrees, certifications, and training..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-3">Languages Spoken</label>
                  <div className="flex flex-wrap gap-3">
                    {['Hindi', 'Sanskrit', 'English', 'Tamil', 'Telugu'].map((lang) => (
                      <button
                        key={lang}
                        onClick={() => handleLanguageToggle(lang)}
                        className={`px-4 py-2 rounded-lg border-2 font-medium transition-all ${
                          formData.languages.includes(lang)
                            ? 'border-primary bg-primary/10 text-primary'
                            : 'border-border bg-card text-foreground hover:border-primary/50'
                        }`}
                      >
                        {lang}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Bio</label>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    className="w-full bg-input border border-border rounded-lg px-4 py-3 text-foreground outline-none focus:ring-2 focus:ring-primary placeholder-muted-foreground"
                    rows={4}
                    placeholder="Write a brief introduction about yourself..."
                  />
                </div>
              </div>
            </Card>
          )}

          {/* Step 3: Services */}
          {step === 3 && (
            <Card className="p-8 border-0 rounded-2xl">
              <h2 className="font-serif text-2xl font-bold text-foreground mb-6">Services You Offer</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {['Griha Pravesh', 'Vivah Samskara', 'Satyanarayan Katha', 'Mundan', 'Upanayan', 'Bhog Preparation', 'Aarti Ceremonies', 'Vedic Chanting'].map((service) => (
                  <button
                    key={service}
                    onClick={() => handleServiceToggle(service)}
                    className={`p-4 rounded-xl border-2 text-left font-medium transition-all ${
                      formData.services.includes(service)
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-border bg-card text-foreground hover:border-primary/50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                        formData.services.includes(service)
                          ? 'border-primary bg-primary'
                          : 'border-border'
                      }`}>
                        {formData.services.includes(service) && <span className="text-white text-sm">✓</span>}
                      </div>
                      {service}
                    </div>
                  </button>
                ))}
              </div>
            </Card>
          )}

          {/* Step 4: Payment */}
          {step === 4 && (
            <Card className="p-8 border-0 rounded-2xl">
              <h2 className="font-serif text-2xl font-bold text-foreground mb-6">Banking Details</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Bank Name</label>
                  <input
                    type="text"
                    name="bankName"
                    value={formData.bankName}
                    onChange={handleInputChange}
                    className="w-full bg-input border border-border rounded-lg px-4 py-3 text-foreground outline-none focus:ring-2 focus:ring-primary placeholder-muted-foreground"
                    placeholder="e.g., HDFC Bank"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Account Number</label>
                  <input
                    type="text"
                    name="accountNumber"
                    value={formData.accountNumber}
                    onChange={handleInputChange}
                    className="w-full bg-input border border-border rounded-lg px-4 py-3 text-foreground outline-none focus:ring-2 focus:ring-primary placeholder-muted-foreground"
                    placeholder="1234567890"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">IFSC Code</label>
                  <input
                    type="text"
                    name="ifscCode"
                    value={formData.ifscCode}
                    onChange={handleInputChange}
                    className="w-full bg-input border border-border rounded-lg px-4 py-3 text-foreground outline-none focus:ring-2 focus:ring-primary placeholder-muted-foreground"
                    placeholder="HDFC0001234"
                  />
                </div>
                <div className="bg-accent/10 border border-accent/20 rounded-xl p-4">
                  <p className="text-sm text-foreground">
                    Your banking information is encrypted and secure. We will use this only for payment transfers.
                  </p>
                </div>
              </div>
            </Card>
          )}

          {/* Navigation */}
          <div className="flex gap-4 justify-between mt-8">
            {step > 1 && (
              <Button
                variant="outline"
                onClick={() => setStep(step - 1)}
                className="px-8 py-3 rounded-lg"
              >
                Back
              </Button>
            )}
            {step < 4 ? (
              <Button
                onClick={() => setStep(step + 1)}
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-lg ml-auto font-semibold"
              >
                Next
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-lg ml-auto font-semibold"
              >
                Submit Application
              </Button>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
