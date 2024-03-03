interface ISelectedPointsDataProps {
  pointA: number | null;
  pointB: number | null;
  desirabilityMatrix: TDesirabilityMatrix;
}
export default function SelectedPointsData({
  desirabilityMatrix,
  pointA,
  pointB,
}: ISelectedPointsDataProps) {
  if (pointA === null || pointB === null) return;
  const data =
    pointA < pointB
      ? desirabilityMatrix[pointA][pointB]
      : desirabilityMatrix[pointB][pointA];
  return (
    <div className="absolute left-0 top-[9.5em] text-teal-50">
      <div>Distance: {data?.distance}</div>
      <div>Pheromones: {data?.pheromone}</div>
    </div>
  );
}
