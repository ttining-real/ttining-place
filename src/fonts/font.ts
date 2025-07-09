import localFont from 'next/font/local';
import { Montserrat } from 'next/font/google';

export const pretendard = localFont({
  src: [
    {
      path: './PretendardVariable.woff2',
      weight: 'variable',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--pretendardFont',
});

export const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  weight: 'variable',
  variable: '--font-montserrat',
});
