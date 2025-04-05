import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'media', // 또는 class
  theme: {
    extend: {
      fontFamily: {
        pretendard: ['var(--pretendardFont)', 'sans-serif'],
        gmarket: ['var(--gmarketFont)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
