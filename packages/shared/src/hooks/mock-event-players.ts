import type { AttendancePlayer } from '../types';


const ALL_PLAYERS: AttendancePlayer[] = [
  { userId: 'u1', userName: 'João Silva', status: 'confirmed', paymentStatus: 'paid' },
  { userId: 'u2', userName: 'Pedro Santos', status: 'confirmed', paymentStatus: 'paid' },
  { userId: 'u3', userName: 'Lucas Lima', status: 'confirmed', paymentStatus: 'pending' },
  { userId: 'u4', userName: 'Bruno Souza', status: 'confirmed', paymentStatus: 'paid' },
  { userId: 'u5', userName: 'Carlos Eduardo', status: 'pending', paymentStatus: 'pending' },
  { userId: 'u6', userName: 'Roberto Dias', status: 'confirmed', paymentStatus: 'paid' },
  { userId: 'u7', userName: 'Marcelo Guedes', status: 'confirmed', paymentStatus: 'paid' },
  { userId: 'u8', userName: 'Tiago Rocha', status: 'confirmed', paymentStatus: 'pending' },
  { userId: 'u9', userName: 'Ana Costa', status: 'pending', paymentStatus: 'pending' },
  { userId: 'u10', userName: 'Maria Oliveira', status: 'confirmed', paymentStatus: 'paid' },
  { userId: 'u11', userName: 'Rafaela Santos', status: 'confirmed', paymentStatus: 'paid' },
  { userId: 'u12', userName: 'Julia Santos', status: 'confirmed', paymentStatus: 'paid' },
  { userId: 'u13', userName: 'Beatriz Lima', status: 'pending', paymentStatus: 'pending' },
  { userId: 'u14', userName: 'Amanda Silva', status: 'confirmed', paymentStatus: 'paid' },
  { userId: 'u15', userName: 'Fernanda Souza', status: 'confirmed', paymentStatus: 'paid' },
  { userId: 'u16', userName: 'Gabriela Rocha', status: 'pending', paymentStatus: 'pending' },
  { userId: 'u17', userName: 'Paulo Jorge', status: 'confirmed', paymentStatus: 'paid' },
  { userId: 'u18', userName: 'Sergio Mendes', status: 'confirmed', paymentStatus: 'paid' },
  { userId: 'u19', userName: 'Ricardo Gomes', status: 'confirmed', paymentStatus: 'pending' },
  { userId: 'u20', userName: 'Andre Luiz', status: 'confirmed', paymentStatus: 'paid' },
  { userId: 'u21', userName: 'Luiz Felipe', status: 'confirmed', paymentStatus: 'paid' },
  { userId: 'u22', userName: 'Jose Carlos', status: 'confirmed', paymentStatus: 'paid' },
  { userId: 'u23', userName: 'Antonio Silva', status: 'confirmed', paymentStatus: 'paid' },
  { userId: 'u24', userName: 'Francisco Jose', status: 'confirmed', paymentStatus: 'pending' },
  { userId: 'u25', userName: 'Eduardo Silva', status: 'confirmed', paymentStatus: 'paid' },
];

export const MOCK_EVENT_PLAYERS: Record<string, AttendancePlayer[]> = {
  'evt-grp1-1': ALL_PLAYERS.slice(0, 9),
  'evt-grp1-2': ALL_PLAYERS.slice(0, 7),
  'evt-grp1-3': ALL_PLAYERS.slice(0, 14),
  'evt-grp1-4': ALL_PLAYERS.slice(0, 12),
};
