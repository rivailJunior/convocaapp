import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';
import Share from 'react-native-share';
import { EventShare } from '../event-share';
import type { Group, Event, User } from '@sportspay/shared';

jest.mock('react-native-share', () => ({
  open: jest.fn().mockResolvedValue(undefined),
}));

const mockGroup: Group = {
  id: 'group-1',
  name: 'Pelada da Quinta',
  sport: 'futebol',
  adminId: 'user-1',
  memberIds: ['user-1', 'user-2', 'user-3'],
  billingMode: 'fixed',
  monthlyFee: 5000,
  dueDay: 10,
  paymentMethods: ['pix'],
  inviteCode: 'ABC123',
  plan: 'free',
  createdAt: '2024-01-01T00:00:00.000Z',
};

const mockEvent: Event = {
  id: 'event-1',
  groupId: 'group-1',
  title: 'Futebol Quinta',
  date: '2025-06-15T19:00:00.000Z',
  recurrence: 'weekly',
  venueName: 'Campo Society Central',
  venueAddress: 'Rua das Flores, 123',
  venueLat: -23.55,
  venueLng: -46.63,
  maxPlayers: 14,
  status: 'scheduled',
  createdBy: 'user-1',
  createdAt: '2024-01-01T00:00:00.000Z',
};

const mockUsers: User[] = [
  {
    uid: 'user-1',
    name: 'João Silva',
    email: 'joao@test.com',
    groupIds: ['group-1'],
    adminGroupIds: ['group-1'],
    createdAt: '2024-01-01T00:00:00.000Z',
  },
  {
    uid: 'user-2',
    name: 'Maria Santos',
    email: 'maria@test.com',
    groupIds: ['group-1'],
    adminGroupIds: [],
    createdAt: '2024-01-01T00:00:00.000Z',
  },
];

describe('EventShare', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the share button with correct text', () => {
    render(<EventShare group={mockGroup} event={mockEvent} users={mockUsers} />);
    expect(screen.getByText('Compartilhar Evento')).toBeTruthy();
  });

  it('calls Share.open with correct title and message on press', async () => {
    render(<EventShare group={mockGroup} event={mockEvent} users={mockUsers} />);

    fireEvent.press(screen.getByText('Compartilhar Evento'));

    await waitFor(() => {
      expect(Share.open).toHaveBeenCalledTimes(1);
    });

    const call = (Share.open as jest.Mock).mock.calls[0][0];
    expect(call.title).toBe('Futebol Quinta — Pelada da Quinta');
    expect(call.message).toContain('⚽ Pelada da Quinta — Futebol');
    expect(call.message).toContain('📋 Futebol Quinta');
    expect(call.message).toContain('📍 Campo Society Central');
    expect(call.message).toContain('📌 Rua das Flores, 123');
    expect(call.message).toContain('🔖 Status: Agendado');
    expect(call.message).toContain('1. João Silva');
    expect(call.message).toContain('2. Maria Santos');
    expect(call.message).toContain('👥 Jogadores (2/14):');
    expect(call.message).toContain('🏟️ Compartilhado via SportsPay');
  });

  it('includes billingMode value when present', async () => {
    render(<EventShare group={mockGroup} event={mockEvent} users={mockUsers} />);

    fireEvent.press(screen.getByText('Compartilhar Evento'));

    await waitFor(() => {
      expect(Share.open).toHaveBeenCalledTimes(1);
    });

    const call = (Share.open as jest.Mock).mock.calls[0][0];
    expect(call.message).toContain('💰 Valor: R$ fixed');
  });

  it('shows "Gratuito" when billingMode is falsy', async () => {
    const freeGroup = { ...mockGroup, billingMode: '' } as unknown as Group;

    render(<EventShare group={freeGroup} event={mockEvent} users={mockUsers} />);

    fireEvent.press(screen.getByText('Compartilhar Evento'));

    await waitFor(() => {
      expect(Share.open).toHaveBeenCalledTimes(1);
    });

    const call = (Share.open as jest.Mock).mock.calls[0][0];
    expect(call.message).toContain('💰 Valor: Gratuito');
  });

  it('omits venue address line when venueAddress is empty', async () => {
    const eventNoAddress = { ...mockEvent, venueAddress: '' };

    render(<EventShare group={mockGroup} event={eventNoAddress} users={mockUsers} />);

    fireEvent.press(screen.getByText('Compartilhar Evento'));

    await waitFor(() => {
      expect(Share.open).toHaveBeenCalledTimes(1);
    });

    const call = (Share.open as jest.Mock).mock.calls[0][0];
    expect(call.message).not.toContain('📌');
  });

  it('shows player count without max when maxPlayers is undefined', async () => {
    const eventNoMax = { ...mockEvent, maxPlayers: undefined };

    render(<EventShare group={mockGroup} event={eventNoMax} users={mockUsers} />);

    fireEvent.press(screen.getByText('Compartilhar Evento'));

    await waitFor(() => {
      expect(Share.open).toHaveBeenCalledTimes(1);
    });

    const call = (Share.open as jest.Mock).mock.calls[0][0];
    expect(call.message).toContain('👥 Jogadores (2):');
    expect(call.message).not.toContain('👥 Jogadores (2/');
  });

  it('shows fallback text when users list is empty', async () => {
    render(<EventShare group={mockGroup} event={mockEvent} users={[]} />);

    fireEvent.press(screen.getByText('Compartilhar Evento'));

    await waitFor(() => {
      expect(Share.open).toHaveBeenCalledTimes(1);
    });

    const call = (Share.open as jest.Mock).mock.calls[0][0];
    expect(call.message).toContain('Nenhum jogador na lista.');
    expect(call.message).toContain('👥 Jogadores (0/14):');
  });

  it('silently handles user cancellation', async () => {
    (Share.open as jest.Mock).mockRejectedValueOnce({
      message: 'User did not share',
    });

    render(<EventShare group={mockGroup} event={mockEvent} users={mockUsers} />);

    fireEvent.press(screen.getByText('Compartilhar Evento'));

    await waitFor(() => {
      expect(Share.open).toHaveBeenCalledTimes(1);
    });

    // Should not throw — component remains rendered
    expect(screen.getByText('Compartilhar Evento')).toBeTruthy();
  });

  it('silently handles cancellation via error property', async () => {
    (Share.open as jest.Mock).mockRejectedValueOnce({
      error: 'User did not share',
    });

    render(<EventShare group={mockGroup} event={mockEvent} users={mockUsers} />);

    fireEvent.press(screen.getByText('Compartilhar Evento'));

    await waitFor(() => {
      expect(Share.open).toHaveBeenCalledTimes(1);
    });

    expect(screen.getByText('Compartilhar Evento')).toBeTruthy();
  });

  it('logs warning in dev mode for unexpected errors', async () => {
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation();
    (Share.open as jest.Mock).mockRejectedValueOnce(new Error('Network failed'));

    render(<EventShare group={mockGroup} event={mockEvent} users={mockUsers} />);

    fireEvent.press(screen.getByText('Compartilhar Evento'));

    await waitFor(() => {
      expect(warnSpy).toHaveBeenCalledWith(
        'Error sharing event',
        expect.any(Error),
      );
    });

    warnSpy.mockRestore();
  });
});
