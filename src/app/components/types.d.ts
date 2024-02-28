interface IDot {
  x: number;
  y: number;
}

interface IACOParameters {
  alpha: number; // pheromone trail importance
  beta: number; // distance (heuristic) importance
}

interface IHeatmapLine {
  pointA: IDot;
  pointB: IDot;
  intensity: number;
}
