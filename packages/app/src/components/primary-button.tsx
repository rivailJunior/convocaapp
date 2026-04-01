import { Text, TouchableOpacity, View } from 'react-native';


type PrimaryButtonProps = {
  label: string;
  onPress: () => void;
  icon?: React.ReactNode
};

export function PrimaryButton({ label, onPress, icon}: PrimaryButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      className="w-full h-14 rounded-xl bg-primary flex-row items-center justify-center"
      style={{
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
      }}
    >
      <Text className="font-body font-bold text-sm uppercase tracking-wider text-white">
        {label}
      </Text>
      {icon && icon}
    </TouchableOpacity>
  );
}
