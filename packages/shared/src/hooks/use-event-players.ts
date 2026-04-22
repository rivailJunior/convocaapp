import { MOCK_EVENT_PLAYERS } from './mock-event-players';

import type { AttendancePlayer } from '../types';

interface UseEventPlayersReturn {
  players: AttendancePlayer[];
}

export function useEventPlayers(eventId: string): UseEventPlayersReturn {
  const players = MOCK_EVENT_PLAYERS[eventId] ?? [];
  return { players };
}
