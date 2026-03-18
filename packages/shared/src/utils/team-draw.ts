import type { AttendancePlayer, Team, TeamDrawMode, TeamDrawResult } from '../types';

interface GenerateTeamsParams {
  players: AttendancePlayer[];
  mode: TeamDrawMode;
  value: number;
}

const TEAM_NAMES = ['Time A', 'Time B', 'Time C', 'Time D', 'Time E', 'Time F'];

/** Generate random teams using Fisher-Yates shuffle. Runs client-side only. */
export function generateTeams(params: GenerateTeamsParams): TeamDrawResult {
  const { players, mode, value } = params;

  // Validation
  if (mode === 'by_players') {
    if (value > players.length) {
      throw new Error('Mais jogadores por time do que confirmados');
    }
    if (Math.floor(players.length / value) < 2) {
      throw new Error('Mínimo de 2 times necessário');
    }
  }

  if (mode === 'by_teams') {
    if (value < 2) throw new Error('Mínimo de 2 times');
    if (value > players.length) throw new Error('Mais times do que jogadores confirmados');
  }

  const numTeams = mode === 'by_players' ? Math.floor(players.length / value) : value;
  const playersPerTeam =
    mode === 'by_players' ? value : Math.floor(players.length / numTeams);

  // Fisher-Yates shuffle
  const shuffled = [...players];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j]!, shuffled[i]!];
  }

  // Split into teams
  const teams: Team[] = [];
  for (let i = 0; i < numTeams; i++) {
    teams.push({
      id: (TEAM_NAMES[i] ?? `Time ${i + 1}`).replace(' ', '_').toLowerCase(),
      name: TEAM_NAMES[i] ?? `Time ${i + 1}`,
      players: shuffled.slice(i * playersPerTeam, (i + 1) * playersPerTeam),
    });
  }

  const bench = shuffled.slice(numTeams * playersPerTeam);

  return { teams, bench, totalPlayers: players.length };
}
