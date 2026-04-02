import { TextInput } from 'react-native';

type TextAreaFieldProps = {
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  rows?: number;
};

export function TextAreaField({ value, onChangeText, placeholder, rows = 3 }: TextAreaFieldProps) {
  return (
    <TextInput
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor="#abadae"
      multiline
      numberOfLines={rows}
      textAlignVertical="top"
      className="w-full p-4 rounded-xl bg-surface-container-high text-on-surface font-body"
    />
  );
}
