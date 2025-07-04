import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import Button from '@/components/button';

export default function Page() {
  const router = useRouter();

  return (
    <div className="m-auto flex h-[calc(100vh-273px)] max-w-5xl flex-col items-center justify-between gap-8 p-6 sm:justify-center">
      <div className="flex h-full flex-col items-center justify-center gap-8 sm:h-auto">
        <motion.span
          aria-hidden
          className="text-8xl"
          animate={{ rotate: [-5, 5, -5], scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        >
          😶‍🌫️
        </motion.span>
        <p className="text-primary-darkest text-lg font-semibold">
          존재하지 않는 페이지입니다.
        </p>
      </div>
      <div className="flex w-full flex-col gap-2 sm:flex-row sm:justify-center">
        <Button
          variants="secondary"
          onClick={() => {
            if (window.history.length > 1) {
              router.back();
            } else {
              router.push('/');
            }
          }}
          className="py-3 text-[16px]"
        >
          이전 화면으로 돌아가기
        </Button>
        <Button onClick={() => router.push('/')} className="py-3 text-[16px]">
          홈 화면으로 돌아가기
        </Button>
      </div>
    </div>
  );
}
