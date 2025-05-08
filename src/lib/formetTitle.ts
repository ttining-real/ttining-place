export function titleFormatter(pathname: string): string | undefined {
  if (pathname === '/' || pathname === '') return;

  const segment = pathname.split('/')[1];

  return segment
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());
}
