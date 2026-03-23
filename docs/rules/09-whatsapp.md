# WhatsApp Integration
> **Model Decision**: apply when working on sharing, invite links, payment links, event notifications

## How It Works
WhatsApp integration is link-based only — no WhatsApp Business API in MVP.
- Use `wa.me/{phone}?text={encoded_message}` links
- Opening the link launches WhatsApp with the pre-filled message
- User still taps "Send" themselves — this is intentional and required by WhatsApp ToS

## Message Templates (from `@sportspay/utils`)

### Invite Link
```
Você foi convidado para participar do grupo *{groupName}* ({sport}) no SportsPay! 🏆

Clique no link para entrar:
{inviteLink}
```

### Payment Link
```
Olá, {memberName}! 👋

Sua mensalidade do grupo *{groupName}* está disponível:
💰 Valor: {amount}
📅 Vencimento: {dueDate}

Pague agora (Pix ou cartão):
{paymentLink}
```

### Event Reminder
```
*{sport}* confirmado! ⚽

📅 {dayOfWeek}, {date} às {time}
📍 {venueName}
{venueAddress}

Confirme sua presença:
{eventLink}
```

## Links — Firebase Dynamic Links
All links shared via WhatsApp use Firebase Dynamic Links so they:
1. Open the app directly if installed
2. Redirect to the web page if not installed (no "app not found" error)
3. Fall back to App Store / Play Store with return redirect after install

Link format: `https://sportspay.page.link/{path}`
- Invite: `https://sportspay.page.link/invite/{code}`
- Payment: `https://sportspay.page.link/pay/{id}`
- Event: `https://sportspay.page.link/event/{id}`

### Team Draw
```
⚽ *Times do Futebol — {date}*
📍 {venueName}

{teams.map(t => `*${t.name}*\n${t.players.map(p => `• ${p.userName}`).join('\n')}`).join('\n\n')}

{bench.length > 0 ? `🪑 *Banco:* ${bench.map(p => p.userName).join(', ')}` : ''}

_Gerado pelo SportsPay_
```

## Opening WhatsApp (App)
```ts
import { whatsappLink, whatsappMessages } from '@sportspay/utils'
import { Linking } from 'react-native'

const message = whatsappMessages.paymentLink(groupName, amount, dueDate, paymentLink)
const url = whatsappLink(member.phone, message)

const canOpen = await Linking.canOpenURL(url)
if (canOpen) {
  await Linking.openURL(url)
} else {
  // Fallback: copy link to clipboard
  await Clipboard.setStringAsync(paymentLink)
  Alert.alert('Link copiado!', 'Cole no WhatsApp para enviar.')
}
```

## Opening WhatsApp (Web)
```ts
// On web, always open in new tab
window.open(whatsappLink(phone, message), '_blank')
```

## Phone Number Format
- Store phone numbers with country code: `+5511999999999`
- `whatsappLink()` strips non-digits automatically before building the URL
- Phone is optional in the user profile — if missing, fall back to copying the link only
