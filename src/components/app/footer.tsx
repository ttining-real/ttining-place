export default function Footer() {
  return (
    <footer
      role="contentinfo"
      className="text-gray-10 flex flex-col border-t border-gray-50 p-4 text-center text-sm font-normal md:flex-row md:items-center md:justify-center md:gap-2"
    >
      <span>&copy; 2025 ttinint place</span>
      <span
        className="md:bg-gray-30 hidden md:block md:h-2.5 md:w-[1px]"
        aria-hidden={true}
      ></span>
      <span>Designed & Developed by 안지인</span>
    </footer>
  );
}
