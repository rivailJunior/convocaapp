import type { Sport } from '../types';

const MONTHS_PT = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro',
];

const SPORT_EMOJI: Record<Sport, string> = {
  futebol: '⚽',
  volei: '🏐',
  basquete: '🏀',
  outro: '⚙️',
};

export const getSportEmoji = (sport: Sport): string => {
  return SPORT_EMOJI[sport] ?? '⚙️';
};

export const formatEventDate = (iso: string): string => {
  const date = new Date(iso);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${day}/${month} • ${hours}:${minutes}`;
};

export const formatCurrency = (centavos: number): string => {
  const reais = centavos / 100;
  return reais.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
};

/** Format referenceMonth for display: '2025-01' → 'Janeiro 2025' */
export const formatMonth = (referenceMonth: string): string => {
  const [year, month] = referenceMonth.split('-');
  const monthIndex = parseInt(month!, 10) - 1;
  return `${MONTHS_PT[monthIndex]} ${year}`;
};

/** Generate current referenceMonth string: '2025-01' */
export const currentReferenceMonth = (): string => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  return `${year}-${month}`;
};

/** Build a WhatsApp deep link with pre-encoded message */
export const whatsappLink = (phone: string, message: string): string => {
  const cleaned = phone.replace(/\D/g, '');
  return `https://wa.me/${cleaned}?text=${encodeURIComponent(message)}`;
};

/** WhatsApp message templates (PT-BR) */
export const whatsappMessages = {
  paymentLink: (groupName: string, amount: number, dueDate: string, link: string): string =>
    `💰 *${groupName}*\n\nSua mensalidade de *${formatCurrency(amount)}* vence em *${dueDate}*.\n\nPague aqui: ${link}`,

  eventReminder: (
    sport: string,
    day: string,
    date: string,
    time: string,
    venue: string,
    link: string,
  ): string =>
    `⚽ *${sport} — ${day} ${date}*\n⏰ ${time}\n📍 ${venue}\n\nConfirme sua presença: ${link}`,

  inviteLink: (groupName: string, sport: string, link: string): string =>
    `🏟️ Você foi convidado para o grupo *${groupName}* (${sport}) no SportsPay!\n\nEntre pelo link: ${link}`,

  teamDraw: (
    sport: string,
    date: string,
    venue: string,
    teams: Array<{ name: string; players: Array<{ userName: string }> }>,
    bench: Array<{ userName: string }>,
  ): string => {
    let msg = `⚽ *Times do ${sport} — ${date}*\n📍 ${venue}\n`;

    for (const team of teams) {
      msg += `\n*${team.name}*\n`;
      for (const player of team.players) {
        msg += `• ${player.userName}\n`;
      }
    }

    if (bench.length > 0) {
      msg += `\n🪑 *Banco:* ${bench.map((p) => p.userName).join(', ')}\n`;
    }

    msg += '\n_Gerado pelo SportsPay_';
    return msg;
  },
};
