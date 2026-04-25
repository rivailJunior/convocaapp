import type { AppLanguage, ThemeMode } from '@sportspay/shared';

export const VALID_THEMES: ThemeMode[] = ['light', 'dark'];
export const VALID_LANGUAGES: AppLanguage[] = ['pt-BR', 'en-US', 'es-ES'];
export const DEFAULT_THEME: ThemeMode = 'light';
export const DEFAULT_LANGUAGE: AppLanguage = 'pt-BR';

export const toSqlList = (values: readonly string[]): string =>
  values.map((v) => `'${v}'`).join(', ');

export interface UserSettingsRow {
  id: number;
  theme: ThemeMode;
  language: AppLanguage;
  onboarded: boolean;
}
