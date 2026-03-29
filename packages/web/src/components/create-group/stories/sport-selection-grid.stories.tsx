import React, { useState } from 'react';

import type { Sport } from '@sportspay/shared';

import { SportSelectionGrid } from '@/components/create-group/sport-selection-grid';

const meta = {
  title: 'Components/Group/CreateGroup/SportSelectionGrid',
  component: SportSelectionGrid,
  parameters: {
    layout: 'centered',
  },
};

export default meta;

function InteractiveTemplate() {
  const [selected, setSelected] = useState<Sport | null>(null);
  return (
    <div className="w-[380px] p-4 bg-[#f5f6f7]">
      <SportSelectionGrid selected={selected} onSelect={setSelected} />
    </div>
  );
}

export const NoSelection = {
  render: () => (
    <div className="w-[380px] p-4 bg-[#f5f6f7]">
      <SportSelectionGrid selected={null} onSelect={() => {}} />
    </div>
  ),
};

export const FootballSelected = {
  render: () => (
    <div className="w-[380px] p-4 bg-[#f5f6f7]">
      <SportSelectionGrid selected="futebol" onSelect={() => {}} />
    </div>
  ),
};

export const Interactive = {
  render: () => <InteractiveTemplate />,
};
