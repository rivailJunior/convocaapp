import React from 'react';

import { formatCurrency } from '@sportspay/shared';

import type { HomeUser } from '@/mocks/home';

import { Icon } from '@/components/icon';

interface HomeHeaderProps {
  user: HomeUser;
}

export function HomeHeader({ user }: HomeHeaderProps): React.JSX.Element {
  return (
    <header className="sticky top-0 z-20 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md px-4 py-4 flex items-center justify-between border-b border-slate-200 dark:border-slate-800">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center overflow-hidden">
          {user.avatarUrl ? (
            <img
              alt="Avatar do Administrador"
              className="w-full h-full object-cover"
              src={user.avatarUrl}
            />
          ) : (
            <Icon name="person" className="text-primary" />
          )}
        </div>
        <div>
          <p className="text-xs text-slate-500 font-medium">Bem-vindo, {user.name}</p>
          <h1 className="text-lg font-bold text-primary dark:text-accent leading-tight">
            {user.groupName}
          </h1>
          <div className="mt-1 flex">
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-green-100 text-green-800 border border-green-200">
              Caixa: {formatCurrency(user.treasuryBalance)}
            </span>
          </div>
        </div>
      </div>
      <button className="w-10 h-10 flex items-center justify-center rounded-full bg-white dark:bg-slate-800 shadow-sm">
        <Icon name="notifications" className="text-slate-600 dark:text-slate-300" />
      </button>
    </header>
  );
}
