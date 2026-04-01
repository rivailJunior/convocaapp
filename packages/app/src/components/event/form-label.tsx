import { Text, View } from 'react-native';

type FormLabelProps = {
  label: string;
  optional?: boolean;
};

export function FormLabel({ label, optional }: FormLabelProps) {
  return (
    <View className="flex-row items-baseline gap-1 ml-1">
      <Text className="text-sm font-bold font-headline text-on-surface">
        {label}
      </Text>
      {optional && (
        <Text className="text-xs font-label text-outline-variant">
          (opcional)
        </Text>
      )}
    </View>
  );
}
