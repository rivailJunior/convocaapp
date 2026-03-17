# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

SportsPay — platform for managing sports group payments and event attendance. Brazilian market (UI in Portuguese, code in English).

**Monorepo**: Turborepo + pnpm with three packages:
- `packages/app` — React Native + Expo SDK 51 (iOS & Android)
- `packages/web` — Next.js 14 App Router (frontend + API Routes + cron endpoints)
- `packages/shared` — TypeScript types, Zod schemas, utils (zero runtime deps)

**Current state**: Phase 0 (scaffolding). Only planning docs exist — no implementation code yet.

## Commands

```bash
pnpm install                    # Install all dependencies
pnpm turbo dev                  # Run all packages in parallel
pnpm --filter app start         # Expo dev server
pnpm --filter web dev           # Next.js dev server
pnpm --filter shared build      # Build shared package
pnpm turbo lint                 # Lint all packages
pnpm turbo type-check           # Type-check all packages
```

## Architecture Rules

- **No separate backend** — Next.js API Routes ARE the backend. No Express, no NestJS.
- **Firestore only** — No SQL, no DynamoDB. Admin SDK for all writes; client SDK read-only (except `onSnapshot` for attendance).
- **Amounts in centavos** — All monetary values are integers. `5000` = R$50,00. Never use floats.
- **Google OAuth only (MVP)** — No SMS, no email/password. Firebase Auth.
- **S3 pre-signed URLs** — Client uploads directly to S3. API never proxies files.
- **Cron via AWS EventBridge** — Cron endpoints protected by `x-cron-secret` header.
- **Real-time is rare** — `onSnapshot` ONLY for attendance list. Everything else uses React Query polling.
- **Asaas payment gateway** — Brazilian Pix + credit card. Webhook with HMAC verification.

## Code Style

- TypeScript strict mode. No `any`. No `enum` — use `as const` objects or string unions.
- Files: kebab-case. Components: PascalCase with named exports (default exports only for Next.js pages/layouts).
- Booleans prefixed with `is`, `has`, `can`, `should`.
- 2-space indent, single quotes, trailing commas. Prettier is source of truth.
- Import order: Node builtins → external → `@sportspay/*` → relative → type-only last.
- API Routes pattern: verify token → check permissions → validate body with Zod → business logic → structured JSON response.
- Error responses: `{ error: string, code?: string }` with correct HTTP status. Never expose stack traces.
- Comments explain **why**, not **what**. JSDoc for shared package exports.

## Key Files

- `TODO.md` — Master task list organized by phase. Source of truth for what to build next.
- `.windsurf/rules/` — 14 rule files covering every aspect of the stack. Read the relevant rule before working on a feature:
  - `00-project-overview` — Stack decisions, structure
  - `01-code-style` — TypeScript, naming, formatting
  - `02-nextjs-web` — App Router, API Routes, SSR, shadcn/ui
  - `03-expo-app` — Expo Router, navigation, NativeWind
  - `04-firebase-firestore` — Data model, queries, security rules
  - `05-authentication` — Google OAuth flows
  - `06-payments-asaas` — Payment integration, webhooks
  - `07-aws-services` — S3, EventBridge, Amplify, env vars
  - `08-shared-package` — Types, schemas, utils boundaries
  - `09-whatsapp` — Link templates, message formats
  - `10-roadmap` — Phase tracker
  - `11-billing-diaristas-treasury` — Billing modes, guest payments, treasury
  - `12-team-draw-attendance` — Attendance, payment blocking, Fisher-Yates shuffle
  - `13-match-stats-voting` — Post-game voting, rankings, badges
- `.env.example` — All required environment variables

## Data Model (Firestore Collections)

- `users/{uid}` — Profile, groupIds, adminGroupIds, fcmToken
- `groups/{groupId}` — Name, sport, billingMode (`fixed` | `field_split`), members, payment config
- `payments/{paymentId}` — Monthly charges (groupId, userId, amount in centavos, status, referenceMonth)
- `events/{eventId}` — Scheduled events with recurrence
- `events/{eventId}/attendances/{uid}` — Real-time attendance (confirmed/declined/maybe/pending)
- `guests/{guestId}` — Diarista (guest) payments per event
- `treasury/{entryId}` — Group cash register (in/out entries)
- `invites/{code}` — Group invite links (6-char code, expiry)

## State Management

- **Zustand** for client state
- **React Query** for server state (`staleTime: 60_000`, `retry: 2`)
- **react-hook-form** + **Zod** for forms

## Out of Scope

Never implement without explicit discussion: SMS/OTP auth, separate backend server, direct Firestore writes from client, DynamoDB/SQL, AWS SNS for push, Stripe, manual venue booking confirmation.
