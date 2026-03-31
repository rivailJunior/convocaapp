import { Text, View } from 'react-native';

export const ConfirmationMessage = ({ name, status }: { name: string; status: string }) => {
  return (
    <Text className="text-on-surface/80 text-[10px]">
      {name} ({status})
    </Text>
  );
};