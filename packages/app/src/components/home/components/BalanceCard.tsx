import { Text, View } from 'react-native';

import { formatCurrency } from '@sportspay/shared';

import type { TreasurySummary } from '@sportspay/shared';

interface BalanceCardProps {
  summaries: TreasurySummary[];
}

const sumBalances = (summaries: TreasurySummary[]): number => {
  return summaries.reduce((total, s) => total + s.balance, 0);
};

export function BalanceCard({ summaries }: BalanceCardProps): React.JSX.Element {
  const totalBalance = sumBalances(summaries);
  const activeCount = summaries.length;

  return (
    <View className="relative overflow-hidden rounded-xl bg-primary p-6">
      <View className="relative z-10 gap-1">
        <Text className="text-sm font-medium text-white">
          Saldo Total em Grupos
        </Text>
        <View className="flex-row items-end justify-between">
          <Text className="text-3xl font-extrabold tracking-tight text-white">
            {formatCurrency(totalBalance)}
          </Text>
          <View className="flex-row items-center gap-1.5 bg-secondary-fixed/20 px-3 py-1 rounded-full">
            <View className="w-2 h-2 rounded-full bg-secondary-fixed" />
            <Text className="text-[10px] font-bold text-secondary-fixed tracking-wider uppercase">
              {activeCount} ATIVOS
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
