'use client';

import React from 'react';

import styles from './styles/group-page.module.css';

import { GroupCard } from '@/components/group/group-card';
import { useGroups } from '@/components/group/hook-use-groups';

export function GroupPage(): React.JSX.Element {
  const { groups } = useGroups();

  return (
    <div className={styles.page}>
      {/* TODO: GroupHeader component */}
      <div />

      <main className={styles.main}>
        {/* TODO: GroupSummaryDashboard component */}
        <div />

        <div className={styles.listHeader}>
          <h3 className={styles.listTitle}>Próximas Partidas</h3>
          <span className={styles.listAction}>Ver tudo</span>
        </div>

        <div className={styles.cardList}>
          {groups.map((group) => (
            <GroupCard key={group.id} group={group} />
          ))}

          {groups.length === 0 && (
            <div className={styles.emptyState}>
              Nenhum grupo disponível no momento.
            </div>
          )}
        </div>
      </main>

      {/* TODO: FAB component */}
      <div />

      {/* TODO: BottomNavBar component */}
      <div />
    </div>
  );
}