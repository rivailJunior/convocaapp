# SportsPay — Google Stitch Design Prompts
> Use at stitch.withgoogle.com (Experimental Mode / Gemini 2.5 Pro for best results)
> Strategy: paste the MASTER PROMPT first to establish the design system,
> then use SCREEN PROMPTS one at a time to generate each screen.

---

## ★ MASTER PROMPT
> Paste this first. It establishes the visual identity for all screens.

```
Design a mobile app called SportsPay for managing amateur sports groups in Brazil.
The app is used by group admins and members for payments, events, attendance, and player rankings.

Visual identity:
- Style: clean, modern, friendly — inspired by Nubank and Strava. Not corporate, not casual.
- Primary color: deep green #1B5E20 (sport/field reference)
- Accent color: vibrant lime #AEEA00 (energy, action)
- Background: off-white #F8F9FA for light surfaces, white #FFFFFF for cards
- Text: dark charcoal #212121 for headings, medium gray #616161 for secondary text
- Success: #43A047, Warning: #FB8C00, Error: #E53935
- Typography: bold, rounded sans-serif headings (similar to Inter or Nunito), regular weight for body
- Corner radius: 16px for cards, 12px for buttons, 24px for bottom sheets
- Shadows: subtle, soft — cards have 2px elevation
- Icons: filled, rounded style (similar to Material You)
- Spacing: generous padding — 16px horizontal margins, 24px between sections

Layout principles:
- Mobile-first, iOS and Android compatible
- Bottom navigation bar with 4 items: Home, Events, Rankings, Profile
- Floating action button (FAB) in green for primary actions
- Cards as the main content container — never raw lists
- Status badges with colored pills: green=paid, orange=pending, red=overdue, gray=cancelled
- Avatar circles for all players and groups
- Real data in mockups — use Brazilian names, R$ currency values, Portuguese UI text

Generate the Home screen for a group admin. The screen should show:
- Top bar with group name "Futebol da Firma" and admin avatar
- Summary card: "Mensalidade Janeiro" — 18 pagos, 7 pendentes, 2 atrasados out of 25 members
- Quick action buttons: Gerar Times, Cobrar, Novo Evento, Convidar
- Upcoming event card: "Sábado 18/01 • Arena Beach Sports • 14h" with confirmed count "21 confirmados"
- Recent activity feed: last 3 payment notifications
- Bottom navigation bar
```

---

## SCREEN 1 — Home (Admin)
> After master prompt, refine with:

```
Refine the Home screen for the admin. Add:
- A treasury balance chip "Caixa: R$ 340,00" in the top area near the group name
- The summary card should have a horizontal progress bar showing paid vs total (green fill)
- Quick action buttons should be in a 2x2 grid with icon + label, rounded square style
- The event card should show a small map pin icon and a green "Confirmar Presença" CTA button
- Add a horizontal scroll row of member avatars showing who confirmed for the upcoming event
```

---

## SCREEN 2 — Home (Member)
```
Design the Home screen for a regular member (not admin) of SportsPay.

Show:
- Top bar: "Futebol da Firma" group name, member avatar (top right)
- My payment status card: large pill badge "PENDENTE" in orange, amount "R$ 57,60", due date "Vence 10/01", and a prominent green "Pagar Agora" button
- Upcoming event card: "Sábado 18/01 • 14h • Arena Beach Sports" — large confirm/decline buttons at the bottom of the card: green "✓ Vou!" and outlined gray "✗ Não vou"
- My stats mini card: shows goals=3, MVP wins=1, presences=12 with small icons
- Bottom navigation bar

Style: same design system as the admin home — clean, green primary, card-based layout
```

---

## SCREEN 3 — Payment List (Admin)
```
Design the Payments screen for a group admin in SportsPay.

Show:
- Top bar: back arrow, title "Cobranças — Janeiro 2025", month selector (< Janeiro 2025 >)
- Summary row: 3 stat chips — "18 Pagos" (green), "5 Pendentes" (orange), "2 Atrasados" (red)
- "Gerar Cobranças" green button below the summary
- List of member payment cards. Each card shows:
  - Member avatar circle (left)
  - Member name and "Mensalista" tag
  - Status badge pill (paid=green, pending=orange, overdue=red)
  - Amount "R$ 57,60"
  - For pending: small "Cobrar via WhatsApp" button with WhatsApp green icon
  - For paid: "Pago em 05/01" subtitle
- Show 6 cards in the list: 3 paid, 2 pending, 1 overdue
- FAB button: "+" to add manual payment
```

---

## SCREEN 4 — Event Detail + Attendance List
```
Design the Event Detail screen in SportsPay.

Show:
- Top bar: back arrow, "Futebol — Sábado 18/01"
- Event hero section: venue name "Arena Beach Sports", address "Av. Paulista, 1000", date/time "Sábado, 18 de Janeiro • 14h às 16h", a small static map image with pin
- Attendance summary: 3 horizontal counters — "21 Confirmados ✓" (green), "3 Talvez ?" (orange), "1 Recusou ✗" (gray)
- Section title "Confirmados (21)" with a search bar
- Grid of confirmed player avatars (4 per row) with name below each, green checkmark badge on avatar
- "Gerar Times" green FAB button at bottom right
- Bottom sheet hint: "3 diaristas" chip at the bottom with a "+" add diarista button
```

---

