import { TextInput, View } from 'react-native';

import type { KeyboardTypeOptions } from 'react-native';

type TextInputFieldProps = {
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  keyboardType?: KeyboardTypeOptions;
  onFocus?: () => void;
};

export function TextInputField({
  value,
  onChangeText,
  placeholder,
  keyboardType,
  onFocus,
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
        onFocus={onFocus}
        className="w-full h-14 p-4 rounded-xl bg-surface-container-high text-on-surface font-body"
      />
    </View>
  );
}
