import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from 'expo-router';
import { useAllGroupsUpcomingEvents } from '@/hooks/use-all-groups-upcoming-events';
import { ROUTES } from '@/navigation';
import { useCallback } from 'react';

import { useTreasurySummary } from '@sportspay/shared';

import { FloatingAddButton } from '../floating-add-button';
import { BalanceCard } from './components/BalanceCard';
import { HomeHeader } from './components/HomeHeader';
import { MyGroupsList } from './components/MyGroupsList';
import { UpcomingMatchesCarousel } from './components/UpcomingMatchesCarousel';

export function HomePage(): React.JSX.Element {
  const { groups, events, refetch } = useAllGroupsUpcomingEvents();

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch]),
  );
  const { summaries } = useTreasurySummary();

  return (
    <SafeAreaView className="flex-1 bg-surface">
      <HomeHeader />

      <ScrollView
        className="flex-1 px-4 pt-4"
        contentContainerClassName="pb-32 gap-6"
        showsVerticalScrollIndicator={false}
      >
        {summaries.length > 0 && <BalanceCard summaries={summaries} />}
        <UpcomingMatchesCarousel events={events} />
        <MyGroupsList groups={groups} />
      </ScrollView>

      <FloatingAddButton page={ROUTES.GROUP} />
    </SafeAreaView>
  );
}
