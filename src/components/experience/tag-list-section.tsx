type TagListSection = {
  label: string;
  contents: string | string[];
  list?: boolean;
  stack?: boolean;
};

export default function TagListSection({
  label,
  contents,
  list = false,
  stack = false,
}: TagListSection) {
  return (
    <div className="flex flex-col gap-1">
      <dt className="text-gray-10 font-medium">{label}</dt>
      <dd className={``}>
        {Array.isArray(contents) ? (
          <ul
            className={`${stack === true ? 'flex flex-wrap gap-x-1 gap-y-2 pt-1' : ''}`}
          >
            {contents.map((content, index) => (
              <li
                key={index}
                className={`${list === true ? `before:bg-gray-10 relative pl-2 before:absolute before:top-1/2 before:left-[1px] before:h-[3px] before:w-[3px] before:-translate-y-1/2 before:transform before:rounded-sm before:content-['']` : ''} ${stack === true ? `border-gray-30 rounded-3xl border px-3 py-0.5` : ''}`}
              >
                {content}
              </li>
            ))}
          </ul>
        ) : (
          <p>{contents}</p>
        )}
      </dd>
    </div>
  );
}
