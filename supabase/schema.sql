-- Caestus Labs — contacts table
-- Run this once in Supabase SQL Editor (Project → SQL → New query → paste → Run).
-- Storage for early-access form submissions from caestuslabs.com.

create extension if not exists pgcrypto;

create table if not exists public.contacts (
  id                   uuid          primary key default gen_random_uuid(),
  name                 text          not null,
  company              text,
  email                text          not null,
  use_case             text          not null,
  message              text,
  user_agent           text,
  source               text          default 'website',
  fingerprint          text,
  submission_timestamp timestamptz   default now(),
  created_at           timestamptz   default now()
);

create index if not exists contacts_email_idx       on public.contacts (email);
create index if not exists contacts_created_at_idx  on public.contacts (created_at desc);

-- Row Level Security: allow public anon inserts only. Reads/updates/deletes
-- require service role (Supabase Studio or your backend).
alter table public.contacts enable row level security;

drop policy if exists "anon can insert leads" on public.contacts;
create policy "anon can insert leads"
  on public.contacts
  for insert
  to anon
  with check (true);

-- Optional rate guard at the DB layer (cheap defense in depth).
drop policy if exists "no anon select" on public.contacts;
create policy "no anon select"
  on public.contacts
  for select
  to anon
  using (false);
