import Chips from '../chips';

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
  console.log(contents);

  return (
    <div className="flex flex-col gap-1">
      <dt className="text-gray-10 font-medium">{label}</dt>
      <dd>
        {Array.isArray(contents) ? (
          stack === true ? (
            <Chips icon={true} data={contents} />
          ) : list === true ? (
            <ul className="pt-1">
              {contents.map((content, index) => (
                <li
                  key={index}
                  className="before:bg-gray-10 relative pl-2 before:absolute before:top-1/2 before:left-[1px] before:h-[3px] before:w-[3px] before:-translate-y-1/2 before:transform before:rounded-sm before:content-['']"
                >
                  {content}
                </li>
              ))}
            </ul>
          ) : (
            <ul>
              {contents.map((content, index) => (
                <li key={index}>{content}</li>
              ))}
            </ul>
          )
        ) : (
          <p>{contents}</p>
        )}
      </dd>
    </div>
  );
}
