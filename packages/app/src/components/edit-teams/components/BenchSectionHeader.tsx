import { Text, View } from 'react-native';

import { BENCH_COLORS } from '@sportspay/shared';

export function BenchSectionHeader(): React.JSX.Element {
  return (
    <View className="flex-row items-center gap-2">
      <View className={`w-1.5 h-6 rounded-full ${BENCH_COLORS.indicator}`} />
      <Text className="font-headline font-bold text-lg text-on-background">Banco</Text>
    </View>
  );
}
