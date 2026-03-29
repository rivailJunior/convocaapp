import { Text, View } from 'react-native';

function ChatBubble() {
  return (
    <View className="self-end bg-[#dcf8c6] p-2 rounded-lg rounded-tr-none max-w-[85%]">
      <Text className="text-on-surface text-[11px] font-semibold mb-1">
        Lista para amanhã:
      </Text>
      <View className="gap-0.5">
        <Text className="text-on-surface/80 text-[10px]">
          1. André (Confirmado)
        </Text>
        <Text className="text-on-surface/80 text-[10px]">
          2. Bruno (Pendente)
        </Text>
        <Text className="text-on-surface/80 text-[10px]">
          3. Carlos (Confirmado)
        </Text>
        <Text className="text-on-surface/80 text-[10px]">...</Text>
        <Text className="text-primary text-[10px] font-bold mt-2 pt-2">
          Valor: R$ 25,00
        </Text>
        <Text className="text-[9px] bg-white/50 p-1 rounded">
          Chave Pix: 000.123.456-78
        </Text>
      </View>
      <Text className="text-[8px] text-on-surface-variant text-right mt-1">
        10:45 ✓✓
      </Text>
    </View>
  );
}

function PhoneMockup() {
  return (
    <View className="w-[260px] h-[480px] bg-on-surface rounded-[40px] overflow-hidden p-2">
      {/* Status Bar */}
      <View className="flex-row justify-between items-center px-6 pt-1 pb-1">
        <Text className="text-[10px] text-white font-bold">9:41</Text>
        <View className="flex-row gap-1">
          <View className="w-3 h-3 rounded-full bg-white/20" />
          <View className="w-3 h-3 rounded-full bg-white/20" />
        </View>
      </View>

      {/* WhatsApp UI Mockup */}
      <View className="flex-1 bg-[#e5ddd5] rounded-[32px] overflow-hidden">
        {/* App Header */}
        <View className="h-12 bg-[#075e54] flex-row items-center px-3 gap-2">
          <Text className="text-white text-lg">←</Text>
          <View className="w-8 h-8 rounded-full bg-surface-dim" />
          <View className="flex-1">
            <Text className="text-white text-[11px] font-bold leading-none">
              Futebol de Quarta ⚽
            </Text>
            <Text className="text-white/70 text-[9px]">
              você, André, Bruno...
            </Text>
          </View>
        </View>

        {/* Chat Area */}
        <View className="flex-1 p-3 gap-3">
          <ChatBubble />
          {/* Payment Alert */}
          <View className="self-center bg-white/90 px-3 py-1.5 rounded-full">
            <Text className="text-[9px] text-on-surface-variant font-medium">
              André pagou o racha 💸
            </Text>
          </View>
        </View>

        {/* Input Bar */}
        <View className="h-12 bg-[#f0f0f0] flex-row items-center px-3 gap-2">
          <View className="flex-1 bg-white h-8 rounded-full justify-center px-3">
            <Text className="text-[10px] text-on-surface-variant">
              Mensagem
            </Text>
          </View>
          <View className="w-8 h-8 rounded-full bg-[#128c7e] items-center justify-center">
            <Text className="text-white text-sm">➤</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

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
            <Text className="text-secondary-fixed text-lg">↗</Text>
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
      <View className="items-center gap-4 w-full mt-12">
        <Text className="font-extrabold text-[2rem] leading-tight text-on-surface tracking-tight text-center">
          Compartilhe facilmente
        </Text>
        <Text className="text-on-surface-variant text-base px-4 leading-relaxed text-center">
          Envie times e cobrança Pix direto no WhatsApp do grupo
        </Text>
      </View>
    </View>
  );
}
