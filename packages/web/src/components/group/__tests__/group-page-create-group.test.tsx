import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { GroupPage } from '@/components/group/group-page';

describe('GroupPage - Create Group flow', () => {
  it('renders the FAB button with "Criar novo grupo" label', () => {
    render(<GroupPage />);
    const fab = screen.getByRole('button', { name: /criar novo grupo/i });
    expect(fab).toBeTruthy();
  });

  it('shows CreateGroupPage when FAB is clicked', async () => {
    const user = userEvent.setup();
    render(<GroupPage />);

    const fab = screen.getByRole('button', { name: /criar novo grupo/i });
    await user.click(fab);

    expect(screen.getByText('Novo Grupo')).toBeTruthy();
    expect(screen.getByText('Informações Básicas')).toBeTruthy();
    expect(screen.getByPlaceholderText('Ex: Fute de quinta')).toBeTruthy();
  });

  it('returns to group list when back button is clicked from CreateGroupPage', async () => {
    const user = userEvent.setup();
    render(<GroupPage />);

    const fab = screen.getByRole('button', { name: /criar novo grupo/i });
    await user.click(fab);

    expect(screen.getByText('Novo Grupo')).toBeTruthy();

    const backButton = screen.getByRole('button', { name: /voltar/i });
    await user.click(backButton);

    expect(screen.getByRole('button', { name: /criar novo grupo/i })).toBeTruthy();
    expect(screen.queryByText('Informações Básicas')).toBeNull();
  });

  it('returns to group list when cancel button is clicked from CreateGroupPage', async () => {
    const user = userEvent.setup();
    render(<GroupPage />);

    const fab = screen.getByRole('button', { name: /criar novo grupo/i });
    await user.click(fab);

    const cancelButton = screen.getByRole('button', { name: /cancelar/i });
    await user.click(cancelButton);

    expect(screen.getByRole('button', { name: /criar novo grupo/i })).toBeTruthy();
  });
});
