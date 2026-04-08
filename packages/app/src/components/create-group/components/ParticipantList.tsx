import { X, Plus, Upload } from 'lucide-react-native';
import { Pressable, Text, TextInput, View } from 'react-native';

import type { Participant } from '@sportspay/shared';

interface ParticipantListProps {
  participants: Participant[];
  onChangeName: (id: string, name: string) => void;
  onRemove: (id: string) => void;
  onAdd: () => void;
}

export function ParticipantList({
  participants,
  onChangeName,
  onRemove,
  onAdd,
}: ParticipantListProps): React.JSX.Element {
  return (
    <View className="mb-8">
      <View className="flex-row items-center justify-between mb-4">
        <Text className="font-bold text-lg text-on-surface">
          Participantes ({participants.length})
        </Text>
      </View>

      <View className="gap-3">
        {participants.map((participant) => (
          <View
            key={participant.id}
            className="flex-row items-center bg-surface-container-lowest rounded-xl p-1 pr-4 shadow-sm"
          >
            <TextInput
              className="flex-1 bg-transparent px-4 py-3 text-on-surface font-medium text-base"
              value={participant.name}
              onChangeText={(text) => onChangeName(participant.id, text)}
              placeholder="Nome do participante"
              placeholderTextColor="#757778"
            />
            <Pressable
              className="p-2 rounded-full active:bg-error-container/10"
              onPress={() => onRemove(participant.id)}
            >
              <X size={18} color="#b92902" />
            </Pressable>
          </View>
        ))}
      </View>

      <View className="mt-4 gap-3">
        <Pressable
          className="flex-row items-center justify-center gap-2 py-2 active:scale-[0.98]"
          onPress={onAdd}
        >
          <Plus size={18} color="#3f5700" />
          <Text className="text-secondary-dim font-bold text-sm">
            Adicionar participante
          </Text>
        </Pressable>
        <Pressable
          disabled
          className="flex-row items-center justify-center gap-2 border-2 border-outline-variant py-3 rounded-xl opacity-60 active:scale-[0.98]"
        >
          <Upload size={18} color="#2c2f30" />
          <Text className="text-on-surface font-bold text-sm">
            Importar lista
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
