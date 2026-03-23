import type { User, Team, TeamDrawResult } from '@sportspay/shared';
import { TeamGenerator } from './team-generator';

/** Fisher-Yates shuffle to produce random balanced teams. */
export class RandomTeams extends TeamGenerator {
  private teamsCount: number;

  constructor(teamsCount: number) {
    super();
    this.teamsCount = teamsCount;
  }

  generateTeam(players: User[]): TeamDrawResult {
    if (this.teamsCount < 2) {
      throw new Error('Mínimo de 2 times');
    }
    if (this.teamsCount > players.length) {
      throw new Error('Mais times do que jogadores confirmados');
    }

    const playersPerTeam = Math.floor(players.length / this.teamsCount);

    // Fisher-Yates shuffle
    const shuffled = [...players];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j]!, shuffled[i]!];
    }

    const teams: Team[] = [];
    for (let i = 0; i < this.teamsCount; i++) {
      const teamPlayers = shuffled.slice(i * playersPerTeam, (i + 1) * playersPerTeam);
      teams.push({
        id: `time_${i + 1}`,
        name: `Time ${i + 1}`,
        players: teamPlayers.map((p) => ({
          userId: p.uid,
          userName: p.name,
          avatarUrl: p.avatarUrl,
        })),
      });
    }

    const benchSlice = shuffled.slice(this.teamsCount * playersPerTeam);
    const bench = benchSlice.map((p) => ({
      userId: p.uid,
      userName: p.name,
      avatarUrl: p.avatarUrl,
    }));

    return { teams, bench, totalPlayers: players.length };
  }
}
