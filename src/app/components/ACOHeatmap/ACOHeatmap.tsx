import { mapDotsDataAtom } from "@/store/jotai";
import { useAtom } from "jotai";
import getRoute from "./utils/getRoute";

export default function ACOHeatmap() {
  const [mapDotsData] = useAtom(mapDotsDataAtom);

  if (mapDotsData.length === 0) return null;
  const heatmap = getRoute({ mapDotsData, startIndex: 0 });

  return (
    <svg
      width="100vw"
      height="100vh"
      className="translate-x-[0.5em] translate-y-[0.5em]"
    >
      {heatmap.map((line) => (
        <Line
          x1={line.pointA.x}
          y1={line.pointA.y}
          x2={line.pointB.x}
          y2={line.pointB.y}
          width={line.intensity}
        />
      ))}
      <Line
        x1={heatmap[0].pointA.x}
        y1={heatmap[0].pointA.y}
        x2={heatmap[heatmap.length - 1].pointB.x}
        y2={heatmap[heatmap.length - 1].pointB.y}
        color="white"
      />
    </svg>
  );
}

interface ILine {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color?: string;
  width?: number;
}

const Line = ({ x1, y1, x2, y2, color = "black", width = 5 }: ILine) => (
  <line
    x1={`${x1}%`}
    y1={`${y1}%`}
    x2={`${x2}%`}
    y2={`${y2}%`}
    stroke={color}
    strokeWidth={width}
  />
);
