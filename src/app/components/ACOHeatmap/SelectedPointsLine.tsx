import Line from "@/app/utils/Line";

interface ISelectedPointsDataProps {
  pointA: number | null;
  pointB: number | null;
  desirabilityMatrix: TDesirabilityMatrix;
}
export default function SelectedPointsLine({
  desirabilityMatrix,
  pointA,
  pointB,
}: ISelectedPointsDataProps) {
  if (pointA === null || pointB === null) return null;
  const data =
    pointA < pointB
      ? desirabilityMatrix[pointA][pointB]
      : desirabilityMatrix[pointB][pointA];
  return (
    <Line
      x1={data!.pointA.x}
      x2={data!.pointB.x}
      y1={data!.pointA.y}
      y2={data!.pointB.y}
      width={5}
      color="#fdf4"
    />
  );
}
