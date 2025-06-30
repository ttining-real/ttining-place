import { useEffect, useState } from 'react';

export function useResponsiveItems(desktopCount = 3, mobileCount = 1) {
  const [itemsPerSlide, setItemsPerSlide] = useState(desktopCount);

  useEffect(() => {
    function handleResize() {
      setItemsPerSlide(window.innerWidth < 640 ? mobileCount : desktopCount);
    }

    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [desktopCount, mobileCount]);

  return itemsPerSlide;
}
