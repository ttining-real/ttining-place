import { montserrat } from '@/fonts/font';
import SectionLayout from '@/components/section-layout';
import Button from '@/components/button';
import Icon from '@/components/icon';

export default function AboutSection() {
  return (
    <SectionLayout outerClassName="bg-section" innerClassName="items-start">
      <header className={`${montserrat.className}`}>
        <h3 className="mb-4 text-sm uppercase sm:mb-8 sm:text-base">
          About Me
        </h3>
        <p className="text-2xl font-bold sm:text-3xl">
          Designer & Publisher & Developer
        </p>
      </header>
      <div className="text-sm sm:text-base">
        <p>
          안녕하세요.
          <br />
          기술과 디자인의 경계에서 더 나은 사용자 경험을 설계하고 구현하는
          안지인입니다.
        </p>
        <p>
          약 7년간의 UX/UI 디자인과 퍼블리싱 경험을 바탕으로 사용자 중심의 웹을
          고민하며
          <br />
          프론트엔드 개발자로 한 걸음씩 성장하고 있습니다.
        </p>
      </div>
      <Button
        href="/about"
        variants="primary"
        size="md"
        ariaLabel="about 페이지로 이동"
      >
        More About Me
        <Icon id="direction-right" size={14} />
      </Button>
    </SectionLayout>
  );
}
