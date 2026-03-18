import React from 'react';

import type { HomeQuickAction } from '@/mocks/home';

import { Icon } from '@/components/icon';

interface HomeQuickActionsProps {
  actions: HomeQuickAction[];
}

export function HomeQuickActions({ actions }: HomeQuickActionsProps): React.JSX.Element {
  return (
    <section className="mb-6">
      <h3 className="px-4 text-sm font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
        Ações Rápidas
        <span className="h-1 w-1 rounded-full bg-accent" />
      </h3>
      <div className="grid grid-cols-2 gap-3 px-4">
        {actions.map((action) => (
          <button
            key={action.label}
            className="flex flex-col items-center justify-center p-4 bg-accent/10 dark:bg-accent/5 rounded-xl border border-accent/20 aspect-square"
          >
            <Icon name={action.icon} className="text-primary mb-2 text-2xl" />
            <span className="text-xs font-bold text-primary text-center">{action.label}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
