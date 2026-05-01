import { useEffect, useMemo, useState } from 'react';

import type { Attendance, AttendancePlayer, AttendanceStatus } from '../types';

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

interface UseAttendanceListOptions {
  onStatusChange?: (userId: string, status: AttendanceStatus) => void;
}

export function useAttendanceList(
  players: AttendancePlayer[],
  options?: UseAttendanceListOptions,
): UseAttendanceListReturn {
  const [allAttendances, setAllAttendances] = useState<Attendance[]>([]);

  useEffect(() => {
    setAllAttendances(
      players.map((p) => ({
        userId: p.userId,
        userName: p.userName,
        avatarUrl: p.avatarUrl,
        status: p.status ?? 'pending',
      })),
    );
  }, [players]);
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
    options?.onStatusChange?.(userId, status);
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
