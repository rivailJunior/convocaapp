import React from 'react';

import type { Group, Sport } from '@sportspay/shared';

import { GroupPage } from '@/components/group/group-page';

function createGroupMock(input: {
  id: string;
  name: string;
  sport: Sport;
  avatarUrl: string;
}): Group {
  return {
    id: input.id,
    name: input.name,
    sport: input.sport,
    adminId: 'admin-1',
    memberIds: ['user-1', 'user-2'],
    billingMode: 'fixed',
    dueDay: 10,
    paymentMethods: ['pix'],
    inviteCode: `INV${input.id}`,
    plan: 'free',
    avatarUrl: input.avatarUrl,
    createdAt: '2026-01-01T00:00:00.000Z',
  };
}

export const groupPageItemsDto: Group[] = [
  {
    ...createGroupMock({
      id: '1',
      name: 'Futebol da Firma',
      sport: 'futebol',
      avatarUrl:
      'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=200&q=80',
    }),
  },
  {
    ...createGroupMock({
      id: '2',
      name: 'Volei de Praia',
      sport: 'volei',
      avatarUrl:
      'https://images.unsplash.com/photo-1526232761682-d26e03ac148e?auto=format&fit=crop&w=200&q=80',
    }),
  },
  {
    ...createGroupMock({
      id: '3',
      name: 'Basquete Noturno',
      sport: 'basquete',
      avatarUrl:
      'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=200&q=80',
    }),
  },
];

const crowdedGroupItems: Group[] = [
  ...groupPageItemsDto,
  {
    ...createGroupMock({
      id: '4',
      name: 'Futsal Masters 40+',
      sport: 'futebol',
      avatarUrl:
      'https://images.unsplash.com/photo-1593766788306-28561086694e?auto=format&fit=crop&w=200&q=80',
    }),
  },
  {
    ...createGroupMock({
      id: '5',
      name: 'Cross Treino Parque',
      sport: 'outro',
      avatarUrl:
      'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=200&q=80',
    }),
  },
];

const longTextGroupItems: Group[] = [
  {
    ...createGroupMock({
      id: '6',
      name: 'Grupo de Futebol Society Corporativo da Zona Norte de Sao Paulo',
      sport: 'futebol',
      avatarUrl:
      'https://images.unsplash.com/photo-1517927033932-b3d18e61fb3a?auto=format&fit=crop&w=200&q=80',
    }),
  },
  {
    ...createGroupMock({
      id: '7',
      name: 'Time de Volei Feminino da Comunidade',
      sport: 'volei',
      avatarUrl:
      'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?auto=format&fit=crop&w=200&q=80',
    }),
  },
];

const meta = {
  title: 'Components/Group/GroupPage',
  component: GroupPage,
  parameters: {
    layout: 'centered',
  },
  render: (args: { items: Group[] }) => (
    <div className="w-[380px] bg-background-light p-4">
      <GroupPage {...args} />
    </div>
  ),
};

export default meta;

export const Default = {
  args: {
    items: groupPageItemsDto,
  },
};

export const CrowdedList = {
  args: {
    items: crowdedGroupItems,
  },
};

export const LongText = {
  args: {
    items: longTextGroupItems,
  },
};

export const Empty = {
  args: {
    items: [],
  },
};
