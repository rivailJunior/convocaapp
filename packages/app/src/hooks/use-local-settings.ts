import { useCallback, useEffect, useRef, useState } from 'react';



import {
  updateLanguage as dbUpdateLanguage,
  updateOnboarded as dbUpdateOnboarded,
  updateTheme as dbUpdateTheme,
  getSettings,
  initSettingsDatabase,
} from '../services/database/entities/settings/settings';

import type { AppLanguage, AppSettings, ThemeMode } from '@sportspay/shared';


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
  const versionRef = useRef(versionOverride ?? '1.0.0');
  versionRef.current = versionOverride ?? '1.0.0';

  const [isLoading, setIsLoading] = useState(true);
  const [settings, setSettings] = useState<LocalAppSettings>({
    theme: 'light',
    language: 'pt-BR',
    version: versionRef.current,
    onboarded: false,
  });

  useEffect(() => {
    let cancelled = false;

    const loadSettings = async () => {
      try {
        await initSettingsDatabase();
        const stored = await getSettings();
        if (!cancelled) {
          setSettings({
            theme: stored.theme,
            language: stored.language,
            version: versionRef.current,
            onboarded: stored.onboarded,
          });
          setIsLoading(false);
        }
      } catch (error) {
        console.error('[useLocalSettings] Failed to load settings:', error);
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    loadSettings();

    return () => {
      cancelled = true;
    };
  }, []);

  const setTheme = useCallback(
    (theme: ThemeMode) => {
      setSettings((prev) => ({ ...prev, theme }));
      dbUpdateTheme(theme).catch((error: unknown) => {
        console.error('[useLocalSettings] Failed to update theme:', error);
        setSettings((prev) => ({ ...prev, theme: settings.theme }));
      });
    },
    [settings.theme],
  );

  const setLanguage = useCallback(
    (language: AppLanguage) => {
      setSettings((prev) => ({ ...prev, language }));
      dbUpdateLanguage(language).catch((error: unknown) => {
        console.error('[useLocalSettings] Failed to update language:', error);
        setSettings((prev) => ({ ...prev, language: settings.language }));
      });
    },
    [settings.language],
  );

  const setOnboarded = useCallback(
    (onboarded: boolean) => {
      setSettings((prev) => ({ ...prev, onboarded }));
      dbUpdateOnboarded(onboarded).catch((error: unknown) => {
        console.error('[useLocalSettings] Failed to update onboarded:', error);
        setSettings((prev) => ({ ...prev, onboarded: settings.onboarded }));
      });
    },
    [settings.onboarded],
  );

  return { settings, isLoading, setTheme, setLanguage, setOnboarded };
}
