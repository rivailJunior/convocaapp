import { Text, View } from 'react-native';
import { PlayerSlot } from './PlayerSlot';

export function TeamRow({
  label,
  level,
  variant,
}: {
  label: string;
  level: string;
  variant: 'a' | 'b';
}) {
  const labelColor = variant === 'a' ? 'text-primary' : 'text-secondary';

  return (
    <View className="gap-2">
      <View className="flex-row justify-between items-center">
        <Text className={`font-bold text-xs ${labelColor}`}>{label}</Text>
        <Text className="text-[10px] text-on-surface-variant">
          Nível: {level}
        </Text>
      </View>
      <View className="flex-row gap-2">
        <PlayerSlot variant={variant} />
        <PlayerSlot variant={variant} />
        <PlayerSlot variant={variant} />
        <PlayerSlot variant={variant} />
      </View>
    </View>
  );
}