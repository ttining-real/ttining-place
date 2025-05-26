'use client';

import Icon from '@/components/icon/icon';

export default function TopButton() {
  const handleTopPosition = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <button
      className="bg-primary focus:outline-primary/50 fixed right-6 bottom-6 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border-2 border-white/60 shadow-lg hover:bg-indigo-600 focus:outline-2 focus:outline-offset-2 dark:border-gray-50/60 dark:focus:outline-indigo-400/60"
      onClick={handleTopPosition}
    >
      <Icon id="arrow-top" size={24} className="text-white" />
    </button>
  );
}
