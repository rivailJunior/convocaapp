import React from 'react';

import { TopAppBar } from '@/components/create-group/top-app-bar';

const meta = {
  title: 'Components/Group/CreateGroup/TopAppBar',
  component: TopAppBar,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

export const Default = {
  args: {
    title: 'Novo Grupo',
    onBack: () => console.log('back'),
  },
};

export const CustomTitle = {
  args: {
    title: 'Editar Grupo',
    onBack: () => console.log('back'),
  },
};
