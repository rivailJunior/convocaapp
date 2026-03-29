import { Text, View } from 'react-native';

function PlayerSlot({ variant }: { variant: 'a' | 'b' }) {
  const bg = variant === 'a' ? 'bg-primary-fixed' : 'bg-secondary-container';
  const textColor =
    variant === 'a' ? 'text-on-primary-container' : 'text-on-secondary-container';

  return (
    <View className={`flex-1 aspect-square ${bg} rounded-lg items-center justify-center`}>
      <Text className={`${textColor} text-lg`}>👤</Text>
    </View>
  );
}

function TeamRow({
  label,
  level,
  variant,
}: {
  label: string;
  level: string;
  variant: 'a' | 'b';
}) {
  const labelColor = variant === 'a' ? 'text-primary' : 'text-secondary';

  return (
    <View className="gap-2">
      <View className="flex-row justify-between items-center">
        <Text className={`font-bold text-xs ${labelColor}`}>{label}</Text>
        <Text className="text-[10px] text-on-surface-variant">
          Nível: {level}
        </Text>
      </View>
      <View className="flex-row gap-2">
        <PlayerSlot variant={variant} />
        <PlayerSlot variant={variant} />
        <PlayerSlot variant={variant} />
        <PlayerSlot variant={variant} />
      </View>
    </View>
  );
}

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
      <View className="items-center gap-4 w-full max-w-sm">
        <Text className="font-extrabold text-3xl tracking-tight text-on-surface leading-tight text-center">
          Gere times automaticamente
        </Text>
        <Text className="text-on-surface-variant text-base leading-relaxed text-center">
          Sorteio justo por número de times ou jogadores por time
        </Text>
      </View>
    </View>
  );
}
