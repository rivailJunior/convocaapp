import { MOCK_GROUPS } from './mock-groups';

import type { GroupDisplayItem } from '../types';

interface UseGroupDetailsReturn {
  group: GroupDisplayItem | undefined;
}

export function useGroupDetails(groupId: string): UseGroupDetailsReturn {
  const group = MOCK_GROUPS.find((g) => g.id === groupId);
  return { group };
}
