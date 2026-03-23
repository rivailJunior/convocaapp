# SportsPay — Development Roadmap & Task Breakdown

> **Collaboration-friendly task list for any IDE/editor**
> Mark tasks as complete: `[ ]` → `[x]`
> Assign tasks to team members in comments or project management tool

---

## 📌 How to Use This Document

**For teams:**
1. Review each milestone with your team
2. Assign tasks to team members (use comments, Jira, Trello, etc.)
3. Break large tasks into smaller sub-tasks as needed
4. Update checkboxes as work completes
5. Use this as source of truth for what's done/in-progress/todo

**Task format:**
```
- [ ] **Task title** — Brief description. Technologies: React Native, TypeScript, etc.
  - Acceptance criteria: What "done" looks like
  - Notes: Implementation hints, gotchas, dependencies
```

---

## 🎯 Project Overview

**What we're building:**  
Mobile app (iOS + Android) for organizing amateur sports groups in Brazil.

**Core features:**
- Create groups (participants, Pix key)
- Create events
- Generate teams (random or manual)
- Share via WhatsApp (text + images)

**Architecture:**
- **Monorepo** (Turborepo + pnpm)
- **App**: React Native + Expo
- **Web** (future): Next.js 14
- **Shared**: TypeScript types, Zod schemas, utilities
- **Backend**: Firebase + AWS (provisioned but not used in MVP)

**Timeline:** 10-11 weeks to App Store + Play Store launch

---

## MILESTONE 0 — Project Setup & Infrastructure (Week 1)

