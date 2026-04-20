import { Text, TextInput, View } from 'react-native';

type DrawInputProps = {
  mode: 'by_teams' | 'by_players' | 'manual';
  value: string;
  preview: string | null;
  onChangeValue: (value: string) => void;
};

const LABEL: Record<string, string> = {
  by_teams: 'Quantos times?',
  by_players: 'Jogadores por time?',
  manual: 'Quantos times?',
};

const PLACEHOLDER: Record<string, string> = {
  by_teams: 'Ex: 3',
  by_players: 'Ex: 5',
  manual: 'Ex: 3',
};

export function DrawInput({ mode, value, preview, onChangeValue }: DrawInputProps): React.JSX.Element | null {
  return (
    <View className="bg-surface-container-lowest p-6 rounded-xl mb-6 shadow-sm">
      <Text className="text-center font-headline font-bold text-on-surface-variant mb-4">
        {LABEL[mode]}
      </Text>
      <View className="items-center gap-2">
        <TextInput
          className="w-48 h-16 text-center text-3xl font-headline font-extrabold bg-surface-container-low rounded-xl"
          placeholder={PLACEHOLDER[mode]}
          placeholderTextColor="#757778"
          keyboardType="number-pad"
          value={value}
          onChangeText={onChangeValue}
        />
        {preview && (
          <Text className="text-on-surface-variant text-xs font-medium mt-2">
            {preview}
          </Text>
        )}
      </View>
    </View>
  );
}
