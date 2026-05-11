import { ClipboardList } from 'lucide-react-native';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { router } from 'expo-router';
import { useCallback, useState } from 'react';

import { useAttendanceList, useGenerateTeams } from '@sportspay/shared';

import { useEventTeams } from '../../hooks/use-event-teams';
import { useLocalEventPlayers } from '../../hooks/use-local-event-players';
import { saveEventTeams } from '../../services/teams';
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
  const {
    teams: existingTeams,
    isLoading: isLoadingTeams,
    refetch: refetchTeams,
  } = useEventTeams(eventId);
  const [isSaving, setIsSaving] = useState(false);
  const [isResultSaved, setIsResultSaved] = useState(false);

  const { mode, value, result, error, preview, canDraw, setMode, setValue, draw, redraw } =
    useGenerateTeams(players.filter((item) => item.status === 'confirmed'));

  // Prefer newly drawn result over existing teams from DB
  const displayResult = result || existingTeams;
  const hasTeams = !!existingTeams;
  const canSave = !!result && !isResultSaved && !isSaving;

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

  const handleDrawPress = () => {
    setIsResultSaved(false);
    if (result) {
      redraw();
    } else {
      draw();
    }
  };

  const handleSave = async () => {
    if (!result) return;

    try {
      setIsSaving(true);
      await saveEventTeams(eventId, result);

      // Refetch teams to update the UI
      await refetchTeams();
      setIsResultSaved(true);

      // Show success feedback (you could add a toast here)
      console.log('Times salvos com sucesso!');
    } catch (error) {
      console.error('Erro ao salvar times:', error);
      // Show error feedback (you could add a toast here)
    } finally {
      setIsSaving(false);
    }
  };

  const shouldDisble = !(canDraw ?? false);

  return (
    <PageContainer title={eventTitle || 'Gerar Times'} onBack={handleBack}>
      <ScrollView
        className="flex-1 px-4"
        contentContainerStyle={{ paddingBottom: displayResult ? 120 : 32 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="mb-6 px-1 pt-4">
          <Text className="text-on-surface-variant font-medium text-sm">
            {players.length} participantes disponíveis
          </Text>
        </View>

        {/* Show existing teams indicator */}
        {/* {hasTeams && (
          <View className="bg-primary-container/10 p-4 rounded-xl mb-6">
            <Text className="text-on-primary-container text-sm font-medium text-center">
              Times já gerados e salvos anteriormente
            </Text>
          </View>
        )} */}

        {/* Show generation controls only if no existing teams */}

        <>
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
            onPress={handleDrawPress}
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
        </>

        {error && (
          <View className="bg-error-container/10 p-4 rounded-xl mb-6">
            <Text className="text-error text-sm font-medium text-center">{error}</Text>
          </View>
        )}

        {/* Show loading state */}
        {isLoadingTeams ? (
          <View className="bg-surface-container-lowest p-6 rounded-xl mb-6 shadow-sm items-center">
            <Text className="text-on-surface-variant text-sm font-medium text-center">
              Carregando times...
            </Text>
          </View>
        ) : (
          displayResult && <DrawResultList result={displayResult} />
        )}
      </ScrollView>

      {displayResult && (
        <GenerateTeamsActionBar
          onShare={handleNavigateToShare}
          onSave={handleSave}
          saveDisabled={!canSave}
          saveLabel={
            isSaving ? 'Salvando...' : isResultSaved || (!result && hasTeams) ? 'Salvo' : 'Salvar'
          }
        />
      )}
    </PageContainer>
  );
}
