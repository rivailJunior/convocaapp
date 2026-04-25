import { ensureInitialized, getDb } from './setup';

export async function updateOnboarded(onboarded: boolean): Promise<void> {
  await ensureInitialized();
  const db = await getDb();
  await db.runAsync('UPDATE UserSettings SET onboarded = ? WHERE id = 1', [onboarded ? 1 : 0]);
}

export async function isOnboarded(): Promise<boolean> {
  await ensureInitialized();
  const db = await getDb();
  const row = await db.getFirstAsync<{ onboarded: number }>(
    'SELECT onboarded FROM UserSettings WHERE id = 1',
  );
  return row !== null && row.onboarded !== 0;
}
