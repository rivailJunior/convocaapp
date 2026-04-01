import { TextInput, View } from 'react-native';
import { Calendar } from 'lucide-react-native';

type DateInputProps = {
  value: string;
  onChangeText: (text: string) => void;
  onPress?: () => void;
};

export function DateInput({ value, onChangeText, onPress }: DateInputProps) {
  return (
    <View className="relative">
      <TextInput
        value={value}
        onChangeText={onChangeText}
        onPressIn={onPress}
        placeholder="DD/MM/AAAA"
        placeholderTextColor="#abadae"
        className="w-full h-12 px-4 pr-12 rounded-xl bg-surface-container-low text-on-surface font-body"
      />
      <Calendar
        size={20}
        color="#266829"
        pointerEvents="none"
        style={{ position: 'absolute', right: 12, top: 14 }}
      />
    </View>
  );
}
