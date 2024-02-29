import getDistance from "@/app/utils/getDistance";
import { describe, expect, it } from "vitest";

const pointsPairsArray: [IDot, IDot][] = [
  [
    { x: 0, y: 0 },
    { x: 1, y: 0 },
  ],
  [
    { x: 0, y: 0 },
    { x: 0, y: 1 },
  ],
  [
    { x: 1, y: 1 },
    { x: 0, y: 1 },
  ],
  [
    { x: 1, y: 1 },
    { x: 1, y: 0 },
  ],
];
describe("Testing getDistance function", () => {
  it("accepts two valid dots and returns magnitude vector", () => {
    const expectedResult = [1, 1, 1, 1];
    const result = pointsPairsArray.map((pair) =>
      getDistance(pair[0], pair[1])
    );
    expect(result).toEqual(expectedResult);
  });
});
