import { ReactNode } from 'react';

interface SectionLayoutTypes {
  full?: boolean;
  title?: string;
  subtitle?: string;
  className?: string;
  style?: React.CSSProperties;
  children: ReactNode;
}

export default function SectionLayout({
  full = false,
  title,
  subtitle,
  className,
  style,
  children,
}: SectionLayoutTypes) {
  return (
    <section
      className={`m-auto flex flex-col items-center gap-6 py-12 ${full === false ? 'max-w-5xl px-6' : ''} ${className}`}
      style={style}
    >
      <header className="flex flex-col gap-1 text-center">
        <h2 className="text-primary text-2xl font-bold">{title}</h2>
        <p className="dark:text-gray-10 text-black">{subtitle}</p>
      </header>
      {children}
    </section>
  );
}
