'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'

export function useRequireCustomer() {
  const router = useRouter()
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    let cancelled = false

    const verifyCustomer = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser()

        if (cancelled) {
          return
        }

        if (!user?.email) {
          router.replace('/login?error=Please%20sign%20in')
          return
        }

        const { data: customer } = await supabase
          .from('customers')
          .select('id')
          .eq('email', user.email)
          .maybeSingle()

        if (cancelled) {
          return
        }

        if (!customer) {
          router.replace(`/signup?email=${encodeURIComponent(user.email)}`)
          return
        }

        setChecking(false)
      } catch (error) {
        console.error('[CUSTOMER_GUARD]', error)
        if (!cancelled) {
          router.replace('/login?error=Unable%20to%20verify%20session')
        }
      }
    }

    verifyCustomer()

    return () => {
      cancelled = true
    }
  }, [router])

  return { checking }
}

