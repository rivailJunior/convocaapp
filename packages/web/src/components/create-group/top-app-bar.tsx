import React from 'react';

import { Icon } from '@/components/icon';

interface TopAppBarProps {
  title: string;
  onBack: () => void;
}

export function TopAppBar({ title, onBack }: TopAppBarProps): React.JSX.Element {
  return (
    <nav className="sticky top-0 z-50 w-full bg-surface flex items-center py-3 px-4">
      <div className="flex items-center w-full max-w-2xl mx-auto">
        <button
          type="button"
          className="text-primary p-2 bg-transparent border-none cursor-pointer rounded-full transition-opacity flex items-center justify-center hover:opacity-80 active:scale-95"
          onClick={onBack}
          aria-label="Voltar"
        >
          <Icon name="arrow_back" />
        </button>
        <h1 className="font-display text-xl font-bold tracking-tight text-primary flex-1 text-center pr-10">
          {title}
        </h1>
      </div>
    </nav>
  );
}
