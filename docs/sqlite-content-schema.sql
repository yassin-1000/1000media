create table if not exists retrieval_runs (
  id integer primary key autoincrement,
  triggered_by text not null default 'system',
  client_scope text,
  status text not null default 'running',
  notes text,
  started_at text not null default (datetime('now')),
  finished_at text
);

create table if not exists curated_stories (
  id integer primary key autoincrement,
  story_fingerprint text not null unique,
  client_id text not null,
  client_name text not null,
  section text not null check (section in ('human', 'realtime')),
  canonical_url text,
  source_domain text,
  title text not null,
  person_or_subject text,
  person_descriptor text,
  event_or_subject text,
  summary text not null,
  why_it_fits text,
  why_could_go_viral text,
  lesson text,
  urgency text,
  platform_hint text,
  published_at text,
  source_urls_json text not null default '[]',
  status text not null default 'ready',
  retrieval_run_id integer,
  created_at text not null default (datetime('now')),
  updated_at text not null default (datetime('now'))
);

create index if not exists curated_stories_client_section_idx
  on curated_stories (client_id, section, status);

create index if not exists curated_stories_published_idx
  on curated_stories (published_at desc);
