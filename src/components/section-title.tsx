import localFont from 'next/font/local';

const gmarket = localFont({
  src: [
    {
      path: '../fonts/GmarketSansTTFBold.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../fonts/GmarketSansTTFMedium.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/GmarketSansTTFLight.ttf',
      weight: '200',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--gmarketFont',
});

type SectionTitleProps = {
  title: string;
  description: string;
};

export default function SectionTitle({
  title,
  description,
}: SectionTitleProps) {
  return (
    <header className="flex flex-col items-center gap-1 md:gap-2">
      <h3
        className={`${gmarket.className} gmarket text-center text-lg font-bold text-black md:text-2xl`}
      >
        {title}
      </h3>
      <p className="md:text-md text-center text-sm text-black">{description}</p>
    </header>
  );
}
