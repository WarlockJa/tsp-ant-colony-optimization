import { describe, expect, it } from "vitest";
import getRoute from "../../utils/getRoute";

// IMPORTANT in order for this test to work in getRoute "const nextDot = findNextDot({mapDotsDataMutable});" must be commented and replaced with "const nextDot = mapDotsData[currentDotIndex + 1];". This is necessary because findNextDot output is inherently random and no means found to mock nested functions output.

const alpha = 1;
const beta = 4;

const mockDotsData: IDotWithIndex[] = [
  { x: 2, y: 2, index: 0 },
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

describe("Testing getRoute function", () => {
  it("Accepts valid data and returns a routeLength and updatedExplorationDesirabilityMatrix", () => {
    const startIndex = 0;
    const q0 = 4;
    const expectedRouteLength = 30.46201816566377;
    const expectedPheromoneChange = q0 / expectedRouteLength;

    const expectedResult: {
      routeLength: number;
      updatedExplorationDesirabilityMatrix: TDesirabilityMatrix;
    } = {
      routeLength: expectedRouteLength,
      updatedExplorationDesirabilityMatrix: [
        [
          undefined,
          {
            distance: 13.538674740295008,
            heuristic: 0.07386247318754996,
            pheromone: 0.2 + expectedPheromoneChange,
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
            pheromone: 0.2 + expectedPheromoneChange,
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
            pheromone: 0.2 + expectedPheromoneChange,
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
            pheromone: 0.2 + expectedPheromoneChange,
            pointA: { x: 3, y: 3 },
            pointB: { x: 1, y: 1 },
          },
        ],
      ],
    };

    const result = getRoute({
      desirabilityMatrix: mockDesirabilityMatrix,
      explorationDesirabilityMatrix: mockDesirabilityMatrix,
      mapDotsData: mockDotsData,
      startIndex,
      q0,
      alpha,
      beta,
    });
    expect(result).toEqual(expectedResult);
  });
});
