import { View } from 'react-native';

type PageIndicatorProps = {
  total: number;
  activeIndex: number;
};

export function PageIndicator({ total, activeIndex }: PageIndicatorProps) {
  return (
    <View className="flex-row items-center justify-center gap-2">
      {Array.from({ length: total }).map((_, i) =>
        i === activeIndex ? (
          <View
            key={i}
            className="w-8 h-2 rounded-full bg-primary"
          />
        ) : (
          <View
            key={i}
            className="w-2 h-2 rounded-full bg-outline-variant opacity-30"
          />
        ),
      )}
    </View>
  );
}
