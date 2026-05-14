import { GripVertical } from 'lucide-react-native';
import { ScrollView, View } from 'react-native';
import { router } from 'expo-router';
import { useMemo } from 'react';

import { useEditTeams } from '@sportspay/shared';

import { saveEventTeams } from '../../services/teams';
import { toTeamDrawResult } from '../../utils/edit-teams';
import { PageContainer } from '../page-container';
import { EditTeamsActionBar } from './components/EditTeamsActionBar';
import { InstructionBanner } from './components/InstructionBanner';
import { PlayerCard } from './components/PlayerCard';
import { TeamSectionHeader } from './components/TeamSectionHeader';
import { useDragList } from './hooks/useDragList';

import type { DragListItem, User } from '@sportspay/shared';

const ITEM_HEIGHT = 64;

type EditTeamsPageProps = {
  eventId: string;
  teams: Map<string, User[]>;
  bench?: User[];
};

const TeamHeaderRow = ({
  name,
  item,
  onRenameTeam,
}: {
  name: string;
  item: DragListItem;
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
      <TeamSectionHeader name={name} playerCount={item.playerCount || 0} onRename={onRenameTeam} />
    </View>
  );
};

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
              <TeamHeaderRow
                key={item.id}
                name={item?.name ?? 'Banco'}
                item={item}
                onRenameTeam={onRenameTeam}
              />
            );
          }
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
