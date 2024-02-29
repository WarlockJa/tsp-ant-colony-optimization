import { describe, expect, it } from "vitest";
import getRoute from "../../utils/getRoute";

const mockDotsData: IDot[] = [
  { x: 2, y: 2 },
  { x: 10, y: 10 },
  { x: 3, y: 3 },
  { x: 1, y: 1 },
];

describe("Testing getRoute function", () => {
  it("Accepts valid data and returns a route", () => {
    const startIndex = 0;
    const expectedResult: IHeatmapLine[] = [
      { point: { x: 2, y: 2 }, intensity: 5 },
      { point: { x: 3, y: 3 }, intensity: 5 },
      { point: { x: 1, y: 1 }, intensity: 5 },
      { point: { x: 10, y: 10 }, intensity: 5 },
    ];

    const result = getRoute({
      mapDotsData: mockDotsData,
      startIndex,
      screenRatio: 1.3652822151224706,
    });
    expect(result).toEqual(expectedResult);
  });
});
