import StackIcon from './icon/stack-icon';

type ChipProps = {
  icon?: boolean;
  text: string;
  className?: string;
};

type ChipsProps = {
  data: string[];
  icon?: boolean;
  chipClassName?: string;
  chipsClassName?: string;
};

export function Chip({ icon = false, text, className = '' }: ChipProps) {
  return (
    <li
      className={`border-gray-20 flex items-center gap-1.5 rounded-3xl border px-4 pt-1.5 pb-1 text-sm font-light text-black/80 dark:text-white/60 ${className}`}
    >
      {icon ? <StackIcon id={text} size={16} /> : null}
      {text}
    </li>
  );
}

export default function Chips({
  data,
  icon = false,
  chipClassName = '',
  chipsClassName = '',
}: ChipsProps) {
  return (
    <ul className={`flex flex-wrap gap-2 ${chipsClassName}`}>
      {data.map((text) => (
        <Chip key={text} text={text} icon={icon} className={chipClassName} />
      ))}
    </ul>
  );
}
