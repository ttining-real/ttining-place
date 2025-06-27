import Icon from '@/components/icon';

export default function ToTheTop() {
  const handleTopPosition = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <button
      className="bg-primary/90 border-primary/30 hover:bg-primary focus-ring fixed right-6 bottom-6 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border-2"
      onClick={handleTopPosition}
      aria-label="맨 위로 이동"
    >
      <Icon id="arrow-top" size={24} className="text-white" />
    </button>
  );
}
