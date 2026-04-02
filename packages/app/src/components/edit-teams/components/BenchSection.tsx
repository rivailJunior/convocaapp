import { Text, View } from 'react-native';

import { BENCH_COLORS } from '@sportspay/shared';

import type { User } from '@sportspay/shared';

import { PlayerCard } from './PlayerCard';

interface BenchSectionProps {
  players: User[];
}

export function BenchSection({ players }: BenchSectionProps): React.JSX.Element {
  return (
    <View className="gap-3 pb-8">
      <View className="flex-row items-center gap-2">
        <View className={`w-1.5 h-6 rounded-full ${BENCH_COLORS.indicator}`} />
        <Text className="font-headline font-bold text-lg text-on-background">
          Banco
        </Text>
      </View>
      <View className={`p-4 border-2 border-dashed rounded-xl bg-surface-container-low min-h-[80px] flex-row flex-wrap gap-3 ${BENCH_COLORS.border}`}>
        {players.map((player) => (
          <View key={player.uid} className="w-[47%]">
            <PlayerCard player={player} />
          </View>
        ))}
        {players.length === 0 && (
          <Text className="text-sm text-on-surface-variant font-label">
            Nenhum jogador no banco
          </Text>
        )}
      </View>
    </View>
  );
}
