# SportsPay

Platform for managing sports group payments and event attendance.

## Monorepo Structure

```
sportspay/
├── packages/
│   ├── app/          # React Native (Expo) — iOS & Android
│   ├── web/          # Next.js 14 — frontend + API + cron
│   └── shared/       # Types, schemas, utils (no runtime deps)
├── .windsurf/
│   └── rules/        # Windsurf AI rules (read before coding)
├── turbo.json
└── package.json
```

## Quick Start

```bash
# Install dependencies
pnpm install

# Run everything in parallel
pnpm turbo dev

# Run individually
pnpm --filter app start    # Expo app
pnpm --filter web dev      # Next.js web + API
```

## Tech Stack

| Layer | Technology |
|-------|-----------|
| App Mobile | React Native + Expo SDK 51 + Expo Router |
| Web + API | Next.js 14 (App Router) |
| Styling (app) | NativeWind (Tailwind for RN) |
| Styling (web) | Tailwind CSS + shadcn/ui |
| State | Zustand + React Query |
| Auth | Firebase Auth — Google OAuth |
| Database | Firebase Firestore |
| Push | Firebase FCM |
| Storage | AWS S3 |
| Payments | Asaas (Pix + card) |
| Hosting (web) | AWS Amplify |
| Cron | AWS EventBridge Scheduler |

## Running Tests

```bash
# Run all tests
pnpm --filter web test

# Run a specific test file
pnpm --filter web test -- <relative_path_to_test_file>
```

## Key Decisions

- **No SMS/OTP**: Google OAuth only in MVP. Eliminates per-SMS cost.
- **No separate backend**: Next.js API Routes serve as the backend. No NestJS, no Express.
- **Firestore real-time**: `onSnapshot` only for event attendance list.
- **Centavos**: All monetary values stored as integers in centavos.
- **Language**: Code in English, UI text in Portuguese (Brazil).

## Environment Variables

Copy `.env.example` to `.env.local` and fill in values.
See `.windsurf/rules/07-aws-services.md` for the full reference.

## AI Rules (Windsurf)

Rules for Cascade AI are in `.windsurf/rules/`. Read them before starting a new feature:

| File | Topic |
|------|-------|
| `00-project-overview.md` | Stack, decisions, structure |
| `01-code-style.md` | TypeScript, naming, formatting |
| `02-nextjs-web.md` | App Router, API Routes, SSR |
| `03-expo-app.md` | Expo Router, auth, navigation |
| `04-firebase-firestore.md` | Data model, queries, Admin SDK |
| `05-authentication.md` | Google OAuth flow (app + web) |
| `06-payments-asaas.md` | Asaas integration, webhooks |
| `07-aws-services.md` | S3, EventBridge, Amplify, env vars |
| `08-shared-package.md` | Types, schemas, utils |
| `09-whatsapp.md` | Link templates, opening WhatsApp |
| `10-roadmap.md` | Phase tracker, what's in/out of scope |
