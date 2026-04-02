import { Save, X } from 'lucide-react-native';
import { Pressable, Text, View } from 'react-native';

interface EditTeamsActionBarProps {
  onSave: () => void;
  onCancel: () => void;
}

export function EditTeamsActionBar({ onSave, onCancel }: EditTeamsActionBarProps): React.JSX.Element {
  return (
    <View className="absolute bottom-0 left-0 right-0 flex-row justify-around items-center px-6 pb-8 pt-4 bg-surface-container-lowest/80 rounded-t-3xl">
      <Pressable onPress={onCancel} className="items-center justify-center px-6 py-3">
        <X size={24} color="#595c5d" />
        <Text className="text-[10px] font-bold uppercase tracking-wider mt-1 text-on-surface-variant font-label">
          Cancelar
        </Text>
      </Pressable>
      <Pressable
        onPress={onSave}
        className="items-center justify-center bg-primary rounded-xl px-10 py-3"
      >
        <Save size={20} color="#fff" />
        <Text className="text-[10px] font-bold uppercase tracking-wider mt-1 text-white font-label">
          Salvar Alterações
        </Text>
      </Pressable>
    </View>
  );
}
