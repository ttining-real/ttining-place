import { FEATURE_DATA } from '@/components/home/feature-data';
import Introduce from '@/components/introduce';

import { gmarket } from '@/fonts/font'; // 예시
import FeatureCard from '@/components/home/feature-card';

export default function Home() {
  return (
    <>
      <Introduce />
      <section className={`${gmarket.className}`}>
        <div className="m-auto grid max-w-5xl grid-cols-6 gap-4 p-6">
          {FEATURE_DATA.map(({ title, color, items, colSpan }, index) => (
            <FeatureCard
              key={index}
              title={title}
              color={color}
              items={items}
              colSpan={colSpan}
            />
          ))}
        </div>
      </section>
    </>
  );
}
