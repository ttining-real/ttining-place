import localFont from 'next/font/local';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const gmarket = localFont({
  src: [
    {
      path: '../fonts/GmarketSansTTFBold.ttf',
      weight: '700',
    },
    {
      path: '../fonts/GmarketSansTTFMedium.ttf',
      weight: '400',
    },
    {
      path: '../fonts/GmarketSansTTFLight.ttf',
      weight: '100',
    },
  ],
  display: 'swap',
  variable: '--gmarketFont',
});

export default function Header() {
  const pathname = usePathname();

  const nav = [
    {
      href: '/about',
      name: 'About',
    },
    {
      href: '/experience',
      name: 'Experience',
    },
    {
      href: '/projects',
      name: 'Projects',
    },
    {
      href: '/contact',
      name: 'Contact',
    },
  ];
  return (
    <header className="flex h-12 items-center justify-between gap-6 bg-white px-6 shadow-sm">
      <h1>
        <Link href="/">
          <Image
            src="/logo.svg"
            alt="홈으로 이동 (Jiin 로고)"
            width={50}
            height={28}
          />
        </Link>
      </h1>
      <nav
        className={`${gmarket.className} font-gmarket`}
        aria-label="주요 메뉴"
      >
        <ul className="flex gap-1">
          {nav.map((menu, index) => (
            <li key={index}>
              <Link
                href={menu.href}
                className="font-base p-3 text-sm"
                aria-current={pathname === menu.href ? 'page' : undefined}
              >
                {menu.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
