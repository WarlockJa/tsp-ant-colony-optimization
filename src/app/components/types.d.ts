interface IDot {
  x: number;
  y: number;
}

interface IACOParameters {
  quantity: number; // number of dots to be generated
  alpha: number; // pheromone trail importance
  beta: number; // distance (heuristic) importance
  initialPheromone: number; // pheromone level desirability matrix is initialised with
}

interface IHeatmapLine {
  point: IDot;
  intensity: number;
}

interface IDesirabilityMatrix_VectorItem {
  heuristic: number; // inverse distance
  pheromone: number; // current pheromone level
}

type TDesirabilityMatrix = Array<IDesirabilityMatrix_VectorItem | undefined>[];
