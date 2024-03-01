import { atom } from "jotai";

// ACO parameters
export const parametersAtom = atom<IACOParameters>({
  quantity: 20,
  initialPheromone: 0.2,
  maxIterationsCounter: 10,
  alpha: 1,
  beta: 4,
});

// ant map data
export const mapDotsDataAtom = atom<IDot[]>([]);
// desirabilityMatrix
export const desirabilityMatrixAtom = atom<TDesirabilityMatrix | null>(null);
export const writeOnlyResetDesirabilityMatrixAtom = atom(null, (get, set) => {
  set(desirabilityMatrixAtom, null);
});

// flag to regenerate ant map
export const mapGenerateFlagAtom = atom<boolean>(false);
export const writeOnlySetMapGenerateFlagFalse = atom(null, (get, set) => {
  set(mapGenerateFlagAtom, false);
});
// flag to solve ant map
export const solveFlagAtom = atom<boolean>(false);
export const writeOnlySetSolveFlagTrueAtom = atom(null, (get, set) => {
  set(solveFlagAtom, true);
});
export const writeOnlySetSolveFlagFlaseAtom = atom(null, (get, set) => {
  set(solveFlagAtom, false);
});

// TEST
// interactions counter flag
export const iterationsCounterAtom = atom<number>(0);
export const writeOnlyResetIterationsCounterAtom = atom(null, (get, set) => {
  set(iterationsCounterAtom, 0);
});
