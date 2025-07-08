-- Criar extensões necessárias
create extension if not exists "uuid-ossp";

-- Tabela para workflows de usuários
create table public.user_workflows (
  id uuid default uuid_generate_v4() primary key,
  user_id text not null,
  name text not null,
  description text,
  workflow_data jsonb not null,
  is_public boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Tabela para histórico de gerações
create table public.generation_history (
  id uuid default uuid_generate_v4() primary key,
  user_id text not null,
  workflow_id uuid references public.user_workflows(id) on delete cascade,
  input_data jsonb not null,
  output_data jsonb,
  status text check (status in ('pending', 'completed', 'failed')) default 'pending',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Tabela para configurações de usuários
create table public.user_settings (
  id uuid default uuid_generate_v4() primary key,
  user_id text unique not null,
  plan text check (plan in ('free', 'premium', 'pro')) default 'free',
  generation_count integer default 0,
  max_generations integer default 10,
  settings jsonb default '{}',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Índices para melhor performance
create index idx_user_workflows_user_id on public.user_workflows(user_id);
create index idx_user_workflows_public on public.user_workflows(is_public) where is_public = true;
create index idx_generation_history_user_id on public.generation_history(user_id);
create index idx_generation_history_workflow_id on public.generation_history(workflow_id);
create index idx_user_settings_user_id on public.user_settings(user_id);

-- Função para incrementar contador de gerações
create or replace function increment_generation_count(user_id text)
returns void as $$
begin
  insert into public.user_settings (user_id, generation_count)
  values (user_id, 1)
  on conflict (user_id)
  do update set 
    generation_count = user_settings.generation_count + 1,
    updated_at = now();
end;
$$ language plpgsql;

-- RLS (Row Level Security) Policies
alter table public.user_workflows enable row level security;
alter table public.generation_history enable row level security;
alter table public.user_settings enable row level security;

-- Políticas para user_workflows
create policy "Usuários podem ver seus próprios workflows" on public.user_workflows
  for select using (auth.jwt() ->> 'sub' = user_id);

create policy "Usuários podem ver workflows públicos" on public.user_workflows
  for select using (is_public = true);

create policy "Usuários podem inserir seus próprios workflows" on public.user_workflows
  for insert with check (auth.jwt() ->> 'sub' = user_id);

create policy "Usuários podem atualizar seus próprios workflows" on public.user_workflows
  for update using (auth.jwt() ->> 'sub' = user_id);

create policy "Usuários podem deletar seus próprios workflows" on public.user_workflows
  for delete using (auth.jwt() ->> 'sub' = user_id);

-- Políticas para generation_history
create policy "Usuários podem ver seu próprio histórico" on public.generation_history
  for select using (auth.jwt() ->> 'sub' = user_id);

create policy "Usuários podem inserir em seu próprio histórico" on public.generation_history
  for insert with check (auth.jwt() ->> 'sub' = user_id);

-- Políticas para user_settings
create policy "Usuários podem ver suas próprias configurações" on public.user_settings
  for select using (auth.jwt() ->> 'sub' = user_id);

create policy "Usuários podem inserir suas próprias configurações" on public.user_settings
  for insert with check (auth.jwt() ->> 'sub' = user_id);

create policy "Usuários podem atualizar suas próprias configurações" on public.user_settings
  for update using (auth.jwt() ->> 'sub' = user_id);

-- Trigger para atualizar updated_at automaticamente
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger update_user_workflows_updated_at
  before update on public.user_workflows
  for each row execute function update_updated_at_column();

create trigger update_user_settings_updated_at
  before update on public.user_settings
  for each row execute function update_updated_at_column();

