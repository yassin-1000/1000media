create table if not exists public.story_feedback_summary (
  fingerprint text primary key,
  client_id text not null,
  section text not null check (section in ('human', 'realtime')),
  title text not null,
  subject text,
  source_urls jsonb not null default '[]'::jsonb,
  likes integer not null default 0,
  dislikes integer not null default 0,
  last_action text check (last_action in ('like', 'dislike')),
  updated_at timestamptz not null default now()
);

create index if not exists story_feedback_summary_client_section_idx
  on public.story_feedback_summary (client_id, section);

create table if not exists public.client_preference_terms (
  client_id text not null,
  term text not null,
  liked_score integer not null default 0,
  disliked_score integer not null default 0,
  updated_at timestamptz not null default now(),
  primary key (client_id, term)
);

create index if not exists client_preference_terms_client_idx
  on public.client_preference_terms (client_id);

alter table public.story_feedback_summary enable row level security;
alter table public.client_preference_terms enable row level security;

create policy "service role full access story feedback"
on public.story_feedback_summary
for all
using (auth.role() = 'service_role')
with check (auth.role() = 'service_role');

create policy "service role full access preference terms"
on public.client_preference_terms
for all
using (auth.role() = 'service_role')
with check (auth.role() = 'service_role');
