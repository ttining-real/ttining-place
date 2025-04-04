import localFont from 'next/font/local';

const baseFont = localFont({
  src: '../fonts/PretendardVariable.woff2',
  display: 'swap',
  variable: '--baseFont',
});

const titleFont = localFont({
  src: '../fonts/GmarketSansTTFBold.ttf',
  display: 'swap',
  variable: '--titleFont',
});

export default function Home() {
  return (
    <div className={` ${baseFont.className} bg-primary text-2xl`}>
      <p className="font-black">Pretendard Black</p>
      <p className="font-extrabold">Pretendard ExtraBold</p>
      <p className="font-bold">Pretendard Bold</p>
      <p className="font-semibold">Pretendard SemiBold</p>
      <p className="titleFont">Pretendard Medium</p>
      <p className="font-regular">Pretendard Regular</p>
      <p className="font-light">Pretendard Light</p>
      <p className="font-extralight">Pretendard ExtraLight</p>
      <p className="font-thin">Pretendard Thin</p>
      <p className={`${titleFont.className} title-font`}>
        GmarketSans Bold for Title
      </p>
    </div>
  );
}
