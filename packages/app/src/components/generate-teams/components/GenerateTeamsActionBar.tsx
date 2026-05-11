import { Save, Share2 } from 'lucide-react-native';
import { Pressable, Text, View } from 'react-native';

type GenerateTeamsActionBarProps = {
  onShare: () => void;
  onSave: () => void;
  saveDisabled?: boolean;
  saveLabel?: string;
};

export function GenerateTeamsActionBar({
  onShare,
  onSave,
  saveDisabled = false,
  saveLabel = 'Salvar Times',
}: GenerateTeamsActionBarProps): React.JSX.Element {
  return (
    <View className="absolute bottom-0 left-0 right-0 flex-row items-center gap-3 px-4 pb-8 pt-4 bg-surface/80 rounded-t-[24px] shadow-sm">
      <Pressable
        onPress={onShare}
        className="flex-1 flex-row items-center justify-center gap-2 py-4 rounded-xl border-1  bg-blue-500 "
      >
        <Share2 size={16} color="white" />
        <Text className="text-sm font-headline font-bold text-on-surface text-white">
          Compartilhar
        </Text>
      </Pressable>
      <Pressable
        onPress={saveDisabled ? undefined : onSave}
        className={`flex-[1.5] flex-row items-center justify-center gap-2 rounded-xl py-4 shadow-md active:scale-[0.98] ${
          saveDisabled ? 'bg-surface-container opacity-50' : 'bg-primary'
        }`}
      >
        <Save size={16} color={saveDisabled ? '#666' : '#fff'} />
        <Text
          className={`text-sm font-headline font-bold ${
            saveDisabled ? 'text-on-surface-variant' : 'text-white'
          }`}
        >
          {saveLabel}
        </Text>
      </Pressable>
    </View>
  );
}
