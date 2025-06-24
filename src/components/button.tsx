import Link from 'next/link';
import { ReactNode } from 'react';

type ButtonProps = {
  variant?: 'primary' | 'secondary';
  shape?: 'rect' | 'circle';
  href?: string;
  external?: boolean;
  onClick?: () => void;
  children: ReactNode;
  className?: string;
};

export default function Button({
  variant = 'primary',
  shape = 'rect',
  href,
  external,
  onClick,
  children,
  className = '',
}: ButtonProps) {
  // 내부 링크 여부 판단 (href가 있고, '/'로 시작하면 내부)
  const isInternalLink = href && !external && href.startsWith('/');

  // variant별 클래스 분리
  const variantClassMap = {
    primary: 'bg-primary text-white',
    secondary: 'bg-primary-lighter text-primary-darkest',
  };

  const shapeClassMap = {
    rect: 'rounded-lg',
    circle: 'rounded-full',
  };

  const baseClassName =
    'px-4 py-2 text-sm cursor-pointer ease-in-out transition-colors duration-200 hover:brightness-110';

  const variantClassName = variantClassMap[variant];

  const shapeClassName = shapeClassMap[shape];

  const combinedClassName = `focus-ring ${baseClassName} ${variantClassName} ${shapeClassName} ${className}`;

  if (isInternalLink) {
    return (
      <Link href={href} className={`${combinedClassName}`}>
        {children}
      </Link>
    );
  }

  if (href && !isInternalLink) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${combinedClassName} `}
      >
        {children}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={`${combinedClassName}`}>
      {children}
    </button>
  );
}
