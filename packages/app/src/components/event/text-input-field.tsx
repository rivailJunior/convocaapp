import { TextInput, View } from 'react-native';

import type { KeyboardTypeOptions } from 'react-native';

type TextInputFieldProps = {
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  keyboardType?: KeyboardTypeOptions;
};

export function TextInputField({
  value,
  onChangeText,
  placeholder,
  keyboardType,
}: TextInputFieldProps) {
  return (
    <View className="relative">
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#abadae"
        accessibilityLabel={placeholder}
        keyboardType={keyboardType}
        className="w-full h-14 px-4 rounded-xl bg-surface-container-high text-on-surface font-body"
      />
    </View>
  );
}
