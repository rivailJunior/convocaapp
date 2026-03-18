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
