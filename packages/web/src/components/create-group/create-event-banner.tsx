import React from 'react';

import { Icon } from '@/components/icon';

interface CreateEventBannerProps {
  onCreateEvent: () => void;
  className?: string;
}

export function CreateEventBanner({ onCreateEvent, className }: CreateEventBannerProps): React.JSX.Element {
  return (
    <aside className={`pt-4 mt-4 ${className ?? ''}`}>
      <div className="bg-primary/5 rounded-2xl p-5 shadow-[0_0_0_1px_rgba(38,104,41,0.15)] flex flex-col gap-4">
        <div className="flex items-start gap-3">
          <div className="bg-primary/10 p-2 rounded-lg text-primary flex items-center justify-center shrink-0">
            <Icon name="event" />
          </div>
          <div className="flex flex-col">
            <h3 className="font-display font-bold text-primary text-base leading-snug">Agendar primeira partida?</h3>
            <p className="font-display text-xs text-on-surface-variant leading-relaxed">
              Pule etapas criando o grupo e já agendando o primeiro evento com estes participantes.
            </p>
          </div>
        </div>
        <button
          type="button"
          className="w-full bg-white border border-on-surface/15 text-primary font-display font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-sm hover:bg-primary/5 active:scale-[0.98]"
          onClick={onCreateEvent}
        >
          <Icon name="rocket_launch" className="text-lg" />
          Criar Evento e mover participantes
        </button>
      </div>
    </aside>
  );
}
