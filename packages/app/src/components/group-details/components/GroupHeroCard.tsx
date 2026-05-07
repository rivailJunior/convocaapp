import { Copy, Users } from 'lucide-react-native';
import { Pressable, Text, View } from 'react-native';
import * as ExpoClipboard from 'expo-clipboard';

import { colors } from '@sportspay/shared';

import { AvatarStack } from '../../ui/AvatarStack';

import type { GroupWithParticipants } from '@sportspay/shared';

const MAX_VISIBLE_AVATARS = 10;

interface GroupHeroCardProps {
  group: GroupWithParticipants;
  onManageParticipants?: () => void;
}

export function GroupHeroCard({
  group,
  onManageParticipants,
}: GroupHeroCardProps): React.JSX.Element {
  const memberCount = group.participants.length;

  const handleCopyPix = async () => {
    if (group.pixKey) {
      await ExpoClipboard.setStringAsync(group.pixKey);
      alert('Chave PIX copiada!');
    }
  };

  return (
    <View className="bg-surface-container-lowest rounded-xl p-6 mb-8">
      <View className="gap-2">
        <View className="flex-row items-center justify-between">
          <Text className="text-sm font-medium text-on-surface-variant">
            {memberCount > 0 ? `${memberCount} Participantes` : 'Sem participantes'}
          </Text>
          {memberCount === 0 && onManageParticipants && (
            <Pressable
              onPress={onManageParticipants}
              className="flex-row items-center gap-1 bg-primary px-3 py-2 rounded-lg active:scale-[0.98]"
            >
              <Users size={16} color="#ffffff" />
              <Text className="text-on-primary font-bold text-xs">Adicionar</Text>
            </Pressable>
          )}
        </View>
        <View accessible accessibilityLabel={`${memberCount} participantes`}>
          <AvatarStack count={memberCount} maxVisible={MAX_VISIBLE_AVATARS} />
        </View>

        {memberCount === 0 && (
          <View className="bg-surface-container-low rounded-xl p-3 mt-2">
            <Text className="text-center text-on-surface-variant text-xs">
              Adicione participantes para começar a organizar eventos
            </Text>
          </View>
        )}

        {group.pixKey && (
          <View className="mt-4 gap-4 ">
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
          </View>
        )}
      </View>
    </View>
  );
}
