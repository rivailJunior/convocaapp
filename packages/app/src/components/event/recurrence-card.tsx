import { Text, View } from 'react-native';
import { Repeat } from 'lucide-react-native';
import { ToggleSwitch } from './toggle-switch';
import { SectionLabel } from './section-label';
import { FrequencyPicker } from './frequency-picker';
import { WeekdaySelector } from './weekday-selector';
import { DateInput } from './date-input';

type RecurrenceCardProps = {
  isEnabled: boolean;
  onToggle: (value: boolean) => void;
  frequency: string;
  onFrequencyChange: (value: string) => void;
  selectedDays: number[];
  onToggleDay: (day: number) => void;
  endDate: string;
  onEndDateChange: (date: string) => void;
  onEndDatePress?: () => void;
};

export function RecurrenceCard({
  isEnabled,
  onToggle,
  frequency,
  onFrequencyChange,
  selectedDays,
  onToggleDay,
  endDate,
  onEndDateChange,
  onEndDatePress,
}: RecurrenceCardProps) {
  return (
    <View className="bg-surface-container-lowest p-4 rounded-2xl border border-surface-container-high">
      <View className="flex-row items-center justify-between mb-4">
        <View className="flex-row items-center gap-2">
          <Repeat size={24} color="#266829" />
          <Text className="font-headline font-bold text-on-surface">
            Repetir Evento
          </Text>
        </View>
        <ToggleSwitch value={isEnabled} onValueChange={onToggle} />
      </View>

      {isEnabled && (
        <View className="pt-2 border-t border-surface-container-low gap-4">
          <View className="gap-2">
            <SectionLabel label="Frequência" />
            <FrequencyPicker value={frequency} onValueChange={onFrequencyChange} />
          </View>

          <View className="gap-2">
            <SectionLabel label="Dias da semana" />
            <WeekdaySelector selectedDays={selectedDays} onToggleDay={onToggleDay} />
          </View>

          <View className="gap-2">
            <SectionLabel label="Até quando?" />
            <DateInput
              value={endDate}
              onChangeText={onEndDateChange}
              onPress={onEndDatePress}
            />
          </View>
        </View>
      )}
    </View>
  );
}
