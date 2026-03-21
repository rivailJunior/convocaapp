import type { User, TeamDrawResult } from '@sportspay/shared';

/** Abstract base for team generation strategies. Extend and implement `generateTeam`. */
export abstract class TeamGenerator {
  abstract generateTeam(players: User[]): TeamDrawResult;
}
