import { mapDotsDataAtom } from "@/store/jotai";
import { useAtom } from "jotai";
import getRoute from "./utils/getRoute";

export default function ACOHeatmap({ screenRatio }: { screenRatio: number }) {
  const [mapDotsData] = useAtom(mapDotsDataAtom);

  if (mapDotsData.length === 0 || !screenRatio) return null;
  const heatmap = getRoute({ mapDotsData, startIndex: 0, screenRatio });

  return (
    <svg
      width="100vw"
      height="100vh"
      className="translate-x-[0.5em] translate-y-[0.5em]"
    >
      {heatmap.map((line, index, self) => {
        const lineData: { nextIndex: number; color?: string } =
          self.length > index + 1
            ? { nextIndex: index + 1 }
            : { nextIndex: 0, color: "white" };
        return (
          <Line
            key={`line${index}`}
            x1={line.point.x}
            y1={line.point.y}
            x2={self[lineData.nextIndex].point.x}
            y2={self[lineData.nextIndex].point.y}
            width={line.intensity}
            color={lineData.color}
          />
        );
      })}
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
