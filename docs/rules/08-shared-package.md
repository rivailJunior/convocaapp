# Shared Package Rules
> **Glob**: `packages/shared/**`

## Purpose
Code shared between `packages/app` and `packages/web`. Zero runtime dependencies (only `zod` for schemas).

## Package Names
- `@sportspay/types` — TypeScript interfaces and type aliases
- `@sportspay/schemas` — Zod schemas for validation
- `@sportspay/utils` — Pure utility functions
- `@sportspay/constants` — Enums and constant values

## Rules for Adding to Shared
Only add to `shared` if:
1. The exact same logic is needed in BOTH `app` and `web`
2. It has no platform-specific dependencies (no `react-native`, no `next`, no `firebase`)
3. It's purely functional (no side effects, no API calls)

If unsure — put it in the package that needs it first, move to shared only when the second package needs it.

## Types (`packages/shared/types/index.ts`)
```ts
// Sport union — never use enum
export type Sport = 'futebol' | 'volei' | 'basquete' | 'outro'
export type PaymentStatus = 'pending' | 'paid' | 'overdue' | 'cancelled'
export type PaymentMethod = 'pix' | 'credit_card' | 'debit_card' | 'manual'
export type Recurrence = 'weekly' | 'biweekly' | 'monthly' | 'once'
export type AttendanceStatus = 'confirmed' | 'declined' | 'maybe' | 'pending'
export type EventStatus = 'scheduled' | 'cancelled' | 'finished'
```

## Utils (`packages/shared/utils/index.ts`)
Key utilities — keep them pure and well-documented:
```ts
/** Format centavos to BRL currency string: 5000 → 'R$ 50,00' */
export const formatCurrency = (centavos: number): string => ...

/** Format referenceMonth for display: '2025-01' → 'Janeiro 2025' */
export const formatMonth = (referenceMonth: string): string => ...

/** Generate current referenceMonth string: '2025-01' */
export const currentReferenceMonth = (): string => ...

/** Build a WhatsApp deep link with pre-encoded message */
export const whatsappLink = (phone: string, message: string): string => ...

/** WhatsApp message templates */
export const whatsappMessages = {
  paymentLink: (groupName: string, amount: number, dueDate: string, link: string) => string,
  eventReminder: (sport: string, day: string, date: string, time: string, venue: string, link: string) => string,
  inviteLink: (groupName: string, sport: string, link: string) => string,
}
```

## Schemas (`packages/shared/schemas/index.ts`)
Always export both the schema AND the inferred type:
```ts
export const createGroupSchema = z.object({ ... })
export type CreateGroupInput = z.infer<typeof createGroupSchema>

export const attendEventSchema = z.object({ ... })
export type AttendEventInput = z.infer<typeof attendEventSchema>
```

## Exporting
All items should be re-exported from the package root `index.ts`:
```ts
// packages/shared/types/index.ts re-exports everything
export * from './types'
export * from './schemas'
export * from './utils'
export * from './constants'
```
