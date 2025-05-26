import { ReactNode } from 'react';

interface TableLayoutProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
}

export default function TableLayout({
  title,
  subtitle,
  children,
}: TableLayoutProps) {
  return (
    <section>
      <header className="flex items-center gap-2 border-b pb-2 dark:border-white">
        <h3 className="text-xl text-black dark:text-white">{title}</h3>
        {subtitle && (
          <span className="text-primary text-sm dark:text-indigo-300">
            {subtitle}
          </span>
        )}
      </header>
      {children}
    </section>
  );
}
