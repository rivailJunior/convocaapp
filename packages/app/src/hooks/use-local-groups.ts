import { useCallback, useEffect, useState } from 'react';

import { getGroupById, getGroupDisplayItems } from '../services/database/entities/group/group';

import type { GroupWithParticipants } from '../services/database/entities/group/group';
import type { GroupDisplayItem } from '@sportspay/shared';

interface UseLocalGroupsReturn {
  groups: GroupDisplayItem[];
  isLoading: boolean;
  refetch: () => void;
  getSingleGroup: (id: number) => Promise<GroupWithParticipants | null>;
}

export function useLocalGroups(): UseLocalGroupsReturn {
  const [groups, setGroups] = useState<GroupDisplayItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const getSingleGroup = useCallback(async (id: number) => {
    return getGroupById(id);
  }, []);

  const refetch = useCallback(async () => {
    try {
      const rows = await getGroupDisplayItems();
      const mapped: GroupDisplayItem[] = rows.map((row) => ({
        id: String(row.id),
        name: row.name,
        sport: row.sport as GroupDisplayItem['sport'],
        adminId: '',
        memberIds: [],
        billingMode: 'fixed' as const,
        dueDay: 1,
        paymentMethods: ['pix' as const],
        pixKey: row.pixKey,
        inviteCode: '',
        plan: 'free' as const,
        createdAt: row.createdAt,
        memberCount: row.memberCount,
      }));
      setGroups(mapped);
    } catch (error) {
      console.error('[useLocalGroups] Failed to fetch groups:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { groups, isLoading, refetch, getSingleGroup };
}
