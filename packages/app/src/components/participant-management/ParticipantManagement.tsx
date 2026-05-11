import { Plus, Users } from 'lucide-react-native';
import { Pressable, Text, View } from 'react-native';

import { ParticipantList } from '../participant-list';

import type { Participant } from '@sportspay/shared';

interface ParticipantManagementProps {
  participants: Participant[];
  onChangeName: (id: string, name: string) => void;
  onSaveName?: (id: string, name: string) => Promise<void>;
  onRemove: (id: string) => void;
  onAdd: () => void;
  onImport: (names: string[]) => void;
  isLoading?: boolean;
  showAddButton?: boolean;
  compact?: boolean;
  maxParticipants?: number;
  onSeeAll?: () => void;
  onSeeLess?: () => void;
}

export function ParticipantManagement({
  participants,
  onChangeName,
  onSaveName,
  onRemove,
  onAdd,
  onImport,
  isLoading = false,
  showAddButton = true,
  compact = false,
  maxParticipants,
  onSeeAll,
  onSeeLess,
}: ParticipantManagementProps): React.JSX.Element {
  const hasParticipants = participants.length > 0;

  if (compact && !hasParticipants) {
    return (
      <View className="bg-surface-container-lowest rounded-xl p-4 mb-6">
        <Pressable
          className="flex-row items-center justify-center gap-2 py-3 bg-primary rounded-xl active:scale-[0.98]"
          onPress={onAdd}
          disabled={isLoading}
        >
          <Users size={18} color="#ffffff" />
          <Text className="text-on-primary font-bold text-sm">Adicionar Participantes</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View className="mb-8">
      <View className="flex-row items-center justify-between mb-4">
        {/* <Text className="font-bold text-lg text-on-surface">
          Participantes ({participants.length})
        </Text> */}
        {showAddButton && (
          <Pressable
            className="flex-row items-center gap-1 active:scale-[0.98]"
            onPress={onAdd}
            disabled={isLoading}
          >
            <Plus size={18} color="#3f5700" />
            <Text className="text-secondary-dim font-bold text-sm">Adicionar</Text>
          </Pressable>
        )}
      </View>

      {!hasParticipants && (
        <View className="bg-surface-container-low rounded-xl p-4 mb-4">
          <Text className="text-center text-on-surface-variant text-sm">
            Nenhum participante adicionado. Toque em "Adicionar" para começar.
          </Text>
        </View>
      )}

      <ParticipantList
        participants={participants}
        onChangeName={onChangeName}
        onSaveName={onSaveName}
        onRemove={onRemove}
        onAdd={onAdd}
        onImport={onImport}
        isLoading={isLoading}
        maxParticipants={maxParticipants}
        onSeeAll={onSeeAll}
        onSeeLess={onSeeLess}
      />
    </View>
  );
}
