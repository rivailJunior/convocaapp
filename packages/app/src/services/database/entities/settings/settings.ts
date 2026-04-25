import { DEFAULT_LANGUAGE, DEFAULT_THEME } from '../../constants';
import { getAdapter } from '../../database-adapter';

import { validateLanguage } from './language';
import { ensureInitialized } from './setup';
import { validateTheme } from './theme';

import type { UserSettingsEntity } from '../../constants';

export type { UserSettingsEntity } from '../../constants';
export { updateLanguage } from './language';
export { isOnboarded, updateOnboarded } from './onboarding';
export { _resetForTesting, initSettingsDatabase } from './setup';
export { updateTheme } from './theme';

export async function getSettings(): Promise<UserSettingsEntity> {
  await ensureInitialized();
  const db = getAdapter();
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
