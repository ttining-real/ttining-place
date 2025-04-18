export interface NavItemProps {
  type: 'link' | 'external' | 'button';
  href: string;
  name: string;
}

export const NAV_LIST = [
  {
    type: 'link',
    href: '/about',
    name: 'About',
  },
  {
    type: 'link',
    href: '/experience',
    name: 'Experience',
  },
  {
    type: 'link',
    href: '/projects',
    name: 'Projects',
  },
  {
    type: 'button',
    href: '/contact',
    name: 'Contact',
  },
  {
    type: 'external',
    href: 'https://github.com/ttining-real',
    name: 'GitHub',
  },
  {
    type: 'external',
    href: 'https://velog.io/@ttining/posts',
    name: 'Velog',
  },
] as const;
