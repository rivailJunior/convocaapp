
import * as Clipboard from 'expo-clipboard';
import * as Sharing from 'expo-sharing';
import { Pressable, Text } from 'react-native';

import { EVENT_STATUSES, SPORTS } from '@sportspay/shared';

import type { Event, Group, User } from '@sportspay/shared';

interface EventShareProps {
  group: Group;
  event: Event;
  users: User[];
}

function formatDate(iso: string): string {
  const date = new Date(iso);
  return new Intl.DateTimeFormat('pt-BR', {
    weekday: 'long',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

function buildShareMessage(group: Group, event: Event, users: User[]): string {
  const sport = SPORTS[group.sport];
  const status = EVENT_STATUSES[event.status];
  const dateStr = formatDate(event.date);

  const playerList = users.map((u, i) => `${i + 1}. ${u.name}`).join('\n');

  const lines = [
    `⚽ ${group.name} — ${sport}`,
    '',
    `📋 ${event.title}`,
    `📅 ${dateStr}`,
    `💰 Valor: ${group.billingMode ? `R$ ${group.billingMode}` : 'Gratuito'}`,
    `📍 ${event.venueName}`,
    event.venueAddress ? `📌 ${event.venueAddress}` : '',
    `🔖 Status: ${status}`,
    '',
    `👥 Jogadores (${users.length}${event.maxPlayers ? `/${event.maxPlayers}` : ''}):`,
    playerList || 'Nenhum jogador na lista.',
    '',
    '🏟️ Compartilhado via SportsPay',
  ];

  return lines.filter(Boolean).join('\n');
}

export function EventShare({ group, event, users }: EventShareProps) {
  const handleShare = async () => {
    const message = buildShareMessage(group, event, users);

    try {
      const isAvailable = await Sharing.isAvailableAsync();
      if (!isAvailable) {
        await Clipboard.setStringAsync(message);
        // Could show a toast here that message was copied to clipboard
        return;
      }

      await Sharing.shareAsync(message);
    } catch (error: unknown) {
      if (__DEV__) {
        // eslint-disable-next-line no-console
        console.warn('Error sharing event', error);
      }
    }
  };

  return (
    <Pressable
      onPress={handleShare}
      className="flex-row items-center justify-center rounded-lg bg-green-600 px-4 py-3"
    >
      <Text className="text-base font-semibold text-white">Compartilhar Evento</Text>
    </Pressable>
  );
}
