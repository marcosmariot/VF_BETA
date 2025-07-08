import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Para demonstração, apenas permitir todas as rotas
  return NextResponse.next()
}

export const config = {
  matcher: [
    // Pular arquivos internos do Next.js e todos os arquivos estáticos
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Sempre executar para rotas da API
    '/(api|trpc)(.*)',
  ],
}

