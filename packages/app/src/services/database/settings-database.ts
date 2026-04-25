import { DEFAULT_LANGUAGE, DEFAULT_THEME } from './constants';
import type { UserSettingsRow } from './constants';
import { validateLanguage } from './language';
import { ensureInitialized, getDb } from './setup';
import { validateTheme } from './theme';

export type { UserSettingsRow } from './constants';
export { updateLanguage } from './language';
export { isOnboarded, updateOnboarded } from './onboarding';
export { _resetForTesting, initSettingsDatabase } from './setup';
export { updateTheme } from './theme';

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
