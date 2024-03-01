import {
  desirabilityMatrixAtom,
  mapDotsDataAtom,
  parametersAtom,
  solveFlagAtom,
} from "@/store/jotai";
import { useAtom } from "jotai";
import getRoute from "./utils/getRoute";
import initialiseDesirabilityMatrix from "./utils/initialiseDesirabilityMatrix";
import Line from "@/app/utils/Line";

export default function ACOHeatmap({ screenRatio }: { screenRatio: number }) {
  // dots coordinates data
  const [mapDotsData] = useAtom(mapDotsDataAtom);
  // trigger to start solving
  const [solveFlag] = useAtom(solveFlagAtom);
  // matrix with heuristic and pheromone weights for paths between dots
  const [desirabilityMatrix, setDesirabilityMatrix] = useAtom(
    desirabilityMatrixAtom
  );
  // changable parameters
  const [parameters] = useAtom(parametersAtom);

  if (mapDotsData.length === 0 || !screenRatio || !solveFlag) return null;

  // generating desirability matrix from mapDotsData
  if (!desirabilityMatrix) {
    setDesirabilityMatrix(
      initialiseDesirabilityMatrix({
        initialPheromone: parameters.initialPheromone,
        mapDotsData,
      })
    );
    return null;
  }

  // const heatmap = getRoute({ mapDotsData, startIndex: 0, screenRatio });
  return (
    <svg
      width="100vw"
      height="100vh"
      className="translate-x-[0.5em] translate-y-[0.5em]"
    >
      {desirabilityMatrix
        .map((row, indexI) => {
          return row.map((item, indexJ) => {
            return item ? (
              <Line
                key={`line${indexI}${indexJ}`}
                x1={item.pointA.x}
                x2={item.pointB.x}
                y1={item.pointA.y}
                y2={item.pointB.y}
                width={item.pheromone}
              />
            ) : (
              item
            );
          });
        })
        .flat()
        .filter((item) => item)}
    </svg>
  );
}
