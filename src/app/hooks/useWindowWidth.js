"use client";
import { useWindowSize } from "@uidotdev/usehooks";
import { useState, useEffect } from "react";

// Custom hook to get the window width
function useWindowWidth() {
  const size = useWindowSize();

  return size.width;
}

export default useWindowWidth;
