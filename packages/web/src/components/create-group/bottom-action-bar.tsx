import React from 'react';

import { Icon } from '@/components/icon';

interface BottomActionBarProps {
  onCancel: () => void;
  onSubmit: () => void;
  submitLabel: string;
  isSubmitting?: boolean;
  disabled?: boolean;
  className?: string;
}

export function BottomActionBar({
  onCancel,
  onSubmit,
  submitLabel,
  isSubmitting = false,
  disabled = false,
  className,
}: BottomActionBarProps): React.JSX.Element {
  return (
    <footer className={`fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-6 pt-4 pb-8 bg-white/80 backdrop-blur-xl shadow-[0_-8px_24px_rgba(44,47,48,0.04)] rounded-t-3xl ${className ?? ''}`}>
      <button
        type="button"
        className="flex flex-col items-center justify-center text-on-surface-variant px-6 py-2 bg-transparent border-none cursor-pointer transition-transform hover:opacity-80 active:scale-[0.98]"
        onClick={onCancel}
      >
        <Icon name="close" />
        <span className="font-display text-[10px] font-bold uppercase tracking-wide mt-1">Cancelar</span>
      </button>
      <button
        type="button"
        className="flex items-center justify-center gap-2 bg-gradient-to-br from-primary to-primary-dark text-white rounded-xl px-12 py-3 border-none cursor-pointer shadow-lg transition-all hover:brightness-110 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
        onClick={onSubmit}
        disabled={disabled || isSubmitting}
      >
        <Icon name="check_circle" filled />
        <span className="font-display text-sm font-bold uppercase tracking-wide">{submitLabel}</span>
      </button>
    </footer>
  );
}
