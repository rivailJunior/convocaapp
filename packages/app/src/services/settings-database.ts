import * as SQLite from 'expo-sqlite';

import type { AppLanguage, ThemeMode } from '@sportspay/shared';

const VALID_THEMES: ThemeMode[] = ['light', 'dark'];
const VALID_LANGUAGES: AppLanguage[] = ['pt-BR', 'en-US', 'es-ES'];
const DEFAULT_THEME: ThemeMode = 'light';
const DEFAULT_LANGUAGE: AppLanguage = 'pt-BR';

const toSqlList = (values: readonly string[]): string => values.map((v) => `'${v}'`).join(', ');

export interface UserSettingsRow {
  id: number;
  theme: ThemeMode;
  language: AppLanguage;
  onboarded: boolean;
}

const DB_NAME = 'sportspay.db';

let dbInstance: SQLite.SQLiteDatabase | null = null;
let isInitialized = false;

function validateTheme(theme: string): ThemeMode {
  return VALID_THEMES.includes(theme as ThemeMode) ? (theme as ThemeMode) : DEFAULT_THEME;
}

function validateLanguage(language: string): AppLanguage {
  return VALID_LANGUAGES.includes(language as AppLanguage)
    ? (language as AppLanguage)
    : DEFAULT_LANGUAGE;
}

function ensureInitialized(): void {
  if (!isInitialized) {
    try {
      const db = getDb();
      db.execSync(`
        CREATE TABLE IF NOT EXISTS UserSettings (
          id INTEGER PRIMARY KEY CHECK (id = 1),
          theme TEXT NOT NULL DEFAULT '${DEFAULT_THEME}' CHECK (theme IN (${toSqlList(VALID_THEMES)})),
          language TEXT NOT NULL DEFAULT '${DEFAULT_LANGUAGE}' CHECK (language IN (${toSqlList(VALID_LANGUAGES)})),
          onboarded INTEGER NOT NULL DEFAULT 0
        );
      `);

      // Ensure a single row always exists
      db.runSync(
        `INSERT OR IGNORE INTO UserSettings (id, theme, language, onboarded) VALUES (1, '${DEFAULT_THEME}', '${DEFAULT_LANGUAGE}', 0)`,
      );

      isInitialized = true;
    } catch (error) {
      console.error('[SettingsDB] Failed to initialize database:', error);
      throw error;
    }
  }
}

function getDb(): SQLite.SQLiteDatabase {
  if (!dbInstance) {
    dbInstance = SQLite.openDatabaseSync(DB_NAME);
  }
  return dbInstance;
}

export function initSettingsDatabase(): void {
  ensureInitialized();
}

export function getSettings(): UserSettingsRow {
  ensureInitialized();
  const db = getDb();
  const row = db.getFirstSync<{
    id: number;
    theme: string;
    language: string;
    onboarded: number;
  }>('SELECT * FROM UserSettings WHERE id = 1');

  if (!row) {
    return { id: 1, theme: DEFAULT_THEME, language: DEFAULT_LANGUAGE, onboarded: false };
  }

  return {
    id: row.id,
    theme: validateTheme(row.theme),
    language: validateLanguage(row.language),
    onboarded: row.onboarded !== 0,
  };
}

export function updateTheme(theme: ThemeMode): void {
  ensureInitialized();
  const db = getDb();
  db.runSync('UPDATE UserSettings SET theme = ? WHERE id = 1', [theme]);
}

export function updateLanguage(language: AppLanguage): void {
  ensureInitialized();
  const db = getDb();
  db.runSync('UPDATE UserSettings SET language = ? WHERE id = 1', [language]);
}

export function updateOnboarded(onboarded: boolean): void {
  ensureInitialized();
  const db = getDb();
  db.runSync('UPDATE UserSettings SET onboarded = ? WHERE id = 1', [onboarded ? 1 : 0]);
}

export function isOnboarded(): boolean {
  ensureInitialized();
  const db = getDb();
  const row = db.getFirstSync<{ onboarded: number }>(
    'SELECT onboarded FROM UserSettings WHERE id = 1',
  );
  return row !== null && row.onboarded !== 0;
}
