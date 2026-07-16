-- ============================================================
-- VDSO — Supabase Schema
-- Plak dit in Supabase → SQL Editor → New query → Run
-- ============================================================

-- Cars tabel
create table if not exists public.cars (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),
  merk          text not null,
  model         text not null,
  jaar          int  not null,
  pk            int  not null default 0,
  kmstand       int  not null default 0,
  prijs         int  not null default 0,
  badge_status  text not null default 'net_binnen'
                  check (badge_status in ('wordt_verwacht','net_binnen','beschikbaar','bijna_weg','gereserveerd','verkocht')),
  fotos         text[] not null default '{}',
  omschrijving  text,
  is_visible    boolean not null default true
);

-- Settings tabel (1 rij)
create table if not exists public.settings (
  id              int primary key default 1,
  phone           text not null default '+31 6 22580038',
  adres           text not null default 'Markt 1, Deurne',
  openingstijden  text not null default 'Ma–Vr 09:00–18:00 · Za 10:00–16:00',
  preview_mode    boolean not null default false,
  constraint settings_single_row check (id = 1)
);

-- Initiële settings rij
insert into public.settings (id) values (1)
on conflict (id) do nothing;

-- ============================================================
-- Row Level Security
-- ============================================================

alter table public.cars    enable row level security;
alter table public.settings enable row level security;

-- Publiek: alleen zichtbare auto's lezen
create policy "public read visible cars"
  on public.cars for select
  using (is_visible = true);

-- Admin (ingelogd): alles lezen & schrijven
create policy "admin full access cars"
  on public.cars for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- Settings: publiek leesbaar (voor preview_mode check)
create policy "public read settings"
  on public.settings for select
  using (true);

-- Settings: alleen admin mag updaten
create policy "admin update settings"
  on public.settings for update
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- ============================================================
-- Storage bucket voor auto foto's
-- Maak aan via Supabase → Storage → New bucket
-- Naam: car-photos  |  Public: ja
-- ============================================================

-- Of via SQL (als de bucket nog niet bestaat):
insert into storage.buckets (id, name, public)
values ('car-photos', 'car-photos', true)
on conflict (id) do nothing;

-- RLS policies voor storage.objects (car-photos bucket)
-- Zonder deze policies geeft upload: "new row violates row-level security policy"
create policy "public read car-photos"
  on storage.objects for select
  using (bucket_id = 'car-photos');

create policy "admin upload car-photos"
  on storage.objects for insert
  with check (bucket_id = 'car-photos' and auth.role() = 'authenticated');

create policy "admin update car-photos"
  on storage.objects for update
  using (bucket_id = 'car-photos' and auth.role() = 'authenticated')
  with check (bucket_id = 'car-photos' and auth.role() = 'authenticated');

create policy "admin delete car-photos"
  on storage.objects for delete
  using (bucket_id = 'car-photos' and auth.role() = 'authenticated');
