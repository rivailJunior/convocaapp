import React from 'react';

import type { HomeNavItem } from '@/mocks/home';

import { Icon } from '@/components/icon';

interface HomeBottomNavProps {
  items: HomeNavItem[];
}

export function HomeBottomNav({ items }: HomeBottomNavProps): React.JSX.Element {
  return (
    <>
      {/* FAB */}
      <button className="fixed bottom-24 right-4 w-14 h-14 bg-accent rounded-full shadow-lg flex items-center justify-center text-primary z-30 active:scale-95 transition-transform">
        <Icon name="add" className="text-3xl font-bold" />
      </button>

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 px-6 py-3 pb-6 flex justify-between items-center z-40">
        {items.map((item) => (
          <a
            key={item.label}
            className={`flex flex-col items-center gap-1 ${
              item.active
                ? 'text-primary'
                : 'text-slate-400 dark:text-slate-500'
            }`}
            href={item.href}
          >
            <Icon name={item.icon} filled={item.active} />
            <span className={`text-[10px] ${item.active ? 'font-bold' : 'font-medium'}`}>
              {item.label}
            </span>
          </a>
        ))}
      </nav>
    </>
  );
}
