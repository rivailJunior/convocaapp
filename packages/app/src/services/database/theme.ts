import { getDb } from './connection';
import { DEFAULT_THEME, VALID_THEMES } from './constants';
import { ensureInitialized } from './setup';

import type { ThemeMode } from '@sportspay/shared';

export function validateTheme(theme: string): ThemeMode {
  return VALID_THEMES.includes(theme as ThemeMode) ? (theme as ThemeMode) : DEFAULT_THEME;
}

export async function updateTheme(theme: ThemeMode): Promise<void> {
  await ensureInitialized();
  const db = await getDb();
  await db.runAsync('UPDATE UserSettings SET theme = ? WHERE id = 1', [theme]);
}
