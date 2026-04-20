import { Text, View } from 'react-native';

import type { AttendancePlayer } from '@sportspay/shared';

type TeamCardProps = {
  name: string;
  players: AttendancePlayer[];
  bgTint: string;
  textColor: string;
};

function getInitials(name: string): string {
  const normalizedName = name.trim();
  const parts = normalizedName.split(/\s+/).filter(Boolean);

  if (parts.length >= 2) {
    return `${parts[0]![0]}${parts[parts.length - 1]![0]}`.toUpperCase();
  }

  if (parts.length === 1) {
    return parts[0]!.slice(0, 2).toUpperCase();
  }

  return '';
}

export function TeamCard({ name, players, bgTint, textColor }: TeamCardProps): React.JSX.Element {
  return (
    <View className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm border border-outline-variant/15">
      <View className={`p-4 flex-row justify-between items-center ${bgTint}`}>
        <Text className={`font-headline font-bold ${textColor}`}>
          {name}
        </Text>
        <View className={`px-2 py-1 rounded-full ${bgTint}`}>
          <Text className={`text-[10px] font-bold uppercase ${textColor}`}>
            {players.length} {players.length === 1 ? 'Jogador' : 'Jogadores'}
          </Text>
        </View>
      </View>
      <View className="p-4 gap-3">
        {players.map((player) => (
          <View key={player.userId} className="flex-row items-center gap-3">
            <View className={`w-8 h-8 rounded-full items-center justify-center ${bgTint}`}>
              <Text className={`text-xs font-bold ${textColor}`}>
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
