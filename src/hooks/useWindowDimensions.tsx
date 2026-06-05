import { useSyncExternalStore } from "react";

let windowDimensions: { width: number | undefined; height: number | undefined } = {
  width: undefined,
  height: undefined,
};

const serverSnapshot = { width: undefined, height: undefined };

function getSnapshot() {
  return windowDimensions;
}

function getServerSnapshot() {
  return serverSnapshot;
}

function subscribe(callback: () => void) {
  if (typeof window === "undefined") {
    return function () {};
  }

  function handleResize() {
    windowDimensions = {
      width: window.innerWidth,
      height: window.innerHeight,
    };
    callback();
  }

  handleResize();

  window.addEventListener("resize", handleResize);

  return function () {
    window.removeEventListener("resize", handleResize);
  };
}

export function useWindowDimensions() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
