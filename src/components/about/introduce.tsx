import Image from 'next/image';
import React, { useRef } from 'react';

import { contact } from '@/constants/personal';
import SectionTitle from '@/components/section-title';
import IconImg from '@/components/icon-image';
import StackIcon from '@/components/stack-icon';
import { useGsapFadeInOnScroll } from '@/hooks/useGsapFadeInOnScroll';

export default function Introduce() {
  const containerRef = useRef<HTMLDivElement>(null!);

  useGsapFadeInOnScroll(containerRef);

  const strongClassName =
    'bg-primary/20 rounded-sm px-1 py-0.5 font-normal text-primary-darker';

  return (
    <section id="introduce" className="py-12">
      <div
        ref={containerRef}
        className="m-auto flex max-w-5xl flex-col items-center justify-between gap-8 px-6 sm:flex-row sm:gap-10 md:gap-20"
      >
        <div className="flex flex-col gap-8">
          <header className="gsap-fade-in flex items-baseline gap-4">
            <SectionTitle title="introduce" className="text-[20px]" />
          </header>
          <div className="gsap-fade-in flex flex-col">
            <p>
              안녕하세요. 사용자 중심의 웹 환경을 만들기 위해
              <br />
              디자인을 넘어 개발까지 탐구하며 성장하고 있는{' '}
              <strong className={strongClassName}>안지인</strong>
              입니다.
            </p>

            <p>
              <strong className={strongClassName}>
                7년간 UX/UI 디자인과 퍼블리싱 경험
              </strong>
              을 쌓으며
              <br />
              사용자 친화적인 인터페이스 설계와 반응형 웹 개발에 집중해왔습니다.
            </p>

            <p>
              최근에는 프론트엔드 개발 영역까지 경험을 확장하며 컴포넌트 기반 UI
              개발,
              <br />
              CRUD 기능 구현, 성능 최적화 등 실질적인 구현 능력을 키워가고
              있습니다.
            </p>

            <p>
              특히,{' '}
              <strong className={strongClassName}>아토믹 디자인 시스템</strong>
              을 활용한 구조적 설계와 시맨틱 태그 및<br />
              ARIA 속성을 적극적으로 적용한 웹 접근성 향상에 관심이 많습니다.
            </p>

            <p>
              기획부터 디자인, 퍼블리싱, 개발까지 전 과정을 아우르며,
              <br />
              직관적이고 편리한 사용자 경험을 구현하는{' '}
              <strong className={strongClassName}>UI 개발자</strong>로 나아가고
              있습니다.
            </p>
          </div>
          <dl className="gsap-fade-in flex flex-col gap-2">
            {contact.map((item, index) => (
              <div key={index} className="flex items-center gap-4">
                <dt>
                  <IconImg id={item.src} alt={item.alt} />
                </dt>
                <dd className="flex items-center gap-4">
                  {item.site ? (
                    <>
                      {item.site.map((siteItem, siteIndex) => (
                        <React.Fragment key={siteIndex}>
                          <a
                            href={siteItem.href}
                            className="hover:text-primary flex items-center gap-1 hover:underline"
                          >
                            <StackIcon id={siteItem.icon} size={20} />
                            {siteItem.label}
                          </a>
                          {siteIndex < item.site.length - 1 && (
                            <hr className="border-primary h-3 border" />
                          )}
                        </React.Fragment>
                      ))}
                    </>
                  ) : (
                    item.href
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </div>
        <figure className="gsap-fade-in bg-primary/20 flex aspect-square w-[300px] min-w-[200px] items-center justify-center rounded-3xl">
          <Image
            src="/images/memoji.png"
            alt="지인의 미모티콘"
            width={390}
            height={422}
            className="w-2/3"
            priority
          />
        </figure>
      </div>
    </section>
  );
}
