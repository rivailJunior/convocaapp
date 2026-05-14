import type { TeamDrawResult, User } from '@sportspay/shared';

export function toTeamDrawResult(teams: Map<string, User[]>, bench: User[]): TeamDrawResult {
  const teamsArr = Array.from(teams.entries()).map(([name, players], index) => ({
    id: String(index + 1),
    name,
    players: players.map((u) => ({
      userId: u.uid,
      userName: u.name,
      avatarUrl: undefined,
      status: 'confirmed' as const,
      paymentStatus: 'pending' as const,
    })),
  }));

  return {
    teams: teamsArr,
    bench: bench.map((u) => ({
      userId: u.uid,
      userName: u.name,
      avatarUrl: undefined,
      status: 'confirmed' as const,
      paymentStatus: 'pending' as const,
    })),
    totalPlayers: teamsArr.reduce((sum, t) => sum + t.players.length, 0) + bench.length,
  };
}
