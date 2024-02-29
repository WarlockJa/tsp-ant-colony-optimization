"use client";
import AntMap from "./AntMap/AntMap";
import ACOControls from "./ACOConrtols/ACOControls";
import ACOHeatmap from "./ACOHeatmap/ACOHeatmap";
import useScreenRatio from "../hooks/useScreenRatio";

export default function ACO() {
  // initializing screenRatio value
  const screenRatio = useScreenRatio();
  return (
    <div>
      <ACOControls />
      <AntMap />
      <ACOHeatmap screenRatio={screenRatio} />
    </div>
  );
}
