import React from 'react';

import { SPORTS } from '@sportspay/shared';

import styles from './styles/event-carousel.module.css';

import type { UpcomingEventItem } from '@/components/group/hooks/hook-use-upcoming-events';

import type { Sport } from '@sportspay/shared';

interface EventCarouselProps {
  events: UpcomingEventItem[];
}

const SPORT_BADGE_CLASS: Record<Sport, string> = {
  futebol: styles.sportBadgeFutebol ?? '',
  volei: styles.sportBadgeVolei ?? '',
  basquete: styles.sportBadgeBasquete ?? '',
  outro: styles.sportBadgeOutro ?? '',
};

function formatEventDate(iso: string): string {
  const date = new Date(iso);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${day}/${month} • ${hours}:${minutes}`;
}

export function EventCarousel({ events }: EventCarouselProps): React.JSX.Element {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>Próximas Partidas</h2>
        <button className={styles.viewAll} type="button">Ver tudo</button>
      </div>

      {events.length === 0 ? (
        <div className={styles.empty}>Nenhum evento agendado.</div>
      ) : (
        <div className={styles.track}>
          {events.map((event) => {
            const extraCount = event.confirmedCount - event.confirmedAvatars.length;

            return (
              <div key={event.id} className={styles.card}>
                <div className={styles.cardTop}>
                  <span className={`${styles.sportBadge} ${SPORT_BADGE_CLASS[event.sport]}`}>
                    {SPORTS[event.sport]}
                  </span>
                  <span className={styles.dateLabel}>{formatEventDate(event.date)}</span>
                </div>

                <div className={styles.cardBody}>
                  <h3 className={styles.eventTitle}>{event.title}</h3>
                  <p className={styles.venueName}>{event.venueName}</p>
                </div>

                <div className={styles.avatarRow}>
                  <div className={styles.avatarStack}>
                    {event.confirmedAvatars.map((url, i) => (
                      <img
                        key={i}
                        className={styles.avatar}
                        src={url}
                        alt="Jogador confirmado"
                      />
                    ))}
                    {extraCount > 0 && (
                      <div className={styles.avatarExtra}>+{extraCount}</div>
                    )}
                  </div>
                  <span className={styles.confirmedLabel}>Confirmados</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
