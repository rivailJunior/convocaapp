import { useState } from 'react';

type RecurrentEventFormData = {
  eventName: string;
  dateTime: string;
  location: string;
  notes: string;
  isRecurring: boolean;
  frequency: string;
  selectedDays: number[];
  endDate: string;
  arenaValue: string;
  participantValue: string;
};

type RecurrentEventFormActions = {
  setEventName: (value: string) => void;
  setDateTime: (value: string) => void;
  setLocation: (value: string) => void;
  setNotes: (value: string) => void;
  setIsRecurring: (value: boolean) => void;
  setFrequency: (value: string) => void;
  toggleDay: (day: number) => void;
  setEndDate: (value: string) => void;
  setArenaValue: (value: string) => void;
  setParticipantValue: (value: string) => void;
  resetForm: () => void;
};

type UseRecurrentEventFormReturn = RecurrentEventFormData & RecurrentEventFormActions;

const INITIAL_STATE: RecurrentEventFormData = {
  eventName: '',
  dateTime: '',
  location: '',
  notes: '',
  isRecurring: false,
  frequency: 'weekly',
  selectedDays: [],
  endDate: '',
  arenaValue: '',
  participantValue: '',
};

export function useRecurrentEventForm(): UseRecurrentEventFormReturn {
  const [eventName, setEventName] = useState(INITIAL_STATE.eventName);
  const [dateTime, setDateTime] = useState(INITIAL_STATE.dateTime);
  const [location, setLocation] = useState(INITIAL_STATE.location);
  const [notes, setNotes] = useState(INITIAL_STATE.notes);
  const [isRecurring, setIsRecurring] = useState(INITIAL_STATE.isRecurring);
  const [frequency, setFrequency] = useState(INITIAL_STATE.frequency);
  const [selectedDays, setSelectedDays] = useState<number[]>(INITIAL_STATE.selectedDays);
  const [endDate, setEndDate] = useState(INITIAL_STATE.endDate);
  const [arenaValue, setArenaValue] = useState(INITIAL_STATE.arenaValue);
  const [participantValue, setParticipantValue] = useState(INITIAL_STATE.participantValue);

  const toggleDay = (day: number) => {
    setSelectedDays((prev: number[]) =>
      prev.includes(day) ? prev.filter((d: number) => d !== day) : [...prev, day],
    );
  };

  const resetForm = () => {
    setEventName(INITIAL_STATE.eventName);
    setDateTime(INITIAL_STATE.dateTime);
    setLocation(INITIAL_STATE.location);
    setNotes(INITIAL_STATE.notes);
    setIsRecurring(INITIAL_STATE.isRecurring);
    setFrequency(INITIAL_STATE.frequency);
    setSelectedDays(INITIAL_STATE.selectedDays);
    setEndDate(INITIAL_STATE.endDate);
    setArenaValue(INITIAL_STATE.arenaValue);
    setParticipantValue(INITIAL_STATE.participantValue);
  };

  return {
    eventName,
    dateTime,
    location,
    notes,
    isRecurring,
    frequency,
    selectedDays,
    endDate,
    arenaValue,
    participantValue,
    setEventName,
    setDateTime,
    setLocation,
    setNotes,
    setIsRecurring,
    setFrequency,
    toggleDay,
    setEndDate,
    setArenaValue,
    setParticipantValue,
    resetForm,
  };
}
