import StackIcon from '@/components/stack-icon';

type ChipProps = {
  id: string;
  icon?: boolean;
};

export default function Chip({ id, icon = false }: ChipProps) {
  return (
    <span className="border-primary/60 text-primary-darker flex w-fit flex-row gap-1 rounded-2xl border px-3 py-1 text-sm">
      {icon && <StackIcon id={id} />}
      {id}
    </span>
  );
}
