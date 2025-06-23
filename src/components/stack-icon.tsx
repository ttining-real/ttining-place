type StackIconProps = {
  id: string;
  size?: number;
  className?: string;
};

export default function StackIcon({
  id,
  size = 24,
  className,
}: StackIconProps) {
  const formatId = (id: string) => {
    return id
      .replace(' ', '-')
      .replace('/', '_')
      .replace('.', '-')
      .replace('module-css', 'css3')
      .toLowerCase();
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 26 26"
      className={className}
      aria-hidden
    >
      <use xlinkHref={`/sprite/stack.svg#${formatId(id)}`} />
    </svg>
  );
}
