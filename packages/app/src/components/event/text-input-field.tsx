import { TextInput, View } from 'react-native';

type TextInputFieldProps = {
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
};

export function TextInputField({ value, onChangeText, placeholder }: TextInputFieldProps) {
  return (
    <View className="relative">
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#abadae"
        accessibilityLabel={placeholder}
        className="w-full h-14 px-4 rounded-xl bg-surface-container-high text-on-surface font-body"
      />
    </View>
  );
}
