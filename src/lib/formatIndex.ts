export function formatIndex(i: number) {
  const displayIndex = i + 1;
  return displayIndex < 10 ? `0${displayIndex}` : `${displayIndex}`;
}
