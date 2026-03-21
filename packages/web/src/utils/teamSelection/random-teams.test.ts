import type { AttendancePlayer } from '@sportspay/shared';
import { RandomTeams } from './random-teams';

const makePlayers = (count: number): AttendancePlayer[] =>
  Array.from({ length: count }, (_, i) => ({
    userId: `uid_${i + 1}`,
    userName: `Player ${i + 1}`,
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
    expect(allIds.sort()).toEqual(players.map((p) => p.userId).sort());
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
    expect(allIds.sort()).toEqual(players.map((p) => p.userId).sort());
  });

  it('throws when fewer than 2 teams are requested', () => {
    const generator = new RandomTeams(1);
    expect(() => generator.generateTeam(makePlayers(5))).toThrow('Mínimo de 2 times');
  });

  it('throws when there are more teams than players', () => {
    const generator = new RandomTeams(5);
    expect(() => generator.generateTeam(makePlayers(3))).toThrow(
      'Mais times (5) do que jogadores confirmados (3)',
    );
  });
});
