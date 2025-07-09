import { useEffect, useState } from 'react';

export function useResponsiveItems(
  large: number,
  medium: number,
  small: number,
  breakpoints = { medium: 880, small: 600 },
): number {
  const [items, setItems] = useState(large);

  useEffect(() => {
    function updateItems() {
      const width = window.innerWidth;
      if (width < breakpoints.small) {
        setItems(small);
      } else if (width < breakpoints.medium) {
        setItems(medium);
      } else {
        setItems(large);
      }
    }

    updateItems();
    window.addEventListener('resize', updateItems);
    return () => window.removeEventListener('resize', updateItems);
  }, [large, medium, small, breakpoints]);

  return items;
}
