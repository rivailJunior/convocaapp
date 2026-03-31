import { useCallback, useRef, useState } from 'react';

import type { Participant, Sport } from '../types';

interface CreateGroupFormState {
  groupName: string;
  sport: Sport | null;
  pixKey: string;
  participants: Participant[];
}

interface UseCreateGroupReturn {
  formState: CreateGroupFormState;
  setGroupName: (name: string) => void;
  setSport: (sport: Sport) => void;
  setPixKey: (key: string) => void;
  addParticipant: () => void;
  removeParticipant: (id: string) => void;
  changeParticipantName: (id: string, name: string) => void;
}

export function useCreateGroup(): UseCreateGroupReturn {
  const nextId = useRef(1);
  const [formState, setFormState] = useState<CreateGroupFormState>({
    groupName: '',
    sport: null,
    pixKey: '',
    participants: [],
  });

  const setGroupName = useCallback((name: string) => {
    setFormState((prev) => ({ ...prev, groupName: name }));
  }, []);

  const setSport = useCallback((sport: Sport) => {
    setFormState((prev) => ({ ...prev, sport }));
  }, []);

  const setPixKey = useCallback((key: string) => {
    setFormState((prev) => ({ ...prev, pixKey: key }));
  }, []);

  const addParticipant = useCallback(() => {
    const id = String(nextId.current++);
    setFormState((prev) => ({
      ...prev,
      participants: [...prev.participants, { id, name: '' }],
    }));
  }, []);

  const removeParticipant = useCallback((id: string) => {
    setFormState((prev) => ({
      ...prev,
      participants: prev.participants.filter((p) => p.id !== id),
    }));
  }, []);

  const changeParticipantName = useCallback((id: string, name: string) => {
    setFormState((prev) => ({
      ...prev,
      participants: prev.participants.map((p) =>
        p.id === id ? { ...p, name } : p,
      ),
    }));
  }, []);

  return {
    formState,
    setGroupName,
    setSport,
    setPixKey,
    addParticipant,
    removeParticipant,
    changeParticipantName,
  };
}
