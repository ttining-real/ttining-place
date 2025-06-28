import { ExperienceDataTypes } from '@/types/experience-data-type';
import { ProjectsDataTypes } from '@/types/projects-data-type';

// experience 데이터 정렬
export function sortedExperienceData(data: ExperienceDataTypes[]) {
  return [...data].sort(
    (a, b) =>
      new Date(b.start_date).getTime() - new Date(a.start_date).getTime(),
  );
}

// projects 데이터 정렬
export function sortedProjectsData(data: ProjectsDataTypes[]) {
  return [...data].sort((a, b) => {
    // 1. type 기준 정렬: main이 먼저
    if (a.type !== b.type) {
      return a.type === 'main' ? -1 : 1;
    }

    // 2. 같은 type이면 display_order 오름차순
    return a.display_order - b.display_order;
  });
}
