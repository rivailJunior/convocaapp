import type { ExpoConfig } from 'expo/config';


const config: ExpoConfig = {
  name: 'SportsPay',
  slug: 'sportspay',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/icon.png',
  scheme: 'sportspay',
  userInterfaceStyle: 'light',
  splash: {
    image: './assets/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff',
  },
  ios: {
    supportsTablet: false,
    bundleIdentifier: 'com.sportspay.app',
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#ffffff',
    },
    package: 'com.sportspay.app',
  },
  plugins: ['expo-router', 'expo-secure-store', '@react-native-community/datetimepicker'],
  experiments: {
    typedRoutes: true,
  },
};

export default config;
