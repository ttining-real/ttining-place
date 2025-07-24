import { montserrat } from '@/fonts/font';

export default function ImageFallback() {
  const before =
    'before:absolute before:content-[""] before:aspect-square before:h-[120%] before:top-1/2 before:-translate-y-1/2 before:left-1/2 before:-translate-x-1/6 before:rounded-full before:bg-gradient-to-r before:to-transparent before:from-[rgba(176,176,176,0.1)]';

  return (
    <div
      className={`${montserrat.className} text-disabled-text bg-disabled-bg relative inset-0 flex aspect-4/3 w-full flex-col items-center justify-center overflow-hidden p-6 transition-transform duration-500 ease-in-out group-hover:scale-105 ${before}`}
    >
      <p className="text-lg font-semibold">Image Coming Soon...</p>
      <p className="text-sm font-medium">Thumbnail Unavailable</p>
    </div>
  );
}
