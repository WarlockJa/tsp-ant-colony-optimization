import { atom } from "jotai";

// ACO parameters
export const parametersAtom = atom<IACOParameters>({
  alpha: 1,
  beta: 4,
});

// ant map data
export const mapDotsDataAtom = atom<IDot[]>([]);
// number of dots in ant map
export const mapDotsQuantityAtom = atom<number>(20);
// flag to regenerate ant map
export const mapGenerateFlagAtom = atom<boolean>(false);
