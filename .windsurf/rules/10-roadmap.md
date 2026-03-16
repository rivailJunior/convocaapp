# Roadmap & Phase Tracker
> **Manual** — reference when planning features or deciding what to build next

## Current Phase: Phase 0 — Monorepo Setup

## Phase 0 — Monorepo Setup (Week 1)
- [ ] Initialize repo with Turborepo + pnpm workspaces
- [ ] Create `packages/shared` with types, schemas, utils, constants
- [ ] Initialize `packages/app` with Expo Router + NativeWind + TypeScript
- [ ] Initialize `packages/web` with Next.js 14 + Tailwind + shadcn/ui
- [ ] Configure shared ESLint + Prettier
- [ ] Configure shared `tsconfig.json` base
- [ ] Provision Firebase project (Firestore, Auth, Storage, FCM)
- [ ] Configure AWS: Amplify, S3 bucket, EventBridge, Secrets Manager
- [ ] Create GitHub Actions CI: lint + type-check all packages

## Phase 1 — MVP (Weeks 2–14)

### Week 2–3: Authentication
- [ ] Google OAuth in the app (react-native-google-signin)
- [ ] Google OAuth on the web (Firebase popup)
- [ ] Auth gate in app root `_layout.tsx`
- [ ] `POST /api/auth/register` — upsert user in Firestore after login
- [ ] Profile screen (name, photo from Google, optional phone)

### Week 4–5: Groups & Invites
- [ ] CRUD groups: create, list, edit, delete (soft)
- [ ] API Routes: `GET|POST /api/groups`, `GET|PATCH|DELETE /api/groups/[id]`
- [ ] Invite code generation: `POST /api/groups/[id]/invites`
- [ ] Public invite page: `/invite/[code]` (SSR + OG tags for WhatsApp preview)
- [ ] `POST /api/invites/[code]/accept` — add user to group
- [ ] Group list and detail screens in app
- [ ] Invite screen with QR Code + WhatsApp share button

### Week 6–7: Payments Generation
- [ ] `POST /api/groups/[id]/payments/generate` — bulk create payment docs
- [ ] Payment list screen in app and web admin
- [ ] Payment status badges: pending, paid, overdue, cancelled
- [ ] `PATCH /api/payments/[id]/confirm` — manual paid confirmation

### Week 8–9: Asaas Integration
- [ ] `lib/asaas.ts` wrapper (create customer, create charge, get Pix QR code)
- [ ] `POST /api/payments/[id]/send-link` — create Asaas charge, save link
- [ ] Public payment page: `/pay/[id]` (SSR, Pix QR code, card form)
- [ ] `POST /api/webhooks/asaas` — webhook handler with HMAC verification
- [ ] WhatsApp send payment link flow in app

### Week 10–11: Events
- [ ] CRUD events with recurrence: create, list, edit, cancel
- [ ] API Routes: `GET|POST /api/groups/[id]/events`, `GET|PATCH|DELETE /api/events/[id]`
- [ ] `POST /api/cron/generate-events` — create next occurrence for recurring events
- [ ] Event detail screen in app with venue map (react-native-maps)
- [ ] Public event page: `/event/[id]` (ISR, static map, attendance list)

### Week 12: Attendance
- [ ] `POST /api/events/[id]/attend` — confirm/decline/maybe
- [ ] Real-time attendance list in app (Firestore `onSnapshot`)
- [ ] Attendance list on public event page (ISR revalidate 60s)
- [ ] `POST /api/events/[id]/notify` — send FCM push to pending members

### Week 13–14: Push Notifications & Polish
- [ ] FCM push for: payment link sent, payment confirmed, event reminder, attendance update
- [ ] `POST /api/cron/generate-payments` — monthly charges cron endpoint
- [ ] `POST /api/cron/overdue-alerts` — overdue payment notifications
- [ ] S3 upload for user/group avatars
- [ ] Web admin panel: dashboard with KPIs and charts
- [ ] End-to-end testing, bug fixes, EAS build, App Store / Play Store submission

## Phase 2 — Post-MVP
- [ ] Facebook OAuth
- [ ] Reports with charts (recharts) + CSV export
- [ ] Event waitlist when maxPlayers reached
- [ ] Co-admins per group
- [ ] Event comments
- [ ] Overdue payment installments

## Phase 3 — Scale
- [ ] Premium plans (more groups, unlimited members)
- [ ] PWA for web
- [ ] Google Calendar sync
- [ ] WhatsApp Business API (replace manual sharing)

## Out of Scope (never implement without explicit discussion)
- SMS OTP authentication
- Direct database access from the app (except onSnapshot)
- Separate backend server (NestJS, Express, etc.)
- DynamoDB or any SQL database
- AWS SNS for push notifications
