import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#1B5E20',
        'primary-dark': '#185c1e',
        accent: '#AEEA00',
        'background-light': '#F8F9FA',
        'background-dark': '#161c17',
        'on-surface': '#2c2f30',
        'on-surface-variant': '#595c5d',
        outline: '#757778',
        surface: '#eff1f2',
        'surface-bright': '#f5f6f7',
        'surface-dim': '#e0e3e4',
        error: '#b92902',
      },
      fontFamily: {
        display: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '0.5rem',
        lg: '1rem',
        xl: '1.5rem',
      },
    },
  },
  plugins: [],
};

export default config;
