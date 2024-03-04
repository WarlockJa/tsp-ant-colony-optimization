import {
  bestRouteAtom,
  desirabilityMatrixAtom,
  iterationsCounterAtom,
  mapDotsDataAtom,
  parametersAtom,
  selectedPointsAtom,
  solveFlagAtom,
} from "@/store/jotai";
import { useAtom } from "jotai";
import getRoute from "./utils/getRoute";
import initialiseDesirabilityMatrix from "./utils/initialiseDesirabilityMatrix";
import Line from "@/app/utils/Line";
import { useEffect, useMemo } from "react";
import BestRoutePlot from "./BestRoutePlot";
import SelectedPointsData from "./SelectedPointsData";
import SelectedPointsLine from "./SelectedPointsLine";

export default function ACOHeatmap({ screenRatio }: { screenRatio: number }) {
  // console.log("ACOHeatmap - Rerender");
  // dots coordinates data
  const [mapDotsData] = useAtom(mapDotsDataAtom);
  // trigger to start solving
  const [solveFlag, setSolveFlag] = useAtom(solveFlagAtom);
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
  // selected points
  const [selectedPoints] = useAtom(selectedPointsAtom);

  // Reset on parameters change
  useEffect(() => {
    setDesirabilityMatrix(null);
    setSolveFlag(false);
    setBestRoute({ length: Infinity, route: [] });
    setIterationsCounter(0);
  }, [
    parameters.alpha,
    parameters.beta,
    parameters.evaporationRate,
    parameters.initialPheromone,
    parameters.q0,
  ]);

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
    let explorationDesirabilityMatrix = desirabilityMatrix;
    let explorationBestRoute: IBestRoute = { length: Infinity, route: [] };
    mapDotsData.forEach((_, dotIndex) => {
      // Step 1 (Exploration Phase)
      // Calculate Route for each dot with dotIndex as starting point. Input: desirabilityMatrix: to make route calculations, mapDotsData: to keep track of the starting dot and unvisited dots, startIndex: defines starting dot, explorationDesirabilityMatrix: accumulates pheromone changes for the exploration phase
      // Output: routeLength, explorationDesirabilityMatrix - updated with a route changed pheromones
      const { routeLength, route, updatedExplorationDesirabilityMatrix } =
        getRoute({
          desirabilityMatrix,
          explorationDesirabilityMatrix,
          startIndex: dotIndex,
          mapDotsData,
          q0: parameters.q0,
          alpha: parameters.alpha,
          beta: parameters.beta,
        });

      // updating exploration data
      explorationDesirabilityMatrix = updatedExplorationDesirabilityMatrix;
      if (explorationBestRoute.length > routeLength)
        explorationBestRoute = { length: routeLength, route };
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

    // Step 3 (Iteration)
    // replace desirabilityMatrix with explorationDesirabilityMatrix. Increase iterationCounter
    // setting timeout 0 to prevent React from throwing "too many rerenders" error
    setTimeout(() => {
      setDesirabilityMatrix(explorationDesirabilityMatrix);
      setIterationsCounter(iterationsCounter + 1);
      if (bestRoute.length > explorationBestRoute.length)
        setBestRoute(explorationBestRoute);
    }, 0);
  }

  return (
    <>
      <div className="absolute left-0 top-12 bg-black bg-opacity-40 p-4 text-teal-50 rounded">
        <div>Best Route: {bestRoute.length}</div>
        <div>Iteration N: {iterationsCounter}</div>
        <div>
          Selected Points:{" "}
          {selectedPoints.pointA !== null ? selectedPoints.pointA : "TBD"}
          {" - "}
          {selectedPoints.pointB !== null ? selectedPoints.pointB : "TBD"}
        </div>

        <SelectedPointsData
          desirabilityMatrix={desirabilityMatrix}
          pointA={selectedPoints.pointA}
          pointB={selectedPoints.pointB}
        />
      </div>
      <svg
        width="100vw"
        height="100vh"
        className="translate-x-[0.5em] translate-y-[0.5em]"
      >
        <SelectedPointsLine
          desirabilityMatrix={desirabilityMatrix}
          pointA={selectedPoints.pointA}
          pointB={selectedPoints.pointB}
        />
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
                  width={item.pheromone * 1.5}
                />
              ) : (
                item
              );
            });
          })
          .flat()
          .filter((item) => item)}
        <BestRoutePlot mapDotsData={mapDotsData} route={bestRoute.route} />
      </svg>
    </>
  );
}
