import { Text, View } from 'react-native';

import type { User } from '@sportspay/shared';

import { PlayerCard } from './PlayerCard';

interface TeamSectionProps {
  name: string;
  players: User[];
  indicatorColor: string;
  borderColor: string;
}

export function TeamSection({ name, players, indicatorColor, borderColor }: TeamSectionProps): React.JSX.Element {
  return (
    <View className="gap-3">
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center gap-2">
          <View className={`w-1.5 h-6 rounded-full ${indicatorColor}`} />
          <Text className="font-headline font-bold text-lg text-on-background">
            {name}
          </Text>
        </View>
        <View className="bg-surface-container-high px-2 py-1 rounded-md">
          <Text className="text-[10px] font-bold text-on-surface-variant">
            {players.length}
          </Text>
        </View>
      </View>
      <View className={`p-4 border-2 border-dashed rounded-xl bg-surface-container-low min-h-[120px] flex-row flex-wrap gap-3 ${borderColor}`}>
        {players.map((player) => (
          <View key={player.uid} className="w-[47%]">
            <PlayerCard player={player} />
          </View>
        ))}
      </View>
    </View>
  );
}
