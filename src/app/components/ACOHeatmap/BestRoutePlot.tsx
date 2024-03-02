import Line from "@/app/utils/Line";

export default function BestRoutePlot({
  route,
  mapDotsData,
}: {
  route: number[];
  mapDotsData: IDotWithIndex[];
}) {
  //   let previousDot = route[0]
  //   let result: JSX.Element[] = []
  //   for (let index = 1; index < route.length; index++) {
  //     result.push(<Line />)

  //   }
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
