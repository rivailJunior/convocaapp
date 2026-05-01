import { useCallback, useEffect, useState } from 'react';

import {
  getEventPlayers,
  upsertEventAttendance,
  upsertEventPayment,
} from '../services/database/entities/event/event';

import type { AttendancePlayer, AttendanceStatus, EventPaymentStatus } from '@sportspay/shared';

interface UseLocalEventPlayersReturn {
  players: AttendancePlayer[];
  isLoading: boolean;
  refetch: () => void;
  updateStatus: (userId: string, status: AttendanceStatus) => void;
  updatePaymentStatus: (userId: string, status: EventPaymentStatus) => void;
}

export function useLocalEventPlayers(eventId: string): UseLocalEventPlayersReturn {
  const [players, setPlayers] = useState<AttendancePlayer[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const refetch = useCallback(async () => {
    const numericId = Number(eventId);
    if (!numericId) {
      setPlayers([]);
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      const rows = await getEventPlayers(numericId);
      setPlayers(rows);
    } catch (error) {
      console.error('[useLocalEventPlayers] Failed to fetch players:', error);
    } finally {
      setIsLoading(false);
    }
  }, [eventId]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  const updateStatus = useCallback(
    async (userId: string, status: AttendanceStatus) => {
      const numericEventId = Number(eventId);
      const numericPlayerId = Number(userId);
      if (!numericEventId || !numericPlayerId) return;

      setPlayers((prev) => prev.map((p) => (p.userId === userId ? { ...p, status } : p)));

      try {
        await upsertEventAttendance(numericEventId, numericPlayerId, status);
      } catch (error) {
        console.error('[useLocalEventPlayers] Failed to update attendance status:', error);
      }
    },
    [eventId],
  );

  const updatePaymentStatus = useCallback(
    async (userId: string, paymentStatus: EventPaymentStatus) => {
      const numericEventId = Number(eventId);
      const numericPlayerId = Number(userId);
      if (!numericEventId || !numericPlayerId) return;

      setPlayers((prev) => prev.map((p) => (p.userId === userId ? { ...p, paymentStatus } : p)));

      try {
        await upsertEventPayment(numericEventId, numericPlayerId, paymentStatus);
      } catch (error) {
        console.error('[useLocalEventPlayers] Failed to update payment status:', error);
      }
    },
    [eventId],
  );

  return { players, isLoading, refetch, updateStatus, updatePaymentStatus };
}
