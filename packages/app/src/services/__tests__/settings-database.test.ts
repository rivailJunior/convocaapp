import {
  _resetForTesting,
  getSettings,
  initSettingsDatabase,
  isOnboarded,
  updateLanguage,
  updateOnboarded,
  updateTheme,
} from '../database/entities/settings/settings';

import type * as SQLiteTypes from 'expo-sqlite';


const mockExecAsync = jest.fn().mockResolvedValue(undefined);
const mockRunAsync = jest.fn().mockResolvedValue(undefined);
const mockGetFirstAsync = jest.fn().mockResolvedValue(null);

const mockDb: Partial<SQLiteTypes.SQLiteDatabase> = {
  execAsync: mockExecAsync,
  runAsync: mockRunAsync,
  getFirstAsync: mockGetFirstAsync,
};

jest.mock('expo-sqlite', () => ({
  openDatabaseAsync: jest.fn().mockImplementation(() => Promise.resolve(mockDb)),
}));

describe('settings-database', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    _resetForTesting();
  });

  describe('initSettingsDatabase', () => {
    it('creates the UserSettings table and inserts default row', async () => {
      await initSettingsDatabase();

      expect(mockExecAsync).toHaveBeenCalledTimes(1);
      expect(mockExecAsync).toHaveBeenCalledWith(
        expect.stringContaining('CREATE TABLE IF NOT EXISTS UserSettings'),
      );
      expect(mockRunAsync).toHaveBeenCalledTimes(1);
      expect(mockRunAsync).toHaveBeenCalledWith(
        expect.stringContaining('INSERT OR IGNORE INTO UserSettings'),
      );
    });

    it('reuses the same init promise on subsequent calls', async () => {
      await initSettingsDatabase();
      await initSettingsDatabase();

      expect(mockExecAsync).toHaveBeenCalledTimes(1);
    });

    it('retries initialization after a failure', async () => {
      mockExecAsync.mockRejectedValueOnce(new Error('DB init failed'));

      await expect(initSettingsDatabase()).rejects.toThrow('DB init failed');

      mockExecAsync.mockResolvedValueOnce(undefined);
      await expect(initSettingsDatabase()).resolves.toBeUndefined();

      expect(mockExecAsync).toHaveBeenCalledTimes(2);
    });
  });

  describe('getSettings', () => {
    it('returns defaults when no row is found', async () => {
      mockGetFirstAsync.mockResolvedValueOnce(null);

      const settings = await getSettings();

      expect(settings).toEqual({
        id: 1,
        theme: 'light',
        language: 'pt-BR',
        onboarded: false,
      });
    });

    it('returns validated row when data exists', async () => {
      mockGetFirstAsync.mockResolvedValueOnce({
        id: 1,
        theme: 'dark',
        language: 'en-US',
        onboarded: 1,
      });

      const settings = await getSettings();

      expect(settings).toEqual({
        id: 1,
        theme: 'dark',
        language: 'en-US',
        onboarded: true,
      });
    });

    it('converts onboarded 0 to false', async () => {
      mockGetFirstAsync.mockResolvedValueOnce({
        id: 1,
        theme: 'light',
        language: 'pt-BR',
        onboarded: 0,
      });

      const settings = await getSettings();

      expect(settings.onboarded).toBe(false);
    });

    it('falls back to default theme for invalid theme value', async () => {
      mockGetFirstAsync.mockResolvedValueOnce({
        id: 1,
        theme: 'invalid-theme',
        language: 'pt-BR',
        onboarded: 0,
      });

      const settings = await getSettings();

      expect(settings.theme).toBe('light');
    });

    it('falls back to default language for invalid language value', async () => {
      mockGetFirstAsync.mockResolvedValueOnce({
        id: 1,
        theme: 'dark',
        language: 'fr-FR',
        onboarded: 0,
      });

      const settings = await getSettings();

      expect(settings.language).toBe('pt-BR');
    });
  });

  describe('updateTheme', () => {
    it('runs UPDATE with the given theme', async () => {
      await updateTheme('dark');

      expect(mockRunAsync).toHaveBeenCalledWith('UPDATE UserSettings SET theme = ? WHERE id = 1', [
        'dark',
      ]);
    });
  });

  describe('updateLanguage', () => {
    it('runs UPDATE with the given language', async () => {
      await updateLanguage('es-ES');

      expect(mockRunAsync).toHaveBeenCalledWith(
        'UPDATE UserSettings SET language = ? WHERE id = 1',
        ['es-ES'],
      );
    });
  });

  describe('updateOnboarded', () => {
    it('stores 1 when onboarded is true', async () => {
      await updateOnboarded(true);

      expect(mockRunAsync).toHaveBeenCalledWith(
        'UPDATE UserSettings SET onboarded = ? WHERE id = 1',
        [1],
      );
    });

    it('stores 0 when onboarded is false', async () => {
      await updateOnboarded(false);

      expect(mockRunAsync).toHaveBeenCalledWith(
        'UPDATE UserSettings SET onboarded = ? WHERE id = 1',
        [0],
      );
    });
  });

  describe('isOnboarded', () => {
    it('returns false when row is null', async () => {
      mockGetFirstAsync.mockResolvedValueOnce(null);

      const result = await isOnboarded();

      expect(result).toBe(false);
    });

    it('returns false when onboarded is 0', async () => {
      mockGetFirstAsync.mockResolvedValueOnce({ onboarded: 0 });

      const result = await isOnboarded();

      expect(result).toBe(false);
    });

    it('returns true when onboarded is 1', async () => {
      mockGetFirstAsync.mockResolvedValueOnce({ onboarded: 1 });

      const result = await isOnboarded();

      expect(result).toBe(true);
    });
  });
});
