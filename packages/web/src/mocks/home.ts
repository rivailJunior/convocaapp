export interface HomeUser {
  name: string;
  avatarUrl?: string;
  groupName: string;
  treasuryBalance: number;
}

export interface PaymentSummary {
  referenceMonth: string;
  totalMembers: number;
  paid: number;
  pending: number;
  overdue: number;
  goalAmount: number;
  collectedPercent: number;
}

export interface HomeQuickAction {
  icon: string;
  label: string;
}

export interface NextEventData {
  title: string;
  type: string;
  date: string;
  venueName: string;
  time: string;
  duration: string;
  confirmedCount: number;
  totalAvatars: number;
}

export interface ActivityItem {
  id: string;
  userName: string;
  action: string;
  time: string;
  amount?: number;
  type: 'success' | 'error' | 'info';
  icon: string;
}

export interface HomeNavItem {
  icon: string;
  label: string;
  href: string;
  active?: boolean;
}

export interface HomeData {
  user: HomeUser;
  paymentSummary: PaymentSummary;
  quickActions: HomeQuickAction[];
  nextEvent: NextEventData;
  recentActivity: ActivityItem[];
  navItems: HomeNavItem[];
}

export const mockHomeData: HomeData = {
  user: {
    name: 'Admin',
    groupName: 'Futebol da Firma',
    treasuryBalance: 34000,
  },

  paymentSummary: {
    referenceMonth: 'Janeiro',
    totalMembers: 25,
    paid: 18,
    pending: 7,
    overdue: 2,
    goalAmount: 125000,
    collectedPercent: 72,
  },

  quickActions: [
    { icon: 'groups', label: 'Gerar Times' },
    { icon: 'payments', label: 'Cobrar Membros' },
    { icon: 'calendar_add_on', label: 'Novo Evento' },
    { icon: 'person_add', label: 'Convidar Admin' },
  ],

  nextEvent: {
    title: 'Futebol Society',
    type: 'Society',
    date: 'Sábado, 18 de Janeiro',
    venueName: 'Arena Beach Sports',
    time: '14:00h',
    duration: '90 min',
    confirmedCount: 21,
    totalAvatars: 5,
  },

  recentActivity: [
    {
      id: '1',
      userName: 'João Silva',
      action: 'pagou a mensalidade',
      time: 'Há 5 minutos • R$ 50,00',
      type: 'success',
      icon: 'check_circle',
    },
    {
      id: '2',
      userName: 'Maria Souza',
      action: 'pagou a mensalidade',
      time: 'Há 2 horas • R$ 50,00',
      type: 'success',
      icon: 'check_circle',
    },
    {
      id: '3',
      userName: 'Carlos Lima',
      action: 'atrasou o pagamento',
      time: 'Ontem às 23:59',
      type: 'error',
      icon: 'error',
    },
  ],

  navItems: [
    { icon: 'home', label: 'Home', href: '/', active: true },
    { icon: 'calendar_month', label: 'Eventos', href: '/eventos' },
    { icon: 'military_tech', label: 'Rankings', href: '/rankings' },
    { icon: 'person', label: 'Perfil', href: '/perfil' },
  ],
};
