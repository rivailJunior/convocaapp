'use client';

import React, { useState } from 'react';

import type { HomeData } from '@/mocks/home';

import { ActivityFeed } from '@/components/activity-feed';
import { HomeBottomNav } from '@/components/home-bottom-nav';
import { HomeHeader } from '@/components/home-header';
import { HomeQuickActions } from '@/components/home-quick-actions';
import { NextEventCard } from '@/components/next-event-card';
import { PaymentSummaryCard } from '@/components/payment-summary-card';
import { mockHomeData } from '@/mocks/home';

export default function HomePage(): React.JSX.Element {
  const [data] = useState<HomeData>(mockHomeData);

  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen flex flex-col max-w-md mx-auto">
      <HomeHeader user={data.user} />

      <main className="flex-1 overflow-y-auto pb-24">
        <PaymentSummaryCard data={data.paymentSummary} />
        <HomeQuickActions actions={data.quickActions} />
        <NextEventCard event={data.nextEvent} />
        <ActivityFeed items={data.recentActivity} />
      </main>

      <HomeBottomNav items={data.navItems} />
    </div>
  );
}
