import React from 'react';

import { Icon } from '@/components/icon';

import styles from './styles/create-event-banner.module.css';

interface CreateEventBannerProps {
  onCreateEvent: () => void;
  className?: string;
}

export function CreateEventBanner({ onCreateEvent, className }: CreateEventBannerProps): React.JSX.Element {
  return (
    <aside className={`${styles.wrapper} ${className ?? ''}`}>
      <div className={styles.card}>
        <div className={styles.content}>
          <div className={styles.iconWrapper}>
            <Icon name="event" />
          </div>
          <div className={styles.textContent}>
            <h3 className={styles.heading}>Agendar primeira partida?</h3>
            <p className={styles.description}>
              Pule etapas criando o grupo e já agendando o primeiro evento com estes participantes.
            </p>
          </div>
        </div>
        <button type="button" className={styles.ctaButton} onClick={onCreateEvent}>
          <Icon name="rocket_launch" className="text-lg" />
          Criar Evento e mover participantes
        </button>
      </div>
    </aside>
  );
}
