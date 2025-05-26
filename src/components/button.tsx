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
  'flex items-center justify-center gap-1 rounded-md whitespace-nowrap focus:outline-2 focus:outline-offset-2 focus:outline-primary/50 cursor-pointer dark:focus:outline-indigo-400/60';

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
  primary:
    'bg-primary text-white dark:bg-indigo-500 hover:bg-indigo-600 dark:hover:bg-indigo-600',
  secondary:
    'border border-primary text-primary dark:border-indigo-400 dark:text-indigo-400 hover:bg-primary/10 dark:hover:border-indigo-300 dark:hover:text-indigo-300',
  tertiary:
    'bg-gray-50 text-gray-10 dark:bg-gray-40 dark:text-white/60 hover:bg-gray-40 hover:text-black/60 dark:hover:bg-gray-30 dark:hover:text-white',
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
