import { getAdapter } from '../../database-adapter';



import type {
  CreateLocalGroupInput,
  GroupEntity,
  GroupParticipantEntity,
  GroupWithMemberCount,
  GroupWithParticipants,
} from '@sportspay/shared';

export type {
  CreateLocalGroupInput,
  GroupEntity,
  GroupWithMemberCount,
  GroupWithParticipants,
} from '@sportspay/shared';

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

export async function createGroup(input: CreateLocalGroupInput): Promise<number> {
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

export async function getGroups(): Promise<GroupEntity[]> {
  await ensureGroupInitialized();
  const db = getAdapter();
  return db.getAllAsync<GroupEntity>('SELECT * FROM Groups ORDER BY createdAt DESC');
}

export async function getGroupDisplayItems(): Promise<GroupWithMemberCount[]> {
  await ensureGroupInitialized();
  const db = getAdapter();
  return db.getAllAsync<GroupWithMemberCount>(
    `SELECT g.id, g.name, g.sport, g.pixKey, g.createdAt,
            COUNT(gp.id) AS memberCount
     FROM Groups g
     LEFT JOIN GroupParticipants gp ON gp.groupId = g.id
     GROUP BY g.id
     ORDER BY g.createdAt DESC`,
  );
}

export async function getGroupById(id: number): Promise<GroupWithParticipants | null> {
  await ensureGroupInitialized();
  const db = getAdapter();

  const group = await db.getFirstAsync<GroupEntity>('SELECT * FROM Groups WHERE id = ?', [id]);
  if (!group) return null;

  const rows = await db.getAllAsync<GroupParticipantEntity>(
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

export async function addParticipantToGroup(
  groupId: number,
  participantName: string,
): Promise<number> {
  await ensureGroupInitialized();
  const db = getAdapter();

  const result = await db.runAsync('INSERT INTO GroupParticipants (groupId, name) VALUES (?, ?)', [
    groupId,
    participantName.trim(),
  ]);

  return result.lastInsertRowId;
}

export async function removeParticipantFromGroup(
  groupId: number,
  participantId: string,
): Promise<void> {
  await ensureGroupInitialized();
  const db = getAdapter();

  await db.runAsync('DELETE FROM GroupParticipants WHERE groupId = ? AND id = ?', [
    groupId,
    participantId,
  ]);
}

export async function updateParticipantName(
  groupId: number,
  participantId: string,
  newName: string,
): Promise<void> {
  await ensureGroupInitialized();
  const db = getAdapter();

  await db.runAsync('UPDATE GroupParticipants SET name = ? WHERE groupId = ? AND id = ?', [
    newName.trim(),
    groupId,
    participantId,
  ]);
}

export async function addMultipleParticipantsToGroup(
  groupId: number,
  participantNames: string[],
): Promise<number[]> {
  await ensureGroupInitialized();
  const db = getAdapter();

  const insertedIds: number[] = [];

  await db.withTransactionAsync(async () => {
    for (const name of participantNames) {
      if (name.trim().length > 0) {
        const result = await db.runAsync(
          'INSERT INTO GroupParticipants (groupId, name) VALUES (?, ?)',
          [groupId, name.trim()],
        );
        insertedIds.push(result.lastInsertRowId);
      }
    }
  });

  return insertedIds;
}

export function _resetGroupForTesting(): void {
  groupInitPromise = null;
}
