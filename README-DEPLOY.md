# Deploy no Railway - Vertical Fashion

## Correções Realizadas

### 1. Dockerfile
- Adicionado `git` às dependências
- Corrigido comando de inicialização: `CMD ["node", "server.js"]`
- Descomentado `USER nextjs` para segurança
- Adicionado `.dockerignore` para otimizar build

### 2. Correções de TypeScript
- Corrigido `auth()` para `await auth()` em todos os arquivos de API:
  - `app/api/user/history/route.ts`
  - `app/api/user/settings/route.ts`
  - `app/api/user/workflows/route.ts`
  - `app/api/user/workflows/[id]/route.ts`
  - `lib/supabase.ts`

### 3. Configuração Railway
- Criado `railway.json` e `railway.toml` para configuração de deploy
- Configurado healthcheck e políticas de restart

### 4. Variáveis de Ambiente
- Criado `.env.example` com todas as variáveis necessárias
- Adicionado valores padrão para evitar erros de build

### 5. Arquivo Faltante
- Criado `view_comfy.json` que estava sendo referenciado mas não existia

## Como fazer o deploy no Railway

### 1. Preparar o repositório GitHub
```bash
git init
git add .
git commit -m "Initial commit - ready for Railway deploy"
git branch -M main
git remote add origin <seu-repositorio-github>
git push -u origin main
```

### 2. Configurar variáveis de ambiente no Railway
No painel do Railway, configure as seguintes variáveis:

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_key_here
CLERK_SECRET_KEY=sk_test_your_secret_key_here
NEXT_PUBLIC_USER_MANAGEMENT=true
NEXT_PUBLIC_VIEW_MODE=production
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

### 3. Deploy no Railway
1. Conecte seu repositório GitHub ao Railway
2. O Railway detectará automaticamente o Dockerfile
3. O build será executado automaticamente
4. A aplicação estará disponível na URL fornecida pelo Railway

## Estrutura do Projeto
- Next.js 14 com App Router
- Clerk para autenticação
- Supabase para banco de dados
- Docker para containerização
- Railway para deploy

## Notas Importantes
- O projeto usa `output: "standalone"` no Next.js para otimizar o Docker
- As rotas de API são dinâmicas e requerem autenticação
- O middleware do Clerk está configurado para proteger rotas
- O build pode apresentar warnings sobre deprecação do punycode (normal)

## Troubleshooting
- Se houver erros de autenticação, verifique as chaves do Clerk
- Se houver erros de banco, verifique as configurações do Supabase
- Para logs detalhados, use `railway logs` no CLI do Railway