## SCREEN 5 — Team Draw Screen
```
Design the Team Draw screen in SportsPay for a group admin.

Show:
- Top bar: back arrow, "Sorteio de Times"
- Subtitle: "25 jogadores confirmados"
- Parameter selector card: two toggle options — "Jogadores por time" (selected, showing input "5") and "Número de times". Below the selector: preview text "Resultado: 5 times de 5 jogadores • 0 no banco"
- "Sortear!" large green button
- Results section below (after draw):
  - 5 colored team cards in a scrollable list
  - Each card has a colored header (Time A=green, Time B=blue, Time C=orange, Time D=purple, Time E=red)
  - Each card shows 5 player names with avatar circles in a row
  - Card has a subtle border matching the team color
- Bottom bar: "Compartilhar no WhatsApp" button with WhatsApp icon
```

---

## SCREEN 6 — Post-Game Voting
```
Design the post-game voting screen in SportsPay.

Show:
- Top bar: back arrow, "Votação — Futebol 18/01"
- Subtitle: "Vote nos destaques do jogo. Apenas jogadores presentes podem votar."
- Progress indicator: "2 de 4 categorias votadas"
- Category tab bar: MVP (selected, green underline) | Gols | Assistências | Defesas
- MVP voting section:
  - Instruction: "Quem foi o melhor em campo?"
  - Grid of player cards (2 per row): each card has avatar, name, and a radio select circle
  - One card is selected (highlighted with green border and checkmark)
  - "Você não pode votar em si mesmo" small gray disclaimer
- Bottom: "Próxima categoria →" green button, disabled "Enviar Votos" button (grayed out until all categories done)
```

---

## SCREEN 7 — Player Rankings
```
Design the Rankings screen in SportsPay.

Show:
- Top bar: title "Ranking — Futebol da Firma"
- Month selector tabs: "Janeiro 2025" (selected) | "Histórico"
- Top 3 podium section: 3 player cards side by side — 2nd place left (smaller), 1st place center (larger, with gold crown icon), 3rd place right (smaller, bronze). Each shows avatar, name, score
- Full ranking list below:
  - Each row: rank number, avatar, name, score points, and badge icon if they have one
  - Badge icons: ⚽ top scorer, 🅜 MVP, 🎯 top assists
  - Row 1 has gold background tint, Row 2 silver tint, Row 3 bronze tint
  - Show 8 players total
- Bottom navigation bar with Rankings tab active
```

---

## SCREEN 8 — Player Profile + Stats
```
Design the Player Profile screen in SportsPay.

Show:
- Top bar: back arrow, player name "João Silva"
- Profile header: large avatar circle, name, "Futebol da Firma" group tag, "Mensalista desde Jan 2024"
- Badges row: monthly badges for last 6 months — each month shows a small colored badge icon or empty circle. January has a gold MVP badge, November has a goal badge, others empty.
- Stats grid (2x3): 6 stat cards each with icon, number, label:
  - ⚽ 12 Gols | 🎯 8 Assistências | 🧤 0 Defesas
  - 🏆 3 MVP | 📅 28 Presenças | 📈 89% Frequência
- Recent events section: list of last 3 events with attendance status and performance (ex: "18/01 • Confirmado • 1 gol")
- Bottom navigation bar
```

---

## SCREEN 9 — Treasury / Caixa do Grupo
```
Design the Treasury (Caixa) screen for a group admin in SportsPay.

Show:
- Top bar: back arrow, "Caixa do Grupo"
- Month selector: < Janeiro 2025 >
- Balance hero card: large card with "Saldo Atual" label and "R$ 340,00" in large bold text (green), below two smaller counters side by side: "Entradas R$ 525,00" (green up arrow) and "Saídas R$ 185,00" (red down arrow)
- Smart suggestion banner: yellow/orange card with lightbulb icon — "O rateio deste mês ficou R$72. Usar R$120 do caixa reduz para R$57,60?" with "Ver Detalhes" button
- Transaction list title: "Movimentações"
- Transaction items: each row shows category icon, description, date, and amount colored green (entrada) or red (saída):
  - 🟢 "Carlos Diarista" • 14/01 • +R$15,00
  - 🟢 "Pedro Diarista" • 11/01 • +R$15,00
  - 🔴 "Pagamento campo Jan" • 05/01 • -R$1.440,00
  - 🟢 "Diarista avulso" • 04/01 • +R$15,00
- FAB: "+" to add manual entry
```

---

## SCREEN 10 — Invite / Convite Screen
```
Design the Group Invite screen in SportsPay.

Show:
- Top bar: back arrow, "Convidar para Futebol da Firma"
- Large QR code in the center of the screen inside a white card with rounded corners and subtle shadow
- Below the QR: invite link text "sportspay.app/invite/FTB2025" in a gray pill with copy icon
- Group info below the link: sport icon, group name, "23 membros"
- Two action buttons stacked:
  - Primary green button: WhatsApp icon + "Compartilhar no WhatsApp"
  - Secondary outlined button: link icon + "Copiar Link"
- Small disclaimer at bottom: "Link válido por 7 dias • Máximo 5 usos"
```

---

## REFINEMENT TIPS
> Use these in the Stitch chat after generating each screen:

- **Adjust colors**: "Change all primary buttons to use #1B5E20 green with white text"
- **Fix spacing**: "Increase padding inside cards to 16px on all sides"
- **Fix typography**: "Make all heading text bolder and use #212121 color"
- **Add consistency**: "Apply the same card style (white background, 16px radius, soft shadow) to all content sections"
- **Adjust a specific element**: "Move the FAB button to bottom-right corner, 24px from edges"
- **Dark mode variant**: "Generate a dark mode version using #121212 background and keeping the same green accent"
