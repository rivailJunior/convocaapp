# Billing Modes, Diaristas & Treasury
> **Glob**: `packages/**`
> **Model Decision**: apply when working on payments, groups, diaristas, caixa, rateio

## Two Billing Modes

Every group has a `billingMode` field set at creation. Never change it after members join.

### Mode: `fixed`
- Admin sets a fixed `monthlyFee` in centavos
- Every member is charged the same amount every month
- Independent of attendance or field cost
- Simpler, predictable — good for groups with a fixed subscription model

### Mode: `field_split`
- Admin sets `fieldCostPerMonth` (e.g., 144000 = R$1.440)
- Monthly charge per member = `Math.ceil(fieldCostPerMonth / memberIds.length)`
- Admin registers field payment manually as a treasury outflow
- Diaristas pay a fixed `guestFee` — this goes into the group treasury
- Smart suggestion fires when rateio is 20%+ above 3-month average

## Diaristas (Guests)

A diarista is someone who plays occasionally — not a fixed member.
They pay a fixed `guestFee` per event, which goes into the group treasury.

### Anonymous Diarista (no app account)
```
Admin taps "Add diarista" on event screen
→ Types name (e.g., "Carlos")
→ App generates Pix QR Code immediately (Asaas charge, no customer required)
→ Diarista scans and pays on the spot
→ Webhook confirms → treasury entry created automatically
→ Admin sees confirmation in attendance list
```

### Registered Diarista (has app account)
```
Admin searches for user by name or phone
→ Selects existing user
→ App creates charge linked to user's uid
→ FCM push sent to diarista with payment link
→ Diarista pays via /pay/[id] web page or in-app
→ Webhook confirms → treasury entry created
```

Admin chooses which mode at the moment of adding the diarista.

## Treasury (Caixa do Grupo)

The treasury is the group's cash register. Every financial movement is recorded.

### Entry Types
| type | category | Triggered by |
|------|----------|-------------|
| `in` | `guest_payment` | Diarista pays — auto-created by webhook |
| `out` | `field_payment` | Admin registers field payment manually |
| `out` | `equipment` | Admin registers equipment purchase (ball, jerseys, etc.) |
| `in` / `out` | `other` | Manual entry by admin for anything else |

### Treasury Balance Calculation
```ts
const balance = entries
  .filter(e => e.groupId === groupId && e.referenceMonth === month)
  .reduce((acc, e) => e.type === 'in' ? acc + e.amount : acc - e.amount, 0)
```

### API Routes for Treasury
```
GET  /api/groups/[id]/treasury          — list entries with optional month filter
POST /api/groups/[id]/treasury          — admin creates manual entry (in or out)
GET  /api/groups/[id]/treasury/balance  — current balance + monthly summary
```

## Smart Treasury Suggestion

Triggered after admin registers a `field_payment` outflow:

```ts
async function checkTreasurySuggestion(groupId: string) {
  const group = await getGroup(groupId)
  if (group.billingMode !== 'field_split') return

  const currentRateio = Math.ceil(group.fieldCostPerMonth / group.memberIds.length)

  // Get last 3 months average
  const history = await getPastRateios(groupId, 3)
  const avgRateio = history.reduce((a, b) => a + b, 0) / history.length

  const balance = await getTreasuryBalance(groupId)

  if (currentRateio > avgRateio * 1.20 && balance > 0) {
    // Suggest using treasury to reduce rateio
    const suggestion = Math.min(balance, currentRateio - avgRateio) * group.memberIds.length
    await sendAdminSuggestion(groupId, {
      currentRateio,
      avgRateio,
      balance,
      suggestedUse: suggestion,
      reducedRateio: Math.ceil((group.fieldCostPerMonth - suggestion) / group.memberIds.length)
    })
  }
}
```

Push message to admin:
> "O rateio deste mês ficou **R$72,00** (média: R$57,60). Você tem **R$180 no caixa** — deseja usar R$120 para reduzir o valor dos membros para R$57,60?"

If admin accepts:
1. Register treasury outflow: `{ type: 'out', category: 'other', description: 'Uso do caixa para reduzir rateio' }`
2. Generate monthly payments with reduced amount

## What NOT to Do
- Never auto-debit from treasury without admin confirmation
- Never change `billingMode` after members are in the group
- Never charge diarista the same flow as a member payment (different collection)
- Never add diarista to `memberIds` — they go in `guests` collection only
- `field_split` groups do NOT use `monthlyFee` field — use `fieldCostPerMonth`
