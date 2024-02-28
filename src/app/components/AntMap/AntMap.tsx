import { useAtom } from "jotai";
import {
  mapDotsDataAtom,
  mapDotsQuantityAtom,
  mapGenerateFlagAtom,
} from "@/store/jotai";
import generateDots from "./utils/generateDots";
import { useEffect } from "react";

export default function AntMap() {
  const [quantity] = useAtom(mapDotsQuantityAtom);
  const [mapGenerateFlag, setMapGenerateFlag] = useAtom(mapGenerateFlagAtom);
  const [mapDotData, setMapDotsData] = useAtom(mapDotsDataAtom);

  // generate new map handler
  useEffect(() => {
    if (!mapGenerateFlag) {
      setMapGenerateFlag(true);
      // saving dots data to the state
      setMapDotsData(generateDots(quantity));
    }
  }, [mapGenerateFlag]);
  // waiting for client initilization to avoid Math.random() server/client mismatch
  return !mapGenerateFlag ? (
    // return getReactRandom() === null || !mapGenerateFlag ? (
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
            className={`h-[1em] w-[1em] rounded-full absolute bg-white cursor-pointer z-10`}
          ></div>
        );
      })}
    </>
  );
}
