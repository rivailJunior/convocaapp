import React from 'react';

import type { Group } from '@sportspay/shared';

interface GroupPageProps {
  items: Group[];
}

export function GroupPage({ items }: GroupPageProps): React.JSX.Element {
  return (
    <section className="px-4 py-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-sm font-bold text-slate-900 dark:text-white">Grupos</h2>
        <button className="text-xs font-bold text-primary">Ver tudo</button>
      </div>

      <ul className="space-y-3" aria-label="Lista de grupos">
        {items.map((item) => (
          <li
            key={item.id}
            className="flex items-center gap-3 rounded-xl border border-slate-100 bg-white p-3 shadow-sm dark:border-slate-800 dark:bg-slate-900"
          >
            <img
              src={item.avatarUrl}
              alt={`Thumb do grupo ${item.name}`}
              className="h-12 w-12 rounded-lg object-cover"
            />

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-bold text-slate-900 dark:text-slate-100">
                {item.name}
              </p>
              <p className="truncate text-xs text-slate-500 dark:text-slate-400">{item.sport}</p>
            </div>
          </li>
        ))}

        {items.length === 0 ? (
          <li className="rounded-xl border border-dashed border-slate-300 p-4 text-center text-xs text-slate-500 dark:border-slate-700 dark:text-slate-400">
            Nenhum grupo disponivel no momento.
          </li>
        ) : null}
      </ul>
    </section>
  );
}