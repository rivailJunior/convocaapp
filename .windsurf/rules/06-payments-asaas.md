# Payments & Asaas Integration
> **Glob**: `packages/web/app/api/payments/**`, `packages/web/lib/asaas.ts`
> **Model Decision**: apply when working on payments, billing, charges, Pix, webhooks

## Asaas Overview
Asaas is a Brazilian payment gateway. API docs: https://docs.asaas.com
- Sandbox base URL: `https://sandbox.asaas.com/api/v3`
- Production base URL: `https://api.asaas.com/api/v3`
- Auth header: `access_token: ${process.env.ASAAS_API_KEY}`

## Key Endpoints Used
```
POST /customers              — create/find customer by CPF or email
POST /payments               — create a charge (Pix or credit card)
GET  /payments/{id}          — check payment status
GET  /payments/{id}/pixQrCode — get Pix QR code data
DELETE /payments/{id}        — cancel a charge
```

## Asaas Wrapper (`lib/asaas.ts`)
```ts
const asaas = axios.create({
  baseURL: process.env.ASAAS_BASE_URL, // sandbox or prod based on env
  headers: { access_token: process.env.ASAAS_API_KEY }
})

export async function createCharge(params: {
  customerId: string
  value: number         // in BRL (not centavos) — Asaas uses float
  dueDate: string       // 'YYYY-MM-DD'
  billingType: 'PIX' | 'CREDIT_CARD' | 'BOLETO'
  description: string
}) { ... }
```

⚠️ **Important**: Asaas uses BRL floats (e.g., `50.00`), NOT centavos.
Always convert: `amount / 100` before sending to Asaas, `amount * 100` when storing in Firestore.

## Payment Generation Flow
1. Admin calls `POST /api/groups/:id/payments/generate`
2. API Route creates one `payment` document per member in Firestore with `status: 'pending'`
3. Admin later calls `POST /api/payments/:id/send-link` for individual members
4. That route creates the Asaas customer (or finds existing) and creates the Asaas charge
5. Stores `gatewayId` and `paymentLink` in Firestore payment document
6. Returns `paymentLink` to the admin app for sharing via WhatsApp

## Webhook Handler (`/api/webhooks/asaas`)
```ts
// Always verify HMAC signature first
const signature = req.headers.get('asaas-access-token')
if (signature !== process.env.ASAAS_WEBHOOK_SECRET) {
  return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
}

const event = await req.json()
if (event.event === 'PAYMENT_RECEIVED' || event.event === 'PAYMENT_CONFIRMED') {
  // Update Firestore payment status to 'paid'
  // Send FCM push to member and admin
}
// Always return 200 quickly
return NextResponse.json({ ok: true })
```

## Supported Payment Methods
- **Pix**: instant, no fees for the payer. Show QR code + copia-e-cola on `/pay/[id]`.
- **Credit card**: installments NOT supported in MVP. Single charge only.
- **Manual**: admin marks as paid without going through gateway (cash, transfer, etc).

## Refund / Cancellation
- Only admins can cancel a payment.
- If `gatewayId` exists, call `DELETE /payments/{id}` on Asaas before updating Firestore.
- Update status to `'cancelled'` in Firestore.

## Payment Status Flow
```
pending → (send-link called) → pending (with paymentLink)
       → (webhook PAYMENT_CONFIRMED) → paid
       → (overdue job runs) → overdue
       → (admin cancels) → cancelled
```
