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
      className="text-primary fixed right-6 bottom-6 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-white shadow-lg"
      onClick={handleTopPosition}
    >
      <Icon id="arrow-top" size={24} />
    </button>
  );
}
