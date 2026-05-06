import { useCallback, useEffect, useState } from 'react';

import {
  getConfirmedCountsByGroupId,
  getRecurrentEventsByGroupId,
} from '../services/database/entities/event/event';
import { getGroupDisplayItems } from '../services/database/entities/group/group';

import type {
  GroupDisplayItem,
  RecurrentEventEntity,
  Sport,
  UpcomingEventItem,
} from '@sportspay/shared';

function mapEntityToUpcomingEvent(
  entity: RecurrentEventEntity,
  confirmedCounts: Record<number, number>,
  groupName: string,
  sport: Sport,
): UpcomingEventItem {
  const dateTime = entity.dateTime;

  return {
    id: String(entity.id),
    groupId: String(entity.groupId),
    title: entity.name,
    date: dateTime,
    recurrence: (entity.frequency as UpcomingEventItem['recurrence']) ?? 'once',
    venueName: entity.location,
    venueAddress: '',
    venueLat: 0,
    venueLng: 0,
    status: 'scheduled',
    createdBy: '',
    createdAt: entity.createdAt,
    sport,
    groupName,
    confirmedCount: confirmedCounts[entity.id] ?? 0,
    confirmedAvatars: [],
  };
}

function isUpcoming(dateStr: string): boolean {
  const eventDate = new Date(dateStr);
  if (isNaN(eventDate.getTime())) return true;
  return eventDate.getTime() >= Date.now();
}

interface UseAllGroupsUpcomingEventsReturn {
  events: UpcomingEventItem[];
  groups: GroupDisplayItem[];
  isLoading: boolean;
  refetch: () => void;
}

export function useAllGroupsUpcomingEvents(): UseAllGroupsUpcomingEventsReturn {
  const [events, setEvents] = useState<UpcomingEventItem[]>([]);
  const [groups, setGroups] = useState<GroupDisplayItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const refetch = useCallback(async () => {
    try {
      setIsLoading(true);

      // Fetch all groups but limit to 10
      const groupRows = await getGroupDisplayItems();
      const limitedGroupRows = groupRows.slice(0, 10);
      const mappedGroups: GroupDisplayItem[] = limitedGroupRows.map((row) => ({
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

      // Fetch events for up to 10 groups
      const groupIds = mappedGroups.map((group) => parseInt(group.id));
      const eventPromises = groupIds.map(async (groupId) => {
        const [entities, confirmedCounts] = await Promise.all([
          getRecurrentEventsByGroupId(groupId),
          getConfirmedCountsByGroupId(groupId),
        ]);
        return entities.map((e) =>
          mapEntityToUpcomingEvent(
            e,
            confirmedCounts,
            mappedGroups.find((g) => g.id === String(groupId))?.name || 'Unknown Group',
            mappedGroups.find((g) => g.id === String(groupId))?.sport || 'outro',
          ),
        );
      });

      const allEventsArrays = await Promise.all(eventPromises);
      const allEvents = allEventsArrays.flat();

      // Filter only upcoming events
      const upcomingEvents = allEvents.filter((e) => isUpcoming(e.date));

      // Sort by date (earliest first)
      upcomingEvents.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

      // Limit to maximum 10 events
      const limitedEvents = upcomingEvents.slice(0, 10);

      setEvents(limitedEvents);
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
