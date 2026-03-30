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
    <div className="w-[380px] p-4 bg-surface-bright">
      <CreateEventBanner onCreateEvent={() => {}} />
    </div>
  ),
};
