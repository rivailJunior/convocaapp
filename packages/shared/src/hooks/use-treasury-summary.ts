import { useState } from 'react';

import type { TreasurySummary } from '../types';

const MOCK_SUMMARIES: TreasurySummary[] = [
  { balance: 15000, totalIn: 20000, totalOut: 5000 },
  { balance: 8500, totalIn: 10000, totalOut: 1500 },
  { balance: 12250, totalIn: 15000, totalOut: 2750 },
  { balance: 12500, totalIn: 18000, totalOut: 5500 },
];

interface UseTreasurySummaryReturn {
  summaries: TreasurySummary[];
  isLoading: boolean;
}

export function useTreasurySummary(): UseTreasurySummaryReturn {
  const [summaries] = useState<TreasurySummary[]>(MOCK_SUMMARIES);
  return { summaries, isLoading: false };
}
