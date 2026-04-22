import { useState } from 'react';

import { generateTeams } from '../utils/team-draw';

import type { AttendancePlayer, TeamDrawMode, TeamDrawResult } from '../types';

type GenerateTeamsMode = TeamDrawMode;

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

  const preview = (() => {
    if (numericValue < 1 || players.length < 1) return null;

    if (state.mode === 'by_teams' || state.mode === 'manual') {
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
  })();

  const canDraw = (() => {
    if (!players || players.length === 0) return false;
    if (numericValue < 1) return false;

    if (state.mode === 'by_teams' || state.mode === 'manual') {
      return numericValue >= 2 && numericValue <= players.length;
    }

    if (state.mode === 'by_players') {
      return numericValue <= players.length && Math.floor(players.length / numericValue) >= 2;
    }

    return false;
  })();

  const setMode = (mode: GenerateTeamsMode) => {
    setState((prev) => ({ ...prev, mode, value: '', result: null, error: null }));
  };

  const setValue = (value: string) => {
    setState((prev) => ({ ...prev, value, error: null }));
  };

  const draw = () => {
    if (!Number.isInteger(numericValue) || numericValue <= 0) {
      setState((prev) => ({
        ...prev,
        result: null,
        error: 'Informe um número inteiro válido maior que zero.',
      }));
      return;
    }

    if (!canDraw) {
      setState((prev) => ({
        ...prev,
        result: null,
        error: 'Não é possível sortear com os valores informados.',
      }));
      return;
    }

    try {
      const result = generateTeams({
        players,
        mode: state.mode === 'manual' ? 'by_teams' : state.mode,
        value: numericValue,
      });
      setState((prev) => ({ ...prev, result, error: null }));
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro ao gerar times';
      setState((prev) => ({ ...prev, result: null, error: message }));
    }
  };

  const redraw = () => {
    draw();
  };

  const reset = () => {
    setState({ mode: 'by_teams', value: '', result: null, error: null });
  };

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
