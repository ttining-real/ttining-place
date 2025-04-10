type ChipProps = {
  text: string;
};

type ChipsProps = {
  data: string[];
};

function Chip({ text }: ChipProps) {
  return (
    <li className="rounded-4xl border border-gray-50 bg-white px-3 py-1 text-base text-black">
      {text}
    </li>
  );
}

export default function Chips({ data }: ChipsProps) {
  return (
    <ul className="flex gap-1">
      {data.map((text, index) => (
        <Chip key={index} text={text} />
      ))}
    </ul>
  );
}
