# Firebase & Firestore Rules
> **Glob**: `packages/**`

## Firestore Data Model
Collections and their document shapes:

```
users/{uid}
  name: string
  email: string           ← always present (from Google OAuth)
  phone?: string          ← optional, user can add later
  avatarUrl?: string      ← S3 URL
  groupIds: string[]
  adminGroupIds: string[]
  createdAt: Timestamp

groups/{groupId}
  name: string
  sport: 'futebol' | 'volei' | 'basquete' | 'outro'
  adminId: string
  memberIds: string[]
  billingMode: 'fixed' | 'field_split'
  monthlyFee?: number       ← centavos, only when billingMode='fixed'
  fieldCostPerMonth?: number ← centavos, only when billingMode='field_split'
  guestFee?: number         ← centavos, fixed amount charged per diarista
  dueDay: number            ← 1-28
  paymentMethods: string[]
  inviteCode: string
  plan: 'free' | 'pro' | 'club'
  planExpiresAt?: Timestamp
  avatarUrl?: string
  createdAt: Timestamp

guests/{guestId}            ← diarista payment per event
  groupId: string
  eventId: string
  uid?: string              ← set if diarista has an app account
  name: string              ← typed by admin if anonymous
  amount: number            ← centavos
  status: 'pending' | 'paid' | 'cancelled'
  gatewayId?: string
  paymentLink?: string
  paidAt?: Timestamp
  createdAt: Timestamp

treasury/{entryId}          ← group cash register (caixa)
  groupId: string
  type: 'in' | 'out'
  category: 'guest_payment' | 'field_payment' | 'equipment' | 'other'
  amount: number            ← centavos
  description: string
  referenceId?: string      ← guestId or eventId for traceability
  referenceMonth: string    ← 'YYYY-MM'
  createdBy: string         ← admin uid
  createdAt: Timestamp

payments/{paymentId}
  groupId: string
  userId: string
  amount: number          ← centavos
  status: 'pending' | 'paid' | 'overdue' | 'cancelled'
  method?: 'pix' | 'credit_card' | 'debit_card' | 'manual'
  referenceMonth: string  ← 'YYYY-MM' format e.g. '2025-01'
  dueDate: Timestamp
  paidAt?: Timestamp
  gatewayId?: string      ← Asaas charge ID
  paymentLink?: string    ← Asaas payment URL
  createdAt: Timestamp

events/{eventId}
  groupId: string
  title: string
  date: Timestamp
  recurrence: 'weekly' | 'biweekly' | 'monthly' | 'once'
  venueName: string
  venueAddress: string
  venueLat: number
  venueLng: number
  venueMapUrl?: string
  maxPlayers?: number
  status: 'scheduled' | 'cancelled' | 'finished'
  confirmationDeadline?: Timestamp
  createdBy: string
  createdAt: Timestamp

events/{eventId}/attendances/{uid}   ← SUBCOLLECTION
  userId: string
  userName: string        ← cached for fast display
  avatarUrl?: string
  status: 'confirmed' | 'declined' | 'maybe' | 'pending'
  respondedAt?: Timestamp
  note?: string

invites/{code}
  groupId: string
  createdBy: string
  expiresAt?: Timestamp
  usedBy: string[]
  maxUses?: number
```

## Firestore Access Rules
- **Client SDK** (app + web browser): READ only, no writes for critical data.
- **Firebase Admin SDK** (API Routes in Next.js): all reads and writes.
- Real-time `onSnapshot`: ONLY used for `events/{eventId}/attendances` subcollection in the app.

## Querying Patterns
```ts
// Get groups for a user
db.collection('groups').where('memberIds', 'array-contains', uid)

// Get payments for a group by month
db.collection('payments')
  .where('groupId', '==', groupId)
  .where('referenceMonth', '==', '2025-01')
  .orderBy('createdAt', 'desc')

// Get upcoming events for a group
db.collection('events')
  .where('groupId', '==', groupId)
  .where('date', '>=', Timestamp.now())
  .where('status', '==', 'scheduled')
  .orderBy('date', 'asc')
```

## Firebase Admin Singleton (API Routes)
```ts
// lib/firebase-admin.ts — import this in API Routes
import { initializeApp, getApps, cert } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'
import { getAuth } from 'firebase-admin/auth'
import { getMessaging } from 'firebase-admin/messaging'

const app = getApps().length === 0
  ? initializeApp({ credential: cert(JSON.parse(process.env.FIREBASE_ADMIN_SDK_JSON!)) })
  : getApps()[0]

export const db = getFirestore(app)
export const auth = getAuth(app)
export const messaging = getMessaging(app)
```

## Token Verification Helper
```ts
// lib/auth-middleware.ts
export async function verifyToken(req: NextRequest) {
  const token = req.headers.get('authorization')?.replace('Bearer ', '')
  if (!token) return null
  try {
    const decoded = await auth.verifyIdToken(token)
    return { uid: decoded.uid, email: decoded.email }
  } catch {
    return null
  }
}
```

## Amounts — Always in Centavos
- Store ALL monetary values as integers in centavos.
- `5000` = R$50,00
- Display with `formatCurrency(amount)` from `@sportspay/utils`.
- Never store as float (e.g., `50.00`) — floating point precision issues.

## Billing Mode Logic
```ts
// When generating monthly payments:
if (group.billingMode === 'fixed') {
  // Charge each member group.monthlyFee
  amount = group.monthlyFee

} else if (group.billingMode === 'field_split') {
  // Charge each member their share of field cost
  amount = Math.ceil(group.fieldCostPerMonth / group.memberIds.length)
}
```

## Treasury — Smart Suggestion Logic
When admin registers a field payment (`type: out, category: field_payment`):
1. Calculate current rateio: `fieldCostPerMonth / memberIds.length`
2. Calculate 3-month average rateio from past treasury entries
3. If current rateio > average × 1.20 AND treasury balance > 0:
   → Send push to admin: suggest using treasury to reduce rateio
4. Admin confirms → reduce payment amounts + register treasury outflow

## Guest (Diarista) — Two Modes
```ts
// Anonymous diarista (no app account)
POST /api/events/[id]/guests
{ name: 'Carlos', amount: 1500 }  // amount in centavos
→ Creates Asaas PIX charge, returns QR code immediately

// Registered diarista (has app account)
POST /api/events/[id]/guests  
{ uid: 'user123', amount: 1500 }
→ Creates charge, sends FCM push to user, user pays via link
```
