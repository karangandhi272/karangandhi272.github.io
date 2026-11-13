-- UniCombined waitlist: table + row level security
-- Paste into the Supabase SQL editor and run it. Safe to run more than once.
--
-- The landing page (public/unicombined/index.html) inserts with the publishable
-- (anon) key and `Prefer: return=minimal`, so anon only needs INSERT on `email`.
-- Anon can't read, update or delete anything.

-- 1. Table ---------------------------------------------------------------------
create table if not exists public.waitlist (
  id         uuid        primary key default gen_random_uuid(),
  email      text        not null unique,
  created_at timestamptz not null default now()
);

-- 2. Constraints (added separately so they also apply if the table already existed)
do $$
begin
  if not exists (
    select 1 from pg_constraint
    where conname = 'waitlist_email_normalized'
      and conrelid = 'public.waitlist'::regclass
  ) then
    alter table public.waitlist
      add constraint waitlist_email_normalized
      check (email = lower(btrim(email)));
  end if;

  if not exists (
    select 1 from pg_constraint
    where conname = 'waitlist_email_format'
      and conrelid = 'public.waitlist'::regclass
  ) then
    alter table public.waitlist
      add constraint waitlist_email_format
      check (char_length(email) <= 254 and email ~ '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$');
  end if;
end
$$;

-- Case-insensitive uniqueness (the check above already forces lowercase; this
-- also covers any rows that were added before the check existed).
create unique index if not exists waitlist_email_lower_key
  on public.waitlist (lower(email));

-- 3. Privileges ----------------------------------------------------------------
-- Supabase grants ALL on new public tables to anon/authenticated by default.
-- Lock that down: anon may only INSERT, and only the email column (id and
-- created_at always come from the defaults).
revoke all on table public.waitlist from anon, authenticated;
grant insert (email) on table public.waitlist to anon;

-- 4. Row level security --------------------------------------------------------
alter table public.waitlist enable row level security;

drop policy if exists "anon can join waitlist" on public.waitlist;
create policy "anon can join waitlist"
  on public.waitlist
  for insert
  to anon
  with check (true);  -- format is enforced by the check constraints above

-- No SELECT / UPDATE / DELETE policies exist for anon, so with RLS enabled
-- those operations are denied. View signups in the dashboard (Table Editor)
-- or with the service role / secret key.

-- 5. Optional: there is already a table named public."Waitlist" (capital W,
-- column "Email") in this project. If it has signups you want to keep, copy
-- them over, then drop the old table once you've checked the result:
--
-- insert into public.waitlist (email)
-- select distinct lower(btrim("Email")) from public."Waitlist"
-- where "Email" is not null
--   and lower(btrim("Email")) ~ '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$'
-- on conflict do nothing;
--
-- drop table public."Waitlist";
