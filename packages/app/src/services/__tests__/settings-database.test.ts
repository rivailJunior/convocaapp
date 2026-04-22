// Mock expo-sqlite before any imports
const mockDb = {
  execSync: jest.fn(),
  getFirstSync: jest.fn(),
  runSync: jest.fn(),
};

jest.mock('expo-sqlite', () => ({
  openDatabaseSync: jest.fn(() => mockDb),
}));

import type { UserSettingsRow } from '../settings-database';
import type { AppLanguage, ThemeMode } from '@sportspay/shared';

interface SettingsModule {
  getSettings: () => UserSettingsRow;
  updateTheme: (theme: ThemeMode) => void;
  updateLanguage: (language: AppLanguage) => void;
  updateOnboarded: (onboarded: boolean) => void;
  isOnboarded: () => boolean;
  initSettingsDatabase: () => void;
}

const loadModule = (): SettingsModule => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  return require('../settings-database') as SettingsModule;
};

describe('Settings Database', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
  });

  describe('Database Initialization', () => {
    it('should create UserSettings table with CHECK constraints', () => {
      const { initSettingsDatabase } = loadModule();
      initSettingsDatabase();

      expect(mockDb.execSync).toHaveBeenCalledWith(
        expect.stringContaining("CHECK (theme IN ('light', 'dark'))"),
      );
      expect(mockDb.execSync).toHaveBeenCalledWith(
        expect.stringContaining("CHECK (language IN ('pt-BR', 'en-US', 'es-ES'))"),
      );
    });

    it('should insert default row if none exists', () => {
      const { initSettingsDatabase } = loadModule();
      initSettingsDatabase();

      expect(mockDb.runSync).toHaveBeenCalledWith(
        `INSERT OR IGNORE INTO UserSettings (id, theme, language, onboarded) VALUES (1, 'light', 'pt-BR', 0)`,
      );
    });

    it('should not reinitialize if already initialized', () => {
      const { initSettingsDatabase } = loadModule();
      initSettingsDatabase();
      initSettingsDatabase();

      expect(mockDb.execSync).toHaveBeenCalledTimes(1);
      expect(mockDb.runSync).toHaveBeenCalledTimes(1);
    });

    it('should have proper defaults in schema', () => {
      const { initSettingsDatabase } = loadModule();
      initSettingsDatabase();

      const createTableCall = mockDb.execSync.mock.calls[0][0] as string;

      expect(createTableCall).toContain("DEFAULT 'light'");
      expect(createTableCall).toContain("DEFAULT 'pt-BR'");
      expect(createTableCall).toContain('DEFAULT 0');
    });
  });

  describe('getSettings', () => {
    it('should return default settings when no row exists', () => {
      const { getSettings } = loadModule();
      mockDb.getFirstSync.mockReturnValue(null);

      const result = getSettings();

      expect(result).toEqual({
        id: 1,
        theme: 'light',
        language: 'pt-BR',
        onboarded: false,
      });
    });

    it('should return valid settings when row exists with valid values', () => {
      const { getSettings } = loadModule();
      mockDb.getFirstSync.mockReturnValue({
        id: 1,
        theme: 'dark',
        language: 'en-US',
        onboarded: 1,
      });

      const result = getSettings();

      expect(result).toEqual({
        id: 1,
        theme: 'dark',
        language: 'en-US',
        onboarded: true,
      });
    });

    it('should fallback to default theme when invalid theme value exists', () => {
      const { getSettings } = loadModule();
      mockDb.getFirstSync.mockReturnValue({
        id: 1,
        theme: 'invalid_theme',
        language: 'en-US',
        onboarded: 0,
      });

      const result = getSettings();

      expect(result.theme).toBe('light');
      expect(result.language).toBe('en-US');
    });

    it('should fallback to default language when invalid language value exists', () => {
      const { getSettings } = loadModule();
      mockDb.getFirstSync.mockReturnValue({
        id: 1,
        theme: 'dark',
        language: 'invalid_lang',
        onboarded: 0,
      });

      const result = getSettings();

      expect(result.theme).toBe('dark');
      expect(result.language).toBe('pt-BR');
    });

    it('should fallback to defaults when both theme and language are invalid', () => {
      const { getSettings } = loadModule();
      mockDb.getFirstSync.mockReturnValue({
        id: 1,
        theme: 'corrupted',
        language: 'corrupted',
        onboarded: 1,
      });

      const result = getSettings();

      expect(result).toEqual({
        id: 1,
        theme: 'light',
        language: 'pt-BR',
        onboarded: true,
      });
    });

    it('should handle all valid theme values', () => {
      const { getSettings } = loadModule();
      const validThemes = ['light', 'dark'] as const;

      validThemes.forEach((theme) => {
        mockDb.getFirstSync.mockReturnValue({
          id: 1,
          theme,
          language: 'pt-BR',
          onboarded: 0,
        });

        const result = getSettings();
        expect(result.theme).toBe(theme);
      });
    });

    it('should handle all valid language values', () => {
      const { getSettings } = loadModule();
      const validLanguages = ['pt-BR', 'en-US', 'es-ES'] as const;

      validLanguages.forEach((language) => {
        mockDb.getFirstSync.mockReturnValue({
          id: 1,
          theme: 'light',
          language,
          onboarded: 0,
        });

        const result = getSettings();
        expect(result.language).toBe(language);
      });
    });

    it('should correctly convert onboarded boolean', () => {
      const { getSettings } = loadModule();
      const testCases = [
        { onboarded: 1, expected: true },
        { onboarded: 0, expected: false },
        { onboarded: 42, expected: true },
      ];

      testCases.forEach(({ onboarded, expected }) => {
        mockDb.getFirstSync.mockReturnValue({
          id: 1,
          theme: 'light',
          language: 'pt-BR',
          onboarded,
        });

        const result = getSettings();
        expect(result.onboarded).toBe(expected);
      });
    });

    it('should return correct types', () => {
      const { getSettings } = loadModule();
      mockDb.getFirstSync.mockReturnValue({
        id: 1,
        theme: 'light',
        language: 'pt-BR',
        onboarded: 0,
      });

      const result = getSettings();

      expect(typeof result.id).toBe('number');
      expect(['light', 'dark']).toContain(result.theme);
      expect(['pt-BR', 'en-US', 'es-ES']).toContain(result.language);
      expect(typeof result.onboarded).toBe('boolean');
    });
  });

  describe('updateTheme', () => {
    it('should update theme with valid value', () => {
      const { updateTheme } = loadModule();
      updateTheme('dark');

      expect(mockDb.runSync).toHaveBeenCalledWith(
        'UPDATE UserSettings SET theme = ? WHERE id = 1',
        ['dark'],
      );
    });

    it('should update theme with all valid values', () => {
      const { updateTheme } = loadModule();
      const validThemes: Array<'light' | 'dark'> = ['light', 'dark'];

      validThemes.forEach((theme) => {
        updateTheme(theme);
        expect(mockDb.runSync).toHaveBeenLastCalledWith(
          'UPDATE UserSettings SET theme = ? WHERE id = 1',
          [theme],
        );
      });
    });
  });

  describe('updateLanguage', () => {
    it('should update language with valid value', () => {
      const { updateLanguage } = loadModule();
      updateLanguage('en-US');

      expect(mockDb.runSync).toHaveBeenCalledWith(
        'UPDATE UserSettings SET language = ? WHERE id = 1',
        ['en-US'],
      );
    });

    it('should update language with all valid values', () => {
      const { updateLanguage } = loadModule();
      const validLanguages: Array<'pt-BR' | 'en-US' | 'es-ES'> = ['pt-BR', 'en-US', 'es-ES'];

      validLanguages.forEach((language) => {
        updateLanguage(language);
        expect(mockDb.runSync).toHaveBeenLastCalledWith(
          'UPDATE UserSettings SET language = ? WHERE id = 1',
          [language],
        );
      });
    });
  });

  describe('updateOnboarded', () => {
    it('should update onboarded to true', () => {
      const { updateOnboarded } = loadModule();
      updateOnboarded(true);

      expect(mockDb.runSync).toHaveBeenCalledWith(
        'UPDATE UserSettings SET onboarded = ? WHERE id = 1',
        [1],
      );
    });

    it('should update onboarded to false', () => {
      const { updateOnboarded } = loadModule();
      updateOnboarded(false);

      expect(mockDb.runSync).toHaveBeenCalledWith(
        'UPDATE UserSettings SET onboarded = ? WHERE id = 1',
        [0],
      );
    });
  });

  describe('isOnboarded', () => {
    it('should return true when onboarded is 1', () => {
      const { isOnboarded } = loadModule();
      mockDb.getFirstSync.mockReturnValue({ onboarded: 1 });

      expect(isOnboarded()).toBe(true);
    });

    it('should return false when onboarded is 0', () => {
      const { isOnboarded } = loadModule();
      mockDb.getFirstSync.mockReturnValue({ onboarded: 0 });

      expect(isOnboarded()).toBe(false);
    });

    it('should return false when no settings exist', () => {
      const { isOnboarded } = loadModule();
      mockDb.getFirstSync.mockReturnValue(null);

      expect(isOnboarded()).toBe(false);
    });

    it('should query only the onboarded column', () => {
      const { isOnboarded } = loadModule();
      mockDb.getFirstSync.mockReturnValue({ onboarded: 1 });

      isOnboarded();

      expect(mockDb.getFirstSync).toHaveBeenCalledWith(
        'SELECT onboarded FROM UserSettings WHERE id = 1',
      );
    });
  });

  describe('Error Handling', () => {
    it('should log and re-throw when database initialization fails', () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
      const dbError = new Error('disk full');
      mockDb.execSync.mockImplementation(() => {
        throw dbError;
      });

      const { initSettingsDatabase } = loadModule();

      expect(() => initSettingsDatabase()).toThrow('disk full');
      expect(consoleSpy).toHaveBeenCalledWith(
        '[SettingsDB] Failed to initialize database:',
        dbError,
      );

      consoleSpy.mockRestore();
    });

    it('should allow retry after initialization failure', () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
      mockDb.execSync
        .mockImplementationOnce(() => {
          throw new Error('temporary failure');
        })
        .mockImplementation(() => undefined);

      const { initSettingsDatabase } = loadModule();

      expect(() => initSettingsDatabase()).toThrow('temporary failure');

      // Second call should succeed since isInitialized stayed false
      expect(() => initSettingsDatabase()).not.toThrow();

      consoleSpy.mockRestore();
    });
  });
});
