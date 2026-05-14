import { GripVertical } from 'lucide-react-native';
import { ScrollView, View } from 'react-native';
import { router } from 'expo-router';
import { useMemo } from 'react';

import { useEditTeams } from '@sportspay/shared';

import { saveEventTeams } from '../../services/teams';
import { PageContainer } from '../page-container';
import { EditTeamsActionBar } from './components/EditTeamsActionBar';
import { InstructionBanner } from './components/InstructionBanner';
import { PlayerCard } from './components/PlayerCard';
import { TeamSectionHeader } from './components/TeamSectionHeader';
import { useDragList } from './hooks/useDragList';

import type { TeamDrawResult, User } from '@sportspay/shared';

const ITEM_HEIGHT = 64;

type EditTeamsPageProps = {
  eventId: string;
  teams: Map<string, User[]>;
  bench?: User[];
};

const TeamHeader = ({
  name,
  item,
  onRenameTeam,
}: {
  name: string;
  item: any;
  onRenameTeam: (oldName: string, newName: string) => void;
}) => {
  return (
    <View
      key={name}
      style={{
        opacity: 1,
      }}
      className="mt-4 mb-2 flex h-16 flex-end justify-center rounded-md bg-gray-200"
    >
      <TeamSectionHeader name={name} playerCount={item.playerCount} onRename={onRenameTeam} />
    </View>
  );
};

function toTeamDrawResult(teams: Map<string, User[]>, bench: User[]): TeamDrawResult {
  const teamsArr = Array.from(teams.entries()).map(([name, players], index) => ({
    id: String(index + 1),
    name,
    players: players.map((u) => ({
      userId: u.uid,
      userName: u.name,
      avatarUrl: undefined,
      status: 'confirmed' as const,
      paymentStatus: 'pending' as const,
    })),
  }));

  return {
    teams: teamsArr,
    bench: bench.map((u) => ({
      userId: u.uid,
      userName: u.name,
      avatarUrl: undefined,
      status: 'confirmed' as const,
      paymentStatus: 'pending' as const,
    })),
    totalPlayers: teamsArr.reduce((sum, t) => sum + t.players.length, 0) + bench.length,
  };
}

export function EditTeamsPage({
  eventId,
  teams,
  bench = [],
}: EditTeamsPageProps): React.JSX.Element {
  const callbacks = useMemo(
    () => ({
      onSave: async (currentTeams: Map<string, User[]>, currentBench: User[]) => {
        try {
          const result = toTeamDrawResult(currentTeams, currentBench);
          await saveEventTeams(eventId, result);
          router.back();
        } catch (e) {
          console.error('[EditTeams] saveEventTeams failed:', e);
        }
      },
      onCancel: () => {
        router.back();
      },
    }),
    [eventId],
  );

  const { flatItems, isBannerVisible, dismissBanner, onRenameTeam, onReorder, onSave, onCancel } =
    useEditTeams(teams, bench, callbacks);

  const { dragIndex, hoverIndex, dragY, panResponders } = useDragList({
    items: flatItems,
    itemHeight: ITEM_HEIGHT,
    onReorder,
  });

  return (
    <PageContainer title="Editar Times" onBack={onCancel}>
      <View className="mt-4">
        <InstructionBanner isVisible={isBannerVisible} onDismiss={dismissBanner} />
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 12, paddingBottom: 140 }}
        scrollEnabled={dragIndex === null}
      >
        {flatItems.map((item, index) => {
          const isDragging = dragIndex === index;
          const isHovered = hoverIndex === index && dragIndex !== index;
          const translateY =
            isDragging && dragY !== null && dragIndex !== null
              ? dragY - dragIndex * ITEM_HEIGHT
              : 0;

          if (item.type === 'team-header' || item.type === 'bench-header') {
            return (
              <TeamHeader name={item?.name ?? 'Banco'} item={item} onRenameTeam={onRenameTeam} />
            );
          }

          // if (item.type === 'bench-header') {
          //   return (
          //     <TeamHeader
          //       name="Banco"
          //       item={{ playerCount: bench?.length || 0, name: 'Banco' }}
          //       onRenameTeam={onRenameTeam}
          //     />
          //   );
          // }

          return (
            <View
              key={item.id}
              className="justify-center py-2 gap-2 flex-col"
              style={{
                height: ITEM_HEIGHT,
                opacity: isHovered ? 0.4 : 1,
                zIndex: isDragging ? 99 : 1,
                transform: [{ translateY }],
              }}
            >
              <PlayerCard
                player={item.user}
                handle={
                  <View
                    hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
                    {...(panResponders[index]?.panHandlers ?? {})}
                  >
                    <GripVertical size={28} color="#abadae" />
                  </View>
                }
              />
            </View>
          );
        })}
      </ScrollView>

      <EditTeamsActionBar onSave={() => onSave()} onCancel={onCancel} />
    </PageContainer>
  );
}
