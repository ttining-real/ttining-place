export const contact = [
  {
    href: process.env.NEXT_PUBLIC_PHONE,
    src: '/icons/telephone.png',
    alt: '연락처 아이콘',
  },
  {
    href: process.env.NEXT_PUBLIC_EMAIL,
    src: '/icons/e-mail.png',
    alt: '이메일 아이콘',
  },
  {
    src: '/icons/web_site.png',
    alt: '웹 사이트 아이콘',
    site: [
      {
        href: process.env.NEXT_PUBLIC_GITHUB,
        icon: 'github',
        label: 'GitHub',
      },
      {
        href: process.env.NEXT_PUBLIC_VELOG,
        icon: 'velog',
        label: 'Velog',
      },
    ],
  },
];

export const homeAboutMenu = [
  {
    label: 'GitHub',
    href: process.env.NEXT_PUBLIC_GITHUB!,
    isExternal: true,
  },
  {
    label: 'Velog',
    href: process.env.NEXT_PUBLIC_VELOG!,
    isExternal: true,
  },
  {
    label: '이력서 다운로드',
    href: '/',
    download: true,
  },
];
