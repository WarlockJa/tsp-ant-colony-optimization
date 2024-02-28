import getDistance from "@/app/utils/getDistance";

export default function getRoute({
  mapDotsData,
  startIndex,
}: {
  mapDotsData: IDot[];
  startIndex: number;
}) {
  const traverseArray = Array.from({ length: mapDotsData.length }).map(
    (_, index) => index
  );

  // // TEST
  // do {

  // } while (traverseArray.length > 0);

  const currentDot = mapDotsData[startIndex];
  const arrayWithoutCurrentDot = mapDotsData.filter(
    (dot) => dot.x !== currentDot.x && dot.y !== currentDot.y
  );
  const closestDot = findClosestArrayDot(arrayWithoutCurrentDot, currentDot);

  // const heatmap: IHeatmapLine[] = dotsArray.map(dot => {

  // })
  return closestDot;
}

function findClosestArrayDot(mapDotsData: IDot[], Dot: IDot) {
  // Use reduce to find the element with the minimum distance
  const closest = mapDotsData.reduce((previous, current) => {
    const currentDistance = getDistance(current, Dot);
    const previousDistance = previous ? getDistance(previous, Dot) : Infinity;

    return currentDistance < previousDistance ? current : previous;
  }, mapDotsData[0]);

  // Return the closest element
  return closest;
}
