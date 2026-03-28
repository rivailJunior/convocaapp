import React from 'react';

import type { GroupDisplayItem } from '@/components/group/hook-use-groups';

import { GroupCard } from '@/components/group/group-card';

const paidGroup: GroupDisplayItem = {
  id: '1',
  name: 'Fute de Quinta',
  sport: 'futebol',
  adminId: 'admin-1',
  memberIds: Array.from({ length: 12 }, (_, i) => `user-${i}`),
  memberCount: 12,
  billingMode: 'fixed',
  dueDay: 10,
  paymentMethods: ['pix'],
  inviteCode: 'INV001',
  plan: 'free',
  createdAt: '2026-01-01T00:00:00.000Z',
  nextEvent: 'Qui 16/01 • 19h',
  paymentStatus: 'paid',
};

const pendingGroup: GroupDisplayItem = {
  id: '2',
  name: 'Vôlei de Domingo',
  sport: 'volei',
  adminId: 'admin-1',
  memberIds: Array.from({ length: 16 }, (_, i) => `user-${i}`),
  memberCount: 16,
  billingMode: 'fixed',
  dueDay: 15,
  paymentMethods: ['pix', 'credit_card'],
  inviteCode: 'INV002',
  plan: 'free',
  createdAt: '2026-01-01T00:00:00.000Z',
  nextEvent: 'Dom 19/01 • 10h',
  paymentStatus: 'pending',
};

const noEventGroup: GroupDisplayItem = {
  id: '4',
  name: 'Outros Esportes',
  sport: 'outro',
  adminId: 'admin-1',
  memberIds: Array.from({ length: 5 }, (_, i) => `user-${i}`),
  memberCount: 5,
  billingMode: 'fixed',
  dueDay: 10,
  paymentMethods: ['pix'],
  inviteCode: 'INV004',
  plan: 'free',
  createdAt: '2026-01-01T00:00:00.000Z',
};

const meta = {
  title: 'Components/Group/GroupCard',
  component: GroupCard,
  parameters: {
    layout: 'centered',
  },
  render: (args: { group: GroupDisplayItem }) => (
    <div className="w-[380px] bg-background-light p-4">
      <GroupCard {...args} />
    </div>
  ),
};

export default meta;

export const Paid = {
  args: { group: paidGroup },
};

export const Pending = {
  args: { group: pendingGroup },
};

export const NoEvent = {
  args: { group: noEventGroup },
};
