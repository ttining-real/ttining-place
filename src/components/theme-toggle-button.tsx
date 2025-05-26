'use client';

import { useThemeStore } from '@/stores/themeStore';
import Icon from './icon/icon';

export default function ThemeToggleButton() {
  const { theme, toggleTheme } = useThemeStore();

  const isDark = theme === 'dark';

  return (
    <div className="flex items-center gap-2">
      <Icon
        id={isDark ? 'mode-dark' : 'mode-light'}
        className={isDark ? 'text-yellow' : 'text-orange'}
        size={22}
      />
      <button
        onClick={toggleTheme}
        aria-label={isDark ? '라이트모드로 전환' : '다크모드로 전환'}
        role="switch"
        aria-checked={isDark}
        className="border-primary bg-gray-60 focus:outline-primary/50 relative h-7 w-12 rounded-full border-2 transition-colors duration-300 focus:outline-2 focus:outline-offset-2 dark:border-indigo-300 dark:bg-black dark:focus:outline-indigo-400/60"
      >
        <span
          className={`bg-primary absolute top-[4px] left-[4px] h-4 w-4 rounded-full transition-transform duration-300 dark:bg-indigo-300 ${isDark ? 'translate-x-5' : ''}`}
        ></span>
      </button>
    </div>
  );
}
