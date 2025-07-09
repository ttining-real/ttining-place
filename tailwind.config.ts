import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        pretendard: ['var(--pretendardFont)', 'sans-serif'],
        montserrat: ['var(--montserratFont)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
