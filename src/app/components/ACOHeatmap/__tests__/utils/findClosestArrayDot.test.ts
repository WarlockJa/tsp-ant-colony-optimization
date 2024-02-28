import { describe, expect, it } from "vitest";
import { findClosestArrayDot } from "../../utils/findClosestArrayDot";

const mockDotsData: IDot[] = [
  { x: 2, y: 2 },
  { x: 3, y: 3 },
  { x: 1, y: 1 },
];

describe("Testing findClosestArrayDot function", () => {
  it("Receives valid data, returns closest dot from the array", () => {
    const Dot: IDot = { x: 0, y: 0 };
    const expectedResult = { x: 1, y: 1 };
    const result = findClosestArrayDot({ mapDotsData: mockDotsData, Dot });

    expect(result).toEqual(expectedResult);
  });
});
