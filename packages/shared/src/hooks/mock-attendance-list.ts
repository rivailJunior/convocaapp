import type { Attendance } from '../types';

const MOCK_ATTENDANCES: Attendance[] = [
  {
    userId: 'u1',
    userName: 'João Silva',
    status: 'confirmed',
    respondedAt: '2024-03-15T14:30:00Z',
  },
  {
    userId: 'u2',
    userName: 'Ana Costa',
    avatarUrl: 'https://i.pravatar.cc/150?u=ana',
    status: 'pending',
  },
  {
    userId: 'u3',
    userName: 'Pedro Santos',
    status: 'declined',
    note: 'Indisponível',
  },
  {
    userId: 'u4',
    userName: 'Ricardo Ferreira',
    status: 'confirmed',
    respondedAt: '2024-03-15T10:15:00Z',
  },
  {
    userId: 'u5',
    userName: 'Lucas Lima',
    avatarUrl: 'https://i.pravatar.cc/150?u=lucas',
    status: 'confirmed',
    respondedAt: '2024-03-15T11:00:00Z',
  },
  {
    userId: 'u6',
    userName: 'Maria Paula',
    status: 'confirmed',
    respondedAt: '2024-03-15T11:45:00Z',
  },
  {
    userId: 'u7',
    userName: 'Bruno Souza',
    status: 'confirmed',
    respondedAt: '2024-03-15T09:30:00Z',
  },
  {
    userId: 'u8',
    userName: 'Carlos Eduardo',
    status: 'pending',
  },
  {
    userId: 'u9',
    userName: 'Roberto Dias',
    status: 'confirmed',
    respondedAt: '2024-03-15T08:00:00Z',
  },
  {
    userId: 'u10',
    userName: 'Marcelo Guedes',
    status: 'confirmed',
    respondedAt: '2024-03-15T12:30:00Z',
  },
  {
    userId: 'u11',
    userName: 'Tiago Rocha',
    status: 'confirmed',
    respondedAt: '2024-03-15T13:00:00Z',
  },
  {
    userId: 'u12',
    userName: 'Fernanda Souza',
    status: 'confirmed',
    respondedAt: '2024-03-15T13:15:00Z',
  },
  {
    userId: 'u13',
    userName: 'Gabriela Rocha',
    status: 'pending',
  },
];

export const MOCK_ATTENDANCE_LIST: Record<string, Attendance[]> = {
  'evt-grp1-1': MOCK_ATTENDANCES,
  'evt-grp1-2': MOCK_ATTENDANCES.slice(0, 7),
  'evt-grp1-3': MOCK_ATTENDANCES.slice(0, 10),
  'evt-grp1-4': MOCK_ATTENDANCES,
};
