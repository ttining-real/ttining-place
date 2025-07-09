import { useEffect, useState } from 'react';

import Button from '@/components/button';

export default function ToTheTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibillity = () => {
      if (window.scrollY > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibillity);
    return () => window.removeEventListener('scroll', toggleVisibillity);
  }, []);

  const handleTopPosition = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      <Button
        variants="primary"
        isIconOnly
        iconId="arrow-top"
        ariaLabel="맨 위로 이동"
        className={`bg-primary/90 border-primary/30 hover:bg-primary focus-ring fixed right-6 bottom-6 flex h-12 w-12 items-center justify-center rounded-full border-2 transition-opacity duration-300 ${
          isVisible
            ? 'pointer-events-auto opacity-100'
            : 'pointer-events-none opacity-0'
        }`}
        onClick={handleTopPosition}
      />
    </>
  );
}
