# SportsPay — Project Overview
> **Always On** — Read this first before any task.

## What is SportsPay
A platform for managing sports group payments and event attendance.
- Admins create groups, generate monthly charges, manage events, share links via WhatsApp
- Members pay via Pix/card (web page), confirm event attendance, view payment status

## Monorepo Structure
```
sportspay/
├── packages/
│   ├── app/        # React Native + Expo (iOS & Android)
│   ├── web/        # Next.js 14 (frontend + API Routes + cron endpoints)
│   └── shared/     # TypeScript types, Zod schemas, utils (no runtime deps)
├── turbo.json
└── package.json    # pnpm workspaces
```

## Core Tech Decisions (never change without asking)
- **App**: Expo SDK 51+, Expo Router (file-based), NativeWind, React Query, Zustand
- **Web**: Next.js 14 App Router, Tailwind, shadcn/ui, React Query
- **Auth**: Firebase Auth — Google OAuth only (MVP). Facebook OAuth in Phase 2. NO SMS/OTP.
- **Database**: Firestore only. No SQL. No DynamoDB.
- **Real-time**: Firestore `onSnapshot` for live attendance list. No WebSockets.
- **Storage**: AWS S3 with pre-signed URLs. Never proxy file uploads through the API.
- **Backend logic**: Next.js API Routes only. No separate backend server. No NestJS. No Express.
- **Cron jobs**: AWS EventBridge Scheduler calling `/api/cron/**` endpoints. No node-cron.
- **Push notifications**: Firebase FCM. Never AWS SNS.
- **Payments gateway**: Asaas (Brazilian gateway). Pix + credit/debit card.
- **Infrastructure**: AWS Amplify Hosting (web), Expo EAS (app builds)

## Shared Package Imports
Always import types and schemas from shared packages:
```ts
import type { User, Group, Payment, Event, Attendance } from '@sportspay/types'
import { createGroupSchema, attendEventSchema } from '@sportspay/schemas'
import { formatCurrency, whatsappLink } from '@sportspay/utils'
```

## Language
- Code, comments, variable names: **English**
- UI text, error messages shown to users: **Portuguese (Brazil)**
- Git commits: English
