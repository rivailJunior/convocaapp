'use client';

import { useState } from 'react';

import type { Event, Sport } from '@sportspay/shared';

export interface UpcomingEventItem extends Event {
  sport: Sport;
  groupName: string;
  confirmedCount: number;
  confirmedAvatars: string[];
}

const MOCK_UPCOMING_EVENTS: UpcomingEventItem[] = [
  {
    id: 'evt-1',
    groupId: 'grp-1',
    title: 'Fute de Quinta',
    date: '2026-01-18T20:00:00.000Z',
    recurrence: 'weekly',
    venueName: 'Arena Gol de Ouro',
    venueAddress: 'Rua das Palmeiras, 100',
    venueLat: -23.55,
    venueLng: -46.63,
    maxPlayers: 20,
    status: 'scheduled',
    createdBy: 'admin-1',
    createdAt: '2026-01-01T00:00:00.000Z',
    sport: 'futebol',
    groupName: 'Pelada dos Amigos',
    confirmedCount: 10,
    confirmedAvatars: [
      'https://i.pravatar.cc/48?u=a',
      'https://i.pravatar.cc/48?u=b',
    ],
  },
  {
    id: 'evt-2',
    groupId: 'grp-2',
    title: 'Vôlei de Domingo',
    date: '2026-01-19T09:30:00.000Z',
    recurrence: 'weekly',
    venueName: 'Parque Ibirapuera',
    venueAddress: 'Av. Pedro Álvares Cabral',
    venueLat: -23.58,
    venueLng: -46.66,
    maxPlayers: 12,
    status: 'scheduled',
    createdBy: 'admin-2',
    createdAt: '2026-01-01T00:00:00.000Z',
    sport: 'volei',
    groupName: 'Vôlei de Domingo',
    confirmedCount: 6,
    confirmedAvatars: [
      'https://i.pravatar.cc/48?u=c',
      'https://i.pravatar.cc/48?u=d',
    ],
  },
  {
    id: 'evt-3',
    groupId: 'grp-3',
    title: 'Beach Tennis Sábado',
    date: '2026-01-24T16:00:00.000Z',
    recurrence: 'weekly',
    venueName: 'Arena Beach Sports',
    venueAddress: 'Rua da Praia, 42',
    venueLat: -23.56,
    venueLng: -46.65,
    maxPlayers: 8,
    status: 'scheduled',
    createdBy: 'admin-3',
    createdAt: '2026-01-01T00:00:00.000Z',
    sport: 'outro',
    groupName: 'Beach Tennis Club',
    confirmedCount: 4,
    confirmedAvatars: [
      'https://i.pravatar.cc/48?u=e',
      'https://i.pravatar.cc/48?u=f',
    ],
  },
];

interface UseUpcomingEventsReturn {
  events: UpcomingEventItem[];
  isLoading: boolean;
}

export function useUpcomingEvents(
  _groupIds: string[],
  _limit = 3,
): UseUpcomingEventsReturn {
  // TODO: replace with React Query fetch from API (e.g. GET /api/events/upcoming?groupIds=...&limit=N)
  const [events] = useState<UpcomingEventItem[]>(MOCK_UPCOMING_EVENTS);

  return { events, isLoading: false };
}
