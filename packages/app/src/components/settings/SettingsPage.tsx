import { Alert, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Constants from 'expo-constants';
import { useCallback, useState } from 'react';

import { useLocalSettings } from '../../hooks/use-local-settings';
import { exportDatabase, importDatabase } from '../../services/data-export-import';
import { AboutSection } from './AboutSection';
import { AppearanceSection } from './AppearanceSection';
import { DataSection } from './DataSection';
import { FutureSection } from './FutureSection';
import { PrivacyModal } from './PrivacyModal';
import { TermsModal } from './TermsModal';

export function SettingsPage(): React.JSX.Element {
  const appVersion = Constants.expoConfig?.version ?? '1.0.0';
  const { settings, setTheme } = useLocalSettings(appVersion);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);

  const handleExportPress = useCallback(async () => {
    console.log('handle Export');
    try {
      await exportDatabase();
      Alert.alert('Dados exportados', 'Os dados foram copiados para a área de transferência', [
        { text: 'OK', style: 'default' },
      ]);
    } catch (error) {
      Alert.alert('Erro ao exportar', error instanceof Error ? error.message : 'Tente novamente', [
        { text: 'OK', style: 'default' },
      ]);
    }
  }, []);

  const handleImportPress = useCallback(async () => {
    try {
      await importDatabase();
      Alert.alert('Dados importados', 'Os dados foram restaurados com sucesso', [
        { text: 'OK', style: 'default' },
      ]);
    } catch (error) {
      Alert.alert('Erro ao importar', error instanceof Error ? error.message : 'Tente novamente', [
        { text: 'OK', style: 'default' },
      ]);
    }
  }, []);
  const handlePrivacyPress = useCallback(() => {
    setShowPrivacyModal(true);
  }, []);

  const handleTermsPress = useCallback(() => {
    setShowTermsModal(true);
  }, []);

  const handleFeedbackPress = useCallback(() => {
    // Feedback disabled
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-surface" edges={['top', 'left', 'right']}>
      <View className="px-4 pt-4 pb-2">
        <Text className="text-2xl font-bold text-on-surface font-headline tracking-tight">
          Configurações
        </Text>
      </View>

      <View className="bg-surface-container-low h-px w-full" />

      <ScrollView
        className="flex-1 px-4 pt-6"
        contentContainerClassName="pb-32 gap-4"
        showsVerticalScrollIndicator={false}
      >
        <AppearanceSection theme={settings.theme} onThemeChange={setTheme} />

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

      <PrivacyModal visible={showPrivacyModal} onClose={() => setShowPrivacyModal(false)} />
      <TermsModal visible={showTermsModal} onClose={() => setShowTermsModal(false)} />
    </SafeAreaView>
  );
}
