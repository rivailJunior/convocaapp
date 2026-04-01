import { View } from 'react-native';
import { FormLabel } from './form-label';

type FormSectionProps = {
  label: string;
  optional?: boolean;
  children: React.ReactNode;
};

export function FormSection({ label, optional, children }: FormSectionProps) {
  return (
    <View className="gap-2">
      <FormLabel label={label} optional={optional} />
      {children}
    </View>
  );
}
