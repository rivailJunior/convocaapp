import { Cloud, Bell } from 'lucide-react-native';
import { Text, View } from 'react-native';

import type { FutureFeature } from '@sportspay/shared';

const FUTURE_ICON_MAP: Record<string, React.JSX.Element> = {
  cloud: <Cloud size={20} color="#757778" />,
  notifications: <Bell size={20} color="#757778" />,
};

const FUTURE_FEATURES: FutureFeature[] = [
  { id: 'sync', labelKey: 'Sincronizar na nuvem', icon: 'cloud' },
  { id: 'notifications', labelKey: 'Notificações', icon: 'notifications' },
];

export function FutureSection(): React.JSX.Element {
  return (
    <View className="opacity-60">
      <Text className="text-on-surface-variant font-headline font-bold text-xs mb-3 ml-1 uppercase tracking-widest">
        Futuro
      </Text>
      <View className="bg-surface-container-low rounded-xl overflow-hidden">
        {FUTURE_FEATURES.map((feature) => (
          <View
            key={feature.id}
            className="flex-row items-center justify-between p-4"
          >
            <View className="flex-row items-center gap-3">
              {FUTURE_ICON_MAP[feature.icon]}
              <Text className="font-medium text-outline">
                {feature.labelKey}
              </Text>
            </View>
            <View className="bg-surface-container-high px-2 py-0.5 rounded-full">
              <Text className="text-on-surface-variant text-[10px] font-bold uppercase tracking-tighter">
                Em breve
              </Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}
