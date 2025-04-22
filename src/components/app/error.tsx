import { gmarket } from '@/fonts/font';

interface ErrorTypes {
  error: string;
}

export default function Error({ error }: ErrorTypes) {
  console.log(error);

  return (
    <div className="flex h-[calc(100vh-109px)] flex-col items-center justify-center px-6">
      <h2
        className={`${gmarket.className} mb-4 text-2xl font-bold text-red-400`}
      >
        😵 Failed 😵
      </h2>
      <p>데이터를 불러오는데 오류가 발생했습니다.</p>
      <p>아래의 오류 메시지를 확인해 주세요.</p>
      <p className="mt-4 rounded-lg bg-gray-50 p-4">{error}</p>
    </div>
  );
}
