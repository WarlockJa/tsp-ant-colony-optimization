import { atom } from "jotai";

// ACO parameters
export const parametersAtom = atom<IACOParameters>({
  quantity: 20,
  initialPheromone: 0.2,
  alpha: 1,
  beta: 4,
});

// ant map data
export const mapDotsDataAtom = atom<IDot[]>([]);
// desirabilityMatrix
export const desirabilityMatrixAtom = atom<TDesirabilityMatrix | null>(null);

// flag to regenerate ant map
export const mapGenerateFlagAtom = atom<boolean>(false);
// flag to solve ant map
export const solveFlagAtom = atom<boolean>(false);
