// Sport & status unions — never use enum
export type Sport = 'futebol' | 'volei' | 'basquete' | 'outro';
export type PaymentStatus = 'pending' | 'paid' | 'overdue' | 'cancelled';
export type PaymentMethod = 'pix' | 'credit_card' | 'debit_card' | 'manual';
export type Recurrence = 'weekly' | 'biweekly' | 'monthly' | 'once';
export type AttendanceStatus = 'confirmed' | 'declined' | 'maybe' | 'pending';
export type EventStatus = 'scheduled' | 'cancelled' | 'finished';
export type BillingMode = 'fixed' | 'field_split';
export type AttendanceType = 'member' | 'guest';
export type TeamDrawMode = 'by_players' | 'by_teams';
export type TreasuryEntryType = 'in' | 'out';
export type TreasuryCategory = 'guest_payment' | 'field_payment' | 'equipment' | 'other';
export type GroupPlan = 'free' | 'pro' | 'club';
export type BadgeType = 'mvp' | 'top_scorer' | 'top_assists' | 'top_saves';

// Firestore document interfaces
export interface User {
  uid: string;
  name: string;
  email: string;
  phone?: string;
  avatarUrl?: string;
  groupIds: string[];
  adminGroupIds: string[];
  fcmToken?: string;
  createdAt: string;
}

export interface Group {
  id: string;
  name: string;
  sport: Sport;
  adminId: string;
  memberIds: string[];
  billingMode: BillingMode;
  monthlyFee?: number;
  fieldCostPerMonth?: number;
  guestFee?: number;
  dueDay: number;
  paymentMethods: PaymentMethod[];
  inviteCode: string;
  plan: GroupPlan;
  planExpiresAt?: string;
  avatarUrl?: string;
  createdAt: string;
}

export interface Payment {
  id: string;
  groupId: string;
  userId: string;
  amount: number;
  status: PaymentStatus;
  method?: PaymentMethod;
  referenceMonth: string;
  dueDate: string;
  paidAt?: string;
  gatewayId?: string;
  paymentLink?: string;
  createdAt: string;
}

export interface Event {
  id: string;
  groupId: string;
  title: string;
  date: string;
  recurrence: Recurrence;
  venueName: string;
  venueAddress: string;
  venueLat: number;
  venueLng: number;
  venueMapUrl?: string;
  maxPlayers?: number;
  status: EventStatus;
  confirmationDeadline?: string;
  createdBy: string;
  createdAt: string;
}

export interface Attendance {
  userId: string;
  userName: string;
  avatarUrl?: string;
  status: AttendanceStatus;
  respondedAt?: string;
  note?: string;
  teamId?: string;
  isOverdue?: boolean;
}

export interface Invite {
  code: string;
  groupId: string;
  createdBy: string;
  expiresAt?: string;
  usedBy: string[];
  maxUses?: number;
}

export interface Guest {
  id: string;
  groupId: string;
  eventId: string;
  uid?: string;
  name: string;
  amount: number;
  status: PaymentStatus;
  gatewayId?: string;
  paymentLink?: string;
  paidAt?: string;
  createdAt: string;
}

export interface TreasuryEntry {
  id: string;
  groupId: string;
  type: TreasuryEntryType;
  category: TreasuryCategory;
  amount: number;
  description: string;
  referenceId?: string;
  referenceMonth: string;
  createdBy: string;
  createdAt: string;
}

export interface TreasurySummary {
  balance: number;
  totalIn: number;
  totalOut: number;
}

// Team draw types
export interface AttendancePlayer {
  userId: string;
  userName: string;
  avatarUrl?: string;
}

export interface Team {
  id: string;
  name: string;
  players: AttendancePlayer[];
}

export interface TeamDrawResult {
  teams: Team[];
  bench: AttendancePlayer[];
  totalPlayers: number;
}

// Match stats types
export interface MatchStats {
  id: string;
  eventId: string;
  voterId: string;
  mvpUid: string;
  goals: Record<string, number>;
  assists: Record<string, number>;
  saves: Record<string, number>;
  createdAt: string;
}

export interface PlayerStats {
  userId: string;
  groupId: string;
  presences: number;
  goals: number;
  assists: number;
  saves: number;
  mvpWins: number;
  rankingScore: number;
  monthlyBadges: Record<string, BadgeType[]>;
}

export interface EventResult {
  eventId: string;
  groupId: string;
  mvpUid: string;
  topScorer?: string;
  topAssists?: string;
  topSaves?: string;
  totalVoters: number;
  createdAt: string;
}

export interface Participant {
  id: string;
  name: string;
}

export interface GroupDisplayItem extends Group {
  memberCount: number;
  nextEvent?: string;
  paymentStatus?: PaymentStatus;
}

export interface UpcomingEventItem extends Event {
  sport: Sport;
  groupName: string;
  confirmedCount: number;
  confirmedAvatars: string[];
}
