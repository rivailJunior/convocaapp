# 🎯 SportsPay — Master Project Plan (Hybrid MVP)

**Infrastructure-ready, features standalone-first**

---

## 📋 Executive Summary

**What we're building:**  
A mobile app (iOS + Android) for organizing amateur sports groups — manage participants, create events, generate teams, and share details via WhatsApp.

**Architecture approach:**  
**Hybrid MVP** — Full backend infrastructure (Firebase, AWS, Next.js) is provisioned Day 1, but MVP launches with standalone features only (local storage, no cloud dependency). Backend features "turn on" in later phases without refactoring.

**Why this approach:**
- ✅ Ship fast: MVP launches in ~6 weeks with zero infrastructure costs
- ✅ Future-proof: Sync, payments, notifications can be added without rebuilding
- ✅ Parallel work: Backend APIs can be developed while standalone app is live
- ✅ Clean separation: Frontend and backend teams can work independently

---

## 🗓️ Timeline Overview

| Phase | Duration | Focus | Deliverable |
|-------|----------|-------|-------------|
| **Phase 0** | 1 week | Infrastructure setup | Monorepo, Firebase, AWS, API skeletons ready but unused |
| **Phase 1** | 2 weeks | Local CRUD | Groups and events working with AsyncStorage |
| **Phase 2** | 2 weeks | Team generation | Random sorter (3 modes) + display |
| **Phase 3** | 1 week | Manual editing | Drag-and-drop team editor |
| **Phase 4** | 2 weeks | Sharing | WhatsApp text + image export |
| **Phase 5** | 1-2 weeks | Polish | Attendance, clone, import, onboarding, dark mode |
| **Phase 6** | 1 week | Backend prep | API Routes built (ready but not called) |
| **Phase 7** | 1 week | Launch | Build, test, submit to stores |
| **Total** | **10-11 weeks** | **MVP in stores** | Standalone app live |
| **Phase 8+** | Future | Backend features | Sync, auth, payments, notifications |

---

## 🏗️ Infrastructure Stack (Phase 0)

**Provisioned on Day 1, activated in Phase 8+**

### Core
- **Monorepo**: Turborepo + pnpm workspaces
- **Packages**: app (Expo), web (Next.js), shared (types/schemas/utils)
- **Language**: TypeScript (strict mode)
- **CI/CD**: GitHub Actions (lint + type-check on PR)

### App (packages/app)
- **Framework**: React Native + Expo SDK 51+
- **Navigation**: Expo Router (file-based)
- **Styling**: NativeWind (Tailwind for RN)
- **State**: Zustand (global) + React Query (server state, Phase 8+)
- **Forms**: react-hook-form + Zod
- **Storage**: AsyncStorage (Phase 1-7), Firestore sync (Phase 8+)

### Web (packages/web)
- **Framework**: Next.js 14 (App Router)
- **UI**: shadcn/ui + Tailwind CSS
- **API**: API Routes (built in Phase 6, used in Phase 8+)
- **Auth**: Firebase Admin SDK (Phase 8+)

### Backend Services (Ready, Not Used Until Phase 8+)
| Service | Provider | Purpose | Cost (MVP) | Cost (Phase 8+) |
|---------|----------|---------|------------|-----------------|
| Database | Firebase Firestore | NoSQL, real-time | $0 (not used) | Free tier (50k reads/day) |
| Auth | Firebase Auth | Google OAuth | $0 (not used) | Free (50k MAU) |
| Push | Firebase FCM | Notifications | $0 (not used) | Free |
| Storage | AWS S3 | Photos | $0 (not used) | ~$0.023/GB |
| Hosting | AWS Amplify | Next.js SSR + API | ~$0 (static) | ~$10/month |
| Cron | AWS EventBridge | Scheduled jobs | $0 (not used) | Free tier |

**Total MVP cost: $0-5/month** (just domain + minimal hosting)  
**Total Phase 8+ cost: $10-20/month** (with active backend)

