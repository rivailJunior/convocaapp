# SportsPay

Mobile app for organizing amateur sports groups — manage participants, create events, generate teams, and share via WhatsApp.

**Hybrid MVP approach**: Infrastructure-ready, launches with standalone features (local storage), backend features activate in later phases.

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

## Project Structure

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

## Learn More

- **[Master Plan](./SportsPay_Master_Plan.md)** — Complete project details, phases, timeline, costs
- **[Development Tasks](./TODO_MVP.md)** — Current sprint tasks and implementation details
- **[Design System](./DESIGN.md)** — UI guidelines and visual principles
- **[AI Assistant Guide](./CLAUDE.md)** — Project rules for Claude/Cascade AI

## Tech Stack (Summary)

| Layer | Technology |
|-------|-----------|
| App Mobile | React Native + Expo SDK 51 + Expo Router |
| Web + API | Next.js 14 (App Router) |
| Styling | NativeWind (RN) + Tailwind CSS + shadcn/ui |
| State | Zustand + React Query |
| Backend | Firebase (Auth, Firestore, FCM) + AWS (S3, Amplify) |
| Payments | Asaas (Phase 8+) |

## Current Status

**Phase**: Infrastructure setup (Phase 0)  
**Timeline**: 10-11 weeks to MVP launch  
**Cost**: $0-5/month (MVP), $10-15/month (with backend)

See [Master Plan](./SportsPay_Master_Plan.md) for complete phase breakdown, features, and launch strategy.
