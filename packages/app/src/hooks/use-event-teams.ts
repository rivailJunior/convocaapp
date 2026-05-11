import { useCallback, useEffect, useState } from 'react';

import { getEventTeams } from '../services/database/entities/event/event';

import type { TeamDrawResult } from '@sportspay/shared';

type UseEventTeamsReturn = {
  teams: TeamDrawResult | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
};

export function useEventTeams(eventId: string): UseEventTeamsReturn {
  const [state, setState] = useState<{
    teams: TeamDrawResult | null;
    isLoading: boolean;
    error: string | null;
  }>({
    teams: null,
    isLoading: true,
    error: null,
  });

  const fetchTeams = useCallback(async () => {
    try {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));

      const numericId = Number(eventId);
      if (Number.isNaN(numericId)) {
        setState({ teams: null, isLoading: false, error: null });
        return;
      }

      const result = await getEventTeams(numericId);
      setState({ teams: result, isLoading: false, error: null });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao buscar times';
      setState({ teams: null, isLoading: false, error: errorMessage });
    }
  }, [eventId]);

  useEffect(() => {
    if (eventId) {
      fetchTeams();
    }
  }, [eventId, fetchTeams]);

  return {
    teams: state.teams,
    isLoading: state.isLoading,
    error: state.error,
    refetch: fetchTeams,
  };
}
