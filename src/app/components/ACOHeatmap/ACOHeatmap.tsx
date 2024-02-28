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
      <Line
        x1={mapDotsData[0].x}
        x2={heatmap.x}
        y1={mapDotsData[0].y}
        y2={heatmap.y}
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
