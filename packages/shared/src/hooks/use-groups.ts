import { MOCK_GROUPS } from './mock-groups';

import type { GroupDisplayItem } from '../types';

interface UseGroupsReturn {
  groups: GroupDisplayItem[];
}

export function useGroups(): UseGroupsReturn {
  return { groups: MOCK_GROUPS };
}
