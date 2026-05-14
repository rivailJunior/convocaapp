import type { TeamDrawResult } from '@sportspay/shared';

let pendingTeams: TeamDrawResult | null = null;

export function setPendingTeams(data: TeamDrawResult): void {
  pendingTeams = data;
}

export function consumePendingTeams(): TeamDrawResult | null {
  const data = pendingTeams;
  pendingTeams = null;
  return data;
}
