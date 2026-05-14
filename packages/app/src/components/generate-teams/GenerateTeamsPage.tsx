import { ClipboardList } from 'lucide-react-native';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { router, useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';

import { useAttendanceList, useGenerateTeams } from '@sportspay/shared';

import { useEventTeams } from '../../hooks/use-event-teams';
import { useLocalEventPlayers } from '../../hooks/use-local-event-players';
import { saveEventTeams } from '../../services/teams';
import { setPendingTeams } from '../../stores/teams-transfer';
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

  const { mode, value, result, error, preview, canDraw, setMode, setValue, draw, redraw, reset } =
    useGenerateTeams(players.filter((item) => item.status === 'confirmed'));

  // Prefer newly drawn result over existing teams from DB
  const displayResult = result || existingTeams;
  const hasTeams = !!existingTeams;
  const canSave = !!result && !isResultSaved && !isSaving;

  const hasUnconfirmedAttendances = counts.all > 0 && counts.confirmed < counts.all;

  useFocusEffect(
    useCallback(() => {
      refetchTeams();
      reset();
    }, [refetchTeams, reset]),
  );

  const handleBack = useCallback(() => {
    try {
      router.back();
    } catch (error) {
      console.warn('Navigation error:', error);
    }
  }, []);

  const handleNavigateToShare = () => {
    const source = result || existingTeams;
    if (!source) return;

    router.push({
      pathname: '/events/[id]/teams/share',
      params: {
        id: eventId,
        eventTitle,
        result: JSON.stringify(source),
      },
    });
  };

  const handleNavigateToEdit = () => {
    const source = result || existingTeams;
    if (!source) return;

    setPendingTeams(source);
    router.push({
      pathname: '/events/[id]/teams/edit',
      params: { id: eventId },
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
      alert('Times salvos com sucesso!');
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
        <View className="mb-4 px-1 pt-4">
          {hasUnconfirmedAttendances && (
            <Pressable
              onPress={handleNavigateToAttendance}
              className="w-full py-4 rounded-xl items-center justify-center mb-4 bg-primary flex-row gap-2"
            >
              <ClipboardList size={20} color="#266829" />
              <Text className="font-headline font-bold text-sm text-white">
                Lista de Confirmados ({counts.confirmed} de {counts.all})
              </Text>
            </Pressable>
          )}
        </View>

        <>
          <ModeSelector selected={mode} onSelect={setMode} />

          <DrawInput mode={mode} value={value} preview={preview} onChangeValue={setValue}>
            <DrawButton
              disabled={shouldDisble}
              onPress={handleDrawPress}
              label={result ? 'Refazer Sorteio' : 'Sortear'}
            />
          </DrawInput>
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
          onEdit={handleNavigateToEdit}
          saveDisabled={!canSave}
          saveLabel={
            isSaving ? 'Salvando...' : isResultSaved || (!result && hasTeams) ? 'Salvo' : 'Salvar'
          }
        />
      )}
    </PageContainer>
  );
}
