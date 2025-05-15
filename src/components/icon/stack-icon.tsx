type StackIconProps = {
  id: string;
  width?: number;
  height?: number;
  className?: string;
};

export default function StackIcon({
  id,
  width = 24,
  height = 24,
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
      width={width}
      height={height}
      viewBox="0 0 26 26"
      className={className}
      aria-hidden={true}
    >
      <use xlinkHref={`/sprite/stack.svg#${formatId(id)}`} />
    </svg>
  );
}
