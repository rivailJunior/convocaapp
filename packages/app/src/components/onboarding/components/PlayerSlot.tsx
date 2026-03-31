import { Text, View } from 'react-native';

export function PlayerSlot({ variant }: { variant: 'a' | 'b' }) {
  const bg = variant === 'a' ? 'bg-primary-fixed' : 'bg-secondary-container';
  const textColor =
    variant === 'a' ? 'text-on-primary-container' : 'text-on-secondary-container';

  return (
    <View className={`flex-1 aspect-square ${bg} rounded-lg items-center justify-center`}>
      <Text className={`${textColor} text-lg`}>👤</Text>
    </View>
  );
}