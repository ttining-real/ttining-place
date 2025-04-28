import Link from 'next/link';
import React, { ReactNode } from 'react';

const baseStyle =
  'flex items-center justify-center gap-1 rounded-md whitespace-nowrap focus:outline-2 focus:outline-offset-2 focus:outline-primary/50 hover:';

const buttonSize: Record<string, string> = {
  sm: 'w-8 h-8',
  md: 'pt-2.5 pb-2 px-4',
};

const variantStyle: Record<string, string> = {
  primary: 'bg-primary text-white hover:bg-indigo-700',
  secondary:
    'border border-primary text-primary dark:border-white/50 dark:text-white hover:bg-primary/10',
  tertiary: 'bg-gray-50 text-gray-10 hover:bg-gray-40 hover:text-black/60',
};

type CommonButtonTypes = {
  children: ReactNode;
  size?: keyof typeof buttonSize;
  variant?: keyof typeof variantStyle;
  className?: string;
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

export default function Button(props: ButtonTypes) {
  const { type, size = 'md', variant = 'primary', className, children } = props;
  const style = `${baseStyle} ${buttonSize[size]} ${variantStyle[variant]} ${className ?? ''}`;

  switch (type) {
    case 'link':
      return (
        <Link href={props.href} className={style}>
          {children}
        </Link>
      );
    case 'download':
      return (
        <a href={props.href} download className={style}>
          {children}
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
          {children}
        </a>
      );
    case 'button':
      return (
        <button className={style} onClick={props.onClick}>
          {children}
        </button>
      );

    default:
      return null;
  }
}
