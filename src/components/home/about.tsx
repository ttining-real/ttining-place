import SectionLayout from '@/components/section-layout';
import { montserrat } from '@/fonts/font';
import Button from '../button';

export default function AboutSection() {
  return (
    <SectionLayout
      outerClassName="bg-section"
      innerClassName="items-center md:flex-row justify-center gap-6"
    >
      <div className="order-2 flex w-full flex-col items-center gap-6">
        <h2
          className={`${montserrat.className} text-text-primary text-[32px] font-bold uppercase`}
        >
          About
        </h2>
        <h3 className="text-lg font-semibold">
          사용자 경험을 설계하고 구현하는 안지인입니다.
        </h3>
        <div className="text-center">
          <p className="text-sm">
            안녕하세요. UI/UX 디자인과 퍼블리싱 경험을 바탕으로
            <br />
            사용자 중심의 웹을 고민하며 프론트엔드 개발로 영역을 확장해나가고
            있습니다.
          </p>
          <p className="text-sm">
            자세한 이야기가 궁금하다면, About 페이지로 이동해 주세요.
          </p>
        </div>
        <div className="flex gap-3">
          <Button href="/about">자세히 보기</Button>
          <Button
            href={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/personal//ANJIIN_Resume.pdf`}
            variants="secondary"
          >
            이력서 PDF 열기
          </Button>
        </div>
      </div>
      <div className="relative order-1 w-full pt-24 pb-12">
        {/* 배경 카드 */}
        <div
          className="absolute top-1/2 left-1/2 h-[200px] w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-xl bg-gradient-to-r from-[#5fa3f5] to-[#2f80ed] shadow-md"
          style={{ top: 'calc(50% - 48px)', left: 'calc(50% - 48px)' }}
        ></div>

        {/* 글래스 카드 */}
        <div
          className="relative top-1/2 left-1/2 h-[200px] w-[320px] -translate-x-1/2 rounded-xl bg-white/10 text-transparent backdrop-blur-xl"
          style={{
            WebkitBackdropFilter: 'blur(12px)',
            backdropFilter: 'blur(12px)',
          }}
        >
          {/* Border layer 1 */}
          <div
            className="absolute inset-0 rounded-xl border border-white"
            style={{
              maskImage:
                'linear-gradient(135deg, white, rgba(255,255,255,0) 50%)',
              WebkitMaskImage:
                'linear-gradient(135deg, white, rgba(255,255,255,0) 50%)',
            }}
          />

          {/* Border layer 2 */}
          <div
            className="absolute inset-0 rounded-xl border border-[#2f80ed]"
            style={{
              maskImage:
                'linear-gradient(135deg, rgba(255,255,255,0) 50%, white)',
              WebkitMaskImage:
                'linear-gradient(135deg, rgba(255,255,255,0) 50%, white)',
            }}
          />

          {/* Content */}
          <div
            className="relative z-10 flex h-full flex-wrap items-start justify-between p-5"
            style={{
              backgroundImage: `
              linear-gradient(rgba(255,255,255,0) 3.125em, hsl(223, 90%, 70%) 3.375em, hsl(178, 90%, 80%) 4.5em),
              linear-gradient(90deg, hsl(178, 90%, 80%) 13em, hsl(223, 90%, 70%) 17.1em, rgba(255,255,255,0) 19.1em),
              linear-gradient(90deg, rgba(255,255,255,0.5) 4em, rgba(255,255,255,0.2))`,
              backgroundPosition: '0 0, 0 100%, 0 0',
              backgroundSize: 'calc(21.1em - 4em) 50%, 100% 50%, 100% 100%',
              backgroundRepeat: 'no-repeat',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
            }}
          >
            <p className="w-3/4 font-serif text-xl leading-[1.2] font-bold">
              Design & Publishing & Development
            </p>
            <p className="text-text-secondary ml-auto self-end text-xs">
              ©2025 ANJIIN All rights reserved
            </p>
          </div>
        </div>
      </div>
    </SectionLayout>
  );
}
