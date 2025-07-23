import Link from 'next/link';
import { ReactNode } from 'react';
import { Url } from 'next/dist/shared/lib/router/router';

import { pretendard } from '@/fonts/font';
import Icon from '@/components/icon';

type ButtonSize = 'sm' | 'md' | 'lg';
type ButtonVariant = 'primary' | 'secondary' | 'tertiary';

type BaseProps = {
  variants?: ButtonVariant;
  size?: ButtonSize;
  isIconOnly?: boolean;
  iconId?: string;
  children?: ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string | Url;
  ariaLabel?: string;
  disabled?: boolean;
};

type IconOnlyButtonProps = BaseProps & {
  isIconOnly: true;
  iconId: string;
  ariaLabel: string;
  children?: never;
};

type TextButtonProps = BaseProps & {
  isIconOnly?: false;
  iconId?: string;
  ariaLabel?: string;
  children: ReactNode;
};

type ButtonProps = IconOnlyButtonProps | TextButtonProps;

export default function Button({
  variants = 'primary',
  size = 'md',
  isIconOnly = false,
  iconId,
  children,
  className,
  onClick,
  href,
  ariaLabel,
  disabled,
}: ButtonProps) {
  // classMap
  const variantsClassMap: Record<ButtonVariant, string> = {
    primary:
      'focus-ring cursor-pointer bg-primary border-primary text-white hover:bg-primary-light active:bg-primary-dark',
    secondary:
      'focus-ring cursor-pointer bg-transparent border-primary text-primary hover:border-primary-light hover:text-primary hover:bg-primary/10 active:border-primary-dark active:text-primary-dark active:bg-primary/15',
    tertiary:
      'focus-ring cursor-pointer bg-transparent border-transparent text-primary hover:bg-primary/10 hover:text-primary-light active:bg-primary/15 active:text-primary-dark',
  };

  const disabledClassMap: Record<ButtonVariant, string> = {
    primary:
      'bg-disabled-bg text-disabled-text border-gray-300 focus:outline-0 cursor-not-allowed',
    secondary:
      'bg-transparent text-[#aaaaaa] border-[#cccccc] focus:outline-0 cursor-not-allowed',
    tertiary:
      'bg-transparent text-[#aaaaaa] border-transparent focus:outline-0 cursor-not-allowed',
  };

  const sizeClassMap: Record<ButtonSize, string> = {
    sm: isIconOnly ? 'h-8 w-8 text-sm' : 'h-8 px-4 gap-2 text-sm',
    md: isIconOnly ? 'h-10 w-10 text-base' : 'h-10 px-6 gap-3 text-base',
    lg: isIconOnly ? 'h-12 w-12 text-lg' : 'h-12 px-8 gap-4 text-lg',
  };

  const iconSizeMap: Record<ButtonSize, number> = {
    sm: 14,
    md: 16,
    lg: 18,
  };

  // className
  const baseClassName = `${pretendard.className} border flex items-center justify-center rounded-full`;

  const buttonCombineStyle = [
    baseClassName,
    disabled ? disabledClassMap[variants] : variantsClassMap[variants],
    sizeClassMap[size],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const sharedProps = {
    className: buttonCombineStyle,
    'aria-label': ariaLabel,
    onClick,
  };

  // href 유무 및 내부, 외부 판단 조건 분기
  if (typeof href === 'string') {
    const isInternal = href.startsWith('/');
    const isDownload = /\.(pdf|zip|jpg|png|jpeg|mp4|mp3|webp|svg|txt)$/.test(
      href,
    );

    if (isInternal) {
      return (
        <Link href={href} {...sharedProps}>
          {/* {content} */}
          {children}
        </Link>
      );
    } else {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          {...(isDownload ? { download: '' } : {})}
          {...sharedProps}
        >
          {/* {content} */}
          {children}
        </a>
      );
    }
  }

  return (
    <button type="button" {...sharedProps}>
      {/* {content} */}
      {children}
      {iconId && <Icon id={iconId} size={iconSizeMap[size]} />}
    </button>
  );
}
