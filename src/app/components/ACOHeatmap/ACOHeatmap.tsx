import {
  bestRouteAtom,
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
  // best route
  const [bestRoute, setBestRoute] = useAtom(bestRouteAtom);

  if (mapDotsData.length === 0 || !screenRatio || !solveFlag) return null;

  // generating desirability matrix from mapDotsData
  if (!desirabilityMatrix) {
    const initDesirabilityMatrix = initialiseDesirabilityMatrix({
      initialPheromone: parameters.initialPheromone,
      mapDotsData,
      screenRatio,
    });
    setDesirabilityMatrix(initDesirabilityMatrix);
    return null;
  }

  // ACO iterations loop
  // at each stage desirabilityMatrix updated which causes a ACOHeatmap rerender
  // the amount of iterations is limited by parameters.maxIterationsCounter
  if (iterationsCounter < parameters.maxIterationsCounter) {
    // TODO implement acutal ACO here
    let explorationDesirabilityMatrix = desirabilityMatrix;
    let explorationBestRoute = Infinity;
    mapDotsData.forEach((_, dotIndex) => {
      // Step 1 (Exploration Phase)
      // Calculate Route for each dot with dotIndex as starting point. Input: desirabilityMatrix: to make route calculations, mapDotsData: to keep track of the starting dot and unvisited dots, startIndex: defines starting dot, explorationDesirabilityMatrix: accumulates pheromone changes for the exploration phase
      // Output: routeLength, explorationDesirabilityMatrix - updated with a route changed pheromones
      const { routeLength, updatedExplorationDesirabilityMatrix } = getRoute({
        desirabilityMatrix,
        explorationDesirabilityMatrix,
        startIndex: dotIndex,
        mapDotsData,
        q0: parameters.q0,
      });

      // updating exploration data
      explorationDesirabilityMatrix = updatedExplorationDesirabilityMatrix;
      if (explorationBestRoute > routeLength)
        explorationBestRoute = routeLength;
    });

    // Step 2 (Pheromone Update)
    // Apply pheromones evaporation
    // Evaporation Equation: During each iteration of the algorithm, the pheromone levels (τ_ij) on all paths between dots are updated in the following way:
    // τ_ij = (1 - ρ) * τ_ij
    //     τ_ij: The pheromone level on the path between dots i and j.
    //     ρ: Evaporation rate.
    // Basically decimating all pheromone routes.
    explorationDesirabilityMatrix = explorationDesirabilityMatrix.map((row) =>
      row.map((item) =>
        item
          ? {
              ...item,
              pheromone: item.pheromone * (1 - parameters.evaporationRate),
            }
          : item
      )
    );

    // const explorationDesirabilityMatrix = desirabilityMatrix.map((row) => {
    //   return row.map((item) => {
    //     return item ? { ...item, pheromone: item.pheromone + 0.2 } : item;
    //   });
    // });

    // Step 3 (Iteration)
    // replace desirabilityMatrix with explorationDesirabilityMatrix. Increase iterationCounter
    // setting timeout 0 to prevent React from throwing "too many rerenders" error
    setTimeout(() => {
      setDesirabilityMatrix(explorationDesirabilityMatrix);
      setIterationsCounter(iterationsCounter + 1);
      if (bestRoute > explorationBestRoute) setBestRoute(explorationBestRoute);
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
