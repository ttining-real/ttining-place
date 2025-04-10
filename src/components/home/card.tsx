import localFont from 'next/font/local';
import Image from 'next/image';

const gmarket = localFont({
  src: [
    {
      path: '../../fonts/GmarketSansTTFBold.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../fonts/GmarketSansTTFMedium.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../fonts/GmarketSansTTFLight.ttf',
      weight: '200',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--gmarketFont',
});

type CardProps = {
  title: string;
  description: string;
  imgUrl: string;
  size: number;
};

export default function Card({ title, description, imgUrl, size }: CardProps) {
  return (
    <article className="flex h-[380px] flex-col overflow-hidden rounded-2xl bg-gray-50">
      <div className="order-1 bg-white p-6">
        <h3 className={`${gmarket.className} font-base font-bold text-black`}>
          {title}
        </h3>
        <p>{description}</p>
      </div>
      <figure className="flex flex-1 items-center justify-center overflow-hidden">
        <Image
          src={imgUrl}
          alt={`${title} 프로젝트`}
          width={size}
          height={size}
          className="w-full"
        />
      </figure>
    </article>
  );
}
