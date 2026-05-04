import { getAdapter } from '../../database-adapter';



import type { AttendanceStatus, CreateRecurrentEventInput, EventPaymentStatus, RecurrentEventEntity } from '@sportspay/shared';


export type { CreateRecurrentEventInput, RecurrentEventEntity } from '@sportspay/shared';

let eventInitPromise: Promise<void> | null = null;

async function performEventInit(): Promise<void> {
  try {
    const db = getAdapter();
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS RecurrentEvents (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        groupId INTEGER NOT NULL DEFAULT 0,
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

    // Migration: add groupId column for existing tables created before this change
    await db.execAsync(`
      ALTER TABLE RecurrentEvents ADD COLUMN groupId INTEGER NOT NULL DEFAULT 0;
    `).catch(() => {
      // Column already exists — ignore
    });

    // Migration: add arenaValue and participantValue columns
    await db.execAsync(`
      ALTER TABLE RecurrentEvents ADD COLUMN arenaValue REAL NOT NULL DEFAULT 0;
    `).catch(() => {});
    await db.execAsync(`
      ALTER TABLE RecurrentEvents ADD COLUMN participantValue REAL NOT NULL DEFAULT 0;
    `).catch(() => {});

    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS EventAttendances (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        eventId INTEGER NOT NULL,
        participantId INTEGER NOT NULL,
        status TEXT NOT NULL DEFAULT 'pending',
        respondedAt TEXT,
        UNIQUE(eventId, participantId),
        FOREIGN KEY (eventId) REFERENCES RecurrentEvents(id) ON DELETE CASCADE,
        FOREIGN KEY (participantId) REFERENCES GroupParticipants(id) ON DELETE CASCADE
      );
    `);

    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS EventPayments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        eventId INTEGER NOT NULL,
        participantId INTEGER NOT NULL,
        status TEXT NOT NULL DEFAULT 'pending',
        paidAt TEXT,
        UNIQUE(eventId, participantId),
        FOREIGN KEY (eventId) REFERENCES RecurrentEvents(id) ON DELETE CASCADE,
        FOREIGN KEY (participantId) REFERENCES GroupParticipants(id) ON DELETE CASCADE
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
    `INSERT INTO RecurrentEvents (groupId, name, dateTime, location, notes, isRecurring, frequency, selectedDays, endDate, arenaValue, participantValue)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      input.groupId,
      input.name,
      input.dateTime,
      input.location ?? '',
      input.notes ?? '',
      input.isRecurring ? 1 : 0,
      input.frequency,
      JSON.stringify(input.selectedDays),
      input.endDate ?? '',
      input.arenaValue ?? 0,
      input.participantValue ?? 0,
    ],
  );

  return result.lastInsertRowId;
}

function mapRowToEntity(row: Record<string, unknown>): RecurrentEventEntity {
  return {
    id: row.id as number,
    groupId: (row.groupId as number) ?? 0,
    name: row.name as string,
    dateTime: row.dateTime as string,
    location: row.location as string,
    notes: row.notes as string,
    isRecurring: (row.isRecurring as number) !== 0,
    frequency: row.frequency as string,
    selectedDays: JSON.parse((row.selectedDays as string) || '[]') as number[],
    endDate: row.endDate as string,
    arenaValue: (row.arenaValue as number) ?? 0,
    participantValue: (row.participantValue as number) ?? 0,
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

export async function getRecurrentEventsByGroupId(
  groupId: number,
): Promise<RecurrentEventEntity[]> {
  await ensureEventInitialized();
  const db = getAdapter();
  const rows = await db.getAllAsync<Record<string, unknown>>(
    'SELECT * FROM RecurrentEvents WHERE groupId = ? ORDER BY dateTime DESC',
    [groupId],
  );
  return rows.map(mapRowToEntity);
}

export async function getConfirmedCountsByGroupId(
  groupId: number,
): Promise<Record<number, number>> {
  await ensureEventInitialized();
  const db = getAdapter();
  const rows = await db.getAllAsync<{ eventId: number; count: number }>(
    `SELECT ea.eventId, COUNT(*) AS count
     FROM EventAttendances ea
     INNER JOIN RecurrentEvents re ON re.id = ea.eventId
     WHERE re.groupId = ? AND ea.status = 'confirmed'
     GROUP BY ea.eventId`,
    [groupId],
  );
  const map: Record<number, number> = {};
  for (const row of rows) {
    map[row.eventId] = row.count;
  }
  return map;
}

interface EventPlayerRow {
  userId: string;
  userName: string;
  status: AttendanceStatus;
  paymentStatus: EventPaymentStatus;
}

export async function getEventPlayers(
  eventId: number,
): Promise<EventPlayerRow[]> {
  await ensureEventInitialized();
  const db = getAdapter();
  return db.getAllAsync<EventPlayerRow>(
    `SELECT CAST(gp.id AS TEXT) AS userId,
            gp.name AS userName,
            COALESCE(ea.status, 'pending') AS status,
            COALESCE(ep.status, 'pending') AS paymentStatus
     FROM GroupParticipants gp
     INNER JOIN RecurrentEvents re ON re.groupId = gp.groupId
     LEFT JOIN EventAttendances ea ON ea.participantId = gp.id AND ea.eventId = re.id
     LEFT JOIN EventPayments ep ON ep.participantId = gp.id AND ep.eventId = re.id
     WHERE re.id = ?
     ORDER BY gp.id`,
    [eventId],
  );
}

export async function upsertEventPayment(
  eventId: number,
  participantId: number,
  status: EventPaymentStatus,
): Promise<void> {
  await ensureEventInitialized();
  const db = getAdapter();
  await db.runAsync(
    `INSERT INTO EventPayments (eventId, participantId, status, paidAt)
     VALUES (?, ?, ?, CASE WHEN ? = 'paid' THEN datetime('now') ELSE NULL END)
     ON CONFLICT(eventId, participantId)
     DO UPDATE SET status = excluded.status, paidAt = excluded.paidAt`,
    [eventId, participantId, status, status],
  );
}

interface UpcomingEventRow {
  id: number;
  groupId: number;
  name: string;
  dateTime: string;
  location: string;
  frequency: string;
  createdAt: string;
  sport: string;
  groupName: string;
  confirmedCount: number;
}

export async function getUpcomingEventItems(): Promise<UpcomingEventRow[]> {
  await ensureEventInitialized();
  const db = getAdapter();
  return db.getAllAsync<UpcomingEventRow>(
    `SELECT re.id, re.groupId, re.name, re.dateTime, re.location,
            re.frequency, re.createdAt,
            g.sport, g.name AS groupName,
            COUNT(CASE WHEN ea.status = 'confirmed' THEN 1 END) AS confirmedCount
     FROM RecurrentEvents re
     INNER JOIN Groups g ON g.id = re.groupId
     LEFT JOIN EventAttendances ea ON ea.eventId = re.id
     WHERE re.dateTime >= datetime('now')
     GROUP BY re.id
     ORDER BY re.dateTime ASC`,
  );
}

export async function upsertEventAttendance(
  eventId: number,
  participantId: number,
  status: AttendanceStatus,
): Promise<void> {
  await ensureEventInitialized();
  const db = getAdapter();
  await db.runAsync(
    `INSERT INTO EventAttendances (eventId, participantId, status, respondedAt)
     VALUES (?, ?, ?, datetime('now'))
     ON CONFLICT(eventId, participantId)
     DO UPDATE SET status = excluded.status, respondedAt = excluded.respondedAt`,
    [eventId, participantId, status],
  );
}
