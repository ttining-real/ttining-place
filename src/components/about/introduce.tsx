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
        <header className={`${montserrat.className} `}>
          <h3 className="mb-8 uppercase">Introduce</h3>
        </header>
        <div className="flex flex-col gap-6">
          <p>
            안녕하세요.
            <br />
            사용자 중심의 웹 환경을 만들기 위해 디자인을 넘어 개발까지 탐구하며
            성장하고 있는 안지인입니다.
            <br />
            7년간 UX/UI 디자인과 퍼블리싱 경험을 쌓으며, 사용자 친화적인
            인터페이스 설계와 반응형 웹 개발에 집중해왔습니다.
            <br />
            최근에는 프론트엔드 개발 영역까지 경험을 확장하며 컴포넌트 기반 UI
            개발, CRUD 기능 구현, 성능 최적화 등 실질적인 구현 능력을 키워가고
            있습니다.
          </p>
          <p>
            특히, 아토믹 디자인 시스템을 활용한 구조적 설계와 시맨틱 태그 및
            ARIA 속성을 적극적으로 적용한 웹 접근성 향상에 관심이 많습니다.
            <br />
            기획부터 디자인, 퍼블리싱, 개발까지 전 과정을 아우르며, 직관적이고
            편리한 사용자 경험을 구현하는 UI 개발자로 나아가고 있습니다.
            <br />
            기술과 디자인의 경계에서 더 나은 사용자 경험을 설계하고 구현하는
            안지인입니다. <br />약 7년간의 UX/UI 디자인과 퍼블리싱 경험을
            바탕으로 사용자 중심의 웹을 고민하며 프론트엔드 개발자로 한 걸음씩
            성장하고 있습니다.
          </p>
          <dl className="flex flex-col gap-2">
            {contact.map((item, index) => (
              <div key={index} className="flex items-center gap-4">
                <dt className="text-text-secondary">
                  <IconImg id={item.src} alt={item.alt} size={20} />
                  <span className="sr-only">{item.label}</span>
                </dt>
                <dd className="flex items-center gap-4">
                  {item.site ? (
                    <>
                      {item.site.map((siteItem, siteIndex) => (
                        <React.Fragment key={siteIndex}>
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
      </SectionLayout>
    </>
  );
}
