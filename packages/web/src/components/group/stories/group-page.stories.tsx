import React from 'react';

import { GroupPage } from '@/components/group/group-page';

const meta = {
  title: 'Components/Group/GroupPage',
  component: GroupPage,
  parameters: {
    layout: 'centered',
  },
  render: () => (
    <div className="w-[380px] bg-background-light p-4">
      <GroupPage />
    </div>
  ),
};

export default meta;

export const Default = {};
