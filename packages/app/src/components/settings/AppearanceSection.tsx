import { Pressable, Text, View } from 'react-native';

import { APP_LANGUAGES, THEME_LABELS } from '@sportspay/shared';

import type { AppLanguage, ThemeMode } from '@sportspay/shared';

interface AppearanceSectionProps {
  theme: ThemeMode;
  language: AppLanguage;
  onThemeChange: (theme: ThemeMode) => void;
  onLanguagePress: () => void;
}

export function AppearanceSection({
  theme,
  language,
  onThemeChange,
  onLanguagePress,
}: AppearanceSectionProps): React.JSX.Element {
  return (
    <View>
      <Text className="text-on-surface-variant font-headline font-bold text-xs mb-3 ml-1 uppercase tracking-widest">
        Aparência
      </Text>
      <View className="bg-surface-container-lowest rounded-xl overflow-hidden">
        <View className="flex-row items-center justify-between p-4">
          <Text className="font-medium text-on-surface">Tema</Text>
          <View className="flex-row bg-surface-container-high p-1 rounded-full gap-1">
            <Pressable
              onPress={() => onThemeChange('light')}
              className={`px-4 py-1.5 rounded-full ${
                theme === 'light'
                  ? 'bg-surface-container-lowest'
                  : ''
              }`}
            >
              <Text
                className={`text-xs font-bold ${
                  theme === 'light'
                    ? 'text-on-primary-container'
                    : 'text-on-surface-variant'
                }`}
              >
                {THEME_LABELS.light}
              </Text>
            </Pressable>
            <Pressable
              onPress={() => onThemeChange('dark')}
              className={`px-4 py-1.5 rounded-full ${
                theme === 'dark'
                  ? 'bg-surface-container-lowest'
                  : ''
              }`}
            >
              <Text
                className={`text-xs font-bold ${
                  theme === 'dark'
                    ? 'text-on-primary-container'
                    : 'text-on-surface-variant'
                }`}
              >
                {THEME_LABELS.dark}
              </Text>
            </Pressable>
          </View>
        </View>
        <Pressable
          onPress={onLanguagePress}
          className="flex-row items-center justify-between p-4 active:opacity-70"
        >
          <Text className="font-medium text-on-surface">Idioma</Text>
          <View className="flex-row items-center gap-2">
            <Text className="text-on-surface-variant text-sm">
              {APP_LANGUAGES[language]}
            </Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
}
