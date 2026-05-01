import { ClipboardList } from 'lucide-react-native';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { router } from 'expo-router';
import { useCallback } from 'react';

import { useAttendanceList, useGenerateTeams } from '@sportspay/shared';

import { useLocalEventPlayers } from '../../hooks/use-local-event-players';
import { PageContainer } from '../page-container';
import { DrawButton } from './components/DrawButton';
import { DrawInput } from './components/DrawInput';
import { DrawResultList } from './components/DrawResultList';
import { GenerateTeamsActionBar } from './components/GenerateTeamsActionBar';
import { ModeSelector } from './components/ModeSelector';

import type { Sport } from '@sportspay/shared';

type GenerateTeamsPageProps = {
  eventId: string;
  eventTitle: string;
  sport: Sport;
};

export function GenerateTeamsPage({
  eventId,
  eventTitle,
}: GenerateTeamsPageProps): React.JSX.Element {
  const { players } = useLocalEventPlayers(eventId);
  const { counts } = useAttendanceList(players);

  const { mode, value, result, error, preview, canDraw, setMode, setValue, draw, redraw } =
    useGenerateTeams(players);

  const hasUnconfirmedAttendances = counts.all > 0 && counts.confirmed < counts.all;

  const handleBack = useCallback(() => {
    try {
      router.back();
    } catch (error) {
      console.warn('Navigation error:', error);
    }
  }, []);

  const handleNavigateToShare = () => {
    if (!result) return;

    router.push({
      pathname: '/events/[id]/teams/share',
      params: {
        id: eventId,
        eventTitle,
        result: JSON.stringify(result),
      },
    });
  };

  const handleNavigateToAttendance = () => {
    router.push({
      pathname: '/events/[id]/attendance',
      params: { id: eventId },
    });
  };

  const handleSave = () => {
    // TODO: implement save logic — POST /api/events/[id]/teams
  };

  const shouldDisble = !(canDraw ?? false);

  return (
    <PageContainer title={eventTitle || 'Gerar Times'} onBack={handleBack}>
      <ScrollView
        className="flex-1 px-4"
        contentContainerStyle={{ paddingBottom: result ? 120 : 32 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="mb-6 px-1 pt-4">
          <Text className="text-on-surface-variant font-medium text-sm">
            {players.length} participantes disponíveis
          </Text>
        </View>

        <ModeSelector selected={mode} onSelect={setMode} />

        <DrawInput mode={mode} value={value} preview={preview} onChangeValue={setValue} />

        {hasUnconfirmedAttendances && (
          <Pressable
            onPress={handleNavigateToAttendance}
            className="w-full py-4 rounded-xl items-center justify-center mb-4 bg-surface-container-low flex-row gap-2"
          >
            <ClipboardList size={20} color="#266829" />
            <Text className="font-headline font-bold text-sm text-primary">
              Lista de Presença ({counts.confirmed}/{counts.all})
            </Text>
          </Pressable>
        )}

        <DrawButton
          disabled={shouldDisble}
          onPress={result ? redraw : draw}
          label={result ? 'Refazer Sorteio' : 'Sortear'}
        />

        {mode === 'manual' && (
          <View className="bg-surface-container-lowest p-6 rounded-xl mb-6 shadow-sm items-center">
            <Text className="text-on-surface-variant text-sm font-medium text-center">
              Os times serão gerados aleatoriamente. Depois, você poderá reorganizar os jogadores
              entre os times.
            </Text>
          </View>
        )}

        {error && (
          <View className="bg-error-container/10 p-4 rounded-xl mb-6">
            <Text className="text-error text-sm font-medium text-center">{error}</Text>
          </View>
        )}

        {result && <DrawResultList result={result} />}
      </ScrollView>

      {result && <GenerateTeamsActionBar onShare={handleNavigateToShare} onSave={handleSave} />}
    </PageContainer>
  );
}
