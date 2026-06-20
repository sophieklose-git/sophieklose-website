-- Phase 11c: resources catalogue
-- Single table; group is a string column (groups carry no metadata of their own;
-- their eyebrow/title live in content/pages/resources.md).

create table if not exists public.resources (
    id uuid primary key default gen_random_uuid(),
    slug text not null unique,
    title text not null,
    tag text not null,
    description text,
    link_label text,
    link_url text,
    group_slug text not null,
    sort_order int not null default 0,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

create index if not exists resources_group_slug_idx on public.resources (group_slug, sort_order);

alter table public.resources enable row level security;

-- Public read; writes restricted to service role (which bypasses RLS).
drop policy if exists "resources public read" on public.resources;
create policy "resources public read"
    on public.resources
    for select
    using (true);
