import { saveEventTeams as saveEventTeamsToDb } from './database/entities/event/event';

import type { TeamDrawResult } from '@sportspay/shared';

export async function saveEventTeams(eventId: string, teams: TeamDrawResult): Promise<void> {
  const numericId = Number(eventId);
  if (Number.isNaN(numericId)) {
    throw new Error('ID do evento inválido.');
  }
  await saveEventTeamsToDb(numericId, teams);
}
