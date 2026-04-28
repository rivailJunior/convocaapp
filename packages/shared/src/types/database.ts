import type { AppLanguage, Sport, ThemeMode } from './index';


// Database adapter types
export type BindValue = string | number | boolean | null | Uint8Array;

export interface RunResult {
  lastInsertRowId: number;
  changes: number;
}

export interface DatabaseAdapter {
  execAsync(sql: string): Promise<void>;
  runAsync(sql: string, params?: BindValue[]): Promise<RunResult>;
  getAllAsync<T>(sql: string, params?: BindValue[]): Promise<T[]>;
  getFirstAsync<T>(sql: string, params?: BindValue[]): Promise<T | null>;
  withTransactionAsync(callback: () => Promise<void>): Promise<void>;
}

// Settings entity
export interface UserSettingsEntity {
  id: number;
  theme: ThemeMode;
  language: AppLanguage;
  onboarded: boolean;
}

// Group entities
export interface GroupEntity {
  id: number;
  name: string;
  sport: Sport;
  pixKey: string;
  createdAt: string;
}

export interface GroupParticipantEntity {
  id: number;
  groupId: number;
  name: string;
}

export interface GroupWithParticipants extends GroupEntity {
  participants: { id: string; name: string }[];
}

export interface CreateLocalGroupInput {
  name: string;
  sport: Sport;
  pixKey: string;
  participants: { name: string }[];
}

export interface GroupWithMemberCount {
  id: number;
  name: string;
  sport: string;
  pixKey: string;
  createdAt: string;
  memberCount: number;
}

// Recurrent event entities
export interface RecurrentEventEntity {
  id: number;
  groupId: number;
  name: string;
  dateTime: string;
  location: string;
  notes: string;
  isRecurring: boolean;
  frequency: string;
  selectedDays: number[];
  endDate: string;
  createdAt: string;
}

export interface CreateRecurrentEventInput {
  groupId: number;
  name: string;
  dateTime: string;
  location?: string;
  notes?: string;
  isRecurring: boolean;
  frequency: string;
  selectedDays: number[];
  endDate?: string;
}
