import { describe, expect, it } from "vitest";
import initialiseDesirabilityMatrix from "../../utils/initialiseDesirabilityMatrix.1";

const mockMapDotsData: IDot[] = [
  { x: 2, y: 2 },
  { x: 10, y: 10 },
  { x: 3, y: 3 },
  { x: 1, y: 1 },
];
const mockScreenRatio = 1.3652822151224706;

describe("testing initialiseDesirabilityMatrix function", () => {
  it("takes vaild data and returns desirability matrix", () => {
    const mockInitialPheromone = 1;
    const expectedResult: TDesirabilityMatrix = [
      [
        undefined,
        {
          heuristic: 0.07386247318754996,
          pheromone: mockInitialPheromone,
          pointA: { x: 2, y: 2 },
          pointB: { x: 10, y: 10 },
        },
        {
          heuristic: 0.5908997855003997,
          pheromone: mockInitialPheromone,
          pointA: { x: 2, y: 2 },
          pointB: { x: 3, y: 3 },
        },
        {
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
          heuristic: 0.08441425507148567,
          pheromone: mockInitialPheromone,
          pointA: { x: 10, y: 10 },
          pointB: { x: 3, y: 3 },
        },
        {
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
