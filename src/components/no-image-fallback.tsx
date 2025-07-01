import Image from 'next/image';

export default function NoImageFallback() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4">
      <Image
        src="/icons/fearful_face.png"
        alt="두려운 얼굴 아이콘"
        width={40}
        height={40}
        className="h-8 w-8"
      />
      <p className="text-primary text-sm">이미지가 없습니다.</p>
    </div>
  );
}
