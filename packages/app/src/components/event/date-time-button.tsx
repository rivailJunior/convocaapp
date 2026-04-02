import { Text, TouchableOpacity } from 'react-native';
import { Calendar } from 'lucide-react-native';

type DateTimeButtonProps = {
  value: string;
  onPress: () => void;
};

export function DateTimeButton({ value, onPress }: DateTimeButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="w-full h-14 px-4 rounded-xl bg-surface-container-high flex-row items-center justify-between active:scale-[0.99]"
    >
      <Text className="text-on-surface font-body">{value}</Text>
      <Calendar size={20} color="#266829" />
    </TouchableOpacity>
  );
}
