import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { createClerkSupabaseClient } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

// GET - Buscar configurações do usuário
export async function GET(request: NextRequest) {
  try {
    const { userId } = await auth()
    
    if (!userId) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    const supabase = await createClerkSupabaseClient()
    
    let { data: settings, error } = await supabase
      .from('user_settings')
      .select('*')
      .eq('user_id', userId)
      .single()

    // Se não existir configurações, criar com valores padrão
    if (error && error.code === 'PGRST116') {
      const { data: newSettings, error: createError } = await supabase
        .from('user_settings')
        .insert({
          user_id: userId,
          plan: 'free',
          generation_count: 0,
          max_generations: 10,
          settings: {
            theme: 'dark',
            notifications: true,
            auto_save: true
          }
        })
        .select()
        .single()

      if (createError) {
        console.error('Erro ao criar configurações:', createError)
        return NextResponse.json({ error: 'Erro ao criar configurações' }, { status: 500 })
      }

      settings = newSettings
    } else if (error) {
      console.error('Erro ao buscar configurações:', error)
      return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 })
    }

    return NextResponse.json({ settings })
  } catch (error) {
    console.error('Erro na API de configurações:', error)
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 })
  }
}

// PUT - Atualizar configurações do usuário
export async function PUT(request: NextRequest) {
  try {
    const { userId } = await auth()
    
    if (!userId) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    const body = await request.json()
    const { plan, settings: userSettings } = body

    const supabase = await createClerkSupabaseClient()
    
    const updateData: any = {
      updated_at: new Date().toISOString()
    }

    if (plan) {
      updateData.plan = plan
      // Definir limites baseados no plano
      switch (plan) {
        case 'free':
          updateData.max_generations = 10
          break
        case 'premium':
          updateData.max_generations = 100
          break
        case 'pro':
          updateData.max_generations = -1 // Ilimitado
          break
      }
    }

    if (userSettings) {
      updateData.settings = userSettings
    }

    const { data: settings, error } = await supabase
      .from('user_settings')
      .update(updateData)
      .eq('user_id', userId)
      .select()
      .single()

    if (error) {
      console.error('Erro ao atualizar configurações:', error)
      return NextResponse.json({ error: 'Erro ao atualizar configurações' }, { status: 500 })
    }

    return NextResponse.json({ settings })
  } catch (error) {
    console.error('Erro na API de configurações:', error)
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 })
  }
}


