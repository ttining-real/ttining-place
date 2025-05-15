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
      .replace('/', '-')
      .replace('.', '-')
      .toLowerCase();
  };
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 26 26"
      className={className}
      aria-hidden={true}
    >
      <use xlinkHref={`/sprite/stack.svg#${formatId(id)}`} />
    </svg>
  );
}
