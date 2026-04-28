import { getAdapter } from '../../database-adapter';

import type { CreateRecurrentEventInput, RecurrentEventEntity } from '@sportspay/shared';

export type { CreateRecurrentEventInput, RecurrentEventEntity } from '@sportspay/shared';

let eventInitPromise: Promise<void> | null = null;

async function performEventInit(): Promise<void> {
  try {
    const db = getAdapter();
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS RecurrentEvents (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        dateTime TEXT NOT NULL,
        location TEXT NOT NULL DEFAULT '',
        notes TEXT NOT NULL DEFAULT '',
        isRecurring INTEGER NOT NULL DEFAULT 0,
        frequency TEXT NOT NULL DEFAULT 'weekly',
        selectedDays TEXT NOT NULL DEFAULT '[]',
        endDate TEXT NOT NULL DEFAULT '',
        createdAt TEXT NOT NULL DEFAULT (datetime('now'))
      );
    `);
  } catch (error) {
    eventInitPromise = null;
    console.error('[EventDB] Failed to initialize event table:', error);
    throw error;
  }
}

async function ensureEventInitialized(): Promise<void> {
  if (!eventInitPromise) {
    eventInitPromise = performEventInit();
  }
  return eventInitPromise;
}

export async function initEventDatabase(): Promise<void> {
  await ensureEventInitialized();
}

export async function createRecurrentEvent(input: CreateRecurrentEventInput): Promise<number> {
  await ensureEventInitialized();
  const db = getAdapter();

  const result = await db.runAsync(
    `INSERT INTO RecurrentEvents (name, dateTime, location, notes, isRecurring, frequency, selectedDays, endDate)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      input.name,
      input.dateTime,
      input.location ?? '',
      input.notes ?? '',
      input.isRecurring ? 1 : 0,
      input.frequency,
      JSON.stringify(input.selectedDays),
      input.endDate ?? '',
    ],
  );

  return result.lastInsertRowId;
}

function mapRowToEntity(row: Record<string, unknown>): RecurrentEventEntity {
  return {
    id: row.id as number,
    name: row.name as string,
    dateTime: row.dateTime as string,
    location: row.location as string,
    notes: row.notes as string,
    isRecurring: (row.isRecurring as number) !== 0,
    frequency: row.frequency as string,
    selectedDays: JSON.parse((row.selectedDays as string) || '[]') as number[],
    endDate: row.endDate as string,
    createdAt: row.createdAt as string,
  };
}

export async function getRecurrentEvents(): Promise<RecurrentEventEntity[]> {
  await ensureEventInitialized();
  const db = getAdapter();
  const rows = await db.getAllAsync<Record<string, unknown>>(
    'SELECT * FROM RecurrentEvents ORDER BY createdAt DESC',
  );
  return rows.map(mapRowToEntity);
}

export async function getRecurrentEventById(id: number): Promise<RecurrentEventEntity | null> {
  await ensureEventInitialized();
  const db = getAdapter();
  const row = await db.getFirstAsync<Record<string, unknown>>(
    'SELECT * FROM RecurrentEvents WHERE id = ?',
    [id],
  );
  if (!row) return null;
  return mapRowToEntity(row);
}

export async function deleteRecurrentEvent(id: number): Promise<void> {
  await ensureEventInitialized();
  const db = getAdapter();
  await db.runAsync('DELETE FROM RecurrentEvents WHERE id = ?', [id]);
}
