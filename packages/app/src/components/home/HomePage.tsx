import { router } from 'expo-router';
import { Plus } from 'lucide-react-native';
import { Pressable, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useGroups, useTreasurySummary, useUpcomingEvents } from '@sportspay/shared';

import { BalanceCard } from './components/BalanceCard';
import { HomeHeader } from './components/HomeHeader';
import { MyGroupsList } from './components/MyGroupsList';
import { UpcomingMatchesCarousel } from './components/UpcomingMatchesCarousel';

export function HomePage(): React.JSX.Element {
  const { groups } = useGroups();
  const { summaries } = useTreasurySummary();
  const { events } = useUpcomingEvents();

  const handleCreateEvent = () => {
    router.push('/event/create-recurrent-event');
    // TODO: Navigate to create event screen
  };

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

      <Pressable
        className="absolute bottom-28 right-6 w-16 h-16 rounded-2xl bg-primary items-center justify-center"
        accessibilityLabel="Criar evento"
        onPress={handleCreateEvent}
      >
        <Plus size={28} color="#fff" />
      </Pressable>
    </SafeAreaView>
  );
}
