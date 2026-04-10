import { router } from 'expo-router';
import { useCallback } from 'react';
import { ScrollView, Text, View } from 'react-native';

import { useEventPlayers, useGenerateTeams } from '@sportspay/shared';

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

export function GenerateTeamsPage({ eventId, eventTitle, sport }: GenerateTeamsPageProps): React.JSX.Element {
  const { players } = useEventPlayers(eventId);

  const {
    mode,
    value,
    result,
    error,
    preview,
    canDraw,
    setMode,
    setValue,
    draw,
    redraw,
  } = useGenerateTeams(players);


  const handleBack = useCallback(() => {
    try {
      router.back();
    } catch (error) {
      console.warn('Navigation error:', error);
    }
  }, []);

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

        <DrawInput
          mode={mode}
          value={value}
          preview={preview}
          onChangeValue={setValue}
        />

        <DrawButton disabled={shouldDisble} onPress={draw} />

        {mode === 'manual' && (
          <View className="bg-surface-container-lowest p-6 rounded-xl mb-6 shadow-sm items-center">
            <Text className="text-on-surface-variant text-sm font-medium text-center">
              Os times serão gerados aleatoriamente. Depois, você poderá
              reorganizar os jogadores entre os times.
            </Text>
          </View>
        )}

        {error && (
          <View className="bg-error-container/10 p-4 rounded-xl mb-6">
            <Text className="text-error text-sm font-medium text-center">
              {error}
            </Text>
          </View>
        )}

        {result && <DrawResultList result={result} />}
      </ScrollView>

      {result && (
        <GenerateTeamsActionBar onRedraw={redraw} onSave={handleSave} />
      )}
    </PageContainer>
  );
}
