import { Text, View } from 'react-native';
import { TeamRow } from './components/TeamRow';
import { Content } from './components/Content';

export function OnboardingTeams() {
  return (
    <View className="flex-1 items-center px-6 pt-4 pb-48">
      {/* Simulated Phone Screen Illustration */}
      <View className="w-full max-w-sm aspect-[4/5] bg-surface-container-low rounded-xl relative overflow-hidden items-center justify-center p-6 mb-12">
        <View className="w-full h-full bg-surface-container-lowest rounded-xl overflow-hidden">
          {/* App Header Inside Screen */}
          <View className="h-12 bg-primary px-4 flex-row items-center justify-between">
            <View className="h-2 w-12 bg-white/30 rounded-full" />
            <View className="flex-row gap-1">
              <View className="w-1.5 h-1.5 bg-secondary-fixed rounded-full" />
              <View className="w-1.5 h-1.5 bg-white/20 rounded-full" />
            </View>
          </View>

          <View className="p-4 gap-4">
            {/* Team A */}
            <TeamRow label="TIME A" level="4.8" variant="a" />
            {/* Team B */}
            <TeamRow label="TIME B" level="4.7" variant="b" />
            {/* Generate Button */}
            <View className="mt-4 h-8 w-full bg-primary rounded-lg items-center justify-center">
              <Text className="text-[10px] font-bold text-white uppercase tracking-wider">
                Novo Sorteio
              </Text>
            </View>
          </View>
        </View>

        {/* Floating Decorative Elements */}
        <View className="absolute -top-4 -right-4 w-24 h-24 bg-secondary-fixed/20 rounded-full" />
        <View className="absolute -bottom-10 -left-10 w-32 h-32 bg-primary/10 rounded-full" />
      </View>

      {/* Content */}
      <Content title="Gere times automaticamente" subTitle="Sorteio justo por número de times ou jogadores por time" />
    </View>
  );
}
