import React from 'react';

import { Icon } from '@/components/icon';

export interface Participant {
  id: string;
  name: string;
}

interface ParticipantListProps {
  participants: Participant[];
  onChangeName: (id: string, name: string) => void;
  onRemove: (id: string) => void;
  onAdd: () => void;
  onImport: () => void;
  className?: string;
}

export function ParticipantList({
  participants,
  onChangeName,
  onRemove,
  onAdd,
  onImport,
  className,
}: ParticipantListProps): React.JSX.Element {
  return (
    <section className={className}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-lg text-[#2c2f30]">
          Participantes ({participants.length})
        </h2>
      </div>

      <div className="flex flex-col gap-3">
        {participants.map((participant) => (
          <div
            key={participant.id}
            className="flex items-center bg-white rounded-xl p-1 pr-4 shadow-[0_4px_16px_rgba(44,47,48,0.04)]"
          >
            <input
              type="text"
              className="flex-1 bg-transparent border-none py-3 px-4 text-[#2c2f30] font-display font-medium text-base outline-none placeholder:text-[#757778]"
              value={participant.name}
              onChange={(e) => onChangeName(participant.id, e.target.value)}
              placeholder="Nome do participante"
              aria-label="Nome do participante"
            />
            <button
              type="button"
              className="text-[#b92902] p-2 rounded-full bg-transparent border-none cursor-pointer flex items-center justify-center transition-colors duration-200 hover:bg-[rgba(249,86,48,0.1)] active:scale-90"
              onClick={() => onRemove(participant.id)}
              aria-label={
                participant.name && participant.name.trim()
                  ? `Remover ${participant.name}`
                  : 'Remover participante'
              }
            >
              <Icon name="close" className="text-lg" />
            </button>
          </div>
        ))}
      </div>

      <div className="mt-4 flex flex-col gap-3">
        <button
          type="button"
          className="flex items-center justify-center gap-2 text-[#3f5700] font-display font-bold text-sm p-2 bg-transparent border-none cursor-pointer transition-opacity duration-200 hover:opacity-80 active:scale-[0.98]"
          onClick={onAdd}
        >
          <Icon name="add" className="text-lg" />
          Adicionar participante
        </button>
        <button
          type="button"
          className="flex items-center justify-center gap-2 border-2 border-[#abadae] text-[#2c2f30] font-display font-bold text-sm py-3 rounded-xl bg-transparent cursor-pointer transition-colors duration-200 hover:bg-[#e6e8ea] active:scale-[0.98]"
          onClick={onImport}
        >
          <Icon name="upload" className="text-lg" />
          Importar lista
        </button>
      </div>
    </section>
  );
}
