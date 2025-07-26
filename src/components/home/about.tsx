import { montserrat } from '@/fonts/font';
import SectionLayout from '@/components/section-layout';
import Button from '@/components/button';
import InertiaSection from '@/components/home/Inertia';

export default function AboutSection() {
  return (
    <SectionLayout
      outerClassName="bg-section"
      innerClassName="items-center flex-col md:gap-12 md:flex-row"
    >
      <div className="order-2 flex w-full flex-col gap-6 pt-8 text-center md:pt-0">
        <h2
          className={`${montserrat.className} text-text-primary text-[32px] font-bold uppercase`}
        >
          About
        </h2>
        <p className="text-lg font-semibold">
          사용자 경험을 설계하고 구현하는 안지인입니다.
        </p>
        <div>
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
        <div className="flex justify-center gap-3">
          <Button href="/about">자세히 보기</Button>
          <Button
            href={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/personal//ANJIIN_Resume.pdf`}
            variants="secondary"
            className="dark:border-primary-secondary dark:text-primary-secondary"
          >
            이력서 PDF 열기
          </Button>
        </div>
      </div>
      <InertiaSection className="order-1 w-full" />
    </SectionLayout>
  );
}
