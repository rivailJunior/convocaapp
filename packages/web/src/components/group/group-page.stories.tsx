import React from 'react';

import type { GroupPageItem } from '@/components/group/group-page.dto';
import { GroupPage } from '@/components/group/group-page';

export const groupPageItemsDto: GroupPageItem[] = [
  {
    id: '1',
    title: 'Futebol da Firma',
    subtitle: 'Partida semanal aos sabados',
    thumbImageUrl:
      'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=200&q=80',
  },
  {
    id: '2',
    title: 'Volei de Praia',
    subtitle: 'Treino funcional na areia',
    thumbImageUrl:
      'https://images.unsplash.com/photo-1526232761682-d26e03ac148e?auto=format&fit=crop&w=200&q=80',
  },
  {
    id: '3',
    title: 'Basquete Noturno',
    subtitle: 'Racha de quarta no ginasio',
    thumbImageUrl:
      'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=200&q=80',
  },
];

const crowdedGroupItems: GroupPageItem[] = [
  ...groupPageItemsDto,
  {
    id: '4',
    title: 'Futsal Masters 40+',
    subtitle: 'Campeonato interno nas noites de sexta',
    thumbImageUrl:
      'https://images.unsplash.com/photo-1593766788306-28561086694e?auto=format&fit=crop&w=200&q=80',
  },
  {
    id: '5',
    title: 'Cross Treino Parque',
    subtitle: 'Circuito funcional com foco em resistencia',
    thumbImageUrl:
      'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=200&q=80',
  },
];

const longTextGroupItems: GroupPageItem[] = [
  {
    id: '6',
    title: 'Grupo de Futebol Society Corporativo da Zona Norte de Sao Paulo',
    subtitle:
      'Encontro semanal com confirmacao obrigatoria, taxa compartilhada e lista de espera automatica',
    thumbImageUrl:
      'https://images.unsplash.com/photo-1517927033932-b3d18e61fb3a?auto=format&fit=crop&w=200&q=80',
  },
  {
    id: '7',
    title: 'Time de Volei Feminino da Comunidade',
    subtitle: 'Treinos tecnicos e amistosos aos domingos',
    thumbImageUrl:
      'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?auto=format&fit=crop&w=200&q=80',
  },
];

const meta = {
  title: 'Components/Group/GroupPage',
  component: GroupPage,
  parameters: {
    layout: 'centered',
  },
  render: (args: { items: GroupPageItem[] }) => (
    <div className="w-[380px] bg-background-light p-4">
      <GroupPage {...args} />
    </div>
  ),
};

export default meta;

export const Default = {
  args: {
    items: groupPageItemsDto,
  },
};

export const CrowdedList = {
  args: {
    items: crowdedGroupItems,
  },
};

export const LongText = {
  args: {
    items: longTextGroupItems,
  },
};

export const Empty = {
  args: {
    items: [],
  },
};
