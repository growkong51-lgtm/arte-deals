-- PRO access codes — invitation-only PRO grants for ARTE DEALS agents.
-- Nobody pays. An admin creates a code from the admin panel's "PRO
-- Codes" tab, hands it to an agent, and they redeem it on the Upgrade
-- page. Run this once in the Supabase SQL editor.
--
-- Assumes an is_admin() function already exists (used by the rest of
-- this project's admin-only RLS policies) and a profiles table with
-- is_pro boolean and pro_until timestamptz columns.

create table if not exists pro_codes (
  id          uuid primary key default gen_random_uuid(),
  code        text unique not null,
  label       text,
  max_uses    integer default 1,
  used_count  integer default 0,
  months      integer default 12,
  active      boolean default true,
  created_at  timestamptz default now()
);

alter table pro_codes enable row level security;

-- Only an admin can see or manage codes directly. Redemption (below)
-- deliberately does NOT go through these policies — a regular signed-in
-- user is never granted select/insert/update on this table.
drop policy if exists "pro_codes_admin_select" on pro_codes;
create policy "pro_codes_admin_select" on pro_codes
  for select using (is_admin());

drop policy if exists "pro_codes_admin_insert" on pro_codes;
create policy "pro_codes_admin_insert" on pro_codes
  for insert with check (is_admin());

drop policy if exists "pro_codes_admin_update" on pro_codes;
create policy "pro_codes_admin_update" on pro_codes
  for update using (is_admin()) with check (is_admin());

drop policy if exists "pro_codes_admin_delete" on pro_codes;
create policy "pro_codes_admin_delete" on pro_codes
  for delete using (is_admin());

-- The only way a non-admin ever touches pro_codes: this function runs
-- with the privileges of whoever defined it (security definer), not
-- the caller, so it can read/update pro_codes and profiles even though
-- the calling user has no direct grant on either. Locks the row
-- (for update) before checking used_count, so two people redeeming the
-- same nearly-exhausted code at once can't both succeed.
--
-- Code matching is case- and whitespace-insensitive (upper/trim on
-- both sides) — agents copy-paste and retype these, and a code that
-- fails only because of a stray space or lowercase letter is a worse
-- experience than the tiny loss of strictness.
create or replace function redeem_pro_code(p_code text)
returns text
language plpgsql
security definer
set search_path = public
as $$
declare
  v_row pro_codes%rowtype;
begin
  if auth.uid() is null then
    return 'invalid';
  end if;

  select * into v_row
  from pro_codes
  where upper(trim(code)) = upper(trim(p_code))
  for update;

  if not found or v_row.active is not true then
    return 'invalid';
  end if;

  if v_row.used_count >= v_row.max_uses then
    return 'used_up';
  end if;

  update pro_codes
    set used_count = used_count + 1
    where id = v_row.id;

  update profiles
    set is_pro = true,
        pro_until = now() + (v_row.months || ' months')::interval
    where id = auth.uid();

  return 'ok';
end;
$$;

grant execute on function redeem_pro_code(text) to authenticated;
