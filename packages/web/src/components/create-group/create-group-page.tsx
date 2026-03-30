'use client';

import React from 'react';

import { BottomActionBar } from './bottom-action-bar';
import { CreateEventBanner } from './create-event-banner';
import { useCreateGroup } from './hooks/hook-use-create-group';
import { ParticipantList } from './participant-list';
import { SportSelectionGrid } from './sport-selection-grid';
import { TopAppBar } from './top-app-bar';

import { Icon } from '@/components/icon';

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
    <div className="bg-surface-bright min-h-screen flex flex-col">
      <TopAppBar title="Novo Grupo" onBack={onBack ?? (() => {})} />

      <main className="flex-1 overflow-y-auto px-4 pt-6 pb-32 max-w-2xl mx-auto w-full">
        <section className="mb-8">
          <h2 className="font-display font-bold text-lg text-on-surface mb-4">Informações Básicas</h2>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label className="font-display font-semibold text-sm text-on-surface-variant" htmlFor="groupName">
                Nome do grupo
              </label>
              <input
                id="groupName"
                type="text"
                className="w-full bg-surface-dim border-none rounded-xl p-4 text-on-surface font-display text-base outline-none transition-all border-b-2 border-b-transparent focus:border-b-accent placeholder:text-outline"
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

        <section className="mb-8">
          <div className="flex items-center gap-1 mb-4">
            <h2 className="font-display font-bold text-lg text-on-surface">Chave Pix do caixa</h2>
            <Icon name="info" className="text-outline text-lg" />
          </div>
          <div className="flex flex-col gap-2">
            <div className="relative flex items-center bg-surface-dim rounded-xl pl-4">
              <Icon name="credit_card" className="text-on-surface-variant mr-3 shrink-0" />
              <input
                type="text"
                className="w-full bg-transparent border-none py-4 pr-4 text-on-surface font-display text-base outline-none border-b-2 border-b-transparent transition-all focus:border-b-accent placeholder:text-outline"
                placeholder="Ex: joao@email.com"
                value={formState.pixKey}
                onChange={(e) => setPixKey(e.target.value)}
              />
            </div>
            <p className="font-display text-[10px] font-medium text-on-surface-variant pl-1">
              Será usada para compartilhar cobrança nos eventos
            </p>
          </div>
        </section>

        <ParticipantList
          className="mb-8"
          participants={formState.participants}
          onChangeName={changeParticipantName}
          onRemove={removeParticipant}
          onAdd={addParticipant}
          onImport={() => {
            alert('A funcionalidade de importar lista ainda não está disponível.');
          }}
        />

        <CreateEventBanner
          className="mb-8"
          onCreateEvent={onCreateEvent ?? (() => {})}
        />
      </main>

      <BottomActionBar
        onCancel={onCancel ?? (() => {})}
        onSubmit={handleSubmit}
        submitLabel="Criar Grupo"
        isSubmitting={isSubmitting}
        disabled={!isValid || isSubmitting}
      />
    </div>
  );
}
