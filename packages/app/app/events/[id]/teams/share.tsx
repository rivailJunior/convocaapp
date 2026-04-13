import { useLocalSearchParams } from 'expo-router';

import type { TeamDrawResult } from '@sportspay/shared';

import { ShareTeamsPage } from '@/components/share-teams/ShareTeamsPage';

export default function ShareTeamsScreen() {
  const { eventTitle, result } = useLocalSearchParams<{
    eventTitle: string;
    result: string;
  }>();

  console.log('event title', eventTitle);
  console.log('result', result);

  const parsedResult: TeamDrawResult | null = (() => {
    try {
      return result ? (JSON.parse(result) as TeamDrawResult) : null;
    } catch {
      return null;
    }
  })();

  if (!parsedResult) {
    return null;
  }

  return <ShareTeamsPage eventTitle={eventTitle ?? ''} result={parsedResult} />;
}
