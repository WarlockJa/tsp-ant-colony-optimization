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
    <div>
      <div>Distance: {data?.distance}</div>
      <div>Pheromones: {data?.pheromone}</div>
    </div>
  );
}
