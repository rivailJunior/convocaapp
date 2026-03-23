# Team Draw & Attendance Confirmation
> **Glob**: `packages/**`
> **Model Decision**: apply when working on events, attendance, team generation, sorteio

## Two Separate Lists

### List 1 — Monthly Members (`payments` collection)
- Who paid the monthly fee
- Generated once per month by the cron job or admin
- Has nothing to do with weekly attendance
- Determines if a member CAN confirm for events

### List 2 — Weekly Confirmation (`events/{id}/attendances` subcollection)
- Who is actually going to play THIS specific event
- Every fixed member starts as `pending` when event is created
- Diaristas are added by admin on event day
- **A member must have no `pending` or `overdue` payment to confirm**

These two lists are completely independent. A member can be paid but decline the event, or be in their first month (no payment yet) and need admin override.

## Attendance Confirmation — Blocking Logic

```ts
// POST /api/events/[id]/attend
export async function POST(req, { params }) {
  const user = await verifyToken(req)
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { status } = attendEventSchema.parse(await req.json())

  // Only block when trying to CONFIRM (not decline/maybe)
  if (status === 'confirmed') {
    const currentMonth = currentReferenceMonth() // from @sportspay/utils
    const overduePayment = await db.collection('payments')
      .where('userId', '==', user.uid)
      .where('groupId', '==', event.groupId)
      .where('referenceMonth', '==', currentMonth)
      .where('status', 'in', ['pending', 'overdue'])
      .limit(1)
      .get()

    if (!overduePayment.empty) {
      return NextResponse.json({
        error: 'Mensalidade em aberto',
        code: 'PAYMENT_REQUIRED',
        paymentId: overduePayment.docs[0].id
      }, { status: 403 })
    }
  }

  // Upsert attendance
  await db.doc(`events/${params.id}/attendances/${user.uid}`).set({
    status,
    respondedAt: Timestamp.now(),
  }, { merge: true })

  return NextResponse.json({ ok: true })
}
```

## Admin Override
Admin can bypass the payment block for a specific member:
```
PATCH /api/events/[id]/attendances/[uid]
Body: { status: 'confirmed', override: true }
Auth: GroupAdmin only
```
This sets `isOverdue: true` on the attendance doc (for transparency) but allows confirmation.

## Team Draw Algorithm (Client-Side)

Runs entirely on the device — no API call needed for the draw itself.

```ts
// packages/app/utils/team-draw.ts
// Also usable in packages/web

export function generateTeams(params: {
  players: AttendancePlayer[]  // confirmed attendances only
  mode: 'by_players' | 'by_teams'
  value: number                // players per team OR number of teams
}): TeamDrawResult {
  const { players, mode, value } = params

  // Calculate team sizes
  const numTeams = mode === 'by_players'
    ? Math.floor(players.length / value)
    : value
  const playersPerTeam = mode === 'by_players'
    ? value
    : Math.floor(players.length / numTeams)

  // Shuffle (Fisher-Yates)
  const shuffled = [...players]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }

  // Split into teams
  const teams: Team[] = []
  const teamNames = ['Time A', 'Time B', 'Time C', 'Time D', 'Time E', 'Time F']

  for (let i = 0; i < numTeams; i++) {
    teams.push({
      id: teamNames[i].replace(' ', '_').toLowerCase(),
      name: teamNames[i],
      players: shuffled.slice(i * playersPerTeam, (i + 1) * playersPerTeam)
    })
  }

  // Remaining players go to bench
  const bench = shuffled.slice(numTeams * playersPerTeam)

  return { teams, bench, totalPlayers: players.length }
}
```

### Input Validation
```ts
// Before running the draw, validate:
const confirmed = attendances.filter(a => a.status === 'confirmed')

if (mode === 'by_players') {
  if (value > confirmed.length) throw new Error('Mais jogadores por time do que confirmados')
  if (Math.floor(confirmed.length / value) < 2) throw new Error('Minimo de 2 times necessario')
}

if (mode === 'by_teams') {
  if (value < 2) throw new Error('Minimo de 2 times')
  if (value > confirmed.length) throw new Error('Mais times do que jogadores confirmados')
}
```

## Saving the Draw Result

After admin taps "Salvar e Compartilhar":

```ts
// POST /api/events/[id]/teams
// Auth: GroupAdmin
// Body: TeamDrawResult

// 1. Save to team_draws/{eventId} (upsert — overwrites previous draw)
await db.doc(`team_draws/${eventId}`).set({
  ...drawResult,
  eventId, groupId, createdBy: user.uid, createdAt: Timestamp.now()
})

// 2. Batch update teamId on each attendance doc
const batch = db.batch()
drawResult.teams.forEach(team => {
  team.players.forEach(player => {
    const ref = db.doc(`events/${eventId}/attendances/${player.userId}`)
    batch.update(ref, { teamId: team.id })
  })
})
drawResult.bench.forEach(player => {
  const ref = db.doc(`events/${eventId}/attendances/${player.userId}`)
  batch.update(ref, { teamId: 'bench' })
})
await batch.commit()
```

## WhatsApp Share Format

Generated client-side from `whatsappMessages.teamDraw(result)` in `@sportspay/utils`:

```
⚽ *Times do Futebol — Sábado 15/03*
📍 Arena Beach Sports

*Time A*
• João Silva
• Pedro Costa
• Carlos Lima
• Rafael Souza
• Bruno Oliveira

*Time B*
• ...

🪑 *Banco:* Marcos, Felipe

_Gerado pelo SportsPay_
```

## App UI — Team Draw Screen

Located at `(admin)/groups/[id]/events/[eventId]/teams.tsx`

1. **Entry condition**: only show "Gerar Times" button when confirmed count ≥ 4
2. **Parameter input**: single bottom sheet with two toggle options:
   - "Jogadores por time" → number input → shows preview: "Resultado: X times de N, Y no banco"
   - "Número de times" → number input → shows preview: "Resultado: X times de ~N, Y no banco"
3. **Draw result screen**: colored cards per team, bench section below
4. **Re-draw button**: runs algorithm again with same parameters
5. **Share button**: generates WhatsApp text, opens `wa.me`
6. **Save button**: calls POST /api/events/[id]/teams, updates attendances

## What NOT to Do
- Never run the draw algorithm on the server — it's client-side only
- Never block a member from DECLINING or marking MAYBE due to payment status
- Never auto-assign teams without admin explicitly tapping "Gerar Times"
- Never save partial draws — only save when admin confirms final result
- The `team_draws` collection has ONE document per event (eventId = document ID), always overwritten
