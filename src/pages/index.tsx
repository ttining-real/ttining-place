import localFont from 'next/font/local';
import Link from 'next/link';

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

export default function Home() {
  return (
    <>
      <section className="bg-gray-10 flex h-[360px] flex-col items-center justify-center gap-6">
        <h2
          className={`${gmarket.className} gmarket text-2xl font-bold text-white`}
        >
          Welcome! An Jiin Portfolio
        </h2>
        <p className="text-base text-white">
          I worked as a UX/UI designer and web publisher, Recently, I have been
          studying the front end.
        </p>
        <Link
          href="/about"
          className="bg-primary rounded-md px-4 py-1.5 text-base text-white"
        >
          Go About
        </Link>
      </section>
      <section className="m-auto flex max-w-5xl flex-col gap-6 py-12">
        <header className="flex flex-col items-center gap-1">
          <h3 className={`${gmarket.className} gmarket text-2xl font-bold`}>
            Projects
          </h3>
          <p>Front-end Development Project</p>
        </header>
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-gray-10 h-[380px] rounded-2xl"></div>
          <div className="bg-gray-10 h-[380px] rounded-2xl"></div>
          <div className="bg-gray-10 h-[380px] rounded-2xl"></div>
          <div className="bg-gray-10 h-[380px] rounded-2xl"></div>
        </div>
      </section>
      <section className="m-auto flex max-w-5xl flex-col gap-6 py-12">
        <header className="flex flex-col items-center gap-1">
          <h3 className={`${gmarket.className} gmarket text-2xl font-bold`}>
            Experience
          </h3>
          <p>Companies and Freelance</p>
        </header>
        <div className="bg-gray-10 h-[380px] rounded-2xl"></div>
      </section>
    </>
  );
}
