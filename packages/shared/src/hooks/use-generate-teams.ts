import { useCallback, useMemo, useState } from 'react';

import type { AttendancePlayer, TeamDrawMode, TeamDrawResult } from '../types';
import { generateTeams } from '../utils/team-draw';

type GenerateTeamsMode = TeamDrawMode | 'manual';

type GenerateTeamsState = {
  mode: GenerateTeamsMode;
  value: string;
  result: TeamDrawResult | null;
  error: string | null;
};

type UseGenerateTeamsReturn = {
  mode: GenerateTeamsMode;
  value: string;
  result: TeamDrawResult | null;
  error: string | null;
  preview: string | null;
  canDraw: boolean;
  setMode: (mode: GenerateTeamsMode) => void;
  setValue: (value: string) => void;
  draw: () => void;
  redraw: () => void;
  reset: () => void;
};

export function useGenerateTeams(players: AttendancePlayer[]): UseGenerateTeamsReturn {
  const [state, setState] = useState<GenerateTeamsState>({
    mode: 'by_teams',
    value: '',
    result: null,
    error: null,
  });

  const numericValue = Number(state.value) || 0;

  const preview = useMemo(() => {
    if (numericValue < 1 || players.length < 1) return null;

    if (state.mode === 'by_teams') {
      if (numericValue < 2) return null;
      if (numericValue > players.length) return null;
      const perTeam = Math.floor(players.length / numericValue);
      const bench = players.length - perTeam * numericValue;
      return `Resultado: ${numericValue} times de ${perTeam} jogadores${bench > 0 ? ` • ${bench} no banco` : ''}`;
    }

    if (state.mode === 'by_players') {
      if (numericValue > players.length) return null;
      const numTeams = Math.floor(players.length / numericValue);
      if (numTeams < 2) return null;
      const bench = players.length - numTeams * numericValue;
      return `Resultado: ${numTeams} times de ${numericValue} jogadores${bench > 0 ? ` • ${bench} no banco` : ''}`;
    }

    return null;
  }, [state.mode, numericValue, players.length]);

  const canDraw = useMemo(() => {
    if (state.mode === 'manual') return false;
    if (numericValue < 1 || players.length < 4) return false;

    if (state.mode === 'by_teams') {
      return numericValue >= 2 && numericValue <= players.length;
    }

    if (state.mode === 'by_players') {
      return numericValue <= players.length && Math.floor(players.length / numericValue) >= 2;
    }

    return false;
  }, [state.mode, numericValue, players.length]);

  const setMode = useCallback((mode: GenerateTeamsMode) => {
    setState((prev) => ({ ...prev, mode, value: '', result: null, error: null }));
  }, []);

  const setValue = useCallback((value: string) => {
    setState((prev) => ({ ...prev, value, error: null }));
  }, []);

  const draw = useCallback(() => {
    if (state.mode === 'manual') return;
    try {
      const result = generateTeams({
        players,
        mode: state.mode,
        value: numericValue,
      });
      setState((prev) => ({ ...prev, result, error: null }));
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro ao gerar times';
      setState((prev) => ({ ...prev, result: null, error: message }));
    }
  }, [players, state.mode, numericValue]);

  const redraw = useCallback(() => {
    draw();
  }, [draw]);

  const reset = useCallback(() => {
    setState({ mode: 'by_teams', value: '', result: null, error: null });
  }, []);

  return {
    mode: state.mode,
    value: state.value,
    result: state.result,
    error: state.error,
    preview,
    canDraw,
    setMode,
    setValue,
    draw,
    redraw,
    reset,
  };
}
