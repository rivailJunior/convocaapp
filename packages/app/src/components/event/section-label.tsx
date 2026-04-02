import { Text } from 'react-native';

type SectionLabelProps = {
  label: string;
};

export function SectionLabel({ label }: SectionLabelProps) {
  return (
    <Text className="text-xs font-bold font-headline text-on-surface-variant uppercase tracking-wider">
      {label}
    </Text>
  );
}
