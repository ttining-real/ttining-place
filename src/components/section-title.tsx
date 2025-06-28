import { Agbalumo } from '@/fonts/font';

type SectionTitleProps = {
  title: string;
  className?: string;
};

export default function SectionTitle({ title, className }: SectionTitleProps) {
  return (
    <h3
      className={`${Agbalumo.className} text-primary xs:text-[32px] text-2xl ${className}`}
    >
      {title.toLowerCase()}
    </h3>
  );
}
