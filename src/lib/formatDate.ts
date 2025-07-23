// 날짜를 "YYYY년 MM월" 형식으로 변환하는 함수
export function formatDate(dateString: string | Date | undefined): string {
  if (!dateString) {
    return '날짜 없음';
  }

  const date = new Date(dateString);

  // 날짜 형식을 "YYYY년 MM월"로 수동으로 조정
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  // const day = String(date.getDate()).padStart(2, '0');

  return `${year}년 ${month}월`;
}

export function formatYears(startDate: string, endDate: string): string {
  const startYear = new Date(startDate).getFullYear();
  const endYear = new Date(endDate).getFullYear();

  return startYear === endYear ? `${startYear}` : `${startYear} ~ ${endYear}`;
}
