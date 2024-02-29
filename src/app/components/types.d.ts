interface IDot {
  x: number;
  y: number;
}

interface IACOParameters {
  alpha: number; // pheromone trail importance
  beta: number; // distance (heuristic) importance
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
