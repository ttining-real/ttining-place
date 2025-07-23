type FormatType = 'kor' | 'dot' | 'dash';

/**
 * 날짜를 지정된 형식으로 변환하는 함수
 *
 * @param dateString - 포맷할 날짜 문자열, Date 객체 또는 undefined
 * @param type - 출력 형식: 'kor' | 'dot'
 *   - 'kor': 0000년 00월
 *   - 'dot': 0000. 00
 *   - 'dash': 0000-00-00
 * @returns 포맷된 날짜 문자열 또는 '날짜 없음'
 */
export function formatDate(
  dateString: string | Date | undefined,
  type: FormatType = 'kor',
): string {
  if (!dateString) return '날짜 없음';

  const date = new Date(dateString);
  if (isNaN(date.getTime())) return '날짜 없음';

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  switch (type) {
    case 'kor':
      return `${year}년 ${month}월`;
    case 'dot':
      return `${year}. ${month}`;
    case 'dash':
      return `${year}-${month}-${day}`;
    default:
      return `${year}년 ${month}월`;
  }
}

export function formatYears(startDate: string, endDate: string): string {
  const startYear = new Date(startDate).getFullYear();
  const endYear = new Date(endDate).getFullYear();

  return startYear === endYear ? `${startYear}` : `${startYear} ~ ${endYear}`;
}
