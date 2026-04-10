import { Pressable, Text, View } from 'react-native';

type GenerateTeamsMode = 'by_teams' | 'by_players' | 'manual';

type ModeSelectorProps = {
  selected: GenerateTeamsMode;
  onSelect: (mode: GenerateTeamsMode) => void;
};

const MODES: { key: GenerateTeamsMode; label: string }[] = [
  { key: 'by_teams', label: 'Por times' },
  { key: 'by_players', label: 'Por jogadores' },
  { key: 'manual', label: 'Manual' },
];

export function ModeSelector({ selected, onSelect }: ModeSelectorProps): React.JSX.Element {
  return (
    <View className="mb-8">
      <View className="flex-row p-1 bg-surface-container-low rounded-full gap-1">
        {MODES.map(({ key, label }) => {
          const isActive = selected === key;
          return (
            <Pressable
              key={key}
              onPress={() => onSelect(key)}
              className={`flex-1 py-3 px-4 rounded-full items-center ${isActive ? 'bg-primary shadow-sm' : ''}`}
            >
              <Text
                className={`text-sm font-bold ${isActive ? 'text-white' : 'text-on-surface-variant'}`}
              >
                {label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
