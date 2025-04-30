type LogoIconProps = {
  id: 'light' | 'dark';
  width?: number;
  height?: number;
  className?: string;
};

export default function LogoIcon({
  id,
  width = 80,
  height = 40,
  className,
}: LogoIconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 80 40"
      className={className}
      aria-hidden={true}
    >
      <use href={`/sprite/logo.svg#${id}`} />
    </svg>
  );
}
