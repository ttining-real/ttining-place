import Image from 'next/image';
import Icon from '../icon/icon';
import Button from '../button';
import { useThemeStore } from '@/stores/themeStore';

export default function IntroduceSection() {
  const { theme } = useThemeStore();
  return (
    <section
      role="region"
      aria-label="포트폴리오 소개 배너"
      className="px-6 py-12"
    >
      <div className="m-auto flex max-w-5xl flex-col items-center justify-between gap-8 sm:flex-row">
        <div className="order-2 flex w-full flex-1 flex-col items-center gap-6 text-center sm:order-1 sm:flex-2/3 sm:items-start sm:text-left">
          <h2 className="text-primary text-xl font-bold break-words sm:text-2xl dark:text-white">
            Design, Develop, Deliver.
          </h2>
          <div className="text-gray-10 text-base break-words">
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
          <div className="flex w-full gap-2 sm:gap-4">
            <Button
              type="download"
              href="#"
              variant="primary"
              className="flex-1 text-sm sm:flex-none sm:text-base"
            >
              이력서 다운로드
              <Icon id="download" size={20} className="-mt-1" />
            </Button>
            <Button
              type="link"
              href="/about"
              variant="secondary"
              className="flex-1 text-sm sm:flex-none sm:text-base"
            >
              자세히 보기
              <Icon id="direction-right" size={20} className="-mt-0.5" />
            </Button>
          </div>
        </div>
        <figure className="order-1 flex justify-center sm:order-2 sm:flex-1/3">
          <Image
            src={`/images/introduce-${theme === 'dark' ? 'dark' : 'light'}.png`}
            width={285}
            height={369}
            alt="Jiin An's Apple Memoji"
            priority
          />
        </figure>
      </div>
    </section>
  );
}
