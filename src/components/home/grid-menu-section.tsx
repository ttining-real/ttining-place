import Link from 'next/link';

export default function GridMenuSection() {
  const GRID_MENU = [
    {
      label: 'Experience',
      description: '근무 경험',
      href: '/experience',
      colSpan: 1,
    },
    {
      label: 'Main Projects',
      description: '주요 프로젝트',
      href: '/projects#main',
      colSpan: 2,
    },
    {
      label: 'Activities',
      description: '인턴 및 프리랜서 활동',
      href: '/activities',
      colSpan: 2,
    },
    {
      label: 'Side Projects',
      description: '개인 프로젝트',
      href: '/projects#side',
      colSpan: 1,
    },
  ];

  return (
    <section className="px-6 py-16">
      <div className="m-auto grid max-w-5xl grid-cols-3 gap-3 sm:gap-6">
        {GRID_MENU.map((menu) => (
          <Link
            href={menu.href}
            key={menu.label}
            className={`group hover:bg-primary hover:shadow-primary/30 flex flex-col gap-2 rounded-2xl bg-white p-6 whitespace-normal shadow-md shadow-gray-50 transition-all duration-300 sm:rounded-3xl sm:p-8 ${menu.colSpan === 1 ? 'col-span-1' : 'col-span-2'}`}
          >
            <h3 className="text-primary text-lg font-bold break-words group-hover:text-white sm:text-2xl">
              {menu.label}
            </h3>
            <p className="text-gray-10 text-sm font-normal break-words group-hover:text-white/70 sm:text-base">
              {menu.description}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
