import { motion } from 'framer-motion';

import { montserrat } from '@/fonts/font';

interface TabSelectorProps<T extends string> {
  tabs: readonly T[];
  selected: T;
  onChange: (tab: T) => void;
}

export default function TabSelector<T extends string>({
  tabs,
  selected,
  onChange,
}: TabSelectorProps<T>) {
  return (
    <div className="flex gap-2">
      {tabs.map((tab) => {
        const isActive = selected === tab;

        return (
          <button
            key={tab}
            onClick={() => onChange(tab)}
            className={`${montserrat.className} focus-ring relative rounded-full px-4 py-2 font-medium transition-colors duration-200 first-letter:uppercase ${
              isActive
                ? 'text-primary'
                : 'text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white'
            }`}
          >
            {tab}
            {isActive && (
              <motion.div
                layoutId="underline"
                className="bg-primary/10 absolute bottom-0 left-0 h-full w-full rounded-full"
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
