import { RefObject, useEffect } from 'react';
import { gsap } from 'gsap';

export function useGsapEntranceMotion<T extends HTMLElement>(
  containerRef: RefObject<T>,
  selector = '.gsap-entrance',
  condition = true,
) {
  useEffect(() => {
    if (!containerRef.current || !condition) return;

    let ctx: gsap.Context;

    const loadAnimation = async () => {
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      requestAnimationFrame(() => {
        if (!containerRef.current) return;

        ctx = gsap.context(() => {
          const targets = containerRef.current!.querySelectorAll(selector);
          if (targets.length === 0) return;

          targets.forEach((target) => {
            gsap.fromTo(
              target,
              { opacity: 0, scale: 0.2 },
              {
                opacity: 1,
                scale: 1,
                duration: 1.4,
                ease: 'power3.out',
                scrollTrigger: {
                  trigger: target,
                  start: 'top 90%',
                  toggleActions: 'play reverse play reverse', // ✅ 진입시 play, 벗어나면 reverse
                  invalidateOnRefresh: true,
                  markers: false, // 디버깅 시 true로
                },
              },
            );
          });
        }, containerRef);
      });
    };

    loadAnimation();

    return () => {
      ctx?.revert(); // ScrollTrigger 포함한 모든 애니메이션 정리
    };
  }, [containerRef, selector, condition]);
}
