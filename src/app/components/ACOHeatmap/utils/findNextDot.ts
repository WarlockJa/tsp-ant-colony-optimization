// TEST
const mockFindNextDotResult: { [key: number]: IDot } = {
  0: { x: 1, y: 1 },
  1: { x: 3, y: 3 },
  2: { x: 10, y: 10 },
  3: { x: 2, y: 2 },
};

export default function findNextDot(index: number) {
  return mockFindNextDotResult[index];
}
