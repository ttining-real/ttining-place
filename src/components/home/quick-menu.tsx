import Link from 'next/link';
import Image from 'next/image';

import { MENU_LIST } from '@/dummy/menu-list';

export default function QuickMenu() {
  return (
    <section className="bg-primary/20 flex justify-center px-6 py-10">
      <ul className="grid w-full grid-cols-2 gap-4 sm:w-fit sm:grid-cols-5">
        {MENU_LIST.map((menu) => (
          <li key={menu.source}>
            <Link
              href={`/${menu.source}`}
              className="group flex flex-col items-center gap-2 rounded-2xl p-2"
            >
              <Image
                src={`/icons/${menu.source}.png`}
                alt={`${menu.label}로 이동`}
                width={56}
                height={56}
                className="group-hover:border-primary/75 group-active:border-primary dark:border-gray-60 dark:bg-gray-60 rounded-4xl border-2 border-white bg-white p-3 transition-all duration-300"
              />
              <div className="flex flex-col items-center gap-1">
                <p className="text-primary text-center text-sm font-bold sm:text-base">
                  {menu.label}
                </p>
                <span className="text-primary/50 dark:text-gray-10 text-center text-xs font-medium sm:text-sm">
                  {menu.description}
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
