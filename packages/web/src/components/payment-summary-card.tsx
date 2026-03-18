import React from 'react';

import { formatCurrency } from '@sportspay/shared';

import type { PaymentSummary } from '@/mocks/home';

interface PaymentSummaryCardProps {
  data: PaymentSummary;
}

interface StatBoxProps {
  label: string;
  value: number;
  variant: 'green' | 'orange' | 'red';
}

const VARIANT_STYLES = {
  green: {
    bg: 'bg-green-50 dark:bg-green-900/20',
    border: 'border-green-100 dark:border-green-800/30',
    label: 'text-green-700 dark:text-green-400',
    value: 'text-green-800 dark:text-green-300',
  },
  orange: {
    bg: 'bg-orange-50 dark:bg-orange-900/20',
    border: 'border-orange-100 dark:border-orange-800/30',
    label: 'text-orange-700 dark:text-orange-400',
    value: 'text-orange-800 dark:text-orange-300',
  },
  red: {
    bg: 'bg-red-50 dark:bg-red-900/20',
    border: 'border-red-100 dark:border-red-800/30',
    label: 'text-red-700 dark:text-red-400',
    value: 'text-red-800 dark:text-red-300',
  },
};

function StatBox({ label, value, variant }: StatBoxProps): React.JSX.Element {
  const styles = VARIANT_STYLES[variant];
  return (
    <div className={`${styles.bg} p-3 rounded-lg border ${styles.border}`}>
      <p className={`text-[10px] ${styles.label} font-bold uppercase`}>{label}</p>
      <p className={`text-xl font-bold ${styles.value}`}>{String(value).padStart(2, '0')}</p>
    </div>
  );
}

export function PaymentSummaryCard({ data }: PaymentSummaryCardProps): React.JSX.Element {
  return (
    <section className="px-4 py-6">
      <div className="bg-white dark:bg-slate-900 rounded-xl p-5 shadow-[0_2px_8px_rgba(0,0,0,0.08)] border border-slate-100 dark:border-slate-800">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Mensalidade {data.referenceMonth}
            </h2>
            <p className="text-xs text-slate-500">Total de {data.totalMembers} membros</p>
          </div>
          <span className="bg-primary/10 text-primary text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">
            Em andamento
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2 mb-4">
          <StatBox label="Pagos" value={data.paid} variant="green" />
          <StatBox label="Pendentes" value={data.pending} variant="orange" />
          <StatBox label="Atrasados" value={data.overdue} variant="red" />
        </div>

        <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
          <div
            className="bg-green-600 h-full rounded-full"
            style={{ width: `${data.collectedPercent}%` }}
          />
        </div>
        <div className="flex justify-between mt-2">
          <p className="text-[10px] text-slate-500 font-medium">
            Meta: {formatCurrency(data.goalAmount)}
          </p>
          <p className="text-[10px] text-primary font-bold">
            {data.collectedPercent}% Arrecadado
          </p>
        </div>
      </div>
    </section>
  );
}
