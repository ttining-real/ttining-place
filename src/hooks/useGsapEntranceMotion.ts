import { RefObject, useEffect } from 'react';
import { gsap } from 'gsap';

export function useGsapEntranceMotion<T extends HTMLElement>(
  containerRef: RefObject<T>,
  selector = '.gsap-entrance',
  condition = true,
) {
  useEffect(() => {
    if (!containerRef.current || !condition) return;

    let ctx: gsap.Context | null = null;
    let tweens: gsap.core.Tween[] = [];

    const loadAnimation = async () => {
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      requestAnimationFrame(() => {
        if (!containerRef.current) return;

        const targets = containerRef.current.querySelectorAll(selector);
        if (targets.length === 0) return;

        ctx = gsap.context(() => {
          tweens = Array.from(targets).map((target) =>
            gsap.fromTo(
              target,
              { opacity: 0, scale: 0.8 },
              {
                opacity: 1,
                scale: 1,
                duration: 1.4,
                ease: 'power3.out',
                scrollTrigger: {
                  trigger: target,
                  start: 'top 80%',
                  toggleActions: 'play reverse play reverse', // ✅ 진입시 play, 벗어나면 reverse
                  markers: false, // 디버깅 시 true로
                },
              },
            ),
          );
        }, containerRef);
      });
    };

    loadAnimation();

    return () => {
      if (ctx) ctx.revert();
      tweens.forEach((tween) => tween.scrollTrigger?.kill());
      ctx = null;
      tweens = [];
    };
  }, [containerRef, selector, condition]);
}
