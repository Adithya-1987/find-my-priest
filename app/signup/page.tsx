'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Footer } from '@/components/footer'
import { Mail, Lock, Eye, EyeOff, User, Phone, ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Mock signup logic
    setTimeout(() => {
      router.push('/login')
    }, 1000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-background via-secondary to-background p-4">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6">
              <ArrowLeft size={16} className="mr-2" />
              Back to Home
            </Link>
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-serif font-bold text-2xl">ॐ</span>
            </div>
            <h1 className="font-serif text-3xl font-bold text-foreground mb-2">Create Account</h1>
            <p className="text-muted-foreground">Join our community of devotees</p>
          </div>

          <div className="bg-card rounded-2xl p-8 border border-border">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
                <div className="flex items-center gap-3 bg-input rounded-lg px-4 py-3 border border-border focus-within:ring-2 focus-within:ring-primary">
                  <User size={20} className="text-muted-foreground" />
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleChange}
                    className="flex-1 bg-transparent outline-none text-foreground placeholder-muted-foreground"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Email Address</label>
                <div className="flex items-center gap-3 bg-input rounded-lg px-4 py-3 border border-border focus-within:ring-2 focus-within:ring-primary">
                  <Mail size={20} className="text-muted-foreground" />
                  <input
                    type="email"
                    name="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="flex-1 bg-transparent outline-none text-foreground placeholder-muted-foreground"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Phone Number</label>
                <div className="flex items-center gap-3 bg-input rounded-lg px-4 py-3 border border-border focus-within:ring-2 focus-within:ring-primary">
                  <Phone size={20} className="text-muted-foreground" />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={handleChange}
                    className="flex-1 bg-transparent outline-none text-foreground placeholder-muted-foreground"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Password</label>
                <div className="flex items-center gap-3 bg-input rounded-lg px-4 py-3 border border-border focus-within:ring-2 focus-within:ring-primary">
                  <Lock size={20} className="text-muted-foreground" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    placeholder="Create a strong password"
                    value={formData.password}
                    onChange={handleChange}
                    className="flex-1 bg-transparent outline-none text-foreground placeholder-muted-foreground"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <Button 
                  type="submit" 
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3 rounded-lg font-semibold"
                  disabled={isLoading}
                >
                  {isLoading ? 'Creating Account...' : 'Create Account'}
                  <ArrowRight className="ml-2" size={16} />
                </Button>
              </div>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-card text-muted-foreground">Or continue with</span>
                </div>
              </div>

              <Button
                variant="outline"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-lg"
                type="button"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Google
              </Button>

              <p className="text-center text-sm text-muted-foreground mt-6">
                Already have an account?{' '}
                <Link href="/login" className="text-primary hover:underline font-semibold">
                  Sign in
                </Link>
              </p>
            </form>
          </div>

          <div className="mt-8 text-center">
            <div className="flex items-center justify-center space-x-4 text-xs text-muted-foreground">
              <Link href="/about" className="hover:text-foreground">About</Link>
              <span>•</span>
              <Link href="/contact" className="hover:text-foreground">Contact</Link>
              <span>•</span>
              <Link href="/privacy" className="hover:text-foreground">Privacy</Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
