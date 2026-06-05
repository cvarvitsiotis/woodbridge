import { useSyncExternalStore } from "react";

let windowScrollPositions = {
  currentScrollY: undefined as number | undefined,
  previousScrollY: undefined as number | undefined,
};

const serverSnapshot = { currentScrollY: undefined, previousScrollY: undefined };

function getSnapshot() {
  return windowScrollPositions;
}

function getServerSnapshot() {
  return serverSnapshot;
}

function subscribe(callback: () => void) {
  if (typeof window === "undefined") {
    return function () {};
  }

  let frameId: number | null = null;

  function throttledCallback() {
    if (frameId !== null) return;
    frameId = requestAnimationFrame(() => {
      windowScrollPositions = {
        previousScrollY: windowScrollPositions.currentScrollY,
        currentScrollY: typeof window === "undefined" ? undefined : window.scrollY,
      };
      callback();
      frameId = null;
    });
  }

  window.addEventListener("scroll", throttledCallback, { passive: true });

  return function () {
    window.removeEventListener("scroll", throttledCallback);
    if (frameId !== null) {
      cancelAnimationFrame(frameId);
    }
  };
}

export function useWindowScrollPositions() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
