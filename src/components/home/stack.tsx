import { useEffect, useState } from 'react';

import SectionLayout from '@/components/section-layout';
import { montserrat } from '@/fonts/font';
import StackIcon from '@/components/stack-icon';

const TAGS = [
  'Figma',
  'Adobe XD',
  'Photoshop',
  'Illustrator',
  'InDesign',
  'HTML5',
  'CSS3',
  'SCSS',
  'Tailwind CSS',
  'shadcn/ui',
  'JavaScript',
  'React.js',
  'Next.js',
  'Typescript',
  'jQuery',
  'Zustand',
  'Vite',
  'Node.js',
  'Vercel',
  'Netlify',
  'Jenkins',
  'Supabase',
  'Pocketbase',
  'Git',
  'GitHub',
  'GitLab',
  'Slack',
  'Notion',
  'monday.com',
  'Google Drive',
  'Microsoft Office',
  'Hancom Office',
];

interface InfiniteLoopSliderProps {
  children: React.ReactNode;
  duration: number;
  reverse?: boolean;
}

const InfiniteLoopSlider = ({
  children,
  duration,
  reverse = false,
}: InfiniteLoopSliderProps) => {
  return (
    <div
      className="loop-slider"
      style={
        {
          '--duration': `${duration}ms`,
          '--direction': reverse ? 'reverse' : 'normal',
        } as React.CSSProperties
      }
    >
      <ul className="inner">
        {children}
        {children}
      </ul>
    </div>
  );
};

interface TagProps {
  text: string;
}

const Tag = ({ text }: TagProps) => (
  <li
    className={`${montserrat.className} text-text-primary flex items-center gap-2 px-4 py-2 font-medium whitespace-nowrap`}
  >
    <StackIcon id={text} size={16} /> {text}
  </li>
);

export default function StackSection() {
  const [durations, setDurations] = useState<number[]>([]);
  const [shuffledRows, setShuffledRows] = useState<string[][]>([]);

  const DURATION = 15000;
  const ROWS = 5;
  const TAGS_PER_ROW = 5;

  const random = (min: number, max: number): number =>
    Math.floor(Math.random() * (max - min)) + min;

  const shuffle = <T,>(arr: T[]): T[] =>
    [...arr].sort(() => 0.5 - Math.random());

  useEffect(() => {
    const generatedDurations = [...Array(ROWS)].map(() =>
      random(DURATION - 5000, DURATION + 5000),
    );

    const generatedShuffledRows = [...Array(ROWS)].map(() =>
      shuffle(TAGS).slice(0, TAGS_PER_ROW),
    );

    setDurations(generatedDurations);
    setShuffledRows(generatedShuffledRows);
  }, []);

  return (
    <SectionLayout innerClassName="items-center">
      <h2 className={`${montserrat.className} text-[32px] font-bold uppercase`}>
        Tech Stack
      </h2>
      <div className="relative flex max-w-3xl shrink-0 flex-col gap-y-4 overflow-hidden py-8">
        {durations.length > 0 &&
          shuffledRows.length > 0 &&
          durations.map((duration, i) => (
            <InfiniteLoopSlider
              key={i}
              duration={duration}
              reverse={i % 2 === 1}
            >
              {shuffledRows[i].map((tag) => (
                <Tag text={tag} key={tag} />
              ))}
            </InfiniteLoopSlider>
          ))}
        <div aria-hidden className="fade" />
      </div>
    </SectionLayout>
  );
}
