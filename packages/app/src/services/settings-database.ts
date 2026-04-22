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

let dbPromise: Promise<SQLite.SQLiteDatabase> | null = null;
let initPromise: Promise<void> | null = null;

function validateTheme(theme: string): ThemeMode {
  return VALID_THEMES.includes(theme as ThemeMode) ? (theme as ThemeMode) : DEFAULT_THEME;
}

function validateLanguage(language: string): AppLanguage {
  return VALID_LANGUAGES.includes(language as AppLanguage)
    ? (language as AppLanguage)
    : DEFAULT_LANGUAGE;
}

async function ensureInitialized(): Promise<void> {
  if (!initPromise) {
    initPromise = performInit();
  }
  return initPromise;
}

async function performInit(): Promise<void> {
  try {
    const db = await getDb();
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS UserSettings (
        id INTEGER PRIMARY KEY CHECK (id = 1),
        theme TEXT NOT NULL DEFAULT '${DEFAULT_THEME}' CHECK (theme IN (${toSqlList(VALID_THEMES)})),
        language TEXT NOT NULL DEFAULT '${DEFAULT_LANGUAGE}' CHECK (language IN (${toSqlList(VALID_LANGUAGES)})),
        onboarded INTEGER NOT NULL DEFAULT 0
      );
    `);

    // Ensure a single row always exists
    await db.runAsync(
      `INSERT OR IGNORE INTO UserSettings (id, theme, language, onboarded) VALUES (1, '${DEFAULT_THEME}', '${DEFAULT_LANGUAGE}', 0)`,
    );
  } catch (error) {
    initPromise = null; // Allow retry on failure
    console.error('[SettingsDB] Failed to initialize database:', error);
    throw error;
  }
}

async function getDb(): Promise<SQLite.SQLiteDatabase> {
  if (!dbPromise) {
    dbPromise = SQLite.openDatabaseAsync(DB_NAME).catch((error) => {
      dbPromise = null;
      throw error;
    });
  }
  return dbPromise;
}

export async function initSettingsDatabase(): Promise<void> {
  await ensureInitialized();
}

export async function getSettings(): Promise<UserSettingsRow> {
  await ensureInitialized();
  const db = await getDb();
  const row = await db.getFirstAsync<{
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

export async function updateTheme(theme: ThemeMode): Promise<void> {
  await ensureInitialized();
  const db = await getDb();
  await db.runAsync('UPDATE UserSettings SET theme = ? WHERE id = 1', [theme]);
}

export async function updateLanguage(language: AppLanguage): Promise<void> {
  await ensureInitialized();
  const db = await getDb();
  await db.runAsync('UPDATE UserSettings SET language = ? WHERE id = 1', [language]);
}

export async function updateOnboarded(onboarded: boolean): Promise<void> {
  await ensureInitialized();
  const db = await getDb();
  await db.runAsync('UPDATE UserSettings SET onboarded = ? WHERE id = 1', [onboarded ? 1 : 0]);
}

export function _resetForTesting(): void {
  dbPromise = null;
  initPromise = null;
}

export async function isOnboarded(): Promise<boolean> {
  await ensureInitialized();
  const db = await getDb();
  const row = await db.getFirstAsync<{ onboarded: number }>(
    'SELECT onboarded FROM UserSettings WHERE id = 1',
  );
  return row !== null && row.onboarded !== 0;
}
