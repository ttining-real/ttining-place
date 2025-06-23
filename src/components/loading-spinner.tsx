export default function LoadingSpinner() {
  return (
    <span className="relative inline-block h-10 w-10 animate-spin rounded-full border-4 border-white/50">
      <span className="border-b-primary/60 absolute top-1/2 left-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 transform rounded-full border-4 border-transparent"></span>
    </span>
  );
}
