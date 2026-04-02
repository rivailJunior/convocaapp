import { Text, TouchableOpacity, View } from 'react-native';

type WeekdaySelectorProps = {
  selectedDays: number[];
  onToggleDay: (day: number) => void;
};

const WEEKDAYS = ['S', 'T', 'Q', 'Q', 'S', 'S', 'D'];

export function WeekdaySelector({ selectedDays, onToggleDay }: WeekdaySelectorProps) {
  return (
    <View className="flex-row justify-between items-center gap-1">
      {WEEKDAYS.map((day, index) => {
        const isSelected = selectedDays.includes(index);
        return (
          <TouchableOpacity
            key={index}
            onPress={() => onToggleDay(index)}
            className={`w-9 h-9 rounded-full flex items-center justify-center border-2 ${
              isSelected
                ? 'bg-primary border-primary'
                : 'bg-surface-container-low border-transparent'
            }`}
          >
            <Text
              className={`font-bold text-xs ${
                isSelected ? 'text-white' : 'text-on-surface-variant'
              }`}
            >
              {day}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
