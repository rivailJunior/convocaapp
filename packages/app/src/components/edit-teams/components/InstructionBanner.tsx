import { Info, X } from 'lucide-react-native';
import { Pressable, Text, View } from 'react-native';

interface InstructionBannerProps {
  isVisible: boolean;
  onDismiss: () => void;
}

export function InstructionBanner({
  isVisible,
  onDismiss,
}: InstructionBannerProps): React.JSX.Element | null {
  if (!isVisible) return null;

  return (
    <View className="bg-tertiary-container/20 p-6 rounded-lg flex-row items-start gap-3 mx-4">
      <Info size={20} color="#005861" className="mt-0.5" />
      <View className="flex-1 flex-col justify-between min-h-[60px]">
        <Text className="flex-1 text-md font-label font-semibold text-tertiary-dim leading-tight">
          Arraste os jogadores para reorganizar os times ou edite o nome do time.
        </Text>
        <Text className="text-sm text-tertiary-dim">
          Feche esta mensagem para habilitar a edição.
        </Text>
      </View>
      <Pressable onPress={onDismiss} className="p-0.5">
        <X size={16} color="#005861" />
      </Pressable>
    </View>
  );
}
