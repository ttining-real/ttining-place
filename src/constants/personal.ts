export const contact = [
  {
    href: process.env.NEXT_PUBLIC_PHONE,
    src: 'telephone',
    alt: '연락처 아이콘',
  },
  {
    href: process.env.NEXT_PUBLIC_EMAIL,
    src: 'e-mail',
    alt: '이메일 아이콘',
  },
  {
    src: 'web_site',
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
    href: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/personal//Anjiin_resume.pdf`,
    download: true,
  },
];
