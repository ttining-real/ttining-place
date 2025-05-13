import Button from '@/components/button';
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

export default function Page() {
  return (
    <div className="flex h-full min-h-[calc(100vh-130px)] flex-col items-center justify-center gap-4 md:min-h-[calc(100vh-110px)]">
      <h2 className={`${gmarket.className} text-primary text-xl font-bold`}>
        Page Not Found 😶‍🌫️
      </h2>
      <p>존재하지 않는 페이지입니다.</p>
      <Button type="link" href="/" className="mt-2">
        홈 화면으로 돌아가기
      </Button>
    </div>
  );
}
