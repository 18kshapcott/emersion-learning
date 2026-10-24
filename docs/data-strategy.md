# Data strategy recommendation

## Recommendation

Choose Supabase as the target backend for the next production-ready architecture.

### Why Supabase fits this project

- Postgres database for structured case data and analytics
- built-in authentication and role management
- storage for case media and uploaded assets
- row-level security for faculty/student separation
- easier migration path from localStorage and Google Sheets
- strong fit for a static app or lightweight front end

## Target architecture

### Front end

- HTML/JavaScript or a small framework such as React/Vite
- static page or lightweight SPA
- API calls to Supabase

### Backend

- Supabase Postgres
- Auth
- Storage
- Realtime (optional for live dashboards)

### Data model

Use a small set of core tables:

- `users`
  - id
  - email
  - role
  - display_name
  - institution

- `cases`
  - id
  - title
  - author_id
  - institution_id
  - schema_version
  - status
  - case_json
  - created_at
  - updated_at

- `sessions`
  - id
  - user_id
  - case_id
  - started_at
  - ended_at
  - duration_seconds
  - score
  - confidence
  - status

- `query_events`
  - id
  - session_id
  - query_text
  - normalized_query
  - category
  - matched_field
  - result_found
  - timestamp

- `attempts`
  - id
  - session_id
  - diagnosis_text
  - plan_text
  - monitoring_text
  - score
  - submitted_at

- `analytics_snapshot`
  - id
  - session_id
  - key_metrics_json
  - generated_at

### Storage

Use Supabase Storage for:

- uploaded images
- case artifacts
- faculty-generated documents
- exported SOAP notes

## Why not keep the current model

The current model is good for a prototype, but it creates problems:

- no role-aware access
- no typed schemas
- difficult auditing of case edits
- poor ability to scale analytics
- weak separation of student and faculty workflows

## Migration path from current state

### Phase 1

Keep current static app but define a canonical case schema and export/import utilities.

### Phase 2

Move case storage into Supabase Postgres while keeping the same UI patterns.

### Phase 3

Add auth and user roles.

### Phase 4

Build analytics dashboards and faculty review tools.

## Alternative option: Firebase

Firebase is also a reasonable choice if the project prefers a more JavaScript-native stack. It offers:

- authentication
- Firestore
- Cloud Storage
- easy deployment in a JS-first environment

However, Supabase is usually a stronger fit for a research- and education-focused application because of Postgres and SQL-based analysis.

## Recommendation summary

Target architecture:

- Front end: static app or lightweight SPA
- Auth: Supabase Auth
- Database: Supabase Postgres
- Storage: Supabase Storage
- Analytics: SQL queries + optional dashboard tooling

This gives the project a durable migration path without forcing a major rebuild immediately.
