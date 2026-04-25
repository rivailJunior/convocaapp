import { getAdapter } from './adapter';

import type { Sport } from '@sportspay/shared';

export interface GroupRow {
  id: number;
  name: string;
  sport: Sport;
  pixKey: string;
  createdAt: string;
}

interface GroupParticipantRow {
  id: number;
  groupId: number;
  name: string;
}

export interface GroupWithParticipants extends GroupRow {
  participants: { id: string; name: string }[];
}

export interface CreateGroupInput {
  name: string;
  sport: Sport;
  pixKey: string;
  participants: { name: string }[];
}

let groupInitPromise: Promise<void> | null = null;

async function performGroupInit(): Promise<void> {
  try {
    const db = getAdapter();
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS Groups (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        sport TEXT NOT NULL,
        pixKey TEXT NOT NULL DEFAULT '',
        createdAt TEXT NOT NULL DEFAULT (datetime('now'))
      );
    `);

    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS GroupParticipants (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        groupId INTEGER NOT NULL,
        name TEXT NOT NULL,
        FOREIGN KEY (groupId) REFERENCES Groups(id) ON DELETE CASCADE
      );
    `);
  } catch (error) {
    groupInitPromise = null;
    console.error('[GroupDB] Failed to initialize group tables:', error);
    throw error;
  }
}

async function ensureGroupInitialized(): Promise<void> {
  if (!groupInitPromise) {
    groupInitPromise = performGroupInit();
  }
  return groupInitPromise;
}

export async function initGroupDatabase(): Promise<void> {
  await ensureGroupInitialized();
}

export async function createGroup(input: CreateGroupInput): Promise<number> {
  await ensureGroupInitialized();
  const db = getAdapter();

  let groupId = 0;

  await db.withTransactionAsync(async () => {
    const result = await db.runAsync('INSERT INTO Groups (name, sport, pixKey) VALUES (?, ?, ?)', [
      input.name,
      input.sport,
      input.pixKey,
    ]);
    groupId = result.lastInsertRowId;

    for (const participant of input.participants) {
      await db.runAsync('INSERT INTO GroupParticipants (groupId, name) VALUES (?, ?)', [
        groupId,
        participant.name,
      ]);
    }
  });

  return groupId;
}

export async function getGroups(): Promise<GroupRow[]> {
  await ensureGroupInitialized();
  const db = getAdapter();
  return db.getAllAsync<GroupRow>('SELECT * FROM Groups ORDER BY createdAt DESC');
}

export async function getGroupById(id: number): Promise<GroupWithParticipants | null> {
  await ensureGroupInitialized();
  const db = getAdapter();

  const group = await db.getFirstAsync<GroupRow>('SELECT * FROM Groups WHERE id = ?', [id]);
  if (!group) return null;

  const rows = await db.getAllAsync<GroupParticipantRow>(
    'SELECT id, name FROM GroupParticipants WHERE groupId = ? ORDER BY id',
    [id],
  );

  return {
    ...group,
    participants: rows.map((r) => ({ id: String(r.id), name: r.name })),
  };
}

export async function deleteGroup(id: number): Promise<void> {
  await ensureGroupInitialized();
  const db = getAdapter();

  await db.withTransactionAsync(async () => {
    await db.runAsync('DELETE FROM GroupParticipants WHERE groupId = ?', [id]);
    await db.runAsync('DELETE FROM Groups WHERE id = ?', [id]);
  });
}

export function _resetGroupForTesting(): void {
  groupInitPromise = null;
}
