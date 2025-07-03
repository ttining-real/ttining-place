'use client';

import Image from 'next/image';
import React, { useRef } from 'react';

import { homeAboutMenu } from '@/constants/personal';
import SectionTitle from '@/components/section-title';
import Button from '@/components/button';
import Icon from '@/components/icon';
import IconImg from '@/components/icon-image';
import StackIcon from '@/components/stack-icon';
import { useGsapFadeInOnScroll } from '@/hooks/useGsapFadeInOnScroll';

export default function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null!);

  useGsapFadeInOnScroll(containerRef);

  return (
    <section className="px-6 py-20">
      <div
        ref={containerRef}
        className="flex flex-col gap-8 sm:relative sm:m-auto sm:max-w-4xl"
      >
        <div className="gsap-fade-in flex flex-col gap-4 sm:absolute sm:top-12 sm:right-[144px] sm:z-10 sm:gap-6">
          <header className="flex items-end gap-6 sm:gap-12">
            <SectionTitle title="about" />
            <Button href="/about" variants="tertiary" size="sm">
              자세히 보기
              <Icon id="direction-right" size={14} />
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
              <StackIcon id={label} size={16} />
            ) : (
              <IconImg
                id="open_file_folder"
                alt={`${label} 아이콘`}
                size={16}
              />
            );

            const linkProps = {
              href,
              className:
                'bg-primary-lightest/80 hover:bg-primary text-primary-darker hover:text-primary-darkest',
              ...(download
                ? { download: true }
                : { target: '_blank', rel: 'noopener noreferrer' }),
            };

            return (
              <li key={label}>
                <Button variants="tertiary" {...linkProps}>
                  {icon}
                  <span className="grow">
                    {download ? label : `${label} 열기`}
                  </span>
                  <Icon id="direction-right" size={16} />
                </Button>
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
            priority
          />
        </figure>
      </div>
    </section>
  );
}
