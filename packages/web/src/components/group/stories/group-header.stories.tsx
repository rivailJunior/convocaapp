import React from 'react';

import type { TreasurySummary } from '@sportspay/shared';

import { GroupHeader } from '@/components/group/group-header';

const meta = {
  title: 'Components/Group/GroupHeader',
  component: GroupHeader,
  parameters: {
    layout: 'centered',
  },
  render: (args: { summaries: TreasurySummary[] }) => (
    <div className="w-[380px] p-4">
      <GroupHeader {...args} />
    </div>
  ),
};

export default meta;

export const MultipleSummaries = {
  args: {
    summaries: [
      { balance: 15000, totalIn: 20000, totalOut: 5000 },
      { balance: 8500, totalIn: 10000, totalOut: 1500 },
      { balance: 12250, totalIn: 15000, totalOut: 2750 },
      { balance: 12500, totalIn: 18000, totalOut: 5500 },
    ],
  },
};

export const SingleSummary = {
  args: {
    summaries: [
      { balance: 50000, totalIn: 80000, totalOut: 30000 },
    ],
  },
};

export const ZeroBalance = {
  args: {
    summaries: [
      { balance: 0, totalIn: 5000, totalOut: 5000 },
    ],
  },
};

export const NegativeBalance = {
  args: {
    summaries: [
      { balance: -3000, totalIn: 2000, totalOut: 5000 },
      { balance: -1500, totalIn: 1000, totalOut: 2500 },
    ],
  },
};

export const LargeBalance = {
  args: {
    summaries: [
      { balance: 1500000, totalIn: 2000000, totalOut: 500000 },
      { balance: 750000, totalIn: 1000000, totalOut: 250000 },
      { balance: 300000, totalIn: 500000, totalOut: 200000 },
    ],
  },
};
