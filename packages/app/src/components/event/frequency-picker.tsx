import { Text, View } from 'react-native';
import { ChevronDown } from 'lucide-react-native';

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

  return (
    <View className="relative">
      <View className="w-full h-12 px-4 rounded-xl bg-surface-container-low flex-row items-center justify-between">
        <Text className="text-on-surface font-body">
          {options.find(opt => opt.value === value)?.label}
        </Text>
        <ChevronDown size={20} color="#abadae" />
      </View>
    </View>
  );
}
