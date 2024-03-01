import {
  desirabilityMatrixAtom,
  iterationsCounterAtom,
  mapDotsDataAtom,
  parametersAtom,
  solveFlagAtom,
} from "@/store/jotai";
import { useAtom } from "jotai";
import getRoute from "./utils/getRoute";
import initialiseDesirabilityMatrix from "./utils/initialiseDesirabilityMatrix";
import Line from "@/app/utils/Line";

export default function ACOHeatmap({ screenRatio }: { screenRatio: number }) {
  // console.log("ACOHeatmap - Rerender");
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
  // iterations counter
  const [iterationsCounter, setIterationsCounter] = useAtom(
    iterationsCounterAtom
  );

  if (mapDotsData.length === 0 || !screenRatio || !solveFlag) return null;

  // generating desirability matrix from mapDotsData
  if (!desirabilityMatrix) {
    console.log("generating desirability matrix");
    const test = initialiseDesirabilityMatrix({
      initialPheromone: parameters.initialPheromone,
      mapDotsData,
    });
    setDesirabilityMatrix(test);
    return null;
  }

  // ACO iterations loop
  // at each stage desirabilityMatrix updated which causes a ACOHeatmap rerender
  // the amount of iterations is limited by parameters.maxIterationsCounter
  if (iterationsCounter < parameters.maxIterationsCounter) {
    const tempDesirabilityMatrix = desirabilityMatrix.map((row) => {
      return row.map((item) => {
        return item ? { ...item, pheromone: item.pheromone + 0.2 } : item;
      });
    });

    // setting timeout 0 to prevent React from throwing too many rerenders error
    setTimeout(() => {
      setDesirabilityMatrix(tempDesirabilityMatrix);
      setIterationsCounter(iterationsCounter + 1);
    }, 0);
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
