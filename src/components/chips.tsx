import StackIcon from './icon/stack-icon';

type ChipProps = {
  icon: boolean;
  text: string;
  className?: string;
};

type ChipsProps = {
  data: string[];
  icon: boolean;
  chipClassName?: string;
  chipsClassName?: string;
};

export function Chip({ icon = false, text, className = '' }: ChipProps) {
  return (
    <li
      className={`dark:border-gray-20 flex items-center gap-1.5 rounded-4xl border border-gray-50 px-3 py-1 text-[13px] whitespace-nowrap text-black md:text-sm dark:text-white ${className}`}
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
    <ul className={`flex flex-wrap gap-x-1 gap-y-1.5 ${chipsClassName}`}>
      {data.map((text, index) => (
        <Chip icon={icon} key={index} text={text} className={chipClassName} />
      ))}
    </ul>
  );
}
