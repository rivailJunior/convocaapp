import { useLocalSearchParams } from 'expo-router';

import { GenerateTeamsPage } from '@/components/generate-teams/GenerateTeamsPage';

import type { Sport } from '@sportspay/shared';

export default function GenerateTeamsScreen() {
  const { id, eventTitle, sport } = useLocalSearchParams<{
    id: string;
    eventTitle: string;
    sport: Sport;
  }>();

  return (
    <GenerateTeamsPage
      eventId={id ?? ''}
      eventTitle={eventTitle ?? ''}
      sport={(sport as Sport) ?? 'futebol'}
    />
  );
}
