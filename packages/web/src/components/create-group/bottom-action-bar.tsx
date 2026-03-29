import React from 'react';

import { Icon } from '@/components/icon';

import styles from './styles/bottom-action-bar.module.css';

interface BottomActionBarProps {
  onCancel: () => void;
  onSubmit: () => void;
  submitLabel: string;
  isSubmitting?: boolean;
  className?: string;
}

export function BottomActionBar({
  onCancel,
  onSubmit,
  submitLabel,
  isSubmitting = false,
  className,
}: BottomActionBarProps): React.JSX.Element {
  return (
    <footer className={`${styles.bar} ${className ?? ''}`}>
      <button type="button" className={styles.cancelButton} onClick={onCancel}>
        <Icon name="close" />
        <span className={styles.cancelLabel}>Cancelar</span>
      </button>
      <button
        type="button"
        className={styles.submitButton}
        onClick={onSubmit}
        disabled={isSubmitting}
      >
        <Icon name="check_circle" filled />
        <span className={styles.submitLabel}>{submitLabel}</span>
      </button>
    </footer>
  );
}
