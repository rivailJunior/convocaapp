'use client';

import { useState } from 'react';

import type { Group, PaymentStatus, Sport } from '@sportspay/shared';

export interface GroupDisplayItem extends Group {
  memberCount: number;
  nextEvent?: string;
  paymentStatus?: PaymentStatus;
}

const SPORT_EMOJI: Record<Sport, string> = {
  futebol: '⚽',
  volei: '🏐',
  basquete: '🏀',
  outro: '⚙️',
};

export function getSportEmoji(sport: Sport): string {
  return SPORT_EMOJI[sport] ?? '⚙️';
}

const MOCK_GROUPS: GroupDisplayItem[] = [
  {
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
  },
  {
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
  },
  {
    id: '3',
    name: 'Basquete da Praça',
    sport: 'basquete',
    adminId: 'admin-1',
    memberIds: Array.from({ length: 8 }, (_, i) => `user-${i}`),
    memberCount: 8,
    billingMode: 'field_split',
    dueDay: 5,
    paymentMethods: ['pix'],
    inviteCode: 'INV003',
    plan: 'pro',
    createdAt: '2026-01-01T00:00:00.000Z',
    nextEvent: 'Sáb 18/01 • 14h',
    paymentStatus: 'paid',
  },
  {
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
  },
];

interface UseGroupsReturn {
  groups: GroupDisplayItem[];
  isLoading: boolean;
}

export function useGroups(): UseGroupsReturn {
  // TODO: replace with React Query fetch from API
  const [groups] = useState<GroupDisplayItem[]>(MOCK_GROUPS);

  return { groups, isLoading: false };
}
