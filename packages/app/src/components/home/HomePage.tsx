import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useGroups, useTreasurySummary, useUpcomingEvents } from '@sportspay/shared';
import { ROUTES } from '@/navigation';

import { BalanceCard } from './components/BalanceCard';
import { HomeHeader } from './components/HomeHeader';
import { MyGroupsList } from './components/MyGroupsList';
import { UpcomingMatchesCarousel } from './components/UpcomingMatchesCarousel';
import { FloatingAddButton } from '../floating-add-button';

export function HomePage(): React.JSX.Element {
  const { groups } = useGroups();
  const { summaries } = useTreasurySummary();
  const { events } = useUpcomingEvents();

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

      <FloatingAddButton page={ROUTES.GROUP as string} />
    </SafeAreaView>
  );
}
