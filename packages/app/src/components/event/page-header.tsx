import { Text, View } from 'react-native';

type PageHeaderProps = {
  subtitle: string;
};

export function PageHeader({ subtitle }: PageHeaderProps) {
  return (
    <View className="pt-8 pb-2">
      <View className="h-1 w-12 bg-secondary-container rounded-full mb-2" />
      <Text className="text-on-surface-variant text-sm font-label">
        {subtitle}
      </Text>
    </View>
  );
}
