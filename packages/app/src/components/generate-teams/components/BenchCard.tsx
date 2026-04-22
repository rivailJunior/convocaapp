import { Text, View } from 'react-native';

import type { AttendancePlayer } from '@sportspay/shared';

type BenchCardProps = {
  players: AttendancePlayer[];
};

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);

  if (parts.length >= 2) {
    return `${parts[0]![0]}${parts[parts.length - 1]![0]}`.toUpperCase();
  }

  if (parts.length === 1) {
    return parts[0]!.slice(0, 2).toUpperCase();
  }

  return '';
}

export function BenchCard({ players }: BenchCardProps): React.JSX.Element | null {
  if (players.length === 0) return null;

  return (
    <View className="bg-surface-container rounded-xl overflow-hidden shadow-sm border border-outline-variant/15">
      <View className="p-3 bg-surface-container-high flex-row justify-between items-center">
        <Text className="font-headline font-bold text-sm text-on-surface-variant">
          Banco
        </Text>
        <Text className="text-[10px] font-bold text-on-surface-variant uppercase">
          {players.length} {players.length === 1 ? 'Jogador' : 'Jogadores'}
        </Text>
      </View>
      <View className="p-4 gap-3">
        {players.map((player) => (
          <View key={player.userId} className="flex-row items-center gap-3">
            <View className="w-8 h-8 bg-outline-variant/20 rounded-full items-center justify-center">
              <Text className="text-xs font-bold text-on-surface-variant">
                {getInitials(player.userName)}
              </Text>
            </View>
            <Text className="text-sm font-medium text-on-surface">
              {player.userName}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}
