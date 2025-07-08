import { createClient } from '@supabase/supabase-js'
import { auth } from '@clerk/nextjs/server'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Cliente Supabase com autenticação Clerk
export const createClerkSupabaseClient = async () => {
  const { getToken } = await auth()
  const token = await getToken({ template: 'supabase' })
  console.log('Supabase Client: Token recebido do Clerk:', token ? 'Sim' : 'Não', token);

  return createClient(supabaseUrl, supabaseAnonKey, {
    global: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  })
}

// Tipos para as tabelas do banco
export interface UserWorkflow {
  id: string
  user_id: string
  name: string
  description?: string
  workflow_data: any
  is_public: boolean
  created_at: string
  updated_at: string
}

export interface GenerationHistory {
  id: string
  user_id: string
  workflow_id: string
  input_data: any
  output_data: any
  status: 'pending' | 'completed' | 'failed'
  created_at: string
}

export interface UserSettings {
  id: string
  user_id: string
  plan: 'free' | 'premium' | 'pro'
  generation_count: number
  max_generations: number
  settings: any
  created_at: string
  updated_at: string
}


