import { Repeat } from 'lucide-react-native';
import { Text, View } from 'react-native';

import { FrequencyPicker } from './frequency-picker';
import { SectionLabel } from './section-label';
import { ToggleSwitch } from './toggle-switch';
import { WeekdaySelector } from './weekday-selector';

import type { DateTimePickerEvent } from '@react-native-community/datetimepicker';

type RecurrenceCardProps = {
  isEnabled: boolean;
  onToggle: (value: boolean) => void;
  frequency: string;
  onFrequencyChange: (value: string) => void;
  selectedDays: number[];
  onToggleDay: (day: number) => void;
  endDate: string;
  onEndDatePress: () => void;
  showEndDatePicker: boolean;
  endDatePickerValue: Date;
  onEndDatePickerChange: (event: DateTimePickerEvent, date?: Date) => void;
};

export function RecurrenceCard({
  isEnabled,
  onToggle,
  frequency,
  onFrequencyChange,
  selectedDays,
  onToggleDay,
}: RecurrenceCardProps) {
  return (
    <View className="bg-surface-container-lowest p-4 rounded-2xl border border-surface-container-high">
      <View className="flex-row items-center justify-between mb-4">
        <View className="flex-row items-center gap-2">
          <Repeat size={24} color="#266829" />
          <Text className="font-headline font-bold text-on-surface">Repetir Evento</Text>
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

          {/* <View className="gap-2">
            <SectionLabel label="Até quando?" />
            <DateTimeButton value={endDate} onPress={onEndDatePress} />
            {showEndDatePicker && (
              <DateTimePicker
                value={endDatePickerValue}
                mode="date"
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                onChange={onEndDatePickerChange}
                locale="pt-BR"
              />
            )}
          </View> */}
        </View>
      )}
    </View>
  );
}