---

## 📱 MVP Feature Set (Phases 1-7)

### ✅ Core Features (Must-Have)
- [x] Create/edit/delete groups (name, sport, participants, Pix key)
- [x] Create/edit/delete events within groups
- [x] Generate teams automatically:
  - Random by team count (e.g., "3 teams")
  - Random by players per team (e.g., "5 players per team")
  - Manual drag-and-drop editing
- [x] Share event details:
  - Formatted text for WhatsApp (teams + Pix key)
  - Image for social media (teams visual with branding)
- [x] Clone event (duplicate with new date)
- [x] Local data persistence (AsyncStorage)
- [x] Dark mode
- [x] Onboarding flow

### 🟡 Optional Features (Nice-to-Have)
- [ ] Attendance tracking (mark confirmed/declined per event)
- [ ] Filter teams by attendance (only confirmed players)
- [ ] Import participant list (paste text → parse names)
- [ ] Export/import groups as JSON (manual backup)
- [ ] Local notifications (event reminder X hours before)

### ❌ Out of Scope (Phase 8+ Only)
- Multi-device sync
- User authentication
- Payment integration
- Push notifications
- Shared groups (multi-user editing)
- Advanced stats (MVP counts, leaderboards)
- Venue marketplace

---

## 🎨 Design System

### Colors
| Name | Hex | Usage |
|------|-----|-------|
| Primary | `#1B5E20` | Buttons, headers, selected states |
| Accent | `#AEEA00` | Highlights, CTAs, success states |
| Background | `#F8F9FA` | App background |
| Surface | `#FFFFFF` | Cards, modals |
| Text Primary | `#212121` | Headings, important text |
| Text Secondary | `#616161` | Body text, captions |
| Success | `#43A047` | Confirmed status |
| Warning | `#FB8C00` | Pending status |
| Error | `#E53935` | Declined status, delete actions |

### Typography
- **Headings**: Bold, 18-24px, #212121
- **Body**: Regular, 14-16px, #616161
- **Captions**: Regular, 12px, #616161
- **Font**: System default (San Francisco on iOS, Roboto on Android) or Inter/Nunito

### Spacing
- **Margins**: 16px horizontal
- **Section gap**: 24px vertical
- **Card padding**: 16px
- **Button height**: 48px (touch target)

### Components
- **Cards**: 16px border-radius, 2px shadow, white bg
- **Buttons**: 12px border-radius, 48px height
- **Inputs**: 12px border-radius, 48px height, border on focus
- **Modals**: 24px border-radius (top corners)
- **Avatars**: 40px circles (or colored initials)

---

## 🛠️ Development Workflow

### Repository Structure
```
sportspay/
├── packages/
│   ├── app/          # Expo mobile app
│   ├── web/          # Next.js web + API
│   └── shared/       # Types, schemas, utils
├── .github/
│   └── workflows/
│       └── ci.yml    # Lint + type-check on PR
├── turbo.json        # Build pipeline
└── package.json      # Root dependencies
```

