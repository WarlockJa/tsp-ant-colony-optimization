import getDistance from "@/app/utils/getDistance";
import { describe, expect, it } from "vitest";
import initialiseDesirabilityMatrix from "../../utils/initialiseDesirabilityMatrix";

const mockMapDotsData: IDot[] = [
  { x: 2, y: 2 },
  { x: 10, y: 10 },
  { x: 3, y: 3 },
  { x: 1, y: 1 },
];

describe("testing initialiseDesirabilityMatrix function", () => {
  it("takes vaild data and returns desirability matrix", () => {
    const mockInitialPheromone = 1;
    const expectedResult: TDesirabilityMatrix = [
      [
        undefined,
        {
          heuristic: 0.08838834764831843,
          pheromone: mockInitialPheromone,
        },
        {
          heuristic: 0.7071067811865475,
          pheromone: mockInitialPheromone,
        },
        {
          heuristic: 0.7071067811865475,
          pheromone: mockInitialPheromone,
        },
      ],
      [
        undefined,
        undefined,
        {
          heuristic: 0.10101525445522107,
          pheromone: mockInitialPheromone,
        },
        {
          heuristic: 0.07856742013183861,
          pheromone: mockInitialPheromone,
        },
      ],
      [
        undefined,
        undefined,
        undefined,
        {
          heuristic: 0.35355339059327373,
          pheromone: mockInitialPheromone,
        },
      ],
    ];

    const result = initialiseDesirabilityMatrix({
      initialPheromone: mockInitialPheromone,
      mapDotsData: mockMapDotsData,
    });
    expect(result).toEqual(expectedResult);
  });
});
