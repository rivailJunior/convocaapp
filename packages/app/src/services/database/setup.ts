import { _resetConnectionForTesting, getDb } from './connection';
import {
  DEFAULT_LANGUAGE,
  DEFAULT_THEME,
  toSqlList,
  VALID_LANGUAGES,
  VALID_THEMES,
} from './constants';

let initPromise: Promise<void> | null = null;

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

export async function ensureInitialized(): Promise<void> {
  if (!initPromise) {
    initPromise = performInit();
  }
  return initPromise;
}

export async function initSettingsDatabase(): Promise<void> {
  await ensureInitialized();
}

export function _resetForTesting(): void {
  _resetConnectionForTesting();
  initPromise = null;
}
