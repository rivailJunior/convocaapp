import { Text, View } from 'react-native';

import { getSportEmoji } from '@sportspay/shared';

import type { GroupEventItem } from '@sportspay/shared';
import type { Sport } from '@sportspay/shared';

const WEEKDAYS_PT = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

function formatGroupEventDate(iso: string): string {
  const date = new Date(iso);
  const weekday = WEEKDAYS_PT[date.getDay()];
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${weekday}, ${hours}h${minutes !== '00' ? minutes : ''}`;
}

interface GroupEventCardProps {
  event: GroupEventItem;
  sport: Sport;
}

export function GroupEventCard({ event, sport }: GroupEventCardProps): React.JSX.Element {
  const isActive = event.status === 'scheduled';

  return (
    <View className="bg-surface-container-lowest rounded-xl p-4 gap-4">
      <View className="flex-row justify-between items-start">
        <View className="flex-col gap-1 flex-1 mr-3">
          <Text className="font-bold text-on-surface text-base">{event.title}</Text>
          <View className="flex-row items-center gap-1">
            <Text className="text-on-surface-variant text-sm">📅</Text>
            <Text className="text-on-surface-variant text-sm font-medium">
              {formatGroupEventDate(event.date)} • {event.venueName}
            </Text>
          </View>
        </View>

        <View
          className={`w-10 h-10 rounded-xl items-center justify-center ${
            isActive ? 'bg-primary-container' : 'bg-surface-container-high'
          }`}
        >
          <Text className="text-xl">{getSportEmoji(sport)}</Text>
        </View>
      </View>

      <View className="flex-row flex-wrap gap-2">
        {event.hasTeams && (
          <View className="flex-row items-center gap-1 px-3 py-1 rounded-full bg-primary-container">
            <Text className="text-on-primary-container text-xs font-bold">
              Times gerados
            </Text>
            <Text className="text-on-primary-container text-xs">✓</Text>
          </View>
        )}
        <View className="px-3 py-1 rounded-full bg-surface-container-high">
          <Text className="text-on-surface-variant text-xs font-bold">
            {event.confirmedCount} confirmados
          </Text>
        </View>
      </View>
    </View>
  );
}
