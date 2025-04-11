type ChipProps = {
  text: string;
};

type ChipsProps = {
  data: string[];
};

function Chip({ text }: ChipProps) {
  return (
    <li className="rounded-4xl border border-gray-50 px-3 py-1 text-sm whitespace-nowrap text-black">
      {text}
    </li>
  );
}

export default function Chips({ data }: ChipsProps) {
  return (
    <ul className="flex flex-wrap gap-x-1 gap-y-1.5">
      {data.map((text, index) => (
        <Chip key={index} text={text} />
      ))}
    </ul>
  );
}
