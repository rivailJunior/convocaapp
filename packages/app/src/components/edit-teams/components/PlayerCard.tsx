import { GripVertical } from 'lucide-react-native';
import { Text, View } from 'react-native';

import type { User } from '@sportspay/shared';

interface PlayerCardProps {
  player: User;
}

export function PlayerCard({ player }: PlayerCardProps): React.JSX.Element {
  return (
    <View className="bg-surface-container-lowest p-3 rounded-lg flex-row items-center justify-between">
      <Text className="text-sm font-label font-medium text-on-surface" numberOfLines={1}>
        {player.name}
      </Text>
      <GripVertical size={18} color="#abadae" />
    </View>
  );
}
