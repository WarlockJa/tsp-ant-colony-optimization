"use client";
import AntMap from "./AntMap/AntMap";
import ACOControls from "./ACOConrtols/ACOControls";
import ACOHeatmap from "./ACOHeatmap/ACOHeatmap";
import useScreenRatio from "../hooks/useScreenRatio";

// Explanation of the Ant Colony Optimization algorithm stages:
//     Initialization: The algorithm starts by generating a number of spread out dots with a virtual ant for each.
//     Exploration: Each ant then explores the search space by constructing a possible solution, which is a route that visits all the dots once and returns to the starting dot. While constructing the route, each ant makes a decision about which dot to visit next based on a combination of two factors: the distance between the current dot and the next dot, and the amount of pheromone on the edge between the two dots.
//     Pheromone Update: After all the ants have completed their exploration phase, the pheromone levels on the edges are updated. The amount of pheromone added to an edge is proportional to the quality of the solution that uses that edge. In other words, edges that are part of shorter routes will receive more pheromone. Pheromone evaporation applied to prevent the algorithm from getting stuck in a local optimum.
//     Iteration: Steps 2 and 3 are repeated for a number of iterations. As the algorithm iterates, the pheromone levels on the edges will gradually converge, so that the ants are more likely to choose the shorter routes.

export default function ACO() {
  // initializing screenRatio value
  const screenRatio = useScreenRatio();
  return (
    <div>
      <ACOControls />
      <AntMap />
      <ACOHeatmap screenRatio={screenRatio} />
    </div>
  );
}
