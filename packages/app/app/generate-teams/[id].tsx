import { useLocalSearchParams } from 'expo-router';

import type { Sport } from '@sportspay/shared';

import { GenerateTeamsPage } from '@/components/generate-teams/GenerateTeamsPage';


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
