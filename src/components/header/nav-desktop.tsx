import localFont from 'next/font/local';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import StackIcon from '../stack-icon';
import { NAV_LIST } from './nav-list';

const gmarket = localFont({
  src: [
    {
      path: '../../fonts/GmarketSansTTFBold.ttf',
      weight: '700',
    },
    {
      path: '../../fonts/GmarketSansTTFMedium.ttf',
      weight: '400',
    },
    {
      path: '../../fonts/GmarketSansTTFLight.ttf',
      weight: '100',
    },
  ],
  display: 'swap',
  variable: '--gmarketFont',
});

export default function NavDesktop() {
  const pathname = usePathname();

  return (
    <nav className={`${gmarket.className} font-gmarket`} aria-label="주요 메뉴">
      <ul className="flex items-center gap-1">
        {NAV_LIST.map((menu) => {
          const isLink = menu.type === 'link';
          const isButton = menu.type === 'button';
          const isExternal = menu.type === 'external';

          return (
            <li key={menu.name}>
              {isLink ? (
                <Link
                  href={menu.href}
                  aria-current={pathname === menu.href ? 'page' : undefined}
                  className="flex h-14 items-center px-4 text-base font-normal text-black"
                >
                  {menu.name}
                </Link>
              ) : null}
              {isButton ? (
                <button
                  // onClick={onClickContact}
                  className="flex h-14 items-center px-4 text-base font-normal text-black"
                >
                  {menu.name}
                </button>
              ) : null}
              {isExternal ? (
                <a
                  href={menu.href}
                  target="_black"
                  rel="noopener noreferrer"
                  className="flex h-14 items-center px-4 text-base font-normal text-black"
                  aria-label={`안지인의 ${menu.name}으로 이동`}
                >
                  <StackIcon id={menu.name} />
                </a>
              ) : null}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
