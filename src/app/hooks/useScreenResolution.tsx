import { useEffect, useState } from "react";

interface IResolution {
  width: number;
  height: number;
}

export default function useScreenResolution() {
  const [resolution, setResolution] = useState<IResolution | null>(null);
  useEffect(() => {
    setResolution({ width: window.innerWidth, height: window.innerHeight });
  }, []);
  return resolution;
}
