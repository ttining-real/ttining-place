import { motion } from 'framer-motion';

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
    <div className="bg-primary/20 relative mb-8 flex w-full items-center gap-2 rounded-full p-1.5 sm:w-fit">
      {tabs.map((tab) => {
        const isActive = selected === tab;
        return (
          <button
            key={tab}
            onClick={() => onChange(tab)}
            className={`focus-ring hover:bg-primary/20 hover:text-primary-darker relative z-10 flex flex-1 items-center justify-center rounded-full py-2 font-medium whitespace-nowrap capitalize transition-colors sm:px-6 ${
              isActive ? 'text-white hover:text-white' : 'text-primary'
            }`}
          >
            {isActive && (
              <motion.div
                layoutId="pill"
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                className="bg-primary absolute inset-0 z-0 rounded-full shadow-sm"
              />
            )}
            <span className="relative z-10">{tab}</span>
          </button>
        );
      })}
    </div>
  );
}
