import { describe, expect, it } from "vitest";
import findNextDot from "../../utils/findNextDot";

// IMPORTANT in order for this test to work in findNextDot "const randomChoice = Math.random();" must be commented and replaced with "const randomChoice = 0.5;"

const alpha = 1;
const beta = 4;
const mockDotsData: IDotWithIndex[] = [
  { x: 10, y: 10, index: 1 },
  { x: 3, y: 3, index: 2 },
  { x: 1, y: 1, index: 3 },
];

const mockDesirabilityMatrix: TDesirabilityMatrix = [
  [
    undefined,
    {
      distance: 13.538674740295008,
      heuristic: 0.07386247318754996,
      pheromone: 0.2,
      pointA: { x: 2, y: 2 },
      pointB: { x: 10, y: 10 },
    },
    {
      distance: 1.692334342536876,
      heuristic: 0.5908997855003997,
      pheromone: 0.2,
      pointA: { x: 2, y: 2 },
      pointB: { x: 3, y: 3 },
    },
    {
      distance: 1.692334342536876,
      heuristic: 0.5908997855003997,
      pheromone: 0.2,
      pointA: { x: 2, y: 2 },
      pointB: { x: 1, y: 1 },
    },
  ],
  [
    undefined,
    undefined,
    {
      distance: 11.846340397758132,
      heuristic: 0.08441425507148567,
      pheromone: 0.2,
      pointA: { x: 10, y: 10 },
      pointB: { x: 3, y: 3 },
    },
    {
      distance: 15.231009082831882,
      heuristic: 0.06565553172226664,
      pheromone: 0.2,
      pointA: { x: 10, y: 10 },
      pointB: { x: 1, y: 1 },
    },
  ],
  [
    undefined,
    undefined,
    undefined,
    {
      distance: 3.384668685073752,
      heuristic: 0.29544989275019984,
      pheromone: 0.2,
      pointA: { x: 3, y: 3 },
      pointB: { x: 1, y: 1 },
    },
  ],
];

describe("Testing findeNextDot function", () => {
  it("takes valid data and returns a dot", () => {
    const currentDotIndex = 0;
    const expectedResult: IDotWithIndex = { x: 3, y: 3, index: 2 };

    const result = findNextDot({
      alpha,
      beta,
      currentDotIndex,
      desirabilityMatrix: mockDesirabilityMatrix,
      mapDotsDataMutable: mockDotsData,
    });

    expect(result).toEqual(expectedResult);
  });
});
