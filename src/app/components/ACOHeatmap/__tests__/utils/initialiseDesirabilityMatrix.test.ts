import { describe, expect, it } from "vitest";
import initialiseDesirabilityMatrix from "../../utils/initialiseDesirabilityMatrix";

const mockMapDotsData: IDotWithIndex[] = [
  { x: 2, y: 2, index: 0 },
  { x: 10, y: 10, index: 1 },
  { x: 3, y: 3, index: 2 },
  { x: 1, y: 1, index: 3 },
];
const mockScreenRatio = 1.3652822151224706;

describe("testing initialiseDesirabilityMatrix function", () => {
  it("takes vaild data and returns desirability matrix", () => {
    const mockInitialPheromone = 1;
    const expectedResult: TDesirabilityMatrix = [
      [
        undefined,
        {
          distance: 13.538674740295008,
          heuristic: 0.07386247318754996,
          pheromone: mockInitialPheromone,
          pointA: { x: 2, y: 2 },
          pointB: { x: 10, y: 10 },
        },
        {
          distance: 1.692334342536876,
          heuristic: 0.5908997855003997,
          pheromone: mockInitialPheromone,
          pointA: { x: 2, y: 2 },
          pointB: { x: 3, y: 3 },
        },
        {
          distance: 1.692334342536876,
          heuristic: 0.5908997855003997,
          pheromone: mockInitialPheromone,
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
          pheromone: mockInitialPheromone,
          pointA: { x: 10, y: 10 },
          pointB: { x: 3, y: 3 },
        },
        {
          distance: 15.231009082831882,
          heuristic: 0.06565553172226664,
          pheromone: mockInitialPheromone,
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
          pheromone: mockInitialPheromone,
          pointA: { x: 3, y: 3 },
          pointB: { x: 1, y: 1 },
        },
      ],
    ];

    const result = initialiseDesirabilityMatrix({
      initialPheromone: mockInitialPheromone,
      mapDotsData: mockMapDotsData,
      screenRatio: mockScreenRatio,
    });
    expect(result).toEqual(expectedResult);
  });
});
