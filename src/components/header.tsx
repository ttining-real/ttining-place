import { Agbalumo, pretendard } from '@/fonts/font';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { NAVIGATE } from '@/constants/navigate';

type LogoIconProps = {
  size?: number;
};

function Logo({ size = 40 }: LogoIconProps) {
  return (
    <Image src="/images/logo.svg" width={size} height={size} alt="Jiin 로고" />
  );
}

export default function Header() {
  const pathname = usePathname();

  return (
    <header
      className={`${pretendard.className} border-primary-lightest/30 fixed top-0 right-0 left-0 z-10 flex h-14 items-center justify-between border-b px-6 backdrop-blur-lg`}
    >
      <h1 className={`${Agbalumo.className} text-primary`}>
        <Link href="/">
          <Logo />
        </Link>
      </h1>
      <nav className="flex items-center">
        <ul className="flex gap-4">
          {NAVIGATE.map((nav) => (
            <li key={nav.label}>
              <Link
                href={nav.href}
                className={`px-3 py-2 transition ${
                  pathname === nav.href
                    ? 'text-primary-darker before:bg-primary/30 relative font-semibold before:absolute before:bottom-1 before:left-0 before:h-4 before:w-full'
                    : 'text-primary-darkest'
                }`}
              >
                {nav.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
