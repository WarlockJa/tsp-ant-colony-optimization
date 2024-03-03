import Line from "@/app/utils/Line";

export default function BestRoutePlot({
  route,
  mapDotsData,
}: {
  route: number[];
  mapDotsData: IDotWithIndex[];
}) {
  const result = route.map((item, index, self) => {
    const lastItem = index === self.length - 1;
    return (
      <Line
        key={`linebest${index}`}
        x1={mapDotsData[item].x}
        y1={mapDotsData[item].y}
        x2={lastItem ? mapDotsData[self[0]].x : mapDotsData[self[index + 1]].x}
        y2={lastItem ? mapDotsData[self[0]].y : mapDotsData[self[index + 1]].y}
        width={1}
        color="red"
      />
    );
  });

  return result;
}
