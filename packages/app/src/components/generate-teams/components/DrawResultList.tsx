import { Text, View } from 'react-native';

import { BenchCard } from './BenchCard';
import { TeamCard } from './TeamCard';

import type { TeamDrawResult } from '@sportspay/shared';

type DrawResultListProps = {
  result: TeamDrawResult;
};

const TEAM_STYLES = [
  { bgTint: 'bg-primary/20', textColor: 'text-white' },
  { bgTint: 'bg-tertiary/20', textColor: 'text-white' },
  { bgTint: 'bg-error-container/20', textColor: 'text-white' },
  { bgTint: 'bg-secondary/20', textColor: 'text-white' },
  { bgTint: 'bg-blue-500/20', textColor: 'text-white' },
  { bgTint: 'bg-purple-500/20', textColor: 'text-white' },
];

export function DrawResultList({ result }: DrawResultListProps): React.JSX.Element {
  return (
    <View className="gap-2">
      <Text className="font-headline font-bold text-xl px-1">Times Gerados</Text>
      {result.teams.map((team, index) => {
        const style = TEAM_STYLES[index % TEAM_STYLES.length]!;
        return (
          <TeamCard
            key={team.id}
            name={team.name}
            players={team.players}
            bgTint={style.bgTint}
            textColor={style.textColor}
          />
        );
      })}
      <BenchCard players={result.bench} />
    </View>
  );
}
