import { Pressable, Text, View } from 'react-native';
import { X, CheckCircle } from 'lucide-react-native';

export function BottomActionBar(): React.JSX.Element {
  return (
    <View className="absolute bottom-0 left-0 right-0 flex-row justify-around items-center px-6 pb-8 pt-4 bg-surface-container-lowest/80 rounded-t-3xl">
      <Pressable
        disabled
        className="items-center justify-center px-6 py-2 opacity-60"
      >
        <X size={24} color="#595c5d" />
        <Text className="text-[10px] font-bold uppercase tracking-wider mt-1 text-on-surface-variant">
          Cancelar
        </Text>
      </Pressable>
      <Pressable
        disabled
        className="flex-row items-center justify-center gap-2 bg-primary rounded-xl px-12 py-3 opacity-60"
      >
        <CheckCircle size={20} color="#fff" fill="#fff" />
        <Text className="text-sm font-bold uppercase tracking-wider text-white">
          Criar Grupo
        </Text>
      </Pressable>
    </View>
  );
}
