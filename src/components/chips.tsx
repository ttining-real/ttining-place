type ChipProps = {
  text: string;
  className?: string;
};

type ChipsProps = {
  data: string[];
  chipClassName?: string;
  chipsClassName?: string;
};

function Chip({ text, className = '' }: ChipProps) {
  return (
    <li
      className={`dark:border-gray-20 rounded-4xl border border-gray-50 px-3 py-1 text-[13px] whitespace-nowrap text-black md:text-sm dark:text-white ${className}`}
    >
      {text}
    </li>
  );
}

export default function Chips({
  data,
  chipClassName = '',
  chipsClassName = '',
}: ChipsProps) {
  return (
    <ul className={`flex flex-wrap gap-x-1 gap-y-1.5 ${chipsClassName}`}>
      {data.map((text, index) => (
        <Chip key={index} text={text} className={chipClassName} />
      ))}
    </ul>
  );
}
