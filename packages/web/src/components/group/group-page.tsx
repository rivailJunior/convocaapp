'use client';

import React from 'react';

import styles from './styles/group-page.module.css';

import { GroupCard } from '@/components/group/group-card';
import { GroupHeader } from '@/components/group/group-header';
import { useGroups } from '@/components/group/hooks/hook-use-groups';
import { useTreasurySummary } from '@/components/group/hooks/hook-use-treasury-summary';

export function GroupPage(): React.JSX.Element {
  const { groups } = useGroups();
  const { summaries } = useTreasurySummary();

  return (
    <div className={styles.page}>
      {/* TODO: GroupHeader component */}
      <div />

      <main className={styles.main}>
        {summaries.length > 0 ? <GroupHeader summaries={summaries} /> : <div />}

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

      <div className={styles.fabWrapper}>
        <button
          className={styles.fab}
          aria-label="Criar novo grupo"
          type="button"
        >
          <span className={`material-symbols-outlined ${styles.fabIcon}`}>
            add
          </span>
        </button>
      </div>

      {/* TODO: BottomNavBar component */}
      <div />
    </div>
  );
}