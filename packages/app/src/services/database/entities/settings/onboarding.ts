import { getAdapter } from '../../database-adapter';

import { ensureInitialized } from './setup';

export async function updateOnboarded(onboarded: boolean): Promise<void> {
  await ensureInitialized();
  const db = getAdapter();
  await db.runAsync('UPDATE UserSettings SET onboarded = ? WHERE id = 1', [onboarded ? 1 : 0]);
}

export async function isOnboarded(): Promise<boolean> {
  await ensureInitialized();
  const db = getAdapter();
  const row = await db.getFirstAsync<{ onboarded: number }>(
    'SELECT onboarded FROM UserSettings WHERE id = 1',
  );
  return row !== null && row.onboarded !== 0;
}
