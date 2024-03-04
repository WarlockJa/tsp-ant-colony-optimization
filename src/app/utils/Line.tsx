interface ILineProps {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color?: string;
  width?: number;
}

export default function Line({
  x1,
  y1,
  x2,
  y2,
  color = "#fdf9",
  width = 0,
}: ILineProps): JSX.Element {
  return (
    <line
      x1={`${x1}%`}
      y1={`${y1}%`}
      x2={`${x2}%`}
      y2={`${y2}%`}
      stroke={color}
      strokeWidth={width}
    />
  );
}
