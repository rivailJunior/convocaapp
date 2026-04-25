import type { AppLanguage } from '@sportspay/shared';

import { DEFAULT_LANGUAGE, VALID_LANGUAGES } from './constants';
import { ensureInitialized, getDb } from './setup';

export function validateLanguage(language: string): AppLanguage {
  return VALID_LANGUAGES.includes(language as AppLanguage)
    ? (language as AppLanguage)
    : DEFAULT_LANGUAGE;
}

export async function updateLanguage(language: AppLanguage): Promise<void> {
  await ensureInitialized();
  const db = await getDb();
  await db.runAsync('UPDATE UserSettings SET language = ? WHERE id = 1', [language]);
}
