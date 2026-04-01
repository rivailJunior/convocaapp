import { Mail } from 'lucide-react-native';
import { Pressable, Text, View } from 'react-native';

interface AboutSectionProps {
  version: string;
  onPrivacyPress: () => void;
  onTermsPress: () => void;
  onFeedbackPress: () => void;
}

export function AboutSection({
  version,
  onPrivacyPress,
  onTermsPress,
  onFeedbackPress,
}: AboutSectionProps): React.JSX.Element {
  return (
    <View>
      <Text className="text-on-surface-variant font-headline font-bold text-xs mb-3 ml-1 uppercase tracking-widest">
        Sobre
      </Text>
      <View className="bg-surface-container-lowest rounded-xl overflow-hidden">
        <View className="flex-row items-center justify-between p-4">
          <Text className="font-medium text-on-surface">Versão</Text>
          <Text className="text-on-surface-variant text-sm font-medium">
            {version}
          </Text>
        </View>
        <Pressable
          onPress={onPrivacyPress}
          className="flex-row items-center justify-between p-4 active:opacity-70"
        >
          <Text className="font-medium text-on-surface">
            Política de Privacidade
          </Text>
        </Pressable>
        <Pressable
          onPress={onTermsPress}
          className="flex-row items-center justify-between p-4 active:opacity-70"
        >
          <Text className="font-medium text-on-surface">Termos de Uso</Text>
        </Pressable>
        <Pressable
          onPress={onFeedbackPress}
          className="flex-row items-center justify-between p-4 active:opacity-70"
        >
          <View className="flex-row items-center gap-3">
            <Mail size={20} color="#185c1e" />
            <Text className="font-medium text-on-surface">
              Enviar Feedback
            </Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
}
