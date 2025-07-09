import { pretendard } from '@/fonts/font';
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="kr" className={`${pretendard.className}`}>
      <Head />
      <body className="scroll-smooth">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
