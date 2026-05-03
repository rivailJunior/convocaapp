import { useCallback, useEffect, useState } from 'react';

import {
  getConfirmedCountsByGroupId,
  getRecurrentEventsByGroupId,
} from '../services/database/entities/event/event';

import type { GroupEventItem, RecurrentEventEntity } from '@sportspay/shared';

function mapEntityToGroupEvent(
  entity: RecurrentEventEntity,
  confirmedCounts: Record<number, number>,
): GroupEventItem {
  const dateTime = entity.dateTime;

  return {
    id: String(entity.id),
    groupId: String(entity.groupId),
    title: entity.name,
    date: dateTime,
    recurrence: (entity.frequency as GroupEventItem['recurrence']) ?? 'once',
    venueName: entity.location,
    venueAddress: '',
    venueLat: 0,
    venueLng: 0,
    status: 'scheduled',
    createdBy: '',
    createdAt: entity.createdAt,
    confirmedCount: confirmedCounts[entity.id] ?? 0,
    hasTeams: false,
  };
}

function isUpcoming(dateStr: string): boolean {
  const eventDate = new Date(dateStr);
  if (isNaN(eventDate.getTime())) return true;
  return eventDate.getTime() >= Date.now();
}

interface UseLocalGroupEventsReturn {
  upcoming: GroupEventItem[];
  past: GroupEventItem[];
  isLoading: boolean;
  refetch: () => void;
}

export function useLocalGroupEvents(groupId: number): UseLocalGroupEventsReturn {
  const [upcoming, setUpcoming] = useState<GroupEventItem[]>([]);
  const [past, setPast] = useState<GroupEventItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const refetch = useCallback(async () => {
    try {
      setIsLoading(true);
      const [entities, confirmedCounts] = await Promise.all([
        getRecurrentEventsByGroupId(groupId),
        getConfirmedCountsByGroupId(groupId),
      ]);
      const events = entities.map((e) => mapEntityToGroupEvent(e, confirmedCounts));

      setUpcoming(events.filter((e) => isUpcoming(e.date)));
      setPast(events.filter((e) => !isUpcoming(e.date)));
    } catch (error) {
      console.error('[useLocalGroupEvents] Failed to fetch events:', error);
    } finally {
      setIsLoading(false);
    }
  }, [groupId]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { upcoming, past, isLoading, refetch };
}
