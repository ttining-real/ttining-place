import { ReactNode } from 'react';

interface TableLayoutProps {
  title: string;
  subtitle?: string;
  className?: string;
  children: ReactNode;
}

export default function TableLayout({
  title,
  subtitle,
  className,
  children,
}: TableLayoutProps) {
  return (
    <section className={`py-6 ${className ? className : ''}`}>
      <header className="border-primary-lighter flex items-center gap-2 border-b-2 pb-4">
        <h3 className="text-primary-darkest text-lg font-bold">{title}</h3>
        {subtitle && (
          <span className="text-primary-darker text-sm">{subtitle}</span>
        )}
      </header>
      {children}
    </section>
  );
}
