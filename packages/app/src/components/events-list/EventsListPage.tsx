import { useCallback } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from 'expo-router';

import { useAllGroupsUpcomingEvents } from '@/hooks/use-all-groups-upcoming-events';

import { UpcomingMatchesCarousel } from '../home/components/UpcomingMatchesCarousel';

export function EventsListPage(): React.JSX.Element {
  const { events, refetch } = useAllGroupsUpcomingEvents();

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch]),
  );

  return (
    <SafeAreaView className="flex-1 bg-surface">
      <View className="px-4 pt-4 pb-2">
        <Text className="text-2xl font-bold font-headline text-on-background">
          Eventos
        </Text>
      </View>

      <ScrollView
        className="flex-1 px-4"
        contentContainerClassName="pb-32 gap-4"
        showsVerticalScrollIndicator={false}
      >
        <UpcomingMatchesCarousel events={events} />
      </ScrollView>
    </SafeAreaView>
  );
}
