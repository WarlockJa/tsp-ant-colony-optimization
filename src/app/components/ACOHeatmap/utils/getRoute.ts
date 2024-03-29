import findNextDot from "./findNextDot";

export default function getRoute({
  desirabilityMatrix, // contains original data from before the exploration phase
  startIndex, // dot index for mapDotsData to start with
  explorationDesirabilityMatrix, // gathers all pheromone changes during exploration phase
  mapDotsData, // dots map data
  q0, // constant to calculate pheromone change when path is chosen for the route
  alpha, // constant when choosing transition probability pheromone is raised to the power of alpha
  beta, // constant when choosing transition probability heuristic is raised to the power of beta
}: {
  desirabilityMatrix: TDesirabilityMatrix;
  explorationDesirabilityMatrix: TDesirabilityMatrix;
  startIndex: number;
  mapDotsData: IDotWithIndex[];
  q0: number;
  alpha: number;
  beta: number;
}): {
  routeLength: number;
  route: number[];
  updatedExplorationDesirabilityMatrix: TDesirabilityMatrix;
} {
  // resulting pheromone changes
  let updatedExplorationDesirabilityMatrix = explorationDesirabilityMatrix;
  // resulting route length
  let routeLength = 0;
  // keeping track of unvisited dots
  let mapDotsDataMutable = mapDotsData;
  // resulting route. Contains a route sequence of indexes for dots found in mapDotsData starting with startIndex
  let route: number[] = [startIndex];
  // index for the current dot
  let currentDotIndex = startIndex;

  // Calculate Route
  do {
    // finding current dot data
    const currentDot = mapDotsData[currentDotIndex];
    // removing current dot from the copied dots array
    mapDotsDataMutable = mapDotsDataMutable.filter(
      (dot) => dot.index !== currentDot.index
    );

    // TEST this is a plug to replace findNextDot to test getRoute logic in getRoute.test.ts
    // TEST tolerated because findNextDot by design returns random data
    // const nextDot = mapDotsData[currentDotIndex + 1]; // TEST
    // finding dot to travel to
    const nextDot = findNextDot({
      mapDotsDataMutable,
      alpha,
      beta,
      currentDotIndex,
      desirabilityMatrix,
    });

    // finding distance between currentDot and nextDot, adding to routeLength
    // desirabilityMatrix contains data only in the upper diagonal part to avoid duplication (route A->B equivalent to route B->A) therefore to find data for two indexes from mapDotsData i,j in desirabilityMatrix choose whichever index is smaller to be the first. i.e. if i<j data is at desirabilityMatrix[i][j], if i>j data is at desirabilityMatrix[j][i]
    routeLength +=
      currentDotIndex > nextDot.index
        ? desirabilityMatrix[nextDot.index][currentDotIndex]!.distance
        : desirabilityMatrix[currentDotIndex][nextDot.index]!.distance;

    // updating currentDotIndex
    currentDotIndex = nextDot.index;
    // saving route
    route.push(nextDot.index);
  } while (mapDotsDataMutable.length > 1);
  // adding path length from the last dot to the first
  routeLength +=
    currentDotIndex > startIndex
      ? desirabilityMatrix[startIndex][currentDotIndex]!.distance
      : desirabilityMatrix[currentDotIndex][startIndex]!.distance;

  // calculating pheromoneShift. q0 is an arbitrary chosen constant
  const pheromoneShift = q0 / routeLength;

  // adding pheromoneShift to all paths of the route in updatedExplorationDesirabilityMatrix
  for (let index = 1; index < route.length; index++) {
    const pointAIndex = route[index - 1];
    const pointBIndex = route[index];

    // applying same logic finding matrix position as in routeLength clculations
    pointAIndex < pointBIndex
      ? (updatedExplorationDesirabilityMatrix[pointAIndex][
          pointBIndex
        ]!.pheromone += pheromoneShift)
      : (updatedExplorationDesirabilityMatrix[pointBIndex][
          pointAIndex
        ]!.pheromone += pheromoneShift);
  }
  // adjusting pheromones for the path from last dot to first
  currentDotIndex > startIndex
    ? (desirabilityMatrix[startIndex][currentDotIndex]!.pheromone +=
        pheromoneShift)
    : (desirabilityMatrix[currentDotIndex][startIndex]!.pheromone +=
        pheromoneShift);

  return { routeLength, route, updatedExplorationDesirabilityMatrix };
}
