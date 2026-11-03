"use client";

import { useSyncExternalStore } from "react";

const media = "(max-width: 639px)";
const subscribe = (callback: () => void) => {
  const query = window.matchMedia(media);
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
};
const snapshot = () => window.matchMedia(media).matches;
const serverSnapshot = () => false;

export function useMobileReel() {
  return useSyncExternalStore(subscribe, snapshot, serverSnapshot);
}
