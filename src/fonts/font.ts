import localFont from 'next/font/local';

export const pretendard = localFont({
  src: './PretendardVariable.woff2',
  display: 'swap',
  variable: '--pretendardFont',
});

export const gmarket = localFont({
  src: [
    {
      path: './GmarketSansBold.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: './GmarketSansMedium.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './GmarketSansLight.woff2',
      weight: '200',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--gmarketFont',
});
