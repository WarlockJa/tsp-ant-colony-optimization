import getDistance from "@/app/utils/getDistance";

interface IFindClosestArrayDotProps {
  mapDotsData: IDot[];
  Dot: IDot;
}

export function findClosestArrayDot({
  Dot,
  mapDotsData,
}: IFindClosestArrayDotProps): IDot {
  // preserving distance to avoid unnecessary recalculations
  let result: { dot: IDot; distance: number } = {
    dot: mapDotsData[0],
    distance: getDistance(Dot, mapDotsData[0]),
  };
  // calculating distance between the Dot and all mapDotsData entries returning shortest
  for (let index = 1; index < mapDotsData.length; index++) {
    const distance = getDistance(Dot, mapDotsData[index]);
    if (result.distance > distance)
      result = { dot: mapDotsData[index], distance };
  }
  return result.dot;
}
