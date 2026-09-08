# Technology stack and setup

## 1. Selected stack

| Layer | Selection | Reason |
|---|---|---|
| Application | Next.js App Router + TypeScript | One UI/API codebase |
| UI | React, Tailwind CSS, accessible component primitives | Fast consistent forms and layouts |
| Forms | React Hook Form + Zod | Typed validation and field errors |
| Client server-state | TanStack Query | Explicit loading, refetch and invalidation |
| Database | Supabase PostgreSQL | Relational workflows and access rules |
| Authentication | Supabase Auth | Managed identity and sessions |
| DB changes | SQL migrations + generated database types | Reviewable constraints and policies |
| Business API | Next.js route handlers, REST JSON | Small clear service boundary |
| Tests | Vitest, Playwright, SQL authorization tests | Logic, journeys and isolation |
| Optional files | Supabase private Storage, P1 | Evidence attachments after safe handling |
| Optional AI | Provider-neutral server adapter, P1 | Drafting without product dependency |

This is a proposed selection. Exact dependency versions must be checked together at implementation kickoff, installed as compatible stable releases and recorded in a lockfile. Do not blindly install “latest” during the final demo freeze. Official framework and authentication references are provided in the source register. [S4–S6]

## 2. Deliberate exclusions

Do not add Express/NestJS alongside Next.js merely to call it a backend. Do not introduce Python for a deterministic weighted formula. Do not use a vector database when a curated 20–30 skill catalog is enough. Do not use blockchain to make a reviewer opinion look more authoritative. Do not require OAuth integrations with GitHub, LinkedIn or a job portal for the core demo.

Avoid two competing data-access systems. Use the Supabase client with typed database calls and SQL functions for P0; Prisma or Drizzle can be reconsidered if the team's migration/data-access needs justify one. Avoid Redis until a concrete shared cache or rate-limiting need exceeds the database-backed approach.

## 3. Setup checklist

Create a private source repository, isolated development/demo database projects, application hosting project and environment example file. Choose one package manager for the team and commit its lockfile. Install a runtime supported by the selected Next.js release and record it in the repository. Enable email/password authentication for seeded demo accounts; avoid email delivery as a presentation dependency. Human users should use proper account registration in a pilot.

Store migrations, seed scripts and permission tests in version control. Run migrations against an empty database before UI implementation. Configure authentication redirect URLs for local and demo environments. Use separate student, reviewer and recruiter accounts. Never ship an endpoint that creates arbitrary privileged users to make role switching easier.

## 4. Configuration contract

| Variable | Visibility | Purpose |
|---|---|---|
| NEXT_PUBLIC_APP_URL | Public | Canonical UI origin |
| NEXT_PUBLIC_SUPABASE_URL | Public | Supabase endpoint |
| NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY | Public | Client key protected by grants/RLS |
| SUPABASE_SERVICE_ROLE_KEY | Secret, optional | Controlled admin/seed job only |
| AI_PROVIDER_API_KEY | Secret, optional | P1 draft generation |
| AI_MODEL | Server config | Explicit chosen model |
| DEMO_MODE | Server config | Enables synthetic banners and safe fixtures |
| ENABLE_AI_DRAFTS | Server config | Defaults false |

The .env.example contains names and harmless placeholders only. Service-role availability must not cause ordinary route handlers to bypass row authorization. Demo mode does not disable security. A browser role switch can select accounts in a dedicated local fixture build only; hosted demo accounts authenticate normally.

## 5. Budget model

Do not promise a permanently free deployment. Estimate monthly cost as hosting + database/auth + storage + email + optional AI usage. Set a team-approved spending cap before enabling paid usage. For AI, estimate calls multiplied by average input/output tokens and the provider's current rates, then add a retry margin. These documents contain no quoted provider prices because pricing was not assessed.

The P0 demo can avoid AI spending entirely. Text evidence reduces storage needs. Disable unused integrations. Review actual usage during a pilot before selecting a production plan. One-time hackathon setup time and ongoing reviewer effort may matter more than hosting expense.

## 6. Alternative decisions

React SPA plus a separate backend is reasonable if the team already has that scaffold, but maintaining two applications is unnecessary from scratch. Firebase is viable for many apps, but this domain has explicit relational constraints and reporting queries that favor Postgres. A custom authentication server would consume effort without improving the signature workflow. A fully local demo is a fallback for presentation continuity, not a substitute for a tested shared deployment.

## 7. Dependency and release discipline

Record framework/runtime versions and environment names in the README. Commit dependency updates separately from business changes. Run type checks, relevant tests and a production build before merging. Do not copy private credentials into an AI prompt or authorize an agent to publish production data. Keep an environment inventory and rotate keys if they have been exposed.
