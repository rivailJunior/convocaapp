# Next.js Web Package Rules
> **Glob**: `packages/web/**`

## App Router Conventions
- Use `page.tsx` for routes, `layout.tsx` for layouts, `loading.tsx` for suspense, `error.tsx` for errors.
- Prefer **Server Components** by default. Add `'use client'` only when you need: hooks, event handlers, browser APIs, or real-time Firestore listeners.
- Use `generateMetadata()` for dynamic SEO — especially on public pages (`/invite`, `/pay`, `/event`) for WhatsApp link previews.
- Route groups with `(parentheses)` for organization: `(auth)`, `(admin)`, `(public)`.

## API Routes Pattern
Every API Route must follow this exact structure:
```ts
// 1. Verify Firebase token
const user = await verifyToken(req)
if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

// 2. Check permissions (admin guard if needed)
const isAdmin = await requireGroupAdmin(user.uid, groupId)
if (!isAdmin) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

// 3. Validate request body with Zod schema from @sportspay/schemas
const body = schema.safeParse(await req.json())
if (!body.success) return NextResponse.json({ error: body.error.flatten() }, { status: 400 })

// 4. Business logic
// 5. Return response
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

## Styling
- Tailwind utility classes only. No inline styles. No CSS modules.
- Use `shadcn/ui` components for: tables, dialogs, badges, select, tabs, forms.
- Responsive design: mobile-first (`sm:`, `md:`, `lg:` prefixes).
- Dark mode: not in MVP scope — don't add `dark:` variants yet.

## Data Fetching
- Server Components: fetch directly with `firebase-admin` SDK or `lib/asaas.ts`
- Client Components: use React Query (`useQuery`, `useMutation`) via `lib/api-client.ts`
- Never call Firebase Admin SDK in client components — it would expose credentials

## Firebase in the Web Package
- `lib/firebase-client.ts` — client SDK (auth in browser). Import in client components only.
- `lib/firebase-admin.ts` — Admin SDK singleton. Import in API Routes and Server Components only.
- Never import `firebase-admin` in a file marked `'use client'`.
