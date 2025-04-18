export function calculateDuration(
  startDate: string | Date | undefined,
  endDate: string | Date | undefined,
): string {
  if (!startDate) {
    return '시작일 없음';
  }
  if (!endDate) {
    return '종료일 없음';
  }

  const start = new Date(startDate);
  const end = new Date(endDate);

  let years = end.getFullYear() - start.getFullYear();
  let months = end.getMonth() - start.getMonth();
  const days = end.getDate() - start.getDate();

  if (months < 0) {
    years--;
    months += 12;
  }

  // 일수가 15일 이상이면 개월 수를 반올림
  if (days >= 15) {
    months++;
  }

  // 1년 미만이면 개월 수만 표시
  if (years === 0) {
    return `${months}개월`;
  }

  return `${years}년 ${months}개월`;
}

export function getMonthDiff(
  start: string | Date | undefined,
  end: string | Date | undefined,
): number | undefined {
  if (!start || !end) return;

  const startDate = new Date(start);
  const endDate = new Date(end);

  let months = (endDate.getFullYear() - startDate.getFullYear()) * 12;
  months += endDate.getMonth() - startDate.getMonth();

  // 15일 이상이면 한 달로 친다
  if (endDate.getDate() - startDate.getDate() >= 15) {
    months += 1;
  }

  return months;
}

export function formatTotalDuration(totalMonths: number): string {
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;

  if (years === 0) return `${months}개월`;
  return `${years}년 ${months}개월`;
}
