import Icon from '../icon/icon';
import LogoIcon from '../icon/logo-icon';

export default function Header({
  isDark,
  setIsDark,
}: {
  isDark: boolean;
  setIsDark: (val: boolean) => void;
}) {
  const toggleTheme = () => {
    const newTheme = isDark ? 'light' : 'dark';

    document.documentElement.classList.toggle('dark', !isDark);
    localStorage.setItem('theme', newTheme);
    setIsDark(!isDark);
  };

  return (
    <header className="bg-gray-60/30 border-gray-40 fixed right-0 left-0 border-b-[1px] px-6 py-2 backdrop-blur-md">
      <div className="m-auto flex max-w-7xl items-center justify-between">
        <h1 aria-label="안지인의 포트폴리오">
          <LogoIcon id={`${isDark ? 'dark' : 'light'}`} />
        </h1>
        <div className="flex items-center gap-6">
          {/* 다크모드 토글 스위치 */}
          <div className="flex items-center gap-2">
            <Icon
              id={`mode-${isDark ? 'light' : 'dark'}`}
              className="text-gray-20"
            />
            <button
              onClick={toggleTheme}
              aria-label="다크 모드 전환"
              className={`relative h-6 w-12 rounded-full transition-colors duration-300 ${
                isDark ? 'bg-gray-30' : 'bg-gray-30'
              }`}
            >
              <span
                className={`absolute top-[4px] left-[4px] h-4 w-4 rounded-full bg-white transition-transform duration-300 ${
                  isDark ? 'translate-x-6' : ''
                }`}
              />
            </button>
          </div>
          <a
            href="#"
            download
            className="bg-primary flex h-[40px] items-center gap-1 rounded-lg px-3 text-sm font-normal text-white"
          >
            <Icon id="download" className="text-white" />
            이력서 다운로드
          </a>
        </div>
      </div>
    </header>
  );
}
