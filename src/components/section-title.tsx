import { Agbalumo } from '@/fonts/font';

type SectionTitleProps = {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  title: string;
  className?: string;
};

const headings: Record<
  1 | 2 | 3 | 4 | 5 | 6,
  React.FC<React.HTMLAttributes<HTMLHeadingElement>>
> = {
  1: (props) => <h1 {...props} />,
  2: (props) => <h2 {...props} />,
  3: (props) => <h3 {...props} />,
  4: (props) => <h4 {...props} />,
  5: (props) => <h5 {...props} />,
  6: (props) => <h6 {...props} />,
};

export default function SectionTitle({
  level = 3,
  title,
  className = '',
}: SectionTitleProps) {
  const HeadingTag = headings[level];

  return (
    <HeadingTag
      className={`${Agbalumo.className} text-primary xs:text-[32px] text-2xl ${className}`}
    >
      {title.toLowerCase()}
    </HeadingTag>
  );
}
