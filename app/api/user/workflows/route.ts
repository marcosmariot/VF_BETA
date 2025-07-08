import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { createClerkSupabaseClient } from '@/lib/supabase'

// GET - Listar workflows do usuário
export async function GET(request: NextRequest) {
  try {
    const { userId } = await auth()
    
    if (!userId) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    const supabase = await createClerkSupabaseClient()
    
    const { data: workflows, error } = await supabase
      .from('user_workflows')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Erro ao buscar workflows:', error)
      return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 })
    }

    return NextResponse.json({ workflows })
  } catch (error) {
    console.error('Erro na API de workflows:', error)
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 })
  }
}

// POST - Criar novo workflow
export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth()
    
    if (!userId) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    const body = await request.json()
    const { name, description, workflow_data, is_public = false } = body

    if (!name || !workflow_data) {
      return NextResponse.json({ error: 'Nome e dados do workflow são obrigatórios' }, { status: 400 })
    }

    const supabase = await createClerkSupabaseClient()
    
    const { data: workflow, error } = await supabase
      .from('user_workflows')
      .insert({
        user_id: userId,
        name,
        description,
        workflow_data,
        is_public
      })
      .select()
      .single()

    if (error) {
      console.error('Erro ao criar workflow:', error)
      return NextResponse.json({ error: 'Erro ao criar workflow' }, { status: 500 })
    }

    return NextResponse.json({ workflow }, { status: 201 })
  } catch (error) {
    console.error('Erro na API de workflows:', error)
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 })
  }
}

