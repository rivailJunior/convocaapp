import React from 'react';

import type { Sport } from '@sportspay/shared';

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
    <fieldset className={`flex flex-col gap-2 ${className ?? ''}`}>
      <legend className="font-display font-semibold text-sm text-on-surface-variant">Esporte</legend>
      <div className="grid grid-cols-2 gap-4">
        {SPORT_OPTIONS.map((option) => {
          const isSelected = selected === option.value;
          return (
            <button
              key={option.value}
              type="button"
              className={`relative border-2 bg-white rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer transition-all hover:bg-surface-dim hover:shadow-sm active:scale-95 ${isSelected ? 'border-primary bg-primary/5' : 'border-transparent'}`}
              onClick={() => onSelect(option.value)}
              aria-pressed={isSelected}
            >
              <span className="text-3xl mb-2 leading-none">{option.emoji}</span>
              <span className={`font-display font-bold text-sm ${isSelected ? 'text-primary' : 'text-on-surface-variant'}`}>
                {option.label}
              </span>
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
