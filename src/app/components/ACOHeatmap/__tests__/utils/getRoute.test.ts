import { describe, expect, it } from "vitest";
import getRoute from "../../utils/getRoute";

const mockDotsData: IDot[] = [
  { x: 2, y: 2 },
  { x: 3, y: 3 },
  { x: 1, y: 1 },
];

describe("Testing getRoute function", () => {
  it("Accepts valid data and returns a route", () => {
    const startIndex = 0;
    const expectedResult: IHeatmapLine[] = [
      { pointA: { x: 2, y: 2 }, pointB: { x: 3, y: 3 }, intensity: 5 },
      { pointA: { x: 3, y: 3 }, pointB: { x: 1, y: 1 }, intensity: 5 },
    ];

    const result = getRoute({ mapDotsData: mockDotsData, startIndex });
    expect(result).toEqual(expectedResult);
  });
});
