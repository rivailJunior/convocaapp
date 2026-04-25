import { useCallback, useMemo, useRef, useState } from 'react';

import type { Participant, Sport } from '../types';

interface CreateGroupFormState {
  groupName: string;
  sport: Sport | null;
  pixKey: string;
  participants: Participant[];
}

const INITIAL_STATE: CreateGroupFormState = {
  groupName: '',
  sport: null,
  pixKey: '',
  participants: [],
};

interface UseCreateGroupReturn {
  formState: CreateGroupFormState;
  canSubmit: boolean;
  setGroupName: (name: string) => void;
  setSport: (sport: Sport) => void;
  setPixKey: (key: string) => void;
  addParticipant: () => void;
  removeParticipant: (id: string) => void;
  changeParticipantName: (id: string, name: string) => void;
  resetForm: () => void;
}

export function useCreateGroup(): UseCreateGroupReturn {
  const nextId = useRef(1);
  const [formState, setFormState] = useState<CreateGroupFormState>(INITIAL_STATE);

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
      participants: prev.participants.map((p) => (p.id === id ? { ...p, name } : p)),
    }));
  }, []);

  const canSubmit = useMemo(() => {
    const hasName = formState.groupName.trim().length >= 2;
    const hasSport = formState.sport !== null;
    return hasName && hasSport;
  }, [formState.groupName, formState.sport]);

  const resetForm = useCallback(() => {
    nextId.current = 1;
    setFormState(INITIAL_STATE);
  }, []);

  return {
    formState,
    canSubmit,
    setGroupName,
    setSport,
    setPixKey,
    addParticipant,
    removeParticipant,
    changeParticipantName,
    resetForm,
  };
}
