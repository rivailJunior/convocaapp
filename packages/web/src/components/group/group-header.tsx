import React from 'react';

import { formatCurrency } from '@sportspay/shared';

import styles from './styles/group-header.module.css';

import type { TreasurySummary } from '@sportspay/shared';

interface GroupHeaderProps {
  summaries: TreasurySummary[];
}

function sumBalances(summaries: TreasurySummary[]): number {
  return summaries.reduce((total, s) => total + s.balance, 0);
}

export function GroupHeader({ summaries }: GroupHeaderProps): React.JSX.Element {
  const totalBalance = sumBalances(summaries);
  const activeCount = summaries.length;

  return (
    <section className={styles.section}>
      <div className={styles.content}>
        <span className={styles.label}>Saldo Total em Grupos</span>
        <div className={styles.row}>
          <h1 className={styles.balance}>{formatCurrency(totalBalance)}</h1>
          <div className={styles.badge}>
            <span className={styles.badgeDot} />
            <span className={styles.badgeText}>{activeCount} ATIVOS</span>
          </div>
        </div>
      </div>
      <span className={`material-symbols-outlined ${styles.decorative}`}>
        account_balance_wallet
      </span>
    </section>
  );
}
