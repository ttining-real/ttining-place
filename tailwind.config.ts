import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'media', // 또는 class
  theme: {
    extend: {
      fontFamily: {
        base: ['var(--baseFont)'],
        title: ['var(--titleFont)'],
      },
    },
  },
  plugins: [],
};

export default config;
