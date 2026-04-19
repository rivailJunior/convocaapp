import { ChevronDown } from 'lucide-react-native';
import { Pressable, Text, View } from 'react-native';

type FrequencyPickerProps = {
  value: string;
  onValueChange: (value: string) => void;
};

export function FrequencyPicker({ value, onValueChange }: FrequencyPickerProps) {
  const options = [
    { label: 'Semanal', value: 'weekly' },
    { label: 'Quinzenal', value: 'biweekly' },
    { label: 'Mensal', value: 'monthly' },
  ];

  const handlePress = () => {
    const currentIndex = options.findIndex((opt) => opt.value === value);
    const nextIndex = (currentIndex + 1) % options.length;
    onValueChange(options[nextIndex].value);
  };

  return (
    <View className="relative">
      <Pressable
        onPress={handlePress}
        className="w-full h-12 px-4 rounded-xl bg-surface-container-low flex-row items-center justify-between gap-4"
      >
        <Text className="text-on-surface font-body">
          {options.find((opt) => opt.value === value)?.label}
        </Text>
        <ChevronDown size={20} color="#abadae" />
      </Pressable>
    </View>
  );
}
