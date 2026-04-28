import { useMemo, useState } from 'react';

import { MOCK_ATTENDANCE_LIST } from './mock-attendance-list';

import type { Attendance, AttendanceStatus } from '../types';

type AttendanceFilter = 'all' | AttendanceStatus;

interface AttendanceCounts {
  all: number;
  confirmed: number;
  pending: number;
  declined: number;
  maybe: number;
}

interface UseAttendanceListReturn {
  attendances: Attendance[];
  filter: AttendanceFilter;
  counts: AttendanceCounts;
  isGenerateWithConfirmed: boolean;
  setFilter: (filter: AttendanceFilter) => void;
  setIsGenerateWithConfirmed: (value: boolean) => void;
  updateAttendanceStatus: (userId: string, status: AttendanceStatus) => void;
}

export function useAttendanceList(eventId: string): UseAttendanceListReturn {
  const [allAttendances, setAllAttendances] = useState<Attendance[]>(
    () => MOCK_ATTENDANCE_LIST[eventId] ?? [],
  );
  const [filter, setFilter] = useState<AttendanceFilter>('all');
  const [isGenerateWithConfirmed, setIsGenerateWithConfirmed] = useState(true);

  const counts: AttendanceCounts = useMemo(() => {
    const all = allAttendances.length;
    const confirmed = allAttendances.filter((a) => a.status === 'confirmed').length;
    const pending = allAttendances.filter((a) => a.status === 'pending').length;
    const declined = allAttendances.filter((a) => a.status === 'declined').length;
    const maybe = allAttendances.filter((a) => a.status === 'maybe').length;
    return { all, confirmed, pending, declined, maybe };
  }, [allAttendances]);

  const attendances = useMemo(() => {
    if (filter === 'all') return allAttendances;
    return allAttendances.filter((a) => a.status === filter);
  }, [allAttendances, filter]);

  const updateAttendanceStatus = (userId: string, status: AttendanceStatus): void => {
    setAllAttendances((prev) =>
      prev.map((a) =>
        a.userId === userId ? { ...a, status, respondedAt: new Date().toISOString() } : a,
      ),
    );
  };

  return {
    attendances,
    filter,
    counts,
    isGenerateWithConfirmed,
    setFilter,
    setIsGenerateWithConfirmed,
    updateAttendanceStatus,
  };
}
