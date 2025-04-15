import Link from 'next/link';
import React, { ReactNode } from 'react';

type BaseProps = {
  children: ReactNode;
  className?: string;
};

type ButtonProps =
  | (BaseProps & { type: 'button' })
  | (BaseProps & { type: 'link' | 'external'; path: string });

// children에서 텍스트 추출
function extractText(children: ReactNode): string {
  if (typeof children === 'string') {
    return children;
  }
  return '';
}

export default function Button(props: ButtonProps) {
  const { className = '', children } = props;
  const buttonStyle = `bg-primary text-white px-4 py-2 rounded-lg text-base ${className}`;
  const ariaLabel = extractText(children);

  if (props.type === 'button') {
    return (
      <button type="button" className={buttonStyle}>
        {children}
      </button>
    );
  }

  if (props.type === 'link') {
    return (
      <Link href={props.path} className={buttonStyle} aria-label={ariaLabel}>
        {children}
      </Link>
    );
  }

  if (props.type === 'external') {
    return (
      <a
        href={props.path}
        className={buttonStyle}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={ariaLabel}
      >
        {children}
      </a>
    );
  }

  return null;
}
