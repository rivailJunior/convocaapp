import React from 'react';

import type { ActivityItem } from '@/mocks/home';

import { Icon } from '@/components/icon';

interface ActivityFeedProps {
  items: ActivityItem[];
}

const TYPE_STYLES = {
  success: {
    bg: 'bg-green-100 dark:bg-green-900/30',
    text: 'text-green-600',
  },
  error: {
    bg: 'bg-red-100 dark:bg-red-900/30',
    text: 'text-red-600',
  },
  info: {
    bg: 'bg-blue-100 dark:bg-blue-900/30',
    text: 'text-blue-600',
  },
};

export function ActivityFeed({ items }: ActivityFeedProps): React.JSX.Element {
  return (
    <section className="px-4 mb-8">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white">Atividade Recente</h3>
        <button className="text-xs text-primary font-bold">Ver tudo</button>
      </div>
      <div className="space-y-3">
        {items.map((item) => {
          const styles = TYPE_STYLES[item.type];
          return (
            <div
              key={item.id}
              className="flex items-center gap-3 p-3 bg-white dark:bg-slate-900 rounded-lg border border-slate-100 dark:border-slate-800 shadow-sm"
            >
              <div
                className={`w-10 h-10 rounded-full ${styles.bg} flex items-center justify-center ${styles.text}`}
              >
                <Icon name={item.icon} />
              </div>
              <div className="flex-1">
                <p className="text-xs text-slate-900 dark:text-slate-200">
                  <span className="font-bold">{item.userName}</span> {item.action}
                </p>
                <p className="text-[10px] text-slate-500">{item.time}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
