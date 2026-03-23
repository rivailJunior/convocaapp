# SportsPay — Project Overview
> **Always On** — Read this first before any task.

## What is SportsPay
Mobile app for organizing amateur sports groups — manage participants, create events, generate teams, and share via WhatsApp.

**Core value**: "Time from idea to shared event" — organize a game in under 3 minutes.

## Monorepo Structure
```
sportspay/
├── packages/
│   ├── app/        # React Native + Expo (iOS & Android)
│   ├── web/        # Next.js 14 (frontend + API Routes + cron endpoints)
│   └── shared/     # TypeScript types, Zod schemas, utils (no runtime deps)
├── docs/           # Project documentation and rules
├── turbo.json
└── package.json    # pnpm workspaces
```

## Core Tech Decisions
- **App**: Expo SDK 51+, Expo Router (file-based), NativeWind, React Query, Zustand
- **Web**: Next.js 14 App Router, Tailwind, shadcn/ui, React Query
- **Storage**: AsyncStorage for MVP (local persistence)
- **Data**: No backend in MVP - local storage only
- **Sharing**: WhatsApp text + image export
- **Infrastructure**: Expo EAS (app builds)

## MVP Features
- Create/edit/delete groups (participants, Pix key)
- Create/edit/delete events within groups
- Generate teams automatically (3 modes)
- Manual team editing (drag-and-drop)
- Share event details (WhatsApp text + image)
- Clone events
- Dark mode
- Onboarding flow

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
