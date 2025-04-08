import Card from '@/components/card';
import SubTitle from '@/components/sub-title';
import VisualBanner from '@/components/visual-banner';

const cardData = [
  {
    title: '폴짝',
    description: '여행지 추천 서비스',
    imgUrl: '/images/example.gif',
    size: 500,
  },
  {
    title: 'Fitculator',
    description: 'B2C 운동 서비스',
    imgUrl: '/images/example.gif',
    size: 500,
  },
  {
    title: '파티구함',
    description: '스터디 커뮤니케이션 서비스',
    imgUrl: '/images/example.gif',
    size: 500,
  },
  {
    title: '마켓칼리',
    description: "'마켓컬리' 클론 코딩",
    imgUrl: '/images/example.gif',
    size: 500,
  },
];

export default function Home() {
  return (
    <>
      <VisualBanner />
      <section className="m-auto flex max-w-5xl flex-col gap-6 px-6 py-12">
        <SubTitle
          title="Projects"
          description="Front-end Development Project"
        />

        <div className="grid-cols- grid gap-6 md:grid-cols-2">
          {cardData.map((card, index) => (
            <Card
              key={index}
              title={card.title}
              description={card.description}
              imgUrl={card.imgUrl}
              size={card.size}
            />
          ))}
        </div>
      </section>
      <section className="m-auto flex max-w-5xl flex-col gap-6 py-12">
        <SubTitle title="Experience" description="Companies and Freelance" />
        <div className="bg-gray-10 h-[380px] rounded-2xl"></div>
      </section>
    </>
  );
}
