import Icon from '../icon/icon';
import Button from '../button';
import LottieAnimation from '../lottie-animation';

export default function IntroduceSection() {
  return (
    <section
      role="region"
      aria-label="포트폴리오 소개 배너"
      className="flex items-center px-6 py-12 sm:px-12"
    >
      <div className="m-auto flex flex-col items-center justify-between gap-8 sm:w-5xl sm:flex-row">
        <div className="order-2 flex flex-1 flex-col items-center gap-6 text-center sm:order-1 sm:flex-1/2 sm:items-start sm:gap-12 sm:text-left">
          <h2 className="text-primary text-xl font-bold break-words sm:text-3xl dark:text-white">
            Design, Develop, Deliver.
          </h2>
          <div className="text-gray-10 text-base break-words">
            <p>
              안녕하세요. 기술과 디자인의 경계에서,
              <br /> 더 나은 사용자 경험을 설계하고 구현하는{' '}
              <strong className="text-primary font-medium dark:text-white">
                UI 개발자 안지인
              </strong>
              입니다.
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
        <LottieAnimation
          src="/animations/Introduce.json"
          className="order-1 flex-1 justify-center sm:order-2 sm:flex-1/3"
        />
      </div>
    </section>
  );
}
