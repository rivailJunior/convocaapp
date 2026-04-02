import { useState } from 'react';

import type { User } from '../types';

interface EditTeamsState {
  teams: Map<string, User[]>;
  bench: User[];
  isBannerVisible: boolean;
}

interface UseEditTeamsReturn {
  teams: Map<string, User[]>;
  bench: User[];
  isBannerVisible: boolean;
  dismissBanner: () => void;
  onSave: () => void;
  onCancel: () => void;
  onMovePlayer: (userId: string, fromTeam: string, toTeam: string) => void;
}

export function useEditTeams(
  initialTeams: Map<string, User[]>,
  initialBench: User[] = [],
): UseEditTeamsReturn {
  const [state, setState] = useState<EditTeamsState>({
    teams: initialTeams,
    bench: initialBench,
    isBannerVisible: true,
  });

  const dismissBanner = () => {
    setState((prev) => ({ ...prev, isBannerVisible: false }));
  };

  // TODO(@developer): implement save logic — persist edited teams
  const onSave = () => {};

  // TODO(@developer): implement cancel logic — navigate back without saving
  const onCancel = () => {};

  // TODO(@developer): implement drag-and-drop move logic
  const onMovePlayer = (_userId: string, _fromTeam: string, _toTeam: string) => {};

  return {
    teams: state.teams,
    bench: state.bench,
    isBannerVisible: state.isBannerVisible,
    dismissBanner,
    onSave,
    onCancel,
    onMovePlayer,
  };
}
