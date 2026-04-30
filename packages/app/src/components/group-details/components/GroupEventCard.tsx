import { Calendar } from 'lucide-react-native';
import { Text, View } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import { colors, formatLocalEventDate } from '@sportspay/shared';

import type { GroupEventItem, Sport } from '@sportspay/shared';

const SPORT_ICON: Record<Sport, React.ComponentProps<typeof MaterialCommunityIcons>['name']> = {
  futebol: 'soccer',
  volei: 'volleyball',
  basquete: 'basketball',
  outro: 'help-circle-outline',
};

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
          <View className="flex-row items-center gap-1.5">
            <Calendar size={13} color={colors['on-surface-variant']} />
            <Text className="text-on-surface-variant text-sm font-medium">
              {formatLocalEventDate(event.date)} • {event.venueName}
            </Text>
          </View>
        </View>

        <View
          className={`w-12 h-12 rounded-2xl items-center justify-center ${
            isActive ? 'bg-primary-container' : 'bg-surface-container-high'
          }`}
        >
          <MaterialCommunityIcons
            name={SPORT_ICON[sport]}
            size={26}
            color={isActive ? colors['on-primary-container'] : colors['on-surface-variant']}
          />
        </View>
      </View>

      <View className="flex-row flex-wrap gap-2">
        {event.hasTeams && (
          <View className="flex-row items-center gap-1 px-3 py-1 rounded-full bg-primary-container">
            <Text className="text-on-primary-container text-xs font-medium">Times gerados</Text>
            <MaterialCommunityIcons
              name="check-circle"
              size={14}
              color={colors['on-primary-container']}
            />
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
