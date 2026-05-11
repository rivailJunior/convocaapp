import { ScrollView, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useFocusEffect } from 'expo-router';
import { ROUTES } from '@/navigation/routes';
import { useCallback, useEffect, useState } from 'react';

import { useLocalGroupEvents } from '../../hooks/use-local-group-events';
import { useLocalGroups } from '../../hooks/use-local-groups';
import { useManageGroupParticipants } from '../../hooks/use-manage-group-participants';
import { FloatingAddButton } from '../floating-add-button';
import { PageContainer } from '../page-container';
import { ParticipantManagement } from '../participant-management';
import { GroupEventList } from './components/GroupEventList';
import { GroupHeroCard } from './components/GroupHeroCard';

import type { GroupWithParticipants } from '@sportspay/shared';

const MAX_COMPACT_PARTICIPANTS = 5;

interface GroupDetailsPageProps {
  groupId: number;
}

export function GroupDetailsPage({ groupId }: GroupDetailsPageProps): React.JSX.Element {
  const { getSingleGroup } = useLocalGroups();

  const [group, setGroup] = useState<GroupWithParticipants | null>(null);
  const [showParticipantManagement, setShowParticipantManagement] = useState(false);
  const [showAllParticipants, setShowAllParticipants] = useState(false);

  useEffect(() => {
    getSingleGroup(groupId).then(setGroup);
  }, [groupId, getSingleGroup]);

  const { upcoming, past, refetch } = useLocalGroupEvents(groupId);
  const {
    participants,
    isLoading: participantsLoading,
    addParticipant,
    removeParticipant,
    updateParticipantName,
    saveParticipantName,
    importParticipants,
    refetch: refetchParticipants,
  } = useManageGroupParticipants(groupId);

  useFocusEffect(
    useCallback(() => {
      refetch();
      refetchParticipants();
    }, [refetch, refetchParticipants]),
  );

  const handleBack = useCallback(() => router.back(), []);
  const handleAddParticipant = useCallback(() => {
    setShowParticipantManagement(true);
  }, []);

  const handleAddNewParticipant = useCallback(async () => {
    await addParticipant(''); // Add empty participant that user can edit
  }, [addParticipant]);

  const handleSeeAllParticipants = useCallback(() => {
    setShowAllParticipants(true);
  }, []);

  const handleSeeLessParticipants = useCallback(() => {
    setShowAllParticipants(false);
  }, []);

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
        <GroupHeroCard group={group} onManageParticipants={handleAddParticipant} />

        <ParticipantManagement
          participants={participants}
          onChangeName={updateParticipantName}
          onSaveName={saveParticipantName}
          onRemove={removeParticipant}
          onAdd={handleAddNewParticipant}
          onImport={importParticipants}
          isLoading={participantsLoading}
          showAddButton={showParticipantManagement}
          compact={!showParticipantManagement}
          maxParticipants={showAllParticipants ? undefined : MAX_COMPACT_PARTICIPANTS}
          onSeeAll={
            !showAllParticipants && participants.length > MAX_COMPACT_PARTICIPANTS
              ? handleSeeAllParticipants
              : undefined
          }
          onSeeLess={
            showAllParticipants && participants.length > MAX_COMPACT_PARTICIPANTS
              ? handleSeeLessParticipants
              : undefined
          }
        />

        <GroupEventList upcoming={upcoming} past={past} sport={group.sport} />
      </ScrollView>

      <FloatingAddButton page={`${ROUTES.EVENT_CREATE_RECURRENT}?groupId=${groupId}` as never} />
    </PageContainer>
  );
}
