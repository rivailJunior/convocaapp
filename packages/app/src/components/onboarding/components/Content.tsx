import { Text, View } from 'react-native';

export function Content({title, subTitle, className}: {
    title: string;
    subTitle: string;
    className?: string;
}) {
  return (
    <View className={`items-center gap-4 w-full max-w-sm ${className || ''}`}>
      <Text className="font-extrabold text-3xl tracking-tight text-on-surface leading-tight text-center">
        {title}
      </Text>
      <Text className="text-on-surface-variant text-base leading-relaxed text-center">
        {subTitle}
      </Text>
    </View>
  );
}