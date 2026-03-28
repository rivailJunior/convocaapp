import React from 'react';

import { EventCarousel } from '@/components/group/group-event-carousel';

import type { UpcomingEventItem } from '@/components/group/hooks/hook-use-upcoming-events';

const mockEvents: UpcomingEventItem[] = [
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

const meta = {
  title: 'Components/Group/EventCarousel',
  component: EventCarousel,
  parameters: {
    layout: 'centered',
  },
  render: (args: { events: UpcomingEventItem[] }) => (
    <div className="w-[380px] p-4">
      <EventCarousel {...args} />
    </div>
  ),
};

export default meta;

export const Default = {
  args: { events: mockEvents },
};

export const SingleEvent = {
  args: { events: [mockEvents[0]] },
};

export const Empty = {
  args: { events: [] },
};

export const NoAvatars = {
  args: {
    events: [
      {
        ...mockEvents[0],
        confirmedCount: 0,
        confirmedAvatars: [],
      },
    ],
  },
};
