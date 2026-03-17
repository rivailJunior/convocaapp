import React from 'react';

import type { NextEventData } from '@/mocks/home';

import { Icon } from '@/components/icon';

interface NextEventCardProps {
  event: NextEventData;
}

export function NextEventCard({ event }: NextEventCardProps): React.JSX.Element {
  return (
    <section className="px-4 mb-6">
      <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3">Próximo Evento</h3>
      <div className="bg-white dark:bg-slate-900 rounded-xl overflow-hidden shadow-sm border border-slate-100 dark:border-slate-800">
        {/* Event banner */}
        <div className="h-24 bg-primary relative flex items-end">
          <div className="absolute bottom-3 left-4 flex items-center gap-2">
            <span className="bg-accent text-primary text-[10px] font-black px-2 py-0.5 rounded uppercase">
              {event.type}
            </span>
            <p className="text-white text-xs font-medium">{event.date}</p>
          </div>
        </div>

        <div className="p-4">
          <div className="flex justify-between items-center">
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white">
                <div className="flex items-center gap-1">
                  <Icon name="location_on" className="text-primary text-sm" />
                  <span>{event.venueName}</span>
                </div>
              </h4>
              <div className="flex items-center gap-1 text-slate-500 text-xs mt-1">
                <Icon name="schedule" className="text-sm" />
                {event.time} • {event.duration}
              </div>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-xs font-bold text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/30 px-2 py-1 rounded-full">
                {event.confirmedCount} confirmados
              </span>
            </div>
          </div>

          {/* Avatars */}
          <div className="mt-4 flex items-center gap-2">
            <div className="flex -space-x-2 overflow-hidden">
              {Array.from({ length: event.totalAvatars }).map((_, i) => (
                <div
                  key={i}
                  className="inline-block h-6 w-6 rounded-full ring-2 ring-white bg-slate-200 dark:bg-slate-700 flex items-center justify-center"
                >
                  <Icon name="person" className="text-[10px] text-slate-400" />
                </div>
              ))}
            </div>
            {event.confirmedCount > event.totalAvatars && (
              <span className="text-[10px] text-slate-500 font-medium">
                +{event.confirmedCount - event.totalAvatars} outros
              </span>
            )}
          </div>

          <button className="w-full mt-4 py-3 bg-primary text-white rounded-lg text-xs font-bold transition-colors hover:bg-primary/90 flex items-center justify-center gap-2 shadow-sm">
            <Icon name="check_circle" className="text-sm" />
            Confirmar Presença
          </button>
        </div>
      </div>
    </section>
  );
}
