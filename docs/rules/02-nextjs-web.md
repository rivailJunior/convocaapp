# Next.js Web Rules & Best Practices
> **Always On** — Read this before creating any new page, component, or API route in `packages/web`.

## App Router Conventions

- Use `page.tsx` for routes, `layout.tsx` for layouts, `loading.tsx` for suspense, `error.tsx` for errors.
- Use `generateMetadata()` for dynamic SEO — especially on public pages (`/invite`, `/pay`, `/event`) for WhatsApp link previews.
- Route groups with `(parentheses)` for organization: `(auth)`, `(admin)`, `(public)`.

## Server vs Client Components

- Prefer **Server Components** by default. Add `'use client'` only when you need: hooks, event handlers, browser APIs, or real-time Firestore listeners.
- Never import `firebase-admin` in a file marked `'use client'`.
- Client components use React Query (`useQuery`, `useMutation`) via `lib/api-client.ts`.
- Server components fetch directly with `firebase-admin` SDK or `lib/asaas.ts`.
- For Server Components, data fetching lives in `lib/` utilities — not inline in the component.

```tsx
export default async function PlayerList({ groupId }: { groupId: string }) {
  const players = await getPlayersByGroup(groupId);
  return <PlayerTable players={players} />;
}

'use client';
import { useEventDetails } from '@sportspay/shared';

export function LiveAttendance({ eventId }: { eventId: string }) {
  const { event, isLoading } = useEventDetails(eventId);
  if (isLoading) return <Skeleton />;
  return <AttendanceList players={event.players} />;
}
```

## API Routes Pattern

Every API Route must follow this exact structure:
```ts
const user = await verifyToken(req)
if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

const isAdmin = await requireGroupAdmin(user.uid, groupId)
if (!isAdmin) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

const body = schema.safeParse(await req.json())
if (!body.success) return NextResponse.json({ error: body.error.flatten() }, { status: 400 })
```

## Cron Endpoints (`/api/cron/**`)

- Always verify `x-cron-secret` header before executing:
```ts
if (req.headers.get('x-cron-secret') !== process.env.CRON_SECRET) {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
}
```
- Cron endpoints are triggered by AWS EventBridge Scheduler. Never add UI that calls them.

## Webhooks (`/api/webhooks/**`)

- Always verify HMAC signature before processing.
- Return `200` immediately, process async — never make the webhook wait for slow operations.

## Public Pages (`/invite`, `/pay`, `/event`)

- Always use SSR (`async` Server Component fetching data directly) — not client-side fetching.
- Include proper Open Graph meta tags for WhatsApp preview (title, description, image).
- Must work without the user being logged in.

## Styling (Web-Specific)

- No CSS modules. No custom CSS files.
- Use `shadcn/ui` components for: tables, dialogs, badges, select, tabs, forms.
- Responsive design: mobile-first (`sm:`, `md:`, `lg:` prefixes).
- Dark mode: not in MVP scope — don't add `dark:` variants yet.

## Firebase in the Web Package

- `lib/firebase-client.ts` — client SDK (auth in browser). Import in client components only.
- `lib/firebase-admin.ts` — Admin SDK singleton. Import in API Routes and Server Components only.
- Never import `firebase-admin` in a file marked `'use client'`.

## Folder Structure

```
packages/web/
├── src/
│   ├── app/                  # Pages (routes) — thin composition only
│   │   ├── (auth)/           # Authenticated routes
│   │   ├── (admin)/          # Admin routes
│   │   ├── (public)/         # Public routes (invite, pay, event)
│   │   └── api/              # API Routes, webhooks, cron
│   ├── components/           # Reusable UI components grouped by feature
│   │   ├── event/
│   │   ├── group/
│   │   └── shared/           # Cross-feature components (buttons, layout shells)
│   └── lib/                  # Utilities, API clients, Firebase setup
```

## Checklist Before Creating a New Page

1. Search `src/components/` for existing components you can reuse.
2. Define the data shape as `type` in `packages/shared` — props for each component.
3. Extract all logic into custom hooks in `packages/shared`.
4. Build small components that receive props — no internal mocks.
5. Compose everything in the page file under `app/`.
6. Use TailwindCSS classes exclusively — no custom CSS, no inline styles.
7. Use `shadcn/ui` for standard UI elements before building custom ones.
8. Default to Server Components. Only use `'use client'` when necessary.
9. No comments. Name things clearly instead.
