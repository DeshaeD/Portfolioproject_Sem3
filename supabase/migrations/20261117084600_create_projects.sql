-- Applied to the portfolio-sem3 Supabase project. Kept here so the schema lives in version control.

create type public.title_style as enum ('solid', 'outline', 'pale');

create table public.projects (
  id            bigint generated always as identity primary key,
  slug          text not null unique,
  sort_order    integer not null default 0,
  published     boolean not null default true,
  kicker        text,
  title_top     text not null,
  title_top_style    public.title_style not null default 'pale',
  title_bottom  text not null,
  title_bottom_style public.title_style not null default 'solid',
  body          text not null,
  tools         text[] not null default '{}',
  image_url     text,
  image_alt     text,
  caption       text,
  created_at    timestamptz not null default now(),
  constraint image_needs_alt check (image_url is null or image_alt is not null)
);

create index projects_order_idx on public.projects (sort_order, id) where published;

alter table public.projects enable row level security;

-- Visitors (anon key) may only read published projects; nobody can write through the public API.
create policy "Published projects are readable by everyone"
  on public.projects for select
  to anon, authenticated
  using (published);
