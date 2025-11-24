import { createClient } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabaseClient'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
const adminEmail = process.env.ADMIN_EMAIL

export const supabaseClient = supabase

export const supabaseAdminClient = supabaseServiceRoleKey
  ? createClient(supabaseUrl, supabaseServiceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
      global: {
        headers: adminEmail ? { 'x-admin-email': adminEmail } : undefined,
      },
    })
  : null

export const getAdminEmail = () => adminEmail
