import React from 'react';

import { montserrat } from '@/fonts/font';

type StarValue = string[] | Record<string, string | string[]>[];

interface StarData {
  situation?: StarValue;
  task?: StarValue;
  action?: StarValue;
  result?: StarValue;
}

export default function StarDetail({
  situation,
  task,
  action,
  result,
}: StarData) {
  const renderValue = (value?: StarValue) => {
    if (!value || !Array.isArray(value)) return null;

    if (typeof value[0] === 'string') {
      return (
        <ul className="list-disc space-y-1 pl-6">
          {(value as string[]).map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      );
    }

    return (
      <dl className="grid gap-8 sm:grid-cols-2">
        {(value as Record<string, string>[]).map((obj, idx) => (
          <div
            key={idx}
            className="border-border bg-surface rounded-2xl border p-6"
          >
            {Object.entries(obj).map(([key, val]) => (
              <React.Fragment key={key}>
                <dt className="text-text-primary mb-4 text-lg font-semibold">
                  {key}
                </dt>
                <dd className="text-text-secondary">{val}</dd>
              </React.Fragment>
            ))}
          </div>
        ))}
      </dl>
    );
  };

  return (
    <>
      {situation && (
        <article>
          <h3 className={`${montserrat.className} mb-4 text-2xl font-semibold`}>
            Situation
          </h3>
          {renderValue(situation)}
        </article>
      )}
      {task && (
        <article>
          <h3 className={`${montserrat.className} mb-4 text-2xl font-semibold`}>
            Task
          </h3>
          {renderValue(task)}
        </article>
      )}
      {action && (
        <article>
          <h3 className={`${montserrat.className} mb-4 text-2xl font-semibold`}>
            Action
          </h3>
          {renderValue(action)}
        </article>
      )}
      {result && (
        <article>
          <h3 className={`${montserrat.className} mb-4 text-2xl font-semibold`}>
            Result
          </h3>
          {renderValue(result)}
        </article>
      )}
    </>
  );
}
