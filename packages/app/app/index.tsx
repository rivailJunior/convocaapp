import { ActivityIndicator, View } from 'react-native';
import { Redirect } from 'expo-router';
import { OnboardingPage } from '@/components/onboarding';
import { useLocalSettings } from '@/hooks/use-local-settings';

export default function HomeScreen() {
  const { settings, isLoading } = useLocalSettings();

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-background">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (settings.onboarded) {
    return <Redirect href="/home" />;
  }

  return <OnboardingPage />;
}
