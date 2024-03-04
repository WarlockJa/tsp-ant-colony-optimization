import { atom } from "jotai";

// ACO parameters
export const parametersAtom = atom<IACOParameters>({
  quantity: 50,
  initialPheromone: 0.1,
  evaporationRate: 0.1,
  maxIterationsCounter: 100,
  alpha: 3,
  beta: 1.2,
  q0: 1,
});

// ant map data
export const mapDotsDataAtom = atom<IDotWithIndex[]>([]);
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

// interactions counter flag
export const iterationsCounterAtom = atom<number>(0);
export const writeOnlyResetIterationsCounterAtom = atom(null, (get, set) => {
  set(iterationsCounterAtom, 0);
});

// best route
export const bestRouteAtom = atom<IBestRoute>({ length: Infinity, route: [] });
export const writeOnlyResetBestRouteAtom = atom(null, (get, set) => {
  set(bestRouteAtom, { length: Infinity, route: [] });
});

// selected points data
export const selectedPointsAtom = atom<{
  pointA: number | null;
  pointB: number | null;
}>({ pointA: null, pointB: null });
export const writeOnlyResetSelectedPointsAtom = atom(null, (get, set) => {
  set(selectedPointsAtom, { pointA: null, pointB: null });
});
