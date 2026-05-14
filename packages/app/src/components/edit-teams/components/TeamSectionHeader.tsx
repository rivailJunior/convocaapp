import { Pressable, Text, TextInput, View } from 'react-native';
import { useCallback, useRef, useState } from 'react';

import { TEAM_COLORS } from '@sportspay/shared';

type TeamSectionHeaderProps = {
  name: string;
  playerCount: number;
  colorIndex: number;
  onRename: (oldName: string, newName: string) => void;
};

export function TeamSectionHeader({
  name,
  playerCount,
  colorIndex,
  onRename,
}: TeamSectionHeaderProps): React.JSX.Element {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(name);
  const inputRef = useRef<TextInput>(null);

  const color = TEAM_COLORS[colorIndex % TEAM_COLORS.length];

  const handlePress = useCallback(() => {
    setEditValue(name);
    setIsEditing(true);
    setTimeout(() => inputRef.current?.focus(), 50);
  }, [name]);

  const handleSubmit = useCallback(() => {
    setIsEditing(false);
    const trimmed = editValue.trim();
    if (trimmed && trimmed !== name) {
      onRename(name, trimmed);
    } else {
      setEditValue(name);
    }
  }, [editValue, name, onRename]);

  return (
    <View className="flex-row items-center justify-between">
      <View className="flex-row items-center gap-2 flex-1">
        <View className={`w-1.5 h-12 rounded-full ${color.indicator}`} />
        {isEditing ? (
          <TextInput
            ref={inputRef}
            value={editValue}
            onChangeText={setEditValue}
            onBlur={handleSubmit}
            onSubmitEditing={handleSubmit}
            className="font-headline font-bold text-lg text-on-background flex-1 p-0 border-b border-primary"
            autoFocus
            selectTextOnFocus
          />
        ) : (
          <Pressable onPress={handlePress}>
            <Text className="font-headline font-bold text-lg text-on-background">{name}</Text>
          </Pressable>
        )}
      </View>
      <View className="bg-surface-container-high px-2 py-2 rounded-md mr-2">
        <Text className="text-[12px] font-bold text-on-surface-variant">{playerCount}</Text>
      </View>
    </View>
  );
}
