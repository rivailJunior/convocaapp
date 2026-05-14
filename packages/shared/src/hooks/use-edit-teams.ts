import { useCallback, useMemo, useState } from 'react';

import type { User } from '../types';

type TeamHeaderItem = {
  type: 'team-header';
  id: string;
  key: string;
  name: string;
  playerCount: number;
  colorIndex: number;
};

type BenchHeaderItem = {
  type: 'bench-header';
  id: string;
  key: string;
};

type PlayerItem = {
  type: 'player';
  id: string;
  key: string;
  user: User;
};

export type DragListItem = TeamHeaderItem | BenchHeaderItem | PlayerItem;

type EditTeamsState = {
  teams: Map<string, User[]>;
  bench: User[];
  isBannerVisible: boolean;
};

type UseEditTeamsReturn = {
  teams: Map<string, User[]>;
  bench: User[];
  flatItems: DragListItem[];
  isBannerVisible: boolean;
  dismissBanner: () => void;
  onReorder: (items: DragListItem[]) => void;
  onRenameTeam: (oldName: string, newName: string) => void;
  onSave: (orderedItems?: DragListItem[]) => void;
  onCancel: () => void;
};

function buildFlatItems(teams: Map<string, User[]>, bench: User[]): DragListItem[] {
  const items: DragListItem[] = [];
  let colorIndex = 0;
  let teamIndex = 0;

  for (const [name, players] of teams.entries()) {
    const headerId = `header-team-${teamIndex}`;
    items.push({
      type: 'team-header',
      id: headerId,
      key: headerId,
      name,
      playerCount: players.length,
      colorIndex,
    });
    for (const user of players) {
      const playerId = `player-${user.uid}`;
      items.push({ type: 'player', id: playerId, key: playerId, user });
    }
    colorIndex++;
    teamIndex++;
  }

  const benchId = 'header-bench';
  items.push({ type: 'bench-header', id: benchId, key: benchId });
  for (const user of bench) {
    const playerId = `player-${user.uid}`;
    items.push({ type: 'player', id: playerId, key: playerId, user });
  }

  return items;
}

export function rebuildFromFlatItems(items: DragListItem[]): {
  teams: Map<string, User[]>;
  bench: User[];
} {
  const teams = new Map<string, User[]>();
  const bench: User[] = [];
  let currentTeamName: string | null = null;
  let isBench = false;

  for (const item of items) {
    if (item.type === 'team-header') {
      currentTeamName = item.name;
      isBench = false;
      if (!teams.has(currentTeamName)) {
        teams.set(currentTeamName, []);
      }
    } else if (item.type === 'bench-header') {
      currentTeamName = null;
      isBench = true;
    } else if (item.type === 'player') {
      if (isBench) {
        bench.push(item.user);
      } else if (currentTeamName) {
        teams.get(currentTeamName)!.push(item.user);
      }
    }
  }

  return { teams, bench };
}

export function useEditTeams(
  initialTeams: Map<string, User[]>,
  initialBench: User[] = [],
  callbacks?: {
    onSave?: (teams: Map<string, User[]>, bench: User[]) => Promise<void>;
    onCancel?: () => void;
  },
): UseEditTeamsReturn {
  const [state, setState] = useState<EditTeamsState>({
    teams: initialTeams,
    bench: initialBench,
    isBannerVisible: true,
  });
  const [isSaving, setIsSaving] = useState(false);

  const flatItems = useMemo(
    () => buildFlatItems(state.teams, state.bench),
    [state.teams, state.bench],
  );

  const dismissBanner = useCallback(() => {
    setState((prev) => ({ ...prev, isBannerVisible: false }));
  }, []);

  const onReorder = useCallback((items: DragListItem[]) => {
    const { teams, bench } = rebuildFromFlatItems(items);
    setState((prev) => ({ ...prev, teams, bench }));
  }, []);

  const onRenameTeam = useCallback((oldName: string, newName: string) => {
    if (!newName.trim() || oldName === newName) return;

    setState((prev) => {
      const newTeams = new Map<string, User[]>();
      for (const [name, players] of prev.teams.entries()) {
        newTeams.set(name === oldName ? newName.trim() : name, players);
      }
      return { ...prev, teams: newTeams };
    });
  }, []);

  const onSave = useCallback(
    async (orderedItems?: DragListItem[]) => {
      if (isSaving) return;
      setIsSaving(true);
      try {
        let { teams: t, bench: b } = orderedItems
          ? rebuildFromFlatItems(orderedItems)
          : { teams: state.teams, bench: state.bench };
        await callbacks?.onSave?.(t, b);
      } finally {
        setIsSaving(false);
      }
    },
    [isSaving, state.teams, state.bench, callbacks],
  );

  const onCancel = useCallback(() => {
    callbacks?.onCancel?.();
  }, [callbacks]);

  return {
    teams: state.teams,
    bench: state.bench,
    flatItems,
    isBannerVisible: state.isBannerVisible,
    dismissBanner,
    onReorder,
    onRenameTeam,
    onSave,
    onCancel,
  };
}
