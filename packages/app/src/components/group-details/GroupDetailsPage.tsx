import { router } from 'expo-router';
import { useCallback } from 'react';
import { ScrollView, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useGroupDetails, useGroupEvents } from '@sportspay/shared';

import { FloatingAddButton } from '../floating-add-button';
import { PageContainer } from '../page-container';

import { GroupEventList } from './components/GroupEventList';
import { GroupHeroCard } from './components/GroupHeroCard';

import { ROUTES } from '@/navigation/routes';

interface GroupDetailsPageProps {
  groupId: string;
}

export function GroupDetailsPage({ groupId }: GroupDetailsPageProps): React.JSX.Element {
  const { group } = useGroupDetails(groupId);
  const { upcoming, past } = useGroupEvents(groupId);
  const handleBack = useCallback(() => router.back(), []);

  if (!group) {
    return (
      <SafeAreaView className="flex-1 bg-surface items-center justify-center">
        <Text className="text-on-surface-variant">Grupo não encontrado.</Text>
      </SafeAreaView>
    );
  }

  return (
    <PageContainer title={group.name} onBack={handleBack}>
      <ScrollView
        className="flex-1 px-4 pt-6"
        contentContainerClassName="pb-32"
        showsVerticalScrollIndicator={false}
      >
        <GroupHeroCard group={group} />
        <GroupEventList upcoming={upcoming} past={past} sport={group.sport} />
      </ScrollView>

      <FloatingAddButton page={ROUTES.EVENT_CREATE_RECURRENT} />
    </PageContainer>
  );
}
