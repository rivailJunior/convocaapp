import { CheckCircle } from 'lucide-react-native';
import { Pressable, Text, View } from 'react-native';

export function BottomActionBar(): React.JSX.Element {
  return (
    <View className="absolute bottom-0 left-0 right-0 flex-row items-center gap-3 px-4 pb-8 pt-4 bg-white rounded-t-[24px]">
      <Pressable
        disabled
        className="flex-1 items-center justify-center py-4 rounded-xl border border-outline opacity-60 active:scale-[0.98]"
      >
        <Text className="text-sm font-semibold text-on-surface">
          Cancelar
        </Text>
      </Pressable>
      <Pressable
        disabled
        className="flex-1 flex-row items-center justify-center gap-2 bg-primary rounded-xl py-4 opacity-60 active:scale-[0.98]"
      >
        <CheckCircle size={18} color="#fff" />
        <Text className="text-sm font-semibold text-white">
          Criar Grupo
        </Text>
      </Pressable>
    </View>
  );
}
