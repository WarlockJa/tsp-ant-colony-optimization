import generateNeighbourPosition from "./generateNeighbourPosition";

export default function generateDots(quantity: number): IDotWithIndex[] {
  // generating array of {x,y} coordinates removed from each other by some minimal distance
  const positionsArray: IDot[] = [];
  Array.from({ length: quantity }).forEach(() => {
    // trying to generate a new valid position
    const newPosition = generateNeighbourPosition({
      array: positionsArray,
      min: 5,
      max: 95,
      minDistance: 5,
      triesNumber: 33,
    });
    // if valid position generated adding it to the array
    newPosition && positionsArray.push(newPosition);
  });

  // adding index to the Dot object to prevent searching for it in mutated array during ACO calculations
  const result: IDotWithIndex[] = positionsArray.map((dot, index) => ({
    ...dot,
    index,
  }));

  return result;
}
