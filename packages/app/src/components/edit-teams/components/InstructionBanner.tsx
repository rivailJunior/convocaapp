import { Info, X } from 'lucide-react-native';
import { Pressable, Text, View } from 'react-native';

interface InstructionBannerProps {
  isVisible: boolean;
  onDismiss: () => void;
}

export function InstructionBanner({ isVisible, onDismiss }: InstructionBannerProps): React.JSX.Element | null {
  if (!isVisible) return null;

  return (
    <View className="bg-tertiary-container/20 p-4 rounded-xl flex-row items-start gap-3">
      <Info size={20} color="#005861" className="mt-0.5" />
      <Text className="flex-1 text-sm font-label font-medium text-tertiary-dim leading-tight">
        Arraste os jogadores para reorganizar os times
      </Text>
      <Pressable onPress={onDismiss} className="p-0.5">
        <X size={16} color="#005861" />
      </Pressable>
    </View>
  );
}
