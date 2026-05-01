import { Pressable, ScrollView, Text } from 'react-native';

import type { AttendanceStatus } from '@sportspay/shared';

type AttendanceFilter = 'all' | AttendanceStatus;

type FilterOption = {
  key: AttendanceFilter;
  label: string;
  count: number;
};

type AttendanceFilterChipsProps = {
  activeFilter: AttendanceFilter;
  counts: {
    all: number;
    confirmed: number;
    pending: number;
    declined: number;
    maybe: number;
  };
  onFilterChange: (filter: AttendanceFilter) => void;
};

export function AttendanceFilterChips({
  activeFilter,
  counts,
  onFilterChange,
}: AttendanceFilterChipsProps): React.JSX.Element {
  const filters: FilterOption[] = [
    { key: 'all', label: 'Todos', count: counts.all },
    { key: 'confirmed', label: 'Confirmados', count: counts.confirmed },
    { key: 'pending', label: 'Pendentes', count: counts.pending },
    { key: 'declined', label: 'Recusados', count: counts.declined },
  ];

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerClassName="px-4 py-4 gap-2"
    >
      {filters.map((option) => {
        const isActive = activeFilter === option.key;

        return (
          <Pressable
            key={option.key}
            onPress={() => onFilterChange(option.key)}
            className={`px-4 py-2 rounded-full ${
              isActive ? 'bg-primary' : 'bg-surface-container-low'
            }`}
          >
            <Text
              className={`text-sm font-semibold ${
                isActive ? 'text-on-primary' : 'text-on-surface-variant'
              }`}
            >
              {option.label} ({option.count})
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}
