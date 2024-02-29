import { useEffect, useState } from "react";

// this hook monitors screen resolution and returns screen ratio
// for width / height. This number is used in distance calculations
// to correct visual disparity when percent values are being used
export default function useScreenRatio() {
  const [screenRatio, setScreenRatio] = useState<number>(1);

  // using useEffect without dependency array to appease NextJS SSR gods' anger over window
  useEffect(() => {
    setScreenRatio(window.innerWidth / window.innerHeight);
  });

  return screenRatio;
}
