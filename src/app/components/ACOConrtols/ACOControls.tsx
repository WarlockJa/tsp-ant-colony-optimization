import {
  mapDotsQuantityAtom,
  mapGenerateFlagAtom,
  parametersAtom,
  solveFlagAtom,
} from "@/store/jotai";
import { useAtom } from "jotai";

export default function ACOControls() {
  const [parameters, setParameters] = useAtom(parametersAtom);
  const [quantity, setQuantity] = useAtom(mapDotsQuantityAtom);
  const [, setMapGenerateFlag] = useAtom(mapGenerateFlagAtom);
  const [, setSolveFlag] = useAtom(solveFlagAtom);

  return (
    <nav className="fixed left-0 top-0 flex gap-4 items-center z-20">
      <button
        className="rounded-md bg-slate-400 hover:bg-slate-200 transition-colors py-2 px-4"
        title="Start ACO sequence"
        onClick={() => setSolveFlag(true)}
      >
        Solve
      </button>
      <button
        className="rounded-md bg-slate-400 hover:bg-slate-200 transition-colors py-2 px-4"
        title="Generate new dots"
        onClick={() => {
          setMapGenerateFlag(false);
          setSolveFlag(false);
        }}
      >
        Generate
      </button>
      <div className="flex flex-col text-teal-50">
        <div className="flex justify-between pr-4">
          <label htmlFor="ACOControls__input--alpha">Alpha</label>
          <label htmlFor="ACOControls__input--alpha">{parameters.alpha}</label>
        </div>
        <input
          type="range"
          min={0}
          max={10}
          id="ACOControls__input--alpha"
          value={parameters.alpha}
          onChange={(e) =>
            setParameters((prev) => ({
              ...prev,
              alpha: Number(e.target.value),
            }))
          }
        />
      </div>
      <div className="flex flex-col text-teal-50">
        <div className="flex justify-between pr-4">
          <label htmlFor="ACOControls__input--beta">Beta</label>
          <label htmlFor="ACOControls__input--beta">{parameters.beta}</label>
        </div>
        <input
          type="range"
          min={0}
          max={10}
          id="ACOControls__input--beta"
          value={parameters.beta}
          onChange={(e) =>
            setParameters((prev) => ({ ...prev, beta: Number(e.target.value) }))
          }
        />
      </div>
      <div className="flex flex-col text-teal-50">
        <div className="flex justify-between pr-4">
          <label htmlFor="ACOControls__input--quantity">Quantity</label>
          <label htmlFor="ACOControls__input--quantity">{quantity}</label>
        </div>
        <input
          type="range"
          min={4}
          max={100}
          id="ACOControls__input--quantity"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
        />
      </div>
    </nav>
  );
}
