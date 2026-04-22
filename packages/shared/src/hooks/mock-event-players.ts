import type { AttendancePlayer } from '../types';

const ALL_PLAYERS: AttendancePlayer[] = [
  { userId: 'u1', userName: 'João Silva' },
  { userId: 'u2', userName: 'Pedro Santos' },
  { userId: 'u3', userName: 'Lucas Lima' },
  { userId: 'u4', userName: 'Bruno Souza' },
  { userId: 'u5', userName: 'Carlos Eduardo' },
  { userId: 'u6', userName: 'Roberto Dias' },
  { userId: 'u7', userName: 'Marcelo Guedes' },
  { userId: 'u8', userName: 'Tiago Rocha' },
  { userId: 'u9', userName: 'Ana Costa' },
  { userId: 'u10', userName: 'Maria Oliveira' },
  { userId: 'u11', userName: 'Rafaela Santos' },
  { userId: 'u12', userName: 'Julia Santos' },
  { userId: 'u13', userName: 'Beatriz Lima' },
  { userId: 'u14', userName: 'Amanda Silva' },
  { userId: 'u15', userName: 'Fernanda Souza' },
  { userId: 'u16', userName: 'Gabriela Rocha' },
  { userId: 'u17', userName: 'Paulo Jorge' },
  { userId: 'u18', userName: 'Sergio Mendes' },
  { userId: 'u19', userName: 'Ricardo Gomes' },
  { userId: 'u20', userName: 'Andre Luiz' },
  { userId: 'u21', userName: 'Luiz Felipe' },
  { userId: 'u22', userName: 'Jose Carlos' },
  { userId: 'u23', userName: 'Antonio Silva' },
  { userId: 'u24', userName: 'Francisco Jose' },
  { userId: 'u25', userName: 'Eduardo Silva' },
];

export const MOCK_EVENT_PLAYERS: Record<string, AttendancePlayer[]> = {
  'evt-grp1-1': ALL_PLAYERS.slice(0, 9),
  'evt-grp1-2': ALL_PLAYERS.slice(0, 7),
  'evt-grp1-3': ALL_PLAYERS.slice(0, 14),
  'evt-grp1-4': ALL_PLAYERS.slice(0, 12),
};
