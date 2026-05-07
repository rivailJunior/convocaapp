import { useCallback, useEffect, useState } from 'react';

import {
  addMultipleParticipantsToGroup,
  addParticipantToGroup,
  getGroupById,
  removeParticipantFromGroup,
  updateParticipantName as updateParticipantNameInDB,
} from '../services/database/entities/group/group';

import type { Participant } from '@sportspay/shared';

interface UseManageGroupParticipantsReturn {
  participants: Participant[];
  isLoading: boolean;
  addParticipant: (name: string) => Promise<void>;
  removeParticipant: (id: string) => Promise<void>;
  updateParticipantName: (id: string, name: string) => Promise<void>;
  importParticipants: (names: string[]) => Promise<void>;
  refetch: () => Promise<void>;
}

export function useManageGroupParticipants(groupId: number): UseManageGroupParticipantsReturn {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const refetch = useCallback(async () => {
    setIsLoading(true);
    try {
      const group = await getGroupById(groupId);
      setParticipants(group?.participants || []);
    } catch (error) {
      console.error('[useManageGroupParticipants] Failed to fetch participants:', error);
    } finally {
      setIsLoading(false);
    }
  }, [groupId]);

  const addParticipant = useCallback(
    async (name: string) => {
      if (!name.trim()) return;

      setIsLoading(true);
      try {
        const newId = await addParticipantToGroup(groupId, name.trim());

        setParticipants((prev) => [...prev, { id: String(newId), name: name.trim() }]);
      } catch (error) {
        console.error('[useManageGroupParticipants] Failed to add participant:', error);
        await refetch();
      } finally {
        setIsLoading(false);
      }
    },
    [groupId, refetch],
  );

  const removeParticipant = useCallback(
    async (id: string) => {
      setIsLoading(true);
      try {
        await removeParticipantFromGroup(groupId, id);

        setParticipants((prev) => prev.filter((p) => p.id !== id));
      } catch (error) {
        console.error('[useManageGroupParticipants] Failed to remove participant:', error);
        await refetch();
      } finally {
        setIsLoading(false);
      }
    },
    [groupId, refetch],
  );

  const updateParticipantName = useCallback(
    async (id: string, name: string) => {
      if (!name.trim()) return;

      setIsLoading(true);
      try {
        await updateParticipantNameInDB(groupId, id, name.trim());

        setParticipants((prev) => prev.map((p) => (p.id === id ? { ...p, name: name.trim() } : p)));
      } catch (error) {
        console.error('[useManageGroupParticipants] Failed to update participant name:', error);
        await refetch();
      } finally {
        setIsLoading(false);
      }
    },
    [groupId, refetch],
  );

  const importParticipants = useCallback(
    async (names: string[]) => {
      const validNames = names.filter((name) => name.trim().length > 0);
      if (validNames.length === 0) return;

      setIsLoading(true);
      try {
        const newIds = await addMultipleParticipantsToGroup(groupId, validNames);

        const newParticipants = validNames.map((name, index) => ({
          id: String(newIds[index]),
          name: name.trim(),
        }));

        setParticipants((prev) => [...prev, ...newParticipants]);
      } catch (error) {
        console.error('[useManageGroupParticipants] Failed to import participants:', error);
        await refetch();
      } finally {
        setIsLoading(false);
      }
    },
    [groupId, refetch],
  );

  useEffect(() => {
    refetch();
  }, [refetch]);

  return {
    participants,
    isLoading,
    addParticipant,
    removeParticipant,
    updateParticipantName,
    importParticipants,
    refetch,
  };
}
