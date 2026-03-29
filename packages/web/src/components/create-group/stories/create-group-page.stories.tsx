import React from 'react';

import { CreateGroupPage } from '@/components/create-group/create-group-page';

const meta = {
  title: 'Components/Group/CreateGroup/CreateGroupPage',
  component: CreateGroupPage,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

export const Default = {
  render: () => (
    <CreateGroupPage
      onBack={() => console.log('back')}
      onCancel={() => console.log('cancel')}
      onCreateEvent={() => console.log('create event')}
    />
  ),
};
