import { Pencil, Save, Share2 } from 'lucide-react-native';
import { Pressable, Text, View } from 'react-native';

type GenerateTeamsActionBarProps = {
  onShare: () => void;
  onSave: () => void;
  onEdit: () => void;
  saveDisabled?: boolean;
  saveLabel?: string;
};

const ButtonWrapper = ({
  onPress,
  children,
}: {
  onPress: () => void;
  children: React.ReactNode;
}) => {
  return (
    <Pressable
      onPress={onPress}
      className="flex-[1] flex-col items-center justify-center gap-2 py-4 px-4 rounded-xl bg-surface-container-lowest"
    >
      {children}
    </Pressable>
  );
};

export function GenerateTeamsActionBar({
  onShare,
  onSave,
  onEdit,
  saveDisabled = false,
  saveLabel = 'Salvar Times',
}: GenerateTeamsActionBarProps): React.JSX.Element {
  return (
    <View className="absolute bottom-0 left-0 right-0 flex-row items-center gap-3 px-4 pb-8 pt-4 bg-surface/80 rounded-t-[24px] shadow-sm">
      <ButtonWrapper onPress={onEdit}>
        <Pencil size={16} color="#266829" />
        <Text className="text-sm font-headline font-bold text-on-surface">Editar</Text>
      </ButtonWrapper>
      <ButtonWrapper onPress={onShare}>
        <Share2 size={16} color="#266829" />
        <Text className="text-sm font-headline font-bold text-on-surface">Compartilhar</Text>
      </ButtonWrapper>
      <ButtonWrapper onPress={!saveDisabled ? onSave : () => {}}>
        <Save size={16} color={saveDisabled ? '#D3D3D3' : '#266829'} />
        <Text
          className={`text-sm font-headline font-bold ${
            saveDisabled ? 'text-[#D3D3D3]' : 'text-on-surface'
          }`}
        >
          {saveLabel}
        </Text>
      </ButtonWrapper>
    </View>
  );
}
