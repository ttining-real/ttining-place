import StackIcon from '@/components/stack-icon';

type ChipProps = {
  id: string;
  icon?: boolean;
  className?: string;
};

export default function Chip({ id, icon = false, className = '' }: ChipProps) {
  return (
    <span
      className={`border-primary/60 text-primary-darker flex w-fit flex-row items-center gap-1 rounded-2xl border px-3 py-1 text-sm ${className}`}
    >
      {icon && <StackIcon id={id} size={16} />}
      {id}
    </span>
  );
}
