import React from 'react';

import styles from './styles/group-card.module.css';

import type { GroupDisplayItem } from '@/components/group/hook-use-groups';

import { getSportEmoji } from '@/components/group/hook-use-groups';

interface GroupCardProps {
  group: GroupDisplayItem;
}

export function GroupCard({ group }: GroupCardProps): React.JSX.Element {
  return (
    <div className={styles.card}>
      <div className={styles.avatar}>
        {getSportEmoji(group.sport)}
      </div>

      <div className={styles.content}>
        <div className={styles.header}>
          <h4 className={styles.name}>{group.name}</h4>
          {group.paymentStatus === 'paid' && (
            <span className={`${styles.badge} ${styles.badgePaid}`}>PAGO</span>
          )}
          {group.paymentStatus === 'pending' && (
            <span className={`${styles.badge} ${styles.badgePending}`}>PENDENTE</span>
          )}
        </div>

        <p className={styles.meta}>
          {group.memberCount} participantes
        </p>

        {group.nextEvent ? (
          <div className={styles.event}>
            <span className={`material-symbols-outlined ${styles.eventIcon}`}>
              event
            </span>
            Próximo: {group.nextEvent}
          </div>
        ) : (
          <div className={styles.noEvent}>
            <span className={`material-symbols-outlined ${styles.eventIcon}`}>
              calendar_today
            </span>
            Sem eventos marcados
          </div>
        )}
      </div>
    </div>
  );
}
