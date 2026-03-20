# SportsPay — Master TODO
> Windsurf Cascade task list. Each item = one focused AI session.
> Update status: `[ ]` → `[x]` as tasks complete.
> Reference the relevant `.windsurf/rules/*.md` file at the start of each session.

---

## ✅ How to use this with Cascade

Start each session with:
```
@TODO.md — I want to work on: [paste the task title]
```
Cascade will read the task, the referenced rule files, and know exactly what to build.

---

## PHASE 0 — Monorepo Setup

### 0.1 Repository & Tooling
- [ ] **Init Turborepo monorepo** — `npx create-turbo@latest sportspay --package-manager pnpm`. Verify `turbo.json` pipeline has `build`, `dev`, `lint`, `type-check` tasks. _Rule: 00-project-overview_
- [ ] **Configure shared tsconfig** — Create `tsconfig.base.json` at root with `strict: true`, `moduleResolution: bundler`, `jsx: react-native`. Each package extends it. _Rule: 01-code-style_
- [ ] **Configure shared ESLint + Prettier** — Root `.eslintrc.js` with `@typescript-eslint`, `import/order`, `react-hooks` plugins. Root `.prettierrc` with `singleQuote: true`, `trailingComma: all`. _Rule: 01-code-style_
- [ ] **GitHub Actions CI pipeline** — `.github/workflows/ci.yml`: on push/PR → `pnpm install` → `pnpm turbo lint type-check`. Fail PR if any package fails. _Rule: 00-project-overview_

### 0.2 Shared Package (`packages/shared`)
- [ ] **Scaffold shared package** — Create `packages/shared` with `package.json` (`name: @sportspay/shared`), `tsconfig.json`, `src/index.ts` re-exporting everything. _Rule: 08-shared-package_
- [ ] **Types** — Create `src/types/index.ts` with: `Sport`, `PaymentStatus`, `PaymentMethod`, `Recurrence`, `AttendanceStatus`, `EventStatus`, `AttendanceType`, `TeamDrawMode`, `BadgeType` union types + `User`, `Group`, `Payment`, `Event`, `Attendance`, `Invite`, `Team`, `TeamDrawResult`, `AttendancePlayer`, `MatchStats`, `PlayerStats`, `EventResult` interfaces. _Rule: 08-shared-package, 04-firebase-firestore, 12-team-draw-attendance, 13-match-stats-voting_
- [ ] **Zod schemas** — Create `src/schemas/index.ts` with: `createGroupSchema` (includes `billingMode`, `fieldCostPerMonth`, `guestFee`), `updateGroupSchema`, `createEventSchema`, `attendEventSchema`, `createInviteSchema`, `registerUserSchema`, `createGuestSchema`, `createTreasuryEntrySchema`. Export inferred types alongside each schema. _Rule: 08-shared-package, 11-billing-diaristas-treasury_
- [ ] **Utils** — Create `src/utils/index.ts` with: `formatCurrency(centavos)`, `formatMonth(referenceMonth)`, `currentReferenceMonth()`, `whatsappLink(phone, message)`, `whatsappMessages` object (paymentLink, eventReminder, inviteLink, `teamDraw` templates in PT-BR). _Rule: 08-shared-package, 09-whatsapp, 12-team-draw-attendance_
- [ ] **Constants** — Create `src/constants/index.ts` with `SPORTS`, `PAYMENT_STATUSES`, `EVENT_STATUSES`, `RECURRENCES` as `as const` objects (no enums). _Rule: 01-code-style_

