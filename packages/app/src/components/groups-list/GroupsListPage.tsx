import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from 'expo-router';
import { useAllGroupsUpcomingEvents } from '@/hooks/use-all-groups-upcoming-events';
import { ROUTES } from '@/navigation';
import { useCallback } from 'react';

import { FloatingAddButton } from '../floating-add-button';
import { MyGroupsList } from '../home/components/MyGroupsList';

export function GroupsListPage(): React.JSX.Element {
  const { groups, refetch } = useAllGroupsUpcomingEvents();

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch]),
  );

  return (
    <SafeAreaView className="flex-1 bg-surface" edges={['top', 'left', 'right']}>
      <View className="px-4 pt-4 pb-2">
        <Text className="text-2xl font-bold font-headline text-on-background">Grupos</Text>
      </View>

      <ScrollView
        className="flex-1 px-4"
        contentContainerClassName="pb-32 gap-4"
        showsVerticalScrollIndicator={false}
      >
        <MyGroupsList groups={groups} />
      </ScrollView>

      <FloatingAddButton page={ROUTES.GROUP} />
    </SafeAreaView>
  );
}
