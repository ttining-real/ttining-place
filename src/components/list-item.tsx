type ListItemProps = {
  id: string;
  title: string;
  period?: string;
  children: React.ReactNode;
};

export default function ListItem({
  id,
  title,
  period,
  children,
}: ListItemProps) {
  return (
    <article
      aria-labelledby={id}
      className="border-gray-40 m-auto flex max-w-5xl flex-col border-t-2 py-4 md:flex-row"
    >
      <h3 id={id} className="flex w-[192px] flex-col p-4 text-2xl font-bold">
        {title}
        {period && <span className="text-sm font-normal">{period}</span>}
      </h3>
      <div className="p-4 text-base">{children}</div>
    </article>
  );
}
