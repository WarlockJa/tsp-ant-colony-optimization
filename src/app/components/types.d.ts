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
