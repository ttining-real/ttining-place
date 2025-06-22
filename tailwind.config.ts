import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        pretendard: ['var(--pretendardFont)', 'sans-serif'],
        Agbalumo: ['var(--agbalumoFont)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
