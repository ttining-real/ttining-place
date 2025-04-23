import Link from 'next/link';
import React, { ReactNode } from 'react';

const baseStyle =
  'flex items-center justify-center gap-1 rounded-4xl text-base font-normal border-[1px] whitespace-nowrap hover:font-medium';

const buttonSize: Record<string, string> = {
  sm: 'w-8 h-8',
  md: 'h-12 px-4',
};

const variantStyle: Record<string, string> = {
  primary: 'bg-primary text-white border-white/10 hover:brightness-130',
  secondary: 'bg-transparent text-primary border-primary hover:bg-primary/20',
  tertiary: 'bg-gray-50 text-black border-white/10 hover:bg-gray-40',
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
