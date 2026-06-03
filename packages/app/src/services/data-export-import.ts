import { Platform } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import { StorageAccessFramework } from 'expo-file-system';
import * as Sharing from 'expo-sharing';

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
    const settings = await db.getAllAsync('SELECT * FROM UserSettings');

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

    // Create JSON content
    const jsonString = JSON.stringify(exportData, null, 2);
    const fileName = `convoca-backup-${new Date().toISOString().split('T')[0]}.json`;

    console.log('Platform:', Platform.OS);
    console.log('documentDirectory:', FileSystem.documentDirectory);
    console.log('cacheDirectory:', FileSystem.cacheDirectory);

    // Android: Use StorageAccessFramework (native "Save As" dialog)
    if (Platform.OS === 'android') {
      try {
        const permissions = await StorageAccessFramework.requestDirectoryPermissionsAsync();
        if (!permissions.granted) {
          throw new Error('Permissão para salvar arquivo negada.');
        }

        const fileUri = await StorageAccessFramework.createFileAsync(
          permissions.directoryUri,
          fileName,
          'application/json',
        );

        await FileSystem.writeAsStringAsync(fileUri, jsonString, {
          encoding: FileSystem.EncodingType.UTF8,
        });

        console.log('Database exported successfully via SAF');
        return;
      } catch (safError) {
        console.log('SAF failed, trying sharing fallback:', safError);
      }
    }

    // iOS / Fallback: Write file and share (shows "Save to Files" on iOS)
    const baseDir = FileSystem.documentDirectory ?? FileSystem.cacheDirectory;
    if (baseDir) {
      const fileUri = `${baseDir}${fileName}`;
      await FileSystem.writeAsStringAsync(fileUri, jsonString, {
        encoding: FileSystem.EncodingType.UTF8,
      });

      const isAvailable = await Sharing.isAvailableAsync();
      if (isAvailable) {
        await Sharing.shareAsync(fileUri, {
          mimeType: 'application/json',
          dialogTitle: 'Exportar Dados do Convoca',
          UTI: 'public.json',
        });
        console.log('Database exported successfully via sharing');
        return;
      }
    }

    // Last resort fallback: copy JSON to clipboard
    await Clipboard.setStringAsync(jsonString);
    console.log('Database exported to clipboard (fallback)');
  } catch (error) {
    console.error('Error exporting database:', error);
    throw error;
  }
}

export async function importDatabase(): Promise<void> {
  try {
    let importData: DatabaseExport;
    let fileContent: string | null = null;

    // Try to pick a file using DocumentPicker
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['application/json'],
        copyToCacheDirectory: false,
      });

      if (result.canceled || !result.assets || result.assets.length === 0) {
        return; // User cancelled the picker
      }

      const pickedFileUri = result.assets[0].uri;

      // Android: Use SAF to read content:// URIs
      if (Platform.OS === 'android') {
        fileContent = await StorageAccessFramework.readAsStringAsync(pickedFileUri);
      } else {
        // iOS: Read directly
        fileContent = await FileSystem.readAsStringAsync(pickedFileUri);
      }
    } catch (pickerError) {
      console.log('File picker failed, trying clipboard:', pickerError);
    }

    // Fallback: Get JSON from clipboard
    if (!fileContent) {
      const clipboardContent = await Clipboard.getStringAsync();

      if (!clipboardContent) {
        throw new Error(
          'Nenhum dado encontrado. Por favor, selecione um arquivo ou copie os dados JSON para a área de transferência.',
        );
      }

      fileContent = clipboardContent;
    }

    importData = JSON.parse(fileContent);

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
      await db.execAsync('DELETE FROM UserSettings');

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
          await db.runAsync(
            'INSERT INTO UserSettings (id, theme, language, onboarded) VALUES (?, ?, ?, ?)',
            [setting.id, setting.theme, setting.language, setting.onboarded],
          );
        }
      }
    });

    console.log('Database imported successfully');
  } catch (error) {
    console.error('Error importing database:', error);
    throw new Error('Falha ao importar dados. Verifique o arquivo e tente novamente.');
  }
}

export async function clearDatabase(): Promise<void> {
  try {
    const db = getAdapter();

    // Clear all data in a transaction
    await db.withTransactionAsync(async () => {
      // Clear data in reverse order of dependencies
      await db.execAsync('DELETE FROM EventTeams');
      await db.execAsync('DELETE FROM EventPayments');
      await db.execAsync('DELETE FROM EventAttendances');
      await db.execAsync('DELETE FROM RecurrentEvents');
      await db.execAsync('DELETE FROM GroupParticipants');
      await db.execAsync('DELETE FROM Groups');
      await db.execAsync('DELETE FROM UserSettings');
    });

    // Re-initialize settings with defaults
    const { initSettingsDatabase } = await import('./database/entities/settings/settings');
    await initSettingsDatabase();

    console.log('Database cleared successfully');
  } catch (error) {
    console.error('Error clearing database:', error);
    throw new Error('Falha ao limpar dados. Tente novamente.');
  }
}
