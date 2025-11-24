'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAppContext } from '@/context/app-context'
import { supabase } from '@/lib/supabaseClient'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isSigningOut, setIsSigningOut] = useState(false)
  const { currentUser, setCurrentUser } = useAppContext()
  const router = useRouter()
  const supabaseLinkedRef = useRef(false)

  useEffect(() => {
    let mounted = true

    const syncFromSupabase = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser()

        if (!mounted || !user?.email) {
          if (mounted && supabaseLinkedRef.current) {
            supabaseLinkedRef.current = false
            setCurrentUser(null)
          }
          return
        }

        const { data: customer } = await supabase
          .from('customers')
          .select('full_name')
          .eq('email', user.email)
          .maybeSingle()

        if (!mounted) {
          return
        }

        if (customer?.full_name) {
          supabaseLinkedRef.current = true
          setCurrentUser({
            id: user.id,
            name: customer.full_name,
            role: 'user',
          })
        } else if (supabaseLinkedRef.current) {
          supabaseLinkedRef.current = false
          setCurrentUser(null)
        }
      } catch (error) {
        console.error('[NAVBAR_SUPABASE_SYNC]', error)
      }
    }

    syncFromSupabase()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      syncFromSupabase()
    })

    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [setCurrentUser])

  const handleLogout = async () => {
    setIsSigningOut(true)
    try {
      await supabase.auth.signOut()
      supabaseLinkedRef.current = false
      setCurrentUser(null)
      router.push('/login')
    } catch (error) {
      console.error('[NAVBAR_LOGOUT]', error)
    } finally {
      setIsSigningOut(false)
    }
  }

  const publicLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/services', label: 'Services' },
    { href: '/contact', label: 'Contact' },
  ]
  const priestLinks = [
    { href: '/priest-home', label: 'My Home' },
    { href: '/priest/dashboard', label: 'Dashboard' },
    { href: '/priest/bookings', label: 'Requests' },
    { href: '/priest/calendar', label: 'Calendar' },
    { href: '/priest/profile', label: 'Profile' },
    { href: '/priest/notifications', label: 'Notifications' },
  ]
  const customerLinks = [
    { href: '/customer-home', label: 'My Home' },
    { href: '/about', label: 'About' },
    { href: '/services', label: 'Services' },
    { href: '/contact', label: 'Contact' },
    { href: '/dashboard', label: 'Dashboard' },
  ]

  const links = currentUser?.role === 'priest' ? priestLinks : currentUser?.role === 'user' ? customerLinks : publicLinks
  const firstName = currentUser?.name ? currentUser.name.split(' ')[0] : null

  return (
    <nav className="sticky top-0 z-50 bg-background border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
              <span className="text-white font-serif font-bold text-sm">ॐ</span>
            </div>
            <span className="hidden sm:inline font-serif font-bold text-lg text-foreground">Find My Priest</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-8">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-foreground hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex gap-3 items-center">
            {firstName && (
              <span className="text-sm text-muted-foreground">Hi, {firstName}</span>
            )}
            {currentUser ? (
              <Button
                variant="outline"
                onClick={handleLogout}
                disabled={isSigningOut}
              >
                {isSigningOut ? 'Signing out…' : 'Logout'}
              </Button>
            ) : (
              <>
                <Button variant="outline" asChild>
                  <Link href="/login">Login</Link>
                </Button>
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground" asChild>
                  <Link href="/register">Sign Up</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-3">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block text-sm font-medium text-foreground hover:text-primary transition-colors py-2"
              >
                {link.label}
              </Link>
            ))}
            <div className="space-y-2 pt-2 border-t border-border">
              {currentUser ? (
                <>
                  {firstName && (
                    <p className="text-sm text-muted-foreground text-center">
                      Hi, {firstName}
                    </p>
                  )}
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={handleLogout}
                    disabled={isSigningOut}
                  >
                    {isSigningOut ? 'Signing out…' : 'Logout'}
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/login">Login</Link>
                  </Button>
                  <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" asChild>
                    <Link href="/register">Sign Up</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
