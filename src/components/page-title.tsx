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

interface PageTitleProps {
  title: string;
  imgUrl: string;
  desc?: string[];
}

export default function PageTitle({ title, imgUrl, desc }: PageTitleProps) {
  return (
    <section
      className="flex h-[360px] flex-col items-center justify-center gap-4 bg-cover bg-center px-6 md:relative md:flex-row"
      style={{ backgroundImage: `url(${imgUrl})` }}
    >
      <h2
        className={`${gmarket.className} text-center text-xl font-bold text-white md:flex-1 md:text-3xl dark:text-black`}
      >
        {title}
      </h2>
      <hr
        aria-hidden={true}
        className="w-[80px] border-2 border-white/50 md:hidden dark:border-black/50"
      />
      <div className="flex flex-col text-center text-sm font-normal text-white md:flex-1 dark:text-black">
        {desc?.map((item, index) => <p key={index}>{item}</p>)}
      </div>
    </section>
  );
}
