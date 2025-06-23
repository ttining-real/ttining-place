import { RefObject, useEffect } from 'react';
import { gsap } from 'gsap';

export function useGsapFadeInOnScroll<T extends HTMLElement>(
  containerRef: RefObject<T>,
  selector = '.gsap-fade-in',
  condition = true,
) {
  useEffect(() => {
    if (!containerRef.current || !condition) return;

    let ctx: gsap.Context | null = null;
    let tweens: gsap.core.Tween[] = [];

    const loadAnimation = async () => {
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      // requestAnimationFrame 사용 (DOM 렌더링이 보장된 후 실행)
      requestAnimationFrame(() => {
        if (!containerRef.current) return;

        const targets = containerRef.current.querySelectorAll(selector);
        if (targets.length === 0) return;

        ctx = gsap.context(() => {
          const targets = containerRef.current!.querySelectorAll(selector);

          tweens = Array.from(targets).map((target) =>
            gsap.fromTo(
              target,
              { opacity: 0, y: 50 },
              {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                  trigger: target,
                  start: 'top 80%',
                  toggleActions: 'play none none reset',
                },
              },
            ),
          );
        }, containerRef);
      });
    };

    loadAnimation();

    return () => {
      // gsap context가 생성된 경우에만 revert
      if (ctx) ctx.revert();

      // ScrollTrigger 해제
      tweens.forEach((tween) => tween.scrollTrigger?.kill());

      // 메모리 초기화
      ctx = null;
      tweens = [];
    };
  }, [containerRef, selector, condition]);
}
