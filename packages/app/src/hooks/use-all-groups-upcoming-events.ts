import { useCallback, useEffect, useState } from 'react';

import { getUpcomingEventItems } from '../services/database/entities/event/event';
import { getGroupDisplayItems } from '../services/database/entities/group/group';

import type { GroupDisplayItem, Sport, UpcomingEventItem } from '@sportspay/shared';

interface UseAllGroupsUpcomingEventsReturn {
  events: UpcomingEventItem[];
  groups: GroupDisplayItem[];
  isLoading: boolean;
  refetch: () => void;
}

// TODO: Rename this hook to useHome
export function useAllGroupsUpcomingEvents(): UseAllGroupsUpcomingEventsReturn {
  const [events, setEvents] = useState<UpcomingEventItem[]>([]);
  const [groups, setGroups] = useState<GroupDisplayItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const refetch = useCallback(async () => {
    try {
      setIsLoading(true);

      const [eventRows, groupRows] = await Promise.all([
        getUpcomingEventItems(),
        getGroupDisplayItems(),
      ]);

      const mappedGroups: GroupDisplayItem[] = groupRows.slice(0, 10).map((row) => ({
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
      setGroups(mappedGroups);

      const mappedEvents: UpcomingEventItem[] = eventRows.slice(0, 10).map((row) => ({
        id: String(row.id),
        groupId: String(row.groupId),
        title: row.name,
        date: row.dateTime,
        recurrence: (row.frequency as UpcomingEventItem['recurrence']) ?? 'once',
        venueName: row.location,
        venueAddress: '',
        venueLat: 0,
        venueLng: 0,
        status: 'scheduled',
        createdBy: '',
        createdAt: row.createdAt,
        sport: row.sport as Sport,
        groupName: row.groupName,
        confirmedCount: row.confirmedCount,
        confirmedAvatars: [],
      }));
      setEvents(mappedEvents);
    } catch (error) {
      console.error('[useAllGroupsUpcomingEvents] Failed to fetch data:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { events, groups, isLoading, refetch };
}
