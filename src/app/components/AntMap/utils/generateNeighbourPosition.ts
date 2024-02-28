import getDistance from "@/app/utils/getDistance";
import getRandomArbitrary from "@/app/utils/getRandomArbitraty";

interface IGenerateNeighbourPositionProps {
  array: IDot[];
  min: number;
  max: number;
  minDistance: number;
  triesNumber: number;
}

// this function find a new set of coordinates that are not in proximity of minDistance
// to any other element in the array. The new coordinates are chosen between min and max
// If no suitable coordinates found in triesNumber tries function returns null
export default function generateNeighbourPosition({
  array,
  min,
  max,
  minDistance,
  triesNumber,
}: IGenerateNeighbourPositionProps): IDot | null {
  let newPositionIsValid = false;
  let breakerCounter = 0;
  let x: number, y: number;
  do {
    // generating coordinates
    x = getRandomArbitrary(min, max);
    y = getRandomArbitrary(min, max);
    // increasing fail safe counter
    breakerCounter++;

    // checking new coordinates validity
    if (
      array.findIndex(
        (position) => getDistance({ x, y }, position) <= minDistance
      ) === -1
    ) {
      newPositionIsValid = true;
    }
    // exit loop if valid coordinates found or amount of tries exceeded
  } while (!newPositionIsValid && breakerCounter < triesNumber);

  return newPositionIsValid ? { x, y } : null;
}
