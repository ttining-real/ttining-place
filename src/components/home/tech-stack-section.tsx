import { gmarket } from '@/fonts/font';
import Button from '../button';
import Icon from '../icon/icon';
import StackIcon from '../icon/stack-icon';
import { StackDataTypes } from '@/types/tech-stack-types';

export default function TechStackSection({ data }: { data: StackDataTypes[] }) {
  return (
    <section
      className={`bg-[url(/images/tech-stack.png)] bg-cover bg-fixed bg-bottom bg-no-repeat px-6 py-16`}
    >
      <div className="m-auto flex max-w-5xl flex-col gap-6">
        <h2 className={`${gmarket.className} text-2xl font-bold text-white`}>
          Tech Stack
        </h2>
        <div className="flex flex-wrap gap-6">
          {data.map((data, index) => (
            <article
              key={data.id}
              className="flex flex-1 flex-col gap-2 rounded-3xl bg-white/25 p-6 backdrop-blur-md"
            >
              <div className="order-2 flex flex-col gap-2">
                <h3 className="text-xl font-bold text-white">{data.title}</h3>
                <ul className="flex flex-wrap gap-2">
                  {data.stack_items.map((item) =>
                    item.stack_icons.map((icon) => (
                      <li key={icon.id}>
                        <StackIcon id={icon.name} size={16} />
                      </li>
                    )),
                  )}
                </ul>
              </div>
              <div className="order-1 flex items-center justify-between">
                <span className="text-2xl font-bold text-white/50">
                  {`0${index + 1}`}
                </span>
                <Button
                  type="link"
                  size="sm"
                  href={`/tech-stack#${data.title}`}
                  variant="tertiary"
                  className="hover:text-primary bg-white/20 text-white/70 hover:bg-white/40"
                >
                  <Icon id="direction-right" />
                </Button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
