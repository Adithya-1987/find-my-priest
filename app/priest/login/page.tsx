'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Mail, Lock, Eye, EyeOff } from 'lucide-react'

export default function PriestLoginPage() {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-1 bg-background flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-serif font-bold text-2xl">👨‍🙏</span>
            </div>
            <h1 className="font-serif text-3xl font-bold text-foreground mb-2">Priest Dashboard</h1>
            <p className="text-muted-foreground">Sign in to manage your bookings</p>
          </div>

          <div className="bg-card rounded-2xl p-8 border border-border">
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Email Address</label>
                <div className="flex items-center gap-3 bg-input rounded-lg px-4 py-3 border border-border focus-within:ring-2 focus-within:ring-primary">
                  <Mail size={20} className="text-muted-foreground" />
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="flex-1 bg-transparent outline-none text-foreground placeholder-muted-foreground"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Password</label>
                <div className="flex items-center gap-3 bg-input rounded-lg px-4 py-3 border border-border focus-within:ring-2 focus-within:ring-primary">
                  <Lock size={20} className="text-muted-foreground" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    className="flex-1 bg-transparent outline-none text-foreground placeholder-muted-foreground"
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

              <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3 rounded-lg font-semibold">
                Sign In
              </Button>
            </form>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-card text-muted-foreground">New to our platform?</span>
              </div>
            </div>

            <Button variant="outline" className="w-full py-3 rounded-lg" asChild>
              <Link href="/priest/register">Create Account</Link>
            </Button>

            <p className="text-center text-sm text-muted-foreground mt-6">
              <Link href="#" className="text-primary hover:underline">
                Forgot password?
              </Link>
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
