import StackIcon from '@/components/stack-icon';

type ChipProps = {
  id: string;
  icon?: boolean;
  className?: string;
};

export default function Chip({ id, icon = false, className = '' }: ChipProps) {
  return (
    <span
      className={`text-text-primary bg-surface flex w-fit flex-row items-center gap-1.5 rounded-4xl px-4 py-2 ${className}`}
    >
      {icon && <StackIcon id={id} size={18} />}
      {id}
    </span>
  );
}
