import * as SQLite from 'expo-sqlite';

const DB_NAME = 'sportspay.db';

let dbPromise: Promise<SQLite.SQLiteDatabase> | null = null;

export async function getDb(): Promise<SQLite.SQLiteDatabase> {
  if (!dbPromise) {
    dbPromise = SQLite.openDatabaseAsync(DB_NAME).catch((error) => {
      dbPromise = null;
      throw error;
    });
  }
  return dbPromise;
}

export function _resetConnectionForTesting(): void {
  dbPromise = null;
}
