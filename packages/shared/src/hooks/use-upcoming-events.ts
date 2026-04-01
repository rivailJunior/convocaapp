import type { UpcomingEventItem } from '../types';

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
];

interface UseUpcomingEventsReturn {
  events: UpcomingEventItem[];
}

export function useUpcomingEvents(): UseUpcomingEventsReturn {
  return { events: MOCK_UPCOMING_EVENTS };
}
