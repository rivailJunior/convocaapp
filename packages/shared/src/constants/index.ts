export const SPORTS = {
  futebol: 'Futebol',
  volei: 'Vôlei',
  basquete: 'Basquete',
  outro: 'Outro',
} as const;

export const PAYMENT_STATUSES = {
  pending: 'Pendente',
  paid: 'Pago',
  overdue: 'Atrasado',
  cancelled: 'Cancelado',
} as const;

export const EVENT_STATUSES = {
  scheduled: 'Agendado',
  cancelled: 'Cancelado',
  finished: 'Finalizado',
} as const;

export const RECURRENCES = {
  weekly: 'Semanal',
  biweekly: 'Quinzenal',
  monthly: 'Mensal',
  once: 'Avulso',
} as const;

export const ATTENDANCE_STATUSES = {
  confirmed: 'Confirmado',
  declined: 'Recusado',
  maybe: 'Talvez',
  pending: 'Pendente',
} as const;

export const BILLING_MODES = {
  fixed: 'Mensalidade fixa',
  field_split: 'Rateio do campo',
} as const;

export const PAYMENT_METHODS = {
  pix: 'Pix',
  credit_card: 'Cartão de crédito',
  debit_card: 'Cartão de débito',
  manual: 'Manual',
} as const;

export const APP_LANGUAGES = {
  'pt-BR': 'Português (BR)',
  'en-US': 'English (US)',
  'es-ES': 'Español',
} as const;

export const THEME_LABELS = {
  light: 'Claro',
  dark: 'Escuro',
} as const;
