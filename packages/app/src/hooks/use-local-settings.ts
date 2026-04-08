import { useCallback, useEffect, useState } from 'react';

import type { AppLanguage, AppSettings, ThemeMode } from '@sportspay/shared';

import {
  getSettings,
  initSettingsDatabase,
  updateLanguage as dbUpdateLanguage,
  updateOnboarded as dbUpdateOnboarded,
  updateTheme as dbUpdateTheme,
} from '../services/settings-database';

export interface LocalAppSettings extends AppSettings {
  onboarded: boolean;
}

export function useLocalSettings(versionOverride?: string): {
  settings: LocalAppSettings;
  isLoading: boolean;
  setTheme: (theme: ThemeMode) => void;
  setLanguage: (language: AppLanguage) => void;
  setOnboarded: (onboarded: boolean) => void;
} {
  const [isLoading, setIsLoading] = useState(true);
  const [settings, setSettings] = useState<LocalAppSettings>({
    theme: 'light',
    language: 'pt-BR',
    version: versionOverride ?? '1.0.0',
    onboarded: false,
  });

  useEffect(() => {
    initSettingsDatabase();
    const stored = getSettings();
    setSettings({
      theme: stored.theme,
      language: stored.language,
      version: versionOverride ?? '1.0.0',
      onboarded: stored.onboarded,
    });
    setIsLoading(false);
  }, [versionOverride]);

  const setTheme = useCallback((theme: ThemeMode) => {
    dbUpdateTheme(theme);
    setSettings((prev) => ({ ...prev, theme }));
  }, []);

  const setLanguage = useCallback((language: AppLanguage) => {
    dbUpdateLanguage(language);
    setSettings((prev) => ({ ...prev, language }));
  }, []);

  const setOnboarded = useCallback((onboarded: boolean) => {
    dbUpdateOnboarded(onboarded);
    setSettings((prev) => ({ ...prev, onboarded }));
  }, []);

  return { settings, isLoading, setTheme, setLanguage, setOnboarded };
}
