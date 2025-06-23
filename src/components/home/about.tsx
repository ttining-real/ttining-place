'use client';

import Link from 'next/link';
import React, { useRef } from 'react';

import SectionTitle from '@/components/section-title';
import Icon from '@/components/icon';
import IconImg from '@/components/icon-image';
import StackIcon from '@/components/stack-icon';
import { useGsapFadeInOnScroll } from '@/hooks/useGsapFadeInOnScroll';

export default function AboutSection({
  introduction,
}: {
  introduction: string[];
}) {
  const containerRef = useRef<HTMLDivElement>(null!);

  useGsapFadeInOnScroll(containerRef);

  const aboutMenu = [
    {
      icon: 'github',
      label: 'GitHub',
      link: process.env.NEXT_PUBLIC_GITHUB!,
      isExternal: true,
    },
    {
      icon: 'velog',
      label: 'Velog',
      link: process.env.NEXT_PUBLIC_VELOG!,
      isExternal: true,
    },
    {
      icon: 'download',
      label: '이력서 다운로드',
      link: '/',
      download: true,
    },
  ];

  return (
    <section className="px-6 py-20">
      <div ref={containerRef} className="relative m-auto w-4xl">
        <div className="gsap-fade-in absolute top-12 left-[420px] z-10 flex flex-col gap-8">
          <header className="text-primary flex items-end gap-8">
            <SectionTitle title="about" />
            <Link href="/about">자세히 보기</Link>
          </header>
          <div className="max-w-[400px] whitespace-normal">
            {introduction.map((intro, index) => {
              const splitText = intro.split(/(사용자 경험을|웹을)/);
              return (
                <p key={index}>
                  {splitText.map((part, idx) => {
                    if (part === '사용자 경험을' || part === '웹을') {
                      return (
                        <React.Fragment key={idx}>
                          {part}
                          <br />
                        </React.Fragment>
                      );
                    }
                    return <React.Fragment key={idx}>{part}</React.Fragment>;
                  })}
                </p>
              );
            })}
          </div>
        </div>
        <div className="gsap-fade-in absolute right-0 bottom-[48px]">
          <ul className="flex flex-col gap-6">
            {aboutMenu.map(({ icon, label, link, isExternal, download }) => {
              const content = (
                <>
                  {isExternal ? (
                    <StackIcon id={icon} size={20} className="shrink-0" />
                  ) : (
                    <IconImg
                      src="/icons/open_file_folder.png"
                      alt="이력서 다운로드 아이콘"
                      className="shrink-0"
                    />
                  )}
                  <span className="w-full">{label}</span>
                  <Icon id="direction-right" size={20} className="shrink-0" />
                </>
              );

              return (
                <li key={label}>
                  {download ? (
                    <a
                      href={link}
                      download
                      className="hover:text-primary flex items-center justify-between gap-4"
                    >
                      {content}
                    </a>
                  ) : (
                    <Link
                      href={link}
                      target="_blank"
                      className="hover:text-primary flex items-center justify-between gap-4"
                    >
                      {content}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
        <figure className="gsap-fade-in flex h-[614px] w-[460px] items-center justify-center bg-white"></figure>
      </div>
    </section>
  );
}
