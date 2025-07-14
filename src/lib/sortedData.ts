import { ExperienceDataTypes } from '@/types/experience-data-type';

// experience 데이터 정렬
export function sortedExperienceData<T extends ExperienceDataTypes>(
  data: T[],
): T[] {
  return [...data].sort(
    (a, b) =>
      new Date(b.start_date).getTime() - new Date(a.start_date).getTime(),
  );
}

// projects 데이터 정렬
export function sortedProjectsData<
  T extends { type: 'main' | 'side'; display_order: number },
>(data: T[]): T[] {
  return [...data].sort((a, b) => {
    // 1. display_order 기준 오름차순
    if (a.display_order !== b.display_order) {
      return a.display_order - b.display_order;
    }

    // 2. display_order 같으면 type 기준: main 우선
    if (a.type !== b.type) {
      return a.type === 'main' ? -1 : 1;
    }

    return 0;
  });
}
