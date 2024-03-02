interface IDot {
  x: number;
  y: number;
}

interface IDotWithIndex extends IDot {
  index: number;
}

interface IACOParameters {
  maxIterationsCounter: number; // maximum amount of AOC cycles before termination
  quantity: number; // number of dots to be generated
  alpha: number; // pheromone trail importance
  beta: number; // distance (heuristic) importance
  initialPheromone: number; // pheromone level desirability matrix is initialised with
  evaporationRate: number; // pheromone evaporation rate. Applied after each Exploration stage during Pheromone Update
  q0: number; // constant for pheromone update calculations. (Q / routeLength) is added to all paths of the route
}

interface IHeatmapLine {
  point: IDot;
  intensity: number;
}

interface IDesirabilityMatrix_VectorItem {
  pointA: IDot;
  pointB: IDot;
  distance: number; // distance
  heuristic: number; // inverse distance with the potential for other parameters
  pheromone: number; // current pheromone level
}

type TDesirabilityMatrix = Array<IDesirabilityMatrix_VectorItem | undefined>[];

interface IBestRoute {
  length: number;
  route: number[];
}
