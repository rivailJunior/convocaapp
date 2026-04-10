import { Text, View } from 'react-native';

import type { TeamDrawResult } from '@sportspay/shared';

import { BenchCard } from './BenchCard';
import { TeamCard } from './TeamCard';

type DrawResultListProps = {
  result: TeamDrawResult;
};

const TEAM_STYLES = [
  { borderColor: 'border-primary', bgTint: 'bg-primary/5', textColor: 'text-primary' },
  { borderColor: 'border-tertiary', bgTint: 'bg-tertiary/5', textColor: 'text-tertiary' },
  { borderColor: 'border-error-container', bgTint: 'bg-error-container/5', textColor: 'text-error-container' },
  { borderColor: 'border-secondary', bgTint: 'bg-secondary/5', textColor: 'text-secondary' },
  { borderColor: 'border-blue-500', bgTint: 'bg-blue-500/5', textColor: 'text-blue-500' },
  { borderColor: 'border-purple-500', bgTint: 'bg-purple-500/5', textColor: 'text-purple-500' },
];

export function DrawResultList({ result }: DrawResultListProps): React.JSX.Element {
  return (
    <View className="gap-6">
      <Text className="font-headline font-bold text-xl px-1">
        Times Gerados
      </Text>
      {result.teams.map((team, index) => {
        const style = TEAM_STYLES[index % TEAM_STYLES.length]!;
        return (
          <TeamCard
            key={team.id}
            name={team.name}
            players={team.players}
            borderColor={style.borderColor}
            bgTint={style.bgTint}
            textColor={style.textColor}
          />
        );
      })}
      <BenchCard players={result.bench} />
    </View>
  );
}
