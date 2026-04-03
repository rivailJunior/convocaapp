import { router } from 'expo-router';
import { ChevronLeft, Pencil, Plus } from 'lucide-react-native';
import { Pressable, ScrollView, Text, View } from 'react-native';

import { colors } from '@sportspay/shared';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useGroupDetails, useGroupEvents } from '@sportspay/shared';

import { GroupEventList } from './components/GroupEventList';
import { GroupHeroCard } from './components/GroupHeroCard';

interface GroupDetailsPageProps {
  groupId: string;
}

export function GroupDetailsPage({ groupId }: GroupDetailsPageProps): React.JSX.Element {
  const { group } = useGroupDetails(groupId);
  const { upcoming, past } = useGroupEvents(groupId);

  if (!group) {
    return (
      <SafeAreaView className="flex-1 bg-surface items-center justify-center">
        <Text className="text-on-surface-variant">Grupo não encontrado.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-surface">
      <View className="flex-row items-center justify-between px-4 h-16 bg-surface-container-low">
        <View className="flex-row items-center gap-3">
          <Pressable
            onPress={() => router.back()}
            className="p-2 rounded-full active:bg-surface-container-high"
            accessibilityLabel="Voltar"
          >
            <ChevronLeft size={24} color={colors.primary} />
          </Pressable>
          <Text className="font-bold text-xl text-primary" numberOfLines={1}>
            {group.name}
          </Text>
        </View>
        <Pressable
          disabled
          className="p-2 rounded-full opacity-60"
          accessibilityLabel="Editar grupo"
        >
          <Pencil size={20} color={colors.primary} />
        </Pressable>
      </View>

      <ScrollView
        className="flex-1 px-4 pt-6"
        contentContainerClassName="pb-32"
        showsVerticalScrollIndicator={false}
      >
        <GroupHeroCard group={group} />
        <GroupEventList upcoming={upcoming} past={past} sport={group.sport} />
      </ScrollView>

      <Pressable
        disabled
        className="absolute bottom-28 right-6 w-14 h-14 rounded-2xl bg-primary items-center justify-center shadow-xl opacity-60"
        accessibilityLabel="Criar evento"
      >
        <Plus size={28} color="#fff" />
      </Pressable>
    </SafeAreaView>
  );
}
