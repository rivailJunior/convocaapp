import { useLocalSearchParams } from 'expo-router';
import { Text, View } from 'react-native';

import { GroupDetailsPage } from '../../src/components/group-details';

export default function GroupDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  if (typeof id !== 'string') {
    return (
      <View className="flex-1 bg-surface items-center justify-center">
        <Text className="text-on-surface-variant">Grupo não encontrado.</Text>
      </View>
    );
  }

  return <GroupDetailsPage groupId={id} />;
}
