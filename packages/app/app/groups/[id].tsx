import { useLocalSearchParams } from 'expo-router';

import { GroupDetailsPage } from '../../src/components/group-details';

export default function GroupDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return <GroupDetailsPage groupId={id} />;
}
