import React from 'react';

import { Icon } from '@/components/icon';

import styles from './styles/top-app-bar.module.css';

interface TopAppBarProps {
  title: string;
  onBack: () => void;
}

export function TopAppBar({ title, onBack }: TopAppBarProps): React.JSX.Element {
  return (
    <nav className={styles.nav}>
      <div className={styles.inner}>
        <button
          type="button"
          className={styles.backButton}
          onClick={onBack}
          aria-label="Voltar"
        >
          <Icon name="arrow_back" />
        </button>
        <h1 className={styles.title}>{title}</h1>
      </div>
    </nav>
  );
}
