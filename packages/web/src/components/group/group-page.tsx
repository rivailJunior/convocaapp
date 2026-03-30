'use client';

import React, { useCallback, useState } from 'react';

import { CreateGroupPage } from '@/components/create-group/create-group-page';
import { GroupCard } from '@/components/group/group-card';
import { EventCarousel } from '@/components/group/group-event-carousel';
import { GroupHeader } from '@/components/group/group-header';
import { useGroups } from '@/components/group/hooks/hook-use-groups';
import { useTreasurySummary } from '@/components/group/hooks/hook-use-treasury-summary';
import { useUpcomingEvents } from '@/components/group/hooks/hook-use-upcoming-events';

export function GroupPage(): React.JSX.Element {
  const { groups } = useGroups();
  const { summaries } = useTreasurySummary();
  const groupIds = groups.map((g) => g.id);
  const { events } = useUpcomingEvents(groupIds);
  const [isCreating, setIsCreating] = useState(false);

  const handleCreateGroup = useCallback(() => {
    setIsCreating(true);
  }, []);

  const handleCloseCreateGroup = useCallback(() => {
    setIsCreating(false);
  }, []);

  if (isCreating) {
    return (
      <CreateGroupPage
        onBack={handleCloseCreateGroup}
        onCancel={handleCloseCreateGroup}
        onCreateEvent={() => {}}
      />
    );
  }

  return (
    <div className="bg-background-light font-display text-on-surface min-h-screen pb-32">
      
      <main className="px-6 mt-6">
        {summaries.length > 0 && <GroupHeader summaries={summaries} />}

        <EventCarousel events={events} />

        <div className="flex flex-col gap-4">
          {groups.map((group) => (
            <GroupCard key={group.id} group={group} />
          ))}

          {groups.length === 0 && (
            <div className="rounded-xl border border-dashed border-gray-300 p-4 text-center text-xs text-gray-500">
              Nenhum grupo disponível no momento.
            </div>
          )}
        </div>
      </main>

      <div className="flex justify-end px-6 pt-6">
        <button
          className="w-14 h-14 rounded-2xl bg-primary shadow-[0_10px_25px_rgba(27,94,32,0.3)] flex items-center justify-center text-white border-none cursor-pointer transition-all hover:opacity-95 active:scale-90"
          aria-label="Criar novo grupo"
          type="button"
          onClick={handleCreateGroup}
        >
          <span className="material-symbols-outlined text-3xl font-bold">
            add
          </span>
        </button>
      </div>

      <div />
    </div>
  );
}