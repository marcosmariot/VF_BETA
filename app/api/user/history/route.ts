import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { createClerkSupabaseClient } from '@/lib/supabase'

// GET - Listar histórico de gerações do usuário
export async function GET(request: NextRequest) {
  try {
    const { userId } = await auth()
    
    if (!userId) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '20')
    const offset = parseInt(searchParams.get('offset') || '0')

    const supabase = await createClerkSupabaseClient()
    
    const { data: history, error } = await supabase
      .from('generation_history')
      .select(`
        *,
        user_workflows (
          name,
          description
        )
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1)

    if (error) {
      console.error('Erro ao buscar histórico:', error)
      return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 })
    }

    return NextResponse.json({ history })
  } catch (error) {
    console.error('Erro na API de histórico:', error)
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 })
  }
}

// POST - Adicionar nova geração ao histórico
export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth()
    
    if (!userId) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    const body = await request.json()
    const { workflow_id, input_data, output_data, status = 'completed' } = body

    if (!workflow_id || !input_data) {
      return NextResponse.json({ error: 'Dados obrigatórios não fornecidos' }, { status: 400 })
    }

    const supabase = await createClerkSupabaseClient()
    
    const { data: generation, error } = await supabase
      .from('generation_history')
      .insert({
        user_id: userId,
        workflow_id,
        input_data,
        output_data,
        status
      })
      .select()
      .single()

    if (error) {
      console.error('Erro ao salvar geração:', error)
      return NextResponse.json({ error: 'Erro ao salvar geração' }, { status: 500 })
    }

    // Atualizar contador de gerações do usuário
    await supabase.rpc('increment_generation_count', { user_id: userId })

    return NextResponse.json({ generation }, { status: 201 })
  } catch (error) {
    console.error('Erro na API de histórico:', error)
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 })
  }
}

