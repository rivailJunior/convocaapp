import { MOCK_GROUP_EVENTS } from './mock-group-events';

import type { GroupEventItem } from '../types';

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
