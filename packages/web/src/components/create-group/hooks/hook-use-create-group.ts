'use client';

import { useCallback, useState } from 'react';

import type { Participant } from '../participant-list';
import type { Sport } from '@sportspay/shared';

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
  isValid: boolean;
  isSubmitting: boolean;
  handleSubmit: () => void;
}

let nextParticipantId = 4;

export function useCreateGroup(): UseCreateGroupReturn {
  const [formState, setFormState] = useState<CreateGroupFormState>({
    groupName: '',
    sport: null,
    pixKey: '',
    participants: [
      { id: '1', name: '' },
      { id: '2', name: '' },
      { id: '3', name: '' },
    ],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    const id = String(nextParticipantId++);
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

  const isValid =
    formState.groupName.trim().length > 0 &&
    formState.sport !== null &&
    formState.participants.some((p) => p.name.trim().length > 0);

  const handleSubmit = useCallback(() => {
    if (!isValid || isSubmitting) return;
    setIsSubmitting(true);
    // Placeholder for actual submission logic
    setTimeout(() => {
      setIsSubmitting(false);
    }, 1000);
  }, [isValid, isSubmitting]);

  return {
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
  };
}
