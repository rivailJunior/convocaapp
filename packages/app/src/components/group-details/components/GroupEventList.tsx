import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react-native';
import { Pressable, Text, View } from 'react-native';

import { colors } from '@sportspay/shared';

import { GroupEventCard } from './GroupEventCard';

import type { GroupEventItem } from '@sportspay/shared';
import type { Sport } from '@sportspay/shared';


interface GroupEventListProps {
  upcoming: GroupEventItem[];
  past: GroupEventItem[];
  sport: Sport;
}

export function GroupEventList({ upcoming, past, sport }: GroupEventListProps): React.JSX.Element {
  const [isPastExpanded, setIsPastExpanded] = useState(false);

  return (
    <View className="gap-6">
      <Text className="text-lg font-bold text-on-surface">Próximos Eventos</Text>

      {upcoming.length === 0 ? (
        <View className="rounded-xl bg-surface-container-lowest p-4 items-center">
          <Text className="text-xs text-on-surface-variant">
            Nenhum evento agendado.
          </Text>
        </View>
      ) : (
        <View className="gap-6">
          {upcoming.map((event) => (
            <GroupEventCard key={event.id} event={event} sport={sport} />
          ))}
        </View>
      )}

      {past.length > 0 && (
        <>
          {isPastExpanded && (
            <View className="gap-6">
              {past.map((event) => (
                <GroupEventCard key={event.id} event={event} sport={sport} />
              ))}
            </View>
          )}
          <Pressable
            onPress={() => setIsPastExpanded((prev) => !prev)}
            className="flex-row items-center justify-center gap-2 py-2 active:opacity-70"
          >
            <Text className="text-primary font-bold text-sm">
              {isPastExpanded
                ? 'Ocultar eventos anteriores'
                : `Ver eventos anteriores (${past.length})`}
            </Text>
            {isPastExpanded
              ? <ChevronUp size={16} color={colors.primary} />
              : <ChevronDown size={16} color={colors.primary} />}
          </Pressable>
        </>
      )}
    </View>
  );
}
