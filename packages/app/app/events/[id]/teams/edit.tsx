import { useLocalSearchParams } from 'expo-router';
import { EditTeamsPage } from '@/components/edit-teams';
import { consumePendingTeams } from '@/stores/teams-transfer';
import { useState } from 'react';

import type { TeamDrawResult, User } from '@sportspay/shared';

function toTeamsMap(result: TeamDrawResult): Map<string, User[]> {
  const map = new Map<string, User[]>();
  for (const team of result.teams) {
    map.set(
      team.name,
      team.players.map((p) => ({
        uid: p.userId,
        name: p.userName,
        email: '',
        groupIds: [],
        adminGroupIds: [],
        createdAt: '',
      })),
    );
  }
  return map;
}

function toBench(result: TeamDrawResult): User[] {
  return result.bench.map((p) => ({
    uid: p.userId,
    name: p.userName,
    email: '',
    groupIds: [],
    adminGroupIds: [],
    createdAt: '',
  }));
}

export default function EditTeamsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [teamsData] = useState<TeamDrawResult | null>(() => consumePendingTeams());

  if (!teamsData) {
    return null;
  }

  return <EditTeamsPage eventId={id!} teams={toTeamsMap(teamsData)} bench={toBench(teamsData)} />;
}
