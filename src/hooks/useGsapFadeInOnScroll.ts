import { RefObject, useEffect } from 'react';
import { gsap } from 'gsap';

export function useGsapFadeInOnScroll<T extends HTMLElement>(
  containerRef: RefObject<T>,
  selector = '.gsap-fade-in',
  condition = true,
) {
  useEffect(() => {
    if (!containerRef.current || !condition) return;

    let ctx: gsap.Context;

    const loadAnimation = async () => {
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      // 렌더링이 완료된 다음에 실행되도록 보장
      requestAnimationFrame(() => {
        if (!containerRef.current) return;

        ctx = gsap.context(() => {
          const targets = containerRef.current!.querySelectorAll(selector);
          if (!targets.length) return;

          targets.forEach((target) => {
            gsap.fromTo(
              target,
              { opacity: 0, y: 80 },
              {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                  trigger: target,
                  start: 'top 90%',
                  toggleActions: 'play none none reset',
                  invalidateOnRefresh: true,
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
