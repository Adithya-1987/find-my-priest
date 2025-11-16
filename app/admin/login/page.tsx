'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Mail, Lock, Eye, EyeOff } from 'lucide-react'

export default function AdminLoginPage() {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-1 bg-background flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-serif font-bold text-2xl">⚙️</span>
            </div>
            <h1 className="font-serif text-3xl font-bold text-foreground mb-2">Admin Portal</h1>
            <p className="text-muted-foreground">Manage platform operations</p>
          </div>

          <div className="bg-card rounded-2xl p-8 border border-border">
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Admin Email</label>
                <div className="flex items-center gap-3 bg-input rounded-lg px-4 py-3 border border-border focus-within:ring-2 focus-within:ring-primary">
                  <Mail size={20} className="text-muted-foreground" />
                  <input
                    type="email"
                    placeholder="admin@findmypriest.com"
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
                    placeholder="Enter password"
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

            <p className="text-center text-xs text-muted-foreground mt-6">
              Authorized personnel only
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
