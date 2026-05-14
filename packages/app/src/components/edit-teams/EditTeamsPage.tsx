import { ArrowLeft, GripVertical } from 'lucide-react-native';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useMemo } from 'react';



import { useEditTeams } from '@sportspay/shared';



import { saveEventTeams } from '../../services/teams';
import { BenchSectionHeader } from './components/BenchSectionHeader';
import { EditTeamsActionBar } from './components/EditTeamsActionBar';
import { InstructionBanner } from './components/InstructionBanner';
import { PlayerCard } from './components/PlayerCard';
import { TeamSectionHeader } from './components/TeamSectionHeader';
import { useDragList } from './hooks/useDragList';



import type { DragListItem, TeamDrawResult, User } from '@sportspay/shared';


const ITEM_HEIGHT = 64;

type EditTeamsPageProps = {
  eventId: string;
  teams: Map<string, User[]>;
  bench?: User[];
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
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-row items-center px-4 h-14">
        <View className="p-2 rounded-full" onTouchEnd={onCancel}>
          <ArrowLeft size={24} color="#266829" />
        </View>
        <Text className="flex-1 text-center font-headline font-bold text-xl text-primary pr-10">
          Editar Times
        </Text>
      </View>

      <InstructionBanner isVisible={isBannerVisible} onDismiss={dismissBanner} />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 16, paddingBottom: 140 }}
        scrollEnabled={dragIndex === null}
      >
        {flatItems.map((item, index) => {
          const isDragging = dragIndex === index;
          const isHovered = hoverIndex === index && dragIndex !== index;
          const translateY =
            isDragging && dragY !== null && dragIndex !== null
              ? dragY - dragIndex * ITEM_HEIGHT
              : 0;

          if (item.type === 'team-header') {
            return (
              <View
                key={item.id}
                style={{
                  height: ITEM_HEIGHT,
                  justifyContent: 'flex-end',
                  paddingBottom: 4,
                  opacity: isHovered ? 0.4 : 1,
                }}
              >
                <TeamSectionHeader
                  name={item.name}
                  playerCount={item.playerCount}
                  colorIndex={item.colorIndex}
                  onRename={onRenameTeam}
                />
              </View>
            );
          }

          if (item.type === 'bench-header') {
            return (
              <View
                key={item.id}
                style={{
                  height: ITEM_HEIGHT,
                  justifyContent: 'flex-end',
                  paddingBottom: 4,
                  opacity: isHovered ? 0.4 : 1,
                }}
              >
                <BenchSectionHeader />
              </View>
            );
          }

          return (
            <View
              key={item.id}
              style={{
                height: ITEM_HEIGHT,
                justifyContent: 'center',
                paddingVertical: 4,
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
                    <GripVertical size={18} color="#abadae" />
                  </View>
                }
              />
            </View>
          );
        })}
      </ScrollView>

      <EditTeamsActionBar onSave={() => onSave()} onCancel={onCancel} />
    </SafeAreaView>
  );
}
