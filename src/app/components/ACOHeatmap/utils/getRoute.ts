export default function getRoute({
  desirabilityMatrix,
  startIndex,
  explorationDesirabilityMatrix,
  mapDotsData,
  q0,
}: {
  desirabilityMatrix: TDesirabilityMatrix;
  explorationDesirabilityMatrix: TDesirabilityMatrix;
  startIndex: number;
  mapDotsData: IDot[];
  q0: number;
}): {
  routeLength: number;
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
      (dot) => dot.x !== currentDot.x && dot.y !== currentDot.y
    );

    // finding dot to travel to
    // TODO make dis
    const nextDot = findNextDot();

    // finding index of the found dot
    const nextDotIndex = mapDotsData.findIndex(
      (dot) => dot.x === nextDot.x && dot.y === nextDot.y
    );
    // finding distance between currentDot and nextDot, adding to routeLength
    // desirabilityMatrix contains data only in the upper diagonal part to avoid duplication (route A->B equivalent to route B->A) therefore to find data for two indexes from mapDotsData i,j in desirabilityMatrix choose whichever index is smaller to be the first. i.e. if i<j data is at desirabilityMatrix[i][j], if i>j data is at desirabilityMatrix[j][i]
    routeLength +=
      currentDotIndex > nextDotIndex
        ? desirabilityMatrix[nextDotIndex][currentDotIndex]!.distance
        : desirabilityMatrix[currentDotIndex][nextDotIndex]!.distance;

    // updating currentDotIndex
    currentDotIndex = nextDotIndex;
    // saving route
    route.push(nextDotIndex);
  } while (mapDotsDataMutable.length > 1);

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

  return { routeLength, updatedExplorationDesirabilityMatrix };
}
