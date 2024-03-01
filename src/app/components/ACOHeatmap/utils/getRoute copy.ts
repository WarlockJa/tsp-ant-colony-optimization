import { findClosestArrayDot } from "./findClosestArrayDot";

export default function getRoute({
  mapDotsData,
  startIndex,
  screenRatio,
}: {
  mapDotsData: IDot[];
  startIndex: number;
  screenRatio: number;
}): IHeatmapLine[] {
  // index in mapDotsData for the currently processed Dot
  let currentDotIndex = startIndex;
  // shallow copy of the mapDots array with applied multiplier
  const mapDotsDataWithMultiplier = mapDotsData.map((dot) => ({
    x: dot.x * screenRatio,
    y: dot.y,
  }));
  // copy of the mapDotsArrayWithMultiplier to be mutated in calculations
  let dotsArrayCopyMutable = mapDotsDataWithMultiplier;
  // result array. filling first point data with startIndex dot
  let heatmapResult: IHeatmapLine[] = [
    {
      point: mapDotsData[currentDotIndex],
      intensity: 5,
    },
  ];

  do {
    // finding current dot data
    const currentDot = mapDotsDataWithMultiplier[currentDotIndex];
    // removing current dot from the copied dots array
    dotsArrayCopyMutable = dotsArrayCopyMutable.filter(
      (dot) => dot.x !== currentDot.x && dot.y !== currentDot.y
    );
    // finding closest dot to the current
    const closestDot = findClosestArrayDot({
      mapDotsData: dotsArrayCopyMutable,
      Dot: currentDot,
    });

    // finding index of the found dot
    currentDotIndex = mapDotsDataWithMultiplier.findIndex(
      (dot) => dot.x === closestDot.x && dot.y === closestDot.y
    );
    // saving result
    heatmapResult.push({
      point: mapDotsData[currentDotIndex],
      intensity: 5,
    });
  } while (dotsArrayCopyMutable.length > 1);

  return heatmapResult;
}
