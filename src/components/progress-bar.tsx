'use client';

import { useEffect, useState } from 'react';

export default function ScrollProgressBar() {
  const [scroll, setScroll] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const winHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const percent = winHeight > 0 ? (scrollTop / winHeight) * 100 : 0;
      setScroll(percent);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className="fixed top-[56px] right-0 left-0 h-1 bg-indigo-500"
      role="progressbar"
      aria-valuenow={Math.round(scroll)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="스크롤 진행률"
      style={{ width: `${scroll}%` }}
    />
  );
}
