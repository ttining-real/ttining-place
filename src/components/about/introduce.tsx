import React from 'react';

import { montserrat } from '@/fonts/font';
import { contact } from '@/constants/personal';
import StackIcon from '@/components/stack-icon';
import SectionLayout from '@/components/section-layout';
import IconImg from '@/components/icon-image';

export default function Introduce() {
  return (
    <>
      <SectionLayout>
        <header>
          <h3 className={`${montserrat.className} uppercase`}>Introduce</h3>
        </header>
        <div className="flex flex-col gap-6 md:flex-row md:items-baseline-last md:gap-8">
          <div className="w-full">
            <h4 className="mb-4 text-lg font-semibold">
              사용자 경험을 설계하고 구현하는 안지인입니다.
            </h4>
            <div>
              <p>안녕하세요.</p>
              <p>
                사용자 중심의 웹 환경을 만들기 위해 디자인을 넘어 개발까지
                탐구하며 성장하고 있는 안지인입니다.
              </p>
              <p>
                약 7년간 UX/UI 디자인과 퍼블리싱 경험을 바탕으로, 사용자
                친화적인 인터페이스 설계와 반응형 웹 개발에 집중해왔습니다.
              </p>
              <p>
                최근에는 프론트엔드 개발 영역까지 확장하여 컴포넌트 기반 UI
                개발, CRUD 기능 구현, 성능 최적화 등 실질적인 개발 역량을
                키워가고 있습니다.
              </p>
              <p>
                특히, 아토믹 디자인 시스템을 활용한 구조적 UI 설계와 시맨틱
                태그, ARIA 속성을 적용한 웹 접근성 향상에 많은 관심을 갖고
                있습니다.
              </p>
              <p>
                기획부터 디자인, 퍼블리싱, 개발까지 전 과정을 아우르며,
                직관적이고 편리한 사용자 경험을 구현하는 UI 개발자로 나아가고
                있습니다.
              </p>
            </div>
          </div>
          <div className="bg-section flex shrink-0 flex-col gap-2 rounded-3xl p-6">
            {contact.map((item, index) => (
              <div key={index} className="flex items-center gap-4">
                <h5 className="text-text-secondary">
                  <IconImg id={item.src} alt={item.alt} size={20} aria-hidden />
                  <span className="sr-only">{item.label}</span>
                </h5>
                <>
                  {item.site ? (
                    <>
                      {item.site.map((siteItem, siteIndex) => (
                        <>
                          <a
                            href={siteItem.href}
                            className="hover:text-primary flex items-center gap-2 hover:underline"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={siteItem.ariaLabel}
                          >
                            <StackIcon id={siteItem.icon} size={16} />
                            {siteItem.label}
                          </a>
                          {siteIndex < item.site.length - 1 && (
                            <hr className="border-border h-3 border" />
                          )}
                        </>
                      ))}
                    </>
                  ) : (
                    <p>{item.href}</p>
                  )}
                </>
              </div>
            ))}
          </div>
        </div>
      </SectionLayout>
    </>
  );
}
