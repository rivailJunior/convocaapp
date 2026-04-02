import * as ExpoClipboard from 'expo-clipboard';
import { Image, Pressable, Text, View } from 'react-native';

import type { GroupDisplayItem } from '@sportspay/shared';

const MAX_VISIBLE_AVATARS = 8;
const PLACEHOLDER_AVATARS = [
  'https://i.pravatar.cc/40?u=1',
  'https://i.pravatar.cc/40?u=2',
  'https://i.pravatar.cc/40?u=3',
  'https://i.pravatar.cc/40?u=4',
  'https://i.pravatar.cc/40?u=5',
  'https://i.pravatar.cc/40?u=6',
  'https://i.pravatar.cc/40?u=7',
  'https://i.pravatar.cc/40?u=8',
];

interface GroupHeroCardProps {
  group: GroupDisplayItem;
}

export function GroupHeroCard({ group }: GroupHeroCardProps): React.JSX.Element {
  const visibleAvatars = PLACEHOLDER_AVATARS.slice(
    0,
    Math.min(group.memberCount, MAX_VISIBLE_AVATARS),
  );
  const overflowCount = group.memberCount - visibleAvatars.length;

  const handleCopyPix = async () => {
    if (group.pixKey) {
      await ExpoClipboard.setStringAsync(group.pixKey);
    }
  };

  return (
    <View className="bg-surface-container-lowest rounded-xl p-6 mb-8">
      <View className="gap-6">
        <View
          className="flex-row items-center"
          accessible
          accessibilityLabel={`${group.memberCount} participantes`}
        >
          {visibleAvatars.map((uri, i) => (
            <Image
              key={`avatar-${i}`}
              source={{ uri }}
              className="w-10 h-10 rounded-full border-2 border-white"
              style={{ marginLeft: i === 0 ? 0 : -12 }}
              accessible={false}
            />
          ))}
          {overflowCount > 0 && (
            <View
              className="w-10 h-10 rounded-full bg-surface-container-high border-2 border-white items-center justify-center"
              style={{ marginLeft: -12 }}
              accessible={false}
            >
              <Text className="text-xs font-bold text-on-surface-variant">
                +{overflowCount}
              </Text>
            </View>
          )}
        </View>

        <Text className="text-sm font-medium text-on-surface-variant">
          {group.memberCount} participantes
        </Text>

        {group.pixKey && (
          <View className="flex-row items-center justify-between">
            <View className="flex-col gap-0.5">
              <Text className="text-[10px] uppercase tracking-wider font-bold text-on-surface-variant">
                Chave Pix
              </Text>
              <Text className="text-on-surface font-semibold">
                {group.pixKey}
              </Text>
            </View>
            <Pressable
              onPress={handleCopyPix}
              className="bg-surface-container-low p-2 rounded-lg active:bg-surface-container-high"
              accessibilityLabel="Copiar chave Pix"
            >
              <Text className="text-primary text-sm font-bold">Copiar</Text>
            </Pressable>
          </View>
        )}
      </View>
    </View>
  );
}
