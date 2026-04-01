import { useState, useCallback } from 'react';

import type { AppSettings, ThemeMode, AppLanguage } from '../types';

const DEFAULT_SETTINGS: AppSettings = {
  theme: 'light',
  language: 'pt-BR',
  version: '1.0.0',
};

export function useSettings(versionOverride?: string): {
  settings: AppSettings;
  setTheme: (theme: ThemeMode) => void;
  setLanguage: (language: AppLanguage) => void;
} {
  const [settings, setSettings] = useState<AppSettings>({
    ...DEFAULT_SETTINGS,
    version: versionOverride ?? DEFAULT_SETTINGS.version,
  });

  const setTheme = useCallback((theme: ThemeMode) => {
    setSettings((prev) => ({ ...prev, theme }));
  }, []);

  const setLanguage = useCallback((language: AppLanguage) => {
    setSettings((prev) => ({ ...prev, language }));
  }, []);

  return { settings, setTheme, setLanguage };
}
