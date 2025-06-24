import { Agbalumo } from '@/fonts/font';
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
      className={`${Agbalumo.className} border-primary-lighter fixed top-0 right-0 left-0 z-50 flex h-16 items-center justify-between border-b bg-[rgba(255,255,255,0.2)] px-2 backdrop-blur-lg`}
    >
      <h1>
        <Link href="/" className="focus-ring flex items-center rounded-sm px-3">
          <Logo />
        </Link>
      </h1>
      <nav>
        <ul className="flex items-center gap-2">
          {NAVIGATE.map((nav) => {
            const isActive = pathname === nav.href;

            return (
              <li key={nav.label}>
                <Link
                  href={nav.href}
                  className={`hover-transition hover-underline-animation focus-ring flex items-center rounded-sm px-4 py-3 ${isActive ? 'active text-primary-darkest' : 'text-primary-darker'}`}
                >
                  {nav.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
