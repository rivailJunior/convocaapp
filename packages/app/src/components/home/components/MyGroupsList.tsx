import { router } from 'expo-router';
import { ChevronRight, Users } from 'lucide-react-native';
import { Pressable, Text, View } from 'react-native';

import { getSportEmoji } from '@sportspay/shared';

import type { GroupDisplayItem } from '@sportspay/shared';

interface MyGroupsListProps {
  groups: GroupDisplayItem[];
}

export function MyGroupsList({ groups }: MyGroupsListProps): React.JSX.Element {
  return (
    <View className="gap-3">
      <Text className="text-xl font-bold text-on-background">
        Meus Grupos
      </Text>

      {groups.length === 0 ? (
        <View className="rounded-xl border border-dashed border-outline-variant p-4 items-center">
          <Text className="text-xs text-on-surface-variant">
            Nenhum grupo disponível no momento.
          </Text>
        </View>
      ) : (
        groups.map((group) => (
          <Pressable
            key={group.id}
            onPress={() => router.push(`/groups/${group.id}`)}
            className="flex-row items-center gap-4 p-4 bg-surface-container-lowest rounded-xl active:opacity-80"
          >
            <View className="w-12 h-12 rounded-xl bg-primary-container/20 items-center justify-center">
              <Text className="text-2xl">{getSportEmoji(group.sport)}</Text>
            </View>

            <View className="flex-1 min-w-0">
              <View className="flex-row justify-between items-start">
                <Text className="font-bold text-on-background" numberOfLines={1}>
                  {group.name}
                </Text>
                <View className="flex-row items-center gap-1 shrink-0">
                  <Users size={12} color="#595c5d" />
                  <Text className="text-[10px] text-on-surface-variant">
                    {group.memberCount}
                  </Text>
                </View>
              </View>
              <Text
                className={`text-xs ${group.nextEvent ? 'text-on-surface-variant' : 'text-error font-medium'}`}
                numberOfLines={1}
              >
                {group.nextEvent ? `Próximo: ${group.nextEvent}` : 'Aguardando definição'}
              </Text>
            </View>

            <ChevronRight size={20} color="#abadae" />
          </Pressable>
        ))
      )}
    </View>
  );
}
