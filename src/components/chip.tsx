import StackIcon from '@/components/stack-icon';

type ChipProps = {
  id: string;
  icon?: boolean;
  className?: string;
};

export default function Chip({ id, icon = false, className = '' }: ChipProps) {
  return (
    <span
      className={`text-primary-darker bg-primary/15 flex w-fit flex-row items-center gap-1 rounded-2xl px-3 py-1 text-sm ${className}`}
    >
      {icon && <StackIcon id={id} size={16} />}
      {id}
    </span>
  );
}