### 0.3 App Package (`packages/app`)
- [ ] **Scaffold Expo app** — `npx create-expo-app@latest app --template tabs` inside `packages/`. Configure `app.config.ts` with bundle IDs, scheme `sportspay://`, splash screen. _Rule: 03-expo-app_
- [ ] **Install app dependencies** — NativeWind, React Query, Zustand, react-hook-form, zod, axios, expo-secure-store, expo-linking, @react-native-firebase/* (app, auth, firestore), expo-notifications, react-native-maps, @react-native-google-signin/google-signin. _Rule: 03-expo-app_
- [ ] **Configure NativeWind** — `tailwind.config.js` pointing to `app/**/*.tsx`. Add `withNativeWind` to `metro.config.js`. Verify `className` works on a test component. _Rule: 03-expo-app_
- [ ] **Configure React Query** — Wrap root `_layout.tsx` with `QueryClientProvider`. Set `staleTime: 60_000`, `retry: 2`. _Rule: 03-expo-app_

### 0.4 Web Package (`packages/web`)
- [ ] **Scaffold Next.js app** — `npx create-next-app@latest web --typescript --tailwind --app` inside `packages/`. Remove boilerplate pages. _Rule: 02-nextjs-web_
- [ ] **Install web dependencies** — shadcn/ui (init), firebase, firebase-admin, @aws-sdk/client-s3, @aws-sdk/s3-request-presigner, axios, react-hook-form, zod, @tanstack/react-query, recharts, react-qr-code, date-fns, @vis.gl/react-google-maps. _Rule: 02-nextjs-web_
- [ ] **Environment setup** — Create `.env.local` from `.env.example`. Create `lib/env.ts` validating all required env vars with Zod on startup (throw if missing). _Rule: 07-aws-services_
- [ ] **Firebase Admin singleton** — Create `lib/firebase-admin.ts` exporting `db`, `auth`, `messaging` singletons. Use `getApps().length` guard to avoid re-initialization. _Rule: 04-firebase-firestore_
- [ ] **Firebase client singleton** — Create `lib/firebase-client.ts` exporting initialized Firebase app + `firebaseAuth`. Mark as client-only (no `firebase-admin` imports). _Rule: 02-nextjs-web_
- [ ] **Auth middleware helper** — Create `lib/auth-middleware.ts` with `verifyToken(req)` and `requireGroupAdmin(uid, groupId)` helpers used by all API Routes. _Rule: 04-firebase-firestore, 05-authentication_
- [ ] **API client (browser)** — Create `lib/api-client.ts`: Axios instance with `baseURL: process.env.NEXT_PUBLIC_API_URL`, interceptor that attaches Firebase JWT from `firebaseAuth.currentUser.getIdToken()`. _Rule: 02-nextjs-web_

### 0.5 Firebase & AWS Provisioning
- [ ] **Firebase project** — Create project in Firebase Console. Enable: Firestore (production mode), Authentication (Google provider), Storage, Cloud Messaging. Download service account JSON. _Rule: 04-firebase-firestore_
- [ ] **Firestore security rules** — Write `firestore.rules`: authenticated read on own user doc, group members can read group, only Admin SDK can write payments/events. Deploy with `firebase deploy --only firestore:rules`. _Rule: 04-firebase-firestore_
- [ ] **Firestore indexes** — Create composite indexes for: payments by (groupId + referenceMonth), events by (groupId + date + status), groups by memberIds array-contains. _Rule: 04-firebase-firestore_
- [ ] **Google OAuth setup** — In Google Cloud Console: create OAuth 2.0 Client IDs for Web, iOS, and Android. Add authorized redirect URIs. Add Web Client ID to `.env`. _Rule: 05-authentication_
- [ ] **AWS S3 bucket** — Create `sportspay-uploads` bucket in `sa-east-1`. Configure CORS for PUT from app domain. Create IAM user with S3 write-only policy. Add credentials to `.env`. _Rule: 07-aws-services_
- [ ] **AWS Amplify Hosting** — Connect GitHub repo to Amplify. Configure build settings for Next.js 14 SSR. Set all environment variables in Amplify console. _Rule: 07-aws-services_
- [ ] **AWS EventBridge rules** — Create 4 scheduler rules (generate-payments, generate-events, overdue-alerts, cleanup-invites) pointing to the Amplify deployment URL. Set `x-cron-secret` header. _Rule: 07-aws-services_

---

## PHASE 1 — MVP

### 1.1 Authentication

#### API Routes
- [ ] **POST /api/auth/register** — Verify Firebase token. `setDoc` with `merge: true` on `users/{uid}`. Fields: name, email, avatarUrl from Google profile. Return user doc. _Rule: 05-authentication, 04-firebase-firestore_
- [ ] **GET /api/auth/me** — Return authenticated user's Firestore document. _Rule: 05-authentication_
- [ ] **PATCH /api/auth/me** — Update name, avatarUrl (S3 URL). Validate with `updateUserSchema`. _Rule: 05-authentication_

#### App Screens
- [ ] **Login screen `(auth)/login.tsx`** — 'Entrar com Google' button using `@react-native-google-signin`. On success call `POST /api/auth/register`. Store JWT in SecureStore. _Rule: 03-expo-app, 05-authentication_
- [ ] **Auth gate in root `_layout.tsx`** — Read SecureStore token + Firebase auth state. Redirect to `/(auth)/login` if not authenticated. Redirect to `/(admin)` or `/(user)` based on `adminGroupIds.length`. _Rule: 03-expo-app_
- [ ] **Profile screen `(shared)/profile.tsx`** — Display name + avatar from Google. Edit name. Avatar upload (calls `/api/upload` for S3 pre-signed URL, uploads directly). _Rule: 03-expo-app_

#### Web Screens
- [ ] **Login page `(auth)/login/page.tsx`** — 'Entrar com Google' button using Firebase popup. On success call `POST /api/auth/register`. Redirect to `/dashboard`. _Rule: 02-nextjs-web, 05-authentication_
- [ ] **Next.js middleware `middleware.ts`** — Protect all `/admin/**` routes. Redirect to `/login` if no valid session cookie. _Rule: 02-nextjs-web_

---

### 1.2 Groups & Invites

#### Shared
- [ ] **Group schemas in shared** — `createGroupSchema`, `updateGroupSchema` with fields: name, sport, monthlyFee (centavos), dueDay (1-28), paymentMethods. _Rule: 08-shared-package_

#### API Routes
- [ ] **GET /api/groups** — Return groups where `memberIds array-contains uid`. _Rule: 04-firebase-firestore_
- [ ] **POST /api/groups** — Validate body including `billingMode`. If `fixed`: require `monthlyFee`. If `field_split`: require `fieldCostPerMonth` and `guestFee`. Create group doc with `plan: free`. Add uid to `adminGroupIds` and `memberIds`. _Rule: 04-firebase-firestore, 11-billing-diaristas-treasury_
- [ ] **GET /api/groups/[id]** — Verify user is member. Return group doc. _Rule: 04-firebase-firestore_
- [ ] **PATCH /api/groups/[id]** — Admin only. Update name, sport, monthlyFee, dueDay, paymentMethods. _Rule: 04-firebase-firestore_
- [ ] **DELETE /api/groups/[id]** — Admin only. Soft delete: set `status: 'archived'`. _Rule: 04-firebase-firestore_
- [ ] **GET /api/groups/[id]/members** — Return member user docs with current month payment status joined. _Rule: 04-firebase-firestore_
- [ ] **DELETE /api/groups/[id]/members/[uid]** — Admin only. Remove uid from `memberIds`. Update user's `groupIds`. _Rule: 04-firebase-firestore_
- [ ] **POST /api/groups/[id]/invites** — Admin only. Generate random 8-char code. Create `invites/{code}` doc. Return full invite URL. _Rule: 04-firebase-firestore_
- [ ] **GET /api/invites/[code]** — Public. Validate invite exists, not expired, not maxUses reached. Return group name, sport, memberCount. _Rule: 04-firebase-firestore_
- [ ] **POST /api/invites/[code]/accept** — Authenticated. Add uid to group `memberIds`. Add groupId to `user.groupIds`. Add uid to invite `usedBy`. _Rule: 04-firebase-firestore_

#### App Screens
- [ ] **Group list screen `(admin)/groups/index.tsx`** — List admin's groups with member count and pending payment count badge. FAB to create new group. _Rule: 03-expo-app_
- [ ] **Create group screen `(admin)/groups/create.tsx`** — Form: name, sport picker, monthlyFee (R$ input → centavos), dueDay, paymentMethods checkboxes. Submit calls `POST /api/groups`. _Rule: 03-expo-app_
- [ ] **Group detail screen `(admin)/groups/[id]/index.tsx`** — Member list with payment status badges. Tabs: Membros / Pagamentos / Eventos. _Rule: 03-expo-app_
- [ ] **Invite screen `(admin)/groups/[id]/invite.tsx`** — Show QR Code (`react-qr-code`). Copy link button. 'Compartilhar no WhatsApp' button using `whatsappMessages.inviteLink`. _Rule: 03-expo-app, 09-whatsapp_
- [ ] **User home screen `(user)/home.tsx`** — List groups user belongs to with current month payment status. _Rule: 03-expo-app_

#### Web Screens
- [ ] **Public invite page `/invite/[code]/page.tsx`** — SSR. Fetch invite data. Show group name, sport, member count. 'Entrar com Google' button that accepts invite post-login. OG tags for WhatsApp preview. _Rule: 02-nextjs-web_
- [ ] **Admin groups page `(admin)/groups/page.tsx`** — Table with all groups, member count, monthly fee, pending payments count. Button to create new group. _Rule: 02-nextjs-web_

---

### 1.3 Payments

#### Shared
- [ ] **Payment schemas in shared** — `generatePaymentsSchema` (referenceMonth), `confirmPaymentSchema`. _Rule: 08-shared-package_

#### API Routes
- [ ] **GET /api/groups/[id]/payments** — Admin only. Query payments by groupId + optional referenceMonth filter. Return with user name joined. _Rule: 04-firebase-firestore_
- [ ] **POST /api/groups/[id]/payments/generate** — Admin only. For each memberIds: check no existing payment for referenceMonth, create `payments` doc with status `pending`, dueDate calculated from group's dueDay. _Rule: 04-firebase-firestore_
- [ ] **PATCH /api/payments/[id]/confirm** — Admin only. Set status `paid`, method `manual`, paidAt now. _Rule: 04-firebase-firestore_
- [ ] **POST /api/cron/generate-payments** — Verify `x-cron-secret`. Call generate logic for all active groups. Log results. _Rule: 07-aws-services_
- [ ] **POST /api/cron/overdue-alerts** — Verify `x-cron-secret`. Query payments with status `pending` and dueDate < now. Set to `overdue`. Send FCM push to each member + summary to admin. _Rule: 07-aws-services_

#### App Screens
- [ ] **Payment list screen `(admin)/groups/[id]/payments.tsx`** — List payments for current month. Filter by status. 'Gerar cobranças' button. 'Marcar como pago' swipe action. _Rule: 03-expo-app_
- [ ] **User payment screen `(user)/home.tsx`** — Show current month payment status per group. Amount due, due date, payment link if available. _Rule: 03-expo-app_

#### Web Screens
- [ ] **Admin payments page `(admin)/groups/[id]/payments/page.tsx`** — Table with member name, status badge, amount, due date. Filter by month/status. 'Gerar cobranças do mês' button. 'Marcar pago' action. _Rule: 02-nextjs-web_

---

### 1.3b Diaristas & Treasury

#### Shared
- [ ] **Guest & Treasury types in shared** — Add `Guest`, `TreasuryEntry`, `TreasurySummary`, `BillingMode` to `packages/shared/types`. Add `createGuestSchema`, `createTreasuryEntrySchema` to schemas. _Rule: 11-billing-diaristas-treasury_

#### API Routes
- [ ] **POST /api/events/[id]/guests** — Admin only. Two modes: anonymous (`{ name, amount }`) or registered (`{ uid, amount }`). Anonymous: create Asaas PIX charge directly, return QR code. Registered: create charge linked to uid, send FCM push. Create guest doc in Firestore. _Rule: 11-billing-diaristas-treasury, 06-payments-asaas_
- [ ] **GET /api/events/[id]/guests** — Admin only. List diaristas for the event with payment status. _Rule: 11-billing-diaristas-treasury_
- [ ] **GET /api/groups/[id]/treasury** — Admin only. List treasury entries with optional `?month=YYYY-MM` filter. _Rule: 11-billing-diaristas-treasury_
- [ ] **GET /api/groups/[id]/treasury/balance** — Admin only. Return current balance + monthly summary (total in, total out, net). _Rule: 11-billing-diaristas-treasury_
- [ ] **POST /api/groups/[id]/treasury** — Admin only. Create manual entry (field payment, equipment, other). Validate with `createTreasuryEntrySchema`. After `field_payment` out: trigger smart suggestion logic. _Rule: 11-billing-diaristas-treasury_
- [ ] **Smart suggestion logic** — After every `field_payment` outflow: calculate current vs 3-month avg rateio. If 20%+ higher AND balance > 0: send FCM push to admin with suggestion. _Rule: 11-billing-diaristas-treasury_
- [ ] **POST /api/groups/[id]/payments/generate — field_split mode** — If `billingMode=field_split`: rateio = `Math.ceil(fieldCostPerMonth / memberIds.length)`. If admin accepted treasury suggestion: subtract from total before dividing. _Rule: 11-billing-diaristas-treasury_
- [ ] **Webhook: guest payment** — In `POST /api/webhooks/asaas`: detect if payment is a guest (check metadata). Update `guest.status = paid`. Auto-create treasury entry `{ type: in, category: guest_payment }`. _Rule: 11-billing-diaristas-treasury, 06-payments-asaas_

#### App Screens
- [ ] **Add diarista flow `(admin)/groups/[id]/events/[eventId].tsx`** — Button 'Adicionar diarista'. Two paths: (1) type name → instant QR Code Pix displayed on screen; (2) search existing user → charge sent via push. _Rule: 03-expo-app, 11-billing-diaristas-treasury_
- [ ] **Treasury screen `(admin)/groups/[id]/treasury.tsx`** — Balance card at top. List of entries (in green, out red). Filter by month. Button to register new outflow (field payment, equipment, other). _Rule: 03-expo-app, 11-billing-diaristas-treasury_
- [ ] **Smart suggestion notification handler** — When admin receives treasury suggestion push: show bottom sheet with: current rateio, avg rateio, treasury balance, suggested use, resulting reduced rateio. Accept/Decline buttons. _Rule: 03-expo-app, 11-billing-diaristas-treasury_

#### Web Screens
- [ ] **Treasury page `(admin)/groups/[id]/treasury/page.tsx`** — Balance summary cards. Table of entries with filters. Add entry form. Chart: monthly in vs out (recharts). _Rule: 02-nextjs-web, 11-billing-diaristas-treasury_

---

### 1.4 Asaas Payment Gateway

#### Integration
- [ ] **`lib/asaas.ts` wrapper** — Axios instance with Asaas base URL + access_token header. Functions: `findOrCreateCustomer(email, name)`, `createCharge(params)`, `getPixQrCode(chargeId)`, `cancelCharge(chargeId)`. _Rule: 06-payments-asaas_
- [ ] **POST /api/payments/[id]/send-link** — Admin only. Call `findOrCreateCustomer` then `createCharge`. Save `gatewayId` and `paymentLink` to Firestore. Return paymentLink. _Rule: 06-payments-asaas_
- [ ] **POST /api/webhooks/asaas** — Public. Verify `asaas-access-token` header. Handle `PAYMENT_RECEIVED`/`PAYMENT_CONFIRMED`: update payment status to `paid`, set `paidAt`. Send FCM push to member and admin. Return 200 immediately. _Rule: 06-payments-asaas_

#### Web Public Page
- [ ] **Public payment page `/pay/[id]/page.tsx`** — SSR. Load payment data. If Pix: show QR Code + copia-e-cola key. If card: show Asaas card form. Show member name, group name, amount, due date. OG tags. _Rule: 02-nextjs-web, 06-payments-asaas_

#### App Flow
- [ ] **Send payment link via WhatsApp (app)** — In payment list: 'Enviar cobrança' button calls `POST /api/payments/[id]/send-link`, receives paymentLink, opens WhatsApp with `whatsappMessages.paymentLink`. Fallback: copy link to clipboard. _Rule: 03-expo-app, 09-whatsapp_

---

### 1.5 Events

#### Shared
- [ ] **Event schemas in shared** — `createEventSchema`, `updateEventSchema`, `attendEventSchema`. _Rule: 08-shared-package_

#### API Routes
- [ ] **GET /api/groups/[id]/events** — Member access. Return upcoming events (date >= now, status scheduled). Optional: include past events with query param. _Rule: 04-firebase-firestore_
- [ ] **POST /api/groups/[id]/events** — Admin only. Validate with `createEventSchema`. Create event doc. _Rule: 04-firebase-firestore_
- [ ] **GET /api/events/[id]** — Member access. Return event doc + attendances subcollection summary (count by status). _Rule: 04-firebase-firestore_
- [ ] **PATCH /api/events/[id]** — Admin only. Update event fields. _Rule: 04-firebase-firestore_
- [ ] **DELETE /api/events/[id]** — Admin only. Set status `cancelled`. Send FCM push to all members. _Rule: 04-firebase-firestore_
- [ ] **POST /api/events/[id]/attend** — Member access. Validate `attendEventSchema`. If `status=confirmed`: check for pending/overdue payment in current month — return 403 with `code: PAYMENT_REQUIRED` if found. Upsert `attendances/{uid}` subdoc. Check maxPlayers before confirming. _Rule: 12-team-draw-attendance_
- [ ] **PATCH /api/events/[id]/attendances/[uid]** — GroupAdmin only. Override payment block (`{ override: true }`). Sets `isOverdue: true` but allows confirmation. _Rule: 12-team-draw-attendance_
- [ ] **POST /api/events/[id]/teams** — GroupAdmin only. Save `TeamDrawResult` to `team_draws/{eventId}` (upsert). Batch update `teamId` on each attendance doc. _Rule: 12-team-draw-attendance_
- [ ] **POST /api/events/[id]/notify** — Admin only. Query pending attendances. Send FCM push + WhatsApp option. _Rule: 04-firebase-firestore_
- [ ] **POST /api/cron/generate-events** — Verify `x-cron-secret`. For each group with weekly/biweekly recurrence: create next event occurrence. Send push to all members. _Rule: 07-aws-services_
- [ ] **POST /api/cron/cleanup-invites** — Verify `x-cron-secret`. Delete expired invite docs. _Rule: 07-aws-services_

#### App Screens
- [ ] **Event list screen `(admin)/groups/[id]/events/index.tsx`** — Upcoming events list. Create event FAB. Each card shows date, venue, confirmed count. _Rule: 03-expo-app_
- [ ] **Create event screen `(admin)/groups/[id]/events/create.tsx`** — Form: title, date/time picker, recurrence selector, venue name, address, lat/lng (Google Places autocomplete or manual), maxPlayers. _Rule: 03-expo-app_
- [ ] **Event detail screen `(admin)/groups/[id]/events/[eventId].tsx`** (admin view) — Show attendance list with status. 'Notificar pendentes' button. 'Compartilhar no WhatsApp' button. Cancel event option. _Rule: 03-expo-app_
- [ ] **Event screen `(user)/event/[id].tsx`** — Map with venue pin (react-native-maps). Date, time, venue name. Real-time attendance list via Firestore onSnapshot. Confirm/Decline/Maybe buttons. _Rule: 03-expo-app, 04-firebase-firestore_
- [ ] **User events screen `(user)/events.tsx`** — List upcoming events across all groups. Each card links to event detail. _Rule: 03-expo-app_
- [ ] **Team draw utility `packages/shared/utils/team-draw.ts`** — `generateTeams({ players, mode, value })`. Fisher-Yates shuffle. Returns `{ teams, bench, totalPlayers }`. Input validation (min 2 teams, enough players). Usable in both app and web. _Rule: 12-team-draw-attendance, 08-shared-package_
- [ ] **Team draw screen `(admin)/groups/[id]/events/[eventId]/teams.tsx`** — Only visible when confirmed count >= 4. Bottom sheet with two modes: "jogadores por time" or "numero de times". Preview of result before confirming. Colored team cards. Re-draw button. Share via WhatsApp button (generates formatted text). Save button calls `POST /api/events/[id]/teams`. _Rule: 12-team-draw-attendance, 03-expo-app_
- [ ] **Attendance blocking UI (app)** — When `POST /api/events/[id]/attend` returns 403 with `PAYMENT_REQUIRED`: show modal "Mensalidade em aberto" with "Pagar agora" button that navigates to payment screen. _Rule: 12-team-draw-attendance_
- [ ] **Admin attendance override (app)** — On event management screen: admin can tap a blocked member and choose "Liberar mesmo sem pagamento". Calls `PATCH /api/events/[id]/attendances/[uid] { override: true }`. _Rule: 12-team-draw-attendance_

#### Web Screens
- [ ] **Public event page `/event/[id]/page.tsx`** — ISR (revalidate 60s). Show event details, static Google Maps image, attendance count by status. 'Confirmar Presença' button (requires login). OG tags. _Rule: 02-nextjs-web_
- [ ] **Admin events page `(admin)/groups/[id]/events/page.tsx`** — List/calendar view of events. Create event form with map picker. _Rule: 02-nextjs-web_

---

### 1.5b Match Stats, Voting & Rankings

#### Shared
- [ ] **Stats schemas in shared** — Add `castVoteSchema` (mvp uid, goals map, assists map, saves map), `closeVotingSchema`. Add `calculateRankingScore(stats)` utility function to `@sportspay/utils`. _Rule: 13-match-stats-voting, 08-shared-package_

#### API Routes
- [ ] **POST /api/events/[id]/votes** — Confirmed member only. Validate voter has `attendance.status=confirmed`. Check no existing vote (`match_stats` with same voterId+eventId). Validate no self-votes. Create `match_stats` doc. _Rule: 13-match-stats-voting_
- [ ] **GET /api/events/[id]/votes/status** — Authenticated. Returns `{ hasVoted: bool, votingOpen: bool, totalVoters: number, totalEligible: number }`. _Rule: 13-match-stats-voting_
- [ ] **POST /api/events/[id]/close-voting** — GroupAdmin or cron. Consolidate all `match_stats` docs. Count MVP votes, sum goals/assists/saves. Write `event_results/{eventId}`. Batch update `player_stats` with `FieldValue.increment`. Send FCM push to group with MVP result. _Rule: 13-match-stats-voting_
- [ ] **GET /api/groups/[id]/rankings** — Member access. Query `player_stats` by groupId. Sort by ranking score formula. Return top 10 with badges. _Rule: 13-match-stats-voting_
- [ ] **GET /api/players/[uid]/stats** — Authenticated. Return `player_stats` docs for this user across all groups. _Rule: 13-match-stats-voting_
- [ ] **POST /api/cron/open-voting** — Verify cron secret. Find events that ended 2h ago with no `event_results` doc. Send FCM push to confirmed members. Mark event as `voting_open`. _Rule: 13-match-stats-voting, 07-aws-services_
- [ ] **POST /api/cron/close-month-ranking** — Verify cron secret. For each group: query `event_results` from past month. Calculate top mvpWins, goals, assists. Update `monthlyBadges` in `player_stats`. Send FCM to each badge winner. _Rule: 13-match-stats-voting, 07-aws-services_

#### App Screens
- [ ] **Voting screen `(user)/events/[id]/vote.tsx`** — Only visible when `votingOpen=true` AND user confirmed presence AND `hasVoted=false`. Category tabs: MVP / Gols / Assistências / Defesas. Radio selection per tab (cannot select self). Submit button disabled until all tabs selected. _Rule: 13-match-stats-voting, 03-expo-app_
- [ ] **Post-vote result screen** — After submitting vote: show partial results (anonymized). After voting closes: show full result card — MVP with photo, top scorer, assists, saves, voter participation count. _Rule: 13-match-stats-voting_
- [ ] **Event result card in event detail** — After `event_results` exists: show MVP card prominently in event screen. Tap to see full stats breakdown. _Rule: 13-match-stats-voting, 03-expo-app_
- [ ] **Rankings screen `(user)/groups/[id]/rankings.tsx`** — Tabs: Este Mês / Histórico. Ordered list with avatar, name, score, badge icons. Tap player → player profile with full stats. _Rule: 13-match-stats-voting, 03-expo-app_
- [ ] **Player stats in profile screen** — Add stats section: badges row (current + last 6 months), stats grid (presences, goals, assists, saves, MVP wins), presence rate chart (recharts). _Rule: 13-match-stats-voting, 03-expo-app_
- [ ] **Badge display on member list** — In group member list: show current month badge icon next to player name if they have one. _Rule: 13-match-stats-voting_

#### Web Screens
- [ ] **Rankings page `(admin)/groups/[id]/rankings/page.tsx`** — Full rankings table with all stats columns. Badge icons. CSV export. _Rule: 13-match-stats-voting, 02-nextjs-web_

---

### 1.6 Push Notifications & S3

#### Notifications
- [ ] **`lib/notifications.ts`** — Server-side helpers: `sendToUser(uid, title, body, data)`, `sendToGroup(groupId, title, body, data)`, `sendToAdmin(groupId, title, body)`. Use `messaging.send()` from firebase-admin. _Rule: 04-firebase-firestore_
- [ ] **Register FCM token (app)** — On login: call `expo-notifications` to get push token. Save to `users/{uid}.fcmToken` via `PATCH /api/auth/me`. _Rule: 03-expo-app_
- [ ] **Notification triggers** — Wire up FCM pushes for: payment link sent, payment confirmed (webhook), event created, event cancelled, event reminder (cron), attendance updated. _Rule: 04-firebase-firestore_

#### S3 File Upload
- [ ] **POST /api/upload** — Authenticated. Receive `{ filename, contentType, scope }`. Generate S3 pre-signed PUT URL with 5min expiry. Return `{ uploadUrl, publicUrl }`. _Rule: 07-aws-services_
- [ ] **Avatar upload (app)** — Profile screen: pick image from gallery (`expo-image-picker`). Call `/api/upload`. PUT directly to S3 pre-signed URL. Save publicUrl via `PATCH /api/auth/me`. _Rule: 03-expo-app, 07-aws-services_
- [ ] **Avatar upload (web)** — Profile and group settings: same flow as app using browser `fetch`. _Rule: 02-nextjs-web, 07-aws-services_

---

### 1.7 Admin Web Dashboard

- [ ] **Dashboard page `(admin)/dashboard/page.tsx`** — KPI cards: total collected this month, pending count, overdue count, upcoming events this week. Revenue bar chart (recharts, last 6 months). _Rule: 02-nextjs-web_
- [ ] **Admin layout `(admin)/layout.tsx`** — Sidebar with navigation links. Topbar with user avatar + logout. Responsive (collapses to hamburger on mobile). _Rule: 02-nextjs-web_
- [ ] **Reports page `(admin)/reports/page.tsx`** — Monthly breakdown table. CSV export button (generates and downloads client-side). _Rule: 02-nextjs-web_

---

### 1.8 Production & Launch

- [ ] **EAS Build configuration** — Configure `eas.json` with `development`, `preview`, `production` profiles. Set up EAS secrets for all env vars. _Rule: 03-expo-app_
- [ ] **iOS provisioning** — Apple Developer account, App ID, provisioning profile, APNs certificate for push notifications. _Rule: 03-expo-app_
- [ ] **Android setup** — Google Play Console, keystore, Firebase SHA-1 for Google Sign-In. _Rule: 03-expo-app_
- [ ] **Production Asaas** — Switch `ASAAS_BASE_URL` to production. Test full payment flow end-to-end. _Rule: 06-payments-asaas_
- [ ] **Firestore indexes deploy** — Run `firebase deploy --only firestore:indexes` for all composite indexes. _Rule: 04-firebase-firestore_
- [ ] **CloudWatch alarms** — Create alarms: 5xx errors > 5 in 5min, API latency P95 > 2s. SNS email notification. _Rule: 07-aws-services_

---

## PHASE 2 — Venues & Improvements

### 2.1 Venue Data Model & Shared Types
- [ ] **Venue types in shared** — Add to `packages/shared/types`: `Venue`, `VenueCourt`, `VenueSlot`, `Booking`, `BookingPayment`, `VenueStatus`, `BookingStatus`. _Rule: 08-shared-package_
- [ ] **Venue schemas in shared** — `createVenueSchema`, `createCourtSchema`, `configureSlotSchema`, `createBookingSchema`. _Rule: 08-shared-package_
- [ ] **Firestore rules for venues** — Add rules for `venues`, `venue_courts`, `venue_slots`, `bookings`, `booking_payments`. Venue owner can write own venue. Admin SDK has full access. Public can read active venues. _Rule: 04-firebase-firestore_
- [ ] **Firestore indexes for venues** — Composite: venues by (sports array-contains + status), bookings by (venueId + date + status), booking_payments by (bookingId + status). _Rule: 04-firebase-firestore_

### 2.2 Venue Owner Auth & Onboarding
- [ ] **Firebase custom claim: venue_owner** — API Route `POST /api/venue-auth/claim` sets `{ role: 'venue_owner' }` custom claim after admin approval. _Rule: 05-authentication_
- [ ] **Venue owner auth guard** — Create `lib/venue-auth-middleware.ts` with `requireVenueOwner(req)` helper. _Rule: 05-authentication_
- [ ] **Venue owner registration page `/venue/register/page.tsx`** — Form: business name, CNPJ, address, phone. Explain Asaas account requirement. Submit creates pending venue owner request. _Rule: 02-nextjs-web_
- [ ] **Asaas subconta onboarding** — Guide venue owner through Asaas account creation/linking. Save `asaasAccountId` to user profile. Venue is not published until this is set. _Rule: 06-payments-asaas_

### 2.3 Venue Management (Owner Web Panel)
- [ ] **Venue owner layout `/venue/layout.tsx`** — Separate sidebar from admin panel. Links: Dashboard, Meus Venues, Reservas, Financeiro, Configurações. _Rule: 02-nextjs-web_
- [ ] **Venue dashboard `/venue/dashboard/page.tsx`** — Today's bookings, this month's revenue, occupancy rate per court, upcoming reservations calendar. _Rule: 02-nextjs-web_
- [ ] **POST /api/venues** — VenueOwner auth. Create venue doc with status `pending_approval`. _Rule: 04-firebase-firestore_
- [ ] **PATCH /api/venues/[id]** — VenueOwner auth. Update venue details, photos. _Rule: 04-firebase-firestore_
- [ ] **Venue create/edit page `/venue/venues/new/page.tsx`** — Form: name, description, address (with map pin), sports (multi-select), photos upload (S3), Asaas account link. _Rule: 02-nextjs-web_
- [ ] **POST /api/venues/[id]/courts** — VenueOwner auth. Create court with name, sport, capacity, pricePerHour, amenities. _Rule: 04-firebase-firestore_
- [ ] **Courts management page `/venue/venues/[id]/courts/page.tsx`** — List courts. Add/edit/deactivate courts. _Rule: 02-nextjs-web_
- [ ] **POST /api/venues/[id]/courts/[courtId]/slots** — VenueOwner auth. Bulk create slot schedule: day of week, start/end time, price override. _Rule: 04-firebase-firestore_
- [ ] **Slots configuration page `/venue/venues/[id]/courts/[courtId]/slots/page.tsx`** — Weekly grid UI. Each cell = a slot. Toggle active/inactive. Override price per slot. _Rule: 02-nextjs-web_
- [ ] **Bookings page `/venue/bookings/page.tsx`** — Calendar view of confirmed bookings. Click to see group name, members, payment status. _Rule: 02-nextjs-web_
- [ ] **Finance page `/venue/finance/page.tsx`** — Table of completed bookings with: date, group, totalAmount, platformFee, venueAmount received. _Rule: 02-nextjs-web_

### 2.4 Venue Discovery & Booking (Group Admin)
- [ ] **GET /api/venues** — Public. Filter by: sport (required), date (required), city. Return active venues with available slot count for the date. _Rule: 04-firebase-firestore_
- [ ] **GET /api/venues/[id]** — Public. Return venue + courts + slots. Mark slots booked on the requested date. _Rule: 04-firebase-firestore_
- [ ] **GET /api/venues/[id]/availability** — Public. Return available (unbooked) slots for a specific date. Exclude slots with existing confirmed bookings. _Rule: 04-firebase-firestore_
- [ ] **Public venue listing page `/venues/page.tsx`** — Search with sport + date filters. Map view (Google Maps) + list view. Card per venue with photos, price range, available slots count. _Rule: 02-nextjs-web_
- [ ] **Public venue detail page `/venues/[id]/page.tsx`** — Photos gallery, description, courts list, availability calendar. 'Reservar' button (requires group admin login). _Rule: 02-nextjs-web_

### 2.5 Booking Flow & Rateio
- [ ] **Asaas `createBookingCharge()` with split** — Add to `lib/asaas.ts`. Accepts `venueAsaasAccountId` and `platformFeePercent`. Sends split array to Asaas. _Rule: 06-payments-asaas_
- [ ] **POST /api/bookings** — GroupAdmin auth. Validate slot is available. Calculate rateio: `Math.ceil(totalAmount / confirmedCount)`. Create booking doc (status: `pending_payment`). Create one `booking_payment` per confirmed member. Call `createBookingCharge` for each member with split. Send FCM + WhatsApp to each member. _Rule: 06-payments-asaas, 04-firebase-firestore_
- [ ] **GET /api/bookings/[id]** — GroupAdmin auth. Return booking + all booking_payments with member names. _Rule: 04-firebase-firestore_
- [ ] **DELETE /api/bookings/[id]** — GroupAdmin auth. Allow cancel only if zero `booking_payments` with status `paid`. Cancel all Asaas charges. Update status to `cancelled`. _Rule: 06-payments-asaas_
- [ ] **Webhook handler — booking payments** — In `POST /api/webhooks/asaas`: detect if payment is a `booking_payment` (check metadata). Update `booking_payment` to `paid`. If all members paid: set `booking.status = 'confirmed'`. Auto-create event in group. Send FCM to venue owner. _Rule: 06-payments-asaas_
- [ ] **EventBridge job: cancel unpaid bookings** — `POST /api/cron/cancel-unpaid-bookings`: find bookings with `pending_payment` status where date is < 24h away. Cancel remaining charges. Set status `cancelled`. Notify admin. _Rule: 07-aws-services_

### 2.6 Venue Screens in App
- [ ] **Venue search screen `(admin)/venues/index.tsx`** — Date picker + sport filter. List/map toggle. Calls `GET /api/venues`. _Rule: 03-expo-app_
- [ ] **Venue detail screen `(admin)/venues/[id].tsx`** — Photos carousel, description, courts with prices. Availability calendar. 'Reservar' button. _Rule: 03-expo-app_
- [ ] **Booking confirmation screen `(admin)/venues/[id]/book.tsx`** — Show: court name, date/time, total amount, amount per member (based on confirmed count). Confirm button calls `POST /api/bookings`. _Rule: 03-expo-app_
- [ ] **Booking status screen `(admin)/bookings/[id].tsx`** — List of members with payment status (paid/pending). Total collected vs total expected. Cancel booking button. _Rule: 03-expo-app_
- [ ] **Member booking payment screen `(user)/bookings/[id].tsx`** — My share amount. Pix QR code link. Payment deadline. _Rule: 03-expo-app_

### 2.6b Monetization & Subscriptions
- [ ] **Subscription plan enforcement** — Add middleware check: if group `plan=free` and `memberIds.length > 20`, block invite acceptance. If `plan=free` and admin tries to add diarista, show upgrade prompt. _Rule: 00-project-overview_
- [ ] **POST /api/groups/[id]/subscribe** — Admin only. Create Asaas recurring charge for Pro or Club plan. Set `group.plan` and `group.planExpiresAt`. _Rule: 06-payments-asaas_
- [ ] **Subscription webhook** — Handle Asaas recurring payment events: `PAYMENT_CONFIRMED` → extend `planExpiresAt`. `PAYMENT_OVERDUE` → set group to read-only mode. _Rule: 06-payments-asaas_
- [ ] **Upgrade prompt screens** — In app and web: when user hits Free limit, show paywall screen with plan comparison and monthly/annual toggle. _Rule: 03-expo-app, 02-nextjs-web_
- [ ] **Grace period logic** — On subscription expiry: 7-day grace period before restricting. Send push reminders at day 1, 3, and 7. _Rule: 06-payments-asaas_

### 2.7 Facebook OAuth (Phase 2)
- [ ] **Meta Developer App setup** — Create app on Meta for Developers. Configure privacy policy URL. Submit for review. _Rule: 05-authentication_
- [ ] **Facebook OAuth in app** — Install `react-native-fbsdk-next`. Add Facebook Sign-In button to login screen. Wire to Firebase Auth `FacebookAuthProvider`. _Rule: 05-authentication_
- [ ] **Facebook OAuth on web** — Add `FacebookAuthProvider` popup to login page. _Rule: 05-authentication_

### 2.8 Other Phase 2 Improvements
- [ ] **Reports: revenue charts** — recharts bar chart of monthly revenue on admin dashboard. Filter by group. _Rule: 02-nextjs-web_
- [ ] **Reports: CSV export** — Download button on reports page. Generate CSV client-side from React Query data. _Rule: 02-nextjs-web_
- [ ] **Event waitlist** — When `confirmedCount >= maxPlayers`: add to `waitlist` array. Auto-promote from waitlist when someone declines. _Rule: 04-firebase-firestore_
- [ ] **Co-admins per group** — Add `coAdminIds: string[]` to group. `requireGroupAdmin` checks both `adminId` and `coAdminIds`. UI to add/remove co-admins. _Rule: 04-firebase-firestore_

---

## PHASE 3 — Scale

- [ ] **Premium plans** — Add `plan: 'free' | 'premium'` to groups. Free: max 2 groups, 20 members. Premium: unlimited. Integrate Asaas recurring subscription for premium. _Rule: 06-payments-asaas_
- [ ] **PWA** — Add `next-pwa` to web package. Configure service worker, manifest, offline fallback page. _Rule: 02-nextjs-web_
- [ ] **Google Calendar sync** — On event create/update: call Google Calendar API to create/update calendar event. OAuth scope for calendar. _Rule: 05-authentication_
- [ ] **WhatsApp Business API** — Replace manual `wa.me` links with automated messages via WhatsApp Cloud API. Template messages for payment reminders and event notifications. _Rule: 09-whatsapp_

---

## OUT OF SCOPE — Never implement without explicit discussion
- SMS OTP / phone number authentication
- Any separate backend server (NestJS, Express, standalone Node.js API)
- Direct Firestore writes from the app (except `onSnapshot` reads)
- DynamoDB or any SQL/relational database
- AWS SNS for push notifications (use FCM)
- Stripe or other international payment gateways (use Asaas)
- Manual booking confirmation by venue owner (auto-confirm on payment)
