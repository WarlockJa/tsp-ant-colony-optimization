import getDistance from "@/app/utils/getDistance";

interface IInitialiseDesirabilityMatrix {
  mapDotsData: IDotWithIndex[];
  initialPheromone: number;
  screenRatio: number;
}
export default function initialiseDesirabilityMatrix({
  mapDotsData,
  initialPheromone,
  screenRatio,
}: IInitialiseDesirabilityMatrix): TDesirabilityMatrix {
  const desirabilityMatrix: TDesirabilityMatrix = [];
  for (let i = 0; i < mapDotsData.length - 1; i++) {
    // addin new row
    desirabilityMatrix.push([]);
    for (let j = i; j < mapDotsData.length; j++) {
      // checking that dots are not same
      if (mapDotsData[i].index !== mapDotsData[j].index) {
        // screenRatio explanation
        // this app uses % when plotting dots to achieve responsive graph. That means on a non-square monitor there are more pixels in 1% on X axis than on 1% Y axis. This creates a distorted picture where visually longer path may be chosen over a shorter one while underlying % numbers are correct. To avoid confusion screenRatio number, which is a result of screen width / screen height, is applied as a multiplier to x coordinates during distance calculations.

        // as a part of the optimisation process adding distance as a separate from heuristic value to avoid reverting it back during route length calculations
        const distance = getDistance(
          { x: mapDotsData[i].x * screenRatio, y: mapDotsData[i].y },
          { x: mapDotsData[j].x * screenRatio, y: mapDotsData[j].y }
        );
        const pheromone = initialPheromone;
        // adding element to the matrix
        desirabilityMatrix[i][j] = {
          pointA: { x: mapDotsData[i].x, y: mapDotsData[i].y },
          pointB: { x: mapDotsData[j].x, y: mapDotsData[j].y },
          distance,
          heuristic: 1 / distance,
          pheromone,
        };
      }
    }
  }

  return desirabilityMatrix;
}
