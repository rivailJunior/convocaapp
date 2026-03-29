import React from 'react';

import { CreateEventBanner } from '@/components/create-group/create-event-banner';

const meta = {
  title: 'Components/Group/CreateGroup/CreateEventBanner',
  component: CreateEventBanner,
  parameters: {
    layout: 'centered',
  },
};

export default meta;

export const Default = {
  render: () => (
    <div className="w-[380px] p-4 bg-[#f5f6f7]">
      <CreateEventBanner onCreateEvent={() => console.log('create event')} />
    </div>
  ),
};
