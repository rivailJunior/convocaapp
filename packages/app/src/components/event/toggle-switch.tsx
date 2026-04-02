import { Switch } from 'react-native';

type ToggleSwitchProps = {
  value: boolean;
  onValueChange: (value: boolean) => void;
};

export function ToggleSwitch({ value, onValueChange }: ToggleSwitchProps) {
  return (
    <Switch
      value={value}
      onValueChange={onValueChange}
      trackColor={{ false: '#dadddf', true: '#266829' }}
      thumbColor="#ffffff"
      ios_backgroundColor="#dadddf"
    />
  );
}
