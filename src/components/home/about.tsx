'use client';

import React, { useRef } from 'react';

import SectionTitle from '@/components/section-title';
import Button from '@/components/button';
import Icon from '@/components/icon';
import IconImg from '@/components/icon-image';
import StackIcon from '@/components/stack-icon';
import { useGsapFadeInOnScroll } from '@/hooks/useGsapFadeInOnScroll';
import { homeAboutMenu } from '@/constants/personal';
import Image from 'next/image';

export default function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null!);

  useGsapFadeInOnScroll(containerRef);

  return (
    <section className="px-6 py-20">
      <div
        ref={containerRef}
        className="flex flex-col gap-8 sm:relative sm:m-auto sm:max-w-4xl"
      >
        <div className="gsap-fade-in flex flex-col gap-4 sm:absolute sm:top-6 sm:right-[160px] sm:z-10 sm:gap-6">
          <header className="flex items-end gap-4">
            <SectionTitle title="about" />
            <Button href="/about" variant="tertiary">
              자세히 보기
            </Button>
          </header>
          <div className="text-sm sm:text-base">
            <p>
              안녕하세요. 기술과 디자인의 경계에서
              <br />더 나은 사용자 경험을 설계하고 구현하는
              <br />
              UI 개발자 안지인입니다.
            </p>
            <p>
              UX/UI 디자인과 퍼블리싱 경험을 바탕으로
              <br />
              사용자 중심의 웹을 고민하며 프론트엔드 개발자로
              <br />한 걸음씩 성장해가고 있습니다.
            </p>
          </div>
        </div>

        <ul className="gsap-fade-in order-3 flex flex-col gap-2 sm:absolute sm:right-6 sm:bottom-6 sm:z-10">
          {homeAboutMenu.map(({ label, href, isExternal, download }) => {
            const icon = isExternal ? (
              <StackIcon id={label} size={20} />
            ) : (
              <IconImg
                src="/icons/open_file_folder.png"
                alt="이력서 다운로드 아이콘"
                size={20}
              />
            );

            const linkProps = {
              href,
              className:
                'focus-ring flex items-center justify-between gap-2 px-4 py-2 rounded-sm sm:bg-primary-lightest/40',
              ...(download
                ? { download: true }
                : { target: '_blank', rel: 'noopener noreferrer' }),
            };

            return (
              <li key={`${label}-${href}`}>
                <a {...linkProps}>
                  {icon}
                  <span className="grow text-left">{label}</span>
                  <Icon id="direction-right" size={20} />
                </a>
              </li>
            );
          })}
        </ul>

        <figure className="gsap-fade-in aspect-square overflow-hidden sm:aspect-auto">
          <Image
            src="/images/home/bg_about.png"
            alt="사막"
            width={460}
            height={614}
          />
        </figure>
      </div>
    </section>
  );
}
