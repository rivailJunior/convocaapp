import { Text, View } from 'react-native';
import { ChatBubble } from './ChatBubble';

export function PhoneMockup() {
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