import { Check } from 'lucide-react-native';
import { Pressable, Text, View } from 'react-native';

type AttendanceBottomBarProps = {
  isGenerateWithConfirmed: boolean;
  onToggleGenerate: (value: boolean) => void;
  onNavigateToTeams: () => void;
};

export function AttendanceBottomBar({
  isGenerateWithConfirmed,
  onToggleGenerate,
  onNavigateToTeams,
}: AttendanceBottomBarProps): React.JSX.Element {
  const handleToggle = (): void => {
    onToggleGenerate(!isGenerateWithConfirmed);
  };

  return (
    <View className="absolute bottom-0 left-0 right-0 px-4 pb-10 pt-4 bg-surface/95 rounded-t-3xl">
      <Pressable
        onPress={handleToggle}
        className="flex-row items-center justify-center gap-3 mb-6"
        accessibilityLabel="Gerar times com confirmados"
        accessibilityRole="checkbox"
      >
        <View
          className={`w-5 h-5 rounded items-center justify-center border ${
            isGenerateWithConfirmed
              ? 'bg-primary border-primary'
              : 'bg-surface-container-lowest border-outline'
          }`}
        >
          {isGenerateWithConfirmed && <Check size={14} color="#ffffff" strokeWidth={3} />}
        </View>
        <Text className="font-body font-semibold text-sm text-on-surface">
          Gerar times com confirmados
        </Text>
      </Pressable>

      <Pressable
        onPress={onNavigateToTeams}
        className="w-full rounded-xl bg-primary py-4 flex-row items-center justify-center gap-2 active:opacity-90"
        accessibilityLabel="Ir para Times"
      >
        <Text className="text-2xl">⚽</Text>
        <Text className="font-body font-semibold text-sm text-white">Ir para Times</Text>
      </Pressable>
    </View>
  );
}
