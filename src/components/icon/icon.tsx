interface IconTypes {
  id: string;
  size?: number;
  className?: string;
}

export default function Icon({ id, size = 24, className }: IconTypes) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      aria-hidden={true}
    >
      <use href={`/sprite/icons.svg#${id}`} />
    </svg>
  );
}
