import { View } from 'react-native';

import { FormLabel } from './form-label';

import type { ReactNode } from 'react';

type FormSectionProps = {
  label: string;
  optional?: boolean;
  children: ReactNode;
};

export function FormSection({ label, optional, children }: FormSectionProps) {
  return (
    <View className="gap-2">
      <FormLabel label={label} optional={optional} />
      {children}
    </View>
  );
}
