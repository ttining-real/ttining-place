import PageTitle from '@/components/page-title';
import Card from '@/components/projects/card';
import { dummyProjects, dummySideProjects } from '@/dummy/projects';

export default function Page() {
  return (
    <>
      <PageTitle />
      <div className="flex flex-col gap-12">
        <section id="main" className="flex flex-col gap-4">
          <h2 className="text-xl font-bold text-black dark:text-white">
            Main Projects
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 md:gap-6">
            <Card data={dummyProjects} />
          </div>
        </section>
        <section id="main" className="flex flex-col gap-4">
          <h2 className="text-xl font-bold text-black dark:text-white">
            Side Projects
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 md:gap-6">
            <Card data={dummySideProjects} />
          </div>
        </section>
      </div>
    </>
  );
}
