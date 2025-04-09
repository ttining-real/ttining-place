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
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      aria-hidden={true}
    >
      <use href={`/sprite/stack.svg#${id}`} />
    </svg>
  );
}
