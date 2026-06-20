-- Phase 11d: book club selections
-- One row per monthly pick. `selection_month` is the first of the month and
-- drives display order (newest first). `reflection_md` is added at month-end.

create table if not exists public.book_club_selections (
    id uuid primary key default gen_random_uuid(),
    slug text not null unique,
    selection_month date not null,
    title text not null,
    author text not null,
    cover_url text,
    purchase_url text,
    purchase_label text,
    intro_md text not null,
    reflection_md text,
    is_published boolean not null default true,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

create index if not exists book_club_selections_month_idx
    on public.book_club_selections (selection_month desc);

alter table public.book_club_selections enable row level security;

drop policy if exists "book_club_selections public read" on public.book_club_selections;
create policy "book_club_selections public read"
    on public.book_club_selections
    for select
    using (is_published);
