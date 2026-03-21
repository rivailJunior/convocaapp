import type { User } from '@sportspay/shared';
import { RandomTeams } from './random-teams';

const makePlayers = (count: number): User[] =>
  Array.from({ length: count }, (_, i) => ({
    uid: `uid_${i + 1}`,
    name: `Player ${i + 1}`,
    email: `player${i + 1}@test.com`,
    groupIds: [],
    adminGroupIds: [],
    createdAt: new Date().toISOString(),
  }));

describe('RandomTeams.generateTeam', () => {
  it('splits players evenly into the requested number of teams', () => {
    const players = makePlayers(10);
    const generator = new RandomTeams(2);

    const result = generator.generateTeam(players);

    expect(result.totalPlayers).toBe(10);
    expect(result.teams).toHaveLength(2);
    expect(result.teams[0]!.players).toHaveLength(5);
    expect(result.teams[1]!.players).toHaveLength(5);
    expect(result.bench).toHaveLength(0);

    // Every player must appear exactly once (team or bench)
    const allIds = result.teams
      .flatMap((t) => t.players.map((p) => p.userId))
      .concat(result.bench.map((p) => p.userId));
    expect(allIds.sort()).toEqual(players.map((p) => p.uid).sort());
  });

  it('puts leftover players on the bench when teams do not divide evenly', () => {
    const players = makePlayers(7);
    const generator = new RandomTeams(3);

    const result = generator.generateTeam(players);

    expect(result.totalPlayers).toBe(7);
    expect(result.teams).toHaveLength(3);
    // 7 / 3 = 2 per team, 1 on bench
    result.teams.forEach((team) => {
      expect(team.players).toHaveLength(2);
    });
    expect(result.bench).toHaveLength(1);

    // Every player must appear exactly once
    const allIds = result.teams
      .flatMap((t) => t.players.map((p) => p.userId))
      .concat(result.bench.map((p) => p.userId));
    expect(allIds.sort()).toEqual(players.map((p) => p.uid).sort());
  });
});
