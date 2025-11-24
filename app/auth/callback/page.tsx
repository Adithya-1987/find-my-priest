'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'
import { supabase } from '@/lib/supabaseClient'

export default function AuthCallbackPage() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true

    const handleAuthCallback = async () => {
      try {
        const url = new URL(window.location.href)
        const authCode = url.searchParams.get('code')

        if (!authCode) {
          const message = 'Missing auth code. Please try signing in again.'
          console.error('[GOOGLE_OAUTH_CALLBACK]', message)
          if (!isMounted) return
          setError(message)
          setTimeout(() => router.replace(`/login?error=${encodeURIComponent(message)}`), 1500)
          return
        }

        const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(
          window.location.href
        )

        if (exchangeError) {
          console.error('[GOOGLE_OAUTH_CALLBACK]', exchangeError)
          if (!isMounted) return
          setError(exchangeError.message)
          setTimeout(() => router.replace(`/login?error=${encodeURIComponent(exchangeError.message)}`), 1500)
          return
        }

        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser()

        if (userError || !user?.email) {
          const message = userError?.message ?? 'No active session found'
          console.error('[GOOGLE_OAUTH_CALLBACK]', message)
          if (!isMounted) return
          setError(message)
          setTimeout(() => router.replace(`/login?error=${encodeURIComponent(message)}`), 1500)
          return
        }

        const { data: customer, error: customerError } = await supabase
          .from('customers')
          .select('full_name')
          .eq('email', user.email)
          .maybeSingle()

        if (customerError) {
          console.error('[GOOGLE_OAUTH_CALLBACK]', customerError)
          if (!isMounted) return
          setError(customerError.message)
          setTimeout(
            () => router.replace(`/login?error=${encodeURIComponent(customerError.message)}`),
            1500
          )
          return
        }

        if (!customer) {
          router.replace(`/signup?email=${encodeURIComponent(user.email)}`)
          return
        }

        router.replace('/dashboard')
      } catch (err) {
        console.error('[GOOGLE_OAUTH_CALLBACK]', err)
        const message = err instanceof Error ? err.message : 'Something went wrong'
        if (!isMounted) return
        setError(message)
        setTimeout(() => router.replace(`/login?error=${encodeURIComponent(message)}`), 1500)
      }
    }

    handleAuthCallback()

    return () => {
      isMounted = false
    }
  }, [router])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
      <p className="text-sm text-muted-foreground">
        {error ? 'Redirecting...' : 'Completing sign in...'}
      </p>
      {error && <p className="text-sm text-red-500 text-center px-4">{error}</p>}
    </div>
  )
}

