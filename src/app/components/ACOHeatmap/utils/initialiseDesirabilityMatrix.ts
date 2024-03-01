import areDotsEqual from "@/app/utils/areDotsEqual";
import getDistance from "@/app/utils/getDistance";

interface IInitialiseDesirabilityMatrix {
  mapDotsData: IDot[];
  initialPheromone: number;
}
export default function initialiseDesirabilityMatrix({
  mapDotsData,
  initialPheromone,
}: IInitialiseDesirabilityMatrix): TDesirabilityMatrix {
  const desirabilityMatrix: TDesirabilityMatrix = [];
  for (let i = 0; i < mapDotsData.length - 1; i++) {
    // addin new row
    desirabilityMatrix.push([]);
    for (let j = i; j < mapDotsData.length; j++) {
      // checking that dots are not same
      if (!areDotsEqual(mapDotsData[i], mapDotsData[j])) {
        const heuristic = 1 / getDistance(mapDotsData[i], mapDotsData[j]);
        const pheromone = initialPheromone;
        // adding element to the matrix
        desirabilityMatrix[i][j] = {
          pointA: mapDotsData[i],
          pointB: mapDotsData[j],
          heuristic,
          pheromone,
        };
      }
    }
  }

  return desirabilityMatrix;
}
