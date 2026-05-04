import { User } from 'lucide-react-native';
import { Text, View } from 'react-native';

const SIZE_CONFIG = {
  sm: {
    container: 'w-6 h-6',
    iconSize: 12,
    overlap: -8,
    overflowText: 'text-[8px]',
    overflowContainer: 'w-6 h-6',
  },
  md: {
    container: 'w-10 h-10',
    iconSize: 18,
    overlap: -12,
    overflowText: 'text-xs',
    overflowContainer: 'w-10 h-10',
  },
} as const;

type AvatarSize = keyof typeof SIZE_CONFIG;

interface AvatarStackProps {
  count: number;
  maxVisible?: number;
  size?: AvatarSize;
  avatarColor?: string;
}

export function AvatarStack({
  count,
  maxVisible = 10,
  size = 'md',
  avatarColor = '#33691E',
}: AvatarStackProps): React.JSX.Element {
  const config = SIZE_CONFIG[size];
  const visibleCount = Math.min(count, maxVisible);
  const overflowCount = count - visibleCount;

  return (
    <View className="flex-row items-center">
      {Array.from({ length: visibleCount }).map((_, i) => (
        <View
          key={`avatar-${i}`}
          className={`${config.container} rounded-full border-2 border-white items-center justify-center`}
          style={{ marginLeft: i === 0 ? 0 : config.overlap, backgroundColor: avatarColor }}
          accessible={false}
        >
          <User size={config.iconSize} color="white" />
        </View>
      ))}
      {overflowCount > 0 && (
        <View
          className={`${config.overflowContainer} rounded-full bg-surface-container-high border-2 border-white items-center justify-center`}
          style={{ marginLeft: config.overlap }}
          accessible={false}
        >
          <Text className={`${config.overflowText} font-bold text-on-surface-variant`}>
            +{overflowCount}
          </Text>
        </View>
      )}
    </View>
  );
}