**Goal:** Get monorepo running, provision backend services (but don't integrate yet)

### 0.1 Monorepo Initialization

- [ ] **Initialize Turborepo monorepo**
  - Command: `npx create-turbo@latest sportspay --package-manager pnpm`
  - Verify: `turbo.json` exists with `build`, `dev`, `lint`, `type-check` tasks
  - Tech: Turborepo, pnpm workspaces

- [ ] **Configure shared TypeScript config**
  - Create `tsconfig.base.json` at root with strict mode, ES2022 target
  - Each package extends this config
  - Tech: TypeScript 5+

- [ ] **Configure linting and formatting**
  - Root `.eslintrc.js` with TypeScript, React, React Native rules
  - Root `.prettierrc` with `singleQuote: true`, `trailingComma: all`
  - Add scripts to `package.json`: `lint`, `format`
  - Tech: ESLint, Prettier

- [ ] **Set up CI pipeline**
  - Create `.github/workflows/ci.yml`
  - On push/PR: install deps → lint → type-check
  - Tech: GitHub Actions

**Acceptance:** `pnpm install` works, `pnpm turbo dev` runs without errors, CI passes on a test PR

---

### 0.2 Shared Package (`packages/shared`)

- [ ] **Scaffold shared package**
  - Create `packages/shared` folder
  - Add `package.json` with `name: "@sportspay/shared"`, `main: "src/index.ts"`
  - Add `tsconfig.json` extending base config
  - Tech: TypeScript

- [ ] **Define core types**
  - File: `src/types/index.ts`
  - Types: `Sport`, `Participant`, `Group`, `Event`, `Team`, `Attendance`, `AppConfig`
  - Export all types from main index
  - Tech: TypeScript
  - Acceptance: Types can be imported in other packages

- [ ] **Create Zod validation schemas**
  - File: `src/schemas/index.ts`
  - Schemas: `participantSchema`, `groupSchema`, `eventSchema`, `attendEventSchema`
  - Include PT-BR error messages
  - Export inferred types alongside schemas
  - Tech: Zod
  - Acceptance: Can validate a group object with `groupSchema.parse()`

- [ ] **Build utility functions**
  - File: `src/utils/index.ts`
  - Functions: `formatCurrency(centavos)`, `formatMonth(date)`, `currentReferenceMonth()`, `whatsappLink(phone, message)`, team generator utility
  - File: `src/utils/whatsapp-messages.ts`
  - Templates: `paymentLink()`, `eventReminder()`, `inviteLink()`, `teamDraw()`
  - Tech: TypeScript, date-fns
  - Acceptance: `formatCurrency(5000)` returns "R$ 50,00"

- [ ] **Define constants**
  - File: `src/constants/index.ts`
  - Constants: `SPORTS` array, `DEFAULT_TEAM_COLORS` array, `STORAGE_KEYS` object
  - Use `as const` for type safety
  - Tech: TypeScript
  - Acceptance: `SPORTS[0]` is type `'futebol'` not `string`

**Acceptance:** All packages can import from `@sportspay/shared`, types work in IDE autocomplete

---

### 0.3 Mobile App Package (`packages/app`)

- [ ] **Initialize Expo app**
  - Command: `cd packages && npx create-expo-app@latest app --template tabs`
  - Configure `app.config.ts`: bundle IDs, scheme `sportspay://`, app name
  - Tech: Expo SDK 51+, TypeScript

- [ ] **Install mobile dependencies**
  - Core: `nativewind`, `tailwindcss`, `@tanstack/react-query`, `zustand`
  - Forms: `react-hook-form`, `zod`
  - Navigation: `expo-router`
  - Storage: `@react-native-async-storage/async-storage`
  - Sharing: `expo-clipboard`, `expo-sharing`, `expo-image-manipulator`
  - Graphics: `react-native-svg`, `react-native-view-shot`
  - Utils: `axios`, `date-fns`, `react-native-reanimated`, `react-native-gesture-handler`
  - Tech: npm/pnpm

- [ ] **Configure NativeWind (Tailwind for React Native)**
  - Create `tailwind.config.js` pointing to `app/**/*.tsx`
  - Update `metro.config.js` with `withNativeWind` wrapper
  - Test: Create a component with `className="bg-green-500"` and verify it works
  - Tech: NativeWind 4+
  - Acceptance: Tailwind classes apply styles in app

- [ ] **Configure React Query**
  - Wrap root `app/_layout.tsx` with `QueryClientProvider`
  - Set defaults: `staleTime: 60000`, `retry: 2`
  - Tech: TanStack React Query
  - Acceptance: Can use `useQuery` hook in any screen

- [ ] **Set up folder structure**
  - Create folders: `components/`, `hooks/`, `lib/`, `store/`, `types/`, `constants/`
  - Move default screens to `app/` folder for Expo Router
  - Tech: File organization
  - Acceptance: Clean folder structure ready for development

**Acceptance:** App runs on iOS simulator and Android emulator, NativeWind works, can import from `@sportspay/shared`

---

### 0.4 Web Package (`packages/web`) — Future Backend

**Note:** This is built but NOT used in MVP. Ready for Phase 8+ when backend features are needed.

- [ ] **Initialize Next.js app**
  - Command: `cd packages && npx create-next-app@latest web --typescript --tailwind --app`
  - Remove default boilerplate pages
  - Tech: Next.js 14 (App Router)

- [ ] **Install web dependencies**
  - UI: `shadcn/ui` (run init), `recharts`, `react-qr-code`
  - Backend: `firebase`, `firebase-admin`, `@aws-sdk/client-s3`, `@aws-sdk/s3-request-presigner`
  - Forms: `react-hook-form`, `zod`, `@tanstack/react-query`
  - Utils: `axios`, `date-fns`
  - Tech: npm/pnpm

- [ ] **Set up environment variables**
  - Create `.env.example` with all required vars (Firebase, AWS, etc.)
  - Create `lib/env.ts` to validate env vars with Zod on startup
  - Tech: Zod, dotenv
  - Acceptance: App throws clear error if env var missing

- [ ] **Create Firebase Admin singleton**
  - File: `lib/firebase-admin.ts`
  - Export: `db` (Firestore), `auth`, `messaging`
  - Use `getApps().length` guard to prevent re-initialization
  - Tech: firebase-admin
  - Acceptance: Can import `db` and use in API Routes

- [ ] **Create auth middleware helpers**
  - File: `lib/auth-middleware.ts`
  - Functions: `verifyToken(req)` (verify Firebase JWT), `requireGroupAdmin(uid, groupId)`
  - Tech: firebase-admin
  - Acceptance: Can protect an API Route with `verifyToken`

- [ ] **Create API client for browser**
  - File: `lib/api-client.ts`
  - Axios instance with baseURL from env
  - Interceptor to attach Firebase JWT from `currentUser.getIdToken()`
  - Tech: axios, firebase (client SDK)
  - Acceptance: Can make authenticated request from browser

**Acceptance:** Web package builds successfully (`npm run build`), API skeleton is ready

---

### 0.5 Backend Services Provisioning

**Note:** Set up now, use in Phase 8+

- [ ] **Create Firebase project**
  - Go to Firebase Console
  - Create new project "SportsPay"
  - Enable: Firestore (production mode), Authentication (Google provider), Storage, Cloud Messaging (FCM)
  - Download service account JSON for Admin SDK
  - Add credentials to `.env`
  - Tech: Firebase Console
  - Acceptance: Can initialize Firebase Admin SDK without errors

- [ ] **Deploy Firestore security rules**
  - File: `firestore.rules`
  - Rules: authenticated users can read own data, Admin SDK has full access
  - Deploy: `firebase deploy --only firestore:rules`
  - Tech: Firebase CLI
  - Acceptance: Rules deployed, test with Firestore emulator

- [ ] **Create Firestore indexes**
  - File: `firestore.indexes.json`
  - Indexes: payments by (groupId + referenceMonth), events by (groupId + date + status)
  - Deploy: `firebase deploy --only firestore:indexes`
  - Tech: Firebase CLI
  - Acceptance: Composite queries work in Firestore

- [ ] **Set up Google OAuth**
  - Go to Google Cloud Console
  - Create OAuth 2.0 Client IDs for: Web, iOS, Android
  - Add authorized redirect URIs
  - Add client IDs to `.env`
  - Tech: Google Cloud Console
  - Acceptance: OAuth credentials ready for use

- [ ] **Create AWS S3 bucket**
  - Bucket name: `sportspay-uploads`
  - Region: `sa-east-1` (São Paulo)
  - Configure CORS for PUT requests from app domain
  - Create IAM user with S3 write-only policy
  - Add AWS credentials to `.env`
  - Tech: AWS Console
  - Acceptance: Can generate pre-signed URL and upload file

- [ ] **Set up AWS Amplify Hosting**
  - Connect GitHub repo to Amplify
  - Configure build settings for Next.js 14 SSR
  - Set all environment variables in Amplify console
  - Tech: AWS Amplify Console
  - Acceptance: Push to `main` triggers automatic deploy

- [ ] **Create AWS EventBridge scheduler rules**
  - 4 rules: generate-payments (day 1), generate-events (Monday 7am), overdue-alerts (day 5, 15), cleanup-invites (Sunday 3am)
  - Point to Amplify deployment URL + API Route path
  - Set `x-cron-secret` header
  - Tech: AWS EventBridge Console
  - Acceptance: Manual trigger of rule calls API Route successfully

**Acceptance:** All backend services provisioned and accessible, credentials in `.env`, but NOT integrated into app yet

---

## MILESTONE 1 — Local CRUD (Weeks 2-3)

**Goal:** Groups and events working with local storage only

### 1.1 Storage Layer

- [ ] **Build AsyncStorage wrapper**
  - File: `packages/app/lib/storage.ts`
  - Functions: `getGroups()`, `setGroups(groups)`, `getEvents(groupId)`, `setEvents(groupId, events)`, `getAppConfig()`, `setAppConfig(config)`
  - All functions are typed with interfaces from `@sportspay/shared`
  - Handle JSON serialization/deserialization
  - Tech: AsyncStorage, TypeScript
  - Acceptance: Can save and load a group array

- [ ] **Build useGroups hook**
  - File: `packages/app/hooks/useGroups.ts`
  - State: `groups`, `loading`
  - Functions: `createGroup(data)`, `updateGroup(id, updates)`, `deleteGroup(id)`, `refreshGroups()`
  - Loads from AsyncStorage on mount
  - Tech: React hooks, AsyncStorage
  - Acceptance: Create a group, close app, reopen → group is still there

- [ ] **Build useEvents hook**
  - File: `packages/app/hooks/useEvents.ts`
  - Similar to useGroups but for events within a group
  - Key: `events_{groupId}`
  - Functions: `createEvent()`, `updateEvent()`, `deleteEvent()`, `cloneEvent()`, `refreshEvents()`
  - Tech: React hooks, AsyncStorage
  - Acceptance: Create event, close app, reopen → event persists

---

### 1.2 Base UI Components

- [ ] **Button component**
  - File: `packages/app/components/ui/Button.tsx`
  - Props: `title`, `onPress`, `variant` (primary, secondary, ghost), `disabled`
  - Styling: NativeWind classes, green primary, gray secondary
  - Tech: React Native, NativeWind
  - Acceptance: Renders correctly, press works, disabled state shows

- [ ] **Input component**
  - File: `packages/app/components/ui/Input.tsx`
  - Props: `label`, `value`, `onChangeText`, `placeholder`, `error`, `secureTextEntry`
  - Shows error message below if provided
  - Tech: React Native, NativeWind
  - Acceptance: Text input works, error displays

- [ ] **Card component**
  - File: `packages/app/components/ui/Card.tsx`
  - Props: `children`, `onPress?` (makes it tappable)
  - Style: white bg, 16px radius, 2px shadow
  - Tech: React Native, NativeWind
  - Acceptance: Card renders with shadow, press works if provided

- [ ] **Badge component**
  - File: `packages/app/components/ui/Badge.tsx`
  - Props: `text`, `variant` (success, warning, error, default)
  - Style: colored pill badges (green, orange, red, gray)
  - Tech: React Native, NativeWind
  - Acceptance: Badge displays with correct color per variant

- [ ] **Modal component**
  - File: `packages/app/components/ui/Modal.tsx`
  - Props: `visible`, `onClose`, `title`, `children`
  - Wraps React Native Modal, adds backdrop dismiss
  - Tech: React Native Modal
  - Acceptance: Modal shows/hides, backdrop closes it

---

### 1.3 Groups Feature

- [ ] **Groups list screen**
  - File: `app/groups/index.tsx`
  - Shows list of groups from `useGroups()`
  - Each group: GroupCard component (sport icon, name, participant count, next event)
  - Empty state: illustration + "Criar primeiro grupo" button
  - FAB at bottom-right to create new group
  - Tech: Expo Router, FlatList
  - Acceptance: List displays, tap card navigates to group detail, FAB navigates to create

- [ ] **GroupCard component**
  - File: `packages/app/components/groups/GroupCard.tsx`
  - Props: `group`, `onPress`
  - Display: sport icon (⚽🏐🏀⚙️), group name (bold), participant count (gray)
  - Tech: React Native, NativeWind
  - Acceptance: Card shows correct data, tap works

- [ ] **Create group screen**
  - File: `app/groups/create.tsx`
  - Form: name (Input), sport (4 radio buttons), Pix key (Input), participants list (dynamic rows)
  - Each participant row: Input + remove "×" button
  - "+ Adicionar participante" button adds row
  - "Criar Grupo" button validates with Zod, calls `createGroup()`, navigates to group detail
  - Tech: react-hook-form, Zod, Expo Router
  - Acceptance: Can create group with name, sport, Pix, 3+ participants

- [ ] **Group detail screen**
  - File: `app/groups/[id]/index.tsx`
  - Top: group name, edit icon (navigates to edit screen)
  - Hero card: participant avatars (circles or initials), count, Pix key with copy button
  - Events section: list of events from `useEvents(groupId)`
  - FAB: create new event
  - Tech: Expo Router, expo-clipboard
  - Acceptance: Shows group data, copy Pix works (shows toast), events list displays

- [ ] **PixDisplay component**
  - File: `packages/app/components/groups/PixDisplay.tsx`
  - Props: `pixKey`
  - Display: Pix key in gray card with small copy icon button
  - On press: copy to clipboard, show green toast "Copiado!"
  - Tech: expo-clipboard, react-native-toast-message
  - Acceptance: Tap copy → clipboard has key, toast shows

- [ ] **Edit group screen**
  - File: `app/groups/[id]/edit.tsx`
  - Same form as create but pre-filled with group data
  - "Salvar Alterações" button calls `updateGroup()`
  - Danger zone: "Excluir Grupo Permanentemente" button with confirmation modal
  - Delete calls `deleteGroup()`, navigates back to list
  - Tech: react-hook-form, Zod
  - Acceptance: Can edit name, participants; delete works with confirmation

- [ ] **ParticipantRow component**
  - File: `packages/app/components/groups/ParticipantRow.tsx`
  - Props: `participant`, `onRemove?` (if editable)
  - Display: name, optional remove "×" button
  - Tech: React Native
  - Acceptance: Shows name, remove button works if provided

**Milestone 1.3 Acceptance:** Can create, view, edit, delete groups; all data persists locally

---

### 1.4 Events Feature

- [ ] **Create event screen**
  - File: `app/groups/[id]/events/create.tsx`
  - Form: name (Input), date/time (picker), location (Input, optional), notes (TextArea, optional)
  - "Criar Evento" button validates, calls `createEvent()`, navigates to event detail
  - Tech: react-hook-form, Zod, date picker library
  - Acceptance: Can create event with name + date, location/notes optional

- [ ] **EventCard component**
  - File: `packages/app/components/events/EventCard.tsx`
  - Props: `event`, `onPress`
  - Display: event name (bold), date formatted (PT-BR), location, teams indicator badge
  - Tech: React Native, date-fns
  - Acceptance: Card shows event data, tap navigates

- [ ] **Event detail screen**
  - File: `app/groups/[id]/events/[eventId].tsx`
  - Top: event name, overflow menu (edit, clone, delete)
  - Info card: date/time, location, notes
  - Teams section (if teams generated): list of TeamCard components
  - Attendances section (if feature enabled): list of confirmed avatars
  - Action buttons: "Gerar Times" (if no teams), "Editar Times" (if teams exist), "Compartilhar"
  - Tech: Expo Router
  - Acceptance: Shows event info, buttons navigate correctly

- [ ] **Edit event screen**
  - File: `app/groups/[id]/events/[eventId]/edit.tsx`
  - Same form as create but pre-filled
  - "Salvar Alterações" button calls `updateEvent()`
  - Delete button with confirmation calls `deleteEvent()`, navigates back
  - Tech: react-hook-form, Zod
  - Acceptance: Can edit event fields, delete works

- [ ] **Clone event action**
  - In event detail overflow menu: "Clonar Evento" option
  - Calls `cloneEvent(eventId)` from hook
  - Duplicates event with name + " (cópia)", date = today, teams/attendances cleared
  - Navigates to new event detail
  - Tech: useEvents hook
  - Acceptance: Clone creates new event with cleared teams, keeps group/participants

**Milestone 1.4 Acceptance:** Can create, view, edit, delete, clone events; all data persists

---

## MILESTONE 2 — Team Generation (Weeks 4-5)

**Goal:** Generate teams automatically with 3 modes

### 2.1 Team Generator Algorithm

- [ ] **Build team generator utility**
  - File: `packages/shared/utils/team-generator.ts`
  - Function: `generateTeams({ participants, mode, value, teamColors? })`
  - Modes: `'by_team_count'` (value = # of teams), `'by_players_per_team'` (value = players per team)
  - Algorithm: Fisher-Yates shuffle, then distribute evenly
  - Returns: `{ teams: Team[], bench: Participant[] }`
  - Validation: min 2 teams, enough players
  - Tech: TypeScript, math
  - Acceptance: `generateTeams({ participants: [25 people], mode: 'by_team_count', value: 3 })` returns 3 teams of ~8 + bench

- [ ] **Define team colors constant**
  - File: `packages/shared/constants/index.ts`
  - Constant: `DEFAULT_TEAM_COLORS` array with 6+ hex colors (green, blue, orange, purple, red, teal)
  - Tech: TypeScript
  - Acceptance: Team generator uses these colors by default

---

### 2.2 Team Generation UI

- [ ] **Team generation screen**
  - File: `app/groups/[id]/events/[eventId]/teams.tsx`
  - Mode selector: 3 pill buttons (Por times | Por jogadores | Manual)
  - Input: Number input for value (team count or players per team)
  - Preview text: "Resultado: X times de Y jogadores • Z no banco"
  - "Sortear!" button: calls `generateTeams()`, shows result
  - Result: list of TeamCard components with colored headers
  - "Refazer Sorteio" button: re-runs shuffle
  - "Salvar Times" button: saves to event via `updateEvent({ teams })`, navigates back
  - Tech: React Native, team-generator utility
  - Acceptance: Can generate teams with both modes, shuffle works, save persists teams to event

- [ ] **TeamGenerator component**
  - File: `packages/app/components/teams/TeamGenerator.tsx`
  - Props: `participants`, `onGenerate` callback
  - UI: mode selector, value input, preview, "Sortear!" button
  - Calls parent callback with `{ teams, bench }` result
  - Tech: React Native
  - Acceptance: Component works standalone, passes result to parent

- [ ] **TeamCard component**
  - File: `packages/app/components/teams/TeamCard.tsx`
  - Props: `team` (with color, name, players)
  - Display: colored header with team name (e.g., "Time A"), list of player names
  - Background tint with team color
  - Tech: React Native, NativeWind
  - Acceptance: Card displays with correct color, players listed

- [ ] **Display teams in event detail**
  - In `app/groups/[id]/events/[eventId].tsx`
  - If `event.teams` exists: show "Times Gerados" section with TeamCard per team
  - If `event.bench` exists: show "Banco" section
  - "Editar Times" button navigates to teams screen in edit mode
  - Tech: React Native
  - Acceptance: Teams display with colors, bench shows if exists

**Milestone 2 Acceptance:** Can generate teams with 2 modes, teams display with colors, data persists

---

## MILESTONE 3 — Manual Team Editing (Week 6)

**Goal:** Drag-and-drop interface for rearranging players between teams

### 3.1 Drag-and-Drop Setup

- [ ] **Install drag-drop library**
  - Option 1: `react-native-draggable-flatlist`
  - Option 2: `react-native-gesture-handler` + `react-native-reanimated` (manual implementation)
  - Tech: npm/pnpm
  - Acceptance: Library installed, example works

---

### 3.2 Team Editor UI

- [ ] **TeamEditor component**
  - File: `packages/app/components/teams/TeamEditor.tsx`
  - Props: `teams`, `bench`, `onUpdate` callback
  - UI: each team is a drop zone, players are draggable chips
  - Drag handles (≡≡ icon) on each player chip
  - On drag: chip lifts (shadow + scale animation)
  - On drop: updates team arrays
  - Banco is also a drop zone
  - "Salvar Alterações" button calls `onUpdate` with new teams
  - Tech: react-native-gesture-handler, reanimated
  - Acceptance: Can drag player from Team A to Team B, changes persist on save

- [ ] **Edit mode in teams screen**
  - In `app/groups/[id]/events/[eventId]/teams.tsx`
  - When navigated from "Editar Times" button: show TeamEditor instead of TeamGenerator
  - Load existing `event.teams` and `event.bench`
  - On save: call `updateEvent({ teams, bench })`
  - Tech: Expo Router (navigation params)
  - Acceptance: Edit mode loads existing teams, drag works, save persists changes

**Milestone 3 Acceptance:** Can manually rearrange players between teams via drag-and-drop

---

## MILESTONE 4 — Sharing (Weeks 7-8)

**Goal:** Share event details as text (WhatsApp) and image (social media)

### 4.1 WhatsApp Text Sharing

- [ ] **Build WhatsApp formatter**
  - File: `packages/shared/utils/whatsapp-formatter.ts`
  - Function: `formatEventMessage({ event, group, includePixKey? })`
  - Returns formatted string with:
    - Emoji header (⚽/🏐/🏀)
    - Event name + date
    - Location (if set)
    - Teams with player names
    - Pix key (if includePixKey)
    - Footer: "Confirma presença! 🙋‍♂️"
  - Tech: TypeScript, date-fns
  - Acceptance: Output is clean, readable, ready for WhatsApp

- [ ] **Share screen**
  - File: `app/groups/[id]/events/[eventId]/share.tsx`
  - Section 1: Text preview (formatted message in gray card)
  - Button row: "Copiar Texto" (clipboard icon) + "Compartilhar" (WhatsApp icon, green)
  - Section 2: Image preview (rendered SVG template)
  - Button: "Compartilhar Imagem" (Instagram icon)
  - Tech: Expo Router
  - Acceptance: Screen shows both sections, buttons work

- [ ] **Copy to clipboard action**
  - Use `expo-clipboard.setStringAsync(text)`
  - Show success toast "Copiado!" (green)
  - Tech: expo-clipboard, toast library
  - Acceptance: Tap copy → clipboard has text, toast shows

- [ ] **Share to WhatsApp action**
  - Use `expo-sharing.shareAsync({ message: text })`
  - Opens native share sheet with WhatsApp as option
  - Tech: expo-sharing
  - Acceptance: Tap share → WhatsApp opens with pre-filled message

---

### 4.2 Image Sharing

- [ ] **Build SVG template for teams**
  - File: `packages/app/lib/image-templates.ts`
  - Component: `TeamCardTemplate` (renders as SVG)
  - Layout: green gradient background, group name, date, teams with colored headers, players, Pix key footer
  - Dimensions: 800x1200px
  - Tech: react-native-svg
  - Acceptance: Template renders correctly in Share screen preview

- [ ] **Build useImageExport hook**
  - File: `packages/app/hooks/useImageExport.ts`
  - Uses `react-native-view-shot.captureRef()` to capture SVG as PNG
  - Saves PNG to temp file via `expo-file-system`
  - Returns: `{ svgRef, exportImage: async () => string (URI) }`
  - Tech: react-native-view-shot, expo-file-system
  - Acceptance: Calling `exportImage()` returns URI to PNG file

- [ ] **Image preview in share screen**
  - Render `<TeamCardTemplate ref={svgRef} ... />` in share screen
  - "Compartilhar Imagem" button calls `exportImage()` then `expo-sharing.shareAsync(uri)`
  - Opens native share sheet with PNG attachment
  - Tech: expo-sharing, image-templates
  - Acceptance: Tap share image → share sheet opens with image, can share to Instagram/Twitter

- [ ] **Additional image templates (optional)**
  - Scoreboard template (if scores tracked)
  - Stats template (if stats tracked)
  - Tech: react-native-svg
  - Acceptance: Multiple templates available in share screen

**Milestone 4 Acceptance:** Can share event as WhatsApp text and as image to social media

---

## MILESTONE 5 — Polish & Extras (Weeks 9-10)

**Goal:** Optional features + UX polish before launch

### 5.1 Attendance Tracking (Optional)

- [ ] **AttendanceList component**
  - File: `packages/app/components/events/AttendanceList.tsx`
  - Props: `event`, `group`, `onUpdate`
  - UI: list of all group participants with toggle (Confirmed ✓ | Pending ? | Declined ✗)
  - Save to `event.attendances[]` array
  - Tech: React Native
  - Acceptance: Can mark participants as confirmed/declined, persists to event

- [ ] **Filter confirmed in team generator**
  - In TeamGenerator component: add checkbox "Apenas confirmados"
  - If checked: filter `participants` to only those with `attendance.status === 'confirmed'`
  - Tech: JavaScript filter
  - Acceptance: Teams only include confirmed players when checkbox is on

- [ ] **Display attendance in event detail**
  - In event detail screen: show "Confirmados (9)" section with avatar grid
  - Tech: React Native
  - Acceptance: Attendance count and avatars display

---

### 5.2 Clone Event

- [ ] **Clone event action** (Already implemented in Milestone 1.4, verify it works)
  - Acceptance: Clone creates new event with new date, teams cleared

---

### 5.3 Import Participant List

- [ ] **Build list parser utility**
  - File: `packages/shared/utils/list-parser.ts`
  - Function: `parseParticipantList(text: string): Participant[]`
  - Logic: split by `\n`, trim, filter empty, map to Participant objects
  - Tech: TypeScript
  - Acceptance: Pasting "João\nPedro\nCarlos" returns 3 participants

- [ ] **Import modal in create group**
  - In create group screen: "Importar Lista" button opens modal
  - Modal: large TextArea + "Colar" button (pastes from clipboard) + "Importar" button
  - On import: parse text, add to participants array
  - Tech: Modal, expo-clipboard, list-parser
  - Acceptance: Can paste list of names and import as participants

---

### 5.4 Onboarding & Settings

- [ ] **Onboarding screens**
  - Files: `app/(onboarding)/step1.tsx`, `step2.tsx`, `step3.tsx`
  - 3 screens with illustrations:
    1. "Organize seus rachões"
    2. "Gere times automaticamente"
    3. "Compartilhe facilmente"
  - Skip button on each, "Próximo" button, "Começar" on last
  - On complete: set `appConfig.onboardingCompleted = true`, navigate to groups list
  - Tech: Expo Router, AsyncStorage
  - Acceptance: Onboarding shows on first launch only

- [ ] **Settings screen**
  - File: `app/settings.tsx`
  - Sections:
    - Aparência: "Tema" toggle (Claro | Escuro)
    - Dados: "Exportar grupos e eventos", "Importar dados"
    - Sobre: "Versão", "Política de Privacidade", "Termos de Uso", "Enviar Feedback"
    - Futuro (grayed): "Sincronizar na nuvem" (Em breve), "Notificações" (Em breve)
  - Tech: React Native
  - Acceptance: Settings screen displays, dark mode toggle works

- [ ] **Dark mode implementation**
  - Use NativeWind `dark:` variants in all components
  - Save theme preference in `appConfig.theme`
  - Apply via context provider or Zustand store
  - Tech: NativeWind, AsyncStorage
  - Acceptance: Toggle dark mode → all screens update colors

---

### 5.5 App Identity

- [ ] **Design app icon**
  - 1024x1024px icon with SportsPay branding (ball + payment reference)
  - Export all required sizes (iOS + Android)
  - Set in `app.config.ts`: `icon` field
  - Tech: Figma/Sketch, expo-icon
  - Acceptance: Icon shows on device home screen

- [ ] **Design splash screen**
  - Splash with app icon + name, green background
  - Set in `app.config.ts`: `splash` field
  - Tech: Figma/Sketch
  - Acceptance: Splash shows on app launch

- [ ] **Finalize app name & bundle IDs**
  - App name: "SportsPay"
  - iOS bundle ID: `com.sportspay.app`
  - Android package: `com.sportspay.app`
  - Set in `app.config.ts`
  - Tech: Expo config
  - Acceptance: Bundle IDs are correct in builds

**Milestone 5 Acceptance:** Attendance works, import list works, onboarding shows once, dark mode works, icon + splash set

---

## MILESTONE 6 — Backend Prep (Week 10, Optional)

**Goal:** Build API Routes (not called by app yet, ready for Phase 8+)

**Note:** This milestone can be skipped for MVP launch. Backend is ready but unused.

### 6.1 API Routes (Web Package)

- [ ] **POST /api/auth/register**
  - Verify Firebase token (from header)
  - Create user doc in Firestore `users/{uid}`
  - Return user object
  - Tech: Next.js API Route, firebase-admin
  - Test: Postman with mock Firebase token

- [ ] **GET /api/groups**
  - Query Firestore: groups where `memberIds array-contains uid`
  - Return groups array
  - Tech: Firestore query
  - Test: Postman with auth header

- [ ] **POST /api/groups**
  - Validate body with `createGroupSchema`
  - Create group doc in Firestore
  - Add uid to `adminGroupIds` and `memberIds`
  - Return group object
  - Tech: Zod, Firestore
  - Test: Postman POST with group data

- [ ] **GET /api/groups/[id]**
  - Verify user is member
  - Return group doc
  - Tech: Firestore
  - Test: Postman with group ID

- [ ] **PATCH /api/groups/[id]**
  - Admin only (check `adminId` or `coAdminIds`)
  - Update group fields
  - Tech: Firestore update
  - Test: Postman PATCH with updates

- [ ] **POST /api/groups/[id]/events**
  - Admin only
  - Create event doc in Firestore
  - Tech: Firestore
  - Test: Postman POST with event data

- [ ] **GET /api/events/[id]**
  - Return event doc
  - Tech: Firestore
  - Test: Postman with event ID

- [ ] **PATCH /api/events/[id]**
  - Admin only
  - Update event fields
  - Tech: Firestore update
  - Test: Postman PATCH

**Acceptance:** All API Routes return correct responses, can test end-to-end with Postman

---

### 6.2 Firestore Data Model

- [ ] **Define Firestore collections schema**
  - Collections: `users`, `groups`, `events`
  - Schema matches local storage types from `@sportspay/shared`
  - Tech: Firestore
  - Acceptance: Can create test docs in Firestore Console

- [ ] **Create Firestore indexes**
  - Composite indexes for: groups by memberIds, events by (groupId + date)
  - Deploy via `firestore.indexes.json`
  - Tech: Firebase CLI
  - Acceptance: Queries work without errors

- [ ] **Deploy security rules**
  - Users can read own data
  - Admin SDK has full access
  - Tech: `firestore.rules`
  - Acceptance: Rules deployed, test access in Firestore Console

**Acceptance:** Backend is ready but not called by app yet

---

## MILESTONE 7 — Launch Prep & Deployment (Week 11)

**Goal:** Build app, test on real devices, submit to stores

### 7.1 Testing

- [ ] **Test on iOS simulator**
  - Full flow: create group → create event → generate teams → share text → share image → clone event → delete
  - Verify: all features work, no crashes, data persists
  - Tech: Xcode Simulator
  - Acceptance: No critical bugs, smooth UX

- [ ] **Test on Android emulator**
  - Same flow as iOS
  - Tech: Android Studio Emulator
  - Acceptance: No critical bugs, matches iOS behavior

- [ ] **Test on physical iOS device (TestFlight)**
  - Create beta build via EAS Build
  - Install on real iPhone via TestFlight
  - Test: full flow + sharing to real WhatsApp
  - Tech: EAS Build, TestFlight
  - Acceptance: App works on real device, WhatsApp share works

- [ ] **Test on physical Android device (Internal Testing)**
  - Create beta build via EAS Build
  - Install on real Android phone via Play Console Internal Testing
  - Test: full flow + sharing to real WhatsApp
  - Tech: EAS Build, Google Play Console
  - Acceptance: App works on real device, WhatsApp share works

---

### 7.2 Build Configuration

- [ ] **Configure EAS Build**
  - Command: `eas build:configure`
  - Create `eas.json` with profiles: `development`, `preview`, `production`
  - Set bundle IDs, versioning
  - Tech: EAS CLI
  - Acceptance: `eas.json` created correctly

- [ ] **iOS production build**
  - Command: `eas build --platform ios --profile production`
  - Download IPA file
  - Tech: EAS Build
  - Acceptance: Build succeeds, IPA downloads

- [ ] **Android production build**
  - Command: `eas build --platform android --profile production`
  - Download AAB file
  - Tech: EAS Build
  - Acceptance: Build succeeds, AAB downloads

---

### 7.3 Store Listings

- [ ] **Create App Store listing**
  - App name: "SportsPay"
  - Subtitle: "Organize seus rachões de esporte"
  - Description in PT-BR (highlight features: gerar times, compartilhar, Pix)
  - Screenshots: 6.5" iPhone (6 required), 5.5" iPhone, 12.9" iPad
  - Keywords: esportes, futebol, times, rachão, pelada, organizar, grupos
  - Category: Sports
  - Privacy policy URL: https://sportspay.app/privacy (create static page)
  - Tech: App Store Connect
  - Acceptance: Listing complete, ready for review

- [ ] **Create Google Play listing**
  - App name: "SportsPay"
  - Short description: "Organize grupos de esporte, gere times e compartilhe no WhatsApp"
  - Full description in PT-BR
  - Screenshots: Phone (4 required), 7" Tablet, 10" Tablet
  - Category: Sports
  - Privacy policy URL: same as iOS
  - Tech: Google Play Console
  - Acceptance: Listing complete, ready for review

- [ ] **Create privacy policy page**
  - Static Next.js page at `packages/web/app/privacy/page.tsx`
  - Simple privacy policy: "SportsPay does not collect personal data. All data is stored locally on your device."
  - Deploy to sportspay.app/privacy
  - Tech: Next.js
  - Acceptance: Page is live at URL

---

### 7.4 Submission

- [ ] **Submit iOS app to App Store Review**
  - Upload IPA to App Store Connect
  - Fill all metadata
  - Submit for review
  - Tech: App Store Connect
  - Acceptance: Submitted, status = "Waiting for Review"

- [ ] **Submit Android app to Google Play Review**
  - Upload AAB to Play Console
  - Fill all metadata
  - Submit for review
  - Tech: Google Play Console
  - Acceptance: Submitted, status = "Pending publication"

- [ ] **Monitor review process**
  - Check status daily
  - Respond to reviewer questions within 24h
  - Tech: Email notifications
  - Acceptance: App approved on both stores

- [ ] **Launch!**
  - Set app to "Available" on App Store
  - Set app to "Production" on Play Store
  - Tech: Store dashboards
  - Acceptance: App is live and downloadable

**Milestone 7 Acceptance:** App is live on App Store and Google Play Store! 🎉

---

## MILESTONE 8+ — Future Backend Features

**Note:** These features "turn on" the backend infrastructure built in Phase 0. Implement after MVP is validated with users.

### 8.1 User Authentication & Cloud Sync

- [ ] **Implement Google OAuth in app**
  - Initialize Firebase Auth
  - Add "Entrar com Google" button to login screen
  - On success: save JWT to SecureStore
  - Tech: Firebase Auth, @react-native-google-signin

- [ ] **Build sync toggle in settings**
  - "Sincronizar dados na nuvem" toggle
  - When enabled: migrate local storage to Firestore
  - Tech: Settings screen, AsyncStorage → Firestore migration

- [ ] **Implement sync logic**
  - On app start (if authenticated): pull groups/events from Firestore
  - On create/update: write to both local + Firestore
  - Conflict resolution: last-write-wins
  - Tech: Firestore SDK, AsyncStorage

**Acceptance:** User can log in with Google, data syncs across devices

---

### 8.2 Push Notifications

- [ ] **Register FCM token**
  - On login: get push token via `expo-notifications`
  - Save to `users/{uid}.fcmToken` in Firestore
  - Tech: FCM, Firestore

- [ ] **Event reminder notifications**
  - Cron job: 3 hours before event, send push to all confirmed attendees
  - Tech: AWS EventBridge, Firebase Admin Messaging

- [ ] **In-app notification handler**
  - Use `expo-notifications` to display incoming notifications
  - Tech: expo-notifications

**Acceptance:** Users receive push notifications for event reminders

---

### 8.3 Payment Integration

- [ ] **Integrate Asaas SDK**
  - Build `lib/asaas.ts` with `createCharge()`, `getPixQrCode()`
  - Tech: axios, Asaas API

- [ ] **Generate payment links**
  - API Route: `POST /api/payments/[id]/send-link`
  - Creates charge in Asaas, saves link to Firestore
  - Tech: Asaas API, Firestore

- [ ] **Public payment page**
  - Next.js page: `/pay/[id]/page.tsx`
  - Shows Pix QR code or card form
  - Tech: Next.js, Asaas SDK

- [ ] **Webhook handler**
  - API Route: `POST /api/webhooks/asaas`
  - On payment confirmed: update payment status, send FCM push
  - Tech: Asaas webhook, Firestore, FCM

**Acceptance:** Can generate payment links, users can pay via Pix, payments auto-confirm

---

### 8.4 Shared Groups (Multi-User)

- [ ] **Invite links**
  - API Route: `POST /api/groups/[id]/invites` generates code
  - Public page: `/invite/[code]` accepts invite
  - Tech: Firestore, Next.js

- [ ] **Multi-user groups**
  - Groups have `memberIds[]` and `adminGroupIds[]`
  - Multiple users can edit same group
  - Tech: Firestore permissions

- [ ] **Real-time updates**
  - Use Firestore `onSnapshot` for live updates
  - When another user edits: local state updates automatically
  - Tech: Firestore SDK

**Acceptance:** Multiple users can collaborate on same group in real-time

---

## 🚫 Out of Scope

**Never implement without explicit team discussion:**
- Venue marketplace (booking courts)
- Advanced stats dashboard (MVP counts, leaderboards)
- Video uploads
- In-app chat
- Calendar integrations
- Email notifications

---

## 📊 Progress Tracking

### By Milestone
- [ ] Milestone 0: Setup (Week 1)
- [ ] Milestone 1: Local CRUD (Weeks 2-3)
- [ ] Milestone 2: Team Generation (Weeks 4-5)
- [ ] Milestone 3: Manual Editing (Week 6)
- [ ] Milestone 4: Sharing (Weeks 7-8)
- [ ] Milestone 5: Polish (Weeks 9-10)
- [ ] Milestone 6: Backend Prep (Week 10, Optional)
- [ ] Milestone 7: Launch (Week 11)

### By Feature
- [ ] Groups CRUD
- [ ] Events CRUD
- [ ] Team Generation (Random)
- [ ] Team Editing (Drag-Drop)
- [ ] WhatsApp Sharing (Text)
- [ ] Image Sharing (Social)
- [ ] Attendance Tracking
- [ ] Clone Event
- [ ] Import Participants
- [ ] Onboarding
- [ ] Dark Mode
- [ ] App Icon + Splash

---

**Last Updated:** 2025-03-20  
**Version:** 1.0 (IDE-Agnostic)  
**Team Size:** 3 developers
