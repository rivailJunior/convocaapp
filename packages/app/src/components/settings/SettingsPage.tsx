import Constants from 'expo-constants';
import { router } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import { useCallback } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useLocalSettings } from '../../hooks/use-local-settings';
import { AboutSection } from './AboutSection';
import { AppearanceSection } from './AppearanceSection';
import { DataSection } from './DataSection';
import { FutureSection } from './FutureSection';

export function SettingsPage(): React.JSX.Element {
  const appVersion = Constants.expoConfig?.version ?? '1.0.0';
  const { settings, setTheme, setLanguage } = useLocalSettings(appVersion);

  const handleLanguagePress = useCallback(() => {
    const nextLanguage =
      settings.language === 'pt-BR' ? 'en-US' : settings.language === 'en-US' ? 'es-ES' : 'pt-BR';
    setLanguage(nextLanguage);
  }, [settings.language, setLanguage]);

  const handleExportPress = useCallback(() => {}, []);
  const handleImportPress = useCallback(() => {}, []);
  const handlePrivacyPress = useCallback(() => {}, []);
  const handleTermsPress = useCallback(() => {}, []);
  const handleFeedbackPress = useCallback(() => {}, []);
  const handleReturn = useCallback(() => {
    router.back();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-surface">
      <View className="flex-row items-center px-4 h-14">
        <Pressable
          onPress={handleReturn}
          className="w-10 h-10 rounded-full items-center justify-center active:opacity-70"
        >
          <ArrowLeft size={24} color="#266829" />
        </Pressable>
        <Text className="ml-4 text-xl font-bold text-on-surface font-headline tracking-tight">
          Configurações
        </Text>
      </View>

      <View className="bg-surface-container-low h-px w-full" />

      <ScrollView
        className="flex-1 px-4 pt-6"
        contentContainerClassName="pb-32 gap-4"
        showsVerticalScrollIndicator={false}
      >
        <AppearanceSection
          theme={settings.theme}
          language={settings.language}
          onThemeChange={setTheme}
          onLanguagePress={handleLanguagePress}
        />

        <DataSection onExportPress={handleExportPress} onImportPress={handleImportPress} />

        <AboutSection
          version={settings.version}
          onPrivacyPress={handlePrivacyPress}
          onTermsPress={handleTermsPress}
          onFeedbackPress={handleFeedbackPress}
        />

        <FutureSection />

        <View className="pt-8 items-center">
          <View className="w-12 h-1 bg-surface-container-high rounded-full opacity-50" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
