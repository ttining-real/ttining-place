import Image from 'next/image';
import { useEffect } from 'react';
import { gsap } from 'gsap';
import { InertiaPlugin } from 'gsap/dist/InertiaPlugin';

gsap.registerPlugin(InertiaPlugin);

export default function InertiaSection({ className }: { className: string }) {
  useEffect(() => {
    let oldX = 0,
      oldY = 0,
      deltaX = 0,
      deltaY = 0;

    // HTMLElement로 타입 단언 (null 체크 후)
    const root = document.querySelector('.emoji-wrap') as HTMLElement | null;
    if (!root) return;

    // 마우스 무브 핸들러 (MouseEvent 명시)
    const handleMouseMove = (e: MouseEvent) => {
      deltaX = e.clientX - oldX;
      deltaY = e.clientY - oldY;
      oldX = e.clientX;
      oldY = e.clientY;
    };

    root.addEventListener('mousemove', handleMouseMove);

    const emojiElements = root.querySelectorAll<HTMLElement>('.emoji');
    const mouseEnterHandlers = new Map<Element, () => void>();

    emojiElements.forEach((el) => {
      const handleMouseEnter = () => {
        const tl = gsap.timeline({
          onComplete: () => {
            tl.kill();
          },
        });
        tl.timeScale(1.2);

        const image = el.querySelector('img');
        if (!image) return;

        tl.to(image, {
          inertia: {
            x: {
              velocity: deltaX * 30,
              end: 0,
            },
            y: {
              velocity: deltaY * 30,
              end: 0,
            },
          },
        });
        tl.fromTo(
          image,
          { rotate: 0 },
          {
            duration: 0.4,
            rotate: (Math.random() - 0.5) * 30,
            yoyo: true,
            repeat: 1,
            ease: 'power1.inOut',
          },
          '<',
        );
      };

      el.addEventListener('mouseenter', handleMouseEnter);
      mouseEnterHandlers.set(el, handleMouseEnter);
    });

    return () => {
      root.removeEventListener('mousemove', handleMouseMove);
      emojiElements.forEach((el) => {
        const handler = mouseEnterHandlers.get(el);
        if (handler) el.removeEventListener('mouseenter', handler);
      });
    };
  }, []);

  return (
    <div
      aria-hidden
      className={`emoji-wrap relative grid grid-cols-4 place-items-center overflow-hidden ${className}`}
    >
      {Array.from({ length: 12 }).map((_, idx) => {
        const paddedIndex = String(idx + 1).padStart(2, '0');
        return (
          <div key={idx} className="emoji">
            <Image
              src={`/images/emoji-${paddedIndex}.webp`}
              alt=""
              width={200}
              height={200}
              className="pointer-events-none block h-32 w-32 rounded-[4%] object-contain will-change-transform"
            />
          </div>
        );
      })}
    </div>
  );
}
