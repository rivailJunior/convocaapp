import { Save, Share2 } from 'lucide-react-native';
import { Pressable, Text, View } from 'react-native';

type GenerateTeamsActionBarProps = {
  onShare: () => void;
  onSave: () => void;
};

export function GenerateTeamsActionBar({
  onShare,
  onSave,
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
        onPress={onSave}
        className="flex-[1.5] flex-row items-center justify-center gap-2 bg-primary rounded-xl py-4 shadow-md active:scale-[0.98]"
      >
        <Save size={16} color="#fff" />
        <Text className="text-sm font-headline font-bold text-white">Salvar Times</Text>
      </Pressable>
    </View>
  );
}
