import { Text, View } from 'react-native';
import { Bell } from 'lucide-react-native';

type InfoCardProps = {
  title: string;
  description: string;
};

export function InfoCard({ title, description }: InfoCardProps) {
  return (
    <View className="bg-surface-container-lowest p-4 rounded-xl flex-row items-start gap-4">
      <View className="w-12 h-12 rounded-lg bg-primary-container flex items-center justify-center">
        <Bell
          size={24}
          color="#1f6223"
        />
      </View>
      <View className="flex-1">
        <Text className="font-headline font-bold text-sm text-primary">
          {title}
        </Text>
        <Text className="text-xs text-on-surface-variant mt-1 font-body">
          {description}
        </Text>
      </View>
    </View>
  );
}
