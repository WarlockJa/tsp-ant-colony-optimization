"use client";
import AntMap from "./AntMap/AntMap";
import ACOControls from "./ACOConrtols/ACOControls";
import ACOHeatmap from "./ACOHeatmap/ACOHeatmap";

export default function ACO() {
  return (
    <div>
      <ACOControls />
      <AntMap />
      <ACOHeatmap />
    </div>
  );
}
