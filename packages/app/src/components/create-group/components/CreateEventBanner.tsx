import { Pressable, Text, View } from 'react-native';
import { Calendar, Rocket } from 'lucide-react-native';

export function CreateEventBanner(): React.JSX.Element {
  return (
    <View className="mb-8 pt-4">
      <View className="bg-primary/5 rounded-2xl p-5 gap-4">
        <View className="flex-row items-start gap-3">
          <View className="bg-primary/10 p-2 rounded-lg items-center justify-center">
            <Calendar size={24} color="#266829" />
          </View>
          <View className="flex-1">
            <Text className="font-bold text-primary text-base leading-snug">
              Agendar primeira partida?
            </Text>
            <Text className="text-xs text-on-surface-variant leading-relaxed">
              Pule etapas criando o grupo e já agendando o primeiro evento com estes participantes.
            </Text>
          </View>
        </View>
        <Pressable
          disabled
          className="w-full bg-surface-container-lowest border-2 border-primary py-3.5 rounded-xl flex-row items-center justify-center gap-2 opacity-60"
        >
          <Rocket size={18} color="#266829" />
          <Text className="text-primary font-bold text-sm">
            Criar Evento e mover participantes
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
