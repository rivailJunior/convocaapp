import { router } from 'expo-router';
import { Settings } from 'lucide-react-native';
import { Pressable, Text, View } from 'react-native';

import { ROUTES } from '@/navigation';

export function HomeHeader(): React.JSX.Element {
  return (
    <View className="flex-row justify-between items-center px-4 h-14">
      <View className="flex-row items-center gap-2">
        <Text className="text-2xl">⚽</Text>
        <Text className="text-primary font-extrabold tracking-tight text-xl">
          SportsPay
        </Text>
      </View>
      <Pressable
        onPress={() => router.push(ROUTES.SETTINGS)}
        className="active:opacity-70"
        accessibilityLabel="Configurações"
      >
        <Settings size={24} color="#595c5d" />
      </Pressable>
    </View>
  );
}
