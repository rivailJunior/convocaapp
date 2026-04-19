import { ArrowLeft } from 'lucide-react-native';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { TEAM_COLORS, useEditTeams } from '@sportspay/shared';


import { BenchSection } from './components/BenchSection';
import { EditTeamsActionBar } from './components/EditTeamsActionBar';
import { InstructionBanner } from './components/InstructionBanner';
import { TeamSection } from './components/TeamSection';

import type { User } from '@sportspay/shared';

interface EditTeamsPageProps {
  teams: Map<string, User[]>;
  bench?: User[];
}

export function EditTeamsPage({ teams, bench = [] }: EditTeamsPageProps): React.JSX.Element {
  const {
    teams: currentTeams,
    bench: currentBench,
    isBannerVisible,
    dismissBanner,
    onSave,
    onCancel,
  } = useEditTeams(teams, bench);

  const teamEntries = Array.from(currentTeams.entries());

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-row items-center px-4 h-14">
        <Pressable onPress={onCancel} className="p-2 rounded-full">
          <ArrowLeft size={24} color="#266829" />
        </Pressable>
        <Text className="flex-1 text-center font-headline font-bold text-xl text-primary pr-10">
          Editar Times
        </Text>
      </View>

      <ScrollView
        className="flex-1 px-4 pt-4"
        contentContainerClassName="pb-32 gap-6"
        showsVerticalScrollIndicator={false}
      >
        <InstructionBanner
          isVisible={isBannerVisible}
          onDismiss={dismissBanner}
        />

        {teamEntries.length === 0 ? (
          <View className="rounded-xl bg-surface-container-lowest p-6 items-center">
            <Text className="text-sm text-on-surface-variant font-label">
              Não há times
            </Text>
          </View>
        ) : (
          teamEntries.map(([name, players], index) => {
            const colorIndex = index % TEAM_COLORS.length;
            return (
              <TeamSection
                key={name}
                name={name}
                players={players}
                indicatorColor={TEAM_COLORS[colorIndex].indicator}
                borderColor={TEAM_COLORS[colorIndex].border}
              />
            );
          })
        )}

        <BenchSection players={currentBench} />
      </ScrollView>

      <EditTeamsActionBar onSave={onSave} onCancel={onCancel} />
    </SafeAreaView>
  );
}
