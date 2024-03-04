import {
  parametersAtom,
  writeOnlyResetBestRouteAtom,
  writeOnlyResetDesirabilityMatrixAtom,
  writeOnlyResetIterationsCounterAtom,
  writeOnlyResetSelectedPointsAtom,
  writeOnlySetMapGenerateFlagFalse,
  writeOnlySetSolveFlagFlaseAtom,
  writeOnlySetSolveFlagTrueAtom,
} from "@/store/jotai";
import { useAtom } from "jotai";

export default function ACOControls() {
  // console.log("ACOControls - Rerender");
  const [parameters, setParameters] = useAtom(parametersAtom);
  // generate dots map flag
  const [, setMapGenerateFlagFalse] = useAtom(writeOnlySetMapGenerateFlagFalse);
  // trigger to start solving
  const [, setSolveFlagTrue] = useAtom(writeOnlySetSolveFlagTrueAtom);
  const [, setSolveFlagFalse] = useAtom(writeOnlySetSolveFlagFlaseAtom);
  // iterations counter
  const [, resetIterationCounter] = useAtom(
    writeOnlyResetIterationsCounterAtom
  );
  // matrix with heuristic and pheromone weights for paths between dots
  const [, resetDesirabilityMatrix] = useAtom(
    writeOnlyResetDesirabilityMatrixAtom
  );
  // best route reset
  const [, resetBestRoute] = useAtom(writeOnlyResetBestRouteAtom);
  // reset selected points
  const [, resetSelectedPoints] = useAtom(writeOnlyResetSelectedPointsAtom);

  return (
    <nav className="fixed left-0 top-0 right-0 flex gap-4 px-4 items-center z-20">
      <button
        className="rounded-md bg-button_bg dark:bg-dark_button_bg hover:bg-hover_color transition-colors py-2 px-4"
        title="Start ACO sequence"
        onClick={() => {
          setSolveFlagTrue();
          resetDesirabilityMatrix();
        }}
      >
        Solve
      </button>
      <button
        className="rounded-md bg-button_bg dark:bg-dark_button_bg hover:bg-hover_color transition-colors py-2 px-4"
        title="Reset values"
        onClick={() => {
          setSolveFlagFalse();
          resetDesirabilityMatrix();
          resetIterationCounter();
          resetBestRoute();
          resetSelectedPoints();
        }}
      >
        Reset
      </button>
      <button
        className="rounded-md bg-button_bg dark:bg-dark_button_bg hover:bg-hover_color transition-colors py-2 px-4"
        title="Generate new dots"
        onClick={() => {
          setMapGenerateFlagFalse();
          setSolveFlagFalse();
          resetDesirabilityMatrix();
          resetIterationCounter();
          resetBestRoute();
          resetSelectedPoints();
        }}
      >
        Generate
      </button>
      <div className="flex flex-col text-font_color dark:text-dark_font_color w-1/6">
        <div className="flex justify-between pr-2">
          <label htmlFor="ACOControls__input--alpha">Alpha</label>
          <label htmlFor="ACOControls__input--alpha">{parameters.alpha}</label>
        </div>
        <input
          type="range"
          min={0}
          max={5}
          step={0.01}
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
      <div className="flex flex-col text-font_color dark:text-dark_font_color w-1/6">
        <div className="flex justify-between pr-2">
          <label htmlFor="ACOControls__input--beta">Beta</label>
          <label htmlFor="ACOControls__input--beta">{parameters.beta}</label>
        </div>
        <input
          type="range"
          min={0}
          max={5}
          step={0.01}
          id="ACOControls__input--beta"
          value={parameters.beta}
          onChange={(e) =>
            setParameters((prev) => ({ ...prev, beta: Number(e.target.value) }))
          }
        />
      </div>
      <div className="flex flex-col text-font_color dark:text-dark_font_color w-1/6">
        <div className="flex justify-between pr-2">
          <label htmlFor="ACOControls__input--quantity">quantity </label>
          <label htmlFor="ACOControls__input--quantity">
            {parameters.quantity}
          </label>
        </div>
        <input
          type="range"
          min={4}
          max={100}
          id="ACOControls__input--quantity"
          value={parameters.quantity}
          onChange={(e) =>
            setParameters((prev) => ({
              ...prev,
              quantity: Number(e.target.value),
            }))
          }
        />
      </div>
      <div className="flex flex-col text-font_color dark:text-dark_font_color w-1/6">
        <div className="flex justify-between pr-2">
          <label htmlFor="ACOControls__input--quantity">
            initial pheromone
          </label>
          <label htmlFor="ACOControls__input--quantity">
            {parameters.initialPheromone}
          </label>
        </div>
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          id="ACOControls__input--quantity"
          value={parameters.initialPheromone}
          onChange={(e) =>
            setParameters((prev) => ({
              ...prev,
              initialPheromone: Number(e.target.value),
            }))
          }
        />
      </div>
      <div className="flex flex-col text-font_color dark:text-dark_font_color w-1/6">
        <div className="flex justify-between pr-2">
          <label htmlFor="ACOControls__input--maxIterations">
            max iterations
          </label>
          <label htmlFor="ACOControls__input--maxIterations">
            {parameters.maxIterationsCounter}
          </label>
        </div>
        <input
          type="range"
          min={40}
          max={500}
          id="ACOControls__input--maxIterations"
          value={parameters.maxIterationsCounter}
          onChange={(e) =>
            setParameters((prev) => ({
              ...prev,
              maxIterationsCounter: Number(e.target.value),
            }))
          }
        />
      </div>
      <div className="flex flex-col text-font_color dark:text-dark_font_color w-1/6">
        <div className="flex justify-between pr-2">
          <label htmlFor="ACOControls__input--q0">Q constant </label>
          <label htmlFor="ACOControls__input--q0">{parameters.q0}</label>
        </div>
        <input
          type="range"
          min={1}
          max={4}
          step={0.1}
          id="ACOControls__input--q0"
          value={parameters.q0}
          onChange={(e) =>
            setParameters((prev) => ({
              ...prev,
              q0: Number(e.target.value),
            }))
          }
        />
      </div>
      <div className="flex flex-col text-font_color dark:text-dark_font_color w-1/6">
        <div className="flex justify-between pr-2">
          <label htmlFor="ACOControls__input--evaporationRate">
            evaporation rate
          </label>
          <label htmlFor="ACOControls__input--evaporationRate">
            {parameters.evaporationRate}
          </label>
        </div>
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          id="ACOControls__input--evaporationRate"
          value={parameters.evaporationRate}
          onChange={(e) =>
            setParameters((prev) => ({
              ...prev,
              evaporationRate: Number(e.target.value),
            }))
          }
        />
      </div>
    </nav>
  );
}
