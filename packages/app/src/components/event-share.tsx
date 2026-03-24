import { Pressable, Text, View } from 'react-native';
import Share from 'react-native-share';
import {
  SPORTS,
  EVENT_STATUSES,
  ATTENDANCE_STATUSES,
} from '@sportspay/shared';
import type { Group, Event, User } from '@sportspay/shared';

interface EventShareProps {
  group: Group;
  event: Event;
  users: User[];
}

function formatDate(iso: string): string {
  const date = new Date(iso);
  return date.toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function buildShareMessage(group: Group, event: Event, users: User[]): string {
  const sport = SPORTS[group.sport];
  const status = EVENT_STATUSES[event.status];
  const dateStr = formatDate(event.date);

  const playerList = users
    .map((u, i) => `${i + 1}. ${u.name}`)
    .join('\n');

  const lines = [
    `⚽ ${group.name} — ${sport}`,
    '',
    `📋 ${event.title}`,
    `📅 ${dateStr}`,
    `📍 ${event.venueName}`,
    event.venueAddress ? `📌 ${event.venueAddress}` : '',
    `🔖 Status: ${status}`,
    '',
    `👥 Jogadores (${users.length}${event.maxPlayers ? `/${event.maxPlayers}` : ''}):`,
    playerList || 'Nenhum jogador confirmado.',
    '',
    '🏟️ Compartilhado via SportsPay',
  ];

  return lines.filter(Boolean).join('\n');
}

export function EventShare({ group, event, users }: EventShareProps) {
  const handleShare = async () => {
    const message = buildShareMessage(group, event, users);

    try {
      await Share.open({
        title: `${event.title} — ${group.name}`,
        message,
      });
    } catch {
      // user dismissed the share sheet — no action needed
    }
  };

  return (
    <Pressable
      onPress={handleShare}
      className="flex-row items-center justify-center rounded-lg bg-green-600 px-4 py-3"
    >
      <Text className="text-base font-semibold text-white">
        Compartilhar Evento
      </Text>
    </Pressable>
  );
}
