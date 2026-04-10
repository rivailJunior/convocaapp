import { Pressable, Text } from 'react-native';

type DrawButtonProps = {
  disabled: boolean;
  onPress: () => void;
};

export function DrawButton({ disabled, onPress }: DrawButtonProps): React.JSX.Element {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      className={`w-full py-5 rounded-xl items-center justify-center mb-8 ${disabled ? 'bg-primary/40' : 'bg-primary shadow-lg active:scale-[0.98]'}`}
    >
      <Text className="font-headline font-extrabold text-lg text-white">
        Sortear!
      </Text>
    </Pressable>
  );
}
