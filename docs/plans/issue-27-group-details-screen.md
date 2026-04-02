# Issue #27 — Create UI for Group Details

**Branch**: `feat/issue-27-group-details-screen`  
**Issue**: https://github.com/rivailJunior/convocaapp/issues/27

## Design Reference

`docs/design/stitch_sportspay_app_plan/group_details/` — sticky header (back + group name + edit), hero card with stacked member avatars + Pix key (copy button), "Próximos Eventos" list with event cards (teams generated badge, confirmed count badge), "Ver eventos anteriores" toggle, FAB to create events.

---

## Steps

### Step 1 — Extend types in `packages/shared`

**Files**: `packages/shared/src/types/index.ts`  
**What**: Add `pixKey?: string` to `Group`; add `GroupEventItem` type extending `Event` with `confirmedCount: number` and `hasTeams: boolean`  
**Test**: TypeScript compile validates the new types are valid

---

### Step 2 — Add `useGroupDetails` and `useGroupEvents` hooks in `packages/shared`

**Files**: `packages/shared/src/hooks/use-group-details.ts`, `packages/shared/src/hooks/use-group-events.ts`, `packages/shared/src/hooks/index.ts`  
**What**: `useGroupDetails(groupId)` → returns a single `GroupDisplayItem | undefined` from mock data; `useGroupEvents(groupId)` → returns `{ upcoming: GroupEventItem[], past: GroupEventItem[] }`  
**Test**: TypeScript compile; hooks return expected shapes

---

### Step 3 — Build `GroupHeroCard` component

**Files**: `packages/app/src/components/group-details/components/GroupHeroCard.tsx`  
**What**: Renders the stacked avatar row (up to 8 + overflow count), member count label, divider, and Pix key with a copy button (uses `Clipboard` from React Native)  
**Test**: Renders correctly with and without a `pixKey`

---

### Step 4 — Build `GroupEventCard` and `GroupEventList` components

**Files**: `packages/app/src/components/group-details/components/GroupEventCard.tsx`, `packages/app/src/components/group-details/components/GroupEventList.tsx`  
**What**: `GroupEventCard` renders event title, date/venue line (formatted), sport icon, and status badges. `GroupEventList` renders upcoming list + collapsible "Ver eventos anteriores" section  
**Test**: Renders past events hidden by default; toggles correctly on press

---

### Step 5 — Build `GroupDetailsPage` and barrel export

**Files**: `packages/app/src/components/group-details/GroupDetailsPage.tsx`, `packages/app/src/components/group-details/index.ts`  
**What**: Composes header (back + edit buttons), `GroupHeroCard`, `GroupEventList`, and FAB (disabled stub)  
**Test**: TypeScript compile; component accepts `groupId: string` prop

---

### Step 6 — Create screen route `app/groups/[id].tsx`

**Files**: `packages/app/app/groups/[id].tsx`  
**What**: Thin Expo Router screen; reads `id` from `useLocalSearchParams`, passes it to `GroupDetailsPage`  
**Test**: Route is reachable; `id` param is correctly passed

---

### Step 7 — Wire up navigation from `GroupCard`

**Files**: `packages/app/src/components/group/components/GroupCard.tsx`  
**What**: Remove `disabled`, add `router.push(\`/groups/${group.id}\`)` on press  
**Test**: Pressing a group card navigates to its detail screen
