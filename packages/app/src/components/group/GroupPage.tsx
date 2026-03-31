import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Plus, Settings } from 'lucide-react-native';

import { useGroups, useTreasurySummary, useUpcomingEvents } from '@sportspay/shared';

import { GroupHeader } from './components/GroupHeader';
import { EventCarousel } from './components/EventCarousel';
import { GroupCard } from './components/GroupCard';

export function GroupPage(): React.JSX.Element {
  const { groups } = useGroups();
  const { summaries } = useTreasurySummary();
  const groupIds = groups.map((g) => g.id);
  const { events } = useUpcomingEvents(groupIds);

  return (
    <SafeAreaView className="flex-1 bg-surface">
      <View className="flex-row justify-between items-center px-4 h-14">
        <View className="flex-row items-center gap-2">
          <Text className="text-2xl">⚽</Text>
          <Text className="text-primary font-extrabold tracking-tight text-xl">
            SportsPay
          </Text>
        </View>
        <Pressable disabled className="opacity-60">
          <Settings size={24} color="#595c5d" />
        </Pressable>
      </View>

      <ScrollView
        className="flex-1 px-4 pt-4"
        contentContainerClassName="pb-32 gap-6"
        showsVerticalScrollIndicator={false}
      >
        {summaries.length > 0 && <GroupHeader summaries={summaries} />}

        <EventCarousel events={events} />

        <View className="gap-3">
          <Text className="text-xl font-bold text-on-background">
            Meus Grupos
          </Text>
          {groups.map((group) => (
            <GroupCard key={group.id} group={group} />
          ))}
          {groups.length === 0 && (
            <View className="rounded-xl border border-dashed border-outline-variant p-4 items-center">
              <Text className="text-xs text-on-surface-variant">
                Nenhum grupo disponível no momento.
              </Text>
            </View>
          )}
        </View>
      </ScrollView>

      <Pressable
        disabled
        className="absolute bottom-28 right-6 w-16 h-16 rounded-2xl bg-primary items-center justify-center opacity-60"
      >
        <Plus size={28} color="#fff" />
      </Pressable>
    </SafeAreaView>
  );
}