### Git Workflow
1. **main** branch: production-ready code
2. **develop** branch: integration branch for features
3. **feature/** branches: individual tasks from TODO.md
4. PR required for merging to develop or main
5. CI runs on every PR (lint, type-check)

### Development Commands
```bash
# Install all dependencies
pnpm install

# Run everything in parallel
pnpm turbo dev

# Run individually
pnpm --filter app start    # Expo dev server
pnpm --filter web dev      # Next.js dev server

# Lint + type-check
pnpm turbo lint type-check

# Build for production
pnpm turbo build
```

### Testing Strategy
| Phase | Testing Approach |
|-------|------------------|
| **Phases 1-5** | Manual testing on iOS simulator + Android emulator |
| **Phase 6** | API Routes tested with Postman/curl |
| **Phase 7** | TestFlight (iOS) + Internal Testing (Android) on real devices |
| **Phase 8+** | E2E tests with Detox or Maestro |

---

## 📦 Deliverables by Phase

### Phase 0: Infrastructure (Week 1)
**Deliverables:**
- [x] Monorepo initialized with Turborepo
- [x] Expo app scaffold with NativeWind configured
- [x] Next.js web scaffold with shadcn/ui
- [x] Shared package with types, schemas, utils
- [x] Firebase project created (Firestore, Auth, FCM enabled)
- [x] AWS S3 bucket created
- [x] AWS Amplify connected to GitHub
- [x] CI pipeline running on PRs

**Acceptance criteria:**
- `pnpm turbo dev` runs both app and web without errors
- Tailwind classes work in Expo app
- Types from shared package can be imported in both app and web
- Firebase Admin SDK can connect (tested with a hello-world script)

---

### Phase 1: Local CRUD (Weeks 2-3)
**Deliverables:**
- [x] Groups CRUD (create, read, update, delete)
- [x] Events CRUD (create, read, update, delete)
- [x] AsyncStorage wrapper with typed helpers
- [x] UI components: Button, Input, Card, Badge, Modal
- [x] Screens: Groups list, Create/Edit group, Group detail, Create/Edit event

**Acceptance criteria:**
- Can create a group with name, sport, participants, Pix key
- Groups persist across app restarts (AsyncStorage)
- Can create events within a group
- Events persist and are displayed in group detail
- Can edit and delete groups and events with confirmation

---

### Phase 2: Team Generation (Weeks 4-5)
**Deliverables:**
- [x] Team generator algorithm (Fisher-Yates shuffle)
- [x] Generate teams screen with 3 modes:
  - By team count
  - By players per team
  - Manual (Phase 3)
- [x] Team display with colored cards
- [x] "Refazer sorteio" button
- [x] Save teams to event

**Acceptance criteria:**
- Can generate 3 teams from 25 participants (8-8-8 + 1 bench)
- Can generate teams with 5 players each (5 teams from 25)
- Generated teams persist in event
- Team colors are distinct and match design system

---

### Phase 3: Manual Editing (Week 6)
**Deliverables:**
- [x] Drag-and-drop team editor
- [x] Edit mode in teams screen
- [x] Drag handles on player chips
- [x] Drop zones with visual feedback

**Acceptance criteria:**
- Can drag a player from Team A to Team B
- Can drag a player to Banco
- Changes persist when saving
- Smooth animations during drag

---

### Phase 4: Sharing (Weeks 7-8)
**Deliverables:**
- [x] WhatsApp text formatter
- [x] Share screen with text preview
- [x] Copy to clipboard action
- [x] Share to WhatsApp action (native sheet)
- [x] SVG template for teams image
- [x] Image export with `react-native-view-shot`
- [x] Share image action

**Acceptance criteria:**
- Formatted text includes teams, Pix key, date, location
- Tap "Copiar" → clipboard has text, shows toast
- Tap "Compartilhar" → opens WhatsApp with pre-filled message
- Generated image has correct branding, colors, teams
- Tap "Compartilhar Imagem" → opens native share sheet with PNG

---

### Phase 5: Polish (Weeks 9-10)
**Deliverables:**
- [x] Attendance tracking UI (optional)
- [x] Clone event action
- [x] Import participant list (paste text)
- [x] Onboarding flow (3 screens)
- [x] Dark mode toggle
- [x] Settings screen
- [x] App icon and splash screen

**Acceptance criteria:**
- Can mark participants as confirmed/declined
- Can filter teams to only confirmed players
- Can clone an event (new date, teams cleared)
- Can paste a list of names and import as participants
- Onboarding shows on first launch only
- Dark mode applies to all screens
- App icon and splash look good on device

---

### Phase 6: Backend Prep (Week 10)
**Deliverables:**
- [x] API Routes implemented (not called by app):
  - POST /api/auth/register
  - GET /api/groups
  - POST /api/groups
  - GET /api/events/[id]
  - POST /api/groups/[id]/events
- [x] Firestore data model matches local storage types
- [x] Security rules deployed
- [x] API tested with Postman

**Acceptance criteria:**
- Can create a group via POST /api/groups (returns 201)
- Can list groups via GET /api/groups (requires auth header)
- Firestore has groups collection with correct schema
- Security rules prevent unauthorized access

---

### Phase 7: Launch (Week 11)
**Deliverables:**
- [x] iOS build via EAS Build
- [x] Android build via EAS Build
- [x] App Store listing (screenshots, description PT-BR)
- [x] Google Play listing (screenshots, description PT-BR)
- [x] Privacy policy page (static Next.js page)
- [x] Submitted to App Store and Google Play

**Acceptance criteria:**
- App runs on real iOS device (via TestFlight)
- App runs on real Android device (via internal testing)
- All features work end-to-end (create group → generate teams → share)
- Sharing to real WhatsApp works
- Submitted to both stores for review

---

## 🔮 Future Roadmap (Phase 8+)

### Phase 8: User Authentication & Sync
**When:** After MVP is live and validated with users  
**Estimated:** 2-3 weeks

**Features:**
- Google OAuth login in app
- Sync toggle in settings ("Sincronizar dados na nuvem")
- Migration logic: local storage → Firestore
- Sync strategy: pull on app start, push on create/update
- Conflict resolution: last-write-wins

**Why deferred:** Sync adds complexity. Validate product-market fit with standalone version first.

---

### Phase 9: Push Notifications
**When:** After sync is live  
**Estimated:** 1 week

**Features:**
- Event reminders (X hours before event)
- Payment reminders (if payments added)
- New event created notification

**Why deferred:** Requires backend + user accounts. Not critical for MVP.

---

### Phase 10: Payments Integration
**When:** When users request automated payments  
**Estimated:** 3-4 weeks

**Features:**
- Asaas integration (Pix + card)
- Generate payment links per member
- Webhook to confirm payments
- Public payment page (/pay/[id])

**Why deferred:** MVP uses manual Pix sharing. Automated payments add overhead and cost.

---

### Phase 11: Shared Groups
**When:** When multiple admins per group are needed  
**Estimated:** 2-3 weeks

**Features:**
- Invite links (/invite/[code])
- Multi-user groups (memberIds array)
- Real-time updates (Firestore onSnapshot)
- Admin permissions (who can edit)

**Why deferred:** Standalone MVP supports single-user groups. Sharing adds auth + sync complexity.

---

## 💰 Cost Breakdown

### MVP (Phases 0-7)
| Item | Cost |
|------|------|
| Infrastructure (Firebase Free, AWS Free) | $0 |
| Domain (sportspay.app) | ~$12/year |
| Apple Developer Account | $99/year (R$550) |
| Google Play Developer Account | $25 one-time (R$125) |
| **Total Year 1** | **~$136 (~R$675)** |
| **Total Year 2+** | **~$111/year (~R$550)** |

### Phase 8+ (Backend Active)
| Item | Monthly Cost |
|------|--------------|
| Firebase (Firestore + Auth + FCM) | $0 (free tier, <50k users) |
| AWS S3 | ~$1-2 (storage + bandwidth) |
| AWS Amplify Hosting | ~$5-10 (SSR + API) |
| **Total** | **~$10-15/month** |

**Break-even calculation:**
- If charging R$5/month per user: 3-4 paying users
- If charging R$10 one-time: 12 purchases per year

---

## 🚀 Launch Checklist

### Pre-Launch
- [ ] All Phase 1-5 features tested on real devices
- [ ] App icon and splash screen designed and set
- [ ] Privacy policy published (static page at sportspay.app/privacy)
- [ ] App Store screenshots (6.5" iPhone, 5.5" iPhone, 12.9" iPad)
- [ ] Google Play screenshots (Phone, 7" Tablet, 10" Tablet)
- [ ] App Store description written in PT-BR
- [ ] Google Play description written in PT-BR
- [ ] Keywords researched (esportes, futebol, times, rachão, pelada)
- [ ] TestFlight beta testing with 5-10 real users
- [ ] Internal testing on Android with 5-10 real users
- [ ] Critical bugs fixed from beta feedback

### Launch Day
- [ ] Submit iOS build to App Store Review
- [ ] Submit Android build to Google Play Review
- [ ] Monitor review status daily
- [ ] Prepare for quick responses to reviewer questions

### Post-Launch
- [ ] Monitor crash reports (Sentry or Firebase Crashlytics)
- [ ] Respond to user reviews within 24 hours
- [ ] Gather feedback for Phase 8+ prioritization
- [ ] Iterate on most-requested features

---

## 📊 Success Metrics

### MVP (Phases 0-7)
| Metric | Target |
|--------|--------|
| **Time to launch** | 10-11 weeks |
| **App Store approval** | First try |
| **Critical bugs at launch** | < 3 |
| **Crash-free rate** | > 99% |

### Phase 8+ (Backend Active)
| Metric | Target (Month 1) | Target (Month 3) |
|--------|------------------|------------------|
| **Active users** | 50 | 200 |
| **Groups created** | 100 | 500 |
| **Events created** | 500 | 3000 |
| **Teams generated** | 1000 | 6000 |
| **Shares to WhatsApp** | 2000 | 12000 |

---

## 🤝 Team Roles (if multiple people)

| Role | Responsibilities | Phases |
|------|------------------|--------|
| **Frontend Dev** | Expo app UI + features | 1-7 |
| **Backend Dev** | API Routes + Firestore | 6, 8+ |
| **Designer** | UI mockups in Stitch, review screens | 0-7 |
| **QA/Tester** | Manual testing, bug reporting | 5-7 |
| **Product Owner** | Prioritize features, user feedback | All |

If solo: One person can do Phases 0-7 (frontend-focused), then hire/partner for backend in Phase 8+.

---

## 📖 Documentation

### For Developers
- **README.md**: Quick start, tech stack, commands
- **TODO.md**: Task breakdown, Windsurf-ready format
- **Architecture doc**: Infrastructure, data model, decisions
- **Stitch prompts**: Design system, screen mockups

### For Users
- **In-app help**: Tooltips, onboarding, empty states
- **Privacy policy**: Static page, required for stores
- **Support email**: hello@sportspay.app (or similar)

---

## 🎯 North Star Metric

**"Time from idea to shared event"**

The core value prop is: *"I have a group → I create an event → I generate teams → I share on WhatsApp"*

**Target:** < 3 minutes from opening app to shared event.

**How to measure:** Track timestamps in events (createdAt, teams generated at, shared at). Calculate median time.

**Why this matters:** If users can organize a game in under 3 minutes, the app is doing its job. Anything slower needs optimization.

---

## ✅ Decision Log

| Date | Decision | Rationale |
|------|----------|-----------|
| 2025-03-20 | Hybrid MVP: infrastructure ready, features standalone | Ship fast (6 weeks) while staying future-proof |
| 2025-03-20 | AsyncStorage for MVP, Firestore in Phase 8+ | No backend dependency → zero infra cost → faster launch |
| 2025-03-20 | No authentication in MVP | Removes onboarding friction, validates core features first |
| 2025-03-20 | Manual Pix sharing instead of payment gateway | Simpler, free, users already do this → validate need before building |
| 2025-03-20 | Expo over React Native CLI | EAS Build = cloud builds, no local Xcode/Android Studio setup needed |
| 2025-03-20 | NativeWind over StyleSheet | Tailwind DX, consistency with web package |
| 2025-03-20 | Turborepo monorepo | Shared types/schemas/utils, parallel dev on app + web |

---

**Last updated:** 2025-03-20  
**Version:** 1.0 (Hybrid MVP Plan)  
**Owner:** SportsPay Team
