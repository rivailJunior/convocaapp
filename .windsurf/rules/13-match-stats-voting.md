# Match Stats, Voting & Rankings
> **Glob**: `packages/**`
> **Model Decision**: apply when working on voting, stats, rankings, badges, MVP

## Overview
After each event, confirmed members vote on performance categories. Results are consolidated automatically, player stats are updated, and monthly badges are awarded to top performers.

## Voting Rules
- **Who can vote**: only members with `attendance.status === 'confirmed'` for that event
- **One vote per member per event**: enforced by checking existing `match_stats` doc with same `voterId + eventId`
- **Cannot vote for yourself**: validated on API Route
- **Voting window**: opens 2h after event, closes 24h later (or manually by admin)
- **Categories**: MVP (best player), goals, assists, saves (goalkeeper)

## Data Flow

```
Event ends
  → 2h later: POST /api/cron/open-voting
  → FCM push to all confirmed members
  → Members vote via app (24h window)
  → Each vote → match_stats doc created
  → Admin or cron closes voting
  → POST /api/events/[id]/close-voting
  → Consolidate votes → event_results doc
  → Batch update player_stats (increment totals)
  → FCM push: "MVP do jogo: João Silva! ⚽"
```

## Collections

### `match_stats/{id}` — one per voter per event
```ts
{
  eventId: string
  groupId: string
  voterId: string           // who voted
  votes: {
    mvp: string             // uid of MVP pick
    goals: Record<string, number>    // { uid: goalsVoted }
    assists: Record<string, number>  // { uid: assistsVoted }
    saves: Record<string, number>    // { uid: savesVoted }
  }
  createdAt: Timestamp
}
```

### `player_stats/{groupId}_{userId}` — cumulative per player per group
```ts
{
  groupId: string
  userId: string
  userName: string          // cached
  avatarUrl?: string        // cached
  totalPresences: number
  totalGoals: number
  totalAssists: number
  totalSaves: number
  totalMvpVotes: number     // total votes received across all events
  mvpWins: number           // times won MVP of the game
  monthlyBadges: Record<string, 'mvp' | 'top_scorer' | 'top_assists'>
  // e.g. { '2025-03': 'mvp', '2025-01': 'top_scorer' }
  lastUpdated: Timestamp
}
```

### `event_results/{eventId}` — consolidated result per event
```ts
{
  groupId: string
  mvp: { uid, userName, avatarUrl, voteCount }
  topScorer?: { uid, userName, goals }
  topAssists?: { uid, userName, assists }
  topSaves?: { uid, userName, saves }
  totalVoters: number
  totalEligible: number     // confirmed attendance count
  closedAt: Timestamp
}
```

## API Routes

```
POST /api/events/[id]/votes          — cast vote (auth: confirmed member only)
GET  /api/events/[id]/votes/status   — has current user voted? voting open?
POST /api/events/[id]/close-voting   — consolidate votes (admin or cron)
GET  /api/groups/[id]/rankings       — player_stats ordered by score
GET  /api/players/[uid]/stats        — player stats across all groups
POST /api/cron/open-voting           — opens voting 2h after events
POST /api/cron/close-month-ranking   — awards monthly badges (last day of month)
```

## Vote Consolidation Logic

```ts
async function consolidateVotes(eventId: string) {
  const votes = await db.collection('match_stats')
    .where('eventId', '==', eventId).get()

  // Count MVP votes
  const mvpCount: Record<string, number> = {}
  const goalCount: Record<string, number> = {}
  const assistCount: Record<string, number> = {}
  const saveCount: Record<string, number> = {}

  votes.forEach(doc => {
    const v = doc.data().votes
    mvpCount[v.mvp] = (mvpCount[v.mvp] || 0) + 1
    Object.entries(v.goals || {}).forEach(([uid, n]) =>
      goalCount[uid] = (goalCount[uid] || 0) + Number(n))
    // same for assists, saves
  })

  const mvpUid = Object.entries(mvpCount).sort((a,b) => b[1]-a[1])[0][0]

  // Write event_results
  await db.doc(`event_results/${eventId}`).set({ mvp: { uid: mvpUid, voteCount: mvpCount[mvpUid] }, ... })

  // Batch update player_stats
  const batch = db.batch()
  Object.entries(goalCount).forEach(([uid, goals]) => {
    const ref = db.doc(`player_stats/${groupId}_${uid}`)
    batch.update(ref, { totalGoals: FieldValue.increment(goals) })
  })
  // increment mvpWins for winner, totalMvpVotes for all who received votes
  await batch.commit()
}
```

## Monthly Badge Logic (cron — last day of month)

```ts
// For each group, find top performers of the month
// by querying event_results from the past month

const badges = {
  mvp: playerWithMostMvpWinsThisMonth,
  top_scorer: playerWithMostGoalsThisMonth,
  top_assists: playerWithMostAssistsThisMonth,
}

// Update player_stats.monthlyBadges
// Send FCM to each winner
```

## Ranking Score Formula
```ts
score = (mvpWins × 5) + (totalGoals × 3) + (totalAssists × 2) + (totalSaves × 2) + (totalPresences × 1)
```
This rewards winning MVP most, then goals, assists/saves equally, and presence as a baseline.

## App Screens

### Voting Screen `(user)/events/[id]/vote.tsx`
- Only visible after event ends AND voting is open AND user confirmed presence
- List of confirmed players with avatar + name
- Category tabs: MVP / Gols / Assistências / Defesas
- Each tab: tap to select one player (radio selection)
- Cannot select yourself in any category
- Submit button — disabled until all categories voted
- After submit: show current results (anonymized until voting closes)

### Event Result Card (in event detail screen)
- After voting closes: show MVP card prominently (photo, name, vote %)
- Below: top scorer, top assists, top saves
- "X de Y jogadores votaram"

### Rankings Screen `(user)/groups/[id]/rankings.tsx`
- Tabs: Este mês / Histórico
- List of players ordered by score
- Each row: avatar, name, score, badges icons
- Tap player → player profile with full stats

### Player Profile Stats Section
- Badges row: current month + past months (last 6)
- Stats grid: presences, goals, assists, saves, MVP wins
- Chart: presence rate per month (recharts)

## What NOT to Do
- Never let a member vote if not confirmed present — return 403
- Never allow self-voting in any category
- Never show who voted for whom (votes are anonymous)
- Never recalculate player_stats from scratch on every request — use incremental updates
- Never open voting automatically if the event was cancelled
- The `player_stats` document ID must always be `{groupId}_{userId}` — never auto-generated
