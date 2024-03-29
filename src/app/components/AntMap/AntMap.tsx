import { useAtom } from "jotai";
import {
  mapDotsDataAtom,
  mapGenerateFlagAtom,
  parametersAtom,
  selectedPointsAtom,
} from "@/store/jotai";
import generateDots from "./utils/generateDots";
import { useEffect } from "react";

export default function AntMap() {
  const [parameters] = useAtom(parametersAtom);
  const [mapGenerateFlag, setMapGenerateFlag] = useAtom(mapGenerateFlagAtom);
  const [mapDotData, setMapDotsData] = useAtom(mapDotsDataAtom);
  const [selectedPoints, setSelectedPoints] = useAtom(selectedPointsAtom);

  // generate new map handler
  useEffect(() => {
    if (!mapGenerateFlag) {
      setMapGenerateFlag(true);
      // saving dots data to the state
      setMapDotsData(generateDots(parameters.quantity));
    }
  }, [mapGenerateFlag]);
  // waiting for client initilization to avoid Math.random() server/client mismatch
  return !mapGenerateFlag ? (
    <>Loading...</>
  ) : (
    <>
      {mapDotData.map((position, index) => {
        return (
          <div
            key={`dot${index}`}
            style={{
              left: `${position.x}%`,
              top: `${position.y}%`,
            }}
            className={`h-[1em] w-[1em] rounded-full absolute ${
              selectedPoints.pointA === index || selectedPoints.pointB === index
                ? "bg-selected_dot_color"
                : "bg-dot_color dark:bg-dark_dot_color"
            } cursor-pointer z-10`}
            onClick={() => {
              index !== selectedPoints.pointA &&
                index !== selectedPoints.pointB &&
                setSelectedPoints((prev) => ({
                  pointA: prev.pointB,
                  pointB: index,
                }));
            }}
          ></div>
        );
      })}
    </>
  );
}
