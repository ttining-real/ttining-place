type IconProps = {
  id: string;
  size?: number;
  className?: string;
};

export default function Icon({ id, size = 24, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      aria-hidden
    >
      <use href={`/sprite/icons.svg#${id}`} />
    </svg>
  );
}
