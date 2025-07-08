import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { createClerkSupabaseClient } from '@/lib/supabase'

// GET - Buscar workflow específico
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = await auth()
    
    if (!userId) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    const supabase = await createClerkSupabaseClient()
    
    const { data: workflow, error } = await supabase
      .from('user_workflows')
      .select('*')
      .eq('id', params.id)
      .eq('user_id', userId)
      .single()

    if (error) {
      console.error('Erro ao buscar workflow:', error)
      return NextResponse.json({ error: 'Workflow não encontrado' }, { status: 404 })
    }

    return NextResponse.json({ workflow })
  } catch (error) {
    console.error('Erro na API de workflow:', error)
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 })
  }
}

// PUT - Atualizar workflow
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = await auth()
    
    if (!userId) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    const body = await request.json()
    const { name, description, workflow_data, is_public } = body

    const supabase = await createClerkSupabaseClient()
    
    const { data: workflow, error } = await supabase
      .from('user_workflows')
      .update({
        name,
        description,
        workflow_data,
        is_public,
        updated_at: new Date().toISOString()
      })
      .eq('id', params.id)
      .eq('user_id', userId)
      .select()
      .single()

    if (error) {
      console.error('Erro ao atualizar workflow:', error)
      return NextResponse.json({ error: 'Erro ao atualizar workflow' }, { status: 500 })
    }

    return NextResponse.json({ workflow })
  } catch (error) {
    console.error('Erro na API de workflow:', error)
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 })
  }
}

// DELETE - Deletar workflow
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = await auth()
    
    if (!userId) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    const supabase = await createClerkSupabaseClient()
    
    const { error } = await supabase
      .from('user_workflows')
      .delete()
      .eq('id', params.id)
      .eq('user_id', userId)

    if (error) {
      console.error('Erro ao deletar workflow:', error)
      return NextResponse.json({ error: 'Erro ao deletar workflow' }, { status: 500 })
    }

    return NextResponse.json({ message: 'Workflow deletado com sucesso' })
  } catch (error) {
    console.error('Erro na API de workflow:', error)
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 })
  }
}

