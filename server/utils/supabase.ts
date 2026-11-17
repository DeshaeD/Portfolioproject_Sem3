import { createClient, type SupabaseClient } from '@supabase/supabase-js'

let client: SupabaseClient | undefined

/** One shared Supabase client for all server routes, created on first use. */
export function useSupabase(): SupabaseClient {
  if (!client) {
    const { supabaseUrl, supabaseKey } = useRuntimeConfig()
    if (!supabaseUrl || !supabaseKey) {
      throw createError({ statusCode: 500, statusMessage: 'Supabase is not configured (see .env.example)' })
    }
    client = createClient(supabaseUrl, supabaseKey, { auth: { persistSession: false } })
  }
  return client
}
