import React from 'react';

import type { Sport } from '@sportspay/shared';

import styles from './styles/sport-selection-grid.module.css';

const SPORT_OPTIONS: { value: Sport; label: string; emoji: string }[] = [
  { value: 'futebol', label: 'Futebol', emoji: '⚽' },
  { value: 'volei', label: 'Vôlei', emoji: '🏐' },
  { value: 'basquete', label: 'Basquete', emoji: '🏀' },
  { value: 'outro', label: 'Outro', emoji: '⚙️' },
];

interface SportSelectionGridProps {
  selected: Sport | null;
  onSelect: (sport: Sport) => void;
  className?: string;
}

export function SportSelectionGrid({ selected, onSelect, className }: SportSelectionGridProps): React.JSX.Element {
  return (
    <fieldset className={`${styles.wrapper} ${className ?? ''}`}>
      <legend className={styles.label}>Esporte</legend>
      <div className={styles.grid}>
        {SPORT_OPTIONS.map((option) => {
          const isSelected = selected === option.value;
          return (
            <button
              key={option.value}
              type="button"
              className={`${styles.card} ${isSelected ? styles.cardSelected : ''}`}
              onClick={() => onSelect(option.value)}
              aria-pressed={isSelected}
            >
              <span className={styles.emoji}>{option.emoji}</span>
              <span className={`${styles.sportName} ${isSelected ? styles.sportNameSelected : ''}`}>
                {option.label}
              </span>
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
