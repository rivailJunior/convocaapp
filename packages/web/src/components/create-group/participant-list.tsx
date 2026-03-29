import React from 'react';

import { Icon } from '@/components/icon';

import styles from './styles/participant-list.module.css';

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
      <div className={styles.header}>
        <h2 className={styles.title}>Participantes ({participants.length})</h2>
      </div>

      <div className={styles.list}>
        {participants.map((participant) => (
          <div key={participant.id} className={styles.item}>
            <input
              type="text"
              className={styles.itemInput}
              value={participant.name}
              onChange={(e) => onChangeName(participant.id, e.target.value)}
              placeholder="Nome do participante"
              aria-label="Nome do participante"
            />
            <button
              type="button"
              className={styles.removeButton}
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

      <div className={styles.actions}>
        <button type="button" className={styles.addButton} onClick={onAdd}>
          <Icon name="add" className="text-lg" />
          Adicionar participante
        </button>
        <button type="button" className={styles.importButton} onClick={onImport}>
          <Icon name="upload" className="text-lg" />
          Importar lista
        </button>
      </div>
    </section>
  );
}
