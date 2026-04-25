import { CheckCircle } from 'lucide-react-native';
import { ActivityIndicator, Pressable, Text, View } from 'react-native';

interface BottomActionBarProps {
  onCancel: () => void;
  onSave: () => void;
  canSave: boolean;
  isSubmitting: boolean;
}

export function BottomActionBar({
  onCancel,
  onSave,
  canSave,
  isSubmitting,
}: BottomActionBarProps): React.JSX.Element {
  const isSaveDisabled = !canSave || isSubmitting;

  return (
    <View className="absolute bottom-0 left-0 right-0 flex-row items-center gap-3 px-4 pb-8 pt-4 bg-white rounded-t-[24px]">
      <Pressable
        disabled={isSubmitting}
        onPress={onCancel}
        className={`flex-1 items-center justify-center py-4 rounded-xl border border-outline active:scale-[0.98] ${isSubmitting ? 'opacity-60' : ''}`}
      >
        <Text className="text-sm font-semibold text-on-surface">Cancelar</Text>
      </Pressable>
      <Pressable
        disabled={isSaveDisabled}
        onPress={onSave}
        className={`flex-1 flex-row items-center justify-center gap-2 bg-primary rounded-xl py-4 active:scale-[0.98] ${isSaveDisabled ? 'opacity-60' : ''}`}
      >
        {isSubmitting ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <CheckCircle size={18} color="#fff" />
        )}
        <Text className="text-sm font-semibold text-white">
          {isSubmitting ? 'Criando...' : 'Criar Grupo'}
        </Text>
      </Pressable>
    </View>
  );
}
