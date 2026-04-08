import * as SQLite from 'expo-sqlite';

import type { AppLanguage, ThemeMode } from '@sportspay/shared';

export interface UserSettingsRow {
  id: number;
  theme: ThemeMode;
  language: AppLanguage;
  onboarded: boolean;
}

const DB_NAME = 'sportspay.db';

let dbInstance: SQLite.SQLiteDatabase | null = null;

function getDb(): SQLite.SQLiteDatabase {
  if (!dbInstance) {
    dbInstance = SQLite.openDatabaseSync(DB_NAME);
  }
  return dbInstance;
}

export function initSettingsDatabase(): void {
  const db = getDb();
  db.execSync(`
    CREATE TABLE IF NOT EXISTS UserSettings (
      id INTEGER PRIMARY KEY CHECK (id = 1),
      theme TEXT NOT NULL DEFAULT 'light',
      language TEXT NOT NULL DEFAULT 'pt-BR',
      onboarded INTEGER NOT NULL DEFAULT 0
    );
  `);

  // Ensure a single row always exists
  db.runSync(
    `INSERT OR IGNORE INTO UserSettings (id, theme, language, onboarded) VALUES (1, 'light', 'pt-BR', 0)`
  );
}

export function getSettings(): UserSettingsRow {
  const db = getDb();
  const row = db.getFirstSync<{
    id: number;
    theme: string;
    language: string;
    onboarded: number;
  }>('SELECT * FROM UserSettings WHERE id = 1');

  if (!row) {
    return { id: 1, theme: 'light', language: 'pt-BR', onboarded: false };
  }

  return {
    id: row.id,
    theme: row.theme as ThemeMode,
    language: row.language as AppLanguage,
    onboarded: row.onboarded === 1,
  };
}

export function updateTheme(theme: ThemeMode): void {
  const db = getDb();
  db.runSync('UPDATE UserSettings SET theme = ? WHERE id = 1', [theme]);
}

export function updateLanguage(language: AppLanguage): void {
  const db = getDb();
  db.runSync('UPDATE UserSettings SET language = ? WHERE id = 1', [language]);
}

export function updateOnboarded(onboarded: boolean): void {
  const db = getDb();
  db.runSync('UPDATE UserSettings SET onboarded = ? WHERE id = 1', [onboarded ? 1 : 0]);
}

export function isOnboarded(): boolean {
  return getSettings().onboarded;
}
