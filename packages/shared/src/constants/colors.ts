/**
 * Design token colors for use in JS contexts (e.g. Lucide icon `color` props).
 * Source of truth is packages/app/tailwind.config.js — keep these in sync.
 */
export const colors = {
  primary: '#266829',
  secondary: '#496400',
  tertiary: '#00656f',
  error: '#b02500',

  surface: '#f5f6f7',
  'surface-dim': '#d1d5d7',
  'surface-bright': '#f5f6f7',
  'surface-container-lowest': '#ffffff',
  'surface-container-low': '#eff1f2',
  'surface-container': '#e6e8ea',
  'surface-container-high': '#e0e3e4',
  'surface-container-highest': '#dadddf',
  background: '#f5f6f7',

  'on-surface': '#2c2f30',
  'on-surface-variant': '#595c5d',
  'on-background': '#2c2f30',
  'on-primary': '#d1ffc8',
  'on-primary-container': '#1f6223',
  'on-secondary': '#deff97',
  'on-secondary-container': '#415a00',
  'on-tertiary': '#d4f9ff',
  'on-tertiary-container': '#005159',
  'on-error': '#ffefec',
  'on-error-container': '#520c00',

  'primary-container': '#b2faa9',
  'secondary-container': '#b9f61d',
  'tertiary-container': '#10eafe',
  'error-container': '#f95630',

  outline: '#757778',
  'outline-variant': '#abadae',
} as const;
