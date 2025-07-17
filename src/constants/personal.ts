export const contact = [
  {
    href: process.env.NEXT_PUBLIC_PHONE,
    src: 'telephone',
    alt: '전화 아이콘',
    label: '전화번호',
  },
  {
    href: process.env.NEXT_PUBLIC_EMAIL,
    src: 'e-mail',
    alt: '이메일 아이콘',
    label: '이메일',
  },
  {
    src: 'web_site',
    alt: '웹 사이트 아이콘',
    label: '웹사이트',
    site: [
      {
        href: process.env.NEXT_PUBLIC_GITHUB,
        icon: 'github',
        label: 'GitHub',
        ariaLabel: 'ttining-real GitHub 페이지 열기',
      },
      {
        href: process.env.NEXT_PUBLIC_VELOG,
        icon: 'velog',
        label: 'Velog',
        ariaLabel: 'ttining-real Velog 블로그 열기',
      },
    ],
  },
];
