import { Pressable, Text } from 'react-native';

type DrawButtonProps = {
  disabled?: boolean;
  onPress: () => void;
};

export function DrawButton({ disabled, onPress }: DrawButtonProps): React.JSX.Element {

  const disabledStyle = disabled ? 'bg-primary/40' : 'bg-primary';

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      className={`w-full py-5 rounded-xl items-center justify-center mb-8 ${disabledStyle}`}
    >
      <Text className="font-headline font-extrabold text-lg text-white">
        Sortear!
      </Text>
    </Pressable>
  );
}
