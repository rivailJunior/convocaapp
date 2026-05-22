import { Pressable, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import type { BottomNavbarAction } from './bottom-navbar-context';

const VARIANT_STYLES = {
  primary: 'bg-primary',
  secondary: 'bg-surface-container border border-outline',
  destructive: 'bg-error',
} as const;

const VARIANT_TEXT_STYLES = {
  primary: 'text-on-primary',
  secondary: 'text-on-surface',
  destructive: 'text-on-error',
} as const;

interface BottomNavbarActionsProps {
  actions: BottomNavbarAction[];
}

const BottomNavbarActions = ({ actions }: BottomNavbarActionsProps) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      className="bg-surface-container-lowest border-t border-outline-variant px-4 pt-3"
      style={{ paddingBottom: Math.max(insets.bottom, 12) }}
    >
      <View className="flex-row gap-3">
        {actions.map((action) => {
          const variant = action.variant ?? 'primary';
          const buttonStyle = VARIANT_STYLES[variant];
          const textStyle = VARIANT_TEXT_STYLES[variant];

          return (
            <Pressable
              key={action.label}
              onPress={action.onPress}
              disabled={action.disabled}
              className={`flex-1 items-center justify-center rounded-full py-3.5 ${buttonStyle} ${
                action.disabled ? 'opacity-50' : ''
              }`}
              accessibilityRole="button"
              accessibilityLabel={action.label}
            >
              <Text className={`text-sm font-bold font-label ${textStyle}`}>{action.label}</Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

export { BottomNavbarActions };
