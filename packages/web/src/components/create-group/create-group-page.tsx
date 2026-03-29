'use client';

import React from 'react';

import { Icon } from '@/components/icon';

import { BottomActionBar } from './bottom-action-bar';
import { CreateEventBanner } from './create-event-banner';
import { useCreateGroup } from './hooks/hook-use-create-group';
import { ParticipantList } from './participant-list';
import { SportSelectionGrid } from './sport-selection-grid';
import { TopAppBar } from './top-app-bar';

import styles from './styles/create-group-page.module.css';

interface CreateGroupPageProps {
  onBack?: () => void;
  onCancel?: () => void;
  onCreateEvent?: () => void;
}

export function CreateGroupPage({
  onBack,
  onCancel,
  onCreateEvent,
}: CreateGroupPageProps): React.JSX.Element {
  const {
    formState,
    setGroupName,
    setSport,
    setPixKey,
    addParticipant,
    removeParticipant,
    changeParticipantName,
    isValid,
    isSubmitting,
    handleSubmit,
  } = useCreateGroup();

  return (
    <div className={styles.page}>
      <TopAppBar title="Novo Grupo" onBack={onBack ?? (() => {})} />

      <main className={styles.main}>
        {/* Section 1: Basic Info */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Informações Básicas</h2>
          <div className={styles.fieldGroup}>
            <div className={styles.fieldWrapper}>
              <label className={styles.fieldLabel}>Nome do grupo</label>
              <input
                type="text"
                className={styles.textInput}
                placeholder="Ex: Fute de quinta"
                value={formState.groupName}
                onChange={(e) => setGroupName(e.target.value)}
              />
            </div>

            <SportSelectionGrid
              selected={formState.sport}
              onSelect={setSport}
            />
          </div>
        </section>

        {/* Section 2: Pix Key */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Chave Pix do caixa</h2>
            <Icon name="info" className={styles.infoIcon} />
          </div>
          <div className={styles.fieldWrapper}>
            <div className={styles.pixInputWrapper}>
              <Icon name="credit_card" className={styles.pixIcon} />
              <input
                type="text"
                className={styles.pixInput}
                placeholder="Ex: joao@email.com"
                value={formState.pixKey}
                onChange={(e) => setPixKey(e.target.value)}
              />
            </div>
            <p className={styles.helperText}>
              Será usada para compartilhar cobrança nos eventos
            </p>
          </div>
        </section>

        {/* Section 3: Participants */}
        <ParticipantList
          className={styles.section}
          participants={formState.participants}
          onChangeName={changeParticipantName}
          onRemove={removeParticipant}
          onAdd={addParticipant}
          onImport={() => {}}
        />

        {/* Section 4: Create Event Banner */}
        <CreateEventBanner
          className={styles.section}
          onCreateEvent={onCreateEvent ?? (() => {})}
        />
      </main>

      <BottomActionBar
        onCancel={onCancel ?? (() => {})}
        onSubmit={handleSubmit}
        submitLabel="Criar Grupo"
        isSubmitting={isSubmitting}
      />
    </div>
  );
}
