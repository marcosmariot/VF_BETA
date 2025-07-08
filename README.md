# Vertical Fashion - SaaS de Design de Moda com IA

![Vertical Fashion](https://img.shields.io/badge/Status-Pronto%20para%20Produção-brightgreen)
![Next.js](https://img.shields.io/badge/Next.js-14.2.26-black)
![React](https://img.shields.io/badge/React-18.3.1-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Tailwind](https://img.shields.io/badge/Tailwind-3.4.1-cyan)

## 🎨 Sobre o Projeto

O **Vertical Fashion** é um SaaS (Software as a Service) completo para design de moda com inteligência artificial. A plataforma permite que designers e empresas de moda criem designs únicos e profissionais usando workflows avançados de IA, baseados na tecnologia ComfyUI.

### ✨ Principais Funcionalidades

- **🤖 IA Generativa**: Crie designs únicos usando modelos de IA especializados em moda
- **⚡ Workflows Personalizados**: Configure fluxos de trabalho específicos para suas necessidades
- **👥 Gerenciamento de Usuários**: Sistema completo de autenticação e perfis
- **📊 Dashboard Intuitivo**: Interface moderna e responsiva
- **🔒 Segurança**: Proteção de dados com criptografia de ponta a ponta
- **🌐 Colaboração**: Compartilhe workflows e trabalhe em equipe
- **📱 Responsivo**: Funciona perfeitamente em desktop e mobile

## 🏗️ Arquitetura

### Stack Tecnológico

- **Frontend**: Next.js 14 + React 18 + TypeScript
- **UI/UX**: Shadcn/UI + Tailwind CSS + Lucide Icons
- **Autenticação**: Clerk (gerenciamento completo de usuários)
- **Banco de Dados**: Supabase (PostgreSQL com APIs automáticas)
- **Deploy**: Vercel (frontend) + integração com serviços externos
- **IA**: Integração com ComfyUI para workflows de IA

### Arquitetura de Componentes

```
vertical-fashion/
├── app/                    # Next.js App Router
│   ├── dashboard/         # Páginas do dashboard
│   ├── api/              # API routes
│   └── globals.css       # Estilos globais
├── components/           # Componentes React
│   ├── dashboard/       # Componentes do dashboard
│   ├── ui/             # Componentes de UI (Shadcn)
│   └── auth/           # Componentes de autenticação
├── lib/                # Utilitários e configurações
├── supabase/          # Migrações e esquemas do banco
└── public/            # Assets estáticos
```

## 🚀 Início Rápido

### Pré-requisitos

- Node.js 18.0 ou superior
- npm ou yarn
- Contas nos serviços: Clerk, Supabase, Vercel

### Instalação

1. **Clone o repositório**
```bash
git clone https://github.com/seu-usuario/vertical-fashion.git
cd vertical-fashion
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure as variáveis de ambiente**
```bash
cp .env.example .env.local
```

Preencha o arquivo `.env.local` com suas chaves de API:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://...supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...

# ViewComfy Configuration
NEXT_PUBLIC_VIEW_MODE="true"
NEXT_PUBLIC_USER_MANAGEMENT="true"
```

4. **Configure o banco de dados**
- Execute o script SQL em `supabase/migrations/001_initial_schema.sql` no seu projeto Supabase

5. **Inicie o servidor de desenvolvimento**
```bash
npm run dev
```

Acesse `http://localhost:3000` para ver a aplicação rodando.

## 📚 Documentação Completa

Para um guia completo de implantação, consulte o **[Tutorial de Implantação](tutorial-implantacao-vertical-fashion.md)** que inclui:

- Configuração detalhada de todos os serviços
- Deploy para produção
- Configurações de segurança
- Monitoramento e manutenção
- Resolução de problemas

## 🎯 Funcionalidades Principais

### Dashboard Principal
- Visão geral de métricas e atividades
- Acesso rápido a todas as funcionalidades
- Interface responsiva e intuitiva

### AI Studio
- Interface para criação de designs com IA
- Configuração de parâmetros avançados
- Preview em tempo real
- Histórico de gerações

### Gerenciamento de Workflows
- Criação e edição de workflows personalizados
- Compartilhamento entre usuários
- Versionamento e backup

### Sistema de Usuários
- Autenticação segura com Clerk
- Perfis personalizáveis
- Controle de acesso baseado em roles
- Planos de assinatura

## 🔧 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev          # Inicia servidor de desenvolvimento
npm run build        # Build para produção
npm run start        # Inicia servidor de produção
npm run lint         # Executa linting

# Utilitários
npm run type-check   # Verificação de tipos TypeScript
```

## 🌐 Deploy

### Vercel (Recomendado)

1. Conecte seu repositório GitHub à Vercel
2. Configure as variáveis de ambiente
3. Deploy automático a cada push

### Outras Plataformas

O projeto é compatível com qualquer plataforma que suporte Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🔐 Segurança

- **Autenticação**: Clerk com JWT tokens
- **Autorização**: Row Level Security (RLS) no Supabase
- **HTTPS**: Forçado em produção
- **Headers de Segurança**: Configurados no Next.js
- **Validação**: Zod para validação de dados

## 📊 Monitoramento

- **Analytics**: Vercel Analytics integrado
- **Logs**: Centralizados na Vercel e Supabase
- **Erros**: Tracking automático de erros
- **Performance**: Core Web Vitals monitorados

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 🆘 Suporte

- **Documentação**: Consulte o tutorial completo de implantação
- **Issues**: Abra uma issue no GitHub para bugs ou sugestões
- **Discussões**: Use as discussões do GitHub para dúvidas gerais

## 🎉 Agradecimentos

- **ViewComfy**: Base para integração com ComfyUI
- **Shadcn/UI**: Componentes de interface
- **Clerk**: Sistema de autenticação
- **Supabase**: Backend como serviço
- **Vercel**: Plataforma de deploy

---

**Desenvolvido com ❤️ por Manus AI**

*Transforme suas ideias de moda em realidade com o poder da inteligência artificial.*

