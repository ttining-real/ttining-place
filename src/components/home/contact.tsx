import { useRef } from 'react';

import SectionTitle from '@/components/section-title';
import IconImg from '@/components/icon-image';
import { useGsapFadeInOnScroll } from '@/hooks/useGsapFadeInOnScroll';

export default function ContactSection() {
  const containerRef = useRef<HTMLDivElement>(null!);

  useGsapFadeInOnScroll(containerRef);

  const contactList = [
    {
      label: '연락처',
      value: process.env.NEXT_PUBLIC_PHONE!,
      icon: 'telephone',
    },
    {
      label: '이메일',
      value: process.env.NEXT_PUBLIC_EMAIL!,
      icon: 'e-mail',
    },
  ];

  return (
    <section className="px-6 py-12">
      <div ref={containerRef} className="m-auto flex max-w-5xl flex-col gap-6">
        <header className="gsap-fade-in text-center">
          <SectionTitle title="Contact Me" className="text-primary-darker" />
        </header>
        <dl className="gsap-fade-in flex flex-col justify-center gap-4 sm:flex-row">
          {contactList.map((contact) => (
            <div
              key={contact.label}
              className="border-primary-lighter hover:border-primary/60 rounded-4xl border-2 bg-white/80 px-6 py-3"
            >
              <dt className="sr-only">{contact.label}</dt>
              <dd className="text-primary-darker flex items-center justify-center gap-2">
                <IconImg
                  src={`/icons/${contact.icon}.png`}
                  alt={`${contact.label} 아이콘`}
                />
                {contact.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
