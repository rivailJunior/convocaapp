import type { GroupEventItem } from '../types';

const MOCK_GROUP_EVENTS: GroupEventItem[] = [
  {
    id: 'evt-grp1-1',
    groupId: '1',
    title: 'Futebol 18/01',
    date: '2026-01-18T14:00:00.000Z',
    recurrence: 'weekly',
    venueName: 'Arena Beach',
    venueAddress: 'Rua das Palmeiras, 100',
    venueLat: -23.55,
    venueLng: -46.63,
    maxPlayers: 20,
    status: 'scheduled',
    createdBy: 'admin-1',
    createdAt: '2026-01-01T00:00:00.000Z',
    confirmedCount: 9,
    hasTeams: true,
  },
  {
    id: 'evt-grp1-2',
    groupId: '1',
    title: 'Futebol 25/01',
    date: '2026-01-25T14:00:00.000Z',
    recurrence: 'weekly',
    venueName: 'Arena Beach',
    venueAddress: 'Rua das Palmeiras, 100',
    venueLat: -23.55,
    venueLng: -46.63,
    maxPlayers: 20,
    status: 'scheduled',
    createdBy: 'admin-1',
    createdAt: '2026-01-01T00:00:00.000Z',
    confirmedCount: 7,
    hasTeams: true,
  },
  {
    id: 'evt-grp1-3',
    groupId: '1',
    title: 'Futebol 11/01',
    date: '2026-01-11T14:00:00.000Z',
    recurrence: 'weekly',
    venueName: 'Arena Beach',
    venueAddress: 'Rua das Palmeiras, 100',
    venueLat: -23.55,
    venueLng: -46.63,
    maxPlayers: 20,
    status: 'finished',
    createdBy: 'admin-1',
    createdAt: '2026-01-01T00:00:00.000Z',
    confirmedCount: 14,
    hasTeams: true,
  },
  {
    id: 'evt-grp1-4',
    groupId: '1',
    title: 'Futebol 04/01',
    date: '2026-01-04T14:00:00.000Z',
    recurrence: 'weekly',
    venueName: 'Arena Beach',
    venueAddress: 'Rua das Palmeiras, 100',
    venueLat: -23.55,
    venueLng: -46.63,
    maxPlayers: 20,
    status: 'finished',
    createdBy: 'admin-1',
    createdAt: '2026-01-01T00:00:00.000Z',
    confirmedCount: 12,
    hasTeams: true,
  },
];

interface UseGroupEventsReturn {
  upcoming: GroupEventItem[];
  past: GroupEventItem[];
}

export function useGroupEvents(groupId: string): UseGroupEventsReturn {
  const groupEvents = MOCK_GROUP_EVENTS.filter((e) => e.groupId === groupId);
  const upcoming = groupEvents.filter((e) => e.status === 'scheduled');
  const past = groupEvents.filter((e) => e.status !== 'scheduled');
  return { upcoming, past };
}
