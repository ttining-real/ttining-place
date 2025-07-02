import Image from 'next/image';

export default function NoImageFallback({ className }: { className?: string }) {
  const defaultClassName = 'text-primary text-sm';

  const combineClassName = [defaultClassName, className].join(' ');

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4">
      <Image
        src="/icons/fearful_face.png"
        alt="두려운 얼굴 아이콘"
        width={40}
        height={40}
        className="h-8 w-8"
      />
      <p className={combineClassName}>이미지가 없습니다.</p>
    </div>
  );
}
