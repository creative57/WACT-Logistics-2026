create table if not exists public.quote_requests (
  id                 uuid primary key default gen_random_uuid(),
  name               text not null,
  phone              text not null,
  zip                text,
  material           text not null,
  quantity           numeric,
  unit               text,
  preferred_date     date,
  pickup_or_delivery text,
  status             text not null default 'new',
  notes              text,
  created_at         timestamptz not null default now()
);

-- Only authenticated (admin) users can read/update; the API route inserts as service_role
alter table public.quote_requests enable row level security;

create policy "Admin read" on public.quote_requests
  for select using (auth.role() = 'authenticated');

create policy "Admin update" on public.quote_requests
  for update using (auth.role() = 'authenticated');

-- Allow the anon key (used in the public API route) to insert
create policy "Public insert" on public.quote_requests
  for insert with check (true);
