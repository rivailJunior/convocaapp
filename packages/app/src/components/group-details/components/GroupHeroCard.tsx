import { Copy, User } from 'lucide-react-native';
import { Pressable, Text, View } from 'react-native';
import * as ExpoClipboard from 'expo-clipboard';

import { colors } from '@sportspay/shared';

import type { GroupWithParticipants } from '../../../services/database/entities/group/group';

const MAX_VISIBLE_AVATARS = 8;

const AVATAR_COLORS = [
  { bg: '#DCE775', icon: '#33691E' },
  { bg: '#81D4FA', icon: '#01579B' },
  { bg: '#F48FB1', icon: '#880E4F' },
  { bg: '#CE93D8', icon: '#4A148C' },
  { bg: '#FFCC80', icon: '#E65100' },
  { bg: '#80CBC4', icon: '#004D40' },
  { bg: '#EF9A9A', icon: '#B71C1C' },
  { bg: '#A5D6A7', icon: '#1B5E20' },
];

interface GroupHeroCardProps {
  group: GroupWithParticipants;
}

export function GroupHeroCard({ group }: GroupHeroCardProps): React.JSX.Element {
  const memberCount = group.participants.length;
  const visibleParticipants = group.participants.slice(0, MAX_VISIBLE_AVATARS);
  const overflowCount = memberCount - visibleParticipants.length;

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
          accessibilityLabel={`${memberCount} participantes`}
        >
          {visibleParticipants.map((participant, i) => {
            const palette = AVATAR_COLORS[i % AVATAR_COLORS.length];
            return (
              <View
                key={participant.id}
                className="w-10 h-10 rounded-full border-2 border-white items-center justify-center"
                style={{ marginLeft: i === 0 ? 0 : -12, backgroundColor: palette.bg }}
                accessible={false}
              >
                <User size={18} color={palette.icon} />
              </View>
            );
          })}
          {overflowCount > 0 && (
            <View
              className="w-10 h-10 rounded-full bg-surface-container-high border-2 border-white items-center justify-center"
              style={{ marginLeft: -12 }}
              accessible={false}
            >
              <Text className="text-xs font-bold text-on-surface-variant">+{overflowCount}</Text>
            </View>
          )}
        </View>

        <Text className="text-sm font-medium text-on-surface-variant">
          {memberCount} participantes
        </Text>

        {group.pixKey && (
          <>
            <View className="h-px bg-surface-container-high" />
            <View className="flex-row items-center justify-between">
              <View className="flex-col gap-0.5">
                <Text className="text-[10px] uppercase tracking-wider font-bold text-on-surface-variant">
                  Chave Pix
                </Text>
                <Text className="text-on-surface font-semibold">{group.pixKey}</Text>
              </View>
              <Pressable
                onPress={handleCopyPix}
                className="bg-surface-container-low p-3 rounded-xl active:bg-surface-container-high"
                accessibilityLabel="Copiar chave Pix"
              >
                <Copy size={18} color={colors.primary} />
              </Pressable>
            </View>
          </>
        )}
      </View>
    </View>
  );
}
