'use client'

import { Suspense, useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Footer } from '@/components/footer'
import { Mail, User, ArrowLeft, ArrowRight, Loader2, CheckCircle } from 'lucide-react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import { useAppContext } from '@/context/app-context'

function SignupPageContent() {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [emailLocked, setEmailLocked] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const router = useRouter()
  const searchParams = useSearchParams()
  const { setCurrentUser } = useAppContext()

  useEffect(() => {
    const queryEmail = searchParams.get('email')
    if (queryEmail) {
      setEmail(queryEmail)
      setEmailLocked(true)
      return;
    }
    // After Google login, get user and lock email
    const checkGoogleUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user?.email) {
        setEmail(user.email);
        setEmailLocked(true);
      }
    };
    checkGoogleUser();
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)

    if (!fullName.trim()) {
      setError('Full name is required.')
      return
    }

    if (!email) {
      setError('Email is required.')
      return
    }

    if (!email.toLowerCase().endsWith('@gmail.com')) {
      setError('Please use the Gmail account linked to your Google login.')
      return
    }

    setIsSubmitting(true)

    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser()

      if (userError || !user?.email) {
        throw new Error('Sign in with Google first to continue.')
      }

      const normalizedEmail = email.toLowerCase()

      if (user.email.toLowerCase() !== normalizedEmail) {
        throw new Error('Please use the same Gmail account you used for Google sign-in.')
      }

      const { data: existingCustomer, error: lookupError } = await supabase
        .from('customers')
        .select('id, full_name')
        .eq('email', normalizedEmail)
        .maybeSingle()

      if (lookupError) {
        throw lookupError
      }

      if (existingCustomer) {
        setCurrentUser({
          id: user.id,
          name: existingCustomer.full_name ?? user.email,
          role: 'user',
        })
        router.replace('/dashboard')
        return
      }

      const { error: insertError } = await supabase.from('customers').insert({
        full_name: fullName.trim(),
        email: normalizedEmail,
      })

      if (insertError) {
        throw insertError
      }

      setCurrentUser({
        id: user.id,
        name: fullName.trim(),
        role: 'user',
      })
      setSuccess('Account created! Redirecting you to your dashboard…')
      setTimeout(() => router.replace('/dashboard'), 1500)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unable to create account.'
      setError(message)
    } finally {
      setIsSubmitting(false)
    }
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
            <p className="text-muted-foreground">
              Link your Google account once. We’ll remember you on every login.
            </p>
          </div>

          <div className="bg-card rounded-2xl p-8 border border-border space-y-6">
            <Button
              variant="outline"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-lg transition-all duration-300 hover:shadow-md hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              onClick={async () => {
                setError(null);
                setIsSubmitting(true);
                try {
                  const { error } = await supabase.auth.signInWithOAuth({
                    provider: 'google',
                    options: {
                      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'}/auth/callback?next=/signup`,
                    },
                  });
                  if (error) {
                    setError(error.message);
                  }
                } catch (e: any) {
                  setError(e?.message ?? 'Something went wrong');
                } finally {
                  setIsSubmitting(false);
                }
              }}
              disabled={isSubmitting || emailLocked}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </Button>
            <div className="rounded-xl bg-primary/5 border border-primary/20 p-4 text-sm text-muted-foreground flex gap-3">
              <CheckCircle className="text-primary" size={20} />
              <div>
                <p className="font-medium text-foreground">How it works</p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>Sign in with your Google account.</li>
                  <li>Confirm your name and Gmail below.</li>
                  <li>We save it to Supabase and greet you in the app.</li>
                </ul>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
                <div className="flex items-center gap-3 bg-input rounded-lg px-4 py-3 border border-border focus-within:ring-2 focus-within:ring-primary">
                  <User size={20} className="text-muted-foreground" />
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Enter your full name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="flex-1 bg-transparent outline-none text-foreground placeholder-muted-foreground"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Gmail Address</label>
                <div className="flex items-center gap-3 bg-input rounded-lg px-4 py-3 border border-border focus-within:ring-2 focus-within:ring-primary">
                  <Mail size={20} className="text-muted-foreground" />
                  <input
                    type="email"
                    name="email"
                    placeholder="you@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 bg-transparent outline-none text-foreground placeholder-muted-foreground disabled:opacity-70"
                    required
                    readOnly={emailLocked}
                  />
                </div>
                {!emailLocked && (
                  <p className="text-xs text-muted-foreground mt-2">
                    Tip: Click “Sign in with Google” first so we can auto-fill your Gmail.
                  </p>
                )}
              </div>

              {error && (
                <div className="rounded-lg border border-destructive/30 bg-destructive/10 text-destructive text-sm px-4 py-3">
                  {error}
                </div>
              )}

              {success && (
                <div className="rounded-lg border border-emerald-300 bg-emerald-50 text-emerald-700 text-sm px-4 py-3">
                  {success}
                </div>
              )}

              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3 rounded-lg font-semibold flex items-center justify-center gap-2"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    Create Account
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>

            <p className="text-center text-sm text-muted-foreground">
              Already created your profile?{' '}
              <Link href="/login" className="text-primary hover:underline font-semibold">
                Go to login
              </Link>
            </p>
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

export default function SignupPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-muted-foreground">Loading...</div>}>
      <SignupPageContent />
    </Suspense>
  )
}
