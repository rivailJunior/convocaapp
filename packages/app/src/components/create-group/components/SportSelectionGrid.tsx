import { Pressable, Text, View } from 'react-native';

import type { Sport } from '@sportspay/shared';

const SPORT_OPTIONS: { value: Sport; label: string; emoji: string }[] = [
  { value: 'futebol', label: 'Futebol', emoji: '⚽' },
  { value: 'volei', label: 'Vôlei', emoji: '🏐' },
  { value: 'basquete', label: 'Basquete', emoji: '🏀' },
  { value: 'outro', label: 'Outro', emoji: '⚙️' },
];

interface SportSelectionGridProps {
  selected: Sport | null;
  onSelect: (sport: Sport) => void;
}

export function SportSelectionGrid({ selected, onSelect }: SportSelectionGridProps): React.JSX.Element {
  return (
    <View className="gap-2 mb-8 flex-1">
      <Text className="font-semibold text-sm text-on-surface-variant">
        Esporte
      </Text>
      <View className="flex-row flex-wrap gap-4">
        {SPORT_OPTIONS.map((option) => {
          const isSelected = selected === option.value;
          return (
            <Pressable
              key={option.value}
              className={`flex-1 min-w-[40%] border-2 rounded-xl p-4 items-center justify-center ${
                isSelected
                  ? 'border-primary bg-primary-container/20'
                  : 'border-transparent bg-surface-container-lowest'
              }`}
              onPress={() => onSelect(option.value)}
            >
              <Text className="text-3xl mb-2">{option.emoji}</Text>
              <Text
                className={`font-bold text-sm ${
                  isSelected ? 'text-primary' : 'text-on-surface-variant'
                }`}
              >
                {option.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
