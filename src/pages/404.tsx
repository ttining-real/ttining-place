import Button from '@/components/button';

export default function Page() {
  return (
    <div className="flex h-full min-h-[calc(100vh-296px)] flex-col items-center justify-center gap-4 md:min-h-[calc(100vh-428px)]">
      <h2 className="text-primary text-xl font-bold">Page Not Found 😶‍🌫️</h2>
      <p>존재하지 않는 페이지입니다.</p>
      <Button type="link" href="/" className="mt-2">
        홈 화면으로 돌아가기
      </Button>
    </div>
  );
}
