import * as Clipboard from 'expo-clipboard';

import { getAdapter } from './database/database-adapter';
import { getRecurrentEvents } from './database/entities/event/event';
import { getGroupDisplayItems, getGroups } from './database/entities/group/group';

export interface DatabaseExport {
  version: string;
  exportedAt: string;
  groups: any[];
  events: any[];
  settings: any[];
  groupParticipants?: any[];
  eventAttendances?: any[];
  eventPayments?: any[];
  eventTeams?: any[];
}

export async function exportDatabase(): Promise<void> {
  try {
    const db = getAdapter();

    // Export all data from all tables
    const groups = await db.getAllAsync('SELECT * FROM Groups ORDER BY createdAt DESC');
    const groupParticipants = await db.getAllAsync(
      'SELECT * FROM GroupParticipants ORDER BY groupId, id',
    );
    const events = await db.getAllAsync('SELECT * FROM RecurrentEvents ORDER BY createdAt DESC');
    const eventAttendances = await db.getAllAsync(
      'SELECT * FROM EventAttendances ORDER BY eventId, participantId',
    );
    const eventPayments = await db.getAllAsync(
      'SELECT * FROM EventPayments ORDER BY eventId, participantId',
    );
    const eventTeams = await db.getAllAsync('SELECT * FROM EventTeams ORDER BY eventId');

    // Export settings
    const settings = await db.getAllAsync('SELECT * FROM Settings');

    const exportData: DatabaseExport = {
      version: '1.0.0',
      exportedAt: new Date().toISOString(),
      groups: groups || [],
      events: events || [],
      settings: settings || [],
      // Include related data
      groupParticipants: groupParticipants || [],
      eventAttendances: eventAttendances || [],
      eventPayments: eventPayments || [],
      eventTeams: eventTeams || [],
    };

    // Copy JSON to clipboard
    const jsonString = JSON.stringify(exportData, null, 2);
    await Clipboard.setStringAsync(jsonString);

    console.log('Database exported to clipboard');
  } catch (error) {
    console.error('Error exporting database:', error);
    throw new Error('Falha ao exportar dados. Tente novamente.');
  }
}

export async function importDatabase(): Promise<void> {
  try {
    // Get JSON from clipboard
    const clipboardContent = await Clipboard.getStringAsync();

    if (!clipboardContent) {
      throw new Error('Nenhum dados encontrado na área de transferência.');
    }

    const importData: DatabaseExport = JSON.parse(clipboardContent);

    // Validate import data
    if (!importData.version || !importData.groups || !importData.events) {
      throw new Error('Arquivo de backup inválido ou corrompido.');
    }

    const db = getAdapter();

    // Import data in a transaction
    await db.withTransactionAsync(async () => {
      // Clear existing data (in reverse order of dependencies)
      await db.execAsync('DELETE FROM EventTeams');
      await db.execAsync('DELETE FROM EventPayments');
      await db.execAsync('DELETE FROM EventAttendances');
      await db.execAsync('DELETE FROM RecurrentEvents');
      await db.execAsync('DELETE FROM GroupParticipants');
      await db.execAsync('DELETE FROM Groups');
      await db.execAsync('DELETE FROM Settings');

      // Import groups
      for (const group of importData.groups) {
        await db.runAsync(
          'INSERT INTO Groups (id, name, sport, pixKey, createdAt) VALUES (?, ?, ?, ?, ?)',
          [group.id, group.name, group.sport, group.pixKey, group.createdAt],
        );
      }

      // Import group participants if available
      if (importData.groupParticipants) {
        for (const participant of importData.groupParticipants) {
          await db.runAsync('INSERT INTO GroupParticipants (id, groupId, name) VALUES (?, ?, ?)', [
            participant.id,
            participant.groupId,
            participant.name,
          ]);
        }
      }

      // Import events
      for (const event of importData.events) {
        await db.runAsync(
          'INSERT INTO RecurrentEvents (id, groupId, name, dateTime, location, notes, isRecurring, frequency, selectedDays, endDate, arenaValue, participantValue, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
          [
            event.id,
            event.groupId || 0,
            event.name,
            event.dateTime,
            event.location || '',
            event.notes || '',
            event.isRecurring ? 1 : 0,
            event.frequency || 'weekly',
            event.selectedDays || '[]',
            event.endDate || '',
            event.arenaValue || 0,
            event.participantValue || 0,
            event.createdAt,
          ],
        );
      }

      // Import event attendances if available
      if (importData.eventAttendances) {
        for (const attendance of importData.eventAttendances) {
          await db.runAsync(
            'INSERT INTO EventAttendances (id, eventId, participantId, status, respondedAt) VALUES (?, ?, ?, ?, ?)',
            [
              attendance.id,
              attendance.eventId,
              attendance.participantId,
              attendance.status,
              attendance.respondedAt,
            ],
          );
        }
      }

      // Import event payments if available
      if (importData.eventPayments) {
        for (const payment of importData.eventPayments) {
          await db.runAsync(
            'INSERT INTO EventPayments (id, eventId, participantId, status, paidAt) VALUES (?, ?, ?, ?, ?)',
            [payment.id, payment.eventId, payment.participantId, payment.status, payment.paidAt],
          );
        }
      }

      // Import event teams if available
      if (importData.eventTeams) {
        for (const team of importData.eventTeams) {
          await db.runAsync(
            'INSERT INTO EventTeams (id, eventId, result, createdAt) VALUES (?, ?, ?, ?)',
            [team.id, team.eventId, team.result, team.createdAt],
          );
        }
      }

      // Import settings if available
      if (importData.settings) {
        for (const setting of importData.settings) {
          await db.runAsync('INSERT INTO Settings (key, value) VALUES (?, ?)', [
            setting.key,
            setting.value,
          ]);
        }
      }
    });

    console.log('Database imported successfully');
  } catch (error) {
    console.error('Error importing database:', error);
    throw new Error('Falha ao importar dados. Verifique o arquivo e tente novamente.');
  }
}
