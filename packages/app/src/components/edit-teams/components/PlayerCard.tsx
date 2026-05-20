import { Text, View } from 'react-native';

import type { User } from '@sportspay/shared';

type PlayerCardProps = {
  player: User;
  handle?: React.ReactNode;
};

export function PlayerCard({ player, handle }: PlayerCardProps): React.JSX.Element {
  return (
    <View className="bg-surface-container-lowest p-4 rounded-lg flex-row items-center justify-between">
      <Text
        className="text-md font-label font-medium text-on-surface flex-1 mr-2"
        numberOfLines={1}
      >
        {player.name}
      </Text>
      {handle}
    </View>
  );
}
