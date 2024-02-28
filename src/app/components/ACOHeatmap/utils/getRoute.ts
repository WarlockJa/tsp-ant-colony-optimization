import { findClosestArrayDot } from "./findClosestArrayDot";

export default function getRoute({
  mapDotsData,
  startIndex,
}: {
  mapDotsData: IDot[];
  startIndex: number;
}): IHeatmapLine[] {
  // TODO remove pointA - get data from index-1
  // TODO make a recursion
  let heatmapResult: IHeatmapLine[] = [];
  // index in mapDotsData for the currently processed Dot
  let currentDotIndex = startIndex;
  // shallow copy of the mapDots array to remove already processed dots
  let dotsArrayCopy = mapDotsData;
  do {
    // finding current dot data
    const currentDot = mapDotsData[currentDotIndex];
    // removing current dot from the copiesd dots array
    dotsArrayCopy = dotsArrayCopy.filter(
      (dot) => dot.x !== currentDot.x && dot.y !== currentDot.y
    );
    // finding closest dot to the current
    const closestDot = findClosestArrayDot({
      mapDotsData: dotsArrayCopy,
      Dot: currentDot,
    });

    // finding index of the found dot
    currentDotIndex = mapDotsData.findIndex(
      (dot) => dot.x === closestDot.x && dot.y === closestDot.y
    );
    // saving result
    heatmapResult.push({
      pointA: currentDot,
      pointB: closestDot,
      intensity: 5,
    });
  } while (dotsArrayCopy.length > 1);

  return heatmapResult;
}
