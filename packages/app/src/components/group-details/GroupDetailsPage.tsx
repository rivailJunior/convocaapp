import { router } from 'expo-router';
import { ChevronLeft, Pencil, Plus } from 'lucide-react-native';
import { Pressable, ScrollView, Text, View } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import { useGroupDetails, useGroupEvents } from '@sportspay/shared';

import { GroupEventList } from './components/GroupEventList';
import { GroupHeroCard } from './components/GroupHeroCard';
import { ROUTES } from '@/navigation/routes';
import { PageContainer } from '../page-container';
import { FloatingAddButton } from '../floating-add-button';

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
    <PageContainer title={group.name} onBack={() => router.back()}>
      <ScrollView
        className="flex-1 px-4 pt-6"
        contentContainerClassName="pb-32"
        showsVerticalScrollIndicator={false}
      >
        <GroupHeroCard group={group} />
        <GroupEventList upcoming={upcoming} past={past} sport={group.sport} />
      </ScrollView>

      <FloatingAddButton page={ROUTES.EVENT_CREATE_RECURRENT as string} />
    </PageContainer>
  );
}
