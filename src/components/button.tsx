import Link from 'next/link';
import React, { ReactNode } from 'react';
import Icon from './icon/icon';

type Size = keyof typeof buttonSize;

type CommonButtonTypes = {
  children: ReactNode;
  size?: Size;
  variant?: keyof typeof variantStyle;
  className?: string;
  icon?: string;
};

type LinkButtonTypes = CommonButtonTypes & {
  type: 'link';
  href: string;
};

type DownloadButtonTypes = CommonButtonTypes & {
  type: 'download';
  href: string;
};

type ExternalButtonTypes = CommonButtonTypes & {
  type: 'external';
  href: string;
};

type NormalButtonTypes = CommonButtonTypes & {
  type: 'button';
  onClick?: () => void;
};

type ButtonTypes =
  | LinkButtonTypes
  | DownloadButtonTypes
  | ExternalButtonTypes
  | NormalButtonTypes;

const baseStyle =
  'flex items-center justify-center gap-1 rounded-md whitespace-nowrap focus:outline-2 focus:outline-offset-2 focus:outline-primary/50 cursor-pointer';

const buttonSize: Record<'sm' | 'md', string> = {
  sm: 'pt-1.5 pb-1 px-2 text-sm',
  md: 'pt-2.5 pb-2 px-4 text-base',
};

// ✅ icon 사이즈 매핑: 숫자 타입
const iconSizeMap: Record<'sm' | 'md', number> = {
  sm: 16,
  md: 24,
};

const variantStyle: Record<string, string> = {
  primary: 'bg-primary text-white hover:bg-indigo-700',
  secondary:
    'border border-primary text-primary dark:border-white/50 dark:text-white hover:bg-primary/10 dark:hover:bg-white/10',
  tertiary:
    'bg-gray-50 text-gray-10 hover:bg-gray-40 hover:text-black/60 dark:hover:text-white/80',
};

export default function Button(props: ButtonTypes) {
  const {
    type,
    size = 'md',
    variant = 'primary',
    icon,
    className,
    children,
  } = props;

  const style = `${baseStyle} ${buttonSize[size]} ${variantStyle[variant]} ${className ?? ''}`;
  const iconSize = iconSizeMap[size];

  const renderContent = () => (
    <>
      {icon && (
        <Icon
          id={icon}
          size={iconSize}
          className={iconSize === 16 ? 'mt-[-2px]' : 'mt-[-4px]'}
        />
      )}
      {children}
    </>
  );

  switch (type) {
    case 'link':
      return (
        <Link href={props.href} className={style}>
          {renderContent()}
        </Link>
      );
    case 'download':
      return (
        <a href={props.href} download className={style}>
          {renderContent()}
        </a>
      );
    case 'external':
      return (
        <a
          href={props.href}
          target="_blank"
          rel="noopener noreferrer"
          className={style}
        >
          {renderContent()}
        </a>
      );
    case 'button':
      return (
        <button className={style} onClick={props.onClick}>
          {renderContent()}
        </button>
      );
    default:
      return null;
  }
}
