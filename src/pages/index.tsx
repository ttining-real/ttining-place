import SubTitle from '@/components/sub-title';
import VisualBanner from '@/components/visual-banner';

export default function Home() {
  return (
    <>
      <VisualBanner />
      <section className="m-auto flex max-w-5xl flex-col gap-6 py-12">
        <SubTitle
          title="Projects"
          description="Front-end Development Project"
        />

        <div className="grid grid-cols-2 gap-6">
          <div className="bg-gray-10 h-[380px] rounded-2xl"></div>
          <div className="bg-gray-10 h-[380px] rounded-2xl"></div>
          <div className="bg-gray-10 h-[380px] rounded-2xl"></div>
          <div className="bg-gray-10 h-[380px] rounded-2xl"></div>
        </div>
      </section>
      <section className="m-auto flex max-w-5xl flex-col gap-6 py-12">
        <SubTitle title="Experience" description="Companies and Freelance" />
        <div className="bg-gray-10 h-[380px] rounded-2xl"></div>
      </section>
    </>
  );
}
