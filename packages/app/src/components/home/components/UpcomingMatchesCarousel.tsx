import { Image, Pressable, ScrollView, Text, View } from 'react-native';

import { SPORTS, formatEventDate } from '@sportspay/shared';

import type { Sport, UpcomingEventItem } from '@sportspay/shared';

const SPORT_BADGE_STYLES: Record<Sport, string> = {
  futebol: 'bg-primary-container text-on-primary-container',
  volei: 'bg-secondary-container text-on-secondary-container',
  basquete: 'bg-tertiary-container text-on-tertiary-container',
  outro: 'bg-surface-container-high text-on-surface-variant',
};

interface UpcomingMatchesCarouselProps {
  events: UpcomingEventItem[];
}

export function UpcomingMatchesCarousel({ events }: UpcomingMatchesCarouselProps): React.JSX.Element {
  return (
    <View className="gap-4">
      <View className="flex-row items-center justify-between">
        <Text className="text-xl font-bold text-on-background">
          Próximas Partidas
        </Text>
        <Pressable disabled className="opacity-60">
          <Text className="text-primary font-bold text-sm">Ver tudo</Text>
        </Pressable>
      </View>

      {events.length === 0 ? (
        <View className="rounded-xl bg-surface-container-lowest p-4 items-center">
          <Text className="text-xs text-on-surface-variant">
            Nenhum evento agendado.
          </Text>
        </View>
      ) : (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerClassName="gap-4"
        >
          {events.map((event) => {
            const extraCount = event.confirmedCount - event.confirmedAvatars.length;

            return (
              <View
                key={event.id}
                className="w-72 bg-surface-container-lowest rounded-xl p-4 gap-3"
              >
                <View className="flex-row items-center justify-between">
                  <Text
                    className={`text-[10px] font-bold px-2 py-1 rounded-md uppercase ${SPORT_BADGE_STYLES[event.sport]}`}
                  >
                    {SPORTS[event.sport]}
                  </Text>
                  <Text className="text-on-surface-variant text-xs font-medium">
                    {formatEventDate(event.date)}
                  </Text>
                </View>

                <View>
                  <Text className="font-bold text-lg leading-tight text-on-surface">
                    {event.title}
                  </Text>
                  <Text className="text-on-surface-variant text-sm">
                    {event.venueName}
                  </Text>
                </View>

                <View className="flex-row items-center gap-2 mt-2">
                  <View className="flex-row">
                    {event.confirmedAvatars.map((url, i) => (
                      <Image
                        key={`${event.id}-avatar-${i}`}
                        className="w-6 h-6 rounded-full border-2 border-white -ml-2 first:ml-0"
                        source={{ uri: url }}
                        accessibilityLabel="Jogador confirmado"
                      />
                    ))}
                    {extraCount > 0 && (
                      <View className="w-6 h-6 rounded-full border-2 border-white bg-surface-container-high items-center justify-center -ml-2">
                        <Text className="text-[8px] font-bold text-on-surface">
                          +{extraCount}
                        </Text>
                      </View>
                    )}
                  </View>
                  <Text className="text-xs text-on-surface-variant">
                    Confirmados
                  </Text>
                </View>
              </View>
            );
          })}
        </ScrollView>
      )}
    </View>
  );
}
