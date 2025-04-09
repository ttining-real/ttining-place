import localFont from 'next/font/local';

type pageTitleProps = {
  title: string;
  description?: string[];
};

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

export default function PageTitle({ title, description }: pageTitleProps) {
  return (
    <section className="flex h-[360px] items-center justify-center bg-white bg-[url('/images/sample_about.png')] bg-cover bg-center bg-no-repeat">
      <div className="m-auto flex max-w-5xl flex-1 flex-col items-center justify-between gap-4 px-6 md:flex-row">
        <div className="flex flex-col items-center gap-4">
          <h2
            className={`${gmarket.className} flex flex-col items-center gap-2 text-3xl font-bold text-white`}
          >
            {title}
          </h2>
          <hr className="w-[80px] border-2 border-white/50 dark:border-black/50" />
        </div>
        {description ? (
          <div className="text-center font-light text-white">
            {description
              .filter((desc) => desc.trim() !== '')
              .map((desc, index) => (
                <p key={index}>{desc}</p>
              ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
