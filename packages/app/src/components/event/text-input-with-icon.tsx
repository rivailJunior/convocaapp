import { MapPin } from 'lucide-react-native';
import { TextInput, View } from 'react-native';

type TextInputWithIconProps = {
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  onFocus?: () => void;
};

export function TextInputWithIcon({
  value,
  onChangeText,
  placeholder,
  onFocus,
}: TextInputWithIconProps) {
  return (
    <View className="relative">
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#abadae"
        onFocus={onFocus}
        className="w-full h-14 p-4 pr-12 rounded-xl bg-surface-container-high text-on-surface font-body"
      />
      <MapPin size={20} color="#abadae" style={{ position: 'absolute', right: 16, top: 17 }} />
    </View>
  );
}
