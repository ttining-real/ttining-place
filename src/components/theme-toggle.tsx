'use client';

import { useThemeStore } from '@/stores/themeStore';
import Icon from './icon/icon';

export default function ThemeToggleButton() {
  const { theme, toggleTheme } = useThemeStore();

  const isDark = theme === 'dark';

  return (
    <div className="flex items-center gap-2">
      <Icon id="mode-light" className="text-gray-10" size={20} />
      <button
        onClick={toggleTheme}
        aria-label={isDark ? '라이트모드로 전환' : '다크모드로 전환'}
        className="bg-gray-20 relative h-6 w-12 rounded-full transition-colors duration-300"
      >
        <span
          className={`absolute top-[4px] left-[4px] h-4 w-4 rounded-full bg-white transition-transform duration-300 ${isDark ? 'translate-x-6' : ''}`}
        ></span>
      </button>
    </div>
  );
}
