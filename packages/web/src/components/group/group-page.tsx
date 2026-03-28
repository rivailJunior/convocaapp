'use client';

import React from 'react';

import styles from './styles/group-page.module.css';

import { GroupCard } from '@/components/group/group-card';
import { EventCarousel } from '@/components/group/group-event-carousel';
import { GroupHeader } from '@/components/group/group-header';
import { useGroups } from '@/components/group/hooks/hook-use-groups';
import { useUpcomingEvents } from '@/components/group/hooks/hook-use-upcoming-events';
import { useTreasurySummary } from '@/components/group/hooks/hook-use-treasury-summary';

export function GroupPage(): React.JSX.Element {
  const { groups } = useGroups();
  const { summaries } = useTreasurySummary();
  const groupIds = groups.map((g) => g.id);
  const { events } = useUpcomingEvents(groupIds);

  return (
    <div className={styles.page}>
      
      <main className={styles.main}>
        {summaries.length > 0 ? <GroupHeader summaries={summaries} /> : <div />}

        <EventCarousel events={events} />

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