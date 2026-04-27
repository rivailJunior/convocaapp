import { ScrollView, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ROUTES } from '@/navigation/routes';
import { useCallback, useEffect, useState } from 'react';



import { useGroupEvents } from '@sportspay/shared';

import { useLocalGroups } from '../../hooks/use-local-groups';
import { FloatingAddButton } from '../floating-add-button';
import { PageContainer } from '../page-container';
import { GroupEventList } from './components/GroupEventList';
import { GroupHeroCard } from './components/GroupHeroCard';

import type { GroupWithParticipants } from '@sportspay/shared';


interface GroupDetailsPageProps {
  groupId: number;
}

export function GroupDetailsPage({ groupId }: GroupDetailsPageProps): React.JSX.Element {
  const { getSingleGroup } = useLocalGroups();

  const [group, setGroup] = useState<GroupWithParticipants | null>(null);

  useEffect(() => {
    getSingleGroup(groupId).then(setGroup);
  }, [groupId, getSingleGroup]);

  const { upcoming, past } = useGroupEvents(groupId.toString());
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
