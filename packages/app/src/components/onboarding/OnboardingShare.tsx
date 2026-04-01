import { Text, View } from 'react-native';

import { Content } from './components/Content';
import { PhoneMockup } from './components/PhoneMock';

export function OnboardingShare() {
  return (
    <View className="flex-1 items-center px-4 pt-4 pb-48">
      {/* Phone Illustration */}
      <View className="relative w-full aspect-[4/5] items-center justify-center mt-4">
        {/* Background glow */}
        <View className="absolute inset-0 bg-primary-container/20 rounded-full scale-75" />
        <PhoneMockup />
        {/* Floating Kinetic Chip */}
        <View className="absolute bottom-10 right-2 bg-secondary-container px-4 py-3 rounded-xl flex-row items-center gap-3">
          <View className="w-10 h-10 rounded-full bg-primary items-center justify-center">
            <Text className="text-white text-lg">↗</Text>
          </View>
          <View>
            <Text className="text-on-secondary-container text-[10px] font-bold uppercase tracking-wider">
              Pronto para Enviar
            </Text>
            <Text className="text-primary text-xs font-bold">
              Rachão Confirmado
            </Text>
          </View>
        </View>
      </View>

      {/* Content */}
      <Content title="Compartilhe facilmente" subTitle="Envie times e cobrança Pix direto no WhatsApp do grupo" className="mt-12" />
    </View>
  );
}
