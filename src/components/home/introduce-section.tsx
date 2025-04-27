import Image from 'next/image';
import { gmarket } from '@/fonts/font';
import Icon from '../icon/icon';
import Button from '../button';

export default function IntroduceSection() {
  return (
    <section
      role="region"
      aria-label="포트폴리오 소개 배너"
      className="bg-[url('/images/introduce.png')] bg-cover bg-fixed bg-bottom bg-no-repeat p-6"
    >
      <div className="m-auto flex max-w-5xl flex-col items-center gap-6 pb-4 sm:flex-row sm:justify-center sm:py-4">
        <figure className="relative h-40 w-40">
          <Image
            src="/images/memoji.png"
            width={240}
            height={240}
            alt="Jiin An's Apple Memoji"
            priority
          />
        </figure>
        <div className="flex flex-col items-center gap-4 text-center text-sm font-medium text-white sm:gap-6 sm:text-base">
          <h2 className={`${gmarket.className} text-xl font-bold sm:text-2xl`}>
            Design, Develop, Deliver.
          </h2>
          <div>
            <p>
              안녕하세요. 기술과 디자인의 경계에서,
              <br /> 더 나은 사용자 경험을 설계하고 구현하는 UI 개발자
              안지인입니다.
            </p>
            <p>
              UX/UI 디자인과 퍼블리싱 경험을 바탕으로
              <br />
              사용자 중심의 웹을 고민하며 프론트엔드 개발로 확장해가고 있습니다.
            </p>
          </div>
          <div className="flex gap-4">
            <Button
              type="download"
              href="#"
              variant="primary"
              className="text-sm sm:text-base"
            >
              이력서 다운로드
              <Icon id="download" size={20} />
            </Button>
            <Button
              type="link"
              href="/about"
              variant="secondary"
              className="border-white/30 bg-white/10 text-sm text-white hover:bg-white/20 sm:text-base"
            >
              자세히 보기
              <Icon id="direction-right" size={20} />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
