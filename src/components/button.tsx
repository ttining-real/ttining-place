import { ReactNode } from 'react';
import Icon from '@/components/icon';
import Link from 'next/link';

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
  href?: string;
  ariaLabel?: string;
};

type IconOnlyButtonProps = BaseProps & {
  isIconOnly: true;
  iconId: string;
  ariaLabel: string;
  children?: never;
};

type TextButtonProps = BaseProps & {
  isIconOnly?: false;
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
}: ButtonProps) {
  // classMap
  const variantsClassMap: Record<ButtonVariant, string> = {
    primary: 'bg-primary border-primary text-white hover:bg-primary-darker/85',
    secondary:
      'border-primary text-primary hover:bg-primary/20 hover:text-primary-darker',
    tertiary:
      'border-transparent text-primary hover:bg-primary/20 hover:text-primary-darker/80',
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
  const baseClassName =
    'focus-ring border flex items-center justify-center rounded-full cursor-pointer';

  const buttonCombineStyle = [
    baseClassName,
    variantsClassMap[variants],
    sizeClassMap[size],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  // button content
  const content = isIconOnly
    ? iconId && <Icon id={iconId} size={iconSizeMap[size]} />
    : children;

  const sharedProps = {
    className: buttonCombineStyle,
    'aria-label': ariaLabel,
    onClick,
  };

  // href 유무 및 내부, 외부 판단 조건 분기
  if (href) {
    const isInternal = href.startsWith('/');

    if (isInternal) {
      return (
        <Link href={href} {...sharedProps}>
          {content}
        </Link>
      );
    } else {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          {...sharedProps}
        >
          {content}
        </a>
      );
    }
  }

  return (
    <button type="button" {...sharedProps}>
      {content}
    </button>
  );
}
