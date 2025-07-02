import Image from 'next/image';
import Link from 'next/link';

type LogoIconProps = {
  size?: number;
  className?: string;
};

export default function Logo({ size = 40, className }: LogoIconProps) {
  return (
    <Link href="/" className="focus-ring flex items-center rounded-sm px-3">
      <Image
        src="/images/logo.svg"
        width={size}
        height={size}
        alt="Jiin 로고"
        priority
        className={['aspect-square', className].filter(Boolean).join(' ')}
      />
    </Link>
  );
}
