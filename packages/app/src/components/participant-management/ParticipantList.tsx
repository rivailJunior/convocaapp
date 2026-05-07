import { Plus, Upload, X } from 'lucide-react-native';
import { Pressable, Text, TextInput, View } from 'react-native';
import { useState } from 'react';

import { ImportListModal } from './ImportListModal';

import type { Participant } from '@sportspay/shared';

interface ParticipantListProps {
  participants: Participant[];
  onChangeName: (id: string, name: string) => void;
  onRemove: (id: string) => void;
  onAdd: () => void;
  onImport: (names: string[]) => void;
  isLoading?: boolean;
  maxParticipants?: number;
  onSeeAll?: () => void;
  onSeeLess?: () => void;
}

export function ParticipantList({
  participants,
  onChangeName,
  onRemove,
  onAdd,
  onImport,
  isLoading = false,
  maxParticipants,
  onSeeAll,
  onSeeLess,
}: ParticipantListProps): React.JSX.Element {
  const [isImportModalVisible, setIsImportModalVisible] = useState(false);

  const displayedParticipants = maxParticipants
    ? participants.slice(0, maxParticipants)
    : participants;
  const hasMoreParticipants = maxParticipants ? participants.length > maxParticipants : false;

  return (
    <View className="gap-3">
      {displayedParticipants.map((participant) => (
        <View
          key={participant.id}
          className="flex-row items-center bg-surface-container-lowest rounded-xl p-1 pr-4 shadow-sm"
        >
          <TextInput
            className="flex-1 bg-transparent p-4 text-on-surface font-medium"
            value={participant.name}
            onChangeText={(text) => onChangeName(participant.id, text)}
            placeholder="Nome do participante"
            placeholderTextColor="#757778"
            editable={!isLoading}
          />
          <Pressable
            className="p-2 rounded-full active:bg-error-container/10"
            onPress={() => onRemove(participant.id)}
            disabled={isLoading}
          >
            <X size={18} color="#b92902" />
          </Pressable>
        </View>
      ))}

      {hasMoreParticipants && onSeeAll && (
        <Pressable
          className="flex-row items-center justify-center gap-2 py-2 active:scale-[0.98]"
          onPress={onSeeAll}
          disabled={isLoading}
        >
          <Text className="text-primary font-bold text-sm">Ver todos ({participants.length})</Text>
        </Pressable>
      )}

      {!maxParticipants && onSeeLess && participants.length > 5 && (
        <Pressable
          className="flex-row items-center justify-center gap-2 py-2 active:scale-[0.98]"
          onPress={onSeeLess}
          disabled={isLoading}
        >
          <Text className="text-primary font-bold text-sm">Ver menos</Text>
        </Pressable>
      )}

      <View className="mt-4 gap-3">
        <Pressable
          className="flex-row items-center justify-center gap-2 py-2 active:scale-[0.98]"
          onPress={onAdd}
          disabled={isLoading}
        >
          <Plus size={18} color="#3f5700" />
          <Text className="text-secondary-dim font-bold text-sm">Adicionar participante</Text>
        </Pressable>
        <Pressable
          className="flex-row items-center justify-center gap-2 border-2 border-outline-variant py-3 rounded-xl active:scale-[0.98]"
          onPress={() => setIsImportModalVisible(true)}
          disabled={isLoading}
        >
          <Upload size={18} color="#2c2f30" />
          <Text className="text-on-surface font-bold text-sm">Importar lista</Text>
        </Pressable>
      </View>

      <ImportListModal
        visible={isImportModalVisible}
        onClose={() => setIsImportModalVisible(false)}
        onImport={onImport}
      />
    </View>
  );
}
