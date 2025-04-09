type LogoIconProps = {
  id: 'light' | 'dark';
  className?: string;
};

export default function LogoIcon({ id, className }: LogoIconProps) {
  return (
    <svg
      width={80}
      height={40}
      viewBox="0 0 80 40"
      className={className}
      aria-hidden={true}
    >
      <use href={`/sprite/logo.svg#${id}`} />
    </svg>
  );
}
