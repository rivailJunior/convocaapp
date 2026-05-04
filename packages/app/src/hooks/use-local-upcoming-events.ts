import { useCallback, useEffect, useState } from 'react';

import { getUpcomingEventItems } from '../services/database/entities/event/event';

import type { Sport, UpcomingEventItem } from '@sportspay/shared';

interface UseLocalUpcomingEventsReturn {
  events: UpcomingEventItem[];
  isLoading: boolean;
  refetch: () => void;
}

export function useLocalUpcomingEvents(): UseLocalUpcomingEventsReturn {
  const [events, setEvents] = useState<UpcomingEventItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const refetch = useCallback(async () => {
    try {
      setIsLoading(true);
      const rows = await getUpcomingEventItems();
      const mapped: UpcomingEventItem[] = rows.map((row) => ({
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
      setEvents(mapped);
    } catch (error) {
      console.error('[useLocalUpcomingEvents] Failed to fetch upcoming events:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { events, isLoading, refetch };
}
