import React, { useEffect, useState } from "react";

export function useWindowSize() {
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    setDimensions(() => {
      return { width: window.innerWidth, height: window.innerHeight };
    });
  });

  return dimensions;
}
