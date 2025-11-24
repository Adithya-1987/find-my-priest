'use client'

import { useState, useEffect } from 'react'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Mail, Lock, Eye, EyeOff, User, Shield, Calendar, Star, ChevronRight, Check, X, AlertCircle, Loader2, CheckCircle } from 'lucide-react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useAppContext } from '@/context/app-context'
import { useToastNotification } from '@/hooks/use-toast-notification'
import { supabase } from '@/lib/supabaseClient'

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [userType, setUserType] = useState<'customer' | 'priest'>('customer')
  const [isLoading, setIsLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)
  const [googleError, setGoogleError] = useState<string | null>(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<{email?: string, password?: string}>({})
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false)
  const router = useRouter()
  const { setCurrentUser } = useAppContext()
  const toast = useToastNotification()
  const searchParams = useSearchParams()

  useEffect(() => {
    setIsLoaded(true)
    // Load saved email if remember me was checked
    const savedEmail = localStorage.getItem('rememberedEmail')
    if (savedEmail) {
      setEmail(savedEmail)
      setRememberMe(true)
    }
  }, [])

  useEffect(() => {
    const errorMessage = searchParams.get('error')
    if (errorMessage) {
      setGoogleError(errorMessage)
    }
  }, [searchParams])

  const validateForm = () => {
    const newErrors: {email?: string, password?: string} = {}
    
    if (!email) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email'
    }
    
    if (!password) {
      newErrors.password = 'Password is required'
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }
    
    setIsLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      // Save email if remember me is checked
      if (rememberMe) {
        localStorage.setItem('rememberedEmail', email)
      } else {
        localStorage.removeItem('rememberedEmail')
      }
      
      // Show success animation
      setShowSuccessAnimation(true)
      
      // Mock auth, then route by selection
      if (userType === 'priest') {
        setCurrentUser({ id: 'mock-priest', name: 'Priest User', role: 'priest' })
        toast.success('Welcome back, Priest!')
        setTimeout(() => router.push('/priest/dashboard'), 1500)
      } else {
        setCurrentUser({ id: 'mock-user', name: 'Customer User', role: 'user' })
        toast.success('Welcome back!')
        setTimeout(() => router.push('/dashboard'), 1500)
      }
    }, 2000)
  }

  const handleGoogleLogin = async () => {
    setGoogleError(null)
    setGoogleLoading(true)

    const redirectTo =
      process.env.NEXT_PUBLIC_SITE_URL
        ? `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`
        : 'http://localhost:3000/auth/callback'

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: { redirectTo },
      })

      if (error) {
        console.error('[GOOGLE_OAUTH]', error)
        setGoogleError(error.message)
      }
    } catch (err) {
      console.error('[GOOGLE_OAUTH]', err)
      setGoogleError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setGoogleLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-background via-secondary to-background p-4">
        <div className="max-w-md">
          <div className={`text-center mb-8 transform transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <span className="text-white font-serif font-bold text-3xl">ॐ</span>
            </div>
            <h1 className="font-serif text-4xl font-bold text-foreground mb-3">Welcome Back</h1>
            <p className="text-muted-foreground text-lg">Sign in to your spiritual journey</p>
            
            {/* Quick Stats */}
            <div className="flex justify-center gap-8 mt-6 text-sm">
              <div className="flex items-center gap-2">
                <Star className="text-yellow-500" size={16} />
                <span className="text-muted-foreground">4.9 Rating</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="text-primary" size={16} />
                <span className="text-muted-foreground">10K+ Users</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="text-green-500" size={16} />
                <span className="text-muted-foreground">Secure</span>
              </div>
            </div>
          </div>

          {/* Panel Selection */}
          <div className={`grid grid-cols-2 gap-4 mb-8 transform transition-all duration-700 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <button
              type="button"
              onClick={() => setUserType('customer')}
              className={`rounded-xl border p-4 text-left transition-all hover:shadow-lg hover:scale-105 duration-300 ${
                userType === 'customer' 
                  ? 'border-primary bg-primary/10 shadow-md scale-105' 
                  : 'border-border bg-card hover:border-primary/50'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="text-xs font-semibold text-muted-foreground">Continue as</div>
                {userType === 'customer' && <Check className="text-primary" size={16} />}
              </div>
              <div className="mt-1 font-serif text-xl font-bold text-foreground">Customer</div>
              <p className="mt-1 text-xs text-muted-foreground">Search priests, book services</p>
              <div className="mt-3 flex gap-1">
                <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded">Popular</span>
                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Easy</span>
              </div>
            </button>
            <button
              type="button"
              onClick={() => setUserType('priest')}
              className={`rounded-xl border p-4 text-left transition-all hover:shadow-lg hover:scale-105 duration-300 ${
                userType === 'priest' 
                  ? 'border-primary bg-primary/10 shadow-md scale-105' 
                  : 'border-border bg-card hover:border-primary/50'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="text-xs font-semibold text-muted-foreground">Continue as</div>
                {userType === 'priest' && <Check className="text-primary" size={16} />}
              </div>
              <div className="mt-1 font-serif text-xl font-bold text-foreground">Priest</div>
              <p className="mt-1 text-xs text-muted-foreground">Manage bookings, profile</p>
              <div className="mt-3 flex gap-1">
                <span className="text-xs bg-accent/20 text-accent px-2 py-1 rounded">Verified</span>
                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">Pro</span>
              </div>
            </button>
          </div>

          {/* Login Form */}
          <div className="bg-card rounded-2xl p-8 border border-border">
            <form
              className="space-y-6"
              onSubmit={handleSubmit}
            >
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Email Address</label>
                <div className={`flex items-center gap-3 bg-input rounded-lg px-4 py-3 border transition-all duration-200 ${
                  errors.email ? 'border-red-500 focus-within:ring-2 focus-within:ring-red-500' : 'border-border focus-within:ring-2 focus-within:ring-primary'
                }`}>
                  <Mail size={20} className={`transition-colors duration-200 ${errors.email ? 'text-red-500' : 'text-muted-foreground'}`} />
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value)
                      if (errors.email) setErrors({...errors, email: undefined})
                    }}
                    className="flex-1 bg-transparent outline-none text-foreground placeholder-muted-foreground"
                  />
                </div>
                {errors.email && (
                  <div className="flex items-center gap-1 mt-1 text-red-500 text-xs">
                    <AlertCircle size={12} />
                    <span>{errors.email}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Password</label>
                <div className={`flex items-center gap-3 bg-input rounded-lg px-4 py-3 border transition-all duration-200 ${
                  errors.password ? 'border-red-500 focus-within:ring-2 focus-within:ring-red-500' : 'border-border focus-within:ring-2 focus-within:ring-primary'
                }`}>
                  <Lock size={20} className={`transition-colors duration-200 ${errors.password ? 'text-red-500' : 'text-muted-foreground'}`} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value)
                      if (errors.password) setErrors({...errors, password: undefined})
                    }}
                    className="flex-1 bg-transparent outline-none text-foreground placeholder-muted-foreground"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {errors.password && (
                  <div className="flex items-center gap-1 mt-1 text-red-500 text-xs">
                    <AlertCircle size={12} />
                    <span>{errors.password}</span>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer hover:text-foreground transition-colors duration-200">
                  <input 
                    type="checkbox" 
                    className="w-4 h-4 rounded border-border text-primary focus:ring-primary" 
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <span className="text-muted-foreground">Remember me</span>
                </label>
                <div className="flex items-center gap-2">
                  <Link href="#" className="text-primary hover:underline font-medium transition-all duration-200 hover:text-primary/80">
                    Forgot password?
                  </Link>
                  <span className="text-muted-foreground">•</span>
                  <Link href="#" className="text-primary hover:underline font-medium transition-all duration-200 hover:text-primary/80">
                    Need help?
                  </Link>
                </div>
              </div>

              <Button 
                type="submit" 
              disabled={isLoading}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign In
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>

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
              disabled={isLoading || googleLoading}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-lg transition-all duration-300 hover:shadow-md hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              onClick={handleGoogleLogin}
            >
              {googleLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Continue with Google
                </>
              )}
            </Button>

            {googleError && (
              <p className="text-center text-sm text-red-500 mt-2">
                {googleError}
              </p>
            )}

            <p className="text-center text-sm text-muted-foreground mt-6">
              Don't have an account?{' '}
              <Link href="/priest/register" className="text-primary hover:underline font-semibold transition-all duration-200 hover:text-primary/80">
                Sign up as Priest
              </Link>
              {' '}or{' '}
              <Link href="/signup" className="text-primary hover:underline font-semibold transition-all duration-200 hover:text-primary/80">
                Sign up as Customer
              </Link>
            </p>

            {/* Trust Badges */}
            <div className="mt-8 pt-6 border-t border-border">
              <div className="flex justify-center gap-6 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Shield className="text-green-500" size={12} />
                  <span>SSL Secured</span>
                </div>
                <div className="flex items-center gap-1">
                  <Lock className="text-blue-500" size={12} />
                  <span>Privacy Protected</span>
                </div>
                <div className="flex items-center gap-1">
                  <CheckCircle className="text-primary" size={12} />
                  <span>Verified Platform</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
