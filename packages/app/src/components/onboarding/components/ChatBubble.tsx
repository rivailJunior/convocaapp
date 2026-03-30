import { Text, View } from 'react-native';
import { ConfirmationMessage } from './ConfirmationMessage';

export function ChatBubble() {
  return (
    <View className="self-end bg-[#dcf8c6] p-2 rounded-lg rounded-tr-none max-w-[85%]">
      <Text className="text-on-surface text-[11px] font-semibold mb-1">
        Lista para amanhã:
      </Text>
      <View className="gap-0.5">
        <ConfirmationMessage name="André" status="Confirmado" />
        <ConfirmationMessage name="Bruno" status="Pendente" />
        <ConfirmationMessage name="Carlos" status="Confirmado" />
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